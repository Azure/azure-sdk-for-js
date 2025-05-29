import type { QueryTimeInterval } from "./models/timeInterval.js";
export declare function convertTimespanToInterval(timespan: QueryTimeInterval): string;
export declare function convertIntervalToTimeIntervalObject(timespan: string): QueryTimeInterval;
/**
 * Helper TypeGuard that checks if the input is an object with the specified property.
 * Note: The property may be inherited.
 * @param thing - Any object.
 * @param property - The name of the property that should appear in the object.
 * @internal
 */
export declare function objectHasProperty<Thing, PropertyName extends string>(thing: Thing, property: PropertyName): thing is Extract<Thing, Record<PropertyName, unknown>>;
/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 * @internal
 */
export declare function isDefined<T>(thing: T | undefined | null): thing is T;
//# sourceMappingURL=timespanConversion.d.ts.map