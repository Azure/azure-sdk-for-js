// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DeleteCertificatePollOperation } from "./operation.js";
import { KeyVaultCertificatePoller } from "../keyVaultCertificatePoller.js";
/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 * @internal
 */
export class DeleteCertificatePoller extends KeyVaultCertificatePoller {
    constructor(options) {
        const { client, certificateName, operationOptions, intervalInMs = 2000, resumeFrom } = options;
        let state;
        if (resumeFrom) {
            state = JSON.parse(resumeFrom).state;
        }
        const operation = new DeleteCertificatePollOperation(Object.assign(Object.assign({}, state), { certificateName }), client, operationOptions);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
}
//# sourceMappingURL=poller.js.map