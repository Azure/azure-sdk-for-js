// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { list, get } from "../../api/actionVersions/operations.js";
import {
  ActionVersionsListOptionalParams,
  ActionVersionsGetOptionalParams,
} from "../../api/actionVersions/options.js";
import { ActionVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ActionVersions operations. */
export interface ActionVersionsOperations {
  /** Get a list of Action Version resources for a given location and action. */
  list: (
    location: string,
    actionName: string,
    options?: ActionVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ActionVersion>;
  /** Get an Action Version resource for a given location and action. */
  get: (
    location: string,
    actionName: string,
    versionName: string,
    options?: ActionVersionsGetOptionalParams,
  ) => Promise<ActionVersion>;
}

function _getActionVersions(context: ChaosManagementContext) {
  return {
    list: (location: string, actionName: string, options?: ActionVersionsListOptionalParams) =>
      list(context, location, actionName, options),
    get: (
      location: string,
      actionName: string,
      versionName: string,
      options?: ActionVersionsGetOptionalParams,
    ) => get(context, location, actionName, versionName, options),
  };
}

export function _getActionVersionsOperations(
  context: ChaosManagementContext,
): ActionVersionsOperations {
  return {
    ..._getActionVersions(context),
  };
}
