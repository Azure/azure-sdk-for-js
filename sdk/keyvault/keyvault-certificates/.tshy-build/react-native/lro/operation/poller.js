// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CertificateOperationPollOperation } from "./operation.js";
import { KeyVaultCertificatePoller, cleanState } from "../keyVaultCertificatePoller.js";
/**
 * Class that creates a poller that waits until a certificate finishes being created
 */
export class CertificateOperationPoller extends KeyVaultCertificatePoller {
    constructor(options) {
        const { client, certificateName, operationOptions, intervalInMs = 2000, resumeFrom } = options;
        let state;
        if (resumeFrom) {
            state = JSON.parse(resumeFrom).state;
        }
        const operation = new CertificateOperationPollOperation(Object.assign(Object.assign({}, state), { certificateName }), client, operationOptions);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
    /**
     * Gets the public state of the polling operation
     */
    getOperationState() {
        return Object.assign(Object.assign({}, cleanState(this.operation.state)), { certificateOperation: this.operation.state.certificateOperation });
    }
}
//# sourceMappingURL=poller.js.map