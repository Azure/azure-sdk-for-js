import type { Monitoring } from "../operationsInterfaces/index.js";
import type { MonitoringClient } from "../monitoringClient.js";
import type { MonitoringGetSparkJobListOptionalParams, MonitoringGetSparkJobListResponse, MonitoringGetSqlJobQueryStringOptionalParams, MonitoringGetSqlJobQueryStringResponse } from "../models/index.js";
/** Class containing Monitoring operations. */
export declare class MonitoringImpl implements Monitoring {
    private readonly client;
    /**
     * Initialize a new instance of the class Monitoring class.
     * @param client - Reference to the service client
     */
    constructor(client: MonitoringClient);
    /**
     * Get list of spark applications for the workspace.
     * @param options - The options parameters.
     */
    getSparkJobList(options?: MonitoringGetSparkJobListOptionalParams): Promise<MonitoringGetSparkJobListResponse>;
    /**
     * Get SQL OD/DW Query for the workspace.
     * @param options - The options parameters.
     */
    getSqlJobQueryString(options?: MonitoringGetSqlJobQueryStringOptionalParams): Promise<MonitoringGetSqlJobQueryStringResponse>;
}
//# sourceMappingURL=monitoring.d.ts.map