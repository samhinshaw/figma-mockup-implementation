/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GraphQL endpoint used by the graphql-request client (src/lib/graphql.ts). */
  readonly VITE_GRAPHQL_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
