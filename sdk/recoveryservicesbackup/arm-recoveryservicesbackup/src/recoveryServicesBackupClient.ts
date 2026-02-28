// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RecoveryServicesBackupContext,
  RecoveryServicesBackupClientOptionalParams,
} from "./api/index.js";
import { createRecoveryServicesBackup } from "./api/index.js";
import {
  moveRecoveryPoint,
  getOperationStatus,
  bmsTriggerDataMove,
  bmsPrepareDataMove,
} from "./api/operations.js";
import type {
  MoveRecoveryPointOptionalParams,
  GetOperationStatusOptionalParams,
  BMSTriggerDataMoveOptionalParams,
  BMSPrepareDataMoveOptionalParams,
} from "./api/options.js";
import type { BackupEnginesOperations } from "./classic/backupEngines/index.js";
import { _getBackupEnginesOperations } from "./classic/backupEngines/index.js";
import type { BackupJobsOperations } from "./classic/backupJobs/index.js";
import { _getBackupJobsOperations } from "./classic/backupJobs/index.js";
import type { BackupOperationResultsOperations } from "./classic/backupOperationResults/index.js";
import { _getBackupOperationResultsOperations } from "./classic/backupOperationResults/index.js";
import type { BackupOperationStatusesOperations } from "./classic/backupOperationStatuses/index.js";
import { _getBackupOperationStatusesOperations } from "./classic/backupOperationStatuses/index.js";
import type { BackupPoliciesOperations } from "./classic/backupPolicies/index.js";
import { _getBackupPoliciesOperations } from "./classic/backupPolicies/index.js";
import type { BackupProtectableItemsOperations } from "./classic/backupProtectableItems/index.js";
import { _getBackupProtectableItemsOperations } from "./classic/backupProtectableItems/index.js";
import type { BackupProtectedItemsOperations } from "./classic/backupProtectedItems/index.js";
import { _getBackupProtectedItemsOperations } from "./classic/backupProtectedItems/index.js";
import type { BackupProtectionContainersOperations } from "./classic/backupProtectionContainers/index.js";
import { _getBackupProtectionContainersOperations } from "./classic/backupProtectionContainers/index.js";
import type { BackupProtectionIntentOperations } from "./classic/backupProtectionIntent/index.js";
import { _getBackupProtectionIntentOperations } from "./classic/backupProtectionIntent/index.js";
import type { BackupResourceEncryptionConfigsOperations } from "./classic/backupResourceEncryptionConfigs/index.js";
import { _getBackupResourceEncryptionConfigsOperations } from "./classic/backupResourceEncryptionConfigs/index.js";
import type { BackupResourceStorageConfigsNonCRROperations } from "./classic/backupResourceStorageConfigsNonCRR/index.js";
import { _getBackupResourceStorageConfigsNonCRROperations } from "./classic/backupResourceStorageConfigsNonCRR/index.js";
import type { BackupResourceVaultConfigsOperations } from "./classic/backupResourceVaultConfigs/index.js";
import { _getBackupResourceVaultConfigsOperations } from "./classic/backupResourceVaultConfigs/index.js";
import type { BackupStatusOperations } from "./classic/backupStatus/index.js";
import { _getBackupStatusOperations } from "./classic/backupStatus/index.js";
import type { BackupUsageSummariesOperations } from "./classic/backupUsageSummaries/index.js";
import { _getBackupUsageSummariesOperations } from "./classic/backupUsageSummaries/index.js";
import type { BackupWorkloadItemsOperations } from "./classic/backupWorkloadItems/index.js";
import { _getBackupWorkloadItemsOperations } from "./classic/backupWorkloadItems/index.js";
import type { BackupsOperations } from "./classic/backups/index.js";
import { _getBackupsOperations } from "./classic/backups/index.js";
import type { BMSPrepareDataMoveOperationResultOperations } from "./classic/bmsPrepareDataMoveOperationResult/index.js";
import { _getBMSPrepareDataMoveOperationResultOperations } from "./classic/bmsPrepareDataMoveOperationResult/index.js";
import type { DeletedProtectionContainersOperations } from "./classic/deletedProtectionContainers/index.js";
import { _getDeletedProtectionContainersOperations } from "./classic/deletedProtectionContainers/index.js";
import type { ExportJobsOperationResultsOperations } from "./classic/exportJobsOperationResults/index.js";
import { _getExportJobsOperationResultsOperations } from "./classic/exportJobsOperationResults/index.js";
import type { FeatureSupportOperations } from "./classic/featureSupport/index.js";
import { _getFeatureSupportOperations } from "./classic/featureSupport/index.js";
import type { FetchTieringCostOperations } from "./classic/fetchTieringCost/index.js";
import { _getFetchTieringCostOperations } from "./classic/fetchTieringCost/index.js";
import type { GetTieringCostOperationResultOperations } from "./classic/getTieringCostOperationResult/index.js";
import { _getGetTieringCostOperationResultOperations } from "./classic/getTieringCostOperationResult/index.js";
import type { ItemLevelRecoveryConnectionsOperations } from "./classic/itemLevelRecoveryConnections/index.js";
import { _getItemLevelRecoveryConnectionsOperations } from "./classic/itemLevelRecoveryConnections/index.js";
import type { JobCancellationsOperations } from "./classic/jobCancellations/index.js";
import { _getJobCancellationsOperations } from "./classic/jobCancellations/index.js";
import type { JobDetailsOperations } from "./classic/jobDetails/index.js";
import { _getJobDetailsOperations } from "./classic/jobDetails/index.js";
import type { JobOperationResultsOperations } from "./classic/jobOperationResults/index.js";
import { _getJobOperationResultsOperations } from "./classic/jobOperationResults/index.js";
import type { JobsOperations } from "./classic/jobs/index.js";
import { _getJobsOperations } from "./classic/jobs/index.js";
import type { OperationOperations } from "./classic/operation/index.js";
import { _getOperationOperations } from "./classic/operation/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointOperations } from "./classic/privateEndpoint/index.js";
import { _getPrivateEndpointOperations } from "./classic/privateEndpoint/index.js";
import type { PrivateEndpointConnectionOperations } from "./classic/privateEndpointConnection/index.js";
import { _getPrivateEndpointConnectionOperations } from "./classic/privateEndpointConnection/index.js";
import type { ProtectableContainersOperations } from "./classic/protectableContainers/index.js";
import { _getProtectableContainersOperations } from "./classic/protectableContainers/index.js";
import type { ProtectedItemOperationResultsOperations } from "./classic/protectedItemOperationResults/index.js";
import { _getProtectedItemOperationResultsOperations } from "./classic/protectedItemOperationResults/index.js";
import type { ProtectedItemOperationStatusesOperations } from "./classic/protectedItemOperationStatuses/index.js";
import { _getProtectedItemOperationStatusesOperations } from "./classic/protectedItemOperationStatuses/index.js";
import type { ProtectedItemsOperations } from "./classic/protectedItems/index.js";
import { _getProtectedItemsOperations } from "./classic/protectedItems/index.js";
import type { ProtectionContainerOperationResultsOperations } from "./classic/protectionContainerOperationResults/index.js";
import { _getProtectionContainerOperationResultsOperations } from "./classic/protectionContainerOperationResults/index.js";
import type { ProtectionContainerRefreshOperationResultsOperations } from "./classic/protectionContainerRefreshOperationResults/index.js";
import { _getProtectionContainerRefreshOperationResultsOperations } from "./classic/protectionContainerRefreshOperationResults/index.js";
import type { ProtectionContainersOperations } from "./classic/protectionContainers/index.js";
import { _getProtectionContainersOperations } from "./classic/protectionContainers/index.js";
import type { ProtectionIntentOperations } from "./classic/protectionIntent/index.js";
import { _getProtectionIntentOperations } from "./classic/protectionIntent/index.js";
import type { ProtectionPoliciesOperations } from "./classic/protectionPolicies/index.js";
import { _getProtectionPoliciesOperations } from "./classic/protectionPolicies/index.js";
import type { ProtectionPolicyOperationResultsOperations } from "./classic/protectionPolicyOperationResults/index.js";
import { _getProtectionPolicyOperationResultsOperations } from "./classic/protectionPolicyOperationResults/index.js";
import type { ProtectionPolicyOperationStatusesOperations } from "./classic/protectionPolicyOperationStatuses/index.js";
import { _getProtectionPolicyOperationStatusesOperations } from "./classic/protectionPolicyOperationStatuses/index.js";
import type { RecoveryPointsOperations } from "./classic/recoveryPoints/index.js";
import { _getRecoveryPointsOperations } from "./classic/recoveryPoints/index.js";
import type { RecoveryPointsRecommendedForMoveOperations } from "./classic/recoveryPointsRecommendedForMove/index.js";
import { _getRecoveryPointsRecommendedForMoveOperations } from "./classic/recoveryPointsRecommendedForMove/index.js";
import type { ResourceGuardProxiesOperations } from "./classic/resourceGuardProxies/index.js";
import { _getResourceGuardProxiesOperations } from "./classic/resourceGuardProxies/index.js";
import type { ResourceGuardProxyOperations } from "./classic/resourceGuardProxy/index.js";
import { _getResourceGuardProxyOperations } from "./classic/resourceGuardProxy/index.js";
import type { RestoresOperations } from "./classic/restores/index.js";
import { _getRestoresOperations } from "./classic/restores/index.js";
import type { SecurityPINsOperations } from "./classic/securityPINs/index.js";
import { _getSecurityPINsOperations } from "./classic/securityPINs/index.js";
import type { TieringCostOperationStatusOperations } from "./classic/tieringCostOperationStatus/index.js";
import { _getTieringCostOperationStatusOperations } from "./classic/tieringCostOperationStatus/index.js";
import type { ValidateOperationOperations } from "./classic/validateOperation/index.js";
import { _getValidateOperationOperations } from "./classic/validateOperation/index.js";
import type { ValidateOperationResultsOperations } from "./classic/validateOperationResults/index.js";
import { _getValidateOperationResultsOperations } from "./classic/validateOperationResults/index.js";
import type { ValidateOperationStatusesOperations } from "./classic/validateOperationStatuses/index.js";
import { _getValidateOperationStatusesOperations } from "./classic/validateOperationStatuses/index.js";
import type {
  PrepareDataMoveRequest,
  OkResponse,
  TriggerDataMoveRequest,
  OperationStatus,
  MoveRPAcrossTiersRequest,
} from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { PollerLike, OperationState } from "@azure/core-lro";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { RecoveryServicesBackupClientOptionalParams } from "./api/recoveryServicesBackupContext.js";

