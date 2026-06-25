// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import { get } from "../../api/tags/operations.js";
import { TagsGetOptionalParams } from "../../api/tags/options.js";
import { TagsResult } from "../../models/models.js";

/** Interface representing a Tags operations. */
export interface TagsOperations {
  /** Get all available tag keys for the defined scope */
  get: (scope: string, options?: TagsGetOptionalParams) => Promise<TagsResult | undefined>;
}

function _getTags(context: ConsumptionManagementContext) {
  return {
    get: (scope: string, options?: TagsGetOptionalParams) => get(context, scope, options),
  };
}

export function _getTagsOperations(context: ConsumptionManagementContext): TagsOperations {
  return {
    ..._getTags(context),
  };
}
