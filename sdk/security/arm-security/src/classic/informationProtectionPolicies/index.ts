// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, createOrUpdate, get } from "../../api/informationProtectionPolicies/operations.js";
import type {
  InformationProtectionPoliciesListOptionalParams,
  InformationProtectionPoliciesCreateOrUpdateOptionalParams,
  InformationProtectionPoliciesGetOptionalParams,
} from "../../api/informationProtectionPolicies/options.js";
import type {
  InformationProtectionPolicy,
  InformationProtectionPolicyName,
} from "../../models/legacySettingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a InformationProtectionPolicies operations. */
export interface InformationProtectionPoliciesOperations {
  /** Information protection policies of a specific management group. */
  list: (
    scope: string,
    options?: InformationProtectionPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<InformationProtectionPolicy>;
  /** Details of the information protection policy. */
  createOrUpdate: (
    scope: string,
    informationProtectionPolicyName: InformationProtectionPolicyName,
    informationProtectionPolicy: InformationProtectionPolicy,
    options?: InformationProtectionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<InformationProtectionPolicy>;
  /** Details of the information protection policy. */
  get: (
    scope: string,
    informationProtectionPolicyName: InformationProtectionPolicyName,
    options?: InformationProtectionPoliciesGetOptionalParams,
  ) => Promise<InformationProtectionPolicy>;
}

function _getInformationProtectionPolicies(context: SecurityCenterContext) {
  return {
    list: (scope: string, options?: InformationProtectionPoliciesListOptionalParams) =>
      list(context, scope, options),
    createOrUpdate: (
      scope: string,
      informationProtectionPolicyName: InformationProtectionPolicyName,
      informationProtectionPolicy: InformationProtectionPolicy,
      options?: InformationProtectionPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        scope,
        informationProtectionPolicyName,
        informationProtectionPolicy,
        options,
      ),
    get: (
      scope: string,
      informationProtectionPolicyName: InformationProtectionPolicyName,
      options?: InformationProtectionPoliciesGetOptionalParams,
    ) => get(context, scope, informationProtectionPolicyName, options),
  };
}

export function _getInformationProtectionPoliciesOperations(
  context: SecurityCenterContext,
): InformationProtectionPoliciesOperations {
  return {
    ..._getInformationProtectionPolicies(context),
  };
}
