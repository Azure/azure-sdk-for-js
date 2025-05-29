import type { AbortSignalLike } from "@azure/abort-controller";
import type { DeletedSecret } from "../../secretsModels.js";
import type { KeyVaultSecretPollOperationState } from "../keyVaultSecretPoller.js";
import { KeyVaultSecretPollOperation } from "../keyVaultSecretPoller.js";
import type { KeyVaultClient } from "../../generated/keyVaultClient.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * An interface representing the state of a delete secret's poll operation
 */
export interface DeleteSecretPollOperationState extends KeyVaultSecretPollOperationState<DeletedSecret> {
}
/**
 * An interface representing a delete secret's poll operation
 */
export declare class DeleteSecretPollOperation extends KeyVaultSecretPollOperation<DeleteSecretPollOperationState, DeletedSecret> {
    state: DeleteSecretPollOperationState;
    private client;
    private operationOptions;
    constructor(state: DeleteSecretPollOperationState, client: KeyVaultClient, operationOptions?: OperationOptions);
    /**
     * Sends a delete request for the given Key Vault Key's name to the Key Vault service.
     * Since the Key Vault Key won't be immediately deleted, we have {@link beginDeleteKey}.
     */
    private deleteSecret;
    /**
     * The getDeletedSecret method returns the specified deleted secret along with its properties.
     * This operation requires the secrets/get permission.
     */
    private getDeletedSecret;
    /**
     * Reaches to the service and updates the delete secret's poll operation.
     */
    update(options?: {
        abortSignal?: AbortSignalLike;
        fireProgress?: (state: DeleteSecretPollOperationState) => void;
    }): Promise<DeleteSecretPollOperation>;
}
//# sourceMappingURL=operation.d.ts.map