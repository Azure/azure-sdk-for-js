// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { TokenCredential } from "@azure/core-http";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { ContainerClient } from "@azure/storage-blob";
import { CanonicalCode } from "@opentelemetry/types";

import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { DataLakeDirectoryClient } from "./DataLakeDirectoryClient";
import { DataLakeFileClient } from "./DataLakeFileClient";
import { DataLakeLeaseClient } from "./DataLakeLeaseClient";
import { FileSystemOperations } from "./generated/src/operations";
import {
  FileSystemCreateOptions,
  FileSystemCreateResponse,
  FileSystemDeleteOptions,
  FileSystemDeleteResponse,
  FileSystemGetPropertiesOptions,
  FileSystemGetPropertiesResponse,
  FileSystemSetMetadataOptions,
  FileSystemSetMetadataResponse,
  ListPathsOptions,
  ListPathsSegmentOptions,
  ListPathsSegmentResponse,
  Metadata,
  Path,
} from "./models";
import { newPipeline, Pipeline, StoragePipelineOptions } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { toContainerPublicAccessType, toPublicAccessType } from "./transforms";
import { createSpan } from "./utils/tracing";
import { appendToURLPath } from "./utils/utils.common";

export class DataLakeFileSystemClient extends StorageClient {
  private fileSystemContext: FileSystemOperations;
  private blobContainerClient: ContainerClient;

  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );

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

    this.fileSystemContext = new FileSystemOperations(this.storageClientContext);
    this.blobContainerClient = new ContainerClient(this.blobEndpointUrl, this.pipeline);
  }

  public get name(): string {
    return this.blobContainerClient.containerName;
  }

  public getDirectoryClient(directoryName: string): DataLakeDirectoryClient {
    return new DataLakeDirectoryClient(
      appendToURLPath(this.url, encodeURIComponent(directoryName)),
      this.pipeline
    );
  }

  public getFileClient(fileName: string): DataLakeFileClient {
    return new DataLakeFileClient(
      appendToURLPath(this.url, encodeURIComponent(fileName)),
      this.pipeline
    );
  }

  public getDataLakeLeaseClient(proposeLeaseId?: string): DataLakeLeaseClient {
    return new DataLakeLeaseClient(this.blobContainerClient.getBlobLeaseClient(proposeLeaseId));
  }

  public async create(options: FileSystemCreateOptions = {}): Promise<FileSystemCreateResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-create",
      options.tracingOptions
    );
    try {
      return await this.blobContainerClient.create({
        ...options,
        access: toContainerPublicAccessType(options.access),
        tracingOptions: { ...options.tracingOptions, spanOptions }
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

  public async delete(options: FileSystemDeleteOptions = {}): Promise<FileSystemDeleteResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-delete",
      options.tracingOptions
    );
    try {
      return await this.blobContainerClient.delete({
        ...options,
        tracingOptions: { ...options.tracingOptions, spanOptions }
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

  public async getProperties(
    options: FileSystemGetPropertiesOptions = {}
  ): Promise<FileSystemGetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-getProperties",
      options.tracingOptions
    );
    try {
      const rawResponse = await this.blobContainerClient.getProperties({
        ...options,
        tracingOptions: { ...options.tracingOptions, spanOptions }
      });

      // Transfer and rename blobPublicAccess to publicAccess
      const response = rawResponse as FileSystemGetPropertiesResponse;

      response.publicAccess = toPublicAccessType(rawResponse.blobPublicAccess);
      response._response.parsedHeaders.publicAccess = response.publicAccess;

      delete rawResponse.blobPublicAccess;
      delete rawResponse._response.parsedHeaders.blobPublicAccess;

      return response;
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

  public async setMetadata(
    metadata?: Metadata,
    options: FileSystemSetMetadataOptions = {}
  ): Promise<FileSystemSetMetadataResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-setMetadata",
      options.tracingOptions
    );
    try {
      return await this.blobContainerClient.setMetadata(metadata, {
        ...options,
        tracingOptions: { ...options.tracingOptions, spanOptions }
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

  public listPaths(
    options: ListPathsOptions = {}
  ): PagedAsyncIterableIterator<Path, ListPathsSegmentResponse> {
    const iter = this.listItems(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => {
        return this.listSegments(settings.continuationToken, {
          maxResults: settings.maxPageSize,
          ...options
        });
      }
    };
  }

  private async *listItems(options: ListPathsSegmentOptions = {}): AsyncIterableIterator<Path> {
    for await (const response of this.listSegments(undefined, options)) {
      yield* response.paths || [];
    }
  }

  private async *listSegments(
    continuation?: string,
    options: ListPathsSegmentOptions = {}
  ): AsyncIterableIterator<ListPathsSegmentResponse> {
    let response;
    if (!!continuation || continuation === undefined) {
      do {
        response = await this.listPathsSegment(continuation, options);
        continuation = response.continuation;
        yield response;
      } while (continuation);
    }
  }

  private async listPathsSegment(
    continuation?: string,
    options: ListPathsSegmentOptions = {}
  ): Promise<ListPathsSegmentResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-listPathsSegment",
      options.tracingOptions
    );
    try {
      return await this.fileSystemContext.listPaths(options.recursive || false, {
        continuation,
        ...options,
        upn: options.userPrincipalName,
        spanOptions
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
}
