import { KeyVaultContext as Client, FullBackupOptionalParams, FullBackupStatusOptionalParams, FullRestoreOperationOptionalParams, GetSettingOptionalParams, GetSettingsOptionalParams, PreFullBackupOptionalParams, PreFullRestoreOperationOptionalParams, RestoreStatusOptionalParams, SelectiveKeyRestoreOperationOptionalParams, SelectiveKeyRestoreStatusOptionalParams, UpdateSettingOptionalParams } from "./index.js";
import { FullBackupOperation, SASTokenParameter, PreBackupOperationParameters, RestoreOperation, PreRestoreOperationParameters, RestoreOperationParameters, SelectiveKeyRestoreOperation, SelectiveKeyRestoreOperationParameters, UpdateSettingRequest, Setting, SettingsListResult } from "../models/models.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";
export declare function _getSettingsSend(context: Client, options?: GetSettingsOptionalParams): StreamableMethod;
export declare function _getSettingsDeserialize(result: PathUncheckedResponse): Promise<SettingsListResult>;
/** Retrieves a list of all the available account settings that can be configured. */
export declare function getSettings(context: Client, options?: GetSettingsOptionalParams): Promise<SettingsListResult>;
export declare function _getSettingSend(context: Client, settingName: string, options?: GetSettingOptionalParams): StreamableMethod;
export declare function _getSettingDeserialize(result: PathUncheckedResponse): Promise<Setting>;
/** Retrieves the setting object of a specified setting name. */
export declare function getSetting(context: Client, settingName: string, options?: GetSettingOptionalParams): Promise<Setting>;
export declare function _updateSettingSend(context: Client, settingName: string, parameters: UpdateSettingRequest, options?: UpdateSettingOptionalParams): StreamableMethod;
export declare function _updateSettingDeserialize(result: PathUncheckedResponse): Promise<Setting>;
/** Description of the pool setting to be updated */
export declare function updateSetting(context: Client, settingName: string, parameters: UpdateSettingRequest, options?: UpdateSettingOptionalParams): Promise<Setting>;
export declare function _selectiveKeyRestoreOperationSend(context: Client, keyName: string, restoreBlobDetails: SelectiveKeyRestoreOperationParameters, options?: SelectiveKeyRestoreOperationOptionalParams): StreamableMethod;
export declare function _selectiveKeyRestoreOperationDeserialize(result: PathUncheckedResponse): Promise<SelectiveKeyRestoreOperation>;
/** Restores all key versions of a given key using user supplied SAS token pointing to a previously stored Azure Blob storage backup folder */
export declare function selectiveKeyRestoreOperation(context: Client, keyName: string, restoreBlobDetails: SelectiveKeyRestoreOperationParameters, options?: SelectiveKeyRestoreOperationOptionalParams): PollerLike<OperationState<SelectiveKeyRestoreOperation>, SelectiveKeyRestoreOperation>;
export declare function _selectiveKeyRestoreStatusSend(context: Client, jobId: string, options?: SelectiveKeyRestoreStatusOptionalParams): StreamableMethod;
export declare function _selectiveKeyRestoreStatusDeserialize(result: PathUncheckedResponse): Promise<SelectiveKeyRestoreOperation>;
/** Returns the status of the selective key restore operation */
export declare function selectiveKeyRestoreStatus(context: Client, jobId: string, options?: SelectiveKeyRestoreStatusOptionalParams): Promise<SelectiveKeyRestoreOperation>;
export declare function _fullRestoreOperationSend(context: Client, restoreBlobDetails: RestoreOperationParameters, options?: FullRestoreOperationOptionalParams): StreamableMethod;
export declare function _fullRestoreOperationDeserialize(result: PathUncheckedResponse): Promise<RestoreOperation>;
/** Restores all key materials using the SAS token pointing to a previously stored Azure Blob storage backup folder */
export declare function fullRestoreOperation(context: Client, restoreBlobDetails: RestoreOperationParameters, options?: FullRestoreOperationOptionalParams): PollerLike<OperationState<RestoreOperation>, RestoreOperation>;
export declare function _preFullRestoreOperationSend(context: Client, preRestoreOperationParameters: PreRestoreOperationParameters, options?: PreFullRestoreOperationOptionalParams): StreamableMethod;
export declare function _preFullRestoreOperationDeserialize(result: PathUncheckedResponse): Promise<RestoreOperation>;
/** Pre-restore operation for checking whether the customer can perform a full restore operation. */
export declare function preFullRestoreOperation(context: Client, preRestoreOperationParameters: PreRestoreOperationParameters, options?: PreFullRestoreOperationOptionalParams): PollerLike<OperationState<RestoreOperation>, RestoreOperation>;
export declare function _restoreStatusSend(context: Client, jobId: string, options?: RestoreStatusOptionalParams): StreamableMethod;
export declare function _restoreStatusDeserialize(result: PathUncheckedResponse): Promise<RestoreOperation>;
/** Returns the status of restore operation */
export declare function restoreStatus(context: Client, jobId: string, options?: RestoreStatusOptionalParams): Promise<RestoreOperation>;
export declare function _preFullBackupSend(context: Client, preBackupOperationParameters: PreBackupOperationParameters, options?: PreFullBackupOptionalParams): StreamableMethod;
export declare function _preFullBackupDeserialize(result: PathUncheckedResponse): Promise<FullBackupOperation>;
/** Pre-backup operation for checking whether the customer can perform a full backup operation. */
export declare function preFullBackup(context: Client, preBackupOperationParameters: PreBackupOperationParameters, options?: PreFullBackupOptionalParams): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation>;
export declare function _fullBackupSend(context: Client, azureStorageBlobContainerUri: SASTokenParameter, options?: FullBackupOptionalParams): StreamableMethod;
export declare function _fullBackupDeserialize(result: PathUncheckedResponse): Promise<FullBackupOperation>;
/** Creates a full backup using a user-provided SAS token to an Azure blob storage container. */
export declare function fullBackup(context: Client, azureStorageBlobContainerUri: SASTokenParameter, options?: FullBackupOptionalParams): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation>;
export declare function _fullBackupStatusSend(context: Client, jobId: string, options?: FullBackupStatusOptionalParams): StreamableMethod;
export declare function _fullBackupStatusDeserialize(result: PathUncheckedResponse): Promise<FullBackupOperation>;
/** Returns the status of full backup operation */
export declare function fullBackupStatus(context: Client, jobId: string, options?: FullBackupStatusOptionalParams): Promise<FullBackupOperation>;
//# sourceMappingURL=operations.d.ts.map