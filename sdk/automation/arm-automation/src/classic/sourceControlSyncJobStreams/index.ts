// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { get, listBySyncJob } from "../../api/sourceControlSyncJobStreams/operations.js";
import type {
  SourceControlSyncJobStreamsGetOptionalParams,
  SourceControlSyncJobStreamsListBySyncJobOptionalParams,
} from "../../api/sourceControlSyncJobStreams/options.js";
import type {
  SourceControlSyncJobStream,
  SourceControlSyncJobStreamById,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SourceControlSyncJobStreams operations. */
export interface SourceControlSyncJobStreamsOperations {
  /** Retrieve a sync job stream identified by stream id. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    sourceControlSyncJobId: string,
    streamId: string,
    options?: SourceControlSyncJobStreamsGetOptionalParams,
  ) => Promise<SourceControlSyncJobStreamById>;
  /** Retrieve a list of sync job streams identified by sync job id. */
  listBySyncJob: (
    resourceGroupName: string,
    automationAccountName: string,
    sourceControlName: string,
    sourceControlSyncJobId: string,
    options?: SourceControlSyncJobStreamsListBySyncJobOptionalParams,
  ) => PagedAsyncIterableIterator<SourceControlSyncJobStream>;
}

function _getSourceControlSyncJobStreams(context: AutomationContext) {
  return {
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      sourceControlSyncJobId: string,
      streamId: string,
      options?: SourceControlSyncJobStreamsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        automationAccountName,
        sourceControlName,
        sourceControlSyncJobId,
        streamId,
        options,
      ),
    listBySyncJob: (
      resourceGroupName: string,
      automationAccountName: string,
      sourceControlName: string,
      sourceControlSyncJobId: string,
      options?: SourceControlSyncJobStreamsListBySyncJobOptionalParams,
    ) =>
      listBySyncJob(
        context,
        resourceGroupName,
        automationAccountName,
        sourceControlName,
        sourceControlSyncJobId,
        options,
      ),
  };
}

export function _getSourceControlSyncJobStreamsOperations(
  context: AutomationContext,
): SourceControlSyncJobStreamsOperations {
  return {
    ..._getSourceControlSyncJobStreams(context),
  };
}
