import type { RecoverDeletedSecretPollOperationState } from "./operation.js";
import type { SecretProperties } from "../../secretsModels.js";
import type { KeyVaultSecretPollerOptions } from "../keyVaultSecretPoller.js";
import { KeyVaultSecretPoller } from "../keyVaultSecretPoller.js";
/**
 * Class that deletes a poller that waits until a secret finishes being deleted
 */
export declare class RecoverDeletedSecretPoller extends KeyVaultSecretPoller<RecoverDeletedSecretPollOperationState, SecretProperties> {
    constructor(options: KeyVaultSecretPollerOptions);
}
//# sourceMappingURL=poller.d.ts.map