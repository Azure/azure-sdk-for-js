"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEncryptionKeyResponse = void 0;
const ResourceResponse_js_1 = require("../../request/ResourceResponse.js");
/** Response object for ClientEncryptionKey operations */
class ClientEncryptionKeyResponse extends ResourceResponse_js_1.ResourceResponse {
    constructor(resource, headers, statusCode, clientEncryptionKeyProperties, diagnostics) {
        super(resource, headers, statusCode, diagnostics);
        this.clientEncryptionKeyProperties = clientEncryptionKeyProperties;
    }
}
exports.ClientEncryptionKeyResponse = ClientEncryptionKeyResponse;
//# sourceMappingURL=ClientEncryptionKeyResponse.js.map