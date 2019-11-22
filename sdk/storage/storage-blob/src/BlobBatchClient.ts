// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  AccessTier,
  ServiceSubmitBatchHeaders,
  ServiceSubmitBatchOptionalParamsModel,
  ServiceSubmitBatchResponseModel
} from "./generatedModels";
import { ParsedBatchResponse } from "./BatchResponse";
import { BatchResponseParser } from "./BatchResponseParser";
import { utf8ByteLength } from "./BatchUtils";
import { BlobBatch } from "./BlobBatch";
import { AbortSignalLike } from "@azure/abort-controller";
import { CanonicalCode } from "@opentelemetry/types";
import { createSpan } from "./utils/tracing";
import { HttpResponse, TokenCredential } from "@azure/core-http";
import { Service } from "./generated/src/operations";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { CommonOptions } from "./StorageClient";
import { BlobDeleteOptions, BlobClient, BlobSetTierOptions } from "./Clients";
import { StorageClientContext } from "./generated/src/storageClientContext";
import { Pipeline, StoragePipelineOptions, newPipeline } from "./Pipeline";

/**
 * Options to configure the Service - Submit Batch Optional Params.
 *
 * @export
 * @interface BlobBatchSubmitBatchOptionalParams
 */
export interface BlobBatchSubmitBatchOptionalParams
  extends ServiceSubmitBatchOptionalParamsModel,
    CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobBatchSubmitBatchOptionalParams
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Contains response data for blob batch operations.
 */
export declare type BlobBatchSubmitBatchResponse = ParsedBatchResponse &
  ServiceSubmitBatchHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ServiceSubmitBatchHeaders;
    };
  };

/**
 * Contains response data for the {@link deleteBlobs} operation.
 */
export declare type BlobBatchDeleteBlobsResponse = BlobBatchSubmitBatchResponse;

/**
 * Contains response data for the {@link setBlobsAccessTier} operation.
 */
export declare type BlobBatchSetBlobsAccessTierResponse = BlobBatchSubmitBatchResponse;

/**
 * A BlobBatchClient allows you to make batched requests to the Azure Storage Blob service.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch
 */
export class BlobBatchClient {
  private _serviceContext: Service;

  /**
   * Creates an instance of BlobBatchClient.
   *
   * @param {string} url A url pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof BlobBatchClient
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlobBatchClient.
   *
   * @param {string} url A url pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof BlobBatchClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    url: string,
    credentialOrPipeline?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    options?: StoragePipelineOptions
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipeline instanceof Pipeline) {
      pipeline = credentialOrPipeline;
    } else if (!credentialOrPipeline) {
      // no credential provided
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else {
      pipeline = newPipeline(credentialOrPipeline, options);
    }

    const storageClientContext = new StorageClientContext(url, pipeline.toServiceClientOptions());

    this._serviceContext = new Service(storageClientContext);
  }

  /**
   * Creates a {@link BlobBatch}.
   * A BlobBatch represents an aggregated set of operations on blobs.
   */
  public createBatch(): BlobBatch {
    return new BlobBatch();
  }

  /**
   * Create multiple delete operations to mark the specified blobs or snapshots for deletion.
   * Note that in order to delete a blob, you must delete all of its snapshots.
   * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
   * The operations will be authenticated and authorized with specified credential.
   * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param {string[]} urls The urls of the blob resources to delete.
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {BlobDeleteOptions} [options]
   * @returns {Promise<BlobBatchDeleteBlobsResponse>}
   * @memberof BlobBatchClient
   */
  public async deleteBlobs(
    urls: string[],
    credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: BlobDeleteOptions
  ): Promise<BlobBatchDeleteBlobsResponse>;

  /**
   * Create multiple delete operations to mark the specified blobs or snapshots for deletion.
   * Note that in order to delete a blob, you must delete all of its snapshots.
   * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
   * The operation(subrequest) will be authenticated and authorized with specified credential.
   * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param {BlobClient[]} blobClients The BlobClients for the blobs to delete.
   * @param {BlobDeleteOptions} [options]
   * @returns {Promise<BlobBatchDeleteBlobsResponse>}
   * @memberof BlobBatchClient
   */
  public async deleteBlobs(
    blobClients: BlobClient[],
    options?: BlobDeleteOptions
  ): Promise<BlobBatchDeleteBlobsResponse>;

  public async deleteBlobs(
    urlsOrBlobClients: string[] | BlobClient[],
    credentialOrOptions:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | BlobDeleteOptions
      | undefined,
    options?: BlobDeleteOptions
  ): Promise<BlobBatchDeleteBlobsResponse> {
    const batch = new BlobBatch();
    for (const urlOrBlobClient of urlsOrBlobClients) {
      if (typeof urlOrBlobClient === "string") {
        await batch.deleteBlob(urlOrBlobClient, credentialOrOptions as TokenCredential, options);
      } else {
        await batch.deleteBlob(urlOrBlobClient, credentialOrOptions as BlobDeleteOptions);
      }
    }
    return this.submitBatch(batch);
  }

