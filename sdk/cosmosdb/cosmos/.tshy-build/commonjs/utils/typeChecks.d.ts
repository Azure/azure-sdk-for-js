/**
 * A type which could be any type but undefined
 */
export type NonUndefinable<T> = T extends undefined ? never : T;
/**
 * Utility function to avoid writing boilder plate code while checking for
 * undefined values. It throws Error if the input value is undefined.
 * @param value - Value which is potentially undefined.
 * @param msg - Error Message to throw if value is undefined.
 * @returns
 */
export declare function assertNotUndefined<T>(value: T, msg?: string): NonUndefinable<T>;
//# sourceMappingURL=typeChecks.d.ts.map