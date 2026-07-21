// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NewRelicObservabilityContext } from "../../api/newRelicObservabilityContext.js";
import { list } from "../../api/connectedPartnerResources/operations.js";
import type { ConnectedPartnerResourcesListOptionalParams } from "../../api/connectedPartnerResources/options.js";
import type { ConnectedPartnerResourcesListFormat } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectedPartnerResources operations. */
export interface ConnectedPartnerResourcesOperations {
  /** A synchronous resource action. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: ConnectedPartnerResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectedPartnerResourcesListFormat>;
}

function _getConnectedPartnerResources(context: NewRelicObservabilityContext) {
  return {
    list: (
      resourceGroupName: string,
      monitorName: string,
      options?: ConnectedPartnerResourcesListOptionalParams,
    ) => list(context, resourceGroupName, monitorName, options),
  };
}

export function _getConnectedPartnerResourcesOperations(
  context: NewRelicObservabilityContext,
): ConnectedPartnerResourcesOperations {
  return {
    ..._getConnectedPartnerResources(context),
  };
}
