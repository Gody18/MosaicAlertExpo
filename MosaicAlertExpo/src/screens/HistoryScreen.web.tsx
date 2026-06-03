
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, ActivityIndicator, Alert,
} from 'react-native';
import { translations } from '../localization/translations';
import DatabaseService, { ScanRecord } from '../db/DatabaseService';
import { useLanguage } from '../context/LanguageContext';

const HistoryItem = React.memo(({ item, lang }: { item: ScanRecord, lang: 'sw' | 'en' }) => {
  const isMosaic = item.prediction === 'Mosaic';
  const dateString = useMemo(() => new Date(item.timestamp).toLocaleString(), [item.timestamp]);

  return (
    <View style={styles.historyCard}>
      <View style={styles.cardInfo}>
        <Text style={styles.dateText}>{dateString}</Text>
        <Text style={[
          styles.classText,
          isMosaic ? styles.mosaicText : styles.healthyText
        ]}>
          {isMosaic ? translations[lang].result.mosaic : translations[lang].result.healthy}
        </Text>
      </View>
      <View style={styles.confidenceContainer}>
        <Text style={styles.confidenceText}>{Math.round(item.confidence * 100)}%</Text>
      </View>
    </View>
  );
});

const HistoryScreen = () => {
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { lang } = useLanguage();

  const loadHistory = useCallback(async (isPullToRefresh = false) => {
    if (isPullToRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await DatabaseService.getHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history:', error);
      Alert.alert('Error', translations[lang].history.load_error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [lang]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const exportToCSV = async () => {
    if (history.length === 0) {
      Alert.alert('Info', translations[lang].history.export_empty);
      return;
    }

    const header = 'ID,Timestamp,Prediction,Confidence,Synced\n';
    const rows = history.map(h =>
      `"${h.id}","${h.timestamp}","${h.prediction}","${h.confidence}","${h.isSynced}"`
    ).join('\n');
    const csvContent = header + rows;
    const fileName = `MosaicAlert_History_${Date.now()}.csv`;

    try {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
      Alert.alert('Success', `${translations[lang].history.export_success}\n${fileName}`);
    } catch (error) {
      console.error('Export failed:', error);
      Alert.alert('Error', translations[lang].history.export_error);
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{translations[lang].home.history}</Text>
        <TouchableOpacity
          style={styles.exportButton}
          onPress={exportToCSV}
          activeOpacity={0.7}
        >
          <Text style={styles.exportButtonText}>{translations[lang].history.export_csv}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item, index) => item.id?.toString() ?? `row-${index}`}
        renderItem={({ item }) => <HistoryItem item={item} lang={lang} />}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>{translations[lang].history.empty}</Text>
          </View>
        }
        onRefresh={() => loadHistory(true)}
        refreshing={refreshing}
        contentContainerStyle={history.length === 0 ? { flex: 1 } : { paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  exportButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  exportButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  historyCard: {
    backgroundColor: '#FFF',
    padding: 15,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  },
  cardInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#757575',
  },
  classText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  mosaicText: {
    color: '#D32F2F',
  },
  healthyText: {
    color: '#2E7D32',
  },
  confidenceContainer: {
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
});

export default HistoryScreen;
