// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { $delete } from "../../api/detachAndDeleteTrafficFilter/operations.js";
import type { DetachAndDeleteTrafficFilterDeleteOptionalParams } from "../../api/detachAndDeleteTrafficFilter/options.js";

/** Interface representing a DetachAndDeleteTrafficFilter operations. */
export interface DetachAndDeleteTrafficFilterOperations {
  /** Detach and delete an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    options?: DetachAndDeleteTrafficFilterDeleteOptionalParams,
  ) => Promise<void>;
}

function _getDetachAndDeleteTrafficFilter(context: MicrosoftElasticContext) {
  return {
    delete: (
      resourceGroupName: string,
      monitorName: string,
      options?: DetachAndDeleteTrafficFilterDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, options),
  };
}

export function _getDetachAndDeleteTrafficFilterOperations(
  context: MicrosoftElasticContext,
): DetachAndDeleteTrafficFilterOperations {
  return {
    ..._getDetachAndDeleteTrafficFilter(context),
  };
}
