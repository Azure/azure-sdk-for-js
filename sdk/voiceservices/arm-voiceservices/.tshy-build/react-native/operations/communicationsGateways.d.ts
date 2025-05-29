import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { CommunicationsGateways } from "../operationsInterfaces/index.js";
import { MicrosoftVoiceServices } from "../microsoftVoiceServices.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { CommunicationsGateway, CommunicationsGatewaysListBySubscriptionOptionalParams, CommunicationsGatewaysListByResourceGroupOptionalParams, CommunicationsGatewaysGetOptionalParams, CommunicationsGatewaysGetResponse, CommunicationsGatewaysCreateOrUpdateOptionalParams, CommunicationsGatewaysCreateOrUpdateResponse, CommunicationsGatewaysDeleteOptionalParams, CommunicationsGatewayUpdate, CommunicationsGatewaysUpdateOptionalParams, CommunicationsGatewaysUpdateResponse } from "../models/index.js";
/** Class containing CommunicationsGateways operations. */
export declare class CommunicationsGatewaysImpl implements CommunicationsGateways {
    private readonly client;
    /**
     * Initialize a new instance of the class CommunicationsGateways class.
     * @param client Reference to the service client
     */
    constructor(client: MicrosoftVoiceServices);
    /**
     * List CommunicationsGateway resources by subscription ID
     * @param options The options parameters.
     */
    listBySubscription(options?: CommunicationsGatewaysListBySubscriptionOptionalParams): PagedAsyncIterableIterator<CommunicationsGateway>;
    private listBySubscriptionPagingPage;
    private listBySubscriptionPagingAll;
    /**
     * List CommunicationsGateway resources by resource group
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: CommunicationsGatewaysListByResourceGroupOptionalParams): PagedAsyncIterableIterator<CommunicationsGateway>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * List CommunicationsGateway resources by subscription ID
     * @param options The options parameters.
     */
    private _listBySubscription;
    /**
     * List CommunicationsGateway resources by resource group
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Get a CommunicationsGateway
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param options The options parameters.
     */
    get(resourceGroupName: string, communicationsGatewayName: string, options?: CommunicationsGatewaysGetOptionalParams): Promise<CommunicationsGatewaysGetResponse>;
    /**
     * Create a CommunicationsGateway
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param resource Resource create parameters.
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, communicationsGatewayName: string, resource: CommunicationsGateway, options?: CommunicationsGatewaysCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<CommunicationsGatewaysCreateOrUpdateResponse>, CommunicationsGatewaysCreateOrUpdateResponse>>;
    /**
     * Create a CommunicationsGateway
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param resource Resource create parameters.
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, communicationsGatewayName: string, resource: CommunicationsGateway, options?: CommunicationsGatewaysCreateOrUpdateOptionalParams): Promise<CommunicationsGatewaysCreateOrUpdateResponse>;
    /**
     * Delete a CommunicationsGateway
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, communicationsGatewayName: string, options?: CommunicationsGatewaysDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Delete a CommunicationsGateway
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, communicationsGatewayName: string, options?: CommunicationsGatewaysDeleteOptionalParams): Promise<void>;
    /**
     * Update a CommunicationsGateway
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param communicationsGatewayName Unique identifier for this deployment
     * @param properties The resource properties to be updated.
     * @param options The options parameters.
     */
    update(resourceGroupName: string, communicationsGatewayName: string, properties: CommunicationsGatewayUpdate, options?: CommunicationsGatewaysUpdateOptionalParams): Promise<CommunicationsGatewaysUpdateResponse>;
    /**
     * ListBySubscriptionNext
     * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
     * @param options The options parameters.
     */
    private _listBySubscriptionNext;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=communicationsGateways.d.ts.map