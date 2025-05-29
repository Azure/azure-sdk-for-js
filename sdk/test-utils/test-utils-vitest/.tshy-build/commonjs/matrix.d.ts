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
export declare function matrix<T extends ReadonlyArray<readonly unknown[]>>(values: T, handler: (...args: {
    [idx in keyof T]: T[idx] extends ReadonlyArray<infer U> ? U : never;
}) => Promise<void>): void;
//# sourceMappingURL=matrix.d.ts.map