// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { update } from "../../api/detachTrafficFilter/operations.js";
import type { DetachTrafficFilterUpdateOptionalParams } from "../../api/detachTrafficFilter/options.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DetachTrafficFilter operations. */
export interface DetachTrafficFilterOperations {
  /** Detach an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities. */
  update: (
    resourceGroupName: string,
    monitorName: string,
    options?: DetachTrafficFilterUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getDetachTrafficFilter(context: MicrosoftElasticContext) {
  return {
    update: (
      resourceGroupName: string,
      monitorName: string,
      options?: DetachTrafficFilterUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, options),
  };
}

export function _getDetachTrafficFilterOperations(
  context: MicrosoftElasticContext,
): DetachTrafficFilterOperations {
  return {
    ..._getDetachTrafficFilter(context),
  };
}
