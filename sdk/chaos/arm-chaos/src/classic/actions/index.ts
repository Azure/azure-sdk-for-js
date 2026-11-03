// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { list, get } from "../../api/actions/operations.js";
import type {
  ActionsListOptionalParams,
  ActionsGetOptionalParams,
} from "../../api/actions/options.js";
import type { Action } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Actions operations. */
export interface ActionsOperations {
  /** Get a list of Action resources for a given location. */
  list: (
    location: string,
    options?: ActionsListOptionalParams,
  ) => PagedAsyncIterableIterator<Action>;
  /** Get an Action resource for a given location. */
  get: (
    location: string,
    actionName: string,
    options?: ActionsGetOptionalParams,
  ) => Promise<Action>;
}

function _getActions(context: ChaosManagementContext) {
  return {
    list: (location: string, options?: ActionsListOptionalParams) =>
      list(context, location, options),
    get: (location: string, actionName: string, options?: ActionsGetOptionalParams) =>
      get(context, location, actionName, options),
  };
}

export function _getActionsOperations(context: ChaosManagementContext): ActionsOperations {
  return {
    ..._getActions(context),
  };
}
