// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LazyLoadingBlobStream, LazyLoadingBlobStreamOptions } from "./LazyLoadingBlobStream";
import { BlobClient } from "@azure/storage-blob";

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
