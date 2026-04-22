// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * The sole explicit staging construct for bridging test-stage and sample-stage values.
 *
 * Use `forPublishing` when an expression must differ between the test stage (vitest
 * with recorder) and the sample stage (published customer-facing code). The canonical
 * example is authentication:
 *
 * ```ts
 * import { forPublishing } from "@azure-tools/test-publishing";
 * import { createTestCredential } from "@azure-tools/test-credential";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
 * ```
 *
 * ### Runtime behavior (test stage)
 *
 * At runtime `forPublishing` always returns `testValue`. The `publishedValue` callback
 * is never called — it exists solely as a type-checked signal to the compiler, which
 * extracts the arrow body during stage erasure.
 *
 * ### Compiler behavior (stage erasure)
 *
 * The sample compiler replaces `forPublishing(testExpr, () => sampleExpr)` with
 * `sampleExpr`, adding any imports that `sampleExpr` requires and removing the
 * `forPublishing` import itself (which belongs to a test-stage module).
 *
 * ### Type safety
 *
 * The generic `<T>` ensures that both arguments share the same type, preventing
 * accidental mismatches (e.g., substituting a `string` where a `TokenCredential`
 * is expected).
 *
 * @param testValue - The value used at test time (recorder-compatible, test-optimized).
 * @param publishedValue - A callback returning the value shown in the published sample
 *   (customer-facing). The callback is never called at runtime — the compiler extracts
 *   the arrow body.
 * @returns `testValue` at runtime.
 *
 * @example
 * // Credential bridging
 * const credential = forPublishing(createTestCredential(), () => new DefaultAzureCredential());
 *
 * @example
 * // Endpoint bridging
 * const endpoint = forPublishing(
 *   recorder.variable("endpoint", { value: "test.example.com" }),
 *   () => process.env.ENDPOINT || "<your-endpoint>",
 * );
 *
 * @example
 * // Configuration bridging
 * const options = forPublishing(
 *   { retryOptions: { maxRetries: 0 } },   // fast test failures
 *   () => ({ retryOptions: { maxRetries: 3 } }),   // production defaults
 * );
 */
export function forPublishing<T>(testValue: T, publishedValue: () => T): T;

/**
 * Overload that accepts a wider published type. Useful when the published value
 * is a subtype or compatible type that cannot be expressed as exactly `T`.
 *
 * @param testValue - The value used at test time.
 * @param publishedValue - A callback returning the value shown in the published sample.
 *   The callback is never called at runtime.
 */
export function forPublishing<T, S extends T>(testValue: T, publishedValue: () => S): T;

// Implementation
export function forPublishing<T>(testValue: T, _publishedValue: () => T): T {
  return testValue;
}
