import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualApplianceSites } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VirtualApplianceSite, VirtualApplianceSitesListOptionalParams, VirtualApplianceSitesDeleteOptionalParams, VirtualApplianceSitesGetOptionalParams, VirtualApplianceSitesGetResponse, VirtualApplianceSitesCreateOrUpdateOptionalParams, VirtualApplianceSitesCreateOrUpdateResponse } from "../models/index.js";
/** Class containing VirtualApplianceSites operations. */
export declare class VirtualApplianceSitesImpl implements VirtualApplianceSites {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualApplianceSites class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, networkVirtualApplianceName: string, options?: VirtualApplianceSitesListOptionalParams): PagedAsyncIterableIterator<VirtualApplianceSite>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Deletes the specified site from a Virtual Appliance.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param siteName The name of the site.
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, networkVirtualApplianceName: string, siteName: string, options?: VirtualApplianceSitesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Deletes the specified site from a Virtual Appliance.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param siteName The name of the site.
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, networkVirtualApplianceName: string, siteName: string, options?: VirtualApplianceSitesDeleteOptionalParams): Promise<void>;
    /**
     * Gets the specified Virtual Appliance Site.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param siteName The name of the site.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, networkVirtualApplianceName: string, siteName: string, options?: VirtualApplianceSitesGetOptionalParams): Promise<VirtualApplianceSitesGetResponse>;
    /**
     * Creates or updates the specified Network Virtual Appliance Site.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param siteName The name of the site.
     * @param parameters Parameters supplied to the create or update Network Virtual Appliance Site
     *                   operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, networkVirtualApplianceName: string, siteName: string, parameters: VirtualApplianceSite, options?: VirtualApplianceSitesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<VirtualApplianceSitesCreateOrUpdateResponse>, VirtualApplianceSitesCreateOrUpdateResponse>>;
    /**
     * Creates or updates the specified Network Virtual Appliance Site.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param siteName The name of the site.
     * @param parameters Parameters supplied to the create or update Network Virtual Appliance Site
     *                   operation.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, networkVirtualApplianceName: string, siteName: string, parameters: VirtualApplianceSite, options?: VirtualApplianceSitesCreateOrUpdateOptionalParams): Promise<VirtualApplianceSitesCreateOrUpdateResponse>;
    /**
     * Lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource.
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param options The options parameters.
     */
    private _list;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group.
     * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=virtualApplianceSites.d.ts.map