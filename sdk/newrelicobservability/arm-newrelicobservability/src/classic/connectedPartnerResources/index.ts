// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservabilityContext } from "../../api/newRelicObservabilityContext.js";
import { list } from "../../api/connectedPartnerResources/operations.js";
import { ConnectedPartnerResourcesListOptionalParams } from "../../api/connectedPartnerResources/options.js";
import { ConnectedPartnerResourcesListFormat } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
