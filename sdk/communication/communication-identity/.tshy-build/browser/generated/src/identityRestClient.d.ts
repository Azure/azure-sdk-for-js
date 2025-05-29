import * as coreClient from "@azure/core-client";
import { CommunicationIdentityOperations, TeamsExtensionToken, TeamsExtensionAssignment, EntraIdToken, EntraIdAssignments, EntraIdAssignment } from "./operationsInterfaces/index.js";
import { IdentityRestClientOptionalParams } from "./models/index.js";
export declare class IdentityRestClient extends coreClient.ServiceClient {
    endpoint: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the IdentityRestClient class.
     * @param endpoint The communication resource, for example https://my-resource.communication.azure.com
     * @param options The parameter options
     */
    constructor(endpoint: string, options?: IdentityRestClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    communicationIdentityOperations: CommunicationIdentityOperations;
    teamsExtensionToken: TeamsExtensionToken;
    teamsExtensionAssignment: TeamsExtensionAssignment;
    entraIdToken: EntraIdToken;
    entraIdAssignments: EntraIdAssignments;
    entraIdAssignment: EntraIdAssignment;
}
//# sourceMappingURL=identityRestClient.d.ts.map