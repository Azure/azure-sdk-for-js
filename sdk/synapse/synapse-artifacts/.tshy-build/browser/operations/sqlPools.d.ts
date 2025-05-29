import type { SqlPools } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { SqlPoolsListOptionalParams, SqlPoolsListResponse, SqlPoolsGetOptionalParams, SqlPoolsGetResponse } from "../models/index.js";
/** Class containing SqlPools operations. */
export declare class SqlPoolsImpl implements SqlPools {
    private readonly client;
    /**
     * Initialize a new instance of the class SqlPools class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
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