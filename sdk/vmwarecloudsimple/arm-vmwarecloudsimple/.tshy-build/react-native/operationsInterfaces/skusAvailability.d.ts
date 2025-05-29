import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SkuAvailability, SkusAvailabilityListOptionalParams } from "../models/index.js";
/** Interface representing a SkusAvailability. */
export interface SkusAvailability {
    /**
     * Returns list of available resources in region
     * @param regionId The region Id (westus, eastus)
     * @param options The options parameters.
     */
    list(regionId: string, options?: SkusAvailabilityListOptionalParams): PagedAsyncIterableIterator<SkuAvailability>;
}
//# sourceMappingURL=skusAvailability.d.ts.map