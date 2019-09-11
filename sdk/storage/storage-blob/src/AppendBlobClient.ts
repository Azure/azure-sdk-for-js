// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  HttpRequestBody,
  TransferProgressEvent,
  TokenCredential,
  isTokenCredential,
  isNode
} from "@azure/core-http";

import * as Models from "./generated/src/models";
import { AbortSignalLike } from "@azure/abort-controller";
import { BlobClient } from "./internal";
import { AppendBlob } from "./generated/src/operations";
import {
  AppendBlobAccessConditions,
  BlobAccessConditions,
  Metadata,
  ensureCpkIfSpecified
} from "./models";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { URLConstants } from "./utils/constants";
import { setURLParameter, extractConnectionStringParts } from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { rangeToString } from "./Range";

/**
 * Options to configure Append Blob - Create operation.
 *
 * @export
 * @interface AppendBlobCreateOptions
 */
export interface AppendBlobCreateOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Conditions to meet when creating append blobs.
   *
   * @type {BlobAccessConditions}
   * @memberof AppendBlobCreateOptions
   */
  accessConditions?: BlobAccessConditions;
  /**
   * HTTP headers to set when creating append blobs.
   *
   * @type {Models.BlobHTTPHeaders}
   * @memberof AppendBlobCreateOptions
   */
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   *
   * @type {Metadata}
   * @memberof AppendBlobCreateOptions
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   *
   * @type {Models.CpkInfo}
   * @memberof AppendBlobCreateOptions
   */
  customerProvidedKey?: Models.CpkInfo;
}

/**
 * Optiosn to confgiure the Append Blob - Append Block operation.
 *
 * @export
 * @interface AppendBlobAppendBlockOptions
 */
export interface AppendBlobAppendBlockOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobAppendBlockOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when appending append blob blocks.
   *
   * @type {AppendBlobAccessConditions}
   * @memberof AppendBlobAppendBlockOptions
   */
  accessConditions?: AppendBlobAccessConditions;
  /**
   * Callback to receive events on the progress of append block operation.
   *
   * @memberof AppendBlobAppendBlockOptions
   */
  progress?: (progress: TransferProgressEvent) => void;
  /**
   * An MD5 hash of the block content. This hash is used to verify the integrity of the block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof AppendBlobAppendBlockOptions
   */
  transactionalContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the append block content. This hash is used to verify the integrity of the append block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof AppendBlobAppendBlockOptions
   */
  transactionalContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   *
   * @type {Models.CpkInfo}
   * @memberof AppendBlobAppendBlockOptions
   */
  customerProvidedKey?: Models.CpkInfo;
}

export interface AppendBlobAppendBlockFromURLOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when appending append blob blocks.
   *
   * @type {AppendBlobAccessConditions}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  accessConditions?: AppendBlobAccessConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   *
   * @type {Models.ModifiedAccessConditions}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
  /**
   * An MD5 hash of the append block content from the URI.
   * This hash is used to verify the integrity of the append block during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  sourceContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the append block content from the URI.
   * This hash is used to verify the integrity of the append block during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  sourceContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   *
   * @type {Models.CpkInfo}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  customerProvidedKey?: Models.CpkInfo;
}

/**
 * AppendBlobClient defines a set of operations applicable to append blobs.
 *
 * @export
 * @class AppendBlobClient
 * @extends {BlobClient}
 */
export class AppendBlobClient extends BlobClient {
  /**
   * appendBlobsContext provided by protocol layer.
   *
   * @private
   * @type {AppendBlobs}
   * @memberof AppendBlobClient
   */
  private appendBlobContext: AppendBlob;

