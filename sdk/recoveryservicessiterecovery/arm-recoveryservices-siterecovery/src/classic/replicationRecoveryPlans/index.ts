// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  unplannedFailover,
  testFailoverCleanup,
  testFailover,
  reprotect,
  plannedFailover,
  failoverCommit,
  failoverCancel,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/replicationRecoveryPlans/operations.js";
import type {
  ReplicationRecoveryPlansUnplannedFailoverOptionalParams,
  ReplicationRecoveryPlansTestFailoverCleanupOptionalParams,
  ReplicationRecoveryPlansTestFailoverOptionalParams,
  ReplicationRecoveryPlansReprotectOptionalParams,
  ReplicationRecoveryPlansPlannedFailoverOptionalParams,
  ReplicationRecoveryPlansFailoverCommitOptionalParams,
  ReplicationRecoveryPlansFailoverCancelOptionalParams,
  ReplicationRecoveryPlansListOptionalParams,
  ReplicationRecoveryPlansDeleteOptionalParams,
  ReplicationRecoveryPlansUpdateOptionalParams,
  ReplicationRecoveryPlansCreateOptionalParams,
  ReplicationRecoveryPlansGetOptionalParams,
} from "../../api/replicationRecoveryPlans/options.js";
import type {
  RecoveryPlan,
  CreateRecoveryPlanInput,
  UpdateRecoveryPlanInput,
  RecoveryPlanPlannedFailoverInput,
  RecoveryPlanTestFailoverInput,
  RecoveryPlanTestFailoverCleanupInput,
  RecoveryPlanUnplannedFailoverInput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationRecoveryPlans operations. */
export interface ReplicationRecoveryPlansOperations {
  /** The operation to start the unplanned failover of a recovery plan. */
  unplannedFailover: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanUnplannedFailoverInput,
    options?: ReplicationRecoveryPlansUnplannedFailoverOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
  /** @deprecated use unplannedFailover instead */
  beginUnplannedFailover: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanUnplannedFailoverInput,
    options?: ReplicationRecoveryPlansUnplannedFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryPlan>, RecoveryPlan>>;
  /** @deprecated use unplannedFailover instead */
  beginUnplannedFailoverAndWait: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanUnplannedFailoverInput,
    options?: ReplicationRecoveryPlansUnplannedFailoverOptionalParams,
  ) => Promise<RecoveryPlan>;
  /** The operation to cleanup test failover of a recovery plan. */
  testFailoverCleanup: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanTestFailoverCleanupInput,
    options?: ReplicationRecoveryPlansTestFailoverCleanupOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
  /** @deprecated use testFailoverCleanup instead */
  beginTestFailoverCleanup: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanTestFailoverCleanupInput,
    options?: ReplicationRecoveryPlansTestFailoverCleanupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryPlan>, RecoveryPlan>>;
  /** @deprecated use testFailoverCleanup instead */
  beginTestFailoverCleanupAndWait: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanTestFailoverCleanupInput,
    options?: ReplicationRecoveryPlansTestFailoverCleanupOptionalParams,
  ) => Promise<RecoveryPlan>;
  /** The operation to start the test failover of a recovery plan. */
  testFailover: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanTestFailoverInput,
    options?: ReplicationRecoveryPlansTestFailoverOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
  /** @deprecated use testFailover instead */
  beginTestFailover: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanTestFailoverInput,
    options?: ReplicationRecoveryPlansTestFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryPlan>, RecoveryPlan>>;
  /** @deprecated use testFailover instead */
  beginTestFailoverAndWait: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanTestFailoverInput,
    options?: ReplicationRecoveryPlansTestFailoverOptionalParams,
  ) => Promise<RecoveryPlan>;
  /** The operation to reprotect(reverse replicate) a recovery plan. This api is for deprecated scenarios and no longer works. */
  reprotect: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansReprotectOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
  /** @deprecated use reprotect instead */
  beginReprotect: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansReprotectOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryPlan>, RecoveryPlan>>;
  /** @deprecated use reprotect instead */
  beginReprotectAndWait: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansReprotectOptionalParams,
  ) => Promise<RecoveryPlan>;
  /** The operation to start the planned failover of a recovery plan. */
  plannedFailover: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanPlannedFailoverInput,
    options?: ReplicationRecoveryPlansPlannedFailoverOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
  /** @deprecated use plannedFailover instead */
  beginPlannedFailover: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanPlannedFailoverInput,
    options?: ReplicationRecoveryPlansPlannedFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryPlan>, RecoveryPlan>>;
  /** @deprecated use plannedFailover instead */
  beginPlannedFailoverAndWait: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: RecoveryPlanPlannedFailoverInput,
    options?: ReplicationRecoveryPlansPlannedFailoverOptionalParams,
  ) => Promise<RecoveryPlan>;
  /** The operation to commit the failover of a recovery plan. */
  failoverCommit: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansFailoverCommitOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
  /** @deprecated use failoverCommit instead */
  beginFailoverCommit: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansFailoverCommitOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryPlan>, RecoveryPlan>>;
  /** @deprecated use failoverCommit instead */
  beginFailoverCommitAndWait: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansFailoverCommitOptionalParams,
  ) => Promise<RecoveryPlan>;
  /** The operation to cancel the failover of a recovery plan. */
  failoverCancel: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansFailoverCancelOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
  /** @deprecated use failoverCancel instead */
  beginFailoverCancel: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansFailoverCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryPlan>, RecoveryPlan>>;
  /** @deprecated use failoverCancel instead */
  beginFailoverCancelAndWait: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansFailoverCancelOptionalParams,
  ) => Promise<RecoveryPlan>;
  /** Lists the recovery plans in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationRecoveryPlansListOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryPlan>;
  /** Delete a recovery plan. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update a recovery plan. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: UpdateRecoveryPlanInput,
    options?: ReplicationRecoveryPlansUpdateOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: UpdateRecoveryPlanInput,
    options?: ReplicationRecoveryPlansUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryPlan>, RecoveryPlan>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: UpdateRecoveryPlanInput,
    options?: ReplicationRecoveryPlansUpdateOptionalParams,
  ) => Promise<RecoveryPlan>;
  /** The operation to create a recovery plan. */
  create: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: CreateRecoveryPlanInput,
    options?: ReplicationRecoveryPlansCreateOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: CreateRecoveryPlanInput,
    options?: ReplicationRecoveryPlansCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryPlan>, RecoveryPlan>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    input: CreateRecoveryPlanInput,
    options?: ReplicationRecoveryPlansCreateOptionalParams,
  ) => Promise<RecoveryPlan>;
  /** Gets the details of the recovery plan. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    recoveryPlanName: string,
    options?: ReplicationRecoveryPlansGetOptionalParams,
  ) => Promise<RecoveryPlan>;
}

function _getReplicationRecoveryPlans(context: SiteRecoveryManagementContext) {
  return {
    unplannedFailover: (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanUnplannedFailoverInput,
      options?: ReplicationRecoveryPlansUnplannedFailoverOptionalParams,
    ) =>
      unplannedFailover(context, resourceGroupName, resourceName, recoveryPlanName, input, options),
    beginUnplannedFailover: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanUnplannedFailoverInput,
      options?: ReplicationRecoveryPlansUnplannedFailoverOptionalParams,
    ) => {
      const poller = unplannedFailover(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUnplannedFailoverAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanUnplannedFailoverInput,
      options?: ReplicationRecoveryPlansUnplannedFailoverOptionalParams,
    ) => {
      return await unplannedFailover(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
    },
    testFailoverCleanup: (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanTestFailoverCleanupInput,
      options?: ReplicationRecoveryPlansTestFailoverCleanupOptionalParams,
    ) =>
      testFailoverCleanup(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      ),
    beginTestFailoverCleanup: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanTestFailoverCleanupInput,
      options?: ReplicationRecoveryPlansTestFailoverCleanupOptionalParams,
    ) => {
      const poller = testFailoverCleanup(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestFailoverCleanupAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanTestFailoverCleanupInput,
      options?: ReplicationRecoveryPlansTestFailoverCleanupOptionalParams,
    ) => {
      return await testFailoverCleanup(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
    },
    testFailover: (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanTestFailoverInput,
      options?: ReplicationRecoveryPlansTestFailoverOptionalParams,
    ) => testFailover(context, resourceGroupName, resourceName, recoveryPlanName, input, options),
    beginTestFailover: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanTestFailoverInput,
      options?: ReplicationRecoveryPlansTestFailoverOptionalParams,
    ) => {
      const poller = testFailover(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestFailoverAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanTestFailoverInput,
      options?: ReplicationRecoveryPlansTestFailoverOptionalParams,
    ) => {
      return await testFailover(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
    },
    reprotect: (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansReprotectOptionalParams,
    ) => reprotect(context, resourceGroupName, resourceName, recoveryPlanName, options),
    beginReprotect: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansReprotectOptionalParams,
    ) => {
      const poller = reprotect(context, resourceGroupName, resourceName, recoveryPlanName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReprotectAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansReprotectOptionalParams,
    ) => {
      return await reprotect(context, resourceGroupName, resourceName, recoveryPlanName, options);
    },
    plannedFailover: (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanPlannedFailoverInput,
      options?: ReplicationRecoveryPlansPlannedFailoverOptionalParams,
    ) =>
      plannedFailover(context, resourceGroupName, resourceName, recoveryPlanName, input, options),
    beginPlannedFailover: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanPlannedFailoverInput,
      options?: ReplicationRecoveryPlansPlannedFailoverOptionalParams,
    ) => {
      const poller = plannedFailover(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPlannedFailoverAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: RecoveryPlanPlannedFailoverInput,
      options?: ReplicationRecoveryPlansPlannedFailoverOptionalParams,
    ) => {
      return await plannedFailover(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
    },
    failoverCommit: (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansFailoverCommitOptionalParams,
    ) => failoverCommit(context, resourceGroupName, resourceName, recoveryPlanName, options),
    beginFailoverCommit: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansFailoverCommitOptionalParams,
    ) => {
      const poller = failoverCommit(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverCommitAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansFailoverCommitOptionalParams,
    ) => {
      return await failoverCommit(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        options,
      );
    },
    failoverCancel: (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansFailoverCancelOptionalParams,
    ) => failoverCancel(context, resourceGroupName, resourceName, recoveryPlanName, options),
    beginFailoverCancel: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansFailoverCancelOptionalParams,
    ) => {
      const poller = failoverCancel(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverCancelAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansFailoverCancelOptionalParams,
    ) => {
      return await failoverCancel(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationRecoveryPlansListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, recoveryPlanName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, recoveryPlanName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, recoveryPlanName, options);
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: UpdateRecoveryPlanInput,
      options?: ReplicationRecoveryPlansUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, recoveryPlanName, input, options),
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: UpdateRecoveryPlanInput,
      options?: ReplicationRecoveryPlansUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: UpdateRecoveryPlanInput,
      options?: ReplicationRecoveryPlansUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: CreateRecoveryPlanInput,
      options?: ReplicationRecoveryPlansCreateOptionalParams,
    ) => create(context, resourceGroupName, resourceName, recoveryPlanName, input, options),
    beginCreate: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: CreateRecoveryPlanInput,
      options?: ReplicationRecoveryPlansCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      input: CreateRecoveryPlanInput,
      options?: ReplicationRecoveryPlansCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      recoveryPlanName: string,
      options?: ReplicationRecoveryPlansGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, recoveryPlanName, options),
  };
}

export function _getReplicationRecoveryPlansOperations(
  context: SiteRecoveryManagementContext,
): ReplicationRecoveryPlansOperations {
  return {
    ..._getReplicationRecoveryPlans(context),
  };
}
