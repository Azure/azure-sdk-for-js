import { BaseFilter } from "./baseFilter";
import { WebResource } from "../webResource";
import { ServiceClientCredentials } from "../credentials/serviceClientCredentials";
export declare class SigningFilter extends BaseFilter {
    authenticationProvider: ServiceClientCredentials;
    constructor(authenticationProvider: ServiceClientCredentials);
    before(request: WebResource): Promise<WebResource>;
}
