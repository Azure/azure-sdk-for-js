import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DedicatedCloudServices } from "../operationsInterfaces/index.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { DedicatedCloudService, DedicatedCloudServicesListBySubscriptionOptionalParams, DedicatedCloudServicesListByResourceGroupOptionalParams, DedicatedCloudServicesGetOptionalParams, DedicatedCloudServicesGetResponse, DedicatedCloudServicesCreateOrUpdateOptionalParams, DedicatedCloudServicesCreateOrUpdateResponse, DedicatedCloudServicesDeleteOptionalParams, PatchPayload, DedicatedCloudServicesUpdateOptionalParams, DedicatedCloudServicesUpdateResponse } from "../models/index.js";
/** Class containing DedicatedCloudServices operations. */
export declare class DedicatedCloudServicesImpl implements DedicatedCloudServices {
    private readonly client;
    /**
     * Initialize a new instance of the class DedicatedCloudServices class.
     * @param client Reference to the service client
     */
    constructor(client: VMwareCloudSimple);
    /**
     * Returns list of dedicated cloud services within a subscription
     * @param options The options parameters.
     */
    listBySubscription(options?: DedicatedCloudServicesListBySubscriptionOptionalParams): PagedAsyncIterableIterator<DedicatedCloudService>;
    private listBySubscriptionPagingPage;
    private listBySubscriptionPagingAll;
    /**
     * Returns list of dedicated cloud services within a resource group
     * @param resourceGroupName The name of the resource group
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: DedicatedCloudServicesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<DedicatedCloudService>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Returns list of dedicated cloud services within a subscription
     * @param options The options parameters.
     */
    private _listBySubscription;
    /**
     * Returns list of dedicated cloud services within a resource group
     * @param resourceGroupName The name of the resource group
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Returns Dedicate Cloud Service
     * @param resourceGroupName The name of the resource group
     * @param dedicatedCloudServiceName dedicated cloud Service name
     * @param options The options parameters.
     */
    get(resourceGroupName: string, dedicatedCloudServiceName: string, options?: DedicatedCloudServicesGetOptionalParams): Promise<DedicatedCloudServicesGetResponse>;
    /**
     * Create dedicate cloud service
     * @param resourceGroupName The name of the resource group
     * @param dedicatedCloudServiceName dedicated cloud Service name
     * @param dedicatedCloudServiceRequest Create Dedicated Cloud Service request
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, dedicatedCloudServiceName: string, dedicatedCloudServiceRequest: DedicatedCloudService, options?: DedicatedCloudServicesCreateOrUpdateOptionalParams): Promise<DedicatedCloudServicesCreateOrUpdateResponse>;
    /**
     * Delete dedicate cloud service
     * @param resourceGroupName The name of the resource group
     * @param dedicatedCloudServiceName dedicated cloud service name
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, dedicatedCloudServiceName: string, options?: DedicatedCloudServicesDeleteOptionalParams): Promise<PollerLike<PollOperationState<void>, void>>;
    /**
     * Delete dedicate cloud service
     * @param resourceGroupName The name of the resource group
     * @param dedicatedCloudServiceName dedicated cloud service name
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, dedicatedCloudServiceName: string, options?: DedicatedCloudServicesDeleteOptionalParams): Promise<void>;
    /**
     * Patch dedicated cloud service's properties
     * @param resourceGroupName The name of the resource group
     * @param dedicatedCloudServiceName dedicated cloud service name
     * @param dedicatedCloudServiceRequest Patch Dedicated Cloud Service request
     * @param options The options parameters.
     */
    update(resourceGroupName: string, dedicatedCloudServiceName: string, dedicatedCloudServiceRequest: PatchPayload, options?: DedicatedCloudServicesUpdateOptionalParams): Promise<DedicatedCloudServicesUpdateResponse>;
    /**
     * ListBySubscriptionNext
     * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
     * @param options The options parameters.
     */
    private _listBySubscriptionNext;
    /**
     * ListByResourceGroupNext
     * @param resourceGroupName The name of the resource group
     * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
     * @param options The options parameters.
     */
    private _listByResourceGroupNext;
}
//# sourceMappingURL=dedicatedCloudServices.d.ts.map