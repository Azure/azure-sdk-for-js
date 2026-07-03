// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftDatadogContext } from "../../api/microsoftDatadogContext.js";
import { linkSaaS, latestLinkedSaaS } from "../../api/datadogMonitorResources/operations.js";
import type {
  DatadogMonitorResourcesLinkSaaSOptionalParams,
  DatadogMonitorResourcesLatestLinkedSaaSOptionalParams,
} from "../../api/datadogMonitorResources/options.js";
import type {
  LatestLinkedSaaSResponse,
  SaaSData,
  DatadogMonitorResource,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DatadogMonitorResources operations. */
export interface DatadogMonitorResourcesOperations {
  /** Links a new SaaS to the Datadog organization of the underlying monitor. */
  linkSaaS: (
    resourceGroupName: string,
    monitorName: string,
    body: SaaSData,
    options?: DatadogMonitorResourcesLinkSaaSOptionalParams,
  ) => PollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource>;
  /** @deprecated use linkSaaS instead */
  beginLinkSaaS: (
    resourceGroupName: string,
    monitorName: string,
    body: SaaSData,
    options?: DatadogMonitorResourcesLinkSaaSOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource>>;
  /** @deprecated use linkSaaS instead */
  beginLinkSaaSAndWait: (
    resourceGroupName: string,
    monitorName: string,
    body: SaaSData,
    options?: DatadogMonitorResourcesLinkSaaSOptionalParams,
  ) => Promise<DatadogMonitorResource>;
  /** Returns the latest SaaS linked to the Datadog organization of the underlying monitor. */
  latestLinkedSaaS: (
    resourceGroupName: string,
    monitorName: string,
    options?: DatadogMonitorResourcesLatestLinkedSaaSOptionalParams,
  ) => Promise<LatestLinkedSaaSResponse>;
}

function _getDatadogMonitorResources(context: MicrosoftDatadogContext) {
  return {
    linkSaaS: (
      resourceGroupName: string,
      monitorName: string,
      body: SaaSData,
      options?: DatadogMonitorResourcesLinkSaaSOptionalParams,
    ) => linkSaaS(context, resourceGroupName, monitorName, body, options),
    beginLinkSaaS: async (
      resourceGroupName: string,
      monitorName: string,
      body: SaaSData,
      options?: DatadogMonitorResourcesLinkSaaSOptionalParams,
    ) => {
      const poller = linkSaaS(context, resourceGroupName, monitorName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginLinkSaaSAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      body: SaaSData,
      options?: DatadogMonitorResourcesLinkSaaSOptionalParams,
    ) => {
      return await linkSaaS(context, resourceGroupName, monitorName, body, options);
    },
    latestLinkedSaaS: (
      resourceGroupName: string,
      monitorName: string,
      options?: DatadogMonitorResourcesLatestLinkedSaaSOptionalParams,
    ) => latestLinkedSaaS(context, resourceGroupName, monitorName, options),
  };
}

export function _getDatadogMonitorResourcesOperations(
  context: MicrosoftDatadogContext,
): DatadogMonitorResourcesOperations {
  return {
    ..._getDatadogMonitorResources(context),
  };
}
