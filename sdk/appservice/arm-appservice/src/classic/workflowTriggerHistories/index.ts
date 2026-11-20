// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import { resubmit, list, get } from "../../api/workflowTriggerHistories/operations.js";
import type {
  WorkflowTriggerHistoriesResubmitOptionalParams,
  WorkflowTriggerHistoriesListOptionalParams,
  WorkflowTriggerHistoriesGetOptionalParams,
} from "../../api/workflowTriggerHistories/options.js";
import type { WorkflowTriggerHistory } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkflowTriggerHistories operations. */
export interface WorkflowTriggerHistoriesOperations {
  /** Resubmits a workflow run based on the trigger history. */
  resubmit: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    triggerName: string,
    historyName: string,
    options?: WorkflowTriggerHistoriesResubmitOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resubmit instead */
  beginResubmit: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    triggerName: string,
    historyName: string,
    options?: WorkflowTriggerHistoriesResubmitOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resubmit instead */
  beginResubmitAndWait: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    triggerName: string,
    historyName: string,
    options?: WorkflowTriggerHistoriesResubmitOptionalParams,
  ) => Promise<void>;
  /** Gets a list of workflow trigger histories. */
  list: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    triggerName: string,
    options?: WorkflowTriggerHistoriesListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkflowTriggerHistory>;
  /** Gets a workflow trigger history. */
  get: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    triggerName: string,
    historyName: string,
    options?: WorkflowTriggerHistoriesGetOptionalParams,
  ) => Promise<WorkflowTriggerHistory>;
}

function _getWorkflowTriggerHistories(context: WebSiteManagementContext) {
  return {
    resubmit: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      triggerName: string,
      historyName: string,
      options?: WorkflowTriggerHistoriesResubmitOptionalParams,
    ) =>
      resubmit(context, resourceGroupName, name, workflowName, triggerName, historyName, options),
    beginResubmit: async (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      triggerName: string,
      historyName: string,
      options?: WorkflowTriggerHistoriesResubmitOptionalParams,
    ) => {
      const poller = resubmit(
        context,
        resourceGroupName,
        name,
        workflowName,
        triggerName,
        historyName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResubmitAndWait: async (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      triggerName: string,
      historyName: string,
      options?: WorkflowTriggerHistoriesResubmitOptionalParams,
    ) => {
      return await resubmit(
        context,
        resourceGroupName,
        name,
        workflowName,
        triggerName,
        historyName,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      triggerName: string,
      options?: WorkflowTriggerHistoriesListOptionalParams,
    ) => list(context, resourceGroupName, name, workflowName, triggerName, options),
    get: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      triggerName: string,
      historyName: string,
      options?: WorkflowTriggerHistoriesGetOptionalParams,
    ) => get(context, resourceGroupName, name, workflowName, triggerName, historyName, options),
  };
}

export function _getWorkflowTriggerHistoriesOperations(
  context: WebSiteManagementContext,
): WorkflowTriggerHistoriesOperations {
  return {
    ..._getWorkflowTriggerHistories(context),
  };
}
