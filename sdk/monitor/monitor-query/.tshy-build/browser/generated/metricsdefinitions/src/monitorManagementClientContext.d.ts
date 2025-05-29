import * as coreClient from "@azure/core-client";
import { ApiVersion20240201, MonitorManagementClientOptionalParams } from "./models/index.js";
/** @internal */
export declare class MonitorManagementClientContext extends coreClient.ServiceClient {
    $host: string;
    apiVersion: ApiVersion20240201;
    /**
     * Initializes a new instance of the MonitorManagementClientContext class.
     * @param apiVersion Api Version
     * @param options The parameter options
     */
    constructor(apiVersion: ApiVersion20240201, options?: MonitorManagementClientOptionalParams);
}
//# sourceMappingURL=monitorManagementClientContext.d.ts.map