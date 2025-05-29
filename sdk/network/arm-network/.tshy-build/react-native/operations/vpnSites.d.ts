import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VpnSites } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VpnSite, VpnSitesListByResourceGroupOptionalParams, VpnSitesListOptionalParams, VpnSitesGetOptionalParams, VpnSitesGetResponse, VpnSitesCreateOrUpdateOptionalParams, VpnSitesCreateOrUpdateResponse, TagsObject, VpnSitesUpdateTagsOptionalParams, VpnSitesUpdateTagsResponse, VpnSitesDeleteOptionalParams } from "../models/index.js";
/** Class containing VpnSites operations. */
export declare class VpnSitesImpl implements VpnSites {
    private readonly client;
    /**
     * Initialize a new instance of the class VpnSites class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the vpnSites in a resource group.
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: VpnSitesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<VpnSite>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Lists all the VpnSites in a subscription.
     * @param options The options parameters.
     */
    list(options?: VpnSitesListOptionalParams): PagedAsyncIterableIterator<VpnSite>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Retrieves the details of a VPN site.
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param vpnSiteName The name of the VpnSite being retrieved.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, vpnSiteName: string, options?: VpnSitesGetOptionalParams): Promise<VpnSitesGetResponse>;
    /**
     * Creates a VpnSite resource if it doesn't exist else updates the existing VpnSite.
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param vpnSiteName The name of the VpnSite being created or updated.
     * @param vpnSiteParameters Parameters supplied to create or update VpnSite.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, vpnSiteName: string, vpnSiteParameters: VpnSite, options?: VpnSitesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VpnSitesCreateOrUpdateResponse>, VpnSitesCreateOrUpdateResponse>>;
    /**
     * Creates a VpnSite resource if it doesn't exist else updates the existing VpnSite.
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param vpnSiteName The name of the VpnSite being created or updated.
     * @param vpnSiteParameters Parameters supplied to create or update VpnSite.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, vpnSiteName: string, vpnSiteParameters: VpnSite, options?: VpnSitesCreateOrUpdateOptionalParams): Promise<VpnSitesCreateOrUpdateResponse>;
    /**
     * Updates VpnSite tags.
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param vpnSiteName The name of the VpnSite being updated.
     * @param vpnSiteParameters Parameters supplied to update VpnSite tags.
     * @param options The options parameters.
     */
    updateTags(resourceGroupName: string, vpnSiteName: string, vpnSiteParameters: TagsObject, options?: VpnSitesUpdateTagsOptionalParams): Promise<VpnSitesUpdateTagsResponse>;
    /**
     * Deletes a VpnSite.
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param vpnSiteName The name of the VpnSite being deleted.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, vpnSiteName: string, options?: VpnSitesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes a VpnSite.
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param vpnSiteName The name of the VpnSite being deleted.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, vpnSiteName: string, options?: VpnSitesDeleteOptionalParams): Promise<void>;
    /**
     * Lists all the vpnSites in a resource group.
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Lists all the VpnSites in a subscription.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
    /**
     * ListNext
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=vpnSites.d.ts.map