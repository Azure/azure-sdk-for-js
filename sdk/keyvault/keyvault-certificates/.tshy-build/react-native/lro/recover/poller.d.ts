import type { RecoverDeletedCertificateState } from "./operation.js";
import type { KeyVaultCertificateWithPolicy } from "../../certificatesModels.js";
import type { KeyVaultCertificatePollerOptions } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePoller } from "../keyVaultCertificatePoller.js";
export interface RecoverDeletedCertificatePollerOptions extends KeyVaultCertificatePollerOptions {
}
/**
 * Class that creates a poller that waits until a deleted certificate is fully recovered.
 */
export declare class RecoverDeletedCertificatePoller extends KeyVaultCertificatePoller<RecoverDeletedCertificateState, KeyVaultCertificateWithPolicy> {
    constructor(options: RecoverDeletedCertificatePollerOptions);
}
//# sourceMappingURL=poller.d.ts.map