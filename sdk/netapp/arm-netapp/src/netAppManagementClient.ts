// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext, NetAppManagementClientOptionalParams } from "./api/index.js";
import { createNetAppManagement } from "./api/index.js";
import type { AccountsOperations } from "./classic/accounts/index.js";
import { _getAccountsOperations } from "./classic/accounts/index.js";
import type { BackupPoliciesOperations } from "./classic/backupPolicies/index.js";
import { _getBackupPoliciesOperations } from "./classic/backupPolicies/index.js";
import type { BackupVaultsOperations } from "./classic/backupVaults/index.js";
import { _getBackupVaultsOperations } from "./classic/backupVaults/index.js";
import type { BackupsOperations } from "./classic/backups/index.js";
import { _getBackupsOperations } from "./classic/backups/index.js";
import type { BackupsUnderAccountOperations } from "./classic/backupsUnderAccount/index.js";
import { _getBackupsUnderAccountOperations } from "./classic/backupsUnderAccount/index.js";
import type { BackupsUnderBackupVaultOperations } from "./classic/backupsUnderBackupVault/index.js";
import { _getBackupsUnderBackupVaultOperations } from "./classic/backupsUnderBackupVault/index.js";
import type { BackupsUnderVolumeOperations } from "./classic/backupsUnderVolume/index.js";
import { _getBackupsUnderVolumeOperations } from "./classic/backupsUnderVolume/index.js";
import type { BucketsOperations } from "./classic/buckets/index.js";
import { _getBucketsOperations } from "./classic/buckets/index.js";
import type { NetAppResourceOperations } from "./classic/netAppResource/index.js";
import { _getNetAppResourceOperations } from "./classic/netAppResource/index.js";
import type { NetAppResourceQuotaLimitsOperations } from "./classic/netAppResourceQuotaLimits/index.js";
import { _getNetAppResourceQuotaLimitsOperations } from "./classic/netAppResourceQuotaLimits/index.js";
import type { NetAppResourceQuotaLimitsAccountOperations } from "./classic/netAppResourceQuotaLimitsAccount/index.js";
import { _getNetAppResourceQuotaLimitsAccountOperations } from "./classic/netAppResourceQuotaLimitsAccount/index.js";
import type { NetAppResourceRegionInfosOperations } from "./classic/netAppResourceRegionInfos/index.js";
import { _getNetAppResourceRegionInfosOperations } from "./classic/netAppResourceRegionInfos/index.js";
import type { NetAppResourceUsagesOperations } from "./classic/netAppResourceUsages/index.js";
import { _getNetAppResourceUsagesOperations } from "./classic/netAppResourceUsages/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PoolsOperations } from "./classic/pools/index.js";
import { _getPoolsOperations } from "./classic/pools/index.js";
import type { SnapshotPoliciesOperations } from "./classic/snapshotPolicies/index.js";
import { _getSnapshotPoliciesOperations } from "./classic/snapshotPolicies/index.js";
import type { SnapshotsOperations } from "./classic/snapshots/index.js";
import { _getSnapshotsOperations } from "./classic/snapshots/index.js";
import type { SubvolumesOperations } from "./classic/subvolumes/index.js";
import { _getSubvolumesOperations } from "./classic/subvolumes/index.js";
import type { VolumeGroupsOperations } from "./classic/volumeGroups/index.js";
import { _getVolumeGroupsOperations } from "./classic/volumeGroups/index.js";
import type { VolumeQuotaRulesOperations } from "./classic/volumeQuotaRules/index.js";
import { _getVolumeQuotaRulesOperations } from "./classic/volumeQuotaRules/index.js";
import type { VolumesOperations } from "./classic/volumes/index.js";
import { _getVolumesOperations } from "./classic/volumes/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
    this.netAppResourceUsages = _getNetAppResourceUsagesOperations(this._client);
    this.netAppResource = _getNetAppResourceOperations(this._client);
    this.subvolumes = _getSubvolumesOperations(this._client);
    this.backupsUnderVolume = _getBackupsUnderVolumeOperations(this._client);
    this.backupsUnderBackupVault = _getBackupsUnderBackupVaultOperations(this._client);
    this.pools = _getPoolsOperations(this._client);
    this.backupsUnderAccount = _getBackupsUnderAccountOperations(this._client);
    this.accounts = _getAccountsOperations(this._client);
    this.netAppResourceRegionInfos = _getNetAppResourceRegionInfosOperations(this._client);
    this.netAppResourceQuotaLimits = _getNetAppResourceQuotaLimitsOperations(this._client);
    this.buckets = _getBucketsOperations(this._client);
    this.backupVaults = _getBackupVaultsOperations(this._client);
    this.volumeQuotaRules = _getVolumeQuotaRulesOperations(this._client);
    this.backupPolicies = _getBackupPoliciesOperations(this._client);
    this.snapshotPolicies = _getSnapshotPoliciesOperations(this._client);
    this.snapshots = _getSnapshotsOperations(this._client);
    this.volumes = _getVolumesOperations(this._client);
    this.backups = _getBackupsOperations(this._client);
    this.volumeGroups = _getVolumeGroupsOperations(this._client);
    this.netAppResourceQuotaLimitsAccount = _getNetAppResourceQuotaLimitsAccountOperations(
      this._client,
    );
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
  /** The operation groups for buckets */
  public readonly buckets: BucketsOperations;
  /** The operation groups for backupVaults */
  public readonly backupVaults: BackupVaultsOperations;
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
