/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GraphQL endpoint used by the graphql-request client (src/lib/graphql.ts). */
  readonly VITE_GRAPHQL_ENDPOINT?: string;
  /** Set to "true" to start the MSW mock backend (src/mocks). */
  readonly VITE_ENABLE_MOCKS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
