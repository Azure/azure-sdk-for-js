// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";
import { isNode } from "@azure/core-util";
import {
  BlobServiceClient,
  ServiceGetPropertiesOptions,
  ServiceSetPropertiesOptions,
  ServiceSetPropertiesResponse,
} from "@azure/storage-blob";
import { Pipeline, StoragePipelineOptions, isPipelineLike, newPipeline } from "./Pipeline";
import { AnonymousCredential } from "@azure/storage-blob";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";

import { DataLakeFileSystemClient } from "./DataLakeFileSystemClient";
import {
  FileSystemItem,
  FileSystemRenameResponse,
  ServiceGenerateAccountSasUrlOptions,
  ServiceListFileSystemsOptions,
  ServiceListFileSystemsSegmentResponse,
  ServiceRenameFileSystemOptions,
  ServiceUndeleteFileSystemOptions,
  FileSystemUndeleteResponse,
} from "./models";
import { StorageClient } from "./StorageClient";
import {
  appendToURLPath,
  appendToURLQuery,
  extractConnectionStringParts,
} from "./utils/utils.common";
import { toDfsEndpointUrl, toFileSystemPagedAsyncIterableIterator } from "./transforms";
import { ServiceGetUserDelegationKeyOptions, ServiceGetUserDelegationKeyResponse } from "./models";
import { tracingClient } from "./utils/tracing";
import { AccountSASPermissions } from "./sas/AccountSASPermissions";
import { generateAccountSASQueryParameters } from "./sas/AccountSASSignatureValues";
import { AccountSASServices } from "./sas/AccountSASServices";
import { DataLakeServiceGetPropertiesResponse, DataLakeServiceProperties } from "./index";

/**
 * DataLakeServiceClient allows you to manipulate Azure
 * Data Lake service resources and file systems. The storage account provides
 * the top-level namespace for the Data Lake service.
 */
export class DataLakeServiceClient extends StorageClient {
  // private serviceContext: Service;

  /**
   * blobServiceClient provided by `@azure/storage-blob` package.
   */
  private blobServiceClient: BlobServiceClient;

