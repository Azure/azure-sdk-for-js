// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import { list, get } from "../../api/drillResources/operations.js";
import type {
  DrillResourcesListOptionalParams,
  DrillResourcesGetOptionalParams,
} from "../../api/drillResources/options.js";
import type { DrillResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DrillResources operations. */
export interface DrillResourcesOperations {
  /** List DrillResource resources by Drill */
  list: (
    serviceGroupName: string,
    drillName: string,
    options?: DrillResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<DrillResource>;
  /** Get a DrillResource */
  get: (
    serviceGroupName: string,
    drillName: string,
    drillResourceName: string,
    options?: DrillResourcesGetOptionalParams,
  ) => Promise<DrillResource>;
}

function _getDrillResources(context: AzureResilienceManagementContext) {
  return {
    list: (
      serviceGroupName: string,
      drillName: string,
      options?: DrillResourcesListOptionalParams,
    ) => list(context, serviceGroupName, drillName, options),
    get: (
      serviceGroupName: string,
      drillName: string,
      drillResourceName: string,
      options?: DrillResourcesGetOptionalParams,
    ) => get(context, serviceGroupName, drillName, drillResourceName, options),
  };
}

export function _getDrillResourcesOperations(
  context: AzureResilienceManagementContext,
): DrillResourcesOperations {
  return {
    ..._getDrillResources(context),
  };
}
