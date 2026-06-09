// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, get } from "../../api/defaultSecurityRules/operations.js";
import {
  DefaultSecurityRulesListOptionalParams,
  DefaultSecurityRulesGetOptionalParams,
} from "../../api/defaultSecurityRules/options.js";
import { SecurityRule } from "../../models/common/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DefaultSecurityRules operations. */
export interface DefaultSecurityRulesOperations {
  /** Gets all default security rules in a network security group. */
  list: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    options?: DefaultSecurityRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityRule>;
  /** Get the specified default network security rule. */
  get: (
    resourceGroupName: string,
    networkSecurityGroupName: string,
    defaultSecurityRuleName: string,
    options?: DefaultSecurityRulesGetOptionalParams,
  ) => Promise<SecurityRule>;
}

function _getDefaultSecurityRules(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      options?: DefaultSecurityRulesListOptionalParams,
    ) => list(context, resourceGroupName, networkSecurityGroupName, options),
    get: (
      resourceGroupName: string,
      networkSecurityGroupName: string,
      defaultSecurityRuleName: string,
      options?: DefaultSecurityRulesGetOptionalParams,
    ) =>
      get(context, resourceGroupName, networkSecurityGroupName, defaultSecurityRuleName, options),
  };
}

export function _getDefaultSecurityRulesOperations(
  context: NetworkManagementContext,
): DefaultSecurityRulesOperations {
  return {
    ..._getDefaultSecurityRules(context),
  };
}
