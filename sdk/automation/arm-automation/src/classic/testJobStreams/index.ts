// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByTestJob, get } from "../../api/testJobStreams/operations.js";
import type {
  TestJobStreamsListByTestJobOptionalParams,
  TestJobStreamsGetOptionalParams,
} from "../../api/testJobStreams/options.js";
import type { JobStream } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TestJobStreams operations. */
export interface TestJobStreamsOperations {
  /** Retrieve a list of test job streams identified by runbook name. */
  listByTestJob: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    options?: TestJobStreamsListByTestJobOptionalParams,
  ) => PagedAsyncIterableIterator<JobStream>;
  /** Retrieve a test job stream of the test job identified by runbook name and stream id. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    runbookName: string,
    jobStreamId: string,
    options?: TestJobStreamsGetOptionalParams,
  ) => Promise<JobStream>;
}

function _getTestJobStreams(context: AutomationContext) {
  return {
    listByTestJob: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      options?: TestJobStreamsListByTestJobOptionalParams,
    ) => listByTestJob(context, resourceGroupName, automationAccountName, runbookName, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      runbookName: string,
      jobStreamId: string,
      options?: TestJobStreamsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, runbookName, jobStreamId, options),
  };
}

export function _getTestJobStreamsOperations(context: AutomationContext): TestJobStreamsOperations {
  return {
    ..._getTestJobStreams(context),
  };
}
