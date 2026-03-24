// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import { validate } from "../../api/address/operations.js";
import type { AddressValidateOptionalParams } from "../../api/address/options.js";
import type { AddressDetails, AddressValidationResponse } from "../../models/models.js";

/** Interface representing a Address operations. */
export interface AddressOperations {
  /** Validates an address. Use the operation to validate an address before using it as soldTo or a billTo address. */
  validate: (
    parameters: AddressDetails,
    options?: AddressValidateOptionalParams,
  ) => Promise<AddressValidationResponse>;
}

function _getAddress(context: BillingManagementContext) {
  return {
    validate: (parameters: AddressDetails, options?: AddressValidateOptionalParams) =>
      validate(context, parameters, options),
  };
}

export function _getAddressOperations(context: BillingManagementContext): AddressOperations {
  return {
    ..._getAddress(context),
  };
}
