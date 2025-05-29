import type { DeleteSecretPollOperationState } from "./operation.js";
import type { DeletedSecret } from "../../secretsModels.js";
import type { KeyVaultSecretPollerOptions } from "../keyVaultSecretPoller.js";
import { KeyVaultSecretPoller } from "../keyVaultSecretPoller.js";
/**
 * Class that creates a poller that waits until a secret finishes being deleted.
 */
export declare class DeleteSecretPoller extends KeyVaultSecretPoller<DeleteSecretPollOperationState, DeletedSecret> {
    constructor(options: KeyVaultSecretPollerOptions);
}
//# sourceMappingURL=poller.d.ts.map