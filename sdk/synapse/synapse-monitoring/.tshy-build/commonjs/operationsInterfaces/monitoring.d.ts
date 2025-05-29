import type { MonitoringGetSparkJobListOptionalParams, MonitoringGetSparkJobListResponse, MonitoringGetSqlJobQueryStringOptionalParams, MonitoringGetSqlJobQueryStringResponse } from "../models/index.js";
/** Interface representing a Monitoring. */
export interface Monitoring {
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