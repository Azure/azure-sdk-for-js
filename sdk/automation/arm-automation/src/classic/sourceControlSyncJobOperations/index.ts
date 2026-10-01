// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  get,
  create,
} from "../../api/sourceControlSyncJobOperations/operations.js";
import type {
  SourceControlSyncJobOperationsListByAutomationAccountOptionalParams,
  SourceControlSyncJobOperationsGetOptionalParams,
  SourceControlSyncJobOperationsCreateOptionalParams,
} from "../../api/sourceControlSyncJobOperations/options.js";
import type {
  SourceControlSyncJobCreateParameters,
  SourceControlSyncJob,
  SourceControlSyncJobById,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SourceControlSyncJobOperations operations. */
export interface SourceControlSyncJobOperationsOperations {
  /** Retrieve a list of source control sync jobs. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    options?: SourceControlSyncJobOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<SourceControlSyncJob>;
  /** Retrieve the source control sync job identified by job id. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    sourceControlSyncJobId: string,
    options?: SourceControlSyncJobOperationsGetOptionalParams,
  ) => Promise<SourceControlSyncJobById>;
  /** Creates the sync job for a source control. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    sourceControlSyncJobId: string,
    parameters: SourceControlSyncJobCreateParameters,
    options?: SourceControlSyncJobOperationsCreateOptionalParams,
  ) => Promise<SourceControlSyncJob>;
}

function _getSourceControlSyncJobOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      options?: SourceControlSyncJobOperationsListByAutomationAccountOptionalParams,
    ) =>
      listByAutomationAccount(
        context,
        resourceGroupName,
        automationAccountName,
        sourceControlName,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      sourceControlSyncJobId: string,
      options?: SourceControlSyncJobOperationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        automationAccountName,
        sourceControlName,
        sourceControlSyncJobId,
        options,
      ),
    create: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      sourceControlSyncJobId: string,
      parameters: SourceControlSyncJobCreateParameters,
      options?: SourceControlSyncJobOperationsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        automationAccountName,
        sourceControlName,
        sourceControlSyncJobId,
        parameters,
        options,
      ),
  };
}

export function _getSourceControlSyncJobOperationsOperations(
  context: AutomationContext,
): SourceControlSyncJobOperationsOperations {
  return {
    ..._getSourceControlSyncJobOperations(context),
  };
}
