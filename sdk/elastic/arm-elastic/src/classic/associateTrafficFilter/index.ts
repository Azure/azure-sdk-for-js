// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { associate } from "../../api/associateTrafficFilter/operations.js";
import type { AssociateTrafficFilterAssociateOptionalParams } from "../../api/associateTrafficFilter/options.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AssociateTrafficFilter operations. */
export interface AssociateTrafficFilterOperations {
  /** Associate a traffic filter with your Elastic monitor resource to control and manage network traffic. */
  associate: (
    resourceGroupName: string,
    monitorName: string,
    options?: AssociateTrafficFilterAssociateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getAssociateTrafficFilter(context: MicrosoftElasticContext) {
  return {
    associate: (
      resourceGroupName: string,
      monitorName: string,
      options?: AssociateTrafficFilterAssociateOptionalParams,
    ) => associate(context, resourceGroupName, monitorName, options),
  };
}

export function _getAssociateTrafficFilterOperations(
  context: MicrosoftElasticContext,
): AssociateTrafficFilterOperations {
  return {
    ..._getAssociateTrafficFilter(context),
  };
}
