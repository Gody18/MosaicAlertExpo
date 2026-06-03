import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { translations } from '../localization/translations';
import { useLanguage } from '../context/LanguageContext';

const EducationScreen = () => {
  const { lang } = useLanguage();

  const topics = [
    {
      title: translations[lang].education.what_is_mosaic,
      content: translations[lang].education.content_mosaic,
    },
    {
      title: translations[lang].education.how_to_prevent,
      content: translations[lang].education.content_prevent,
    },
    {
      title: translations[lang].education.clean_seeds,
      content: translations[lang].education.content_clean_seeds,
    },
    {
      title: translations[lang].education.remove_infected,
      content: translations[lang].education.content_remove_infected,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>{translations[lang].education.title}</Text>

        {topics.map((topic, index) => (
          <View key={index} style={styles.topicCard}>
            <Text style={styles.topicTitle}>{topic.title}</Text>
            <Text style={styles.topicContent}>{topic.content}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>{translations[lang].education.learn_more}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  topicCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  topicContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  moreButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  moreButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EducationScreen;
