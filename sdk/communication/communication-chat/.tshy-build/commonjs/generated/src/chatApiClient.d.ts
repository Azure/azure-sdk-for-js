import * as coreClient from "@azure/core-client";
import { ChatThread, Chat } from "./operationsInterfaces/index.js";
import { ChatApiClientOptionalParams } from "./models/index.js";
export declare class ChatApiClient extends coreClient.ServiceClient {
    endpoint: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the ChatApiClient class.
     * @param endpoint The endpoint of the Azure Communication resource.
     * @param options The parameter options
     */
    constructor(endpoint: string, options?: ChatApiClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    chatThread: ChatThread;
    chat: Chat;
}
//# sourceMappingURL=chatApiClient.d.ts.map