// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { upgrade } from "../../api/monitor/operations.js";
import type { MonitorUpgradeOptionalParams } from "../../api/monitor/options.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Monitor operations. */
export interface MonitorOperations {
  /** Upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance. */
  upgrade: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorUpgradeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use upgrade instead */
  beginUpgrade: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorUpgradeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use upgrade instead */
  beginUpgradeAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorUpgradeOptionalParams,
  ) => Promise<void>;
}

function _getMonitor(context: MicrosoftElasticContext) {
  return {
    upgrade: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorUpgradeOptionalParams,
    ) => upgrade(context, resourceGroupName, monitorName, options),
    beginUpgrade: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorUpgradeOptionalParams,
    ) => {
      const poller = upgrade(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpgradeAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorUpgradeOptionalParams,
    ) => {
      return await upgrade(context, resourceGroupName, monitorName, options);
    },
  };
}

export function _getMonitorOperations(context: MicrosoftElasticContext): MonitorOperations {
  return {
    ..._getMonitor(context),
  };
}
