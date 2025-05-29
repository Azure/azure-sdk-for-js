import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationAccountSchemas } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { IntegrationAccountSchema, IntegrationAccountSchemasListOptionalParams, IntegrationAccountSchemasGetOptionalParams, IntegrationAccountSchemasGetResponse, IntegrationAccountSchemasCreateOrUpdateOptionalParams, IntegrationAccountSchemasCreateOrUpdateResponse, IntegrationAccountSchemasDeleteOptionalParams, GetCallbackUrlParameters, IntegrationAccountSchemasListContentCallbackUrlOptionalParams, IntegrationAccountSchemasListContentCallbackUrlResponse } from "../models/index.js";
/** Class containing IntegrationAccountSchemas operations. */
export declare class IntegrationAccountSchemasImpl implements IntegrationAccountSchemas {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationAccountSchemas class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of integration account schemas.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, integrationAccountName: string, options?: IntegrationAccountSchemasListOptionalParams): PagedAsyncIterableIterator<IntegrationAccountSchema>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of integration account schemas.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets an integration account schema.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param schemaName The integration account schema name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, integrationAccountName: string, schemaName: string, options?: IntegrationAccountSchemasGetOptionalParams): Promise<IntegrationAccountSchemasGetResponse>;
    /**
     * Creates or updates an integration account schema.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param schemaName The integration account schema name.
     * @param schema The integration account schema.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, integrationAccountName: string, schemaName: string, schema: IntegrationAccountSchema, options?: IntegrationAccountSchemasCreateOrUpdateOptionalParams): Promise<IntegrationAccountSchemasCreateOrUpdateResponse>;
    /**
     * Deletes an integration account schema.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param schemaName The integration account schema name.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, integrationAccountName: string, schemaName: string, options?: IntegrationAccountSchemasDeleteOptionalParams): Promise<void>;
    /**
     * Get the content callback url.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param schemaName The integration account schema name.
     * @param listContentCallbackUrl The callback url parameters.
     * @param options The options parameters.
     */
    listContentCallbackUrl(resourceGroupName: string, integrationAccountName: string, schemaName: string, listContentCallbackUrl: GetCallbackUrlParameters, options?: IntegrationAccountSchemasListContentCallbackUrlOptionalParams): Promise<IntegrationAccountSchemasListContentCallbackUrlResponse>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=integrationAccountSchemas.d.ts.map