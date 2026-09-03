// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import { validate } from "../../api/benefit/operations.js";
import { BenefitValidateOptionalParams } from "../../api/benefit/options.js";
import { BenefitValidateRequest, BenefitValidateResponse } from "../../models/models.js";

/** Interface representing a Benefit operations. */
export interface BenefitOperations {
  /** Validate savings plan purchase. */
  validate: (
    body: BenefitValidateRequest,
    options?: BenefitValidateOptionalParams,
  ) => Promise<BenefitValidateResponse>;
}

function _getBenefit(context: BillingBenefitsRPContext) {
  return {
    validate: (body: BenefitValidateRequest, options?: BenefitValidateOptionalParams) =>
      validate(context, body, options),
  };
}

export function _getBenefitOperations(context: BillingBenefitsRPContext): BenefitOperations {
  return {
    ..._getBenefit(context),
  };
}
