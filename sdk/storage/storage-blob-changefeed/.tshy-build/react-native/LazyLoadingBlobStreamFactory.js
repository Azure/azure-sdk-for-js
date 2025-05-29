// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { LazyLoadingBlobStream } from "./LazyLoadingBlobStream.js";
export class LazyLoadingBlobStreamFactory {
    create(blobClient, offset, blockSize, options) {
        return new LazyLoadingBlobStream(blobClient, offset, blockSize, options);
    }
}
//# sourceMappingURL=LazyLoadingBlobStreamFactory.js.map