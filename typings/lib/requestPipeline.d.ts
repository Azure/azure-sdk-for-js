import { WebResource } from "./webResource";
import { HttpOperationResponse } from "./httpOperationResponse";
import { BaseFilter } from "./filters/baseFilter";
export interface RequestFunction {
    (webResource: WebResource): Promise<HttpOperationResponse>;
}
export declare class RequestPipeline {
    filters: BaseFilter[];
    requestOptions: RequestInit;
    constructor(filters?: BaseFilter[], requestOptions?: RequestInit);
    addFilter(f: BaseFilter): void;
    create(): RequestFunction;
    requestSink(options: WebResource): Promise<HttpOperationResponse>;
}
