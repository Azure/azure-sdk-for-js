"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageContextClient = void 0;
const index_js_1 = require("./generated/src/index.js");
/**
 * @internal
 */
class StorageContextClient extends index_js_1.StorageClient {
    async sendOperationRequest(operationArguments, operationSpec) {
        const operationSpecToSend = Object.assign({}, operationSpec);
        if (operationSpecToSend.path === "/{containerName}" ||
            operationSpecToSend.path === "/{containerName}/{blob}") {
            operationSpecToSend.path = "";
        }
        return super.sendOperationRequest(operationArguments, operationSpecToSend);
    }
}
exports.StorageContextClient = StorageContextClient;
//# sourceMappingURL=StorageContextClient.js.map