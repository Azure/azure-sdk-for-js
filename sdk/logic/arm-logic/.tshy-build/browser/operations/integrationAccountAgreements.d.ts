import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationAccountAgreements } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { IntegrationAccountAgreement, IntegrationAccountAgreementsListOptionalParams, IntegrationAccountAgreementsGetOptionalParams, IntegrationAccountAgreementsGetResponse, IntegrationAccountAgreementsCreateOrUpdateOptionalParams, IntegrationAccountAgreementsCreateOrUpdateResponse, IntegrationAccountAgreementsDeleteOptionalParams, GetCallbackUrlParameters, IntegrationAccountAgreementsListContentCallbackUrlOptionalParams, IntegrationAccountAgreementsListContentCallbackUrlResponse } from "../models/index.js";
/** Class containing IntegrationAccountAgreements operations. */
export declare class IntegrationAccountAgreementsImpl implements IntegrationAccountAgreements {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationAccountAgreements class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of integration account agreements.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, integrationAccountName: string, options?: IntegrationAccountAgreementsListOptionalParams): PagedAsyncIterableIterator<IntegrationAccountAgreement>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of integration account agreements.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets an integration account agreement.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param agreementName The integration account agreement name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, integrationAccountName: string, agreementName: string, options?: IntegrationAccountAgreementsGetOptionalParams): Promise<IntegrationAccountAgreementsGetResponse>;
    /**
     * Creates or updates an integration account agreement.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param agreementName The integration account agreement name.
     * @param agreement The integration account agreement.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, integrationAccountName: string, agreementName: string, agreement: IntegrationAccountAgreement, options?: IntegrationAccountAgreementsCreateOrUpdateOptionalParams): Promise<IntegrationAccountAgreementsCreateOrUpdateResponse>;
    /**
     * Deletes an integration account agreement.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param agreementName The integration account agreement name.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, integrationAccountName: string, agreementName: string, options?: IntegrationAccountAgreementsDeleteOptionalParams): Promise<void>;
    /**
     * Get the content callback url.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param agreementName The integration account agreement name.
     * @param listContentCallbackUrl The callback url parameters.
     * @param options The options parameters.
     */
    listContentCallbackUrl(resourceGroupName: string, integrationAccountName: string, agreementName: string, listContentCallbackUrl: GetCallbackUrlParameters, options?: IntegrationAccountAgreementsListContentCallbackUrlOptionalParams): Promise<IntegrationAccountAgreementsListContentCallbackUrlResponse>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=integrationAccountAgreements.d.ts.map