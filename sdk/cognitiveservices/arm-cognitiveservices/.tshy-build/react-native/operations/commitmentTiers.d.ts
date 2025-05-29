import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { CommitmentTiers } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { CommitmentTier, CommitmentTiersListOptionalParams } from "../models/index.js";
/** Class containing CommitmentTiers operations. */
export declare class CommitmentTiersImpl implements CommitmentTiers {
    private readonly client;
    /**
     * Initialize a new instance of the class CommitmentTiers class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * List Commitment Tiers.
     * @param location Resource location.
     * @param options The options parameters.
     */
    list(location: string, options?: CommitmentTiersListOptionalParams): PagedAsyncIterableIterator<CommitmentTier>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List Commitment Tiers.
     * @param location Resource location.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param location Resource location.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=commitmentTiers.d.ts.map