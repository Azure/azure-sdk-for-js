import type { BigDataPools } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { BigDataPoolsListOptionalParams, BigDataPoolsListResponse, BigDataPoolsGetOptionalParams, BigDataPoolsGetResponse } from "../models/index.js";
/** Class containing BigDataPools operations. */
export declare class BigDataPoolsImpl implements BigDataPools {
    private readonly client;
    /**
     * Initialize a new instance of the class BigDataPools class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * List Big Data Pools
     * @param options - The options parameters.
     */
    list(options?: BigDataPoolsListOptionalParams): Promise<BigDataPoolsListResponse>;
    /**
     * Get Big Data Pool
     * @param bigDataPoolName - The Big Data Pool name
     * @param options - The options parameters.
     */
    get(bigDataPoolName: string, options?: BigDataPoolsGetOptionalParams): Promise<BigDataPoolsGetResponse>;
}
//# sourceMappingURL=bigDataPools.d.ts.map