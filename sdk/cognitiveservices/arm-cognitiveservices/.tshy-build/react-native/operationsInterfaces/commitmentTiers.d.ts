import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { CommitmentTier, CommitmentTiersListOptionalParams } from "../models/index.js";
/** Interface representing a CommitmentTiers. */
export interface CommitmentTiers {
    /**
     * List Commitment Tiers.
     * @param location Resource location.
     * @param options The options parameters.
     */
    list(location: string, options?: CommitmentTiersListOptionalParams): PagedAsyncIterableIterator<CommitmentTier>;
}
//# sourceMappingURL=commitmentTiers.d.ts.map