// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
 export function assertNotUndefinedOrFail<T>(value: T, msg?: string): NonUndefinable<T> {
     if (value !== undefined) {
         return value as NonUndefinable<T>;
     }
     throw new Error(msg || "Unexpected 'undefined' value encountered");
 }

export function stripNullables<T>(value: T, msg?: string): NonNullable<T> {
    if (value !== undefined && value !== null) {
        return value as NonNullable<T>;
    }
    throw new Error(msg || `Unexpected '${value}' value encountered`);
}

/**
 * Utility function to make certain properties on a type necessary from optional.
 */
 export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }


 /**
 * Utility function to make certain nested properties on a type necessary from optional.
 */
 export type DeepRequired<T, P extends string[]> = T extends object
  ? (Omit<T, Extract<keyof T, P[0]>> &
      Required<
        {
          [K in Extract<keyof T, P[0]>]: NonNullable<
            DeepRequired<T[K], ShiftUnion<P>>
          >
        }
      >)
  : T;


// Analogues to array.prototype.shift
export type Shift<T extends any[]> = ((...t: T) => any) extends ((
    first: any,
    ...rest: infer Rest
  ) => any)
    ? Rest
    : never;
  
  // use a distributed conditional type here
  type ShiftUnion<T> = T extends any[] ? Shift<T> : never;