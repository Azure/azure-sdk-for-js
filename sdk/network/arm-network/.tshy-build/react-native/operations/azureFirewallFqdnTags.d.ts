import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AzureFirewallFqdnTags } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { AzureFirewallFqdnTag, AzureFirewallFqdnTagsListAllOptionalParams } from "../models/index.js";
/** Class containing AzureFirewallFqdnTags operations. */
export declare class AzureFirewallFqdnTagsImpl implements AzureFirewallFqdnTags {
    private readonly client;
    /**
     * Initialize a new instance of the class AzureFirewallFqdnTags class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets all the Azure Firewall FQDN Tags in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: AzureFirewallFqdnTagsListAllOptionalParams): PagedAsyncIterableIterator<AzureFirewallFqdnTag>;
    private listAllPagingPage;
    private listAllPagingAll;
    /**
     * Gets all the Azure Firewall FQDN Tags in a subscription.
     * @param options The options parameters.
     */
    private _listAll;
    /**
     * ListAllNext
     * @param nextLink The nextLink from the previous successful call to the ListAll method.
     * @param options The options parameters.
     */
    private _listAllNext;
}
//# sourceMappingURL=azureFirewallFqdnTags.d.ts.map