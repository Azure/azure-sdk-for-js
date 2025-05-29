import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { BgpServiceCommunities } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { BgpServiceCommunity, BgpServiceCommunitiesListOptionalParams } from "../models/index.js";
/** Class containing BgpServiceCommunities operations. */
export declare class BgpServiceCommunitiesImpl implements BgpServiceCommunities {
    private readonly client;
    /**
     * Initialize a new instance of the class BgpServiceCommunities class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the available bgp service communities.
     * @param options The options parameters.
     */
    list(options?: BgpServiceCommunitiesListOptionalParams): PagedAsyncIterableIterator<BgpServiceCommunity>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets all the available bgp service communities.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=bgpServiceCommunities.d.ts.map