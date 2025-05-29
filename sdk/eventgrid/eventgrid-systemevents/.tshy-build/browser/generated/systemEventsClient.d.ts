import { SystemEventsClientOptionalParams } from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
export { SystemEventsClientOptionalParams } from "./api/systemEventsContext.js";
export declare class SystemEventsClient {
    private _client;
    /** The pipeline used by this client to make requests */
    readonly pipeline: Pipeline;
    /** Azure Messaging EventGrid SystemEvents */
    constructor(endpointParam: string, options?: SystemEventsClientOptionalParams);
}
//# sourceMappingURL=systemEventsClient.d.ts.map