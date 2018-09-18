import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a Images. */
export declare class Images {
    private readonly client;
    /**
     * Create a Images.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Create or update an image.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} imageName The name of the image.
     *
     * @param {Image} parameters Parameters supplied to the Create Image operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createOrUpdate(resourceGroupName: string, imageName: string, parameters: Models.Image, options?: msRest.RequestOptionsBase): Promise<Models.ImagesCreateOrUpdateResponse>;
    /**
     * Update an image.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} imageName The name of the image.
     *
     * @param {ImageUpdate} parameters Parameters supplied to the Update Image operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    update(resourceGroupName: string, imageName: string, parameters: Models.ImageUpdate, options?: msRest.RequestOptionsBase): Promise<Models.ImagesUpdateResponse>;
    /**
     * Deletes an Image.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} imageName The name of the image.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, imageName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Gets an image.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} imageName The name of the image.
     *
     * @param {ImagesGetOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, imageName: string): Promise<Models.ImagesGetResponse>;
    get(resourceGroupName: string, imageName: string, options: Models.ImagesGetOptionalParams): Promise<Models.ImagesGetResponse>;
    get(resourceGroupName: string, imageName: string, callback: msRest.ServiceCallback<Models.Image>): void;
    get(resourceGroupName: string, imageName: string, options: Models.ImagesGetOptionalParams, callback: msRest.ServiceCallback<Models.Image>): void;
    /**
     * Gets the list of images under a resource group.
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
    listByResourceGroup(resourceGroupName: string): Promise<Models.ImagesListByResourceGroupResponse>;
    listByResourceGroup(resourceGroupName: string, options: msRest.RequestOptionsBase): Promise<Models.ImagesListByResourceGroupResponse>;
    listByResourceGroup(resourceGroupName: string, callback: msRest.ServiceCallback<Models.ImageListResult>): void;
    listByResourceGroup(resourceGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ImageListResult>): void;
    /**
     * Gets the list of Images in the subscription. Use nextLink property in the response to get the
     * next page of Images. Do this till nextLink is null to fetch all the Images.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(): Promise<Models.ImagesListResponse>;
    list(options: msRest.RequestOptionsBase): Promise<Models.ImagesListResponse>;
    list(callback: msRest.ServiceCallback<Models.ImageListResult>): void;
    list(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ImageListResult>): void;
    /**
     * Create or update an image.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} imageName The name of the image.
     *
     * @param {Image} parameters Parameters supplied to the Create Image operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginCreateOrUpdate(resourceGroupName: string, imageName: string, parameters: Models.Image, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Update an image.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} imageName The name of the image.
     *
     * @param {ImageUpdate} parameters Parameters supplied to the Update Image operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginUpdate(resourceGroupName: string, imageName: string, parameters: Models.ImageUpdate, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Deletes an Image.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} imageName The name of the image.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeleteMethod(resourceGroupName: string, imageName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Gets the list of images under a resource group.
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
    listByResourceGroupNext(nextPageLink: string): Promise<Models.ImagesListByResourceGroupNextResponse>;
    listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.ImagesListByResourceGroupNextResponse>;
    listByResourceGroupNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ImageListResult>): void;
    listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ImageListResult>): void;
    /**
     * Gets the list of Images in the subscription. Use nextLink property in the response to get the
     * next page of Images. Do this till nextLink is null to fetch all the Images.
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
    listNext(nextPageLink: string): Promise<Models.ImagesListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.ImagesListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ImageListResult>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ImageListResult>): void;
}
//# sourceMappingURL=images.d.ts.map