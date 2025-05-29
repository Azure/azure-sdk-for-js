import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PrivateLinkResource, WebPubSubPrivateLinkResourcesListOptionalParams } from "../models/index.js";
/** Interface representing a WebPubSubPrivateLinkResources. */
export interface WebPubSubPrivateLinkResources {
    /**
     * Get the private link resources that need to be created for a resource.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param resourceName The name of the resource.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, resourceName: string, options?: WebPubSubPrivateLinkResourcesListOptionalParams): PagedAsyncIterableIterator<PrivateLinkResource>;
}
//# sourceMappingURL=webPubSubPrivateLinkResources.d.ts.map