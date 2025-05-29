import * as coreClient from "@azure/core-client";
import { GeneratedClientOptionalParams } from "./models/index.js";
/** @internal */
export declare class GeneratedClientContext extends coreClient.ServiceClient {
    endpoint: string;
    syncToken?: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the GeneratedClientContext class.
     * @param endpoint The endpoint of the App Configuration instance to send requests to.
     * @param options The parameter options
     */
    constructor(endpoint: string, options?: GeneratedClientOptionalParams);
}
//# sourceMappingURL=generatedClientContext.d.ts.map