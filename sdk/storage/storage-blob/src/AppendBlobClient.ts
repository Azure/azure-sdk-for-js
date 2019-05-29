// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpRequestBody, TransferProgressEvent } from "@azure/ms-rest-js";

import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { BlobClient } from "./internal";
import { AppendBlob } from "./generated/lib/operations";
import { AppendBlobAccessConditions, BlobAccessConditions, Metadata } from "./models";
import { Pipeline } from "./Pipeline";
import { URLConstants } from "./utils/constants";
import { setURLParameter, extractPartsWithValidation } from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { StorageClient, NewPipelineOptions } from "./StorageClient";
import { Credential } from "./credentials/Credential";

export interface AppendBlobCreateOptions {
  abortSignal?: Aborter;
  accessConditions?: BlobAccessConditions;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  metadata?: Metadata;
}

export interface AppendBlobAppendBlockOptions {
  abortSignal?: Aborter;
  accessConditions?: AppendBlobAccessConditions;
  progress?: (progress: TransferProgressEvent) => void;
  transactionalContentMD5?: Uint8Array;
}

/**
 * AppendBlobClient defines a set of operations applicable to append blobs.
 *
 * @export
 * @class AppendBlobClient
 * @extends {StorageClient}
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
   * @param {Credential} credential Such as AnonymousCredential, SharedKeyCredential or TokenCredential.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof AppendBlobClient
   */
  constructor(url: string, credential: Credential, options?: NewPipelineOptions);
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
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof AppendBlobClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    s: string,
    credentialOrPipelineOrContainerName: string | Credential | Pipeline,
    blobNameOrOptions?: string | NewPipelineOptions,
    options?: NewPipelineOptions
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: Pipeline;
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      pipeline = credentialOrPipelineOrContainerName;
    } else if (credentialOrPipelineOrContainerName instanceof Credential) {
      pipeline = StorageClient.newPipeline(credentialOrPipelineOrContainerName, options);
    } else if (
      credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName === "string" &&
      blobNameOrOptions &&
      typeof blobNameOrOptions === "string"
    ) {
      const containerName = credentialOrPipelineOrContainerName;
      const blobName = blobNameOrOptions;
      // TODO: extract parts from connection string
      const extractedCreds = extractPartsWithValidation(s);
      const sharedKeyCredential = new SharedKeyCredential(
        extractedCreds.accountName,
        extractedCreds.accountKey
      );
      s = "endpoint from connection string" + containerName + "/" + blobName;
      pipeline = StorageClient.newPipeline(sharedKeyCredential, options);
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
    super(s, pipeline);
    this.appendBlobContext = new AppendBlob(this.storageClientContext);
  }

  /**
   * Creates a new AppendBlobClient object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {AppendBlobClient}
   * @memberof AppendBlobClient
   */
  public withPipeline(pipeline: Pipeline): AppendBlobClient {
    return new AppendBlobClient(this.url, pipeline);
  }

  /**
   * Creates a new AppendBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param {string} snapshot
   * @returns {AppendBlobClient}
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
   * @param {AppendBlobCreateOptions} [options]
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
   * @param {HttpRequestBody} body
   * @param {number} contentLength
   * @param {AppendBlobAppendBlockOptions} [options]
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
