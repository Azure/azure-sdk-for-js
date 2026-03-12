// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createKeyVault, KeyVaultContext, KeyVaultClientOptionalParams } from "./api/index.js";
import {
  FullBackupOperation,
  SASTokenParameter,
  PreBackupOperationParameters,
  RestoreOperation,
  RestoreOperationParameters,
  PreRestoreOperationParameters,
  SelectiveKeyRestoreOperation,
  SelectiveKeyRestoreOperationParameters,
  UpdateSettingRequest,
  Setting,
  SettingsListResult,
} from "./models/models.js";
import {
  GetSettingsOptionalParams,
  GetSettingOptionalParams,
  UpdateSettingOptionalParams,
  SelectiveKeyRestoreOperationOptionalParams,
  SelectiveKeyRestoreStatusOptionalParams,
  PreFullRestoreOperationOptionalParams,
  FullRestoreOperationOptionalParams,
  RestoreStatusOptionalParams,
  PreFullBackupOptionalParams,
  FullBackupOptionalParams,
  FullBackupStatusOptionalParams,
} from "./api/options.js";
import {
  getSettings,
  getSetting,
  updateSetting,
  selectiveKeyRestoreOperation,
  selectiveKeyRestoreStatus,
  preFullRestoreOperation,
  fullRestoreOperation,
  restoreStatus,
  preFullBackup,
  fullBackup,
  fullBackupStatus,
} from "./api/operations.js";
import {
  RoleAssignmentsOperations,
  _getRoleAssignmentsOperations,
} from "./classic/roleAssignments/index.js";
import {
  RoleDefinitionsOperations,
  _getRoleDefinitionsOperations,
} from "./classic/roleDefinitions/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";

export { KeyVaultClientOptionalParams } from "./api/keyVaultContext.js";

export class KeyVaultClient {
  private _client: KeyVaultContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: KeyVaultClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createKeyVault(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.roleAssignments = _getRoleAssignmentsOperations(this._client);
    this.roleDefinitions = _getRoleDefinitionsOperations(this._client);
  }

  /** Retrieves a list of all the available account settings that can be configured. */
  getSettings(
    options: GetSettingsOptionalParams = { requestOptions: {} },
  ): Promise<SettingsListResult> {
    return getSettings(this._client, options);
  }

  /** Retrieves the setting object of a specified setting name. */
  getSetting(
    settingName: string,
    options: GetSettingOptionalParams = { requestOptions: {} },
  ): Promise<Setting> {
    return getSetting(this._client, settingName, options);
  }

  /** Description of the pool setting to be updated */
  updateSetting(
    settingName: string,
    parameters: UpdateSettingRequest,
    options: UpdateSettingOptionalParams = { requestOptions: {} },
  ): Promise<Setting> {
    return updateSetting(this._client, settingName, parameters, options);
  }

  /** Restores all key versions of a given key using user supplied SAS token pointing to a previously stored Azure Blob storage backup folder */
  selectiveKeyRestoreOperation(
    keyName: string,
    restoreBlobDetails: SelectiveKeyRestoreOperationParameters,
    options: SelectiveKeyRestoreOperationOptionalParams = {
      requestOptions: {},
    },
  ): PollerLike<OperationState<SelectiveKeyRestoreOperation>, SelectiveKeyRestoreOperation> {
    return selectiveKeyRestoreOperation(this._client, keyName, restoreBlobDetails, options);
  }

  /** Returns the status of the selective key restore operation */
  selectiveKeyRestoreStatus(
    jobId: string,
    options: SelectiveKeyRestoreStatusOptionalParams = { requestOptions: {} },
  ): Promise<SelectiveKeyRestoreOperation> {
    return selectiveKeyRestoreStatus(this._client, jobId, options);
  }

  /** Pre-restore operation for checking whether the customer can perform a full restore operation. */
  preFullRestoreOperation(
    preRestoreOperationParameters: PreRestoreOperationParameters,
    options: PreFullRestoreOperationOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<RestoreOperation>, RestoreOperation> {
    return preFullRestoreOperation(this._client, preRestoreOperationParameters, options);
  }

  /** Restores all key materials using the SAS token pointing to a previously stored Azure Blob storage backup folder */
  fullRestoreOperation(
    restoreBlobDetails: RestoreOperationParameters,
    options: FullRestoreOperationOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<RestoreOperation>, RestoreOperation> {
    return fullRestoreOperation(this._client, restoreBlobDetails, options);
  }

  /** Returns the status of restore operation */
  restoreStatus(
    jobId: string,
    options: RestoreStatusOptionalParams = { requestOptions: {} },
  ): Promise<RestoreOperation> {
    return restoreStatus(this._client, jobId, options);
  }

  /** Pre-backup operation for checking whether the customer can perform a full backup operation. */
  preFullBackup(
    preBackupOperationParameters: PreBackupOperationParameters,
    options: PreFullBackupOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation> {
    return preFullBackup(this._client, preBackupOperationParameters, options);
  }

  /** Creates a full backup using a user-provided SAS token to an Azure blob storage container. */
  fullBackup(
    azureStorageBlobContainerUri: SASTokenParameter,
    options: FullBackupOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation> {
    return fullBackup(this._client, azureStorageBlobContainerUri, options);
  }

  /** Returns the status of full backup operation */
  fullBackupStatus(
    jobId: string,
    options: FullBackupStatusOptionalParams = { requestOptions: {} },
  ): Promise<FullBackupOperation> {
    return fullBackupStatus(this._client, jobId, options);
  }

  /** The operation groups for roleAssignments */
  public readonly roleAssignments: RoleAssignmentsOperations;
  /** The operation groups for roleDefinitions */
  public readonly roleDefinitions: RoleDefinitionsOperations;
}
