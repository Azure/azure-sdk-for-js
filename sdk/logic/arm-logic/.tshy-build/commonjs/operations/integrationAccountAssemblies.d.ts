import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { IntegrationAccountAssemblies } from "../operationsInterfaces/index.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import { AssemblyDefinition, IntegrationAccountAssembliesListOptionalParams, IntegrationAccountAssembliesGetOptionalParams, IntegrationAccountAssembliesGetResponse, IntegrationAccountAssembliesCreateOrUpdateOptionalParams, IntegrationAccountAssembliesCreateOrUpdateResponse, IntegrationAccountAssembliesDeleteOptionalParams, IntegrationAccountAssembliesListContentCallbackUrlOptionalParams, IntegrationAccountAssembliesListContentCallbackUrlResponse } from "../models/index.js";
/** Class containing IntegrationAccountAssemblies operations. */
export declare class IntegrationAccountAssembliesImpl implements IntegrationAccountAssemblies {
    private readonly client;
    /**
     * Initialize a new instance of the class IntegrationAccountAssemblies class.
     * @param client Reference to the service client
     */
    constructor(client: LogicManagementClient);
    /**
     * List the assemblies for an integration account.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, integrationAccountName: string, options?: IntegrationAccountAssembliesListOptionalParams): PagedAsyncIterableIterator<AssemblyDefinition>;
    private listPagingPage;
    private listPagingAll;
    /**
     * List the assemblies for an integration account.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Get an assembly for an integration account.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param assemblyArtifactName The assembly artifact name.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, integrationAccountName: string, assemblyArtifactName: string, options?: IntegrationAccountAssembliesGetOptionalParams): Promise<IntegrationAccountAssembliesGetResponse>;
    /**
     * Create or update an assembly for an integration account.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param assemblyArtifactName The assembly artifact name.
     * @param assemblyArtifact The assembly artifact.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, integrationAccountName: string, assemblyArtifactName: string, assemblyArtifact: AssemblyDefinition, options?: IntegrationAccountAssembliesCreateOrUpdateOptionalParams): Promise<IntegrationAccountAssembliesCreateOrUpdateResponse>;
    /**
     * Delete an assembly for an integration account.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param assemblyArtifactName The assembly artifact name.
     * @param options The options parameters.
     */
    delete(resourceGroupName: string, integrationAccountName: string, assemblyArtifactName: string, options?: IntegrationAccountAssembliesDeleteOptionalParams): Promise<void>;
    /**
     * Get the content callback url for an integration account assembly.
     * @param resourceGroupName The resource group name.
     * @param integrationAccountName The integration account name.
     * @param assemblyArtifactName The assembly artifact name.
     * @param options The options parameters.
     */
    listContentCallbackUrl(resourceGroupName: string, integrationAccountName: string, assemblyArtifactName: string, options?: IntegrationAccountAssembliesListContentCallbackUrlOptionalParams): Promise<IntegrationAccountAssembliesListContentCallbackUrlResponse>;
}
//# sourceMappingURL=integrationAccountAssemblies.d.ts.map