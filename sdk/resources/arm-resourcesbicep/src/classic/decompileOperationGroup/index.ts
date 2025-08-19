// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BicepContext } from "../../api/bicepContext.js";
import {
  DecompileOperationRequest,
  DecompileOperationSuccessResponse,
} from "../../models/models.js";
import { DecompileOperationGroupBicepOptionalParams } from "../../api/decompileOperationGroup/options.js";
import { bicep } from "../../api/decompileOperationGroup/operations.js";

/** Interface representing a DecompileOperationGroup operations. */
export interface DecompileOperationGroupOperations {
  /** Decompiles an ARM json template into a Bicep template */
  bicep: (
    decompileOperationRequest: DecompileOperationRequest,
    options?: DecompileOperationGroupBicepOptionalParams,
  ) => Promise<DecompileOperationSuccessResponse>;
}

function _getDecompileOperationGroup(context: BicepContext) {
  return {
    bicep: (
      decompileOperationRequest: DecompileOperationRequest,
      options?: DecompileOperationGroupBicepOptionalParams,
    ) => bicep(context, decompileOperationRequest, options),
  };
}

export function _getDecompileOperationGroupOperations(
  context: BicepContext,
): DecompileOperationGroupOperations {
  return {
    ..._getDecompileOperationGroup(context),
  };
}
