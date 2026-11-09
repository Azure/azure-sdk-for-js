// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { validate } from "../../api/ownershipVouchers/operations.js";
import type { OwnershipVouchersValidateOptionalParams } from "../../api/ownershipVouchers/options.js";
import type {
  ValidateOwnershipVouchersRequest,
  ValidateOwnershipVouchersResponse,
} from "../../models/models.js";

/** Interface representing a OwnershipVouchers operations. */
export interface OwnershipVouchersOperations {
  /** Validates ownership vouchers. */
  validate: (
    resourceGroupName: string,
    location: string,
    validationRequest: ValidateOwnershipVouchersRequest,
    options?: OwnershipVouchersValidateOptionalParams,
  ) => Promise<ValidateOwnershipVouchersResponse>;
}

function _getOwnershipVouchers(context: AzureStackHCIContext) {
  return {
    validate: (
      resourceGroupName: string,
      location: string,
      validationRequest: ValidateOwnershipVouchersRequest,
      options?: OwnershipVouchersValidateOptionalParams,
    ) => validate(context, resourceGroupName, location, validationRequest, options),
  };
}

export function _getOwnershipVouchersOperations(
  context: AzureStackHCIContext,
): OwnershipVouchersOperations {
  return {
    ..._getOwnershipVouchers(context),
  };
}
