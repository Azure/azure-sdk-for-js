import { OperationTracingOptions } from "@azure/core-tracing";
/**
 * Augments Chai with support for Azure specific assertions.
 *
 * Sample usage:
 *
 * ```ts
 * import chai from "chai";
 * import { chaiAzure } from "@azure-tools/test-utils-vitest";
 * chai.use(chaiAzure);
 *
 * it("supportsTracing", async () => {
 *   await assert.supportsTracing((updatedOptions) => myClient.doSomething(updatedOptions), ["myClient.doSomething"]);
 * });
 * ```
 * @param chai - The Chai instance
 */
export declare function chaiAzure(chai: Chai.ChaiStatic): void;
declare global {
    export namespace Chai {
        interface Assertion {
            supportTracing<T>(expectedSpanNames: string[], options?: T): Promise<void>;
        }
        interface Assert {
            supportsTracing<Options extends {
                tracingOptions?: OperationTracingOptions;
            }, Callback extends (options: Options) => Promise<unknown>>(callback: Callback, expectedSpanNames: string[], options?: Options, thisArg?: ThisParameterType<Callback>): Promise<void>;
        }
    }
}
//# sourceMappingURL=azureAssert.d.ts.map