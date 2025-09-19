// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { $delete } from "../../api/trafficFilters/operations.js";
import type { TrafficFiltersDeleteOptionalParams } from "../../api/trafficFilters/options.js";

/** Interface representing a TrafficFilters operations. */
export interface TrafficFiltersOperations {
  /** Delete an existing traffic filter associated with your Elastic monitor resource, removing its network traffic control capabilities. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    options?: TrafficFiltersDeleteOptionalParams,
  ) => Promise<void>;
}

function _getTrafficFilters(context: MicrosoftElasticContext) {
  return {
    delete: (
      resourceGroupName: string,
      monitorName: string,
      options?: TrafficFiltersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, options),
  };
}

export function _getTrafficFiltersOperations(
  context: MicrosoftElasticContext,
): TrafficFiltersOperations {
  return {
    ..._getTrafficFilters(context),
  };
}
