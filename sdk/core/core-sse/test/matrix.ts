// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Takes a jagged 2D array and a function and runs the function with every
 * possible combination of elements of each of the arrays
 *
 * For strong type-checking, it is important that the `matrix` have a strong
 * type, such as a `const` literal.
 *
 * @param values - jagged 2D array specifying the arguments and their possible
 *                 values
 * @param handler - the function to run with the different argument combinations
 *
 * @example
 * ```typescript
 * matrix([
 *     [true, false],
 *     [1, 2, 3]
 *   ] as const,
 *   (useLabels: boolean, attempts: number) => {
 *     // This body will run six times with the following parameters:
 *     // - true, 1
 *     // - true, 2
 *     // - true, 3
 *     // - false, 1
 *     // - false, 2
 *     // - false, 3
 *   });
 * ```
 */
export function matrix<T extends ReadonlyArray<readonly unknown[]>>(
  values: T,
  handler: (
    ...args: { [idx in keyof T]: T[idx] extends ReadonlyArray<infer U> ? U : never }
  ) => Promise<void>,
): void {
  // Classic recursive approach
  if (values.length === 0) {
    (handler as () => Promise<void>)();
  } else {
    for (const v of values[0]) {
      matrix(values.slice(1), (...args) => (handler as any)(v, ...args));
    }
  }
}
