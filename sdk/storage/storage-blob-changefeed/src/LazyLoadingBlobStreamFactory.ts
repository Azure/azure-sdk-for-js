// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlobClient } from "@azure/storage-blob";
import type { LazyLoadingBlobStreamOptions } from "./LazyLoadingBlobStream.js";
import { LazyLoadingBlobStream } from "./LazyLoadingBlobStream.js";

export class LazyLoadingBlobStreamFactory {
  public create(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    blobClient: BlobClient,
    offset: number,
    blockSize: number,
    options?: LazyLoadingBlobStreamOptions,
  ): LazyLoadingBlobStream {
    return new LazyLoadingBlobStream(blobClient, offset, blockSize, options);
  }
}
