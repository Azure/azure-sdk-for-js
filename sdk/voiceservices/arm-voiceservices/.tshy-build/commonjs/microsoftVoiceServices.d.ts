import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { Operations, CommunicationsGateways, NameAvailability, TestLines } from "./operationsInterfaces/index.js";
import { MicrosoftVoiceServicesOptionalParams } from "./models/index.js";
export declare class MicrosoftVoiceServices extends coreClient.ServiceClient {
    $host: string;
    apiVersion: string;
    subscriptionId: string;
    /**
     * Initializes a new instance of the MicrosoftVoiceServices class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The ID of the target subscription.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: MicrosoftVoiceServicesOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    operations: Operations;
    communicationsGateways: CommunicationsGateways;
    nameAvailability: NameAvailability;
    testLines: TestLines;
}
//# sourceMappingURL=microsoftVoiceServices.d.ts.map