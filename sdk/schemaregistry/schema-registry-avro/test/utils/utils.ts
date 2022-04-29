// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A type predicate to check whether two record types have the same keys
 */
export type AssertEqualKeys<T1 extends Record<string, any>, T2 extends Record<string, any>> = [
  keyof T1 extends keyof T2 ? 1 : 0,
  keyof T2 extends keyof T1 ? 1 : 0
] extends [1, 1]
  ? true
  : false;
