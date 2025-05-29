// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CreateCertificatePollOperation } from "./operation.js";
import { KeyVaultCertificatePoller } from "../keyVaultCertificatePoller.js";
/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 */
export class CreateCertificatePoller extends KeyVaultCertificatePoller {
    constructor(options) {
        const { client, certificateName, certificatePolicy, createCertificateOptions, operationOptions, intervalInMs = 2000, resumeFrom, } = options;
        let state;
        if (resumeFrom) {
            state = JSON.parse(resumeFrom).state;
        }
        const operation = new CreateCertificatePollOperation(Object.assign(Object.assign({}, state), { certificateName,
            certificatePolicy,
            createCertificateOptions }), client, operationOptions);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
}
//# sourceMappingURL=poller.js.map