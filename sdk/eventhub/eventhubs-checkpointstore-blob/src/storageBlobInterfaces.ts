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
 * An interface compatible with Storage Blob's BlobClient class.
 */
export interface BlobClientLike {
  getBlockBlobClient(): BlockBlobClientLike;
}

/**
 * An interface compatible with Storage Blob's ContainerClient class.
 */
export interface ContainerClientLike {
  getBlobClient(blobName: string): BlobClientLike;
  listBlobsFlat(
    options?: ContainerListBlobsOptions
  ): PagedAsyncIterableIterator<BlobItem, ContainerListBlobFlatSegmentResponse>;
}

/**
 * An interface compatible with Storage Blob's BlockBlobClient class.
 */
export interface BlockBlobClientLike {
  upload(
    body: HttpRequestBody,
    contentLength: number,
    options?: BlockBlobUploadOptions
  ): Promise<BlockBlobUploadResponse>;
  setMetadata(
    metadata?: Metadata,
    options?: BlobSetMetadataOptions
  ): Promise<ContainerSetMetadataResponse>;
}
