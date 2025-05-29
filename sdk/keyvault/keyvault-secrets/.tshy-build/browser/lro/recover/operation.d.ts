import type { AbortSignalLike } from "@azure/abort-controller";
import type { SecretProperties } from "../../secretsModels.js";
import type { KeyVaultSecretPollOperationState } from "../keyVaultSecretPoller.js";
import { KeyVaultSecretPollOperation } from "../keyVaultSecretPoller.js";
import type { KeyVaultClient } from "../../generated/keyVaultClient.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * An interface representing the state of a delete secret's poll operation
 */
export interface RecoverDeletedSecretPollOperationState extends KeyVaultSecretPollOperationState<SecretProperties> {
}
/**
 * An interface representing a delete secret's poll operation
 */
export declare class RecoverDeletedSecretPollOperation extends KeyVaultSecretPollOperation<RecoverDeletedSecretPollOperationState, SecretProperties> {
    state: RecoverDeletedSecretPollOperationState;
    private client;
    private options;
    constructor(state: RecoverDeletedSecretPollOperationState, client: KeyVaultClient, options?: OperationOptions);
    /**
     * The getSecret method returns the specified secret along with its properties.
     * This operation requires the secrets/get permission.
     */
    private getSecret;
    /**
     * The recoverDeletedSecret method recovers the specified deleted secret along with its properties.
     * This operation requires the secrets/recover permission.
     */
    private recoverDeletedSecret;
    /**
     * Reaches to the service and updates the delete secret's poll operation.
     */
    update(this: RecoverDeletedSecretPollOperation, options?: {
        abortSignal?: AbortSignalLike;
        fireProgress?: (state: RecoverDeletedSecretPollOperationState) => void;
    }): Promise<RecoverDeletedSecretPollOperation>;
}
//# sourceMappingURL=operation.d.ts.map