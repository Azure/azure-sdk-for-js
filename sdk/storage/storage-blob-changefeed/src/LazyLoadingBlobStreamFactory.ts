// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { BlobClient } from "@azure/storage-blob";
import { LazyLoadingBlobStreamOptions, LazyLoadingBlobStream } from "./LazyLoadingBlobStream";

export class LazyLoadingBlobStreamFactory {
  public create(
    blobClient: BlobClient,
    offset: number,
    blockSize: number,
    options?: LazyLoadingBlobStreamOptions
  ): LazyLoadingBlobStream {
    return new LazyLoadingBlobStream(blobClient, offset, blockSize, options);
  }
}
