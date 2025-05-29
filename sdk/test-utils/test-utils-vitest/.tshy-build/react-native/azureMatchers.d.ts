import type { OperationTracingOptions } from "@azure/core-tracing";
import type { AsyncExpectationResult, MatcherState } from "@vitest/expect" with { "resolution-mode": "import" };
/**
 * The supports Tracing function does the verification of whether the core-tracing is supported correctly with the client method
 * This function verifies the root span, if all the correct spans are called as expected and if they are closed.
 * @param callback - Callback function of the client that should be invoked
 * @param expectedSpanNames - List of span names that are expected to be generated
 * @param options - Options for either Core HTTP operations or custom options for the callback
 * @param thisArg - optional this parameter for the callback
 */
export declare function toSupportTracing<ThisState extends MatcherState, Options extends {
    tracingOptions?: OperationTracingOptions;
}, Callback extends (options: Options) => Promise<unknown>>(this: ThisState, callback: Callback, expectedSpanNames: string[], options?: Options, thisArg?: ThisParameterType<Callback>): AsyncExpectationResult;
interface AzureMatchers<R> extends Record<string, any> {
    toSupportTracing<Options extends {
        tracingOptions?: OperationTracingOptions;
    }, Callback extends (options: Options) => Promise<unknown>>(expectedSpanNames: string[], options?: {
        tracingOptions?: OperationTracingOptions;
    }, thisArg?: ThisParameterType<Callback>): Promise<R>;
}
declare module "vitest" {
    interface Assertion<T = any> extends AzureMatchers<T> {
    }
    interface AsymmetricMatchersContaining<T = any> extends AzureMatchers<T> {
    }
    interface ExpectStatic<T = any> extends AzureMatchers<T> {
    }
}
export {};
//# sourceMappingURL=azureMatchers.d.ts.map