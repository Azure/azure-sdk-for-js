import { VipSwap } from "../operationsInterfaces/index.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import { VipSwapGetOptionalParams, VipSwapGetResponse, SwapResource, VipSwapCreateOptionalParams, VipSwapListOptionalParams, VipSwapListResponse } from "../models/index.js";
/** Class containing VipSwap operations. */
export declare class VipSwapImpl implements VipSwap {
    private readonly client;
    /**
     * Initialize a new instance of the class VipSwap class.
     * @param client Reference to the service client
     */
    constructor(client: NetworkManagementClient);
    /**
     * Gets the SwapResource which identifies the slot type for the specified cloud service. The slot type
     * on a cloud service can either be Staging or Production
     * @param groupName The name of the resource group.
     * @param resourceName The name of the cloud service.
     * @param options The options parameters.
     */
    get(groupName: string, resourceName: string, options?: VipSwapGetOptionalParams): Promise<VipSwapGetResponse>;
    /**
     * Performs vip swap operation on swappable cloud services.
     * @param groupName The name of the resource group.
     * @param resourceName The name of the cloud service.
     * @param parameters SwapResource object where slot type should be the target slot after vip swap for
     *                   the specified cloud service.
     * @param options The options parameters.
     */
    beginCreate(groupName: string, resourceName: string, parameters: SwapResource, options?: VipSwapCreateOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
    /**
     * Performs vip swap operation on swappable cloud services.
     * @param groupName The name of the resource group.
     * @param resourceName The name of the cloud service.
     * @param parameters SwapResource object where slot type should be the target slot after vip swap for
     *                   the specified cloud service.
     * @param options The options parameters.
     */
    beginCreateAndWait(groupName: string, resourceName: string, parameters: SwapResource, options?: VipSwapCreateOptionalParams): Promise<void>;
    /**
     * Gets the list of SwapResource which identifies the slot type for the specified cloud service. The
     * slot type on a cloud service can either be Staging or Production
     * @param groupName The name of the resource group.
     * @param resourceName The name of the cloud service.
     * @param options The options parameters.
     */
    list(groupName: string, resourceName: string, options?: VipSwapListOptionalParams): Promise<VipSwapListResponse>;
}
//# sourceMappingURL=vipSwap.d.ts.map