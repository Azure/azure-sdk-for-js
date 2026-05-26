// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { checkHealth, checkUpdates } from "../../api/updateSummariesOperationGroup/operations.js";
import type {
  UpdateSummariesOperationGroupCheckHealthOptionalParams,
  UpdateSummariesOperationGroupCheckUpdatesOptionalParams,
} from "../../api/updateSummariesOperationGroup/options.js";
import type { CheckUpdatesRequest } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a UpdateSummariesOperationGroup operations. */
export interface UpdateSummariesOperationGroupOperations {
  /** Check health of UpdateSummaries */
  checkHealth: (
    resourceGroupName: string,
    clusterName: string,
    options?: UpdateSummariesOperationGroupCheckHealthOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use checkHealth instead */
  beginCheckHealth: (
    resourceGroupName: string,
    clusterName: string,
    options?: UpdateSummariesOperationGroupCheckHealthOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use checkHealth instead */
  beginCheckHealthAndWait: (
    resourceGroupName: string,
    clusterName: string,
    options?: UpdateSummariesOperationGroupCheckHealthOptionalParams,
  ) => Promise<void>;
  /** Check for updates */
  checkUpdates: (
    resourceGroupName: string,
    clusterName: string,
    body: CheckUpdatesRequest,
    options?: UpdateSummariesOperationGroupCheckUpdatesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use checkUpdates instead */
  beginCheckUpdates: (
    resourceGroupName: string,
    clusterName: string,
    body: CheckUpdatesRequest,
    options?: UpdateSummariesOperationGroupCheckUpdatesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use checkUpdates instead */
  beginCheckUpdatesAndWait: (
    resourceGroupName: string,
    clusterName: string,
    body: CheckUpdatesRequest,
    options?: UpdateSummariesOperationGroupCheckUpdatesOptionalParams,
  ) => Promise<void>;
}

function _getUpdateSummariesOperationGroup(context: AzureStackHCIContext) {
  return {
    checkHealth: (
      resourceGroupName: string,
      clusterName: string,
      options?: UpdateSummariesOperationGroupCheckHealthOptionalParams,
    ) => checkHealth(context, resourceGroupName, clusterName, options),
    beginCheckHealth: async (
      resourceGroupName: string,
      clusterName: string,
      options?: UpdateSummariesOperationGroupCheckHealthOptionalParams,
    ) => {
      const poller = checkHealth(context, resourceGroupName, clusterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCheckHealthAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      options?: UpdateSummariesOperationGroupCheckHealthOptionalParams,
    ) => {
      return await checkHealth(context, resourceGroupName, clusterName, options);
    },
    checkUpdates: (
      resourceGroupName: string,
      clusterName: string,
      body: CheckUpdatesRequest,
      options?: UpdateSummariesOperationGroupCheckUpdatesOptionalParams,
    ) => checkUpdates(context, resourceGroupName, clusterName, body, options),
    beginCheckUpdates: async (
      resourceGroupName: string,
      clusterName: string,
      body: CheckUpdatesRequest,
      options?: UpdateSummariesOperationGroupCheckUpdatesOptionalParams,
    ) => {
      const poller = checkUpdates(context, resourceGroupName, clusterName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCheckUpdatesAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      body: CheckUpdatesRequest,
      options?: UpdateSummariesOperationGroupCheckUpdatesOptionalParams,
    ) => {
      return await checkUpdates(context, resourceGroupName, clusterName, body, options);
    },
  };
}

export function _getUpdateSummariesOperationGroupOperations(
  context: AzureStackHCIContext,
): UpdateSummariesOperationGroupOperations {
  return {
    ..._getUpdateSummariesOperationGroup(context),
  };
}
