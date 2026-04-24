// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Marks a value that should appear **only** in the published sample, not in the test.
 *
 * At runtime `sampleOnly` returns `undefined`, and the `publishedValue` callback is
 * never called — it exists solely as a type-checked signal to the compiler, which
 * extracts the arrow body during stage erasure.
 *
 * The sample compiler replaces `sampleOnly(() => expr)` with `expr`, injecting the
 * value into the published output.
 *
 * This is the inverse of `// @sample-strip` — instead of removing test-only code from
 * the sample, it injects sample-only code that doesn't run in tests.
 *
 * ### Use cases
 *
 * - Explanatory `console.log` statements that are useful in samples but noisy in tests.
 * - Sample-only error handling that isn't needed under the test harness.
 * - Comments or setup that only makes sense in the published context.
 *
 * @param publishedValue - A callback returning the value to include in the published
 *   sample. The callback is never called at runtime — the compiler extracts the arrow body.
 * @returns `undefined` at runtime (test stage).
 *
 * @example
 * ```ts
 * import { sampleOnly } from "@azure-tools/test-publishing";
 *
 * // This console.log appears in the published sample but not during tests
 * sampleOnly(() => console.log("Starting the sample..."));
 * ```
 */
export function sampleOnly<T>(publishedValue: () => T): T | undefined;

// Implementation
export function sampleOnly<T>(_publishedValue: () => T): T | undefined {
  return undefined;
}
