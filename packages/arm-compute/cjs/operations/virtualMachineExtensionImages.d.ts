import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a VirtualMachineExtensionImages. */
export declare class VirtualMachineExtensionImages {
    private readonly client;
    /**
     * Create a VirtualMachineExtensionImages.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Gets a virtual machine extension image.
     *
     * @param {string} location The name of a supported Azure region.
     *
     * @param {string} publisherName
     *
     * @param {string} type
     *
     * @param {string} version
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(location: string, publisherName: string, type: string, version: string): Promise<Models.VirtualMachineExtensionImagesGetResponse>;
    get(location: string, publisherName: string, type: string, version: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineExtensionImagesGetResponse>;
    get(location: string, publisherName: string, type: string, version: string, callback: msRest.ServiceCallback<Models.VirtualMachineExtensionImage>): void;
    get(location: string, publisherName: string, type: string, version: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineExtensionImage>): void;
    /**
     * Gets a list of virtual machine extension image types.
     *
     * @param {string} location The name of a supported Azure region.
     *
     * @param {string} publisherName
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listTypes(location: string, publisherName: string): Promise<Models.VirtualMachineExtensionImagesListTypesResponse>;
    listTypes(location: string, publisherName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineExtensionImagesListTypesResponse>;
    listTypes(location: string, publisherName: string, callback: msRest.ServiceCallback<Models.VirtualMachineExtensionImage[]>): void;
    listTypes(location: string, publisherName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineExtensionImage[]>): void;
    /**
     * Gets a list of virtual machine extension image versions.
     *
     * @param {string} location The name of a supported Azure region.
     *
     * @param {string} publisherName
     *
     * @param {string} type
     *
     * @param {VirtualMachineExtensionImagesListVersionsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listVersions(location: string, publisherName: string, type: string): Promise<Models.VirtualMachineExtensionImagesListVersionsResponse>;
    listVersions(location: string, publisherName: string, type: string, options: Models.VirtualMachineExtensionImagesListVersionsOptionalParams): Promise<Models.VirtualMachineExtensionImagesListVersionsResponse>;
    listVersions(location: string, publisherName: string, type: string, callback: msRest.ServiceCallback<Models.VirtualMachineExtensionImage[]>): void;
    listVersions(location: string, publisherName: string, type: string, options: Models.VirtualMachineExtensionImagesListVersionsOptionalParams, callback: msRest.ServiceCallback<Models.VirtualMachineExtensionImage[]>): void;
}
//# sourceMappingURL=virtualMachineExtensionImages.d.ts.map