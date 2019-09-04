import { HttpResponse } from "@azure/ms-rest-js";

import * as Models from "./generated/src/models";
import { Aborter } from "./Aborter";
import { BatchRequest } from "./BatchRequest";
import { BatchResponseParser } from "./BatchResponseParser";
import { ParsedBatchResponse } from "./BatchResponse";
import { utf8ByteLength } from "./BatchUtils";
import { ListContainersIncludeType } from "./generated/src/models";
import { Service } from "./generated/src/operations";
import { Pipeline } from "./Pipeline";
import { StorageURL } from "./StorageURL";
import { truncatedISO8061Date } from "./utils/utils.common";

export interface IServiceListContainersSegmentOptions {
  /**
   * @member {string} [prefix] Filters the results to return only containers
   * whose name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * @member {number} [maxresults] Specifies the maximum number of containers
   * to return. If the request does not specify maxresults, or specifies a
   * value greater than 5000, the server will return up to 5000 items. Note
   * that if the listing operation crosses a partition boundary, then the
   * service will return a continuation token for retrieving the remainder of
   * the results. For this reason, it is possible that the service will return
   * fewer results than specified by maxresults, or than the default of 5000.
   */
  maxresults?: number;
  /**
   * @member {ListContainersIncludeType} [include] Include this parameter to
   * specify that the container's metadata be returned as part of the response
   * body. Possible values include: 'metadata'
   */
  include?: ListContainersIncludeType;
}

export interface UserDelegationKey {
  /**
   * The Azure Active Directory object ID in GUID format.
   *
   * @type {string}
   * @memberof UserDelegationKey
   */
  signedOid: string;
  /**
   * The Azure Active Directory tenant ID in GUID format.
   *
   * @type {string}
   * @memberof UserDelegationKey
   */
  signedTid: string;
  /**
   * The date-time the key is active.
   *
   * @type {Date}
   * @memberof UserDelegationKey
   */
  signedStart: Date;
  /**
   * The date-time the key expires.
   *
   * @type {Date}
   * @memberof UserDelegationKey
   */
  signedExpiry: Date;
  /**
   * Abbreviation of the Azure Storage service that accepts the key.
   *
   * @type {string}
   * @memberof UserDelegationKey
   */
  signedService: string;
  /**
   * The service version that created the key.
   *
   * @type {string}
   * @memberof UserDelegationKey
   */
  signedVersion: string;
  /**
   * The key as a base64 string.
   *
   * @type {string}
   * @memberof UserDelegationKey
   */
  value: string;
}

export declare type ServiceGetUserDelegationKeyResponse = UserDelegationKey &
  Models.ServiceGetUserDelegationKeyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: Models.ServiceGetUserDelegationKeyHeaders;

      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Models.UserDelegationKey;
    };
  };

export declare type ServiceSubmitBatchResponse = ParsedBatchResponse &
  Models.ServiceSubmitBatchHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: Models.ServiceSubmitBatchHeaders;
    };
  };

