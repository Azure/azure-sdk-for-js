// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { listBySubscription, list } from "../../api/secureScoreControlDefinitions/operations.js";
import {
  SecureScoreControlDefinitionsListBySubscriptionOptionalParams,
  SecureScoreControlDefinitionsListOptionalParams,
} from "../../api/secureScoreControlDefinitions/options.js";
import { SecureScoreControlDefinitionItem } from "../../models/secureScoreAPI/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SecureScoreControlDefinitions operations. */
export interface SecureScoreControlDefinitionsOperations {
  /** For a specified subscription, list the available security controls, their assessments, and the max score */
  listBySubscription: (
    options?: SecureScoreControlDefinitionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SecureScoreControlDefinitionItem>;
  /** List the available security controls, their assessments, and the max score */
  list: (
    options?: SecureScoreControlDefinitionsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecureScoreControlDefinitionItem>;
}

function _getSecureScoreControlDefinitions(context: SecurityCenterContext) {
  return {
    listBySubscription: (options?: SecureScoreControlDefinitionsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (options?: SecureScoreControlDefinitionsListOptionalParams) => list(context, options),
  };
}

export function _getSecureScoreControlDefinitionsOperations(
  context: SecurityCenterContext,
): SecureScoreControlDefinitionsOperations {
  return {
    ..._getSecureScoreControlDefinitions(context),
  };
}
