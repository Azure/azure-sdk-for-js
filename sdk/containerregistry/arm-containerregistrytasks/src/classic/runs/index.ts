// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryTasksManagementContext } from "../../api/containerRegistryTasksManagementContext.js";
import { cancel, getLogSasUrl, list, update, get } from "../../api/runs/operations.js";
import type {
  RunsCancelOptionalParams,
  RunsGetLogSasUrlOptionalParams,
  RunsListOptionalParams,
  RunsUpdateOptionalParams,
  RunsGetOptionalParams,
} from "../../api/runs/options.js";
import type { Run, RunUpdateParameters, RunGetLogResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Runs operations. */
export interface RunsOperations {
  /** Cancel an existing run. */
  cancel: (
    resourceGroupName: string,
    registryName: string,
    runId: string,
    options?: RunsCancelOptionalParams,
  ) => Promise<void>;
  /** Gets a link to download the run logs. */
  getLogSasUrl: (
    resourceGroupName: string,
    registryName: string,
    runId: string,
    options?: RunsGetLogSasUrlOptionalParams,
  ) => Promise<RunGetLogResult>;
  /** Gets all the runs for a registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: RunsListOptionalParams,
  ) => PagedAsyncIterableIterator<Run>;
  /** Patch the run properties. */
  update: (
    resourceGroupName: string,
    registryName: string,
    runId: string,
    runUpdateParameters: RunUpdateParameters,
    options?: RunsUpdateOptionalParams,
  ) => Promise<Run>;
  /** Gets the detailed information for a given run. */
  get: (
    resourceGroupName: string,
    registryName: string,
    runId: string,
    options?: RunsGetOptionalParams,
  ) => Promise<Run>;
}

function _getRuns(context: ContainerRegistryTasksManagementContext) {
  return {
    cancel: (
      resourceGroupName: string,
      registryName: string,
      runId: string,
      options?: RunsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, registryName, runId, options),
    getLogSasUrl: (
      resourceGroupName: string,
      registryName: string,
      runId: string,
      options?: RunsGetLogSasUrlOptionalParams,
    ) => getLogSasUrl(context, resourceGroupName, registryName, runId, options),
    list: (resourceGroupName: string, registryName: string, options?: RunsListOptionalParams) =>
      list(context, resourceGroupName, registryName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      runId: string,
      runUpdateParameters: RunUpdateParameters,
      options?: RunsUpdateOptionalParams,
    ) => update(context, resourceGroupName, registryName, runId, runUpdateParameters, options),
    get: (
      resourceGroupName: string,
      registryName: string,
      runId: string,
      options?: RunsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, runId, options),
  };
}

export function _getRunsOperations(
  context: ContainerRegistryTasksManagementContext,
): RunsOperations {
  return {
    ..._getRuns(context),
  };
}
