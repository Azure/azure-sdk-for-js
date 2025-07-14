// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlobClient } from "@azure/storage-blob";
import type { LazyLoadingBlobStreamOptions } from "./LazyLoadingBlobStream.js";
import { LazyLoadingBlobStream } from "./LazyLoadingBlobStream.js";

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
