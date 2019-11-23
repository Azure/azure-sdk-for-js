// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { TokenCredential } from "@azure/core-http";
import { BlobClient } from "@azure/storage-blob";
import { CanonicalCode } from "@opentelemetry/types";

import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { DataLakeDirectoryClient } from "./DataLakeDirectoryClient";
import { DataLakeFileClient } from "./DataLakeFileClient";
import { DataLakeLeaseClient } from "./DataLakeLeaseClient";
import { PathOperations } from "./generated/src/operations";
import {
  Metadata,
  PathAccessControlItem,
  PathCreateOptions,
  PathCreateResponse,
  PathDeleteOptions,
  PathDeleteResponse,
  PathGetAccessControlOptions,
  PathGetAccessControlResponse,
  PathGetPropertiesAction,
  PathGetPropertiesOptions,
  PathGetPropertiesResponse,
  PathHttpHeaders,
  PathMoveOptions,
  PathMoveResponse,
  PathPermissions,
  PathRenameMode,
  PathResourceType,
  PathSetAccessControlOptions,
  PathSetAccessControlResponse,
  PathSetHttpHeadersOptions,
  PathSetHttpHeadersResponse,
  PathSetMetadataOptions,
  PathSetMetadataResponse,
  PathSetPermissionsOptions,
  PathSetPermissionsResponse,
} from "./models";
import { newPipeline, Pipeline, StoragePipelineOptions } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { toAclString, toPathGetAccessControlResponse, toPermissionsString, toProperties } from "./transforms";
import { createSpan } from "./utils/tracing";
import { setURLPath } from "./utils/utils.common";

export class DataLakePathClient extends StorageClient {
  private pathContext: PathOperations;
  private blobClient: BlobClient;

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

