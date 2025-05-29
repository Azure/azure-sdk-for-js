// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RecoverDeletedKeyPollOperation } from "./operation.js";
import { KeyVaultKeyPoller } from "../keyVaultKeyPoller.js";
/**
 * Class that deletes a poller that waits until a key finishes being deleted
 */
export class RecoverDeletedKeyPoller extends KeyVaultKeyPoller {
    constructor(options) {
        const { client, name, operationOptions, intervalInMs = 2000, resumeFrom } = options;
        let state;
        if (resumeFrom) {
            state = JSON.parse(resumeFrom).state;
        }
        const operation = new RecoverDeletedKeyPollOperation(Object.assign(Object.assign({}, state), { name }), client, operationOptions);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
}
//# sourceMappingURL=poller.js.map