// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogContext } from "../../api/microsoftDatadogContext.js";
import { resubscribe } from "../../api/organizations/operations.js";
import { OrganizationsResubscribeOptionalParams } from "../../api/organizations/options.js";
import { DatadogMonitorResource } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Organizations operations. */
export interface OrganizationsOperations {
  /** Reinstate integration with your Datadog organization by choosing one of the available subscription plans. */
  resubscribe: (
    resourceGroupName: string,
    monitorName: string,
    options?: OrganizationsResubscribeOptionalParams,
  ) => PollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource>;
  /** @deprecated use resubscribe instead */
  beginResubscribe: (
    resourceGroupName: string,
    monitorName: string,
    options?: OrganizationsResubscribeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource>>;
  /** @deprecated use resubscribe instead */
  beginResubscribeAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: OrganizationsResubscribeOptionalParams,
  ) => Promise<DatadogMonitorResource>;
}

function _getOrganizations(context: MicrosoftDatadogContext) {
  return {
    resubscribe: (
      resourceGroupName: string,
      monitorName: string,
      options?: OrganizationsResubscribeOptionalParams,
    ) => resubscribe(context, resourceGroupName, monitorName, options),
    beginResubscribe: async (
      resourceGroupName: string,
      monitorName: string,
      options?: OrganizationsResubscribeOptionalParams,
    ) => {
      const poller = resubscribe(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResubscribeAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: OrganizationsResubscribeOptionalParams,
    ) => {
      return await resubscribe(context, resourceGroupName, monitorName, options);
    },
  };
}

export function _getOrganizationsOperations(
  context: MicrosoftDatadogContext,
): OrganizationsOperations {
  return {
    ..._getOrganizations(context),
  };
}
