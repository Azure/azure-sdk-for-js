import type { AbortSignalLike } from "@azure/abort-controller";
import type { OperationOptions } from "@azure-rest/core-client";
import type { CertificateOperation, KeyVaultCertificateWithPolicy } from "../../certificatesModels.js";
import type { KeyVaultCertificatePollOperationState } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePollOperation } from "../keyVaultCertificatePoller.js";
import type { KeyVaultClient } from "../../generated/keyVaultClient.js";
/**
 * An interface representing the publicly available properties of the state of the CertificateOperationPoller.
 */
export interface CertificateOperationState extends KeyVaultCertificatePollOperationState<KeyVaultCertificateWithPolicy> {
    /**
     * The operation of the certificate
     */
    certificateOperation?: CertificateOperation;
}
/**
 * An interface representing the active operation of a certificate's creation,
 * which is represented locally as the "operation" of an active LRO Poller.
 */
export declare class CertificateOperationPollOperation extends KeyVaultCertificatePollOperation<CertificateOperationState, KeyVaultCertificateWithPolicy> {
    state: CertificateOperationState;
    private client;
    private operationOptions;
    constructor(state: CertificateOperationState, client: KeyVaultClient, operationOptions?: OperationOptions);
    /**
     * Cancels a certificate creation operation that is already in progress. This operation requires the certificates/update permission.
     */
    private cancelCertificateOperation;
    /**
     * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
     */
    private getCertificate;
    /**
     * Gets the certificate operation.
     */
    private getPlainCertificateOperation;
    /**
     * Reaches to the service and updates the poll operation.
     */
    update(options?: {
        abortSignal?: AbortSignalLike;
        fireProgress?: (state: CertificateOperationState) => void;
    }): Promise<CertificateOperationPollOperation>;
    /**
     * Reaches to the service and cancels the certificate's operation, also updating the poll operation.
     */
    cancel(this: CertificateOperationPollOperation, options?: {
        abortSignal?: AbortSignal;
    }): Promise<CertificateOperationPollOperation>;
    /**
     * Serializes the certificate's poll operation
     */
    toString(): string;
}
//# sourceMappingURL=operation.d.ts.map