import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AzureFirewallFqdnTag, AzureFirewallFqdnTagsListAllOptionalParams } from "../models/index.js";
/** Interface representing a AzureFirewallFqdnTags. */
export interface AzureFirewallFqdnTags {
    /**
     * Gets all the Azure Firewall FQDN Tags in a subscription.
     * @param options The options parameters.
     */
    listAll(options?: AzureFirewallFqdnTagsListAllOptionalParams): PagedAsyncIterableIterator<AzureFirewallFqdnTag>;
}
//# sourceMappingURL=azureFirewallFqdnTags.d.ts.map