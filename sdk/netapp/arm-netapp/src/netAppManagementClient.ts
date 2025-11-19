// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createNetAppManagement,
  NetAppManagementContext,
  NetAppManagementClientOptionalParams,
} from "./api/index.js";
import {
  AccountsOperations,
  _getAccountsOperations,
} from "./classic/accounts/index.js";
import {
  ActiveDirectoryConfigsOperations,
  _getActiveDirectoryConfigsOperations,
} from "./classic/activeDirectoryConfigs/index.js";
import {
  BackupPoliciesOperations,
  _getBackupPoliciesOperations,
} from "./classic/backupPolicies/index.js";
import {
  BackupVaultsOperations,
  _getBackupVaultsOperations,
} from "./classic/backupVaults/index.js";
import {
  BackupsOperations,
  _getBackupsOperations,
} from "./classic/backups/index.js";
import {
  BackupsUnderAccountOperations,
  _getBackupsUnderAccountOperations,
} from "./classic/backupsUnderAccount/index.js";
import {
  BackupsUnderBackupVaultOperations,
  _getBackupsUnderBackupVaultOperations,
} from "./classic/backupsUnderBackupVault/index.js";
import {
  BackupsUnderVolumeOperations,
  _getBackupsUnderVolumeOperations,
} from "./classic/backupsUnderVolume/index.js";
import {
  BucketsOperations,
  _getBucketsOperations,
} from "./classic/buckets/index.js";
import {
  CachesOperations,
  _getCachesOperations,
} from "./classic/caches/index.js";
import {
  ElasticAccountsOperations,
  _getElasticAccountsOperations,
} from "./classic/elasticAccounts/index.js";
import {
  ElasticBackupPoliciesOperations,
  _getElasticBackupPoliciesOperations,
} from "./classic/elasticBackupPolicies/index.js";
import {
  ElasticBackupVaultsOperations,
  _getElasticBackupVaultsOperations,
} from "./classic/elasticBackupVaults/index.js";
import {
  ElasticBackupsOperations,
  _getElasticBackupsOperations,
} from "./classic/elasticBackups/index.js";
import {
  ElasticCapacityPoolsOperations,
  _getElasticCapacityPoolsOperations,
} from "./classic/elasticCapacityPools/index.js";
import {
  ElasticSnapshotPoliciesOperations,
  _getElasticSnapshotPoliciesOperations,
} from "./classic/elasticSnapshotPolicies/index.js";
import {
  ElasticSnapshotsOperations,
  _getElasticSnapshotsOperations,
} from "./classic/elasticSnapshots/index.js";
import {
  ElasticVolumesOperations,
  _getElasticVolumesOperations,
} from "./classic/elasticVolumes/index.js";
import {
  NetAppResourceOperations,
  _getNetAppResourceOperations,
} from "./classic/netAppResource/index.js";
import {
  NetAppResourceQuotaLimitsOperations,
  _getNetAppResourceQuotaLimitsOperations,
} from "./classic/netAppResourceQuotaLimits/index.js";
import {
  NetAppResourceQuotaLimitsAccountOperations,
  _getNetAppResourceQuotaLimitsAccountOperations,
} from "./classic/netAppResourceQuotaLimitsAccount/index.js";
import {
  NetAppResourceRegionInfosOperations,
  _getNetAppResourceRegionInfosOperations,
} from "./classic/netAppResourceRegionInfos/index.js";
import {
  NetAppResourceUsagesOperations,
  _getNetAppResourceUsagesOperations,
} from "./classic/netAppResourceUsages/index.js";
import {
  OperationsOperations,
  _getOperationsOperations,
} from "./classic/operations/index.js";
import { PoolsOperations, _getPoolsOperations } from "./classic/pools/index.js";
import {
  RansomwareReportsOperations,
  _getRansomwareReportsOperations,
} from "./classic/ransomwareReports/index.js";
import {
  SnapshotPoliciesOperations,
  _getSnapshotPoliciesOperations,
} from "./classic/snapshotPolicies/index.js";
import {
  SnapshotsOperations,
  _getSnapshotsOperations,
} from "./classic/snapshots/index.js";
import {
  SubvolumesOperations,
  _getSubvolumesOperations,
} from "./classic/subvolumes/index.js";
import {
  VolumeGroupsOperations,
  _getVolumeGroupsOperations,
} from "./classic/volumeGroups/index.js";
import {
  VolumeQuotaRulesOperations,
  _getVolumeQuotaRulesOperations,
} from "./classic/volumeQuotaRules/index.js";
import {
  VolumesOperations,
  _getVolumesOperations,
} from "./classic/volumes/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { NetAppManagementClientOptionalParams } from "./api/netAppManagementContext.js";

