// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import {
  markAsComplete,
  resume,
  addNotes,
  reprotect,
  failOver,
  list,
  get,
} from "../../api/drillRuns/operations.js";
import {
  DrillRunsMarkAsCompleteOptionalParams,
  DrillRunsResumeOptionalParams,
  DrillRunsAddNotesOptionalParams,
  DrillRunsReprotectOptionalParams,
  DrillRunsFailOverOptionalParams,
  DrillRunsListOptionalParams,
  DrillRunsGetOptionalParams,
} from "../../api/drillRuns/options.js";
import {
  DrillRun,
  DrillRunFailoverRequest,
  DrillRunAddNotesRequest,
  MarkAsCompleteRequest,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DrillRuns operations. */
export interface DrillRunsOperations {
  /** This enables the user to mark this stage as complete, disabling further retries on it. */
  markAsComplete: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    body: MarkAsCompleteRequest,
    options?: DrillRunsMarkAsCompleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use markAsComplete instead */
  beginMarkAsComplete: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    body: MarkAsCompleteRequest,
    options?: DrillRunsMarkAsCompleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use markAsComplete instead */
  beginMarkAsCompleteAndWait: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    body: MarkAsCompleteRequest,
    options?: DrillRunsMarkAsCompleteOptionalParams,
  ) => Promise<void>;
  /** This unblocks a Failover workflow that is paused after the Fault stage, to proceed to the Failover stage. */
  resume: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    options?: DrillRunsResumeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resume instead */
  beginResume: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    options?: DrillRunsResumeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resume instead */
  beginResumeAndWait: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    options?: DrillRunsResumeOptionalParams,
  ) => Promise<void>;
  /** This enables the user to add notes on this Drill Run. */
  addNotes: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    body: DrillRunAddNotesRequest,
    options?: DrillRunsAddNotesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use addNotes instead */
  beginAddNotes: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    body: DrillRunAddNotesRequest,
    options?: DrillRunsAddNotesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use addNotes instead */
  beginAddNotesAndWait: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    body: DrillRunAddNotesRequest,
    options?: DrillRunsAddNotesOptionalParams,
  ) => Promise<void>;
  /** This initiates a new Reprotect operation on this Drill Run. */
  reprotect: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    options?: DrillRunsReprotectOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reprotect instead */
  beginReprotect: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    options?: DrillRunsReprotectOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reprotect instead */
  beginReprotectAndWait: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    options?: DrillRunsReprotectOptionalParams,
  ) => Promise<void>;
  /** This initiates a new Failover operation on this Drill Run. */
  failOver: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    body: DrillRunFailoverRequest,
    options?: DrillRunsFailOverOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use failOver instead */
  beginFailOver: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    body: DrillRunFailoverRequest,
    options?: DrillRunsFailOverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use failOver instead */
  beginFailOverAndWait: (
    serviceGroupName: string,
    operationId: string,
    drillName: string,
    drillRunName: string,
    body: DrillRunFailoverRequest,
    options?: DrillRunsFailOverOptionalParams,
  ) => Promise<void>;
  /** List DrillRun resources by Drill */
  list: (
    serviceGroupName: string,
    drillName: string,
    options?: DrillRunsListOptionalParams,
  ) => PagedAsyncIterableIterator<DrillRun>;
  /** Get a DrillRun */
  get: (
    serviceGroupName: string,
    drillName: string,
    drillRunName: string,
    options?: DrillRunsGetOptionalParams,
  ) => Promise<DrillRun>;
}

function _getDrillRuns(context: AzureResilienceManagementContext) {
  return {
    markAsComplete: (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      body: MarkAsCompleteRequest,
      options?: DrillRunsMarkAsCompleteOptionalParams,
    ) =>
      markAsComplete(
        context,
        serviceGroupName,
        operationId,
        drillName,
        drillRunName,
        body,
        options,
      ),
    beginMarkAsComplete: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      body: MarkAsCompleteRequest,
      options?: DrillRunsMarkAsCompleteOptionalParams,
    ) => {
      const poller = markAsComplete(
        context,
        serviceGroupName,
        operationId,
        drillName,
        drillRunName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMarkAsCompleteAndWait: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      body: MarkAsCompleteRequest,
      options?: DrillRunsMarkAsCompleteOptionalParams,
    ) => {
      return await markAsComplete(
        context,
        serviceGroupName,
        operationId,
        drillName,
        drillRunName,
        body,
        options,
      );
    },
    resume: (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      options?: DrillRunsResumeOptionalParams,
    ) => resume(context, serviceGroupName, operationId, drillName, drillRunName, options),
    beginResume: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      options?: DrillRunsResumeOptionalParams,
    ) => {
      const poller = resume(
        context,
        serviceGroupName,
        operationId,
        drillName,
        drillRunName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResumeAndWait: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      options?: DrillRunsResumeOptionalParams,
    ) => {
      return await resume(context, serviceGroupName, operationId, drillName, drillRunName, options);
    },
    addNotes: (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      body: DrillRunAddNotesRequest,
      options?: DrillRunsAddNotesOptionalParams,
    ) => addNotes(context, serviceGroupName, operationId, drillName, drillRunName, body, options),
    beginAddNotes: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      body: DrillRunAddNotesRequest,
      options?: DrillRunsAddNotesOptionalParams,
    ) => {
      const poller = addNotes(
        context,
        serviceGroupName,
        operationId,
        drillName,
        drillRunName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAddNotesAndWait: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      body: DrillRunAddNotesRequest,
      options?: DrillRunsAddNotesOptionalParams,
    ) => {
      return await addNotes(
        context,
        serviceGroupName,
        operationId,
        drillName,
        drillRunName,
        body,
        options,
      );
    },
    reprotect: (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      options?: DrillRunsReprotectOptionalParams,
    ) => reprotect(context, serviceGroupName, operationId, drillName, drillRunName, options),
    beginReprotect: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      options?: DrillRunsReprotectOptionalParams,
    ) => {
      const poller = reprotect(
        context,
        serviceGroupName,
        operationId,
        drillName,
        drillRunName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReprotectAndWait: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      options?: DrillRunsReprotectOptionalParams,
    ) => {
      return await reprotect(
        context,
        serviceGroupName,
        operationId,
        drillName,
        drillRunName,
        options,
      );
    },
    failOver: (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      body: DrillRunFailoverRequest,
      options?: DrillRunsFailOverOptionalParams,
    ) => failOver(context, serviceGroupName, operationId, drillName, drillRunName, body, options),
    beginFailOver: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      body: DrillRunFailoverRequest,
      options?: DrillRunsFailOverOptionalParams,
    ) => {
      const poller = failOver(
        context,
        serviceGroupName,
        operationId,
        drillName,
        drillRunName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailOverAndWait: async (
      serviceGroupName: string,
      operationId: string,
      drillName: string,
      drillRunName: string,
      body: DrillRunFailoverRequest,
      options?: DrillRunsFailOverOptionalParams,
    ) => {
      return await failOver(
        context,
        serviceGroupName,
        operationId,
        drillName,
        drillRunName,
        body,
        options,
      );
    },
    list: (serviceGroupName: string, drillName: string, options?: DrillRunsListOptionalParams) =>
      list(context, serviceGroupName, drillName, options),
    get: (
      serviceGroupName: string,
      drillName: string,
      drillRunName: string,
      options?: DrillRunsGetOptionalParams,
    ) => get(context, serviceGroupName, drillName, drillRunName, options),
  };
}

export function _getDrillRunsOperations(
  context: AzureResilienceManagementContext,
): DrillRunsOperations {
  return {
    ..._getDrillRuns(context),
  };
}
