import { BaseFilter } from "./baseFilter";
import { WebResource } from "../webResource";
export declare class MsRestUserAgentFilter extends BaseFilter {
    userAgentInfo: Array<string>;
    constructor(userAgentInfo: Array<string>);
    tagRequest(request: WebResource): Promise<WebResource>;
    before(request: WebResource): Promise<WebResource>;
}
