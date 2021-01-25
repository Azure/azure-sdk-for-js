// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import "@azure/core-paging";

import { TokenCredential } from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { BlobServiceClient } from "@azure/storage-blob";

import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { DataLakeFileSystemClient } from "./DataLakeFileSystemClient";
import {
  FileSystemItem,
  ServiceListFileSystemsOptions,
  ServiceListFileSystemsSegmentResponse
} from "./models";
import { Pipeline, StoragePipelineOptions, newPipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { appendToURLPath } from "./utils/utils.common";
import { createSpan } from "./utils/tracing";
import { toFileSystemPagedAsyncIterableIterator } from "./transforms";
import { ServiceGetUserDelegationKeyOptions, ServiceGetUserDelegationKeyResponse } from "./models";
import { CanonicalCode } from "@opentelemetry/api";

/**
 * DataLakeServiceClient allows you to manipulate Azure
 * Data Lake service resources and file systems. The storage account provides
 * the top-level namespace for the Data Lake service.
 *
 * @export
 * @class DataLakeServiceClient
 * @extends {StorageClient}
 */
export class DataLakeServiceClient extends StorageClient {
  // private serviceContext: Service;

  /**
   * blobServiceClient provided by @azure/storage-blob package.
   *
   * @private
   * @type {BlobServiceClient}
   * @memberof DataLakeServiceClient
   */
  private blobServiceClient: BlobServiceClient;

  /**
   * Creates an instance of DataLakeServiceClient from url.
   *
   * @param {string} url A Client string pointing to Azure Storage data lake service, such as
   *                     "https://myaccount.dfs.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net?sasString".
   * @param {(StorageSharedKeyCredential | AnonymousCredential | TokenCredential)} [credential] Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof DataLakeServiceClient
   */
  public constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );

  /**
   * Creates an instance of DataLakeServiceClient from url and pipeline.
   *
   * @param {string} url A Client string pointing to Azure Storage data lake service, such as
   *                     "https://myaccount.dfs.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof DataLakeServiceClient
   */
  public constructor(url: string, pipeline: Pipeline);

  public constructor(
    url: string,
    credentialOrPipeline?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    options?: StoragePipelineOptions
  ) {
    if (credentialOrPipeline instanceof Pipeline) {
      super(url, credentialOrPipeline);
    } else {
      let credential;
      if (credentialOrPipeline === undefined) {
        credential = new AnonymousCredential();
      } else {
        credential = credentialOrPipeline;
      }

      const pipeline = newPipeline(credential, options);
      super(url, pipeline);
    }

    // this.serviceContext = new Service(this.storageClientContext);
    this.blobServiceClient = new BlobServiceClient(this.blobEndpointUrl, this.pipeline);
  }

  /**
   * Creates a {@link DataLakeFileSystemClient} object.
   *
   * @param {string} fileSystemName File system name.
   * @returns {DataLakeFileSystemClient}
   * @memberof DataLakeServiceClient
   */
  public getFileSystemClient(fileSystemName: string): DataLakeFileSystemClient {
    return new DataLakeFileSystemClient(
      appendToURLPath(this.url, encodeURIComponent(fileSystemName)),
      this.pipeline
    );
  }

  /**
   * ONLY AVAILABLE WHEN USING BEARER TOKEN AUTHENTICATION (TokenCredential).
   *
   * Retrieves a user delegation key for the Data Lake service. This is only a valid operation when using
   * bearer token authentication.
   *
   * @example
   * ```js
   * // Generate user delegation SAS for a file system
   * const userDelegationKey = await dataLakeServiceClient.getUserDelegationKey(startsOn, expiresOn);
   * const fileSystemSAS = generateDataLakeSASQueryParameters({
   *     fileSystemName, // Required
   *     permissions: FileSystemSASPermissions.parse("racwdl"), // Required
   *     startsOn, // Required. Date type
   *     expiresOn, // Optional. Date type
   *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
   *     protocol: SASProtocol.HttpsAndHttp, // Optional
   *     version: "2018-11-09" // Must >= 2018-11-09 to generate user delegation SAS
   *   },
   *   userDelegationKey, // UserDelegationKey
   *   accountName
   * ).toString();
   * ```
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-user-delegation-key
   *
   * @param {Date} startsOn The start time for the user delegation SAS. Must be within 7 days of the current time.
   * @param {Date} expiresOn The end time for the user delegation SAS. Must be within 7 days of the current time.
   * @param {ServiceGetUserDelegationKeyOptions} [options={}]
   * @returns {Promise<ServiceGetUserDelegationKeyResponse>}
   * @memberof DataLakeServiceClient
   */
  public async getUserDelegationKey(
    startsOn: Date,
    expiresOn: Date,
    options: ServiceGetUserDelegationKeyOptions = {}
  ): Promise<ServiceGetUserDelegationKeyResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeServiceClient-getUserDelegationKey",
      options.tracingOptions
    );
    try {
      return await this.blobServiceClient.getUserDelegationKey(startsOn, expiresOn, {
        ...options,
        tracingOptions: {
          ...options.tracingOptions,
          spanOptions
        }
      });
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

  /**
   * Returns an async iterable iterator to list all the file systems
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the file systems in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * let i = 1;
   * for await (const fileSystem of serviceClient.listFileSystems()) {
   *   console.log(`FileSystem ${i++}: ${fileSystem.name}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * const iter = serviceClient.listFileSystems();
   * let fileSystemItem = await iter.next();
   * while (!fileSystemItem.done) {
   *   console.log(`FileSystem ${i++}: ${fileSystemItem.value.name}`);
   *   fileSystemItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of serviceClient.listFileSystems().byPage({ maxPageSize: 20 })) {
   *   if (response.fileSystemItems) {
   *     for (const fileSystem of response.fileSystemItems) {
   *       console.log(`FileSystem ${i++}: ${fileSystem.name}`);
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = serviceClient.listFileSystems().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 file system names
   * if (response.fileSystemItems) {
   *   for (const fileSystem of response.fileSystemItems) {
   *     console.log(`FileSystem ${i++}: ${fileSystem.name}`);
   *   }
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   * // Passing next marker as continuationToken
   * iterator = serviceClient
   *   .listContainers()
   *   .byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints 10 file system names
   * if (response.fileSystemItems) {
   *   for (const fileSystem of response.fileSystemItems) {
   *      console.log(`FileSystem ${i++}: ${fileSystem.name}`);
   *   }
   * }
   * ```
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-containers2
   *
   * @param {ServiceListFileSystemsOptions} [options={}]
   * @returns {PagedAsyncIterableIterator<FileSystemItem, ServiceListFileSystemsSegmentResponse>}
   * @memberof DataLakeServiceClient
   */
  public listFileSystems(
    options: ServiceListFileSystemsOptions = {}
  ): PagedAsyncIterableIterator<FileSystemItem, ServiceListFileSystemsSegmentResponse> {
    return toFileSystemPagedAsyncIterableIterator(this.blobServiceClient.listContainers(options));
  }

  // public async createFileSystem(): Promise<DataLakeFileSystemClient> {
  //   throw Error("NotImplemented");
  // }

  // public async deleteFileSystem(fileSystem: string): Promise<ServiceDeleteFileSystemResponse> {
  //   throw Error("NotImplemented");
  // }
}
