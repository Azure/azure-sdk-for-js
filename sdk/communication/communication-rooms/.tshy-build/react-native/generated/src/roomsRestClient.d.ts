import * as coreClient from "@azure/core-client";
import { Rooms, Participants } from "./operationsInterfaces/index.js";
import { RoomsRestClientOptionalParams } from "./models/index.js";
export declare class RoomsRestClient extends coreClient.ServiceClient {
    endpoint: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the RoomsRestClient class.
     * @param endpoint The endpoint of the Azure Communication resource.
     * @param options The parameter options
     */
    constructor(endpoint: string, options?: RoomsRestClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    rooms: Rooms;
    participants: Participants;
}
//# sourceMappingURL=roomsRestClient.d.ts.map