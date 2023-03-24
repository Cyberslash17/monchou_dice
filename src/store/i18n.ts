import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/locales/en.json';
import fr from '../assets/locales/fr.json';

export const supportedLngs = [
    'en',
    'fr'
];

const lang = localStorage.getItem('lang') || '"en"';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr }
        },
        debug: true,
        lng: lang.substring(1, 3),
        fallbackLng: ['en', 'fr'],
        supportedLngs,
        interpolation: {
            escapeValue: false
        },
        react: {
            transSupportBasicHtmlNodes: true
        }
    });

export default i18n;