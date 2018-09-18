import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a VirtualMachineExtensions. */
export declare class VirtualMachineExtensions {
    private readonly client;
    /**
     * Create a VirtualMachineExtensions.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * The operation to create or update the extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine where the extension should be created or
     * updated.
     *
     * @param {string} vmExtensionName The name of the virtual machine extension.
     *
     * @param {VirtualMachineExtension} extensionParameters Parameters supplied to the Create Virtual
     * Machine Extension operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createOrUpdate(resourceGroupName: string, vmName: string, vmExtensionName: string, extensionParameters: Models.VirtualMachineExtension, options?: msRest.RequestOptionsBase): Promise<Models.VirtualMachineExtensionsCreateOrUpdateResponse>;
    /**
     * The operation to update the extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine where the extension should be updated.
     *
     * @param {string} vmExtensionName The name of the virtual machine extension.
     *
     * @param {VirtualMachineExtensionUpdate} extensionParameters Parameters supplied to the Update
     * Virtual Machine Extension operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    update(resourceGroupName: string, vmName: string, vmExtensionName: string, extensionParameters: Models.VirtualMachineExtensionUpdate, options?: msRest.RequestOptionsBase): Promise<Models.VirtualMachineExtensionsUpdateResponse>;
    /**
     * The operation to delete the extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine where the extension should be deleted.
     *
     * @param {string} vmExtensionName The name of the virtual machine extension.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, vmName: string, vmExtensionName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * The operation to get the extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine containing the extension.
     *
     * @param {string} vmExtensionName The name of the virtual machine extension.
     *
     * @param {VirtualMachineExtensionsGetOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, vmName: string, vmExtensionName: string): Promise<Models.VirtualMachineExtensionsGetResponse>;
    get(resourceGroupName: string, vmName: string, vmExtensionName: string, options: Models.VirtualMachineExtensionsGetOptionalParams): Promise<Models.VirtualMachineExtensionsGetResponse>;
    get(resourceGroupName: string, vmName: string, vmExtensionName: string, callback: msRest.ServiceCallback<Models.VirtualMachineExtension>): void;
    get(resourceGroupName: string, vmName: string, vmExtensionName: string, options: Models.VirtualMachineExtensionsGetOptionalParams, callback: msRest.ServiceCallback<Models.VirtualMachineExtension>): void;
    /**
     * The operation to get all extensions of a Virtual Machine.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine containing the extension.
     *
     * @param {VirtualMachineExtensionsListOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(resourceGroupName: string, vmName: string): Promise<Models.VirtualMachineExtensionsListResponse>;
    list(resourceGroupName: string, vmName: string, options: Models.VirtualMachineExtensionsListOptionalParams): Promise<Models.VirtualMachineExtensionsListResponse>;
    list(resourceGroupName: string, vmName: string, callback: msRest.ServiceCallback<Models.VirtualMachineExtensionsListResult>): void;
    list(resourceGroupName: string, vmName: string, options: Models.VirtualMachineExtensionsListOptionalParams, callback: msRest.ServiceCallback<Models.VirtualMachineExtensionsListResult>): void;
    /**
     * The operation to create or update the extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine where the extension should be created or
     * updated.
     *
     * @param {string} vmExtensionName The name of the virtual machine extension.
     *
     * @param {VirtualMachineExtension} extensionParameters Parameters supplied to the Create Virtual
     * Machine Extension operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginCreateOrUpdate(resourceGroupName: string, vmName: string, vmExtensionName: string, extensionParameters: Models.VirtualMachineExtension, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * The operation to update the extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine where the extension should be updated.
     *
     * @param {string} vmExtensionName The name of the virtual machine extension.
     *
     * @param {VirtualMachineExtensionUpdate} extensionParameters Parameters supplied to the Update
     * Virtual Machine Extension operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginUpdate(resourceGroupName: string, vmName: string, vmExtensionName: string, extensionParameters: Models.VirtualMachineExtensionUpdate, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * The operation to delete the extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmName The name of the virtual machine where the extension should be deleted.
     *
     * @param {string} vmExtensionName The name of the virtual machine extension.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeleteMethod(resourceGroupName: string, vmName: string, vmExtensionName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
}
//# sourceMappingURL=virtualMachineExtensions.d.ts.map