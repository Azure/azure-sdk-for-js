import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VpnSiteLinks } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { VpnSiteLink, VpnSiteLinksListByVpnSiteOptionalParams, VpnSiteLinksGetOptionalParams, VpnSiteLinksGetResponse } from "../models/index.js";
/** Class containing VpnSiteLinks operations. */
export declare class VpnSiteLinksImpl implements VpnSiteLinks {
    private readonly client;
    /**
     * Initialize a new instance of the class VpnSiteLinks class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Lists all the vpnSiteLinks in a resource group for a vpn site.
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param vpnSiteName The name of the VpnSite.
     * @param options The options parameters.
     */
    listByVpnSite(resourceGroupName: string, vpnSiteName: string, options?: VpnSiteLinksListByVpnSiteOptionalParams): PagedAsyncIterableIterator<VpnSiteLink>;
    private listByVpnSitePagingPage;
    private listByVpnSitePagingAll;
    /**
     * Retrieves the details of a VPN site link.
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param vpnSiteName The name of the VpnSite.
     * @param vpnSiteLinkName The name of the VpnSiteLink being retrieved.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, vpnSiteName: string, vpnSiteLinkName: string, options?: VpnSiteLinksGetOptionalParams): Promise<VpnSiteLinksGetResponse>;
    /**
     * Lists all the vpnSiteLinks in a resource group for a vpn site.
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param vpnSiteName The name of the VpnSite.
     * @param options The options parameters.
     */
    private _listByVpnSite;
    /**
     * ListByVpnSiteNext
     * @param resourceGroupName The resource group name of the VpnSite.
     * @param vpnSiteName The name of the VpnSite.
     * @param nextLink The nextLink from the previous successful call to the ListByVpnSite method.
     * @param options The options parameters.
     */
    private _listByVpnSiteNext;
}
//# sourceMappingURL=vpnSiteLinks.d.ts.map