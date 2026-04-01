// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { cancel, rerun, queryByFactory } from "../../api/triggerRuns/operations.js";
import type {
  TriggerRunsCancelOptionalParams,
  TriggerRunsRerunOptionalParams,
  TriggerRunsQueryByFactoryOptionalParams,
} from "../../api/triggerRuns/options.js";
import type { RunFilterParameters, TriggerRunsQueryResponse } from "../../models/models.js";

/** Interface representing a TriggerRuns operations. */
export interface TriggerRunsOperations {
  /** Cancel a single trigger instance by runId. */
  cancel: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    runId: string,
    options?: TriggerRunsCancelOptionalParams,
  ) => Promise<void>;
  /** Rerun single trigger instance by runId. */
  rerun: (
    resourceGroupName: string,
    factoryName: string,
    triggerName: string,
    runId: string,
    options?: TriggerRunsRerunOptionalParams,
  ) => Promise<void>;
  /** Query trigger runs. */
  queryByFactory: (
    resourceGroupName: string,
    factoryName: string,
    filterParameters: RunFilterParameters,
    options?: TriggerRunsQueryByFactoryOptionalParams,
  ) => Promise<TriggerRunsQueryResponse>;
}

function _getTriggerRuns(context: DataFactoryManagementContext) {
  return {
    cancel: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      runId: string,
      options?: TriggerRunsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, factoryName, triggerName, runId, options),
    rerun: (
      resourceGroupName: string,
      factoryName: string,
      triggerName: string,
      runId: string,
      options?: TriggerRunsRerunOptionalParams,
    ) => rerun(context, resourceGroupName, factoryName, triggerName, runId, options),
    queryByFactory: (
      resourceGroupName: string,
      factoryName: string,
      filterParameters: RunFilterParameters,
      options?: TriggerRunsQueryByFactoryOptionalParams,
    ) => queryByFactory(context, resourceGroupName, factoryName, filterParameters, options),
  };
}

export function _getTriggerRunsOperations(
  context: DataFactoryManagementContext,
): TriggerRunsOperations {
  return {
    ..._getTriggerRuns(context),
  };
}
