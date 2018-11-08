import * as Models from "../lib/generated/models";
import { Aborter } from "./Aborter";
import { Service } from "./generated/operations";
import { Pipeline } from "./Pipeline";
import { StorageURL } from "./StorageURL";

export interface IServiceListSharesSegmentOptions {
  /**
   * Filters the results to return only entries whose
   * name begins with the specified prefix.
   *
   * @type {string}
   * @memberof IServiceListSharesSegmentOptions
   */
  prefix?: string;

  /**
   * Specifies the maximum number of entries to
   * return. If the request does not specify maxresults, or specifies a value
   * greater than 5,000, the server will return up to 5,000 items.
   *
   * @type {number}
   * @memberof IServiceListSharesSegmentOptions
   */
  maxresults?: number;

  /**
   * Include this parameter to
   * specify one or more datasets to include in the response.
   *
   * @type {Models.ListSharesIncludeType[]}
   * @memberof IServiceListSharesSegmentOptions
   */
  include?: Models.ListSharesIncludeType[];
}

/**
 * A ServiceURL represents a URL to the Azure Storage File service allowing you
 * to manipulate file shares.
 *
 * @export
 * @class ServiceURL
 * @extends {StorageURL}
 */
export class ServiceURL extends StorageURL {
  /**
   * serviceContext provided by protocol layer.
   *
   * @private
   * @type {Service}
   * @memberof ServiceURL
   */
  private serviceContext: Service;

  /**
   * Creates an instance of ServiceURL.
   *
   * @param {string} url A URL string pointing to Azure Storage file service, such as
   *                     "https://myaccount.file.core.windows.net". You can Append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.file.core.windows.net?sasString".
   * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof ServiceURL
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.serviceContext = new Service(this.storageClientContext);
  }

  /**
   * Creates a new ServiceURL object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {ServiceURL}
   * @memberof ServiceURL
   */
  public withPipeline(pipeline: Pipeline): ServiceURL {
    return new ServiceURL(this.url, pipeline);
  }

  /**
   * Gets the properties of a storage account’s file service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-file-service-properties}
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.ServiceGetPropertiesResponse>}
   * @memberof ServiceURL
   */
  public async getProperties(
    aborter: Aborter
  ): Promise<Models.ServiceGetPropertiesResponse> {
    return this.serviceContext.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Sets properties for a storage account’s file service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-service-properties}
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {Models.StorageServiceProperties} properties
   * @returns {Promise<Models.ServiceSetPropertiesResponse>}
   * @memberof ServiceURL
   */
  public async setProperties(
    aborter: Aborter,
    properties: Models.StorageServiceProperties
  ): Promise<Models.ServiceSetPropertiesResponse> {
    return this.serviceContext.setProperties(properties, {
      abortSignal: aborter
    });
  }

  /**
   * Gets the properties of a storage account's File service, including properties for Storage
   * Analytics metrics and CORS (Cross-Origin Resource Sharing) rules.
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list to be returned with the next list operation. The operation
   *                          returns a marker value within the response body if the list returned was
   *                          not complete. The marker value may then be used in a subsequent call to
   *                          request the next set of list items. The marker value is opaque to the
   *                          client.
   * @param {IServiceListSharesSegmentOptions} [options={}]
   * @returns {Promise<Models.ServiceListSharesSegmentResponse>}
   * @memberof ServiceURL
   */
  public async listSharesSegment(
    aborter: Aborter,
    marker?: string,
    options: IServiceListSharesSegmentOptions = {}
  ): Promise<Models.ServiceListSharesSegmentResponse> {
    return this.serviceContext.listSharesSegment({
      abortSignal: aborter,
      marker,
      ...options
    });
  }
}
