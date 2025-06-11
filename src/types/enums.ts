export const listingLimitValues = [10, 25, 50, 100] as const;
export type listingLimitEnum = typeof listingLimitValues[number];