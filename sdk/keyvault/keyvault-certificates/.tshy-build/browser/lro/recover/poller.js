// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RecoverDeletedCertificatePollOperation } from "./operation.js";
import { KeyVaultCertificatePoller } from "../keyVaultCertificatePoller.js";
/**
 * Class that creates a poller that waits until a deleted certificate is fully recovered.
 */
export class RecoverDeletedCertificatePoller extends KeyVaultCertificatePoller {
    constructor(options) {
        const { client, certificateName, operationOptions, intervalInMs = 2000, resumeFrom } = options;
        let state;
        if (resumeFrom) {
            state = JSON.parse(resumeFrom).state;
        }
        const operation = new RecoverDeletedCertificatePollOperation(Object.assign(Object.assign({}, state), { certificateName }), client, operationOptions);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
}
//# sourceMappingURL=poller.js.map