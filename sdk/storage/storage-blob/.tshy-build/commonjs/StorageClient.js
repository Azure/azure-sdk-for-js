"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageClient = void 0;
const StorageContextClient_js_1 = require("./StorageContextClient.js");
const Pipeline_js_1 = require("./Pipeline.js");
const utils_common_js_1 = require("./utils/utils.common.js");
/**
 * A StorageClient represents a based URL class for {@link BlobServiceClient}, {@link ContainerClient}
 * and etc.
 */
class StorageClient {
    /**
     * Creates an instance of StorageClient.
     * @param url - url to resource
     * @param pipeline - request policy pipeline.
     */
    constructor(url, pipeline) {
        // URL should be encoded and only once, protocol layer shouldn't encode URL again
        this.url = (0, utils_common_js_1.escapeURLPath)(url);
        this.accountName = (0, utils_common_js_1.getAccountNameFromUrl)(url);
        this.pipeline = pipeline;
        this.storageClientContext = new StorageContextClient_js_1.StorageContextClient(this.url, (0, Pipeline_js_1.getCoreClientOptions)(pipeline));
        this.isHttps = (0, utils_common_js_1.iEqual)((0, utils_common_js_1.getURLScheme)(this.url) || "", "https");
        this.credential = (0, Pipeline_js_1.getCredentialFromPipeline)(pipeline);
        // Override protocol layer's default content-type
        const storageClientContext = this.storageClientContext;
        storageClientContext.requestContentType = undefined;
    }
}
exports.StorageClient = StorageClient;
//# sourceMappingURL=StorageClient.js.map