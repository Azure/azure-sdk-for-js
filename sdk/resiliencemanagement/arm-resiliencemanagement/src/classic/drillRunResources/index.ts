// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import { list, get } from "../../api/drillRunResources/operations.js";
import {
  DrillRunResourcesListOptionalParams,
  DrillRunResourcesGetOptionalParams,
} from "../../api/drillRunResources/options.js";
import { DrillRunResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DrillRunResources operations. */
export interface DrillRunResourcesOperations {
  /** List DrillRunResource resources by DrillRun */
  list: (
    serviceGroupName: string,
    drillName: string,
    drillRunName: string,
    options?: DrillRunResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<DrillRunResource>;
  /** Get a DrillRunResource */
  get: (
    serviceGroupName: string,
    drillName: string,
    drillRunName: string,
    drillRunResourceName: string,
    options?: DrillRunResourcesGetOptionalParams,
  ) => Promise<DrillRunResource>;
}

function _getDrillRunResources(context: AzureResilienceManagementContext) {
  return {
    list: (
      serviceGroupName: string,
      drillName: string,
      drillRunName: string,
      options?: DrillRunResourcesListOptionalParams,
    ) => list(context, serviceGroupName, drillName, drillRunName, options),
    get: (
      serviceGroupName: string,
      drillName: string,
      drillRunName: string,
      drillRunResourceName: string,
      options?: DrillRunResourcesGetOptionalParams,
    ) => get(context, serviceGroupName, drillName, drillRunName, drillRunResourceName, options),
  };
}

export function _getDrillRunResourcesOperations(
  context: AzureResilienceManagementContext,
): DrillRunResourcesOperations {
  return {
    ..._getDrillRunResources(context),
  };
}
