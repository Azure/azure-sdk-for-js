// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlobClient } from "@azure/storage-blob";
import type { LazyLoadingBlobStreamOptions } from "#platform/LazyLoadingBlobStream";
import { LazyLoadingBlobStream } from "#platform/LazyLoadingBlobStream";

export class LazyLoadingBlobStreamFactory {
  public create(
    blobClient: BlobClient,
    offset: number,
    blockSize: number,
    options?: LazyLoadingBlobStreamOptions,
  ): LazyLoadingBlobStream {
    return new LazyLoadingBlobStream(blobClient, offset, blockSize, options);
  }
}
