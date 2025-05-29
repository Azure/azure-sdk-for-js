import { OperationTracingOptions } from "@azure/core-tracing";
/**
 * The supports Tracing function does the verification of whether the core-tracing is supported correctly with the client method
 * This function verifies the root span, if all the correct spans are called as expected and if they are closed.
 * @param callback - Callback function of the client that should be invoked
 * @param expectedSpanNames - List of span names that are expected to be generated
 * @param options - Options for either Core HTTP operations or custom options for the callback
 * @param thisArg - optional this parameter for the callback
 */
export declare function supportsTracing<Options extends {
    tracingOptions?: OperationTracingOptions;
}, Callback extends (options: Options) => Promise<unknown>>(callback: Callback, expectedSpanNames: string[], options?: Options, thisArg?: ThisParameterType<Callback>): Promise<void>;
//# sourceMappingURL=azureTraceAssert.d.ts.map