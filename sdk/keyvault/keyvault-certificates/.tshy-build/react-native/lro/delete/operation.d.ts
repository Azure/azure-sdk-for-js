import type { AbortSignalLike } from "@azure/abort-controller";
import type { OperationOptions } from "@azure-rest/core-client";
import type { DeletedCertificate, GetDeletedCertificateOptions } from "../../certificatesModels.js";
import type { KeyVaultCertificatePollOperationState } from "../keyVaultCertificatePoller.js";
import { KeyVaultCertificatePollOperation } from "../keyVaultCertificatePoller.js";
import type { KeyVaultClient } from "../../generated/keyVaultClient.js";
/**
 * The public representation of the DeleteCertificatePoller operation state.
 */
export type DeleteCertificateState = KeyVaultCertificatePollOperationState<DeletedCertificate>;
/**
 * An interface representing the state of a delete certificate's poll operation
 */
export interface DeleteCertificatePollOperationState extends KeyVaultCertificatePollOperationState<DeletedCertificate> {
}
/**
 * An interface representing a delete certificate's poll operation
 */
export declare class DeleteCertificatePollOperation extends KeyVaultCertificatePollOperation<DeleteCertificatePollOperationState, DeletedCertificate> {
    state: DeleteCertificatePollOperationState;
    private client;
    private operationOptions;
    constructor(state: DeleteCertificatePollOperationState, client: KeyVaultClient, operationOptions?: OperationOptions);
    /**
     * The DELETE operation applies to any certificate stored in Azure Key Vault. DELETE cannot be applied
     * to an individual version of a certificate. This operation requires the certificates/delete permission.
     */
    private deleteCertificate;
    /**
     * Retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion and the
     * current deletion recovery level. This operation requires the certificates/get permission.
     */
    getDeletedCertificate(certificateName: string, options?: GetDeletedCertificateOptions): Promise<DeletedCertificate>;
    /**
     * Reaches to the service and updates the delete certificate's poll operation.
     */
    update(this: DeleteCertificatePollOperation, options?: {
        abortSignal?: AbortSignalLike;
        fireProgress?: (state: DeleteCertificatePollOperationState) => void;
    }): Promise<DeleteCertificatePollOperation>;
}
//# sourceMappingURL=operation.d.ts.map