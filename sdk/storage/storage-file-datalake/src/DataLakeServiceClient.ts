// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";
import { isNodeLike } from "@azure/core-util";
import type {
  ServiceGetPropertiesOptions,
  ServiceSetPropertiesOptions,
  ServiceSetPropertiesResponse,
} from "@azure/storage-blob";
import { BlobServiceClient } from "@azure/storage-blob";
import type { Pipeline, StoragePipelineOptions } from "./Pipeline.js";
import { isPipelineLike, newPipeline } from "./Pipeline.js";
import { AnonymousCredential } from "@azure/storage-blob";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential.js";
import { DataLakeFileSystemClient } from "./DataLakeFileSystemClient.js";
import type {
  FileSystemItem,
  ServiceGenerateAccountSasUrlOptions,
  ServiceListFileSystemsOptions,
  ServiceListFileSystemsSegmentResponse,
  ServiceUndeleteFileSystemOptions,
  FileSystemUndeleteResponse,
} from "./models.js";
import { StorageClient } from "./StorageClient.js";
import {
  appendToURLPath,
  appendToURLQuery,
  extractConnectionStringParts,
} from "./utils/utils.common.js";
import { toDfsEndpointUrl, toFileSystemPagedAsyncIterableIterator } from "./transforms.js";
import type {
  ServiceGetUserDelegationKeyOptions,
  ServiceGetUserDelegationKeyResponse,
} from "./models.js";
import { tracingClient } from "./utils/tracing.js";
import { AccountSASPermissions } from "./sas/AccountSASPermissions.js";
import {
  generateAccountSASQueryParameters,
  generateAccountSASQueryParametersInternal,
} from "./sas/AccountSASSignatureValues.js";
import { AccountSASServices } from "./sas/AccountSASServices.js";
import type { DataLakeServiceGetPropertiesResponse, DataLakeServiceProperties } from "./index.js";

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

  public static fromConnectionString(
    connectionString: string,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  ): DataLakeServiceClient {
    options = options || {};
    const extractedCreds = extractConnectionStringParts(connectionString);
    if (extractedCreds.kind === "AccountConnString") {
      if (isNodeLike) {
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
   * ```ts snippet:DatalakeServiceClientGetUserDelegationKey
   * import {
   *   DataLakeServiceClient,
   *   generateDataLakeSASQueryParameters,
   *   FileSystemSASPermissions,
   *   SASProtocol,
   * } from "@azure/storage-file-datalake";
   *
   * const account = "<account>";
   * const sas = "<sas token>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net${sas}`,
   * );
   *
   * const fileSystemName = "<file system name>";
   * const accountName = "<account name>";
   * const startsOn = new Date();
   * const expiresOn = new Date(+new Date() + 86400 * 1000);
   * // Generate user delegation SAS for a file system
   * const userDelegationKey = await datalakeServiceClient.getUserDelegationKey(startsOn, expiresOn);
   * const fileSystemSAS = generateDataLakeSASQueryParameters(
   *   {
   *     fileSystemName, // Required
   *     permissions: FileSystemSASPermissions.parse("racwdl"), // Required
   *     startsOn, // Required. Date type
   *     expiresOn, // Optional. Date type
   *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
   *     protocol: SASProtocol.HttpsAndHttp, // Optional
   *     version: "2018-11-09", // Must greater than or equal to 2018-11-09 to generate user delegation SAS
   *   },
   *   userDelegationKey, // UserDelegationKey
   *   accountName,
   * ).toString();
   * ```
   * @see https://learn.microsoft.com/rest/api/storageservices/get-user-delegation-key
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
   * ```ts snippet:ReadmeSampleListFileSystems
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * let i = 1;
   * const fileSystems = datalakeServiceClient.listFileSystems();
   * for await (const fileSystem of fileSystems) {
   *   console.log(`File system ${i++}: ${fileSystem.name}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```ts snippet:ReadmeSampleListFileSystems_Iterator
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * let i = 1;
   * const fileSystems = datalakeServiceClient.listFileSystems();
   * let { value, done } = await fileSystems.next();
   * while (!done) {
   *   console.log(`File system ${i++}: ${value.name}`);
   *   ({ value, done } = await fileSystems.next());
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```ts snippet:ReadmeSampleListFileSystems_ByPage
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * let i = 1;
   * for await (const response of datalakeServiceClient.listFileSystems().byPage({ maxPageSize: 20 })) {
   *   if (response.fileSystemItems) {
   *     for (const fileSystem of response.fileSystemItems) {
   *       console.log(`File System ${i++}: ${fileSystem.name}`);
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```ts snippet:ReadmeSampleListFileSystems_Continuation
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * let i = 1;
   * let fileSystems = datalakeServiceClient.listFileSystems().byPage({ maxPageSize: 2 });
   * let response = (await fileSystems.next()).value;
   * // Prints 2 file systems
   * if (response.fileSystemItems) {
   *   for (const fileSystem of response.fileSystemItems) {
   *     console.log(`File system ${i++}: ${fileSystem.name}`);
   *   }
   * }
   * // Gets next marker
   * let marker = response.continuationToken;
   * // Passing next marker as continuationToken
   * fileSystems = datalakeServiceClient
   *   .listFileSystems()
   *   .byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await fileSystems.next()).value;
   * // Prints 10 file systems
   * if (response.fileSystemItems) {
   *   for (const fileSystem of response.fileSystemItems) {
   *     console.log(`File system ${i++}: ${fileSystem.name}`);
   *   }
   * }
   * ```
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/list-containers2
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
   * @see https://learn.microsoft.com/rest/api/storageservices/create-account-sas
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
   * Only available for DataLakeServiceClient constructed with a shared key credential.
   *
   * Generates string to sign for an account Shared Access Signature (SAS) based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/create-account-sas
   *
   * @param expiresOn - Optional. The time at which the shared access signature becomes invalid. Default to an hour later if not specified.
   * @param permissions - Specifies the list of permissions to be associated with the SAS.
   * @param resourceTypes - Specifies the resource types associated with the shared access signature.
   * @param options - Optional parameters.
   * @returns An account SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateSasStringToSign(
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

    return generateAccountSASQueryParametersInternal(
      {
        permissions,
        expiresOn,
        resourceTypes,
        services: AccountSASServices.parse("b").toString(),
        ...options,
      },
      this.credential,
    ).stringToSign;
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
   * @see https://learn.microsoft.com/rest/api/storageservices/get-blob-service-properties
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
   * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-service-properties
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
