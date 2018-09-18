import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a VirtualMachineScaleSetExtensions. */
export declare class VirtualMachineScaleSetExtensions {
    private readonly client;
    /**
     * Create a VirtualMachineScaleSetExtensions.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * The operation to create or update an extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set where the extension should be create
     * or updated.
     *
     * @param {string} vmssExtensionName The name of the VM scale set extension.
     *
     * @param {VirtualMachineScaleSetExtension} extensionParameters Parameters supplied to the Create
     * VM scale set Extension operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createOrUpdate(resourceGroupName: string, vmScaleSetName: string, vmssExtensionName: string, extensionParameters: Models.VirtualMachineScaleSetExtension, options?: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetExtensionsCreateOrUpdateResponse>;
    /**
     * The operation to delete the extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set where the extension should be
     * deleted.
     *
     * @param {string} vmssExtensionName The name of the VM scale set extension.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, vmScaleSetName: string, vmssExtensionName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * The operation to get the extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set containing the extension.
     *
     * @param {string} vmssExtensionName The name of the VM scale set extension.
     *
     * @param {VirtualMachineScaleSetExtensionsGetOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, vmScaleSetName: string, vmssExtensionName: string): Promise<Models.VirtualMachineScaleSetExtensionsGetResponse>;
    get(resourceGroupName: string, vmScaleSetName: string, vmssExtensionName: string, options: Models.VirtualMachineScaleSetExtensionsGetOptionalParams): Promise<Models.VirtualMachineScaleSetExtensionsGetResponse>;
    get(resourceGroupName: string, vmScaleSetName: string, vmssExtensionName: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetExtension>): void;
    get(resourceGroupName: string, vmScaleSetName: string, vmssExtensionName: string, options: Models.VirtualMachineScaleSetExtensionsGetOptionalParams, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetExtension>): void;
    /**
     * Gets a list of all extensions in a VM scale set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set containing the extension.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(resourceGroupName: string, vmScaleSetName: string): Promise<Models.VirtualMachineScaleSetExtensionsListResponse>;
    list(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetExtensionsListResponse>;
    list(resourceGroupName: string, vmScaleSetName: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetExtensionListResult>): void;
    list(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetExtensionListResult>): void;
    /**
     * The operation to create or update an extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set where the extension should be create
     * or updated.
     *
     * @param {string} vmssExtensionName The name of the VM scale set extension.
     *
     * @param {VirtualMachineScaleSetExtension} extensionParameters Parameters supplied to the Create
     * VM scale set Extension operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginCreateOrUpdate(resourceGroupName: string, vmScaleSetName: string, vmssExtensionName: string, extensionParameters: Models.VirtualMachineScaleSetExtension, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * The operation to delete the extension.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} vmScaleSetName The name of the VM scale set where the extension should be
     * deleted.
     *
     * @param {string} vmssExtensionName The name of the VM scale set extension.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeleteMethod(resourceGroupName: string, vmScaleSetName: string, vmssExtensionName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Gets a list of all extensions in a VM scale set.
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
    listNext(nextPageLink: string): Promise<Models.VirtualMachineScaleSetExtensionsListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetExtensionsListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetExtensionListResult>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineScaleSetExtensionListResult>): void;
}
//# sourceMappingURL=virtualMachineScaleSetExtensions.d.ts.map