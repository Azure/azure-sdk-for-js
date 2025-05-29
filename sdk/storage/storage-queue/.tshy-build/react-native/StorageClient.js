// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { StorageContextClient } from "./StorageContextClient.js";
import { getCoreClientOptions, getCredentialFromPipeline } from "./Pipeline.js";
import { getAccountNameFromUrl } from "./utils/utils.common.js";
/**
 * A StorageClient represents a based client class for {@link QueueServiceClient}, {@link QueueClient} and etc.
 */
export class StorageClient {
    /**
     * Creates an instance of StorageClient.
     * @param url -
     * @param pipeline -
     */
    constructor(url, pipeline) {
        this.url = url;
        this.accountName = getAccountNameFromUrl(url);
        this.pipeline = pipeline;
        this.storageClientContext = getStorageClientContext(this.url, this.pipeline);
        this.credential = getCredentialFromPipeline(pipeline);
    }
}
/**
 * @internal
 */
export function getStorageClientContext(url, pipeline) {
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
    return new StorageContextClient(url, getCoreClientOptions(pipeline));
}
//# sourceMappingURL=StorageClient.js.map