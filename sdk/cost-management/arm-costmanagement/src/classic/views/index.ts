// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext } from "../../api/costManagementContext.js";
import {
  listByScope,
  deleteByScope,
  createOrUpdateByScope,
  getByScope,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/views/operations.js";
import type {
  ViewsListByScopeOptionalParams,
  ViewsDeleteByScopeOptionalParams,
  ViewsCreateOrUpdateByScopeOptionalParams,
  ViewsGetByScopeOptionalParams,
  ViewsListOptionalParams,
  ViewsDeleteOptionalParams,
  ViewsCreateOrUpdateOptionalParams,
  ViewsGetOptionalParams,
} from "../../api/views/options.js";
import type { View } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Views operations. */
export interface ViewsOperations {
  /** Lists all views at the given scope. */
  listByScope: (
    scope: string,
    options?: ViewsListByScopeOptionalParams,
  ) => PagedAsyncIterableIterator<View>;
  /** The operation to delete a view. */
  deleteByScope: (
    scope: string,
    viewName: string,
    options?: ViewsDeleteByScopeOptionalParams,
  ) => Promise<void>;
  /** The operation to create or update a view. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag. */
  createOrUpdateByScope: (
    scope: string,
    viewName: string,
    parameters: View,
    options?: ViewsCreateOrUpdateByScopeOptionalParams,
  ) => Promise<View>;
  /** Gets the view for the defined scope by view name. */
  getByScope: (
    scope: string,
    viewName: string,
    options?: ViewsGetByScopeOptionalParams,
  ) => Promise<View>;
  /** Lists all views by tenant and object. */
  list: (options?: ViewsListOptionalParams) => PagedAsyncIterableIterator<View>;
  /** The operation to delete a view. */
  delete: (viewName: string, options?: ViewsDeleteOptionalParams) => Promise<void>;
  /** The operation to create or update a view. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag. */
  createOrUpdate: (
    viewName: string,
    parameters: View,
    options?: ViewsCreateOrUpdateOptionalParams,
  ) => Promise<View>;
  /** Gets the view by view name. */
  get: (viewName: string, options?: ViewsGetOptionalParams) => Promise<View>;
}

function _getViews(context: CostManagementContext) {
  return {
    listByScope: (scope: string, options?: ViewsListByScopeOptionalParams) =>
      listByScope(context, scope, options),
    deleteByScope: (scope: string, viewName: string, options?: ViewsDeleteByScopeOptionalParams) =>
      deleteByScope(context, scope, viewName, options),
    createOrUpdateByScope: (
      scope: string,
      viewName: string,
      parameters: View,
      options?: ViewsCreateOrUpdateByScopeOptionalParams,
    ) => createOrUpdateByScope(context, scope, viewName, parameters, options),
    getByScope: (scope: string, viewName: string, options?: ViewsGetByScopeOptionalParams) =>
      getByScope(context, scope, viewName, options),
    list: (options?: ViewsListOptionalParams) => list(context, options),
    delete: (viewName: string, options?: ViewsDeleteOptionalParams) =>
      $delete(context, viewName, options),
    createOrUpdate: (
      viewName: string,
      parameters: View,
      options?: ViewsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, viewName, parameters, options),
    get: (viewName: string, options?: ViewsGetOptionalParams) => get(context, viewName, options),
  };
}

export function _getViewsOperations(context: CostManagementContext): ViewsOperations {
  return {
    ..._getViews(context),
  };
}
