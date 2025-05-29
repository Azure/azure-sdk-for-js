import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { EncryptionScopes } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { EncryptionScope, EncryptionScopesListOptionalParams, EncryptionScopesGetOptionalParams, EncryptionScopesGetResponse, EncryptionScopesCreateOrUpdateOptionalParams, EncryptionScopesCreateOrUpdateResponse, EncryptionScopesDeleteOptionalParams, EncryptionScopesDeleteResponse } from "../models/index.js";
/** Class containing EncryptionScopes operations. */
export declare class EncryptionScopesImpl implements EncryptionScopes {
    private readonly client;
    /**
     * Initialize a new instance of the class EncryptionScopes class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Gets the content filters associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: EncryptionScopesListOptionalParams): PagedAsyncIterableIterator<EncryptionScope>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Gets the content filters associated with the Azure OpenAI account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    private _list;
    /**
     * Gets the specified EncryptionScope associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param encryptionScopeName The name of the encryptionScope associated with the Cognitive Services
     *                            Account
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, encryptionScopeName: string, options?: EncryptionScopesGetOptionalParams): Promise<EncryptionScopesGetResponse>;
    /**
     * Update the state of specified encryptionScope associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param encryptionScopeName The name of the encryptionScope associated with the Cognitive Services
     *                            Account
     * @param encryptionScope The encryptionScope properties.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, accountName: string, encryptionScopeName: string, encryptionScope: EncryptionScope, options?: EncryptionScopesCreateOrUpdateOptionalParams): Promise<EncryptionScopesCreateOrUpdateResponse>;
    /**
     * Deletes the specified encryptionScope associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param encryptionScopeName The name of the encryptionScope associated with the Cognitive Services
     *                            Account
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, accountName: string, encryptionScopeName: string, options?: EncryptionScopesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<EncryptionScopesDeleteResponse>, EncryptionScopesDeleteResponse>>;
    /**
     * Deletes the specified encryptionScope associated with the Cognitive Services account.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param encryptionScopeName The name of the encryptionScope associated with the Cognitive Services
     *                            Account
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, accountName: string, encryptionScopeName: string, options?: EncryptionScopesDeleteOptionalParams): Promise<EncryptionScopesDeleteResponse>;
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=encryptionScopes.d.ts.map