  /**
   * Create multiple set tier operations to set the tier on a blob.
   * The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant
   * storage only). A premium page blob's tier determines the allowed size, IOPS,
   * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
   * storage type. This operation does not update the blob's ETag.
   * See [set blob tier details](https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier).
   * The operation(subrequest) will be authenticated and authorized
   * with specified credential.See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param {string[]} urls The urls of the blob resource to delete.
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {AccessTier} tier
   * @param {BlobSetTierOptions} [options]
   * @returns {Promise<BlobBatchSetBlobsAccessTierResponse>}
   * @memberof BlobBatchClient
   */
  public async setBlobsAccessTier(
    urls: string[],
    credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    tier: AccessTier,
    options?: BlobSetTierOptions
  ): Promise<BlobBatchSetBlobsAccessTierResponse>;

  /**
   * Create multiple set tier operations to set the tier on a blob.
   * The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant
   * storage only). A premium page blob's tier determines the allowed size, IOPS,
   * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
   * storage type. This operation does not update the blob's ETag.
   * See [set blob tier details](https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier).
   * The operation(subrequest) will be authenticated and authorized
   * with specified credential.See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param {BlobClient[]} blobClients The BlobClients for the blobs which should have a new tier set.
   * @param {AccessTier} tier
   * @param {BlobSetTierOptions} [options]
   * @returns {Promise<BlobBatchSetBlobsAccessTierResponse>}
   * @memberof BlobBatchClient
   */
  public async setBlobsAccessTier(
    blobClients: BlobClient[],
    tier: AccessTier,
    options?: BlobSetTierOptions
  ): Promise<BlobBatchSetBlobsAccessTierResponse>;

  public async setBlobsAccessTier(
    urlsOrBlobClients: string[] | BlobClient[],
    credentialOrTier:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | AccessTier,
    tierOrOptions?: AccessTier | BlobSetTierOptions,
    options?: BlobSetTierOptions
  ): Promise<BlobBatchSetBlobsAccessTierResponse> {
    const batch = new BlobBatch();
    for (const urlOrBlobClient of urlsOrBlobClients) {
      if (typeof urlOrBlobClient === "string") {
        await batch.setBlobAccessTier(
          urlOrBlobClient,
          credentialOrTier as TokenCredential,
          tierOrOptions as AccessTier,
          options
        );
      } else {
        await batch.setBlobAccessTier(
          urlOrBlobClient,
          credentialOrTier as AccessTier,
          tierOrOptions as BlobSetTierOptions
        );
      }
    }
    return this.submitBatch(batch);
  }

  /**
   * Submit batch request which consists of multiple subrequests.
   *
   * Get `blobBatchClient` and other details before running the snippets.
   * `blobServiceClient.getBlobBatchClient()` gives the `blobBatchClient`
   *
   * Example usage:
   *
   * ```js
   * let batchRequest = new BlobBatch();
   * await batchRequest.deleteBlob(urlInString0, credential0);
   * await batchRequest.deleteBlob(urlInString1, credential1, {
   *  deleteSnapshots: "include"
   * });
   * const batchResp = await blobBatchClient.submitBatch(batchRequest);
   * console.log(batchResp.subResponsesSucceededCount);
   * ```
   *
   * Example using a lease:
   *
   * ```js
   * let batchRequest = new BlobBatch();
   * await batchRequest.setBlobAccessTier(blockBlobClient0, "Cool");
   * await batchRequest.setBlobAccessTier(blockBlobClient1, "Cool", {
   *  conditions: { leaseId: leaseId }
   * });
   * const batchResp = await blobBatchClient.submitBatch(batchRequest);
   * console.log(batchResp.subResponsesSucceededCount);
   * ```
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch
   *
   * @param {BlobBatch} batchRequest A set of Delete or SetTier operations.
   * @param {BlobBatchSubmitBatchOptionalParams} [options]
   * @returns {Promise<BlobBatchSubmitBatchResponse>}
   * @memberof BlobBatchClient
   */
  public async submitBatch(
    batchRequest: BlobBatch,
    options: BlobBatchSubmitBatchOptionalParams = {}
  ): Promise<BlobBatchSubmitBatchResponse> {
    if (!batchRequest || batchRequest.getSubRequests().size == 0) {
      throw new RangeError("Batch request should contain one or more sub requests.");
    }

    const { span, spanOptions } = createSpan("BlobBatchClient-submitBatch", options.tracingOptions);
    try {
      const batchRequestBody = batchRequest.getHttpRequestBody();

      const rawBatchResponse: ServiceSubmitBatchResponseModel = await this._serviceContext.submitBatch(
        batchRequestBody,
        utf8ByteLength(batchRequestBody),
        batchRequest.getMultiPartContentType(),
        {
          ...options,
          spanOptions
        }
      );

      // Parse the sub responses result, if logic reaches here(i.e. the batch request succeeded with status code 202).
      const batchResponseParser = new BatchResponseParser(
        rawBatchResponse,
        batchRequest.getSubRequests()
      );
      const responseSummary = await batchResponseParser.parseBatchResponse();

      const res: BlobBatchSubmitBatchResponse = {
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
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
