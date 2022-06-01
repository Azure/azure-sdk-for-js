// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Metadata,
  BlobItem,
  ContainerListBlobFlatSegmentResponse,
  ContainerListBlobsOptions,
  BlockBlobUploadOptions,
  BlockBlobUploadResponse,
  HttpRequestBody,
  BlobSetMetadataOptions,
  ContainerSetMetadataResponse,
} from "@azure/storage-blob";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

/**
 * An interface compatible with an instance of {@link BlobClient}.
 */
export interface BlobClientLike {
  /**
   * Creates a BlockBlobClient object.
   */
  getBlockBlobClient(): BlockBlobClientLike;
}

/**
 * An interface compatible with Storage Blob's ContainerClient class.
 */
export interface ContainerClientLike {
  /**
   * Creates a {@link BlobClient}
   */
  getBlobClient(blobName: string): BlobClientLike;
  /**
   * Returns an async iterable iterator to list all the blobs
   * under the specified account.
   */
  listBlobsFlat(
    options?: ContainerListBlobsOptions
  ): PagedAsyncIterableIterator<BlobItem, ContainerListBlobFlatSegmentResponse>;
}

/**
 * An interface compatible with Storage Blob's BlockBlobClient class.
 */
export interface BlockBlobClientLike {
  /**
   * Creates a new block blob, or updated the content of an existing block blob.
   */
  upload(
    body: HttpRequestBody,
    contentLength: number,
    options?: BlockBlobUploadOptions
  ): Promise<BlockBlobUploadResponse>;
  /**
   * Sets user-defined metadata for the specified blob as one or more name-value pairs.
   */
  setMetadata(
    metadata?: Metadata,
    options?: BlobSetMetadataOptions
  ): Promise<ContainerSetMetadataResponse>;
}
