import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { VirtualMachines } from "../operationsInterfaces/index.js";
import { VMwareCloudSimple } from "../vMwareCloudSimple.js";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { VirtualMachine, VirtualMachinesListBySubscriptionOptionalParams, VirtualMachinesListByResourceGroupOptionalParams, VirtualMachinesGetOptionalParams, VirtualMachinesGetResponse, VirtualMachinesCreateOrUpdateOptionalParams, VirtualMachinesCreateOrUpdateResponse, VirtualMachinesDeleteOptionalParams, VirtualMachinesDeleteResponse, PatchPayload, VirtualMachinesUpdateOptionalParams, VirtualMachinesUpdateResponse, VirtualMachinesStartOptionalParams, VirtualMachinesStopOptionalParams } from "../models/index.js";
/** Class containing VirtualMachines operations. */
export declare class VirtualMachinesImpl implements VirtualMachines {
    private readonly client;
    /**
     * Initialize a new instance of the class VirtualMachines class.
     * @param client Reference to the service client
     */
    constructor(client: VMwareCloudSimple);
    /**
     * Returns list virtual machine within subscription
     * @param options The options parameters.
     */
    listBySubscription(options?: VirtualMachinesListBySubscriptionOptionalParams): PagedAsyncIterableIterator<VirtualMachine>;
    private listBySubscriptionPagingPage;
    private listBySubscriptionPagingAll;
    /**
     * Returns list of virtual machine within resource group
     * @param resourceGroupName The name of the resource group
     * @param options The options parameters.
     */
    listByResourceGroup(resourceGroupName: string, options?: VirtualMachinesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<VirtualMachine>;
    private listByResourceGroupPagingPage;
    private listByResourceGroupPagingAll;
    /**
     * Returns list virtual machine within subscription
     * @param options The options parameters.
     */
    private _listBySubscription;
    /**
     * Returns list of virtual machine within resource group
     * @param resourceGroupName The name of the resource group
     * @param options The options parameters.
     */
    private _listByResourceGroup;
    /**
     * Get virtual machine
     * @param resourceGroupName The name of the resource group
     * @param virtualMachineName virtual machine name
     * @param options The options parameters.
     */
    get(resourceGroupName: string, virtualMachineName: string, options?: VirtualMachinesGetOptionalParams): Promise<VirtualMachinesGetResponse>;
    /**
     * Create Or Update Virtual Machine
     * @param resourceGroupName The name of the resource group
     * @param referer referer url
     * @param virtualMachineName virtual machine name
     * @param virtualMachineRequest Create or Update Virtual Machine request
     * @param options The options parameters.
     */
    beginCreateOrUpdate(resourceGroupName: string, referer: string, virtualMachineName: string, virtualMachineRequest: VirtualMachine, options?: VirtualMachinesCreateOrUpdateOptionalParams): Promise<PollerLike<PollOperationState<VirtualMachinesCreateOrUpdateResponse>, VirtualMachinesCreateOrUpdateResponse>>;
    /**
     * Create Or Update Virtual Machine
     * @param resourceGroupName The name of the resource group
     * @param referer referer url
     * @param virtualMachineName virtual machine name
     * @param virtualMachineRequest Create or Update Virtual Machine request
     * @param options The options parameters.
     */
    beginCreateOrUpdateAndWait(resourceGroupName: string, referer: string, virtualMachineName: string, virtualMachineRequest: VirtualMachine, options?: VirtualMachinesCreateOrUpdateOptionalParams): Promise<VirtualMachinesCreateOrUpdateResponse>;
    /**
     * Delete virtual machine
     * @param resourceGroupName The name of the resource group
     * @param referer referer url
     * @param virtualMachineName virtual machine name
     * @param options The options parameters.
     */
    beginDelete(resourceGroupName: string, referer: string, virtualMachineName: string, options?: VirtualMachinesDeleteOptionalParams): Promise<PollerLike<PollOperationState<VirtualMachinesDeleteResponse>, VirtualMachinesDeleteResponse>>;
    /**
     * Delete virtual machine
     * @param resourceGroupName The name of the resource group
     * @param referer referer url
     * @param virtualMachineName virtual machine name
     * @param options The options parameters.
     */
    beginDeleteAndWait(resourceGroupName: string, referer: string, virtualMachineName: string, options?: VirtualMachinesDeleteOptionalParams): Promise<VirtualMachinesDeleteResponse>;
    /**
     * Patch virtual machine properties
     * @param resourceGroupName The name of the resource group
     * @param virtualMachineName virtual machine name
     * @param virtualMachineRequest Patch virtual machine request
     * @param options The options parameters.
     */
    beginUpdate(resourceGroupName: string, virtualMachineName: string, virtualMachineRequest: PatchPayload, options?: VirtualMachinesUpdateOptionalParams): Promise<PollerLike<PollOperationState<VirtualMachinesUpdateResponse>, VirtualMachinesUpdateResponse>>;
    /**
     * Patch virtual machine properties
     * @param resourceGroupName The name of the resource group
     * @param virtualMachineName virtual machine name
     * @param virtualMachineRequest Patch virtual machine request
     * @param options The options parameters.
     */
    beginUpdateAndWait(resourceGroupName: string, virtualMachineName: string, virtualMachineRequest: PatchPayload, options?: VirtualMachinesUpdateOptionalParams): Promise<VirtualMachinesUpdateResponse>;
    /**
     * Power on virtual machine
     * @param resourceGroupName The name of the resource group
     * @param referer referer url
     * @param virtualMachineName virtual machine name
     * @param options The options parameters.
     */
    beginStart(resourceGroupName: string, referer: string, virtualMachineName: string, options?: VirtualMachinesStartOptionalParams): Promise<PollerLike<PollOperationState<void>, void>>;
    /**
     * Power on virtual machine
     * @param resourceGroupName The name of the resource group
     * @param referer referer url
     * @param virtualMachineName virtual machine name
     * @param options The options parameters.
     */
    beginStartAndWait(resourceGroupName: string, referer: string, virtualMachineName: string, options?: VirtualMachinesStartOptionalParams): Promise<void>;
    /**
     * Power off virtual machine, options: shutdown, poweroff, and suspend
     * @param resourceGroupName The name of the resource group
     * @param referer referer url
     * @param virtualMachineName virtual machine name
     * @param options The options parameters.
     */
    beginStop(resourceGroupName: string, referer: string, virtualMachineName: string, options?: VirtualMachinesStopOptionalParams): Promise<PollerLike<PollOperationState<void>, void>>;
    /**
     * Power off virtual machine, options: shutdown, poweroff, and suspend
     * @param resourceGroupName The name of the resource group
     * @param referer referer url
     * @param virtualMachineName virtual machine name
     * @param options The options parameters.
     */
    beginStopAndWait(resourceGroupName: string, referer: string, virtualMachineName: string, options?: VirtualMachinesStopOptionalParams): Promise<void>;
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
//# sourceMappingURL=virtualMachines.d.ts.map