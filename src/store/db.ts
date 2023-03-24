import Dexie, { Table } from 'dexie';

export interface Score {
  id?: number;
  name: string;
  score: number;
  timestamp: number;
}

export interface CurrentGame {
  id?: number;
  name: string;
  score1: number;
  score2: number;
}

export interface Settings {
  id?: number;
  key: string;
  value: string;
}

export class DiceDexie extends Dexie {

  scores!: Table<Score>;
  currentGame!: Table<CurrentGame>;
  settings!: Table<Settings>;

  constructor() {
    super('scoreDB');
    this.version(1).stores({
      scores: '++id',
      currentGame: '++id, name',
      settings: '++id, key'
    });
  }
}

export const db = new DiceDexie();