export class RecoveryServicesBackupClient {
  private _client: RecoveryServicesBackupContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: RecoveryServicesBackupClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: RecoveryServicesBackupClientOptionalParams,
  );
  /** Open API 2.0 Specs for Azure RecoveryServices Backup service */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | RecoveryServicesBackupClientOptionalParams,
    options?: RecoveryServicesBackupClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createRecoveryServicesBackup(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operation = _getOperationOperations(this._client);
    this.privateEndpoint = _getPrivateEndpointOperations(this._client);
    this.privateEndpointConnection = _getPrivateEndpointConnectionOperations(this._client);
    this.protectionIntent = _getProtectionIntentOperations(this._client);
    this.tieringCostOperationStatus = _getTieringCostOperationStatusOperations(this._client);
    this.getTieringCostOperationResult = _getGetTieringCostOperationResultOperations(this._client);
    this.fetchTieringCost = _getFetchTieringCostOperations(this._client);
    this.securityPINs = _getSecurityPINsOperations(this._client);
    this.deletedProtectionContainers = _getDeletedProtectionContainersOperations(this._client);
    this.backupProtectionContainers = _getBackupProtectionContainersOperations(this._client);
    this.backupProtectableItems = _getBackupProtectableItemsOperations(this._client);
    this.backupOperationStatuses = _getBackupOperationStatusesOperations(this._client);
    this.backupOperationResults = _getBackupOperationResultsOperations(this._client);
    this.protectableContainers = _getProtectableContainersOperations(this._client);
    this.protectionContainerRefreshOperationResults =
      _getProtectionContainerRefreshOperationResultsOperations(this._client);
    this.validateOperationStatuses = _getValidateOperationStatusesOperations(this._client);
    this.validateOperationResults = _getValidateOperationResultsOperations(this._client);
    this.validateOperation = _getValidateOperationOperations(this._client);
    this.backupProtectedItems = _getBackupProtectedItemsOperations(this._client);
    this.jobs = _getJobsOperations(this._client);
    this.backupUsageSummaries = _getBackupUsageSummariesOperations(this._client);
    this.backupProtectionIntent = _getBackupProtectionIntentOperations(this._client);
    this.featureSupport = _getFeatureSupportOperations(this._client);
    this.backupStatus = _getBackupStatusOperations(this._client);
    this.resourceGuardProxies = _getResourceGuardProxiesOperations(this._client);
    this.resourceGuardProxy = _getResourceGuardProxyOperations(this._client);
    this.backupEngines = _getBackupEnginesOperations(this._client);
    this.exportJobsOperationResults = _getExportJobsOperationResultsOperations(this._client);
    this.jobOperationResults = _getJobOperationResultsOperations(this._client);
    this.jobCancellations = _getJobCancellationsOperations(this._client);
    this.backupJobs = _getBackupJobsOperations(this._client);
    this.jobDetails = _getJobDetailsOperations(this._client);
    this.protectionPolicyOperationStatuses = _getProtectionPolicyOperationStatusesOperations(
      this._client,
    );
    this.protectionPolicyOperationResults = _getProtectionPolicyOperationResultsOperations(
      this._client,
    );
    this.backupPolicies = _getBackupPoliciesOperations(this._client);
    this.protectionPolicies = _getProtectionPoliciesOperations(this._client);
    this.itemLevelRecoveryConnections = _getItemLevelRecoveryConnectionsOperations(this._client);
    this.restores = _getRestoresOperations(this._client);
    this.recoveryPoints = _getRecoveryPointsOperations(this._client);
    this.protectionContainerOperationResults = _getProtectionContainerOperationResultsOperations(
      this._client,
    );
    this.backupWorkloadItems = _getBackupWorkloadItemsOperations(this._client);
    this.protectionContainers = _getProtectionContainersOperations(this._client);
    this.protectedItemOperationResults = _getProtectedItemOperationResultsOperations(this._client);
    this.protectedItemOperationStatuses = _getProtectedItemOperationStatusesOperations(
      this._client,
    );
    this.recoveryPointsRecommendedForMove = _getRecoveryPointsRecommendedForMoveOperations(
      this._client,
    );
    this.backups = _getBackupsOperations(this._client);
    this.protectedItems = _getProtectedItemsOperations(this._client);
    this.backupResourceEncryptionConfigs = _getBackupResourceEncryptionConfigsOperations(
      this._client,
    );
    this.backupResourceVaultConfigs = _getBackupResourceVaultConfigsOperations(this._client);
    this.bmsPrepareDataMoveOperationResult = _getBMSPrepareDataMoveOperationResultOperations(
      this._client,
    );
    this.backupResourceStorageConfigsNonCRR = _getBackupResourceStorageConfigsNonCRROperations(
      this._client,
    );
    this.operations = _getOperationsOperations(this._client);
  }

  /** Move recovery point from one datastore to another store. */
  moveRecoveryPoint(
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    recoveryPointId: string,
    parameters: MoveRPAcrossTiersRequest,
    options: MoveRecoveryPointOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<void>, void> {
    return moveRecoveryPoint(
      this._client,
      vaultName,
      resourceGroupName,
      fabricName,
      containerName,
      protectedItemName,
      recoveryPointId,
      parameters,
      options,
    );
  }

  /** Fetches Operation Result for Prepare Data Move */
  getOperationStatus(
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options: GetOperationStatusOptionalParams = { requestOptions: {} },
  ): Promise<OperationStatus> {
    return getOperationStatus(this._client, vaultName, resourceGroupName, operationId, options);
  }

  /** Triggers Data Move Operation on target vault */
  bmsTriggerDataMove(
    vaultName: string,
    resourceGroupName: string,
    parameters: TriggerDataMoveRequest,
    options: BMSTriggerDataMoveOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<OkResponse>, OkResponse> {
    return bmsTriggerDataMove(this._client, vaultName, resourceGroupName, parameters, options);
  }

  /** Prepares source vault for Data Move operation */
  bmsPrepareDataMove(
    vaultName: string,
    resourceGroupName: string,
    parameters: PrepareDataMoveRequest,
    options: BMSPrepareDataMoveOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<OkResponse>, OkResponse> {
    return bmsPrepareDataMove(this._client, vaultName, resourceGroupName, parameters, options);
  }

  /** The operation groups for operation */
  public readonly operation: OperationOperations;
  /** The operation groups for privateEndpoint */
  public readonly privateEndpoint: PrivateEndpointOperations;
  /** The operation groups for privateEndpointConnection */
  public readonly privateEndpointConnection: PrivateEndpointConnectionOperations;
  /** The operation groups for protectionIntent */
  public readonly protectionIntent: ProtectionIntentOperations;
  /** The operation groups for tieringCostOperationStatus */
  public readonly tieringCostOperationStatus: TieringCostOperationStatusOperations;
  /** The operation groups for getTieringCostOperationResult */
  public readonly getTieringCostOperationResult: GetTieringCostOperationResultOperations;
  /** The operation groups for fetchTieringCost */
  public readonly fetchTieringCost: FetchTieringCostOperations;
  /** The operation groups for securityPINs */
  public readonly securityPINs: SecurityPINsOperations;
  /** The operation groups for deletedProtectionContainers */
  public readonly deletedProtectionContainers: DeletedProtectionContainersOperations;
  /** The operation groups for backupProtectionContainers */
  public readonly backupProtectionContainers: BackupProtectionContainersOperations;
  /** The operation groups for backupProtectableItems */
  public readonly backupProtectableItems: BackupProtectableItemsOperations;
  /** The operation groups for backupOperationStatuses */
  public readonly backupOperationStatuses: BackupOperationStatusesOperations;
  /** The operation groups for backupOperationResults */
  public readonly backupOperationResults: BackupOperationResultsOperations;
  /** The operation groups for protectableContainers */
  public readonly protectableContainers: ProtectableContainersOperations;
  /** The operation groups for protectionContainerRefreshOperationResults */
  public readonly protectionContainerRefreshOperationResults: ProtectionContainerRefreshOperationResultsOperations;
  /** The operation groups for validateOperationStatuses */
  public readonly validateOperationStatuses: ValidateOperationStatusesOperations;
  /** The operation groups for validateOperationResults */
  public readonly validateOperationResults: ValidateOperationResultsOperations;
  /** The operation groups for validateOperation */
  public readonly validateOperation: ValidateOperationOperations;
  /** The operation groups for backupProtectedItems */
  public readonly backupProtectedItems: BackupProtectedItemsOperations;
  /** The operation groups for jobs */
  public readonly jobs: JobsOperations;
  /** The operation groups for backupUsageSummaries */
  public readonly backupUsageSummaries: BackupUsageSummariesOperations;
  /** The operation groups for backupProtectionIntent */
  public readonly backupProtectionIntent: BackupProtectionIntentOperations;
  /** The operation groups for featureSupport */
  public readonly featureSupport: FeatureSupportOperations;
  /** The operation groups for backupStatus */
  public readonly backupStatus: BackupStatusOperations;
  /** The operation groups for resourceGuardProxies */
  public readonly resourceGuardProxies: ResourceGuardProxiesOperations;
  /** The operation groups for resourceGuardProxy */
  public readonly resourceGuardProxy: ResourceGuardProxyOperations;
  /** The operation groups for backupEngines */
  public readonly backupEngines: BackupEnginesOperations;
  /** The operation groups for exportJobsOperationResults */
  public readonly exportJobsOperationResults: ExportJobsOperationResultsOperations;
  /** The operation groups for jobOperationResults */
  public readonly jobOperationResults: JobOperationResultsOperations;
  /** The operation groups for jobCancellations */
  public readonly jobCancellations: JobCancellationsOperations;
  /** The operation groups for backupJobs */
  public readonly backupJobs: BackupJobsOperations;
  /** The operation groups for jobDetails */
  public readonly jobDetails: JobDetailsOperations;
  /** The operation groups for protectionPolicyOperationStatuses */
  public readonly protectionPolicyOperationStatuses: ProtectionPolicyOperationStatusesOperations;
  /** The operation groups for protectionPolicyOperationResults */
  public readonly protectionPolicyOperationResults: ProtectionPolicyOperationResultsOperations;
  /** The operation groups for backupPolicies */
  public readonly backupPolicies: BackupPoliciesOperations;
  /** The operation groups for protectionPolicies */
  public readonly protectionPolicies: ProtectionPoliciesOperations;
  /** The operation groups for itemLevelRecoveryConnections */
  public readonly itemLevelRecoveryConnections: ItemLevelRecoveryConnectionsOperations;
  /** The operation groups for restores */
  public readonly restores: RestoresOperations;
  /** The operation groups for recoveryPoints */
  public readonly recoveryPoints: RecoveryPointsOperations;
  /** The operation groups for protectionContainerOperationResults */
  public readonly protectionContainerOperationResults: ProtectionContainerOperationResultsOperations;
  /** The operation groups for backupWorkloadItems */
  public readonly backupWorkloadItems: BackupWorkloadItemsOperations;
  /** The operation groups for protectionContainers */
  public readonly protectionContainers: ProtectionContainersOperations;
  /** The operation groups for protectedItemOperationResults */
  public readonly protectedItemOperationResults: ProtectedItemOperationResultsOperations;
  /** The operation groups for protectedItemOperationStatuses */
  public readonly protectedItemOperationStatuses: ProtectedItemOperationStatusesOperations;
  /** The operation groups for recoveryPointsRecommendedForMove */
  public readonly recoveryPointsRecommendedForMove: RecoveryPointsRecommendedForMoveOperations;
  /** The operation groups for backups */
  public readonly backups: BackupsOperations;
  /** The operation groups for protectedItems */
  public readonly protectedItems: ProtectedItemsOperations;
  /** The operation groups for backupResourceEncryptionConfigs */
  public readonly backupResourceEncryptionConfigs: BackupResourceEncryptionConfigsOperations;
  /** The operation groups for backupResourceVaultConfigs */
  public readonly backupResourceVaultConfigs: BackupResourceVaultConfigsOperations;
  /** The operation groups for bmsPrepareDataMoveOperationResult */
  public readonly bmsPrepareDataMoveOperationResult: BMSPrepareDataMoveOperationResultOperations;
  /** The operation groups for backupResourceStorageConfigsNonCRR */
  public readonly backupResourceStorageConfigsNonCRR: BackupResourceStorageConfigsNonCRROperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
