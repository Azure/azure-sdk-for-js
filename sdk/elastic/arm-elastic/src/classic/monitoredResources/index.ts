// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { list } from "../../api/monitoredResources/operations.js";
import type { MonitoredResourcesListOptionalParams } from "../../api/monitoredResources/options.js";
import type { MonitoredResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MonitoredResources operations. */
export interface MonitoredResourcesOperations {
  /** List all resources currently being monitored by the Elastic monitor resource, helping you manage observability. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitoredResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<MonitoredResource>;
}

function _getMonitoredResources(context: MicrosoftElasticContext) {
  return {
    list: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitoredResourcesListOptionalParams,
    ) => list(context, resourceGroupName, monitorName, options),
  };
}

export function _getMonitoredResourcesOperations(
  context: MicrosoftElasticContext,
): MonitoredResourcesOperations {
  return {
    ..._getMonitoredResources(context),
  };
}
