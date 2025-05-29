import type { DeleteCertificatePollOperationState } from "./operation.js";
import type { DeletedCertificate } from "../../certificatesModels.js";
import type { KeyVaultCertificatePollerOptions } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePoller } from "../keyVaultCertificatePoller.js";
export interface DeleteCertificatePollerOptions extends KeyVaultCertificatePollerOptions {
}
/**
 * Class that deletes a poller that waits until a certificate finishes being deleted
 * @internal
 */
export declare class DeleteCertificatePoller extends KeyVaultCertificatePoller<DeleteCertificatePollOperationState, DeletedCertificate> {
    constructor(options: DeleteCertificatePollerOptions);
}
//# sourceMappingURL=poller.d.ts.map