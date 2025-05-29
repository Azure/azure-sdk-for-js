import type { BigDataPoolsListOptionalParams, BigDataPoolsListResponse, BigDataPoolsGetOptionalParams, BigDataPoolsGetResponse } from "../models/index.js";
/** Interface representing a BigDataPools. */
export interface BigDataPools {
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