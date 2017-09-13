import { BaseFilter } from "./baseFilter";
import { HttpOperationResponse } from "../httpOperationResponse";
export declare class LogFilter extends BaseFilter {
    logger?: any;
    constructor(logger?: any);
    after(operationResponse: HttpOperationResponse): Promise<HttpOperationResponse>;
}
