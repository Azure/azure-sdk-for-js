// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  getSchemaJson,
  run,
  listCallbackUrl,
  list,
  get,
} from "../../api/workflowTriggers/operations.js";
import type {
  WorkflowTriggersGetSchemaJsonOptionalParams,
  WorkflowTriggersRunOptionalParams,
  WorkflowTriggersListCallbackUrlOptionalParams,
  WorkflowTriggersListOptionalParams,
  WorkflowTriggersGetOptionalParams,
} from "../../api/workflowTriggers/options.js";
import type {
  WorkflowTrigger,
  WorkflowTriggerCallbackUrl,
  JsonSchema,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkflowTriggers operations. */
export interface WorkflowTriggersOperations {
  /** Get the trigger schema as JSON. */
  getSchemaJson: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    triggerName: string,
    options?: WorkflowTriggersGetSchemaJsonOptionalParams,
  ) => Promise<JsonSchema>;
  /** Runs a workflow trigger. */
  run: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    triggerName: string,
    options?: WorkflowTriggersRunOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use run instead */
  beginRun: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    triggerName: string,
    options?: WorkflowTriggersRunOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use run instead */
  beginRunAndWait: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    triggerName: string,
    options?: WorkflowTriggersRunOptionalParams,
  ) => Promise<void>;
  /** Get the callback URL for a workflow trigger. */
  listCallbackUrl: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    triggerName: string,
    options?: WorkflowTriggersListCallbackUrlOptionalParams,
  ) => Promise<WorkflowTriggerCallbackUrl>;
  /** Gets a list of workflow triggers. */
  list: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    options?: WorkflowTriggersListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkflowTrigger>;
  /** Gets a workflow trigger. */
  get: (
    resourceGroupName: string,
    name: string,
    workflowName: string,
    triggerName: string,
    options?: WorkflowTriggersGetOptionalParams,
  ) => Promise<WorkflowTrigger>;
}

function _getWorkflowTriggers(context: WebSiteManagementContext) {
  return {
    getSchemaJson: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      triggerName: string,
      options?: WorkflowTriggersGetSchemaJsonOptionalParams,
    ) => getSchemaJson(context, resourceGroupName, name, workflowName, triggerName, options),
    run: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      triggerName: string,
      options?: WorkflowTriggersRunOptionalParams,
    ) => run(context, resourceGroupName, name, workflowName, triggerName, options),
    beginRun: async (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      triggerName: string,
      options?: WorkflowTriggersRunOptionalParams,
    ) => {
      const poller = run(context, resourceGroupName, name, workflowName, triggerName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRunAndWait: async (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      triggerName: string,
      options?: WorkflowTriggersRunOptionalParams,
    ) => {
      return await run(context, resourceGroupName, name, workflowName, triggerName, options);
    },
    listCallbackUrl: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      triggerName: string,
      options?: WorkflowTriggersListCallbackUrlOptionalParams,
    ) => listCallbackUrl(context, resourceGroupName, name, workflowName, triggerName, options),
    list: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      options?: WorkflowTriggersListOptionalParams,
    ) => list(context, resourceGroupName, name, workflowName, options),
    get: (
      resourceGroupName: string,
      name: string,
      workflowName: string,
      triggerName: string,
      options?: WorkflowTriggersGetOptionalParams,
    ) => get(context, resourceGroupName, name, workflowName, triggerName, options),
  };
}

export function _getWorkflowTriggersOperations(
  context: WebSiteManagementContext,
): WorkflowTriggersOperations {
  return {
    ..._getWorkflowTriggers(context),
  };
}
