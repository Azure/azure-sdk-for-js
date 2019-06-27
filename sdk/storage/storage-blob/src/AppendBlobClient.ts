// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  HttpRequestBody,
  TransferProgressEvent,
  TokenCredential,
  isTokenCredential,
  isNode
} from "@azure/core-http";

import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { BlobClient } from "./internal";
import { AppendBlob } from "./generated/lib/operations";
import { AppendBlobAccessConditions, BlobAccessConditions, Metadata } from "./models";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { URLConstants } from "./utils/constants";
import { setURLParameter, extractConnectionStringParts } from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { Credential } from "./credentials/Credential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";

/**
 * Options to configure Append Blob - Create operation.
 *
 * @export
 * @interface AppendBlobCreateOptions
 */
export interface AppendBlobCreateOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;

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
}

/**
 * Optiosn to confgiure the Append Blob - Append Block operation.
 *
 * @export
 * @interface AppendBlobAppendBlockOptions
 */
export interface AppendBlobAppendBlockOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobAppendBlockOptions
   */
  abortSignal?: Aborter;
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
   * A Uint8Array holding the MD5 hash of the blob content.
   * It is only used to verify the integrity of the block during transport.
   * It is not stored in with the blob.
   *
   * @type {Uint8Array}
   * @memberof AppendBlobAppendBlockOptions
   */
  transactionalContentMD5?: Uint8Array;
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
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Creates an instance of AppendBlobClient.
   *
   * @param {string} connectionString Connection string for an Azure storage account.
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
   * @param {Credential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential, RawTokenCredential,
   *                                                  or a TokenCredential from @azure/identity. If not specified,
   *                                                  AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof AppendBlobClient
   */
  constructor(url: string, credential: Credential | TokenCredential, options?: NewPipelineOptions);
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
    credentialOrPipelineOrContainerName: string | Credential | TokenCredential | Pipeline,
    blobNameOrOptions?: string | NewPipelineOptions,
    options?: NewPipelineOptions
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: Pipeline;
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      credentialOrPipelineOrContainerName instanceof Credential ||
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
      if (isNode) {
        const containerName = credentialOrPipelineOrContainerName;
        const blobName = blobNameOrOptions;

        const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
        const sharedKeyCredential = new SharedKeyCredential(
          extractedCreds.accountName,
          extractedCreds.accountKey
        );
        urlOrConnectionString = extractedCreds.url + "/" + containerName + "/" + blobName;
        pipeline = newPipeline(sharedKeyCredential, options);
      } else {
        throw new Error("Connection string is only supported in Node.js environment");
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
    const aborter = options.abortSignal || Aborter.none;
    options.accessConditions = options.accessConditions || {};
    return this.appendBlobContext.create(0, {
      abortSignal: aborter,
      blobHTTPHeaders: options.blobHTTPHeaders,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions
    });
  }

  /**
   * Commits a new block of data to the end of the existing append blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/append-block
   *
   * @param {HttpRequestBody} body Data to be appended.
   * @param {number} contentLength Number of bytes to be appended.
   * @param {AppendBlobAppendBlockOptions} [options] Options to the Append Block operation.
   * @returns {Promise<Models.AppendBlobsAppendBlockResponse>}
   * @memberof AppendBlobClient
   */
  public async appendBlock(
    body: HttpRequestBody,
    contentLength: number,
    options: AppendBlobAppendBlockOptions = {}
  ): Promise<Models.AppendBlobAppendBlockResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.accessConditions = options.accessConditions || {};
    return this.appendBlobContext.appendBlock(body, contentLength, {
      abortSignal: aborter,
      appendPositionAccessConditions: options.accessConditions.appendPositionAccessConditions,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      onUploadProgress: options.progress,
      transactionalContentMD5: options.transactionalContentMD5
    });
  }
}
