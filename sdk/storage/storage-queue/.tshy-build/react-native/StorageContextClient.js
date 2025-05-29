// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { StorageClient } from "./generated/src/index.js";
/**
 * @internal
 */
export class StorageContextClient extends StorageClient {
    async sendOperationRequest(operationArguments, operationSpec) {
        const operationSpecToSend = Object.assign({}, operationSpec);
        if (operationSpecToSend.path === "/{queueName}" ||
            operationSpecToSend.path === "/{queueName}/messages" ||
            operationSpecToSend.path === "/{queueName}/messages/{messageid}") {
            operationSpecToSend.path = "";
        }
        return super.sendOperationRequest(operationArguments, operationSpecToSend);
    }
}
//# sourceMappingURL=StorageContextClient.js.map