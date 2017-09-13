import { WebResource } from "../webResource";
import { HttpOperationResponse } from "../httpOperationResponse";
export declare class BaseFilter {
    constructor();
    before(request: WebResource): Promise<WebResource>;
    after(response: HttpOperationResponse): Promise<HttpOperationResponse>;
}
