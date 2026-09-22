// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { list } from "../../api/allTrafficFilters/operations.js";
import type { AllTrafficFiltersListOptionalParams } from "../../api/allTrafficFilters/options.js";
import type { ElasticTrafficFilterResponse } from "../../models/models.js";

/** Interface representing a AllTrafficFilters operations. */
export interface AllTrafficFiltersOperations {
  /** List all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control. */
  list: (
    resourceGroupName: string,
    monitorName: string,
    options?: AllTrafficFiltersListOptionalParams,
  ) => Promise<ElasticTrafficFilterResponse>;
}

function _getAllTrafficFilters(context: MicrosoftElasticContext) {
  return {
    list: (
      resourceGroupName: string,
      monitorName: string,
      options?: AllTrafficFiltersListOptionalParams,
    ) => list(context, resourceGroupName, monitorName, options),
  };
}

export function _getAllTrafficFiltersOperations(
  context: MicrosoftElasticContext,
): AllTrafficFiltersOperations {
  return {
    ..._getAllTrafficFilters(context),
  };
}