    this.pathContext = new PathOperations(this.storageClientContext);
    this.blobClient = new BlobClient(this.blobEndpointUrl, this.pipeline);
  }

  public get fileSystemName(): string {
    return this.blobClient.containerName;
  }

  public get name(): string {
    return this.blobClient.name;
  }

  public toDirectoryClient(): DataLakeDirectoryClient {
    return new DataLakeDirectoryClient(this.dfsEndpointUrl, this.pipeline);
  }

  public toFileClient(): DataLakeFileClient {
    return new DataLakeFileClient(this.dfsEndpointUrl, this.pipeline);
  }

  public getDataLakeLeaseClient(proposeLeaseId?: string): DataLakeLeaseClient {
    return new DataLakeLeaseClient(this.blobClient.getBlobLeaseClient(proposeLeaseId));
  }

  public async create(
    resourceType: PathResourceType,
    options: PathCreateOptions = {}
  ): Promise<PathCreateResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan("DataLakePathClient-create", options.tracingOptions);
    try {
      return await this.pathContext.create({
        ...options,
        resource: resourceType,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        properties: toProperties(options.metadata),
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

  public async delete(
    recursive?: boolean,
    options: PathDeleteOptions = {}
  ): Promise<PathDeleteResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan("DataLakePathClient-delete", options.tracingOptions);
    try {
      let continuation;
      let response;

      // How to handle long delete loop?
      do {
        response = await this.pathContext.deleteMethod({
          continuation,
          recursive,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: options.conditions,
          spanOptions
        });
        continuation = response.continuation;
      } while (continuation !== undefined && continuation !== "");

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

  public async getAccessControl(
    options: PathGetAccessControlOptions = {}
  ): Promise<PathGetAccessControlResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "DataLakePathClient-getAccessControl",
      options.tracingOptions
    );
    try {
      const response = await this.pathContext.getProperties({
        action: PathGetPropertiesAction.GetAccessControl,
        upn: options.userPrincipalName,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
      return toPathGetAccessControlResponse(response);
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

  public async setAccessControl(
    acl: PathAccessControlItem[],
    options: PathSetAccessControlOptions = {}
  ): Promise<PathSetAccessControlResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "DataLakePathClient-setAccessControl",
      options.tracingOptions
    );
    try {
      return await this.pathContext.setAccessControl({
        ...options,
        acl: toAclString(acl),
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

  public async setPermissions(
    permissions: PathPermissions,
    options: PathSetPermissionsOptions = {}
  ): Promise<PathSetPermissionsResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "DataLakePathClient-setPermissions",
      options.tracingOptions
    );
    try {
      return await this.pathContext.setAccessControl({
        ...options,
        permissions: toPermissionsString(permissions),
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

  public async getProperties(
    options: PathGetPropertiesOptions = {}
  ): Promise<PathGetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakePathClient-getProperties",
      options.tracingOptions
    );
    try {
      return await this.blobClient.getProperties({
        ...options,
        customerProvidedKey: undefined, // Doesn't support customer provided key in data lake package yet
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

  public async setHttpHeaders(
    httpHeaders: PathHttpHeaders,
    options: PathSetHttpHeadersOptions = {}
  ): Promise<PathSetHttpHeadersResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakePathClient-setHttpHeaders",
      options.tracingOptions
    );
    try {
      return await this.blobClient.setHTTPHeaders(
        {
          blobCacheControl: httpHeaders.cacheControl,
          blobContentType: httpHeaders.contentType,
          blobContentMD5: httpHeaders.contentMD5,
          blobContentEncoding: httpHeaders.contentEncoding,
          blobContentLanguage: httpHeaders.contentLanguage,
          blobContentDisposition: httpHeaders.contentDisposition
        },
        {
          ...options,
          tracingOptions: { ...options.tracingOptions, spanOptions }
        }
      );
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
    metadata: Metadata,
    options: PathSetMetadataOptions = {}
  ): Promise<PathSetMetadataResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakePathClient-setMetadata",
      options.tracingOptions
    );
    try {
      return await this.blobClient.setMetadata(metadata, {
        ...options,
        customerProvidedKey: undefined, // Doesn't support customer provided key in data lake package yet
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

  // Consideration: Why DataLakePathClient instead of string for destination parameter?
  // Dest and source may not in same filesystem?
  // Dest and source may not have same credential?
  public async move(destinationPath: string, options?: PathMoveOptions): Promise<PathMoveResponse>;

  public async move(
    destinationFileSystem: string,
    destinationPath: string,
    options?: PathMoveOptions
  ): Promise<PathMoveResponse>;

  public async move(
    destinationPathOrFileSystem: string,
    destinationPathOrOptions?: string | PathMoveOptions,
    options?: PathMoveOptions
  ): Promise<PathMoveResponse> {
    let destinationFileSystem = this.fileSystemName;
    let destinationPath = destinationPathOrFileSystem;

    if (typeof destinationPathOrOptions === "string") {
      destinationFileSystem = destinationPathOrFileSystem;
      destinationPath = destinationPathOrOptions;
      options = options || {};
    } else {
      options = destinationPathOrOptions || {};
    }

    options.conditions = options.conditions || {};
    options.destinationConditions = options.destinationConditions || {};

    const { span, spanOptions } = createSpan("DataLakePathClient-move", options.tracingOptions);

    const renameSource = `/${this.fileSystemName}/${this.name}`; // TODO: Confirm number of /
    const renameDestination = `/${destinationFileSystem}/${destinationPath}`; // TODO: Confirm encoding

    const destinationUrl = setURLPath(this.dfsEndpointUrl, renameDestination);
    const destPathClient = new DataLakePathClient(destinationUrl, this.pipeline);

    try {
      return await destPathClient.pathContext.create({
        mode: PathRenameMode.Legacy, // By default,
        renameSource,
        sourceLeaseId: options.conditions.leaseId,
        leaseAccessConditions: options.destinationConditions,
        sourceModifiedAccessConditions: {
          sourceIfMatch: options.conditions.ifMatch,
          sourceIfNoneMatch: options.conditions.ifNoneMatch,
          sourceIfModifiedSince: options.conditions.ifModifiedSince,
          sourceIfUnmodifiedSince: options.conditions.ifUnmodifiedSince
        },
        modifiedAccessConditions: options.destinationConditions,
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
