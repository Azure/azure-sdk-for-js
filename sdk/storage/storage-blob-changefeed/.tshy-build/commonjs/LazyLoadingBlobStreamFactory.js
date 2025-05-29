"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyLoadingBlobStreamFactory = void 0;
const LazyLoadingBlobStream_js_1 = require("./LazyLoadingBlobStream.js");
class LazyLoadingBlobStreamFactory {
    create(blobClient, offset, blockSize, options) {
        return new LazyLoadingBlobStream_js_1.LazyLoadingBlobStream(blobClient, offset, blockSize, options);
    }
}
exports.LazyLoadingBlobStreamFactory = LazyLoadingBlobStreamFactory;
//# sourceMappingURL=LazyLoadingBlobStreamFactory.js.map