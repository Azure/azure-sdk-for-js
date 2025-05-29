import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PrivateCloud, PrivateCloudsListOptionalParams, PrivateCloudsGetOptionalParams, PrivateCloudsGetResponse } from "../models/index.js";
/** Interface representing a PrivateClouds. */
export interface PrivateClouds {
    /**
     * Returns list of private clouds in particular region
     * @param regionId The region Id (westus, eastus)
     * @param options The options parameters.
     */
    list(regionId: string, options?: PrivateCloudsListOptionalParams): PagedAsyncIterableIterator<PrivateCloud>;
    /**
     * Returns private cloud by its name
     * @param pcName The private cloud name
     * @param regionId The region Id (westus, eastus)
     * @param options The options parameters.
     */
    get(pcName: string, regionId: string, options?: PrivateCloudsGetOptionalParams): Promise<PrivateCloudsGetResponse>;
}
//# sourceMappingURL=privateClouds.d.ts.map