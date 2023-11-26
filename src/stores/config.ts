import { store } from 'storxy';
import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import { Server } from '#types/common'

export type ServerStore = {
  id: string,
  title: string,
} & Server;

export type CollectionStore = {
  id: string;
  title: string;
  subject: string;
  payload: string;
};

export type ConfigStore = {
  server: {
    current: Server,
    saved: ServerStore[],
  },
  collection: {
    saved: CollectionStore[],
  }
}

const CONFIG_FILE = path.join(os.homedir(), '.natsman');
const defaultConfig  = {
  server: {
    current: {
      host: 'localhost',
      port: 4222,
      token: '',
    },
    saved:[]
  },
  collection: {
    saved:[],
  },
};

export const configStore = store(defaultConfig, async (st) => {
  try {
    st.$ = JSON.parse(await fs.readFile(CONFIG_FILE, 'utf-8'));
  } catch {
    st.$ = defaultConfig;
  }
  return () => {};
});

configStore.$$(async (data) => {
  await fs.writeFile(CONFIG_FILE, JSON.stringify(data));
}, true);
