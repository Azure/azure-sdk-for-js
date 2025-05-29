import type { AbortSignalLike } from "@azure/abort-controller";
import type { OperationOptions } from "@azure-rest/core-client";
import type { KeyVaultCertificateWithPolicy, CreateCertificateOptions, CertificatePolicy } from "../../certificatesModels.js";
import type { CertificateOperation } from "../../generated/models/index.js";
import type { KeyVaultCertificatePollOperationState } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePollOperation } from "../keyVaultCertificatePoller.js";
import type { KeyVaultClient } from "../../generated/keyVaultClient.js";
/**
 * The public representation of the CreateCertificatePoller operation state.
 */
export type CreateCertificateState = KeyVaultCertificatePollOperationState<KeyVaultCertificateWithPolicy>;
/**
 * An interface representing the state of a create certificate's poll operation
 */
export interface CreateCertificatePollOperationState extends KeyVaultCertificatePollOperationState<KeyVaultCertificateWithPolicy> {
    /**
     * The policy of the certificate.
     */
    certificatePolicy?: CertificatePolicy;
    /**
     * Optional parameters sent to createCertificates
     */
    createCertificateOptions: CreateCertificateOptions;
    /**
     * The operation of the certificate
     */
    certificateOperation?: CertificateOperation;
}
/**
 * An interface representing a create certificate's poll operation
 */
export declare class CreateCertificatePollOperation extends KeyVaultCertificatePollOperation<CreateCertificatePollOperationState, KeyVaultCertificateWithPolicy> {
    state: CreateCertificatePollOperationState;
    private client;
    private operationOptions;
    constructor(state: CreateCertificatePollOperationState, client: KeyVaultClient, operationOptions?: OperationOptions);
    /**
     * Creates a new certificate. If this is the first version, the certificate resource is created. This operation requires the certificates/create permission.
     */
    private createCertificate;
    /**
     * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
     */
    private getCertificate;
    /**
     * Gets the certificate operation.
     */
    private getPlainCertificateOperation;
    /**
     * Cancels a certificate creation operation that is already in progress. This operation requires the certificates/update permission.
     */
    private cancelCertificateOperation;
    /**
     * Reaches to the service and updates the create certificate's poll operation.
     */
    update(this: CreateCertificatePollOperation, options?: {
        abortSignal?: AbortSignalLike;
        fireProgress?: (state: CreateCertificatePollOperationState) => void;
    }): Promise<CreateCertificatePollOperation>;
    /**
     * Reaches to the service and cancels the certificate's operation, also updating the certificate's poll operation
     */
    cancel(this: CreateCertificatePollOperation, options?: {
        abortSignal?: AbortSignal;
    }): Promise<CreateCertificatePollOperation>;
}
//# sourceMappingURL=operation.d.ts.map