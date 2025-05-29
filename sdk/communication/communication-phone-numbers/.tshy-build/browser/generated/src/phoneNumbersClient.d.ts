import * as coreClient from "@azure/core-client";
import { PhoneNumbers } from "./operationsInterfaces/index.js";
import { PhoneNumbersClientOptionalParams } from "./models/index.js";
export declare class PhoneNumbersClient extends coreClient.ServiceClient {
    endpoint: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the PhoneNumbersClient class.
     * @param endpoint The communication resource, for example https://resourcename.communication.azure.com
     * @param options The parameter options
     */
    constructor(endpoint: string, options?: PhoneNumbersClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    phoneNumbers: PhoneNumbers;
}
//# sourceMappingURL=phoneNumbersClient.d.ts.map