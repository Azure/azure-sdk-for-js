// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import { list } from "../../api/managedRuleSets/operations.js";
import type { ManagedRuleSetsListOptionalParams } from "../../api/managedRuleSets/options.js";
import type { ManagedRuleSetDefinition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedRuleSets operations. */
export interface ManagedRuleSetsOperations {
  /** Lists all available managed rule sets. */
  list: (
    options?: ManagedRuleSetsListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedRuleSetDefinition>;
}

function _getManagedRuleSets(context: FrontDoorManagementContext) {
  return {
    list: (options?: ManagedRuleSetsListOptionalParams) => list(context, options),
  };
}

export function _getManagedRuleSetsOperations(
  context: FrontDoorManagementContext,
): ManagedRuleSetsOperations {
  return {
    ..._getManagedRuleSets(context),
  };
}
