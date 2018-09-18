import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a VirtualMachineImages. */
export declare class VirtualMachineImages {
    private readonly client;
    /**
     * Create a VirtualMachineImages.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Gets a virtual machine image.
     *
     * @param {string} location The name of a supported Azure region.
     *
     * @param {string} publisherName A valid image publisher.
     *
     * @param {string} offer A valid image publisher offer.
     *
     * @param {string} skus A valid image SKU.
     *
     * @param {string} version A valid image SKU version.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(location: string, publisherName: string, offer: string, skus: string, version: string): Promise<Models.VirtualMachineImagesGetResponse>;
    get(location: string, publisherName: string, offer: string, skus: string, version: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineImagesGetResponse>;
    get(location: string, publisherName: string, offer: string, skus: string, version: string, callback: msRest.ServiceCallback<Models.VirtualMachineImage>): void;
    get(location: string, publisherName: string, offer: string, skus: string, version: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineImage>): void;
    /**
     * Gets a list of all virtual machine image versions for the specified location, publisher, offer,
     * and SKU.
     *
     * @param {string} location The name of a supported Azure region.
     *
     * @param {string} publisherName A valid image publisher.
     *
     * @param {string} offer A valid image publisher offer.
     *
     * @param {string} skus A valid image SKU.
     *
     * @param {VirtualMachineImagesListOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(location: string, publisherName: string, offer: string, skus: string): Promise<Models.VirtualMachineImagesListResponse>;
    list(location: string, publisherName: string, offer: string, skus: string, options: Models.VirtualMachineImagesListOptionalParams): Promise<Models.VirtualMachineImagesListResponse>;
    list(location: string, publisherName: string, offer: string, skus: string, callback: msRest.ServiceCallback<Models.VirtualMachineImageResource[]>): void;
    list(location: string, publisherName: string, offer: string, skus: string, options: Models.VirtualMachineImagesListOptionalParams, callback: msRest.ServiceCallback<Models.VirtualMachineImageResource[]>): void;
    /**
     * Gets a list of virtual machine image offers for the specified location and publisher.
     *
     * @param {string} location The name of a supported Azure region.
     *
     * @param {string} publisherName A valid image publisher.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listOffers(location: string, publisherName: string): Promise<Models.VirtualMachineImagesListOffersResponse>;
    listOffers(location: string, publisherName: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineImagesListOffersResponse>;
    listOffers(location: string, publisherName: string, callback: msRest.ServiceCallback<Models.VirtualMachineImageResource[]>): void;
    listOffers(location: string, publisherName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineImageResource[]>): void;
    /**
     * Gets a list of virtual machine image publishers for the specified Azure location.
     *
     * @param {string} location The name of a supported Azure region.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listPublishers(location: string): Promise<Models.VirtualMachineImagesListPublishersResponse>;
    listPublishers(location: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineImagesListPublishersResponse>;
    listPublishers(location: string, callback: msRest.ServiceCallback<Models.VirtualMachineImageResource[]>): void;
    listPublishers(location: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineImageResource[]>): void;
    /**
     * Gets a list of virtual machine image SKUs for the specified location, publisher, and offer.
     *
     * @param {string} location The name of a supported Azure region.
     *
     * @param {string} publisherName A valid image publisher.
     *
     * @param {string} offer A valid image publisher offer.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listSkus(location: string, publisherName: string, offer: string): Promise<Models.VirtualMachineImagesListSkusResponse>;
    listSkus(location: string, publisherName: string, offer: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineImagesListSkusResponse>;
    listSkus(location: string, publisherName: string, offer: string, callback: msRest.ServiceCallback<Models.VirtualMachineImageResource[]>): void;
    listSkus(location: string, publisherName: string, offer: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineImageResource[]>): void;
}
//# sourceMappingURL=virtualMachineImages.d.ts.map