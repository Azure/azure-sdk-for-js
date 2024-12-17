// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getRoleAssignmentsOperations,
  RoleAssignmentsOperations,
} from "./classic/roleAssignments/index.js";
import {
  getRoleDefinitionsOperations,
  RoleDefinitionsOperations,
} from "./classic/roleDefinitions/index.js";
import {
  createKeyVault,
  KeyVaultContext,
  KeyVaultClientOptionalParams,
  fullBackupStatus,
  fullBackup,
  preFullBackup,
  restoreStatus,
  preFullRestoreOperation,
  fullRestoreOperation,
  selectiveKeyRestoreOperation,
  updateSetting,
  getSetting,
  getSettings,
  FullBackupStatusOptionalParams,
  FullBackupOptionalParams,
  PreFullBackupOptionalParams,
  RestoreStatusOptionalParams,
  PreFullRestoreOperationOptionalParams,
  FullRestoreOperationOptionalParams,
  SelectiveKeyRestoreOperationOptionalParams,
  UpdateSettingOptionalParams,
  GetSettingOptionalParams,
  GetSettingsOptionalParams,
} from "./api/index.js";
import {
  FullBackupOperation,
  RestoreOperation,
  UpdateSettingRequest,
  Setting,
  SettingsListResult,
} from "./models/models.js";
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
    vaultBaseUrl: string,
    credential: TokenCredential,
    options: KeyVaultClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createKeyVault(vaultBaseUrl, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.roleAssignments = getRoleAssignmentsOperations(this._client);
    this.roleDefinitions = getRoleDefinitionsOperations(this._client);
  }

  /** Returns the status of full backup operation */
  fullBackupStatus(
    jobId: string,
    options: FullBackupStatusOptionalParams = { requestOptions: {} },
  ): Promise<FullBackupOperation> {
    return fullBackupStatus(this._client, jobId, options);
  }

  /** Creates a full backup using a user-provided SAS token to an Azure blob storage container. */
  fullBackup(
    options: FullBackupOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation> {
    return fullBackup(this._client, options);
  }

  /** Pre-backup operation for checking whether the customer can perform a full backup operation. */
  preFullBackup(
    options: PreFullBackupOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<FullBackupOperation>, FullBackupOperation> {
    return preFullBackup(this._client, options);
  }

  /** Returns the status of restore operation */
  restoreStatus(
    jobId: string,
    options: RestoreStatusOptionalParams = { requestOptions: {} },
  ): Promise<RestoreOperation> {
    return restoreStatus(this._client, jobId, options);
  }

  /** Pre-restore operation for checking whether the customer can perform a full restore operation. */
  preFullRestoreOperation(
    options: PreFullRestoreOperationOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<RestoreOperation>, RestoreOperation> {
    return preFullRestoreOperation(this._client, options);
  }

  /** Restores all key materials using the SAS token pointing to a previously stored Azure Blob storage backup folder */
  fullRestoreOperation(
    options: FullRestoreOperationOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<RestoreOperation>, RestoreOperation> {
    return fullRestoreOperation(this._client, options);
  }

  /** Restores all key versions of a given key using user supplied SAS token pointing to a previously stored Azure Blob storage backup folder */
  selectiveKeyRestoreOperation(
    keyName: string,
    options: SelectiveKeyRestoreOperationOptionalParams = {
      requestOptions: {},
    },
  ): PollerLike<OperationState<RestoreOperation>, RestoreOperation> {
    return selectiveKeyRestoreOperation(this._client, keyName, options);
  }

  /** Description of the pool setting to be updated */
  updateSetting(
    settingName: string,
    parameters: UpdateSettingRequest,
    options: UpdateSettingOptionalParams = { requestOptions: {} },
  ): Promise<Setting> {
    return updateSetting(this._client, settingName, parameters, options);
  }

  /** Retrieves the setting object of a specified setting name. */
  getSetting(
    settingName: string,
    options: GetSettingOptionalParams = { requestOptions: {} },
  ): Promise<Setting> {
    return getSetting(this._client, settingName, options);
  }

  /** Retrieves a list of all the available account settings that can be configured. */
  getSettings(
    options: GetSettingsOptionalParams = { requestOptions: {} },
  ): Promise<SettingsListResult> {
    return getSettings(this._client, options);
  }

  /** The operation groups for RoleAssignments */
  public readonly roleAssignments: RoleAssignmentsOperations;
  /** The operation groups for RoleDefinitions */
  public readonly roleDefinitions: RoleDefinitionsOperations;
}
