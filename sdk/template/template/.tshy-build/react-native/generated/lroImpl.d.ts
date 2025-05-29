import { LongRunningOperation, LroResponse } from "@azure/core-lro";
export declare class LroImpl<T> implements LongRunningOperation<T> {
    private sendOperationFn;
    private args;
    private spec;
    requestPath: string;
    requestMethod: string;
    constructor(sendOperationFn: (args: any, spec: any) => Promise<LroResponse<T>>, args: Record<string, unknown>, spec: {
        readonly requestBody?: unknown;
        readonly path?: string;
        readonly httpMethod: string;
    } & Record<string, any>, requestPath?: string, requestMethod?: string);
    sendInitialRequest(): Promise<LroResponse<T>>;
    sendPollRequest(path: string): Promise<LroResponse<T>>;
}
//# sourceMappingURL=lroImpl.d.ts.map