import type { CreateCertificateState } from "./operation.js";
import type { KeyVaultCertificateWithPolicy, CreateCertificateOptions, CertificatePolicy } from "../../certificatesModels.js";
import type { KeyVaultCertificatePollerOptions } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePoller } from "../keyVaultCertificatePoller.js";
export interface CreateCertificatePollerOptions extends KeyVaultCertificatePollerOptions {
    certificatePolicy?: CertificatePolicy;
    createCertificateOptions: CreateCertificateOptions;
}
/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 */
export declare class CreateCertificatePoller extends KeyVaultCertificatePoller<CreateCertificateState, KeyVaultCertificateWithPolicy> {
    constructor(options: CreateCertificatePollerOptions);
}
//# sourceMappingURL=poller.d.ts.map