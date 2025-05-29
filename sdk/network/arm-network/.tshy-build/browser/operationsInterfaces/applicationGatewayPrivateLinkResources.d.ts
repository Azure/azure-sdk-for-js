import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ApplicationGatewayPrivateLinkResource, ApplicationGatewayPrivateLinkResourcesListOptionalParams } from "../models/index.js";
/** Interface representing a ApplicationGatewayPrivateLinkResources. */
export interface ApplicationGatewayPrivateLinkResources {
    /**
     * Lists all private link resources on an application gateway.
     * @param resourceGroupName The name of the resource group.
     * @param applicationGatewayName The name of the application gateway.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, applicationGatewayName: string, options?: ApplicationGatewayPrivateLinkResourcesListOptionalParams): PagedAsyncIterableIterator<ApplicationGatewayPrivateLinkResource>;
}
//# sourceMappingURL=applicationGatewayPrivateLinkResources.d.ts.map