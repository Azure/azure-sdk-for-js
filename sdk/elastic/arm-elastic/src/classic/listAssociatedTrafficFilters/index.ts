// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { list } from "../../api/listAssociatedTrafficFilters/operations.js";
import type { ListAssociatedTrafficFiltersListOptionalParams } from "../../api/listAssociatedTrafficFilters/options.js";
import type { ElasticTrafficFilterResponse } from "../../models/models.js";

/** Interface representing a ListAssociatedTrafficFilters operations. */
export interface ListAssociatedTrafficFiltersOperations {
  /** List all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: ListAssociatedTrafficFiltersListOptionalParams,
  ) => Promise<ElasticTrafficFilterResponse>;
}

function _getListAssociatedTrafficFilters(context: MicrosoftElasticContext) {
  return {
    list: (
      resourceGroupName: string,
      monitorName: string,
      options?: ListAssociatedTrafficFiltersListOptionalParams,
    ) => list(context, resourceGroupName, monitorName, options),
  };
}

export function _getListAssociatedTrafficFiltersOperations(
  context: MicrosoftElasticContext,
): ListAssociatedTrafficFiltersOperations {
  return {
    ..._getListAssociatedTrafficFilters(context),
  };
}
