import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a VirtualMachines. */
export declare class VirtualMachines {
    private readonly client;
    /**
     * Create a VirtualMachines.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used
     * to create similar VMs.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {VirtualMachineCaptureParameters} parameters Parameters supplied to the Capture Virtual
     * Machine operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    capture(resourceGroupName: string, vmName: string, parameters: Models.VirtualMachineCaptureParameters, options?: msRest.RequestOptionsBase): Promise<Models.VirtualMachinesCaptureResponse>;
    /**
     * The operation to create or update a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {VirtualMachine} parameters Parameters supplied to the Create Virtual Machine operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createOrUpdate(resourceGroupName: string, vmName: string, parameters: Models.VirtualMachine, options?: msRest.RequestOptionsBase): Promise<Models.VirtualMachinesCreateOrUpdateResponse>;
    /**
     * The operation to update a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {VirtualMachineUpdate} parameters Parameters supplied to the Update Virtual Machine
     * operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    update(resourceGroupName: string, vmName: string, parameters: Models.VirtualMachineUpdate, options?: msRest.RequestOptionsBase): Promise<Models.VirtualMachinesUpdateResponse>;
    /**
     * The operation to delete a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Retrieves information about the model view or the instance view of a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {VirtualMachinesGetOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, vmName: string): Promise<Models.VirtualMachinesGetResponse>;
    get(resourceGroupName: string, vmName: string, options: Models.VirtualMachinesGetOptionalParams): Promise<Models.VirtualMachinesGetResponse>;
    get(resourceGroupName: string, vmName: string, callback: msRest.ServiceCallback<Models.VirtualMachine>): void;
    get(resourceGroupName: string, vmName: string, options: Models.VirtualMachinesGetOptionalParams, callback: msRest.ServiceCallback<Models.VirtualMachine>): void;
    /**
     * Retrieves information about the run-time state of a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    instanceView(resourceGroupName: string, vmName: string): Promise<Models.VirtualMachinesInstanceViewResponse>;
    instanceView(resourceGroupName: string, vmName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachinesInstanceViewResponse>;
    instanceView(resourceGroupName: string, vmName: string, callback: msRest.ServiceCallback<Models.VirtualMachineInstanceView>): void;
    instanceView(resourceGroupName: string, vmName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineInstanceView>): void;
    /**
     * Converts virtual machine disks from blob-based to managed disks. Virtual machine must be
     * stop-deallocated before invoking this operation.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    convertToManagedDisks(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Shuts down the virtual machine and releases the compute resources. You are not billed for the
     * compute resources that this virtual machine uses.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deallocate(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Sets the state of the virtual machine to generalized.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    generalize(resourceGroupName: string, vmName: string): Promise<msRest.RestResponse>;
    generalize(resourceGroupName: string, vmName: string, options: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    generalize(resourceGroupName: string, vmName: string, callback: msRest.ServiceCallback<void>): void;
    generalize(resourceGroupName: string, vmName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * Lists all of the virtual machines in the specified resource group. Use the nextLink property in
     * the response to get the next page of virtual machines.
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
    list(resourceGroupName: string): Promise<Models.VirtualMachinesListResponse>;
    list(resourceGroupName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachinesListResponse>;
    list(resourceGroupName: string, callback: msRest.ServiceCallback<Models.VirtualMachineListResult>): void;
    list(resourceGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineListResult>): void;
    /**
     * Lists all of the virtual machines in the specified subscription. Use the nextLink property in
     * the response to get the next page of virtual machines.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listAll(): Promise<Models.VirtualMachinesListAllResponse>;
    listAll(options: msRest.RequestOptionsBase): Promise<Models.VirtualMachinesListAllResponse>;
    listAll(callback: msRest.ServiceCallback<Models.VirtualMachineListResult>): void;
    listAll(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineListResult>): void;
    /**
     * Lists all available virtual machine sizes to which the specified virtual machine can be resized.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listAvailableSizes(resourceGroupName: string, vmName: string): Promise<Models.VirtualMachinesListAvailableSizesResponse>;
    listAvailableSizes(resourceGroupName: string, vmName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachinesListAvailableSizesResponse>;
    listAvailableSizes(resourceGroupName: string, vmName: string, callback: msRest.ServiceCallback<Models.VirtualMachineSizeListResult>): void;
    listAvailableSizes(resourceGroupName: string, vmName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineSizeListResult>): void;
    /**
     * The operation to power off (stop) a virtual machine. The virtual machine can be restarted with
     * the same provisioned resources. You are still charged for this virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    powerOff(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * The operation to restart a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    restart(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * The operation to start a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    start(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * The operation to redeploy a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    redeploy(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * The operation to perform maintenance on a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    performMaintenance(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Run command on the VM.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
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
    runCommand(resourceGroupName: string, vmName: string, parameters: Models.RunCommandInput, options?: msRest.RequestOptionsBase): Promise<Models.VirtualMachinesRunCommandResponse>;
    /**
     * Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used
     * to create similar VMs.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {VirtualMachineCaptureParameters} parameters Parameters supplied to the Capture Virtual
     * Machine operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginCapture(resourceGroupName: string, vmName: string, parameters: Models.VirtualMachineCaptureParameters, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * The operation to create or update a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {VirtualMachine} parameters Parameters supplied to the Create Virtual Machine operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginCreateOrUpdate(resourceGroupName: string, vmName: string, parameters: Models.VirtualMachine, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * The operation to update a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {VirtualMachineUpdate} parameters Parameters supplied to the Update Virtual Machine
     * operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginUpdate(resourceGroupName: string, vmName: string, parameters: Models.VirtualMachineUpdate, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * The operation to delete a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeleteMethod(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Converts virtual machine disks from blob-based to managed disks. Virtual machine must be
     * stop-deallocated before invoking this operation.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginConvertToManagedDisks(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Shuts down the virtual machine and releases the compute resources. You are not billed for the
     * compute resources that this virtual machine uses.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeallocate(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * The operation to power off (stop) a virtual machine. The virtual machine can be restarted with
     * the same provisioned resources. You are still charged for this virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginPowerOff(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * The operation to restart a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginRestart(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * The operation to start a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginStart(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * The operation to redeploy a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginRedeploy(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * The operation to perform maintenance on a virtual machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginPerformMaintenance(resourceGroupName: string, vmName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Run command on the VM.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine.
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
    beginRunCommand(resourceGroupName: string, vmName: string, parameters: Models.RunCommandInput, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Lists all of the virtual machines in the specified resource group. Use the nextLink property in
     * the response to get the next page of virtual machines.
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
    listNext(nextPageLink: string): Promise<Models.VirtualMachinesListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachinesListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.VirtualMachineListResult>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineListResult>): void;
    /**
     * Lists all of the virtual machines in the specified subscription. Use the nextLink property in
     * the response to get the next page of virtual machines.
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
    listAllNext(nextPageLink: string): Promise<Models.VirtualMachinesListAllNextResponse>;
    listAllNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachinesListAllNextResponse>;
    listAllNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.VirtualMachineListResult>): void;
    listAllNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineListResult>): void;
}
//# sourceMappingURL=virtualMachines.d.ts.map