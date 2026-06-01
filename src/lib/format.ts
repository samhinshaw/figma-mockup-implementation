/**
 * Small formatting helpers shared across the dashboard. Kept dependency-free
 * so they can be used in both data fixtures and presentational components.
 */

/** `14000` → `"$14,000"`. Pass `fractionDigits` for cents. */
export function formatCurrency(value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/** `87982.8` → `"$88K"` style compact currency, used for chart axis ticks. */
export function formatCompactCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** `1240` → `"1,240"`. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
