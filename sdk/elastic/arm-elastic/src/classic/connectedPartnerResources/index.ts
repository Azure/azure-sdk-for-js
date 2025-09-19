// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { list } from "../../api/connectedPartnerResources/operations.js";
import type { ConnectedPartnerResourcesListOptionalParams } from "../../api/connectedPartnerResources/options.js";
import type { ConnectedPartnerResourcesListFormat } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ConnectedPartnerResources operations. */
export interface ConnectedPartnerResourcesOperations {
  /** List all active deployments associated with the marketplace subscription linked to the given Elastic monitor resource. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: ConnectedPartnerResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectedPartnerResourcesListFormat>;
}

function _getConnectedPartnerResources(context: MicrosoftElasticContext) {
  return {
    list: (
      resourceGroupName: string,
      monitorName: string,
      options?: ConnectedPartnerResourcesListOptionalParams,
    ) => list(context, resourceGroupName, monitorName, options),
  };
}

export function _getConnectedPartnerResourcesOperations(
  context: MicrosoftElasticContext,
): ConnectedPartnerResourcesOperations {
  return {
    ..._getConnectedPartnerResources(context),
  };
}
