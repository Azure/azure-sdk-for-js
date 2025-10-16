// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext, DataProtectionClientOptionalParams } from "./api/index.js";
import { createDataProtection } from "./api/index.js";
import type { BackupInstancesOperations } from "./classic/backupInstances/index.js";
import { _getBackupInstancesOperations } from "./classic/backupInstances/index.js";
import type { BackupInstancesExtensionRoutingOperations } from "./classic/backupInstancesExtensionRouting/index.js";
import { _getBackupInstancesExtensionRoutingOperations } from "./classic/backupInstancesExtensionRouting/index.js";
import type { BackupPoliciesOperations } from "./classic/backupPolicies/index.js";
import { _getBackupPoliciesOperations } from "./classic/backupPolicies/index.js";
import type { BackupVaultOperationResultsOperations } from "./classic/backupVaultOperationResults/index.js";
import { _getBackupVaultOperationResultsOperations } from "./classic/backupVaultOperationResults/index.js";
import type { BackupVaultsOperations } from "./classic/backupVaults/index.js";
import { _getBackupVaultsOperations } from "./classic/backupVaults/index.js";
import type { DataProtectionOperations } from "./classic/dataProtection/index.js";
import { _getDataProtectionOperations } from "./classic/dataProtection/index.js";
import type { DataProtectionOperationsOperations } from "./classic/dataProtectionOperations/index.js";
import { _getDataProtectionOperationsOperations } from "./classic/dataProtectionOperations/index.js";
import type { DeletedBackupInstancesOperations } from "./classic/deletedBackupInstances/index.js";
import { _getDeletedBackupInstancesOperations } from "./classic/deletedBackupInstances/index.js";
import type { DppResourceGuardProxyOperations } from "./classic/dppResourceGuardProxy/index.js";
import { _getDppResourceGuardProxyOperations } from "./classic/dppResourceGuardProxy/index.js";
import type { ExportJobsOperations } from "./classic/exportJobs/index.js";
import { _getExportJobsOperations } from "./classic/exportJobs/index.js";
import type { ExportJobsOperationResultOperations } from "./classic/exportJobsOperationResult/index.js";
import { _getExportJobsOperationResultOperations } from "./classic/exportJobsOperationResult/index.js";
import type { FetchCrossRegionRestoreJobOperations } from "./classic/fetchCrossRegionRestoreJob/index.js";
import { _getFetchCrossRegionRestoreJobOperations } from "./classic/fetchCrossRegionRestoreJob/index.js";
import type { FetchCrossRegionRestoreJobsOperations } from "./classic/fetchCrossRegionRestoreJobs/index.js";
import { _getFetchCrossRegionRestoreJobsOperations } from "./classic/fetchCrossRegionRestoreJobs/index.js";
import type { FetchSecondaryRecoveryPointsOperations } from "./classic/fetchSecondaryRecoveryPoints/index.js";
import { _getFetchSecondaryRecoveryPointsOperations } from "./classic/fetchSecondaryRecoveryPoints/index.js";
import type { JobsOperations } from "./classic/jobs/index.js";
import { _getJobsOperations } from "./classic/jobs/index.js";
import type { OperationResultOperations } from "./classic/operationResult/index.js";
import { _getOperationResultOperations } from "./classic/operationResult/index.js";
import type { OperationStatusOperations } from "./classic/operationStatus/index.js";
import { _getOperationStatusOperations } from "./classic/operationStatus/index.js";
import type { OperationStatusBackupVaultContextOperations } from "./classic/operationStatusBackupVaultContext/index.js";
import { _getOperationStatusBackupVaultContextOperations } from "./classic/operationStatusBackupVaultContext/index.js";
import type { OperationStatusResourceGroupContextOperations } from "./classic/operationStatusResourceGroupContext/index.js";
import { _getOperationStatusResourceGroupContextOperations } from "./classic/operationStatusResourceGroupContext/index.js";
import type { RecoveryPointsOperations } from "./classic/recoveryPoints/index.js";
import { _getRecoveryPointsOperations } from "./classic/recoveryPoints/index.js";
import type { ResourceGuardsOperations } from "./classic/resourceGuards/index.js";
import { _getResourceGuardsOperations } from "./classic/resourceGuards/index.js";
import type { RestorableTimeRangesOperations } from "./classic/restorableTimeRanges/index.js";
import { _getRestorableTimeRangesOperations } from "./classic/restorableTimeRanges/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { DataProtectionClientOptionalParams } from "./api/dataProtectionContext.js";

