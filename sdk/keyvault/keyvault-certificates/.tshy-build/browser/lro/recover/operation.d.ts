import type { AbortSignalLike } from "@azure/abort-controller";
import type { OperationOptions } from "@azure-rest/core-client";
import type { KeyVaultCertificateWithPolicy } from "../../certificatesModels.js";
import type { KeyVaultClient } from "../../generated/keyVaultClient.js";
import type { KeyVaultCertificatePollOperationState } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePollOperation } from "../keyVaultCertificatePoller.js";
/**
 * Deprecated: Public representation of the recovery of a deleted certificate poll operation
 */
export type RecoverDeletedCertificateState = KeyVaultCertificatePollOperationState<KeyVaultCertificateWithPolicy>;
/**
 * An interface representing the recovery of a deleted certificate's poll operation
 */
export declare class RecoverDeletedCertificatePollOperation extends KeyVaultCertificatePollOperation<RecoverDeletedCertificateState, KeyVaultCertificateWithPolicy> {
    state: RecoverDeletedCertificateState;
    private client;
    private operationOptions;
    constructor(state: RecoverDeletedCertificateState, client: KeyVaultClient, operationOptions?: OperationOptions);
    /**
     * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
     */
    private getCertificate;
    /**
     * Recovers the deleted certificate in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation
     * requires the certificate/recover permission.
     */
    private recoverDeletedCertificate;
    /**
     * Reaches to the service and updates the poll operation.
     */
    update(options?: {
        abortSignal?: AbortSignalLike;
        fireProgress?: (state: RecoverDeletedCertificateState) => void;
    }): Promise<RecoverDeletedCertificatePollOperation>;
}
//# sourceMappingURL=operation.d.ts.map