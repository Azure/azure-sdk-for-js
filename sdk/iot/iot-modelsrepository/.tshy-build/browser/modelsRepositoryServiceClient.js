// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ServiceClient } from "@azure/core-client";
import { DEFAULT_API_VERSION } from "./utils/constants.js";
/**
 * @internal
 */
export class IoTModelsRepositoryServiceClient extends ServiceClient {
    /**
     * Initializes a new instance of the IoTModelsRepositoryServiceClient class.
     *
     * @param url - The URL of the service account or table that is the target of the desired operation.
     * @param options - The parameter options
     */
    constructor(url, options = {}) {
        const defaults = {
            baseUri: `${url}`,
            requestContentType: "application/json; charset=utf-8",
        };
        const optionsWithDefaults = Object.assign(Object.assign({}, defaults), options);
        super(optionsWithDefaults);
        this.url = url;
        this.version = options.version || DEFAULT_API_VERSION;
    }
}
//# sourceMappingURL=modelsRepositoryServiceClient.js.map