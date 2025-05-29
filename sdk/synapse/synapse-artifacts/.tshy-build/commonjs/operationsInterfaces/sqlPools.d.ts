import type { SqlPoolsListOptionalParams, SqlPoolsListResponse, SqlPoolsGetOptionalParams, SqlPoolsGetResponse } from "../models/index.js";
/** Interface representing a SqlPools. */
export interface SqlPools {
    /**
     * List Sql Pools
     * @param options - The options parameters.
     */
    list(options?: SqlPoolsListOptionalParams): Promise<SqlPoolsListResponse>;
    /**
     * Get Sql Pool
     * @param sqlPoolName - The Sql Pool name
     * @param options - The options parameters.
     */
    get(sqlPoolName: string, options?: SqlPoolsGetOptionalParams): Promise<SqlPoolsGetResponse>;
}
//# sourceMappingURL=sqlPools.d.ts.map