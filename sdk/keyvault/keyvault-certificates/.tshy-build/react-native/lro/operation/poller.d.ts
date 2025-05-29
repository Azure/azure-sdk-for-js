import type { CertificateOperationState } from "./operation.js";
import type { KeyVaultCertificateWithPolicy } from "../../certificatesModels.js";
import type { KeyVaultCertificatePollerOptions } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePoller } from "../keyVaultCertificatePoller.js";
export interface CertificateOperationPollerOptions extends KeyVaultCertificatePollerOptions {
}
/**
 * Class that creates a poller that waits until a certificate finishes being created
 */
export declare class CertificateOperationPoller extends KeyVaultCertificatePoller<CertificateOperationState, KeyVaultCertificateWithPolicy> {
    constructor(options: CertificateOperationPollerOptions);
    /**
     * Gets the public state of the polling operation
     */
    getOperationState(): CertificateOperationState;
}
//# sourceMappingURL=poller.d.ts.map