"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoTModelsRepositoryServiceClient = void 0;
const core_client_1 = require("@azure/core-client");
const constants_js_1 = require("./utils/constants.js");
/**
 * @internal
 */
class IoTModelsRepositoryServiceClient extends core_client_1.ServiceClient {
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
        this.version = options.version || constants_js_1.DEFAULT_API_VERSION;
    }
}
exports.IoTModelsRepositoryServiceClient = IoTModelsRepositoryServiceClient;
//# sourceMappingURL=modelsRepositoryServiceClient.js.map