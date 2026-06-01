import type { CodegenConfig } from "@graphql-codegen/cli";

/**
 * GraphQL Code Generator config.
 *
 * - `schema`: local sample SDL (`schema.graphql`). Swap for a live endpoint URL
 *   (e.g. `process.env.VITE_GRAPHQL_ENDPOINT`) when a backend exists.
 * - `documents`: GraphQL operations, either standalone `.graphql` files or
 *   inline `graphql(...)` tags in `.ts`/`.tsx` (client preset).
 *
 * Output lands in `src/graphql/generated/`. Use it with graphql-request +
 * TanStack Query:
 *
 *   import { graphql } from "@/graphql/generated";
 *   import { gqlClient } from "@/lib/graphql";
 *   const Doc = graphql(`query Foo { ... }`);
 *   useQuery({ queryKey: ["foo"], queryFn: () => gqlClient.request(Doc) });
 */
const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: ["src/**/*.{graphql,ts,tsx}", "!src/graphql/generated/**"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
