// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HanaManagementContext } from "../../api/hanaManagementContext.js";
import { list, $delete, update, create, get } from "../../api/sapMonitors/operations.js";
import {
  SapMonitorsListOptionalParams,
  SapMonitorsDeleteOptionalParams,
  SapMonitorsUpdateOptionalParams,
  SapMonitorsCreateOptionalParams,
  SapMonitorsGetOptionalParams,
} from "../../api/sapMonitors/options.js";
import { SapMonitor, Tags } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SapMonitors operations. */
export interface SapMonitorsOperations {
  /** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
  list: (options?: SapMonitorsListOptionalParams) => PagedAsyncIterableIterator<SapMonitor>;
  /** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
  delete: (
    resourceGroupName: string,
    sapMonitorName: string,
    options?: SapMonitorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    sapMonitorName: string,
    options?: SapMonitorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    sapMonitorName: string,
    options?: SapMonitorsDeleteOptionalParams,
  ) => Promise<void>;
  /** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
  update: (
    resourceGroupName: string,
    sapMonitorName: string,
    tagsParameter: Tags,
    options?: SapMonitorsUpdateOptionalParams,
  ) => Promise<SapMonitor>;
  /** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
  create: (
    resourceGroupName: string,
    sapMonitorName: string,
    sapMonitorParameter: SapMonitor,
    options?: SapMonitorsCreateOptionalParams,
  ) => PollerLike<OperationState<SapMonitor>, SapMonitor>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    sapMonitorName: string,
    sapMonitorParameter: SapMonitor,
    options?: SapMonitorsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SapMonitor>, SapMonitor>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    sapMonitorName: string,
    sapMonitorParameter: SapMonitor,
    options?: SapMonitorsCreateOptionalParams,
  ) => Promise<SapMonitor>;
  /** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
  get: (
    resourceGroupName: string,
    sapMonitorName: string,
    options?: SapMonitorsGetOptionalParams,
  ) => Promise<SapMonitor>;
}

function _getSapMonitors(context: HanaManagementContext) {
  return {
    list: (options?: SapMonitorsListOptionalParams) => list(context, options),
    delete: (
      resourceGroupName: string,
      sapMonitorName: string,
      options?: SapMonitorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sapMonitorName, options),
    beginDelete: async (
      resourceGroupName: string,
      sapMonitorName: string,
      options?: SapMonitorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, sapMonitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      sapMonitorName: string,
      options?: SapMonitorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, sapMonitorName, options);
    },
    update: (
      resourceGroupName: string,
      sapMonitorName: string,
      tagsParameter: Tags,
      options?: SapMonitorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, sapMonitorName, tagsParameter, options),
    create: (
      resourceGroupName: string,
      sapMonitorName: string,
      sapMonitorParameter: SapMonitor,
      options?: SapMonitorsCreateOptionalParams,
    ) => create(context, resourceGroupName, sapMonitorName, sapMonitorParameter, options),
    beginCreate: async (
      resourceGroupName: string,
      sapMonitorName: string,
      sapMonitorParameter: SapMonitor,
      options?: SapMonitorsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        sapMonitorName,
        sapMonitorParameter,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      sapMonitorName: string,
      sapMonitorParameter: SapMonitor,
      options?: SapMonitorsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, sapMonitorName, sapMonitorParameter, options);
    },
    get: (
      resourceGroupName: string,
      sapMonitorName: string,
      options?: SapMonitorsGetOptionalParams,
    ) => get(context, resourceGroupName, sapMonitorName, options),
  };
}

export function _getSapMonitorsOperations(context: HanaManagementContext): SapMonitorsOperations {
  return {
    ..._getSapMonitors(context),
  };
}
