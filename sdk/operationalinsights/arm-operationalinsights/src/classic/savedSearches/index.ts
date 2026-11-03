// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import {
  listByWorkspace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/savedSearches/operations.js";
import {
  SavedSearchesListByWorkspaceOptionalParams,
  SavedSearchesDeleteOptionalParams,
  SavedSearchesCreateOrUpdateOptionalParams,
  SavedSearchesGetOptionalParams,
} from "../../api/savedSearches/options.js";
import { SavedSearch, SavedSearchesListResult } from "../../models/models.js";

/** Interface representing a SavedSearches operations. */
export interface SavedSearchesOperations {
  /** Gets the saved searches for a given Log Analytics Workspace */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: SavedSearchesListByWorkspaceOptionalParams,
  ) => Promise<SavedSearchesListResult>;
  /** Deletes the specified saved search in a given workspace. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    savedSearchId: string,
    options?: SavedSearchesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a saved search for a given workspace. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    savedSearchId: string,
    parameters: SavedSearch,
    options?: SavedSearchesCreateOrUpdateOptionalParams,
  ) => Promise<SavedSearch>;
  /** Gets the specified saved search for a given workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    savedSearchId: string,
    options?: SavedSearchesGetOptionalParams,
  ) => Promise<SavedSearch>;
}

function _getSavedSearches(context: OperationalInsightsManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: SavedSearchesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      savedSearchId: string,
      options?: SavedSearchesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, savedSearchId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      savedSearchId: string,
      parameters: SavedSearch,
      options?: SavedSearchesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, workspaceName, savedSearchId, parameters, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      savedSearchId: string,
      options?: SavedSearchesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, savedSearchId, options),
  };
}

export function _getSavedSearchesOperations(
  context: OperationalInsightsManagementContext,
): SavedSearchesOperations {
  return {
    ..._getSavedSearches(context),
  };
}
