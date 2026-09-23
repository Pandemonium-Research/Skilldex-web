/**
 * Render a total that may be a lower bound.
 *
 * `total_relation: "gte"` means the registry stopped counting at the cap — there are at least
 * this many. Printing the bare number would state a precise figure that is simply wrong, which
 * is the failure mode the relation flag exists to prevent.
 */
export function formatTotal(total: number, relation: 'eq' | 'gte'): string {
  return relation === 'gte' ? `${total.toLocaleString()}+` : total.toLocaleString()
}

/**
 * Render a large count compactly, rounded down: 1,615,322 → "1.6M+".
 *
 * Floored, never rounded, so the "+" is always true. The "+" is dropped when the compact form is
 * exact. Under 1,000 the number is printed as is.
 */
export function formatCompact(n: number): string {
  if (n < 1000) return n.toLocaleString()
  const [unit, suffix] = n >= 1_000_000 ? [1_000_000, 'M'] : [1000, 'K']
  const value = n / unit
  const floored = value < 10 ? Math.floor(value * 10) / 10 : Math.floor(value)
  return `${floored}${suffix}${floored * unit === n ? '' : '+'}`
}
