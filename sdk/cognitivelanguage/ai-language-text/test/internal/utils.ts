// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A type predicate to check whether two types are the same
 */
export type AssertEqual<T1, T2> = [T1 extends T2 ? 1 : 0, T2 extends T1 ? 1 : 0] extends [1, 1]
  ? true
  : false;
