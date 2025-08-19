// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { TargetType } from "../../models/models.js";
import {
  TargetTypesListOptionalParams,
  TargetTypesGetOptionalParams,
} from "../../api/targetTypes/options.js";
import { list, get } from "../../api/targetTypes/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TargetTypes operations. */
export interface TargetTypesOperations {
  /** Get a list of Target Type resources for given location. */
  list: (
    location: string,
    options?: TargetTypesListOptionalParams,
  ) => PagedAsyncIterableIterator<TargetType>;
  /** Get a Target Type resources for given location. */
  get: (
    location: string,
    targetTypeName: string,
    options?: TargetTypesGetOptionalParams,
  ) => Promise<TargetType>;
}

function _getTargetTypes(context: ChaosManagementContext) {
  return {
    list: (location: string, options?: TargetTypesListOptionalParams) =>
      list(context, location, options),
    get: (location: string, targetTypeName: string, options?: TargetTypesGetOptionalParams) =>
      get(context, location, targetTypeName, options),
  };
}

export function _getTargetTypesOperations(context: ChaosManagementContext): TargetTypesOperations {
  return {
    ..._getTargetTypes(context),
  };
}
