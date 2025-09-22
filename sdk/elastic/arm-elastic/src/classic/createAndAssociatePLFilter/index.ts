// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { create } from "../../api/createAndAssociatePLFilter/operations.js";
import type { CreateAndAssociatePLFilterCreateOptionalParams } from "../../api/createAndAssociatePLFilter/options.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CreateAndAssociatePLFilter operations. */
export interface CreateAndAssociatePLFilterOperations {
  /** Create and associate a PL filter with your Elastic monitor resource to control and manage network traffic. */
  create: (
    resourceGroupName: string,
    monitorName: string,
    options?: CreateAndAssociatePLFilterCreateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getCreateAndAssociatePLFilter(context: MicrosoftElasticContext) {
  return {
    create: (
      resourceGroupName: string,
      monitorName: string,
      options?: CreateAndAssociatePLFilterCreateOptionalParams,
    ) => create(context, resourceGroupName, monitorName, options),
  };
}

export function _getCreateAndAssociatePLFilterOperations(
  context: MicrosoftElasticContext,
): CreateAndAssociatePLFilterOperations {
  return {
    ..._getCreateAndAssociatePLFilter(context),
  };
}
