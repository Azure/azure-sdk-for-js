import { BaseFilter } from "./baseFilter";
import { HttpOperationResponse } from "../httpOperationResponse";
export declare class RedirectFilter extends BaseFilter {
    maximumRetries?: number;
    constructor(maximumRetries?: number);
    handleRedirect(operationResponse: HttpOperationResponse, currentRetries: number): Promise<HttpOperationResponse>;
    after(operationResponse: HttpOperationResponse): Promise<HttpOperationResponse>;
}