export class NetAppManagementClient {
  private _client: NetAppManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft NetApp Files Azure Resource Provider specification */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: NetAppManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createNetAppManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.netAppResourceUsages = _getNetAppResourceUsagesOperations(
      this._client,
    );
    this.netAppResource = _getNetAppResourceOperations(this._client);
    this.subvolumes = _getSubvolumesOperations(this._client);
    this.backupsUnderVolume = _getBackupsUnderVolumeOperations(this._client);
    this.backupsUnderBackupVault = _getBackupsUnderBackupVaultOperations(
      this._client,
    );
    this.pools = _getPoolsOperations(this._client);
    this.backupsUnderAccount = _getBackupsUnderAccountOperations(this._client);
    this.accounts = _getAccountsOperations(this._client);
    this.netAppResourceRegionInfos = _getNetAppResourceRegionInfosOperations(
      this._client,
    );
    this.netAppResourceQuotaLimits = _getNetAppResourceQuotaLimitsOperations(
      this._client,
    );
    this.activeDirectoryConfigs = _getActiveDirectoryConfigsOperations(
      this._client,
    );
    this.elasticBackups = _getElasticBackupsOperations(this._client);
    this.elasticBackupPolicies = _getElasticBackupPoliciesOperations(
      this._client,
    );
    this.elasticBackupVaults = _getElasticBackupVaultsOperations(this._client);
    this.elasticSnapshotPolicies = _getElasticSnapshotPoliciesOperations(
      this._client,
    );
    this.elasticSnapshots = _getElasticSnapshotsOperations(this._client);
    this.elasticVolumes = _getElasticVolumesOperations(this._client);
    this.elasticCapacityPools = _getElasticCapacityPoolsOperations(
      this._client,
    );
    this.elasticAccounts = _getElasticAccountsOperations(this._client);
    this.caches = _getCachesOperations(this._client);
    this.buckets = _getBucketsOperations(this._client);
    this.backupVaults = _getBackupVaultsOperations(this._client);
    this.ransomwareReports = _getRansomwareReportsOperations(this._client);
    this.volumeQuotaRules = _getVolumeQuotaRulesOperations(this._client);
    this.backupPolicies = _getBackupPoliciesOperations(this._client);
    this.snapshotPolicies = _getSnapshotPoliciesOperations(this._client);
    this.snapshots = _getSnapshotsOperations(this._client);
    this.volumes = _getVolumesOperations(this._client);
    this.backups = _getBackupsOperations(this._client);
    this.volumeGroups = _getVolumeGroupsOperations(this._client);
    this.netAppResourceQuotaLimitsAccount =
      _getNetAppResourceQuotaLimitsAccountOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for netAppResourceUsages */
  public readonly netAppResourceUsages: NetAppResourceUsagesOperations;
  /** The operation groups for netAppResource */
  public readonly netAppResource: NetAppResourceOperations;
  /** The operation groups for subvolumes */
  public readonly subvolumes: SubvolumesOperations;
  /** The operation groups for backupsUnderVolume */
  public readonly backupsUnderVolume: BackupsUnderVolumeOperations;
  /** The operation groups for backupsUnderBackupVault */
  public readonly backupsUnderBackupVault: BackupsUnderBackupVaultOperations;
  /** The operation groups for pools */
  public readonly pools: PoolsOperations;
  /** The operation groups for backupsUnderAccount */
  public readonly backupsUnderAccount: BackupsUnderAccountOperations;
  /** The operation groups for accounts */
  public readonly accounts: AccountsOperations;
  /** The operation groups for netAppResourceRegionInfos */
  public readonly netAppResourceRegionInfos: NetAppResourceRegionInfosOperations;
  /** The operation groups for netAppResourceQuotaLimits */
  public readonly netAppResourceQuotaLimits: NetAppResourceQuotaLimitsOperations;
  /** The operation groups for activeDirectoryConfigs */
  public readonly activeDirectoryConfigs: ActiveDirectoryConfigsOperations;
  /** The operation groups for elasticBackups */
  public readonly elasticBackups: ElasticBackupsOperations;
  /** The operation groups for elasticBackupPolicies */
  public readonly elasticBackupPolicies: ElasticBackupPoliciesOperations;
  /** The operation groups for elasticBackupVaults */
  public readonly elasticBackupVaults: ElasticBackupVaultsOperations;
  /** The operation groups for elasticSnapshotPolicies */
  public readonly elasticSnapshotPolicies: ElasticSnapshotPoliciesOperations;
  /** The operation groups for elasticSnapshots */
  public readonly elasticSnapshots: ElasticSnapshotsOperations;
  /** The operation groups for elasticVolumes */
  public readonly elasticVolumes: ElasticVolumesOperations;
  /** The operation groups for elasticCapacityPools */
  public readonly elasticCapacityPools: ElasticCapacityPoolsOperations;
  /** The operation groups for elasticAccounts */
  public readonly elasticAccounts: ElasticAccountsOperations;
  /** The operation groups for caches */
  public readonly caches: CachesOperations;
  /** The operation groups for buckets */
  public readonly buckets: BucketsOperations;
  /** The operation groups for backupVaults */
  public readonly backupVaults: BackupVaultsOperations;
  /** The operation groups for ransomwareReports */
  public readonly ransomwareReports: RansomwareReportsOperations;
  /** The operation groups for volumeQuotaRules */
  public readonly volumeQuotaRules: VolumeQuotaRulesOperations;
  /** The operation groups for backupPolicies */
  public readonly backupPolicies: BackupPoliciesOperations;
  /** The operation groups for snapshotPolicies */
  public readonly snapshotPolicies: SnapshotPoliciesOperations;
  /** The operation groups for snapshots */
  public readonly snapshots: SnapshotsOperations;
  /** The operation groups for volumes */
  public readonly volumes: VolumesOperations;
  /** The operation groups for backups */
  public readonly backups: BackupsOperations;
  /** The operation groups for volumeGroups */
  public readonly volumeGroups: VolumeGroupsOperations;
  /** The operation groups for netAppResourceQuotaLimitsAccount */
  public readonly netAppResourceQuotaLimitsAccount: NetAppResourceQuotaLimitsAccountOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
