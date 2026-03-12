// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  list,
  reinstallMobilityService,
  updateMobilityService,
  updateAppliance,
  unplannedFailover,
  testFailoverCleanup,
  testFailover,
  switchProvider,
  resolveHealthErrors,
  reprotect,
  repairReplication,
  removeDisks,
  $delete,
  plannedFailover,
  failoverCommit,
  failoverCancel,
  applyRecoveryPoint,
  addDisks,
  listByReplicationProtectionContainers,
  purge,
  update,
  create,
  get,
} from "../../api/replicationProtectedItems/operations.js";
import type {
  ReplicationProtectedItemsListOptionalParams,
  ReplicationProtectedItemsReinstallMobilityServiceOptionalParams,
  ReplicationProtectedItemsUpdateMobilityServiceOptionalParams,
  ReplicationProtectedItemsUpdateApplianceOptionalParams,
  ReplicationProtectedItemsUnplannedFailoverOptionalParams,
  ReplicationProtectedItemsTestFailoverCleanupOptionalParams,
  ReplicationProtectedItemsTestFailoverOptionalParams,
  ReplicationProtectedItemsSwitchProviderOptionalParams,
  ReplicationProtectedItemsResolveHealthErrorsOptionalParams,
  ReplicationProtectedItemsReprotectOptionalParams,
  ReplicationProtectedItemsRepairReplicationOptionalParams,
  ReplicationProtectedItemsRemoveDisksOptionalParams,
  ReplicationProtectedItemsDeleteOptionalParams,
  ReplicationProtectedItemsPlannedFailoverOptionalParams,
  ReplicationProtectedItemsFailoverCommitOptionalParams,
  ReplicationProtectedItemsFailoverCancelOptionalParams,
  ReplicationProtectedItemsApplyRecoveryPointOptionalParams,
  ReplicationProtectedItemsAddDisksOptionalParams,
  ReplicationProtectedItemsListByReplicationProtectionContainersOptionalParams,
  ReplicationProtectedItemsPurgeOptionalParams,
  ReplicationProtectedItemsUpdateOptionalParams,
  ReplicationProtectedItemsCreateOptionalParams,
  ReplicationProtectedItemsGetOptionalParams,
} from "../../api/replicationProtectedItems/options.js";
import type {
  ReplicationProtectedItem,
  EnableProtectionInput,
  UpdateReplicationProtectedItemInput,
  AddDisksInput,
  ApplyRecoveryPointInput,
  PlannedFailoverInput,
  DisableProtectionInput,
  RemoveDisksInput,
  ReverseReplicationInput,
  ResolveHealthInput,
  SwitchProviderInput,
  TestFailoverInput,
  TestFailoverCleanupInput,
  UnplannedFailoverInput,
  UpdateApplianceForReplicationProtectedItemInput,
  UpdateMobilityServiceRequest,
  ReinstallMobilityServiceRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationProtectedItems operations. */
export interface ReplicationProtectedItemsOperations {
  /** Gets the list of ASR replication protected items in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationProtectedItemsListOptionalParams,
  ) => PagedAsyncIterableIterator<ReplicationProtectedItem>;
  /** The operation to reinstall the installed mobility service software on a replication protected item to the latest available version. */
  reinstallMobilityService: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    updateMobilityServiceRequest: ReinstallMobilityServiceRequest,
    options?: ReplicationProtectedItemsReinstallMobilityServiceOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use reinstallMobilityService instead */
  beginReinstallMobilityService: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    updateMobilityServiceRequest: ReinstallMobilityServiceRequest,
    options?: ReplicationProtectedItemsReinstallMobilityServiceOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use reinstallMobilityService instead */
  beginReinstallMobilityServiceAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    updateMobilityServiceRequest: ReinstallMobilityServiceRequest,
    options?: ReplicationProtectedItemsReinstallMobilityServiceOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** The operation to update(push update) the installed mobility service software on a replication protected item to the latest available version. */
  updateMobilityService: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    updateMobilityServiceRequest: UpdateMobilityServiceRequest,
    options?: ReplicationProtectedItemsUpdateMobilityServiceOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use updateMobilityService instead */
  beginUpdateMobilityService: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    updateMobilityServiceRequest: UpdateMobilityServiceRequest,
    options?: ReplicationProtectedItemsUpdateMobilityServiceOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use updateMobilityService instead */
  beginUpdateMobilityServiceAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    updateMobilityServiceRequest: UpdateMobilityServiceRequest,
    options?: ReplicationProtectedItemsUpdateMobilityServiceOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** The operation to update appliance of an ASR replication protected item. */
  updateAppliance: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    applianceUpdateInput: UpdateApplianceForReplicationProtectedItemInput,
    options?: ReplicationProtectedItemsUpdateApplianceOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use updateAppliance instead */
  beginUpdateAppliance: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    applianceUpdateInput: UpdateApplianceForReplicationProtectedItemInput,
    options?: ReplicationProtectedItemsUpdateApplianceOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use updateAppliance instead */
  beginUpdateApplianceAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    applianceUpdateInput: UpdateApplianceForReplicationProtectedItemInput,
    options?: ReplicationProtectedItemsUpdateApplianceOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Operation to initiate a failover of the replication protected item. */
  unplannedFailover: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    failoverInput: UnplannedFailoverInput,
    options?: ReplicationProtectedItemsUnplannedFailoverOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use unplannedFailover instead */
  beginUnplannedFailover: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    failoverInput: UnplannedFailoverInput,
    options?: ReplicationProtectedItemsUnplannedFailoverOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use unplannedFailover instead */
  beginUnplannedFailoverAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    failoverInput: UnplannedFailoverInput,
    options?: ReplicationProtectedItemsUnplannedFailoverOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Operation to clean up the test failover of a replication protected item. */
  testFailoverCleanup: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    cleanupInput: TestFailoverCleanupInput,
    options?: ReplicationProtectedItemsTestFailoverCleanupOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use testFailoverCleanup instead */
  beginTestFailoverCleanup: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    cleanupInput: TestFailoverCleanupInput,
    options?: ReplicationProtectedItemsTestFailoverCleanupOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use testFailoverCleanup instead */
  beginTestFailoverCleanupAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    cleanupInput: TestFailoverCleanupInput,
    options?: ReplicationProtectedItemsTestFailoverCleanupOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Operation to perform a test failover of the replication protected item. */
  testFailover: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    testfailoverInput: TestFailoverInput,
    options?: ReplicationProtectedItemsTestFailoverOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use testFailover instead */
  beginTestFailover: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    testfailoverInput: TestFailoverInput,
    options?: ReplicationProtectedItemsTestFailoverOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use testFailover instead */
  beginTestFailoverAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    testfailoverInput: TestFailoverInput,
    options?: ReplicationProtectedItemsTestFailoverOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Operation to initiate a switch provider of the replication protected item. */
  switchProvider: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    switchProviderInput: SwitchProviderInput,
    options?: ReplicationProtectedItemsSwitchProviderOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use switchProvider instead */
  beginSwitchProvider: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    switchProviderInput: SwitchProviderInput,
    options?: ReplicationProtectedItemsSwitchProviderOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use switchProvider instead */
  beginSwitchProviderAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    switchProviderInput: SwitchProviderInput,
    options?: ReplicationProtectedItemsSwitchProviderOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Operation to resolve health issues of the replication protected item. */
  resolveHealthErrors: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    resolveHealthInput: ResolveHealthInput,
    options?: ReplicationProtectedItemsResolveHealthErrorsOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use resolveHealthErrors instead */
  beginResolveHealthErrors: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    resolveHealthInput: ResolveHealthInput,
    options?: ReplicationProtectedItemsResolveHealthErrorsOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use resolveHealthErrors instead */
  beginResolveHealthErrorsAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    resolveHealthInput: ResolveHealthInput,
    options?: ReplicationProtectedItemsResolveHealthErrorsOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Operation to reprotect or reverse replicate a failed over replication protected item. */
  reprotect: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    reprotectInput: ReverseReplicationInput,
    options?: ReplicationProtectedItemsReprotectOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use reprotect instead */
  beginReprotect: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    reprotectInput: ReverseReplicationInput,
    options?: ReplicationProtectedItemsReprotectOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use reprotect instead */
  beginReprotectAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    reprotectInput: ReverseReplicationInput,
    options?: ReplicationProtectedItemsReprotectOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** The operation to start resynchronize/repair replication for a replication protected item requiring resynchronization. */
  repairReplication: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsRepairReplicationOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use repairReplication instead */
  beginRepairReplication: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsRepairReplicationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use repairReplication instead */
  beginRepairReplicationAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsRepairReplicationOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Operation to remove disk(s) from the replication protected item. */
  removeDisks: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    removeDisksInput: RemoveDisksInput,
    options?: ReplicationProtectedItemsRemoveDisksOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use removeDisks instead */
  beginRemoveDisks: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    removeDisksInput: RemoveDisksInput,
    options?: ReplicationProtectedItemsRemoveDisksOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use removeDisks instead */
  beginRemoveDisksAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    removeDisksInput: RemoveDisksInput,
    options?: ReplicationProtectedItemsRemoveDisksOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** The operation to disable replication on a replication protected item. This will also remove the item. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    disableProtectionInput: DisableProtectionInput,
    options?: ReplicationProtectedItemsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    disableProtectionInput: DisableProtectionInput,
    options?: ReplicationProtectedItemsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    disableProtectionInput: DisableProtectionInput,
    options?: ReplicationProtectedItemsDeleteOptionalParams,
  ) => Promise<void>;
  /** Operation to initiate a planned failover of the replication protected item. */
  plannedFailover: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    failoverInput: PlannedFailoverInput,
    options?: ReplicationProtectedItemsPlannedFailoverOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use plannedFailover instead */
  beginPlannedFailover: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    failoverInput: PlannedFailoverInput,
    options?: ReplicationProtectedItemsPlannedFailoverOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use plannedFailover instead */
  beginPlannedFailoverAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    failoverInput: PlannedFailoverInput,
    options?: ReplicationProtectedItemsPlannedFailoverOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Operation to commit the failover of the replication protected item. */
  failoverCommit: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsFailoverCommitOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use failoverCommit instead */
  beginFailoverCommit: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsFailoverCommitOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use failoverCommit instead */
  beginFailoverCommitAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsFailoverCommitOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Operation to cancel the failover of the replication protected item. */
  failoverCancel: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsFailoverCancelOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use failoverCancel instead */
  beginFailoverCancel: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsFailoverCancelOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use failoverCancel instead */
  beginFailoverCancelAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsFailoverCancelOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** The operation to change the recovery point of a failed over replication protected item. */
  applyRecoveryPoint: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    applyRecoveryPointInput: ApplyRecoveryPointInput,
    options?: ReplicationProtectedItemsApplyRecoveryPointOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use applyRecoveryPoint instead */
  beginApplyRecoveryPoint: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    applyRecoveryPointInput: ApplyRecoveryPointInput,
    options?: ReplicationProtectedItemsApplyRecoveryPointOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use applyRecoveryPoint instead */
  beginApplyRecoveryPointAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    applyRecoveryPointInput: ApplyRecoveryPointInput,
    options?: ReplicationProtectedItemsApplyRecoveryPointOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Operation to add disks(s) to the replication protected item. */
  addDisks: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    addDisksInput: AddDisksInput,
    options?: ReplicationProtectedItemsAddDisksOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use addDisks instead */
  beginAddDisks: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    addDisksInput: AddDisksInput,
    options?: ReplicationProtectedItemsAddDisksOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use addDisks instead */
  beginAddDisksAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    addDisksInput: AddDisksInput,
    options?: ReplicationProtectedItemsAddDisksOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Gets the list of ASR replication protected items in the protection container. */
  listByReplicationProtectionContainers: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationProtectedItemsListByReplicationProtectionContainersOptionalParams,
  ) => PagedAsyncIterableIterator<ReplicationProtectedItem>;
  /** The operation to delete or purge a replication protected item. This operation will force delete the replication protected item. Use the remove operation on replication protected item to perform a clean disable replication for the item. */
  purge: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsPurgeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purge instead */
  beginPurge: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsPurgeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purge instead */
  beginPurgeAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsPurgeOptionalParams,
  ) => Promise<void>;
  /** The operation to update the recovery settings of an ASR replication protected item. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    updateProtectionInput: UpdateReplicationProtectedItemInput,
    options?: ReplicationProtectedItemsUpdateOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    updateProtectionInput: UpdateReplicationProtectedItemInput,
    options?: ReplicationProtectedItemsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    updateProtectionInput: UpdateReplicationProtectedItemInput,
    options?: ReplicationProtectedItemsUpdateOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** The operation to create an ASR replication protected item (Enable replication). */
  create: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    input: EnableProtectionInput,
    options?: ReplicationProtectedItemsCreateOptionalParams,
  ) => PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    input: EnableProtectionInput,
    options?: ReplicationProtectedItemsCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    input: EnableProtectionInput,
    options?: ReplicationProtectedItemsCreateOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
  /** Gets the details of an ASR replication protected item. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: ReplicationProtectedItemsGetOptionalParams,
  ) => Promise<ReplicationProtectedItem>;
}

function _getReplicationProtectedItems(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationProtectedItemsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    reinstallMobilityService: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      updateMobilityServiceRequest: ReinstallMobilityServiceRequest,
      options?: ReplicationProtectedItemsReinstallMobilityServiceOptionalParams,
    ) =>
      reinstallMobilityService(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        updateMobilityServiceRequest,
        options,
      ),
    beginReinstallMobilityService: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      updateMobilityServiceRequest: ReinstallMobilityServiceRequest,
      options?: ReplicationProtectedItemsReinstallMobilityServiceOptionalParams,
    ) => {
      const poller = reinstallMobilityService(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        updateMobilityServiceRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReinstallMobilityServiceAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      updateMobilityServiceRequest: ReinstallMobilityServiceRequest,
      options?: ReplicationProtectedItemsReinstallMobilityServiceOptionalParams,
    ) => {
      return await reinstallMobilityService(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        updateMobilityServiceRequest,
        options,
      );
    },
    updateMobilityService: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      updateMobilityServiceRequest: UpdateMobilityServiceRequest,
      options?: ReplicationProtectedItemsUpdateMobilityServiceOptionalParams,
    ) =>
      updateMobilityService(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        updateMobilityServiceRequest,
        options,
      ),
    beginUpdateMobilityService: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      updateMobilityServiceRequest: UpdateMobilityServiceRequest,
      options?: ReplicationProtectedItemsUpdateMobilityServiceOptionalParams,
    ) => {
      const poller = updateMobilityService(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        updateMobilityServiceRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateMobilityServiceAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      updateMobilityServiceRequest: UpdateMobilityServiceRequest,
      options?: ReplicationProtectedItemsUpdateMobilityServiceOptionalParams,
    ) => {
      return await updateMobilityService(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        updateMobilityServiceRequest,
        options,
      );
    },
    updateAppliance: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      applianceUpdateInput: UpdateApplianceForReplicationProtectedItemInput,
      options?: ReplicationProtectedItemsUpdateApplianceOptionalParams,
    ) =>
      updateAppliance(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        applianceUpdateInput,
        options,
      ),
    beginUpdateAppliance: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      applianceUpdateInput: UpdateApplianceForReplicationProtectedItemInput,
      options?: ReplicationProtectedItemsUpdateApplianceOptionalParams,
    ) => {
      const poller = updateAppliance(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        applianceUpdateInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateApplianceAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      applianceUpdateInput: UpdateApplianceForReplicationProtectedItemInput,
      options?: ReplicationProtectedItemsUpdateApplianceOptionalParams,
    ) => {
      return await updateAppliance(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        applianceUpdateInput,
        options,
      );
    },
    unplannedFailover: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      failoverInput: UnplannedFailoverInput,
      options?: ReplicationProtectedItemsUnplannedFailoverOptionalParams,
    ) =>
      unplannedFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        failoverInput,
        options,
      ),
    beginUnplannedFailover: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      failoverInput: UnplannedFailoverInput,
      options?: ReplicationProtectedItemsUnplannedFailoverOptionalParams,
    ) => {
      const poller = unplannedFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        failoverInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUnplannedFailoverAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      failoverInput: UnplannedFailoverInput,
      options?: ReplicationProtectedItemsUnplannedFailoverOptionalParams,
    ) => {
      return await unplannedFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        failoverInput,
        options,
      );
    },
    testFailoverCleanup: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      cleanupInput: TestFailoverCleanupInput,
      options?: ReplicationProtectedItemsTestFailoverCleanupOptionalParams,
    ) =>
      testFailoverCleanup(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        cleanupInput,
        options,
      ),
    beginTestFailoverCleanup: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      cleanupInput: TestFailoverCleanupInput,
      options?: ReplicationProtectedItemsTestFailoverCleanupOptionalParams,
    ) => {
      const poller = testFailoverCleanup(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        cleanupInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestFailoverCleanupAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      cleanupInput: TestFailoverCleanupInput,
      options?: ReplicationProtectedItemsTestFailoverCleanupOptionalParams,
    ) => {
      return await testFailoverCleanup(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        cleanupInput,
        options,
      );
    },
    testFailover: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      testfailoverInput: TestFailoverInput,
      options?: ReplicationProtectedItemsTestFailoverOptionalParams,
    ) =>
      testFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        testfailoverInput,
        options,
      ),
    beginTestFailover: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      testfailoverInput: TestFailoverInput,
      options?: ReplicationProtectedItemsTestFailoverOptionalParams,
    ) => {
      const poller = testFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        testfailoverInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestFailoverAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      testfailoverInput: TestFailoverInput,
      options?: ReplicationProtectedItemsTestFailoverOptionalParams,
    ) => {
      return await testFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        testfailoverInput,
        options,
      );
    },
    switchProvider: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      switchProviderInput: SwitchProviderInput,
      options?: ReplicationProtectedItemsSwitchProviderOptionalParams,
    ) =>
      switchProvider(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        switchProviderInput,
        options,
      ),
    beginSwitchProvider: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      switchProviderInput: SwitchProviderInput,
      options?: ReplicationProtectedItemsSwitchProviderOptionalParams,
    ) => {
      const poller = switchProvider(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        switchProviderInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSwitchProviderAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      switchProviderInput: SwitchProviderInput,
      options?: ReplicationProtectedItemsSwitchProviderOptionalParams,
    ) => {
      return await switchProvider(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        switchProviderInput,
        options,
      );
    },
    resolveHealthErrors: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      resolveHealthInput: ResolveHealthInput,
      options?: ReplicationProtectedItemsResolveHealthErrorsOptionalParams,
    ) =>
      resolveHealthErrors(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        resolveHealthInput,
        options,
      ),
    beginResolveHealthErrors: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      resolveHealthInput: ResolveHealthInput,
      options?: ReplicationProtectedItemsResolveHealthErrorsOptionalParams,
    ) => {
      const poller = resolveHealthErrors(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        resolveHealthInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResolveHealthErrorsAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      resolveHealthInput: ResolveHealthInput,
      options?: ReplicationProtectedItemsResolveHealthErrorsOptionalParams,
    ) => {
      return await resolveHealthErrors(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        resolveHealthInput,
        options,
      );
    },
    reprotect: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      reprotectInput: ReverseReplicationInput,
      options?: ReplicationProtectedItemsReprotectOptionalParams,
    ) =>
      reprotect(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        reprotectInput,
        options,
      ),
    beginReprotect: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      reprotectInput: ReverseReplicationInput,
      options?: ReplicationProtectedItemsReprotectOptionalParams,
    ) => {
      const poller = reprotect(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        reprotectInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReprotectAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      reprotectInput: ReverseReplicationInput,
      options?: ReplicationProtectedItemsReprotectOptionalParams,
    ) => {
      return await reprotect(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        reprotectInput,
        options,
      );
    },
    repairReplication: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsRepairReplicationOptionalParams,
    ) =>
      repairReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      ),
    beginRepairReplication: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsRepairReplicationOptionalParams,
    ) => {
      const poller = repairReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRepairReplicationAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsRepairReplicationOptionalParams,
    ) => {
      return await repairReplication(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      );
    },
    removeDisks: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      removeDisksInput: RemoveDisksInput,
      options?: ReplicationProtectedItemsRemoveDisksOptionalParams,
    ) =>
      removeDisks(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        removeDisksInput,
        options,
      ),
    beginRemoveDisks: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      removeDisksInput: RemoveDisksInput,
      options?: ReplicationProtectedItemsRemoveDisksOptionalParams,
    ) => {
      const poller = removeDisks(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        removeDisksInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRemoveDisksAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      removeDisksInput: RemoveDisksInput,
      options?: ReplicationProtectedItemsRemoveDisksOptionalParams,
    ) => {
      return await removeDisks(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        removeDisksInput,
        options,
      );
    },
    delete: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      disableProtectionInput: DisableProtectionInput,
      options?: ReplicationProtectedItemsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        disableProtectionInput,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      disableProtectionInput: DisableProtectionInput,
      options?: ReplicationProtectedItemsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        disableProtectionInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      disableProtectionInput: DisableProtectionInput,
      options?: ReplicationProtectedItemsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        disableProtectionInput,
        options,
      );
    },
    plannedFailover: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      failoverInput: PlannedFailoverInput,
      options?: ReplicationProtectedItemsPlannedFailoverOptionalParams,
    ) =>
      plannedFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        failoverInput,
        options,
      ),
    beginPlannedFailover: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      failoverInput: PlannedFailoverInput,
      options?: ReplicationProtectedItemsPlannedFailoverOptionalParams,
    ) => {
      const poller = plannedFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        failoverInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPlannedFailoverAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      failoverInput: PlannedFailoverInput,
      options?: ReplicationProtectedItemsPlannedFailoverOptionalParams,
    ) => {
      return await plannedFailover(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        failoverInput,
        options,
      );
    },
    failoverCommit: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsFailoverCommitOptionalParams,
    ) =>
      failoverCommit(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      ),
    beginFailoverCommit: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsFailoverCommitOptionalParams,
    ) => {
      const poller = failoverCommit(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverCommitAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsFailoverCommitOptionalParams,
    ) => {
      return await failoverCommit(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      );
    },
    failoverCancel: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsFailoverCancelOptionalParams,
    ) =>
      failoverCancel(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      ),
    beginFailoverCancel: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsFailoverCancelOptionalParams,
    ) => {
      const poller = failoverCancel(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverCancelAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsFailoverCancelOptionalParams,
    ) => {
      return await failoverCancel(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      );
    },
    applyRecoveryPoint: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      applyRecoveryPointInput: ApplyRecoveryPointInput,
      options?: ReplicationProtectedItemsApplyRecoveryPointOptionalParams,
    ) =>
      applyRecoveryPoint(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        applyRecoveryPointInput,
        options,
      ),
    beginApplyRecoveryPoint: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      applyRecoveryPointInput: ApplyRecoveryPointInput,
      options?: ReplicationProtectedItemsApplyRecoveryPointOptionalParams,
    ) => {
      const poller = applyRecoveryPoint(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        applyRecoveryPointInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApplyRecoveryPointAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      applyRecoveryPointInput: ApplyRecoveryPointInput,
      options?: ReplicationProtectedItemsApplyRecoveryPointOptionalParams,
    ) => {
      return await applyRecoveryPoint(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        applyRecoveryPointInput,
        options,
      );
    },
    addDisks: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      addDisksInput: AddDisksInput,
      options?: ReplicationProtectedItemsAddDisksOptionalParams,
    ) =>
      addDisks(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        addDisksInput,
        options,
      ),
    beginAddDisks: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      addDisksInput: AddDisksInput,
      options?: ReplicationProtectedItemsAddDisksOptionalParams,
    ) => {
      const poller = addDisks(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        addDisksInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAddDisksAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      addDisksInput: AddDisksInput,
      options?: ReplicationProtectedItemsAddDisksOptionalParams,
    ) => {
      return await addDisks(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        addDisksInput,
        options,
      );
    },
    listByReplicationProtectionContainers: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      options?: ReplicationProtectedItemsListByReplicationProtectionContainersOptionalParams,
    ) =>
      listByReplicationProtectionContainers(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        options,
      ),
    purge: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsPurgeOptionalParams,
    ) =>
      purge(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      ),
    beginPurge: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsPurgeOptionalParams,
    ) => {
      const poller = purge(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsPurgeOptionalParams,
    ) => {
      return await purge(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      updateProtectionInput: UpdateReplicationProtectedItemInput,
      options?: ReplicationProtectedItemsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        updateProtectionInput,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      updateProtectionInput: UpdateReplicationProtectedItemInput,
      options?: ReplicationProtectedItemsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        updateProtectionInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      updateProtectionInput: UpdateReplicationProtectedItemInput,
      options?: ReplicationProtectedItemsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        updateProtectionInput,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      input: EnableProtectionInput,
      options?: ReplicationProtectedItemsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        input,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      input: EnableProtectionInput,
      options?: ReplicationProtectedItemsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      input: EnableProtectionInput,
      options?: ReplicationProtectedItemsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        input,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: ReplicationProtectedItemsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      ),
  };
}

export function _getReplicationProtectedItemsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationProtectedItemsOperations {
  return {
    ..._getReplicationProtectedItems(context),
  };
}
