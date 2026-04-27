// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/securityOperators/operations.js";
import type {
  SecurityOperatorsListOptionalParams,
  SecurityOperatorsDeleteOptionalParams,
  SecurityOperatorsCreateOrUpdateOptionalParams,
  SecurityOperatorsGetOptionalParams,
} from "../../api/securityOperators/options.js";
import type { SecurityOperator } from "../../models/securityOperatorsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SecurityOperators operations. */
export interface SecurityOperatorsOperations {
  /** Lists Microsoft Defender for Cloud securityOperators in the subscription. */
  list: (
    pricingName: string,
    options?: SecurityOperatorsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityOperator>;
  /** Delete Microsoft Defender for Cloud securityOperator in the subscription. */
  delete: (
    pricingName: string,
    securityOperatorName: string,
    options?: SecurityOperatorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates Microsoft Defender for Cloud security operator on the given scope. */
  createOrUpdate: (
    pricingName: string,
    securityOperatorName: string,
    options?: SecurityOperatorsCreateOrUpdateOptionalParams,
  ) => Promise<SecurityOperator>;
  /** Get a specific security operator for the requested scope. */
  get: (
    pricingName: string,
    securityOperatorName: string,
    options?: SecurityOperatorsGetOptionalParams,
  ) => Promise<SecurityOperator>;
}

function _getSecurityOperators(context: SecurityCenterContext) {
  return {
    list: (pricingName: string, options?: SecurityOperatorsListOptionalParams) =>
      list(context, pricingName, options),
    delete: (
      pricingName: string,
      securityOperatorName: string,
      options?: SecurityOperatorsDeleteOptionalParams,
    ) => $delete(context, pricingName, securityOperatorName, options),
    createOrUpdate: (
      pricingName: string,
      securityOperatorName: string,
      options?: SecurityOperatorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, pricingName, securityOperatorName, options),
    get: (
      pricingName: string,
      securityOperatorName: string,
      options?: SecurityOperatorsGetOptionalParams,
    ) => get(context, pricingName, securityOperatorName, options),
  };
}

export function _getSecurityOperatorsOperations(
  context: SecurityCenterContext,
): SecurityOperatorsOperations {
  return {
    ..._getSecurityOperators(context),
  };
}
