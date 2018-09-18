import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a VirtualMachineScaleSetRollingUpgrades. */
export declare class VirtualMachineScaleSetRollingUpgrades {
    private readonly client;
    /**
     * Create a VirtualMachineScaleSetRollingUpgrades.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Cancels the current virtual machine scale set rolling upgrade.
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
    cancel(resourceGroupName: string, vmScaleSetName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Starts a rolling upgrade to move all virtual machine scale set instances to the latest available
     * Platform Image OS version. Instances which are already running the latest available OS version
     * are not affected.
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
    startOSUpgrade(resourceGroupName: string, vmScaleSetName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Starts a rolling upgrade to move all extensions for all virtual machine scale set instances to
     * the latest available extension version. Instances which are already running the latest extension
     * versions are not affected.
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
    startExtensionUpgrade(resourceGroupName: string, vmScaleSetName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Gets the status of the latest virtual machine scale set rolling upgrade.
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
    getLatest(resourceGroupName: string, vmScaleSetName: string): Promise<Models.VirtualMachineScaleSetRollingUpgradesGetLatestResponse>;
    getLatest(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineScaleSetRollingUpgradesGetLatestResponse>;
    getLatest(resourceGroupName: string, vmScaleSetName: string, callback: msRest.ServiceCallback<Models.RollingUpgradeStatusInfo>): void;
    getLatest(resourceGroupName: string, vmScaleSetName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RollingUpgradeStatusInfo>): void;
    /**
     * Cancels the current virtual machine scale set rolling upgrade.
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
    beginCancel(resourceGroupName: string, vmScaleSetName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Starts a rolling upgrade to move all virtual machine scale set instances to the latest available
     * Platform Image OS version. Instances which are already running the latest available OS version
     * are not affected.
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
    beginStartOSUpgrade(resourceGroupName: string, vmScaleSetName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Starts a rolling upgrade to move all extensions for all virtual machine scale set instances to
     * the latest available extension version. Instances which are already running the latest extension
     * versions are not affected.
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
    beginStartExtensionUpgrade(resourceGroupName: string, vmScaleSetName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
}
//# sourceMappingURL=virtualMachineScaleSetRollingUpgrades.d.ts.map