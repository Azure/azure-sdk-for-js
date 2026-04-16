// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryTasksManagementContext } from "../../api/containerRegistryTasksManagementContext.js";
import { getBuildSourceUploadUrl, scheduleRun } from "../../api/registries/operations.js";
import type {
  RegistriesGetBuildSourceUploadUrlOptionalParams,
  RegistriesScheduleRunOptionalParams,
} from "../../api/registries/options.js";
import type { Run, RunRequestUnion, SourceUploadDefinition } from "../../models/models.js";

/** Interface representing a Registries operations. */
export interface RegistriesOperations {
  /** Get the upload location for the user to be able to upload the source. */
  getBuildSourceUploadUrl: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesGetBuildSourceUploadUrlOptionalParams,
  ) => Promise<SourceUploadDefinition>;
  /** Schedules a new run based on the request parameters and add it to the run queue. */
  scheduleRun: (
    resourceGroupName: string,
    registryName: string,
    runRequest: RunRequestUnion,
    options?: RegistriesScheduleRunOptionalParams,
  ) => Promise<Run>;
}

function _getRegistries(context: ContainerRegistryTasksManagementContext) {
  return {
    getBuildSourceUploadUrl: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistriesGetBuildSourceUploadUrlOptionalParams,
    ) => getBuildSourceUploadUrl(context, resourceGroupName, registryName, options),
    scheduleRun: (
      resourceGroupName: string,
      registryName: string,
      runRequest: RunRequestUnion,
      options?: RegistriesScheduleRunOptionalParams,
    ) => scheduleRun(context, resourceGroupName, registryName, runRequest, options),
  };
}

export function _getRegistriesOperations(
  context: ContainerRegistryTasksManagementContext,
): RegistriesOperations {
  return {
    ..._getRegistries(context),
  };
}
