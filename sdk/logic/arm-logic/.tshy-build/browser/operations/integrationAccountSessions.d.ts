import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationAccountSessions } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { IntegrationAccountSession, IntegrationAccountSessionsListOptionalParams, IntegrationAccountSessionsGetOptionalParams, IntegrationAccountSessionsGetResponse, IntegrationAccountSessionsCreateOrUpdateOptionalParams, IntegrationAccountSessionsCreateOrUpdateResponse, IntegrationAccountSessionsDeleteOptionalParams } from "../models/index.js";
/** Class containing IntegrationAccountSessions operations. */
export declare class IntegrationAccountSessionsImpl implements IntegrationAccountSessions {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationAccountSessions class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * Gets a list of integration account sessions.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, integrationAccountName: string, options?: IntegrationAccountSessionsListOptionalParams): PagedAsyncIterableIterator<IntegrationAccountSession>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets a list of integration account sessions.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets an integration account session.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param sessionName The integration account session name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, integrationAccountName: string, sessionName: string, options?: IntegrationAccountSessionsGetOptionalParams): Promise<IntegrationAccountSessionsGetResponse>;
    /**
     * Creates or updates an integration account session.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param sessionName The integration account session name.
     * @param session The integration account session.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, integrationAccountName: string, sessionName: string, session: IntegrationAccountSession, options?: IntegrationAccountSessionsCreateOrUpdateOptionalParams): Promise<IntegrationAccountSessionsCreateOrUpdateResponse>;
    /**
     * Deletes an integration account session.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param sessionName The integration account session name.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, integrationAccountName: string, sessionName: string, options?: IntegrationAccountSessionsDeleteOptionalParams): Promise<void>;
    /**
     * ListNext
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=integrationAccountSessions.d.ts.map