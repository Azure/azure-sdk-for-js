import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a VirtualMachineScaleSets. */
export declare class VirtualMachineScaleSets {
    private readonly client;
    /**
     * Create a VirtualMachineScaleSets.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Create or update a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set to create or update.
     *
     * @param {VirtualMachineScaleSet} parameters The scale set object.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createOrUpdate(resourceGroupName: string, vmScaleSetName: string, parameters: Models.VirtualMachineScaleSet, options?: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsCreateOrUpdateResponse>;
    /**
     * Update a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set to create or update.
     *
     * @param {VirtualMachineScaleSetUpdate} parameters The scale set object.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    update(resourceGroupName: string, vmScaleSetName: string, parameters: Models.VirtualMachineScaleSetUpdate, options?: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsUpdateResponse>;
    /**
     * Deletes a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, vmScaleSetName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Display information about a virtual machine scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, vmScaleSetName: string): Promise<Models.VirtualMachineScaleSetsGetResponse>;
    get(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsGetResponse>;
    get(resourceGroupName: string, vmScaleSetName: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSet>): void;
    get(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSet>): void;
    /**
     * Deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and
     * releases the compute resources. You are not billed for the compute resources that this virtual
     * machine scale set deallocates.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsDeallocateOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deallocate(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsDeallocateOptionalParams): Promise<msRest.RestResponse>;
    /**
     * Deletes virtual machines in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetVMInstanceRequiredIDs} vmInstanceIDs A list of virtual machine
     * instance IDs from the VM scale set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteInstances(resourceGroupName: string, vmScaleSetName: string, vmInstanceIDs: Models.VirtualMachineScaleSetVMInstanceRequiredIDs, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Gets the status of a VM scale set instance.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getInstanceView(resourceGroupName: string, vmScaleSetName: string): Promise<Models.VirtualMachineScaleSetsGetInstanceViewResponse>;
    getInstanceView(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsGetInstanceViewResponse>;
    getInstanceView(resourceGroupName: string, vmScaleSetName: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetInstanceView>): void;
    getInstanceView(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetInstanceView>): void;
    /**
     * Gets a list of all VM scale sets under a resource group.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(resourceGroupName: string): Promise<Models.VirtualMachineScaleSetsListResponse>;
    list(resourceGroupName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsListResponse>;
    list(resourceGroupName: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListResult>): void;
    list(resourceGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListResult>): void;
    /**
     * Gets a list of all VM Scale Sets in the subscription, regardless of the associated resource
     * group. Use nextLink property in the response to get the next page of VM Scale Sets. Do this till
     * nextLink is null to fetch all the VM Scale Sets.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listAll(): Promise<Models.VirtualMachineScaleSetsListAllResponse>;
    listAll(options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsListAllResponse>;
    listAll(callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListWithLinkResult>): void;
    listAll(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListWithLinkResult>): void;
    /**
     * Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM
     * instances allowed for each SKU.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listSkus(resourceGroupName: string, vmScaleSetName: string): Promise<Models.VirtualMachineScaleSetsListSkusResponse>;
    listSkus(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsListSkusResponse>;
    listSkus(resourceGroupName: string, vmScaleSetName: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListSkusResult>): void;
    listSkus(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListSkusResult>): void;
    /**
     * Gets list of OS upgrades on a VM scale set instance.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getOSUpgradeHistory(resourceGroupName: string, vmScaleSetName: string): Promise<Models.VirtualMachineScaleSetsGetOSUpgradeHistoryResponse>;
    getOSUpgradeHistory(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsGetOSUpgradeHistoryResponse>;
    getOSUpgradeHistory(resourceGroupName: string, vmScaleSetName: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListOSUpgradeHistory>): void;
    getOSUpgradeHistory(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListOSUpgradeHistory>): void;
    /**
     * Power off (stop) one or more virtual machines in a VM scale set. Note that resources are still
     * attached and you are getting charged for the resources. Instead, use deallocate to release
     * resources and avoid charges.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsPowerOffOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    powerOff(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsPowerOffOptionalParams): Promise<msRest.RestResponse>;
    /**
     * Restarts one or more virtual machines in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsRestartOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    restart(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsRestartOptionalParams): Promise<msRest.RestResponse>;
    /**
     * Starts one or more virtual machines in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsStartOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    start(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsStartOptionalParams): Promise<msRest.RestResponse>;
    /**
     * Redeploy one or more virtual machines in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsRedeployOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    redeploy(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsRedeployOptionalParams): Promise<msRest.RestResponse>;
    /**
     * Perform maintenance on one or more virtual machines in a VM scale set. Operation on instances
     * which are not eligible for perform maintenance will be failed. Please refer to best practices
     * for more details:
     * https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-maintenance-notifications
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsPerformMaintenanceOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    performMaintenance(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsPerformMaintenanceOptionalParams): Promise<msRest.RestResponse>;
    /**
     * Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetVMInstanceRequiredIDs} vmInstanceIDs A list of virtual machine
     * instance IDs from the VM scale set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateInstances(resourceGroupName: string, vmScaleSetName: string, vmInstanceIDs: Models.VirtualMachineScaleSetVMInstanceRequiredIDs, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Reimages (upgrade the operating system) one or more virtual machines in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsReimageOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    reimage(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsReimageOptionalParams): Promise<msRest.RestResponse>;
    /**
     * Reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This
     * operation is only supported for managed disks.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsReimageAllOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    reimageAll(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsReimageAllOptionalParams): Promise<msRest.RestResponse>;
    /**
     * Manual platform update domain walk to update virtual machines in a service fabric virtual
     * machine scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {number} platformUpdateDomain The platform update domain for which a manual recovery walk
     * is requested
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    forceRecoveryServiceFabricPlatformUpdateDomainWalk(resourceGroupName: string, vmScaleSetName: string, platformUpdateDomain: number): Promise<Models.VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkResponse>;
    forceRecoveryServiceFabricPlatformUpdateDomainWalk(resourceGroupName: string, vmScaleSetName: string, platformUpdateDomain: number, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkResponse>;
    forceRecoveryServiceFabricPlatformUpdateDomainWalk(resourceGroupName: string, vmScaleSetName: string, platformUpdateDomain: number, callback: msRest.ServiceCallback<Models.RecoveryWalkResponse>): void;
    forceRecoveryServiceFabricPlatformUpdateDomainWalk(resourceGroupName: string, vmScaleSetName: string, platformUpdateDomain: number, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RecoveryWalkResponse>): void;
    /**
     * Create or update a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set to create or update.
     *
     * @param {VirtualMachineScaleSet} parameters The scale set object.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginCreateOrUpdate(resourceGroupName: string, vmScaleSetName: string, parameters: Models.VirtualMachineScaleSet, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Update a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set to create or update.
     *
     * @param {VirtualMachineScaleSetUpdate} parameters The scale set object.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginUpdate(resourceGroupName: string, vmScaleSetName: string, parameters: Models.VirtualMachineScaleSetUpdate, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Deletes a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeleteMethod(resourceGroupName: string, vmScaleSetName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and
     * releases the compute resources. You are not billed for the compute resources that this virtual
     * machine scale set deallocates.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsBeginDeallocateOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeallocate(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsBeginDeallocateOptionalParams): Promise<msRestAzure.LROPoller>;
    /**
     * Deletes virtual machines in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetVMInstanceRequiredIDs} vmInstanceIDs A list of virtual machine
     * instance IDs from the VM scale set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeleteInstances(resourceGroupName: string, vmScaleSetName: string, vmInstanceIDs: Models.VirtualMachineScaleSetVMInstanceRequiredIDs, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Power off (stop) one or more virtual machines in a VM scale set. Note that resources are still
     * attached and you are getting charged for the resources. Instead, use deallocate to release
     * resources and avoid charges.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsBeginPowerOffOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginPowerOff(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsBeginPowerOffOptionalParams): Promise<msRestAzure.LROPoller>;
    /**
     * Restarts one or more virtual machines in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsBeginRestartOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginRestart(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsBeginRestartOptionalParams): Promise<msRestAzure.LROPoller>;
    /**
     * Starts one or more virtual machines in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsBeginStartOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginStart(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsBeginStartOptionalParams): Promise<msRestAzure.LROPoller>;
    /**
     * Redeploy one or more virtual machines in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsBeginRedeployOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginRedeploy(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsBeginRedeployOptionalParams): Promise<msRestAzure.LROPoller>;
    /**
     * Perform maintenance on one or more virtual machines in a VM scale set. Operation on instances
     * which are not eligible for perform maintenance will be failed. Please refer to best practices
     * for more details:
     * https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-maintenance-notifications
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsBeginPerformMaintenanceOptionalParams} [options] Optional
     * Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginPerformMaintenance(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsBeginPerformMaintenanceOptionalParams): Promise<msRestAzure.LROPoller>;
    /**
     * Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetVMInstanceRequiredIDs} vmInstanceIDs A list of virtual machine
     * instance IDs from the VM scale set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginUpdateInstances(resourceGroupName: string, vmScaleSetName: string, vmInstanceIDs: Models.VirtualMachineScaleSetVMInstanceRequiredIDs, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Reimages (upgrade the operating system) one or more virtual machines in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsBeginReimageOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginReimage(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsBeginReimageOptionalParams): Promise<msRestAzure.LROPoller>;
    /**
     * Reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This
     * operation is only supported for managed disks.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetsBeginReimageAllOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginReimageAll(resourceGroupName: string, vmScaleSetName: string, options?: Models.VirtualMachineScaleSetsBeginReimageAllOptionalParams): Promise<msRestAzure.LROPoller>;
    /**
     * Gets a list of all VM scale sets under a resource group.
     *
     * @param {string} nextPageLink The NextLink from the previous successful call to List operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listNext(nextPageLink: string): Promise<Models.VirtualMachineScaleSetsListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListResult>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListResult>): void;
    /**
     * Gets a list of all VM Scale Sets in the subscription, regardless of the associated resource
     * group. Use nextLink property in the response to get the next page of VM Scale Sets. Do this till
     * nextLink is null to fetch all the VM Scale Sets.
     *
     * @param {string} nextPageLink The NextLink from the previous successful call to List operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listAllNext(nextPageLink: string): Promise<Models.VirtualMachineScaleSetsListAllNextResponse>;
    listAllNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsListAllNextResponse>;
    listAllNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListWithLinkResult>): void;
    listAllNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListWithLinkResult>): void;
    /**
     * Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM
     * instances allowed for each SKU.
     *
     * @param {string} nextPageLink The NextLink from the previous successful call to List operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listSkusNext(nextPageLink: string): Promise<Models.VirtualMachineScaleSetsListSkusNextResponse>;
    listSkusNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsListSkusNextResponse>;
    listSkusNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListSkusResult>): void;
    listSkusNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListSkusResult>): void;
    /**
     * Gets list of OS upgrades on a VM scale set instance.
     *
     * @param {string} nextPageLink The NextLink from the previous successful call to List operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getOSUpgradeHistoryNext(nextPageLink: string): Promise<Models.VirtualMachineScaleSetsGetOSUpgradeHistoryNextResponse>;
    getOSUpgradeHistoryNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetsGetOSUpgradeHistoryNextResponse>;
    getOSUpgradeHistoryNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListOSUpgradeHistory>): void;
    getOSUpgradeHistoryNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetListOSUpgradeHistory>): void;
}
//# sourceMappingURL=virtualMachineScaleSets.d.ts.map