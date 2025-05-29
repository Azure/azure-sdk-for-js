import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationAccountPartners } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { IntegrationAccountPartner, IntegrationAccountPartnersListOptionalParams, IntegrationAccountPartnersGetOptionalParams, IntegrationAccountPartnersGetResponse, IntegrationAccountPartnersCreateOrUpdateOptionalParams, IntegrationAccountPartnersCreateOrUpdateResponse, IntegrationAccountPartnersDeleteOptionalParams, GetCallbackUrlParameters, IntegrationAccountPartnersListContentCallbackUrlOptionalParams, IntegrationAccountPartnersListContentCallbackUrlResponse } from "../models/index.js";
/** Class containing IntegrationAccountPartners operations. */
export declare class IntegrationAccountPartnersImpl implements IntegrationAccountPartners {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationAccountPartners class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of integration account partners.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, integrationAccountName: string, options?: IntegrationAccountPartnersListOptionalParams): PagedAsyncIterableIterator<IntegrationAccountPartner>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of integration account partners.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets an integration account partner.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param partnerName The integration account partner name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, integrationAccountName: string, partnerName: string, options?: IntegrationAccountPartnersGetOptionalParams): Promise<IntegrationAccountPartnersGetResponse>;
    /**
     * Creates or updates an integration account partner.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param partnerName The integration account partner name.
     * @param partner The integration account partner.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, integrationAccountName: string, partnerName: string, partner: IntegrationAccountPartner, options?: IntegrationAccountPartnersCreateOrUpdateOptionalParams): Promise<IntegrationAccountPartnersCreateOrUpdateResponse>;
    /**
     * Deletes an integration account partner.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param partnerName The integration account partner name.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, integrationAccountName: string, partnerName: string, options?: IntegrationAccountPartnersDeleteOptionalParams): Promise<void>;
    /**
     * Get the content callback url.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param partnerName The integration account partner name.
     * @param listContentCallbackUrl The callback url parameters.
     * @param options The options parameters.
     */
    listContentCallbackUrl(resourceGroupName: string, integrationAccountName: string, partnerName: string, listContentCallbackUrl: GetCallbackUrlParameters, options?: IntegrationAccountPartnersListContentCallbackUrlOptionalParams): Promise<IntegrationAccountPartnersListContentCallbackUrlResponse>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=integrationAccountPartners.d.ts.map