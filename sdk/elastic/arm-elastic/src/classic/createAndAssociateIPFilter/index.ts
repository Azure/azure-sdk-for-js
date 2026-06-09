// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { create } from "../../api/createAndAssociateIPFilter/operations.js";
import type { CreateAndAssociateIPFilterCreateOptionalParams } from "../../api/createAndAssociateIPFilter/options.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CreateAndAssociateIPFilter operations. */
export interface CreateAndAssociateIPFilterOperations {
  /** Create and associate an IP filter with your Elastic monitor resource to control and manage network traffic. */
  create: (
    resourceGroupName: string,
    monitorName: string,
    options?: CreateAndAssociateIPFilterCreateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getCreateAndAssociateIPFilter(context: MicrosoftElasticContext) {
  return {
    create: (
      resourceGroupName: string,
      monitorName: string,
      options?: CreateAndAssociateIPFilterCreateOptionalParams,
    ) => create(context, resourceGroupName, monitorName, options),
  };
}

export function _getCreateAndAssociateIPFilterOperations(
  context: MicrosoftElasticContext,
): CreateAndAssociateIPFilterOperations {
  return {
    ..._getCreateAndAssociateIPFilter(context),
  };
}
