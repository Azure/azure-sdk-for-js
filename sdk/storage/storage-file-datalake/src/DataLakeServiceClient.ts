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
import { CanonicalCode } from "@opentelemetry/types";

export class DataLakeServiceClient extends StorageClient {
  // private serviceContext: Service;
  private blobServiceClient: BlobServiceClient;

  public constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );

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

  public getFileSystemClient(fileSystemName: string): DataLakeFileSystemClient {
    return new DataLakeFileSystemClient(
      appendToURLPath(this.url, encodeURIComponent(fileSystemName)),
      this.pipeline
    );
  }

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
