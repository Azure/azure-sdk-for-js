import { LongRunningOperation, LroResponse } from "@azure/core-lro";
export declare function createLroSpec<T>(inputs: {
    sendOperationFn: (args: any, spec: any) => Promise<LroResponse<T>>;
    args: Record<string, unknown>;
    spec: {
        readonly requestBody?: unknown;
        readonly path?: string;
        readonly httpMethod: string;
    } & Record<string, any>;
}): LongRunningOperation<T>;
//# sourceMappingURL=lroImpl.d.ts.map