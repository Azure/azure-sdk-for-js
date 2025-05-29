import { Metrics } from "./operationsInterfaces/index.js";
import { MonitorManagementClientContext } from "./monitorManagementClientContext.js";
import { MonitorManagementClientOptionalParams, ApiVersion20240201 } from "./models/index.js";
/** @internal */
export declare class MonitorManagementClient extends MonitorManagementClientContext {
    /**
     * Initializes a new instance of the MonitorManagementClient class.
     * @param apiVersion Api Version
     * @param options The parameter options
     */
    constructor(apiVersion: ApiVersion20240201, options?: MonitorManagementClientOptionalParams);
    metrics: Metrics;
}
//# sourceMappingURL=monitorManagementClient.d.ts.map