export class DataProtectionClient {
  private _client: DataProtectionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Open API 2.0 Specs for Azure Data Protection service */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DataProtectionClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDataProtection(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.backupInstancesExtensionRouting = _getBackupInstancesExtensionRoutingOperations(
      this._client,
    );
    this.fetchCrossRegionRestoreJobs = _getFetchCrossRegionRestoreJobsOperations(this._client);
    this.fetchCrossRegionRestoreJob = _getFetchCrossRegionRestoreJobOperations(this._client);
    this.fetchSecondaryRecoveryPoints = _getFetchSecondaryRecoveryPointsOperations(this._client);
    this.dataProtection = _getDataProtectionOperations(this._client);
    this.operationStatusResourceGroupContext = _getOperationStatusResourceGroupContextOperations(
      this._client,
    );
    this.operationStatus = _getOperationStatusOperations(this._client);
    this.operationResult = _getOperationResultOperations(this._client);
    this.dppResourceGuardProxy = _getDppResourceGuardProxyOperations(this._client);
    this.deletedBackupInstances = _getDeletedBackupInstancesOperations(this._client);
    this.jobs = _getJobsOperations(this._client);
    this.recoveryPoints = _getRecoveryPointsOperations(this._client);
    this.restorableTimeRanges = _getRestorableTimeRangesOperations(this._client);
    this.backupPolicies = _getBackupPoliciesOperations(this._client);
    this.exportJobsOperationResult = _getExportJobsOperationResultOperations(this._client);
    this.exportJobs = _getExportJobsOperations(this._client);
    this.operationStatusBackupVaultContext = _getOperationStatusBackupVaultContextOperations(
      this._client,
    );
    this.backupVaults = _getBackupVaultsOperations(this._client);
    this.resourceGuards = _getResourceGuardsOperations(this._client);
    this.backupVaultOperationResults = _getBackupVaultOperationResultsOperations(this._client);
    this.backupInstances = _getBackupInstancesOperations(this._client);
    this.dataProtectionOperations = _getDataProtectionOperationsOperations(this._client);
  }

  /** The operation groups for backupInstancesExtensionRouting */
  public readonly backupInstancesExtensionRouting: BackupInstancesExtensionRoutingOperations;
  /** The operation groups for fetchCrossRegionRestoreJobs */
  public readonly fetchCrossRegionRestoreJobs: FetchCrossRegionRestoreJobsOperations;
  /** The operation groups for fetchCrossRegionRestoreJob */
  public readonly fetchCrossRegionRestoreJob: FetchCrossRegionRestoreJobOperations;
  /** The operation groups for fetchSecondaryRecoveryPoints */
  public readonly fetchSecondaryRecoveryPoints: FetchSecondaryRecoveryPointsOperations;
  /** The operation groups for dataProtection */
  public readonly dataProtection: DataProtectionOperations;
  /** The operation groups for operationStatusResourceGroupContext */
  public readonly operationStatusResourceGroupContext: OperationStatusResourceGroupContextOperations;
  /** The operation groups for operationStatus */
  public readonly operationStatus: OperationStatusOperations;
  /** The operation groups for operationResult */
  public readonly operationResult: OperationResultOperations;
  /** The operation groups for dppResourceGuardProxy */
  public readonly dppResourceGuardProxy: DppResourceGuardProxyOperations;
  /** The operation groups for deletedBackupInstances */
  public readonly deletedBackupInstances: DeletedBackupInstancesOperations;
  /** The operation groups for jobs */
  public readonly jobs: JobsOperations;
  /** The operation groups for recoveryPoints */
  public readonly recoveryPoints: RecoveryPointsOperations;
  /** The operation groups for restorableTimeRanges */
  public readonly restorableTimeRanges: RestorableTimeRangesOperations;
  /** The operation groups for backupPolicies */
  public readonly backupPolicies: BackupPoliciesOperations;
  /** The operation groups for exportJobsOperationResult */
  public readonly exportJobsOperationResult: ExportJobsOperationResultOperations;
  /** The operation groups for exportJobs */
  public readonly exportJobs: ExportJobsOperations;
  /** The operation groups for operationStatusBackupVaultContext */
  public readonly operationStatusBackupVaultContext: OperationStatusBackupVaultContextOperations;
  /** The operation groups for backupVaults */
  public readonly backupVaults: BackupVaultsOperations;
  /** The operation groups for resourceGuards */
  public readonly resourceGuards: ResourceGuardsOperations;
  /** The operation groups for backupVaultOperationResults */
  public readonly backupVaultOperationResults: BackupVaultOperationResultsOperations;
  /** The operation groups for backupInstances */
  public readonly backupInstances: BackupInstancesOperations;
  /** The operation groups for dataProtectionOperations */
  public readonly dataProtectionOperations: DataProtectionOperationsOperations;
}