/**
 * A ServiceURL represents a URL to the Azure Storage Blob service allowing you
 * to manipulate blob containers.
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
   * @param {string} url A URL string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
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
   * Gets the properties of a storage account’s Blob service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-properties}
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.ServiceGetPropertiesResponse>}
   * @memberof ServiceURL
   */
  public async getProperties(aborter: Aborter): Promise<Models.ServiceGetPropertiesResponse> {
    return this.serviceContext.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Sets properties for a storage account’s Blob service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-service-properties}
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
   * Retrieves statistics related to replication for the Blob service. It is only
   * available on the secondary location endpoint when read-access geo-redundant
   * replication is enabled for the storage account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-stats}
   *
   *  @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.ServiceGetStatisticsResponse>}
   * @memberof ServiceURL
   */
  public async getStatistics(aborter: Aborter): Promise<Models.ServiceGetStatisticsResponse> {
    return this.serviceContext.getStatistics({
      abortSignal: aborter
    });
  }

  /**
   * The Get Account Information operation returns the sku name and account kind
   * for the specified account.
   * The Get Account Information operation is available on service versions beginning
   * with version 2018-03-28.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-account-information
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.ServiceGetAccountInfoResponse>}
   * @memberof ServiceURL
   */
  public async getAccountInfo(aborter: Aborter): Promise<Models.ServiceGetAccountInfoResponse> {
    return this.serviceContext.getAccountInfo({
      abortSignal: aborter
    });
  }

  /**
   * Returns a list of the containers under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-containers2
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of containers to be returned with the next listing operation. The
   *                          operation returns the NextMarker value within the response body if the
   *                          listing operation did not return all containers remaining to be listed
   *                          with the current page. The NextMarker value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {IServiceListContainersSegmentOptions} [options]
   * @returns {Promise<Models.ServiceListContainersSegmentResponse>}
   * @memberof ServiceURL
   */
  public async listContainersSegment(
    aborter: Aborter,
    marker?: string,
    options: IServiceListContainersSegmentOptions = {}
  ): Promise<Models.ServiceListContainersSegmentResponse> {
    return this.serviceContext.listContainersSegment({
      abortSignal: aborter,
      marker,
      ...options
    });
  }

  /**
   * ONLY AVAILABLE WHEN USING BEARER TOKEN AUTHENTICATION (TokenCredential).
   *
   * Retrieves a user delegation key for the Blob service. This is only a valid operation when using
   * bearer token authentication.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-user-delegation-key
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {Date} start      The start time for the user delegation SAS. Must be within 7 days of the current time
   * @param {Date} expiry     The end time for the user delegation SAS. Must be within 7 days of the current time
   * @returns {Promise<ServiceGetUserDelegationKeyResponse>}
   * @memberof ServiceURL
   */
  public async getUserDelegationKey(
    aborter: Aborter,
    start: Date,
    expiry: Date
  ): Promise<ServiceGetUserDelegationKeyResponse> {
    const response = await this.serviceContext.getUserDelegationKey(
      {
        start: truncatedISO8061Date(start, false),
        expiry: truncatedISO8061Date(expiry, false)
      },
      {
        abortSignal: aborter
      }
    );

    const userDelegationKey = {
      signedOid: response.signedOid,
      signedTid: response.signedTid,
      signedStart: new Date(response.signedStart),
      signedExpiry: new Date(response.signedExpiry),
      signedService: response.signedService,
      signedVersion: response.signedVersion,
      value: response.value
    };

    const res: ServiceGetUserDelegationKeyResponse = {
      _response: response._response,
      requestId: response.requestId,
      clientRequestId: response.clientRequestId,
      version: response.version,
      date: response.date,
      errorCode: response.errorCode,
      ...userDelegationKey,
    };

    return res;
  }

  /**
   * Submit batch request which consists of multiple subrequests.
   *
   * @example
   * let batchDeleteRequest = new BatchDeleteRequest();
   * await batchDeleteRequest.addSubRequest(urlInString0, credential0);
   * await batchDeleteRequest.addSubRequest(urlInString1, credential1, {
   *  deleteSnapshots: "include"
   * });
   * const deleteBatchResp = await serviceURL.submitBatch(Aborter.none, batchDeleteRequest);
   * console.log(deleteBatchResp.subResponsesSucceededCount);
   * 
   * @example
   * let batchSetTierRequest = new BatchSetTierRequest();
   * await batchSetTierRequest.addSubRequest(blockBlobURL0, "Cool");
   * await batchSetTierRequest.addSubRequest(blockBlobURL1, "Cool", {
   *  leaseAccessConditions: { leaseId: leaseId }
   * });
   * const setTierBatchResp = await serviceURL.submitBatch(Aborter.none, batchSetTierRequest);
   * console.log(setTierBatchResp.subResponsesSucceededCount);
   * 
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch
   * 
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation.
   * @param {BatchRequest} batchRequest Supported batch request: BatchDeleteRequest or BatchSetTierRequest.
   * @param {Models.ServiceSubmitBatchOptionalParams} [options]
   * @returns {Promise<ServiceSubmitBatchResponse>}
   * @memberof ServiceURL
   */
  public async submitBatch(
    aborter: Aborter,
    batchRequest: BatchRequest,
    options?: Models.ServiceSubmitBatchOptionalParams
  ): Promise<ServiceSubmitBatchResponse> {
    if (!batchRequest || batchRequest.getSubRequests().size == 0) {
      throw new RangeError("Batch request should contain one or more sub requests.")
    }

    const batchRequestBody = batchRequest.getHttpRequestBody();

    const rawBatchResponse: Models.ServiceSubmitBatchResponse = await this.serviceContext.submitBatch(
      batchRequestBody,
      utf8ByteLength(batchRequestBody),
      batchRequest.getMultiPartContentType(),
      {
        abortSignal: aborter,
        ...options
      }
    );

    // Parse the sub responses result, if logic reaches here(i.e. the batch request succeeded with status code 202).
    const batchResponseParser = new BatchResponseParser(
      rawBatchResponse,
      batchRequest.getSubRequests()
    );
    const responseSummary = await batchResponseParser.parseBatchResponse();

    const res: ServiceSubmitBatchResponse = {
      _response: rawBatchResponse._response,
      contentType: rawBatchResponse.contentType,
      errorCode: rawBatchResponse.errorCode,
      requestId: rawBatchResponse.requestId,
      clientRequestId: rawBatchResponse.clientRequestId,
      version: rawBatchResponse.version,
      subResponses: responseSummary.subResponses,
      subResponsesSucceededCount: responseSummary.subResponsesSucceededCount,
      subResponsesFailedCount: responseSummary.subResponsesFailedCount
    };

    return res;
  }
}
