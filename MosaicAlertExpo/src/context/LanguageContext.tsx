import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'sw' | 'en';

const LANGUAGE_STORAGE_KEY = '@mosaicalert/language';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'sw',
  setLang: () => {},
  isReady: false,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>('sw');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored === 'sw' || stored === 'en') {
          setLangState(stored);
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      } finally {
        setIsReady(true);
      }
    };

    loadLanguage();
  }, []);

  const setLang = useCallback(async (nextLang: Language) => {
    setLangState(nextLang);
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, isReady }),
    [lang, setLang, isReady]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
