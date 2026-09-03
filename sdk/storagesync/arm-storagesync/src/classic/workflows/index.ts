// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import { abort, listByStorageSyncService, get } from "../../api/workflows/operations.js";
import type {
  WorkflowsAbortOptionalParams,
  WorkflowsListByStorageSyncServiceOptionalParams,
  WorkflowsGetOptionalParams,
} from "../../api/workflows/options.js";
import type { Workflow } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Workflows operations. */
export interface WorkflowsOperations {
  /** Abort the given workflow. */
  abort: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    workflowId: string,
    options?: WorkflowsAbortOptionalParams,
  ) => Promise<void>;
  /** Get a Workflow List */
  listByStorageSyncService: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: WorkflowsListByStorageSyncServiceOptionalParams,
  ) => PagedAsyncIterableIterator<Workflow>;
  /** Get Workflows resource */
  get: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    workflowId: string,
    options?: WorkflowsGetOptionalParams,
  ) => Promise<Workflow>;
}

function _getWorkflows(context: MicrosoftStorageSyncContext) {
  return {
    abort: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      workflowId: string,
      options?: WorkflowsAbortOptionalParams,
    ) => abort(context, resourceGroupName, storageSyncServiceName, workflowId, options),
    listByStorageSyncService: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: WorkflowsListByStorageSyncServiceOptionalParams,
    ) => listByStorageSyncService(context, resourceGroupName, storageSyncServiceName, options),
    get: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      workflowId: string,
      options?: WorkflowsGetOptionalParams,
    ) => get(context, resourceGroupName, storageSyncServiceName, workflowId, options),
  };
}

export function _getWorkflowsOperations(context: MicrosoftStorageSyncContext): WorkflowsOperations {
  return {
    ..._getWorkflows(context),
  };
}
