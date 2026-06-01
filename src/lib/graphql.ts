import { GraphQLClient } from "graphql-request";

/**
 * graphql-request client. There is no live backend yet — point this at a real
 * endpoint via `VITE_GRAPHQL_ENDPOINT` when one exists. Pair with TanStack
 * Query: `useQuery({ queryKey, queryFn: () => gqlClient.request(MyDocument) })`.
 *
 * Typed documents are produced by `pnpm codegen` (see codegen.ts) into
 * `src/graphql/generated/`.
 */
const endpoint =
  import.meta.env.VITE_GRAPHQL_ENDPOINT ?? "http://localhost:4000/graphql";

export const gqlClient = new GraphQLClient(endpoint);
