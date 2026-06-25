// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DataProtectionContext,
  DataProtectionClientOptionalParams,
  createDataProtection,
} from "./api/index.js";
import {
  BackupInstancesOperations,
  _getBackupInstancesOperations,
} from "./classic/backupInstances/index.js";
import {
  BackupInstancesExtensionRoutingOperations,
  _getBackupInstancesExtensionRoutingOperations,
} from "./classic/backupInstancesExtensionRouting/index.js";
import {
  BackupPoliciesOperations,
  _getBackupPoliciesOperations,
} from "./classic/backupPolicies/index.js";
import {
  BackupVaultOperationResultsOperations,
  _getBackupVaultOperationResultsOperations,
} from "./classic/backupVaultOperationResults/index.js";
import {
  BackupVaultsOperations,
  _getBackupVaultsOperations,
} from "./classic/backupVaults/index.js";
import {
  DataProtectionOperations,
  _getDataProtectionOperations,
} from "./classic/dataProtection/index.js";
import {
  DataProtectionOperationsOperations,
  _getDataProtectionOperationsOperations,
} from "./classic/dataProtectionOperations/index.js";
import {
  DeletedBackupInstancesOperations,
  _getDeletedBackupInstancesOperations,
} from "./classic/deletedBackupInstances/index.js";
import {
  DeletedBackupVaultsOperations,
  _getDeletedBackupVaultsOperations,
} from "./classic/deletedBackupVaults/index.js";
import {
  DppResourceGuardProxyOperations,
  _getDppResourceGuardProxyOperations,
} from "./classic/dppResourceGuardProxy/index.js";
import { ExportJobsOperations, _getExportJobsOperations } from "./classic/exportJobs/index.js";
import {
  ExportJobsOperationResultOperations,
  _getExportJobsOperationResultOperations,
} from "./classic/exportJobsOperationResult/index.js";
import {
  FetchCrossRegionRestoreJobOperations,
  _getFetchCrossRegionRestoreJobOperations,
} from "./classic/fetchCrossRegionRestoreJob/index.js";
import {
  FetchCrossRegionRestoreJobsOperations,
  _getFetchCrossRegionRestoreJobsOperations,
} from "./classic/fetchCrossRegionRestoreJobs/index.js";
import {
  FetchSecondaryRecoveryPointsOperations,
  _getFetchSecondaryRecoveryPointsOperations,
} from "./classic/fetchSecondaryRecoveryPoints/index.js";
import { JobsOperations, _getJobsOperations } from "./classic/jobs/index.js";
import {
  OperationResultOperations,
  _getOperationResultOperations,
} from "./classic/operationResult/index.js";
import {
  OperationStatusOperations,
  _getOperationStatusOperations,
} from "./classic/operationStatus/index.js";
import {
  OperationStatusBackupVaultContextOperations,
  _getOperationStatusBackupVaultContextOperations,
} from "./classic/operationStatusBackupVaultContext/index.js";
import {
  OperationStatusResourceGroupContextOperations,
  _getOperationStatusResourceGroupContextOperations,
} from "./classic/operationStatusResourceGroupContext/index.js";
import {
  RecoveryPointsOperations,
  _getRecoveryPointsOperations,
} from "./classic/recoveryPoints/index.js";
import {
  ResourceGuardsOperations,
  _getResourceGuardsOperations,
} from "./classic/resourceGuards/index.js";
import {
  RestorableTimeRangesOperations,
  _getRestorableTimeRangesOperations,
} from "./classic/restorableTimeRanges/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DataProtectionClientOptionalParams } from "./api/dataProtectionContext.js";

export class DataProtectionClient {
  private _client: DataProtectionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: DataProtectionClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: DataProtectionClientOptionalParams,
  );
  /** Open API 2.0 Specs for Azure Data Protection service */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | DataProtectionClientOptionalParams,
    options?: DataProtectionClientOptionalParams,
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
    this._client = createDataProtection(credential, subscriptionId ?? "", {
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
    this.deletedBackupVaults = _getDeletedBackupVaultsOperations(this._client);
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
  /** The operation groups for deletedBackupVaults */
  public readonly deletedBackupVaults: DeletedBackupVaultsOperations;
  /** The operation groups for backupVaultOperationResults */
  public readonly backupVaultOperationResults: BackupVaultOperationResultsOperations;
  /** The operation groups for backupInstances */
  public readonly backupInstances: BackupInstancesOperations;
  /** The operation groups for dataProtectionOperations */
  public readonly dataProtectionOperations: DataProtectionOperationsOperations;
}
