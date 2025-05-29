"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageClient = void 0;
exports.getStorageClientContext = getStorageClientContext;
const StorageContextClient_js_1 = require("./StorageContextClient.js");
const Pipeline_js_1 = require("./Pipeline.js");
const utils_common_js_1 = require("./utils/utils.common.js");
/**
 * A StorageClient represents a based client class for {@link QueueServiceClient}, {@link QueueClient} and etc.
 */
class StorageClient {
    /**
     * Creates an instance of StorageClient.
     * @param url -
     * @param pipeline -
     */
    constructor(url, pipeline) {
        this.url = url;
        this.accountName = (0, utils_common_js_1.getAccountNameFromUrl)(url);
        this.pipeline = pipeline;
        this.storageClientContext = getStorageClientContext(this.url, this.pipeline);
        this.credential = (0, Pipeline_js_1.getCredentialFromPipeline)(pipeline);
    }
}
exports.StorageClient = StorageClient;
/**
 * @internal
 */
function getStorageClientContext(url, pipeline) {
    const pipelineOptions = pipeline.options;
    // Set maximum timeout for queue operations.
    // This was previously set manually in the retry policy specific to this package.
    // https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations
    if (pipelineOptions.retryOptions === undefined) {
        pipelineOptions.retryOptions = {
            tryTimeoutInMs: 30 * 1000,
        };
    }
    else if (pipelineOptions.retryOptions.tryTimeoutInMs === undefined) {
        pipelineOptions.retryOptions.tryTimeoutInMs = 30 * 1000;
    }
    return new StorageContextClient_js_1.StorageContextClient(url, (0, Pipeline_js_1.getCoreClientOptions)(pipeline));
}
//# sourceMappingURL=StorageClient.js.map