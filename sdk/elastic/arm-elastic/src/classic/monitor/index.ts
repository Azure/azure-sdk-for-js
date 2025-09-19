// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { upgrade } from "../../api/monitor/operations.js";
import type { MonitorUpgradeOptionalParams } from "../../api/monitor/options.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Monitor operations. */
export interface MonitorOperations {
  /** Upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance. */
  upgrade: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getMonitor(context: MicrosoftElasticContext) {
  return {
    upgrade: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorUpgradeOptionalParams,
    ) => upgrade(context, resourceGroupName, monitorName, options),
  };
}

export function _getMonitorOperations(context: MicrosoftElasticContext): MonitorOperations {
  return {
    ..._getMonitor(context),
  };
}
