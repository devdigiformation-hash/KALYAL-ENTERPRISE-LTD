/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KALYAL_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
