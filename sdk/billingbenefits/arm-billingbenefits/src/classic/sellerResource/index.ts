// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import { list } from "../../api/sellerResource/operations.js";
import { SellerResourceListOptionalParams } from "../../api/sellerResource/options.js";
import { Macc, SellerResourceListRequest } from "../../models/models.js";

/** Interface representing a SellerResource operations. */
export interface SellerResourceOperations {
  /** List maccs by billing account */
  list: (
    body: SellerResourceListRequest,
    options?: SellerResourceListOptionalParams,
  ) => Promise<Macc[]>;
}

function _getSellerResource(context: BillingBenefitsRPContext) {
  return {
    list: (body: SellerResourceListRequest, options?: SellerResourceListOptionalParams) =>
      list(context, body, options),
  };
}

export function _getSellerResourceOperations(
  context: BillingBenefitsRPContext,
): SellerResourceOperations {
  return {
    ..._getSellerResource(context),
  };
}
