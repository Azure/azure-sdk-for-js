import * as coreClient from "@azure/core-client";
import { Sms, OptOuts } from "./operationsInterfaces/index.js";
import { SmsApiClientOptionalParams } from "./models/index.js";
export declare class SmsApiClient extends coreClient.ServiceClient {
    endpoint: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the SmsApiClient class.
     * @param endpoint The communication resource, for example https://my-resource.communication.azure.com
     * @param options The parameter options
     */
    constructor(endpoint: string, options?: SmsApiClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    sms: Sms;
    optOuts: OptOuts;
}
//# sourceMappingURL=smsApiClient.d.ts.map