// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByAutomationAccount, get, create } from "../../api/sourceControlSyncJob/operations.js";
import type {
  SourceControlSyncJobListByAutomationAccountOptionalParams,
  SourceControlSyncJobGetOptionalParams,
  SourceControlSyncJobCreateOptionalParams,
} from "../../api/sourceControlSyncJob/options.js";
import type {
  SourceControlSyncJobCreateParameters,
  SourceControlSyncJob,
  SourceControlSyncJobById,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SourceControlSyncJob operations. */
export interface SourceControlSyncJobOperations {
  /** Retrieve a list of source control sync jobs. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    options?: SourceControlSyncJobListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<SourceControlSyncJob>;
  /** Retrieve the source control sync job identified by job id. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    sourceControlSyncJobId: string,
    options?: SourceControlSyncJobGetOptionalParams,
  ) => Promise<SourceControlSyncJobById>;
  /** Creates the sync job for a source control. */
  create: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    sourceControlSyncJobId: string,
    parameters: SourceControlSyncJobCreateParameters,
    options?: SourceControlSyncJobCreateOptionalParams,
  ) => Promise<SourceControlSyncJob>;
}

function _getSourceControlSyncJob(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      options?: SourceControlSyncJobListByAutomationAccountOptionalParams,
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
      options?: SourceControlSyncJobGetOptionalParams,
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
      options?: SourceControlSyncJobCreateOptionalParams,
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

export function _getSourceControlSyncJobOperations(
  context: AutomationContext,
): SourceControlSyncJobOperations {
  return {
    ..._getSourceControlSyncJob(context),
  };
}
