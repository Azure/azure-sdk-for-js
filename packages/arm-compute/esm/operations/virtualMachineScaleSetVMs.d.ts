import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a VirtualMachineScaleSetVMs. */
export declare class VirtualMachineScaleSetVMs {
    private readonly client;
    /**
     * Create a VirtualMachineScaleSetVMs.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Reimages (upgrade the operating system) a specific virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    reimage(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Allows you to re-image all the disks ( including data disks ) in the a VM scale set instance.
     * This operation is only supported for managed disks.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    reimageAll(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Deallocates a specific virtual machine in a VM scale set. Shuts down the virtual machine and
     * releases the compute resources it uses. You are not billed for the compute resources of this
     * virtual machine once it is deallocated.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deallocate(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Updates a virtual machine of a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set where the extension should be create
     * or updated.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {VirtualMachineScaleSetVM} parameters Parameters supplied to the Update Virtual Machine
     * Scale Sets VM operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    update(resourceGroupName: string, vmScaleSetName: string, instanceId: string, parameters: Models.VirtualMachineScaleSetVM, options?: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetVMsUpdateResponse>;
    /**
     * Deletes a virtual machine from a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Gets a virtual machine from a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, vmScaleSetName: string, instanceId: string): Promise<Models.VirtualMachineScaleSetVMsGetResponse>;
    get(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetVMsGetResponse>;
    get(resourceGroupName: string, vmScaleSetName: string, instanceId: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetVM>): void;
    get(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetVM>): void;
    /**
     * Gets the status of a virtual machine from a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getInstanceView(resourceGroupName: string, vmScaleSetName: string, instanceId: string): Promise<Models.VirtualMachineScaleSetVMsGetInstanceViewResponse>;
    getInstanceView(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetVMsGetInstanceViewResponse>;
    getInstanceView(resourceGroupName: string, vmScaleSetName: string, instanceId: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetVMInstanceView>): void;
    getInstanceView(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetVMInstanceView>): void;
    /**
     * Gets a list of all virtual machines in a VM scale sets.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} virtualMachineScaleSetName The name of the VM scale set.
     *
     * @param {VirtualMachineScaleSetVMsListOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(resourceGroupName: string, virtualMachineScaleSetName: string): Promise<Models.VirtualMachineScaleSetVMsListResponse>;
    list(resourceGroupName: string, virtualMachineScaleSetName: string, options: Models.VirtualMachineScaleSetVMsListOptionalParams): Promise<Models.VirtualMachineScaleSetVMsListResponse>;
    list(resourceGroupName: string, virtualMachineScaleSetName: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetVMListResult>): void;
    list(resourceGroupName: string, virtualMachineScaleSetName: string, options: Models.VirtualMachineScaleSetVMsListOptionalParams, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetVMListResult>): void;
    /**
     * Power off (stop) a virtual machine in a VM scale set. Note that resources are still attached and
     * you are getting charged for the resources. Instead, use deallocate to release resources and
     * avoid charges.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    powerOff(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Restarts a virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    restart(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Starts a virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    start(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Redeploys a virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    redeploy(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Performs maintenance on a virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    performMaintenance(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Run command on a virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RunCommandInput} parameters Parameters supplied to the Run command operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    runCommand(resourceGroupName: string, vmScaleSetName: string, instanceId: string, parameters: Models.RunCommandInput, options?: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetVMsRunCommandResponse>;
    /**
     * Reimages (upgrade the operating system) a specific virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginReimage(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Allows you to re-image all the disks ( including data disks ) in the a VM scale set instance.
     * This operation is only supported for managed disks.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginReimageAll(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Deallocates a specific virtual machine in a VM scale set. Shuts down the virtual machine and
     * releases the compute resources it uses. You are not billed for the compute resources of this
     * virtual machine once it is deallocated.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeallocate(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Updates a virtual machine of a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set where the extension should be create
     * or updated.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {VirtualMachineScaleSetVM} parameters Parameters supplied to the Update Virtual Machine
     * Scale Sets VM operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginUpdate(resourceGroupName: string, vmScaleSetName: string, instanceId: string, parameters: Models.VirtualMachineScaleSetVM, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Deletes a virtual machine from a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeleteMethod(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Power off (stop) a virtual machine in a VM scale set. Note that resources are still attached and
     * you are getting charged for the resources. Instead, use deallocate to release resources and
     * avoid charges.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginPowerOff(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Restarts a virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginRestart(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Starts a virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginStart(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Redeploys a virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginRedeploy(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Performs maintenance on a virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginPerformMaintenance(resourceGroupName: string, vmScaleSetName: string, instanceId: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Run command on a virtual machine in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set.
     *
     * @param {string} instanceId The instance ID of the virtual machine.
     *
     * @param {RunCommandInput} parameters Parameters supplied to the Run command operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginRunCommand(resourceGroupName: string, vmScaleSetName: string, instanceId: string, parameters: Models.RunCommandInput, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Gets a list of all virtual machines in a VM scale sets.
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
    listNext(nextPageLink: string): Promise<Models.VirtualMachineScaleSetVMsListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetVMsListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetVMListResult>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetVMListResult>): void;
}
//# sourceMappingURL=virtualMachineScaleSetVMs.d.ts.map