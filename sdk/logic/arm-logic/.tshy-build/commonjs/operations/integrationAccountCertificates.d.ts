import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationAccountCertificates } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { IntegrationAccountCertificate, IntegrationAccountCertificatesListOptionalParams, IntegrationAccountCertificatesGetOptionalParams, IntegrationAccountCertificatesGetResponse, IntegrationAccountCertificatesCreateOrUpdateOptionalParams, IntegrationAccountCertificatesCreateOrUpdateResponse, IntegrationAccountCertificatesDeleteOptionalParams } from "../models/index.js";
/** Class containing IntegrationAccountCertificates operations. */
export declare class IntegrationAccountCertificatesImpl implements IntegrationAccountCertificates {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationAccountCertificates class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of integration account certificates.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, integrationAccountName: string, options?: IntegrationAccountCertificatesListOptionalParams): PagedAsyncIterableIterator<IntegrationAccountCertificate>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of integration account certificates.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets an integration account certificate.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param certificateName The integration account certificate name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, integrationAccountName: string, certificateName: string, options?: IntegrationAccountCertificatesGetOptionalParams): Promise<IntegrationAccountCertificatesGetResponse>;
    /**
     * Creates or updates an integration account certificate.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param certificateName The integration account certificate name.
     * @param certificate The integration account certificate.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, integrationAccountName: string, certificateName: string, certificate: IntegrationAccountCertificate, options?: IntegrationAccountCertificatesCreateOrUpdateOptionalParams): Promise<IntegrationAccountCertificatesCreateOrUpdateResponse>;
    /**
     * Deletes an integration account certificate.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param certificateName The integration account certificate name.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, integrationAccountName: string, certificateName: string, options?: IntegrationAccountCertificatesDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=integrationAccountCertificates.d.ts.map