  /**
   *
   * Creates an instance of DataLakeServiceClient from connection string.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
  public static fromConnectionString(
    connectionString: string,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  ): DataLakeServiceClient {
    options = options || {};
    const extractedCreds = extractConnectionStringParts(connectionString);
    if (extractedCreds.kind === "AccountConnString") {
      if (isNode) {
        const sharedKeyCredential = new StorageSharedKeyCredential(
          extractedCreds.accountName!,
          extractedCreds.accountKey,
        );
        if (!options.proxyOptions) {
          options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
        }
        const pipeline = newPipeline(sharedKeyCredential, options);
        return new DataLakeServiceClient(toDfsEndpointUrl(extractedCreds.url), pipeline);
      } else {
        throw new Error("Account connection string is only supported in Node.js environment");
      }
    } else if (extractedCreds.kind === "SASConnString") {
      const pipeline = newPipeline(new AnonymousCredential(), options);
      return new DataLakeServiceClient(
        toDfsEndpointUrl(extractedCreds.url) + "?" + extractedCreds.accountSas,
        pipeline,
      );
    } else {
      throw new Error(
        "Connection string must be either an Account connection string or a SAS connection string",
      );
    }
  }

  /**
   * Creates an instance of DataLakeServiceClient from url.
   *
   * @param url - A Client string pointing to Azure Storage data lake service, such as
   *                     "https://myaccount.dfs.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net?sasString".
   * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  );

  /**
   * Creates an instance of DataLakeServiceClient from url and pipeline.
   *
   * @param url - A Client string pointing to Azure Storage data lake service, such as
   *                     "https://myaccount.dfs.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  public constructor(url: string, pipeline: Pipeline);

  public constructor(
    url: string,
    credentialOrPipeline?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  ) {
    if (isPipelineLike(credentialOrPipeline)) {
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
   * @param fileSystemName - File system name.
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-subclients */
  public getFileSystemClient(fileSystemName: string): DataLakeFileSystemClient {
    return new DataLakeFileSystemClient(
      appendToURLPath(this.url, encodeURIComponent(fileSystemName)),
      this.pipeline,
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
   *     version: "2018-11-09" // Must greater than or equal to 2018-11-09 to generate user delegation SAS
   *   },
   *   userDelegationKey, // UserDelegationKey
   *   accountName
   * ).toString();
   * ```
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-user-delegation-key
   *
   * @param startsOn - The start time for the user delegation SAS. Must be within 7 days of the current time.
   * @param expiresOn - The end time for the user delegation SAS. Must be within 7 days of the current time.
   * @param options -
   */
  public async getUserDelegationKey(
    startsOn: Date,
    expiresOn: Date,
    options: ServiceGetUserDelegationKeyOptions = {},
  ): Promise<ServiceGetUserDelegationKeyResponse> {
    return tracingClient.withSpan(
      "DataLakeServiceClient-getUserDelegationKey",
      options,
      async (updatedOptions) => {
        return this.blobServiceClient.getUserDelegationKey(startsOn, expiresOn, updatedOptions);
      },
    );
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
   * @param options -
   */
  public listFileSystems(
    options: ServiceListFileSystemsOptions = {},
  ): PagedAsyncIterableIterator<FileSystemItem, ServiceListFileSystemsSegmentResponse> {
    return toFileSystemPagedAsyncIterableIterator(this.blobServiceClient.listContainers(options));
  }

  // public async createFileSystem(): Promise<DataLakeFileSystemClient> {
  //   throw Error("NotImplemented");
  // }

  // public async deleteFileSystem(fileSystem: string): Promise<ServiceDeleteFileSystemResponse> {
  //   throw Error("NotImplemented");
  // }

  /**
   * Only available for DataLakeServiceClient constructed with a shared key credential.
   *
   * Generates an account Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-account-sas
   *
   * @param expiresOn - Optional. The time at which the shared access signature becomes invalid. Default to an hour later if not specified.
   * @param permissions - Specifies the list of permissions to be associated with the SAS.
   * @param resourceTypes - Specifies the resource types associated with the shared access signature.
   * @param options - Optional parameters.
   * @returns An account SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateAccountSasUrl(
    expiresOn?: Date,
    permissions: AccountSASPermissions = AccountSASPermissions.parse("r"),
    resourceTypes: string = "sco",
    options: ServiceGenerateAccountSasUrlOptions = {},
  ): string {
    if (!(this.credential instanceof StorageSharedKeyCredential)) {
      throw RangeError(
        "Can only generate the account SAS when the client is initialized with a shared key credential",
      );
    }

    if (expiresOn === undefined) {
      const now = new Date();
      expiresOn = new Date(now.getTime() + 3600 * 1000);
    }

    const sas = generateAccountSASQueryParameters(
      {
        permissions,
        expiresOn,
        resourceTypes,
        services: AccountSASServices.parse("b").toString(),
        ...options,
      },
      this.credential,
    ).toString();

    return appendToURLQuery(this.url, sas);
  }

  /**
   * Renames an existing File System.
   *
   * @param sourceFileSystemName - The name of the source File System.
   * @param destinationContainerName - The new name of the File System.
   * @param options - Options to configure File System Rename operation.
   */
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore Need to hide this interface for now. Make it public and turn on the live tests for it when the service is ready.
  private async renameFileSystem(
    sourceFileSystemName: string,
    destinationFileSystemName: string,
    options: ServiceRenameFileSystemOptions = {},
  ): Promise<{
    fileSystemClient: DataLakeFileSystemClient;
    fileSystemRenameResponse: FileSystemRenameResponse;
  }> {
    return tracingClient.withSpan(
      "DataLakeServiceClient-renameFileSystem",
      options,
      async (updatedOptions) => {
        const res = await this.blobServiceClient["renameContainer"](
          sourceFileSystemName,
          destinationFileSystemName,
          updatedOptions,
        );

        const fileSystemClient = this.getFileSystemClient(destinationFileSystemName);
        return {
          fileSystemClient,
          fileSystemRenameResponse: res.containerRenameResponse,
        };
      },
    );
  }

  /**
   * Restore a previously deleted File System.
   * This API is only functional if Container Soft Delete is enabled for the storage account.
   *
   * @param deletedFileSystemName - The name of the source File System.
   * @param deleteFileSystemVersion - The new name of the File System.
   * @param options - Options to configure File System Restore operation.
   */
  public async undeleteFileSystem(
    deletedFileSystemName: string,
    deleteFileSystemVersion: string,
    options: ServiceUndeleteFileSystemOptions = {},
  ): Promise<{
    fileSystemClient: DataLakeFileSystemClient;
    fileSystemUndeleteResponse: FileSystemUndeleteResponse;
  }> {
    return tracingClient.withSpan(
      "DataLakeServiceClient-undeleteFileSystem",
      options,
      async (updatedOptions) => {
        const res = await this.blobServiceClient.undeleteContainer(
          deletedFileSystemName,
          deleteFileSystemVersion,
          {
            ...options,
            destinationContainerName: options.destinationFileSystemName,
            tracingOptions: updatedOptions.tracingOptions,
          },
        );

        const fileSystemClient = this.getFileSystemClient(
          options.destinationFileSystemName || deletedFileSystemName,
        );
        return {
          fileSystemClient,
          fileSystemUndeleteResponse: res.containerUndeleteResponse,
        };
      },
    );
  }

  /**
   * Gets the properties of a storage account’s Blob service endpoint, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-properties
   *
   * @param options - Options to the Service Get Properties operation.
   * @returns Response data for the Service Get Properties operation.
   */
  public async getProperties(
    options: ServiceGetPropertiesOptions = {},
  ): Promise<DataLakeServiceGetPropertiesResponse> {
    return tracingClient.withSpan(
      "DataLakeServiceClient-getProperties",
      options,
      async (updatedOptions) => {
        return this.blobServiceClient.getProperties({
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        });
      },
    );
  }

  /**
   * Sets properties for a storage account’s Blob service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-service-properties
   *
   * @param properties -
   * @param options - Options to the Service Set Properties operation.
   * @returns Response data for the Service Set Properties operation.
   */
  public async setProperties(
    properties: DataLakeServiceProperties,
    options: ServiceSetPropertiesOptions = {},
  ): Promise<ServiceSetPropertiesResponse> {
    return tracingClient.withSpan(
      "DataLakeServiceClient-setProperties",
      options,
      async (updatedOptions) => {
        return this.blobServiceClient.setProperties(properties, {
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        });
      },
    );
  }
}