  /**
   *
   * Creates an instance of AppendBlobClient.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {string} containerName Container name.
   * @param {string} blobName Blob name.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof AppendBlobClient
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: NewPipelineOptions
  );
  /**
   * Creates an instance of AppendBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to an append blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage append blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
   *                                                  or a TokenCredential from @azure/identity. If not specified,
   *                                                  AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof AppendBlobClient
   */
  constructor(
    url: string,
    credential: SharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: NewPipelineOptions
  );
  /**
   * Creates an instance of AppendBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to an append blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage append blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof AppendBlobClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName:
      | string
      | SharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    blobNameOrOptions?: string | NewPipelineOptions,
    options?: NewPipelineOptions
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: Pipeline;
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNode && credentialOrPipelineOrContainerName instanceof SharedKeyCredential) ||
      credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrContainerName)
    ) {
      options = blobNameOrOptions as NewPipelineOptions;
      pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
    } else if (
      !credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName !== "string"
    ) {
      // The second parameter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName === "string" &&
      blobNameOrOptions &&
      typeof blobNameOrOptions === "string"
    ) {
      const containerName = credentialOrPipelineOrContainerName;
      const blobName = blobNameOrOptions;

      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNode) {
          const sharedKeyCredential = new SharedKeyCredential(
            extractedCreds.accountName,
            extractedCreds.accountKey
          );
          urlOrConnectionString = extractedCreds.url + "/" + containerName + "/" + blobName;
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        urlOrConnectionString =
          extractedCreds.url +
          "/" +
          containerName +
          "/" +
          blobName +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string"
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
    super(urlOrConnectionString, pipeline);
    this.appendBlobContext = new AppendBlob(this.storageClientContext);
  }

  /**
   * Creates a new AppendBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param {string} snapshot The snapshot timestamp.
   * @returns {AppendBlobClient} A new AppendBlobClient object identical to the source but with the specified snapshot timestamp.
   * @memberof AppendBlobClient
   */
  public withSnapshot(snapshot: string): AppendBlobClient {
    return new AppendBlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot
      ),
      this.pipeline
    );
  }

  /**
   * Creates a 0-length append blob. Call AppendBlock to append data to an append blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param {AppendBlobCreateOptions} [options] Options to the Append Block Create operation.
   * @returns {Promise<Models.AppendBlobsCreateResponse>}
   * @memberof AppendBlobClient
   */
  public async create(
    options: AppendBlobCreateOptions = {}
  ): Promise<Models.AppendBlobCreateResponse> {
    options.accessConditions = options.accessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.appendBlobContext.create(0, {
      abortSignal: options.abortSignal,
      blobHTTPHeaders: options.blobHTTPHeaders,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      cpkInfo: options.customerProvidedKey
    });
  }

  /**
   * Commits a new block of data to the end of the existing append blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/append-block
   *
   * @param {HttpRequestBody} body Data to be appended.
   * @param {number} contentLength Length of the body in bytes.
   * @param {AppendBlobAppendBlockOptions} [options] Options to the Append Block operation.
   * @returns {Promise<Models.AppendBlobsAppendBlockResponse>}
   * @memberof AppendBlobClient
   */
  public async appendBlock(
    body: HttpRequestBody,
    contentLength: number,
    options: AppendBlobAppendBlockOptions = {}
  ): Promise<Models.AppendBlobAppendBlockResponse> {
    options.accessConditions = options.accessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.appendBlobContext.appendBlock(body, contentLength, {
      abortSignal: options.abortSignal,
      appendPositionAccessConditions: options.accessConditions.appendPositionAccessConditions,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      onUploadProgress: options.progress,
      transactionalContentMD5: options.transactionalContentMD5,
      transactionalContentCrc64: options.transactionalContentCrc64,
      cpkInfo: options.customerProvidedKey
    });
  }

  /**
   * The Append Block operation commits a new block of data to the end of an existing append blob
   * where the contents are read from a source url.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/append-block-from-url
   *
   * @param {string} sourceURL
   *                 The url to the blob that will be the source of the copy. A source blob in the same storage account can
   *                 be authenticated via Shared Key. However, if the source is a blob in another account, the source blob
   *                 must either be public or must be authenticated via a shared access signature. If the source blob is
   *                 public, no authentication is required to perform the operation.
   * @param {number} sourceOffset Offset in source to be appended
   * @param {number} count Number of bytes to be appended as a block
   * @param {AppendBlobAppendBlockFromURLOptions} [options={}]
   * @returns {Promise<Models.AppendBlobAppendBlockFromUrlResponse>}
   * @memberof AppendBlobClient
   */
  public async appendBlockFromURL(
    sourceURL: string,
    sourceOffset: number,
    count: number,
    options: AppendBlobAppendBlockFromURLOptions = {}
  ): Promise<Models.AppendBlobAppendBlockFromUrlResponse> {
    options.accessConditions = options.accessConditions || {};
    options.sourceModifiedAccessConditions = options.sourceModifiedAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.appendBlobContext.appendBlockFromUrl(sourceURL, 0, {
      abortSignal: options.abortSignal,
      sourceRange: rangeToString({ offset: sourceOffset, count }),
      sourceContentMD5: options.sourceContentMD5,
      sourceContentCrc64: options.sourceContentCrc64,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      appendPositionAccessConditions: options.accessConditions.appendPositionAccessConditions,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      sourceModifiedAccessConditions: {
        sourceIfMatch: options.sourceModifiedAccessConditions.ifMatch,
        sourceIfModifiedSince: options.sourceModifiedAccessConditions.ifModifiedSince,
        sourceIfNoneMatch: options.sourceModifiedAccessConditions.ifNoneMatch,
        sourceIfUnmodifiedSince: options.sourceModifiedAccessConditions.ifUnmodifiedSince
      },
      cpkInfo: options.customerProvidedKey
    });
  }
}
