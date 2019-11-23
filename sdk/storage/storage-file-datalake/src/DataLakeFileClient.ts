// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { HttpRequestBody, TokenCredential } from "@azure/core-http";
import { BlobClient } from "@azure/storage-blob";
import { CanonicalCode } from "@opentelemetry/types";

import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { DataLakePathClient } from "./DataLakePathClient";
import { PathOperations } from "./generated/src/operations";
import {
  FileAppendOptions,
  FileAppendResponse,
  FileCreateOptions,
  FileCreateResponse,
  FileFlushOptions,
  FileFlushResponse,
  FileReadOptions,
  FileReadResponse,
  PathCreateOptions,
  PathCreateResponse,
  PathResourceType,
} from "./models";
import { newPipeline, Pipeline, StoragePipelineOptions } from "./Pipeline";
import { createSpan } from "./utils/tracing";

export class DataLakeFileClient extends DataLakePathClient {
  private pathContextInternal: PathOperations;
  private blobClientInternal: BlobClient;

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

    this.pathContextInternal = new PathOperations(this.storageClientContext);
    this.blobClientInternal = new BlobClient(this.blobEndpointUrl, this.pipeline);
  }

  public async create(
    resourceType: PathResourceType,
    options?: PathCreateOptions
  ): Promise<PathCreateResponse>;
  public async create(options?: FileCreateOptions): Promise<FileCreateResponse>;
  public async create(
    resourceTypeOrOptions?: PathResourceType | PathCreateOptions,
    options: PathCreateOptions = {}
  ): Promise<PathCreateResponse> {
    if (resourceTypeOrOptions === PathResourceType.File) {
      return super.create(resourceTypeOrOptions as PathResourceType, options);
    }

    if (resourceTypeOrOptions === PathResourceType.Directory) {
      throw TypeError(
        `DataLakeFileClient:create() resourceType cannot be ${PathResourceType.Directory}. Refer to DataLakeDirectoryClient for directory creation.`
      );
    }

    options = resourceTypeOrOptions || {};
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan("DataLakeFileClient-create", options.tracingOptions);
    try {
      return await super.create(PathResourceType.File, {
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

  public async read(
    offset: number = 0,
    count?: number,
    options: FileReadOptions = {}
  ): Promise<FileReadResponse> {
    const { span, spanOptions } = createSpan("DataLakeFileClient-read", options.tracingOptions);
    try {
      const rawResponse = await this.blobClientInternal.download(offset, count, {
        ...options,
        tracingOptions: { ...options.tracingOptions, spanOptions }
      });

      const response = rawResponse as FileReadResponse;
      response.contentAsBlob = rawResponse.blobBody;
      response.fileContentMD5 = rawResponse.blobContentMD5;
      response._response.parsedHeaders.fileContentMD5 =
        rawResponse._response.parsedHeaders.blobContentMD5;
      delete rawResponse.blobBody;
      delete rawResponse.blobContentMD5;
      delete rawResponse._response.parsedHeaders.blobContentMD5;

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

  public async append(
    body: HttpRequestBody,
    offset: number,
    length: number,
    options: FileAppendOptions = {}
  ): Promise<FileAppendResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan("DataLakeFileClient-append", options.tracingOptions);
    try {
      return await this.pathContextInternal.appendData(body, {
        pathHttpHeaders: {
          contentMD5: options.contentMD5
        },
        position: offset,
        contentLength: length,
        leaseAccessConditions: options.conditions,
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

  public async flush(position: number, options: FileFlushOptions = {}): Promise<FileFlushResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan("DataLakeFileClient-flush", options.tracingOptions);
    try {
      return await this.pathContextInternal.flushData({
        ...options,
        position,
        contentLength: 0,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
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
