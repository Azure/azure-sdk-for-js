/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 * @internal
 */
export declare function isDefined<T>(thing: T | undefined | null): thing is T;
/**
 * Helper TypeGuard that checks if something is a string or not.
 * @param thing - Anything
 * @internal
 */
export declare function isString(thing: unknown): thing is string;
/**
 * @internal
 * Helper utility to retrieve `string` value from given string,
 * or throws error if undefined.
 */
export declare function getString(value: unknown, nameOfProperty: string): string;
/**
 * @internal
 * Helper utility to retrieve `string` value from given input,
 * or undefined if not passed in.
 */
export declare function getStringOrUndefined(value: any): string | undefined;
/**
 * @internal
 * Helper utility to retrieve `integer` value from given string,
 * or throws error if undefined.
 */
export declare function getInteger(value: unknown, nameOfProperty: string): number;
/**
 * @internal
 * Helper utility to retrieve `integer` value from given string,
 * or undefined if not passed in.
 */
export declare function getIntegerOrUndefined(value: any): number | undefined;
/**
 * @internal
 * Helper utility to retrieve `float` value from given string,
 * or throws error if undefined.
 */
export declare function getFloat(value: unknown, nameOfProperty: string): number;
/**
 * @internal
 * Helper utility to retrieve `float` value from given string,
 * or undefined if not passed in.
 */
export declare function getFloatOrUndefined(value: any): number | undefined;
/**
 * @internal
 * Helper utility to convert ISO-8601 time into Date type.
 */
export declare function getDate(value: string, nameOfProperty: string): Date;
/**
 * @internal
 * Helper utility to convert ISO-8601 time into Date type,
 * or undefined if not passed in.
 */
export declare function getDateOrUndefined(value: any): Date | undefined;
/**
 * @internal
 * Helper utility to parse tags from a comma separated string.
 */
export declare function getTagsOrUndefined(value?: any): string[] | undefined;
export type NullableRecord = Record<string, string | undefined>;
export type NonNullableRecord = Record<string, NonNullable<NullableRecord[string]>>;
//# sourceMappingURL=utils.d.ts.map