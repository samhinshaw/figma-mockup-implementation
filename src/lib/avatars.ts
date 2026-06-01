import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";

/**
 * Deterministic, offline avatar generation via DiceBear (`personas` style).
 *
 * Returns an inline SVG data URI keyed by `seed`, so the same name always
 * renders the same illustrated person. Results are memoized because the same
 * team members appear in multiple places (hero cluster + project rows).
 */
const cache = new Map<string, string>();

export function personaAvatar(seed: string): string {
  const cached = cache.get(seed);
  if (cached !== undefined) return cached;

  const uri = createAvatar(personas, {
    seed,
    radius: 50,
    backgroundColor: ["transparent"],
  }).toDataUri();

  cache.set(seed, uri);
  return uri;
}
