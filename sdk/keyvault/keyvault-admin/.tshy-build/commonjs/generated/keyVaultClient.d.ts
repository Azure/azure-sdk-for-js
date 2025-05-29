import { RoleAssignmentsOperations } from "./classic/roleAssignments/index.js";
import { RoleDefinitionsOperations } from "./classic/roleDefinitions/index.js";
import { KeyVaultClientOptionalParams, GetSettingsOptionalParams, GetSettingOptionalParams, UpdateSettingOptionalParams, SelectiveKeyRestoreOperationOptionalParams, SelectiveKeyRestoreStatusOptionalParams, FullRestoreOperationOptionalParams, PreFullRestoreOperationOptionalParams, RestoreStatusOptionalParams, PreFullBackupOptionalParams, FullBackupOptionalParams, FullBackupStatusOptionalParams } from "./api/index.js";
import { FullBackupOperation, SASTokenParameter, PreBackupOperationParameters, RestoreOperation, PreRestoreOperationParameters, RestoreOperationParameters, SelectiveKeyRestoreOperation, SelectiveKeyRestoreOperationParameters, UpdateSettingRequest, Setting, SettingsListResult } from "./models/models.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";
export { KeyVaultClientOptionalParams } from "./api/keyVaultContext.js";
export declare class KeyVaultClient {
    private _client;
    /** The pipeline used by this client to make requests */
    readonly pipeline: Pipeline;
    /** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
    constructor(endpointParam: string, credential: TokenCredential, options?: KeyVaultClientOptionalParams);
    /** The operation groups for roleAssignments */
    readonly roleAssignments: RoleAssignmentsOperations;
    /** The operation groups for roleDefinitions */
    readonly roleDefinitions: RoleDefinitionsOperations;
    /** Retrieves a list of all the available account settings that can be configured. */
    getSettings(options?: GetSettingsOptionalParams): Promise<SettingsListResult>;
    /** Retrieves the setting object of a specified setting name. */
    getSetting(settingName: string, options?: GetSettingOptionalParams): Promise<Setting>;
    /** Description of the pool setting to be updated */
    updateSetting(settingName: string, parameters: UpdateSettingRequest, options?: UpdateSettingOptionalParams): Promise<Setting>;
    /** Restores all key versions of a given key using user supplied SAS token pointing to a previously stored Azure Blob storage backup folder */
    selectiveKeyRestoreOperation(keyName: string, restoreBlobDetails: SelectiveKeyRestoreOperationParameters, options?: SelectiveKeyRestoreOperationOptionalParams): PollerLike<OperationState<SelectiveKeyRestoreOperation>, SelectiveKeyRestoreOperation>;
    /** Returns the status of the selective key restore operation */
    selectiveKeyRestoreStatus(jobId: string, options?: SelectiveKeyRestoreStatusOptionalParams): Promise<SelectiveKeyRestoreOperation>;
    /** Restores all key materials using the SAS token pointing to a previously stored Azure Blob storage backup folder */
    fullRestoreOperation(restoreBlobDetails: RestoreOperationParameters, options?: FullRestoreOperationOptionalParams): PollerLike<OperationState<RestoreOperation>, RestoreOperation>;
    /** Pre-restore operation for checking whether the customer can perform a full restore operation. */
    preFullRestoreOperation(preRestoreOperationParameters: PreRestoreOperationParameters, options?: PreFullRestoreOperationOptionalParams): PollerLike<OperationState<RestoreOperation>, RestoreOperation>;
    /** Returns the status of restore operation */
    restoreStatus(jobId: string, options?: RestoreStatusOptionalParams): Promise<RestoreOperation>;
    /** Pre-backup operation for checking whether the customer can perform a full backup operation. */
    preFullBackup(preBackupOperationParameters: PreBackupOperationParameters, options?: PreFullBackupOptionalParams): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation>;
    /** Creates a full backup using a user-provided SAS token to an Azure blob storage container. */
    fullBackup(azureStorageBlobContainerUri: SASTokenParameter, options?: FullBackupOptionalParams): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation>;
    /** Returns the status of full backup operation */
    fullBackupStatus(jobId: string, options?: FullBackupStatusOptionalParams): Promise<FullBackupOperation>;
}
//# sourceMappingURL=keyVaultClient.d.ts.map