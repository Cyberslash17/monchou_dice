import { atom } from 'recoil';
import i18n from './i18n';

const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue: any, _: any, isReset: any) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

const i18nEffect = ({ onSet }: any) => {
  onSet((newValue: any, _: any, isReset: any) => {
    console.log(`NV: ${newValue} isReset: ${isReset}`);
    i18n.changeLanguage(newValue);
  });
};

export const colorModeAtom = atom<'light' | 'dark'>({
  key: 'colorMode',
  default: 'dark',
  effects: [
    localStorageEffect('color_mode')
  ]
});

export const activeGameAtom = atom({
  key: 'is_game_active',
  default: false,
  effects: [
    localStorageEffect('is_game_active')
  ]
});

export const maxPlayersAtom = atom({
  key: 'max_player',
  default: 8,
  effects: [
    localStorageEffect('max_players')
  ]
});

export const langAtom = atom<'en' | 'fr'>({
  key: 'lang',
  default: 'en',
  effects: [
    localStorageEffect('lang'),
    i18nEffect
  ]
});