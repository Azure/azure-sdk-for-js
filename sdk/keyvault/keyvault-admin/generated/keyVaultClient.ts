// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultContext, KeyVaultClientOptionalParams, createKeyVault } from "./api/index.js";
import {
  listEkmPrivateEndpoints,
  getEkmPrivateEndpoint,
  deleteEkmPrivateEndpoint,
  createEkmPrivateEndpoint,
  getEkmPrivateEndpointOperationStatus,
  deleteEkmConnection,
  updateEkmConnection,
  createEkmConnection,
  checkEkmConnection,
  getEkmCertificate,
  getEkmConnection,
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
  ListEkmPrivateEndpointsOptionalParams,
  GetEkmPrivateEndpointOptionalParams,
  DeleteEkmPrivateEndpointOptionalParams,
  CreateEkmPrivateEndpointOptionalParams,
  GetEkmPrivateEndpointOperationStatusOptionalParams,
  DeleteEkmConnectionOptionalParams,
  UpdateEkmConnectionOptionalParams,
  CreateEkmConnectionOptionalParams,
  CheckEkmConnectionOptionalParams,
  GetEkmCertificateOptionalParams,
  GetEkmConnectionOptionalParams,
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
  RoleAssignmentsOperations,
  _getRoleAssignmentsOperations,
} from "./classic/roleAssignments/index.js";
import {
  RoleDefinitionsOperations,
  _getRoleDefinitionsOperations,
} from "./classic/roleDefinitions/index.js";
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
  EkmConnection,
  EkmProxyClientCertificateInfo,
  EkmProxyInfo,
  EkmPrivateEndpointOperation,
  EkmPrivateEndpointCreateParameters,
  EkmPrivateEndpoint,
  EkmPrivateEndpointListResult,
} from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { KeyVaultClientOptionalParams } from "./api/keyVaultContext.js";

export class KeyVaultClient {
  private _client: KeyVaultContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /**
   * The Azure Key Vault Administration service client performs administrative operations
   * including RBAC, BackupRestore, and settings management
   * against the Azure Key Vault service.
   */
  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: KeyVaultClientOptionalParams = {},
  ) {
    this._client = createKeyVault(endpointParam, credential, options);
    this.pipeline = this._client.pipeline;
    this.roleAssignments = _getRoleAssignmentsOperations(this._client);
    this.roleDefinitions = _getRoleDefinitionsOperations(this._client);
  }

  /** The External Key Manager (EKM) lists all EKM proxy private endpoints on the pool. This operation requires ekm/read permission. */
  listEkmPrivateEndpoints(
    options: ListEkmPrivateEndpointsOptionalParams = { requestOptions: {} },
  ): Promise<EkmPrivateEndpointListResult> {
    return listEkmPrivateEndpoints(this._client, options);
  }

  /** The External Key Manager (EKM) gets an existing EKM proxy private endpoint. This operation requires ekm/read permission. */
  getEkmPrivateEndpoint(
    peName: string,
    options: GetEkmPrivateEndpointOptionalParams = { requestOptions: {} },
  ): Promise<EkmPrivateEndpoint> {
    return getEkmPrivateEndpoint(this._client, peName, options);
  }

  /** The External Key Manager (EKM) deletes an existing EKM proxy private endpoint. The operation is rejected while an EKM connection still references the private endpoint. This operation requires ekm/write permission. */
  deleteEkmPrivateEndpoint(
    peName: string,
    options: DeleteEkmPrivateEndpointOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<EkmPrivateEndpointOperation>, EkmPrivateEndpointOperation> {
    return deleteEkmPrivateEndpoint(this._client, peName, options);
  }

  /** The External Key Manager (EKM) creates a private endpoint to the EKM proxy Private Link Service. A pool may have up to two private endpoints. This operation requires ekm/write permission. */
  createEkmPrivateEndpoint(
    peName: string,
    parameters: EkmPrivateEndpointCreateParameters,
    options: CreateEkmPrivateEndpointOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<EkmPrivateEndpointOperation>, EkmPrivateEndpointOperation> {
    return createEkmPrivateEndpoint(this._client, peName, parameters, options);
  }

  /** The External Key Manager (EKM) private endpoint operation status. Returns the status of a private endpoint create or delete operation. This operation requires ekm/read permission. */
  getEkmPrivateEndpointOperationStatus(
    operationId: string,
    options: GetEkmPrivateEndpointOperationStatusOptionalParams = { requestOptions: {} },
  ): Promise<EkmPrivateEndpointOperation> {
    return getEkmPrivateEndpointOperationStatus(this._client, operationId, options);
  }

  /** The External Key Manager (EKM) deletes the existing EKM connection. If the EKM connection does not already exists, this operation fails. This operation requires ekm/delete permission. */
  deleteEkmConnection(
    options: DeleteEkmConnectionOptionalParams = { requestOptions: {} },
  ): Promise<EkmConnection> {
    return deleteEkmConnection(this._client, options);
  }

  /** The External Key Manager (EKM) updates the existing EKM connection. If the EKM connection does not exist, this operation fails. This operation requires ekm/write permission. */
  updateEkmConnection(
    ekmConnection: EkmConnection,
    options: UpdateEkmConnectionOptionalParams = { requestOptions: {} },
  ): Promise<EkmConnection> {
    return updateEkmConnection(this._client, ekmConnection, options);
  }

  /** The External Key Manager (EKM) sets up the EKM connection. If the EKM connection already exists, this operation fails. This operation requires ekm/write permission. */
  createEkmConnection(
    ekmConnection: EkmConnection,
    options: CreateEkmConnectionOptionalParams = { requestOptions: {} },
  ): Promise<EkmConnection> {
    return createEkmConnection(this._client, ekmConnection, options);
  }

  /** The External Key Manager (EKM) Check operation checks the connectivity and authentication with the EKM proxy. This operation requires ekm/read permission. */
  checkEkmConnection(
    options: CheckEkmConnectionOptionalParams = { requestOptions: {} },
  ): Promise<EkmProxyInfo> {
    return checkEkmConnection(this._client, options);
  }

  /** The External Key Manager (EKM) Certificate Get operation returns Proxy client certificate. This operation requires ekm/read permission. */
  getEkmCertificate(
    options: GetEkmCertificateOptionalParams = { requestOptions: {} },
  ): Promise<EkmProxyClientCertificateInfo> {
    return getEkmCertificate(this._client, options);
  }

  /** The External Key Manager (EKM) Get operation returns EKM connection. This operation requires ekm/read permission. */
  getEkmConnection(
    options: GetEkmConnectionOptionalParams = { requestOptions: {} },
  ): Promise<EkmConnection> {
    return getEkmConnection(this._client, options);
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
    options: SelectiveKeyRestoreOperationOptionalParams = { requestOptions: {} },
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
