// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { $delete, update, add, get, list } from "../../api/favorites/operations.js";
import {
  FavoritesDeleteOptionalParams,
  FavoritesUpdateOptionalParams,
  FavoritesAddOptionalParams,
  FavoritesGetOptionalParams,
  FavoritesListOptionalParams,
} from "../../api/favorites/options.js";
import { ApplicationInsightsComponentFavorite } from "../../models/favorites/models.js";

/** Interface representing a Favorites operations. */
export interface FavoritesOperations {
  /** Remove a favorite that is associated to an Application Insights component. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    favoriteId: string,
    options?: FavoritesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a favorite that has already been added to an Application Insights component. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    favoriteId: string,
    favoriteProperties: ApplicationInsightsComponentFavorite,
    options?: FavoritesUpdateOptionalParams,
  ) => Promise<ApplicationInsightsComponentFavorite>;
  /** Adds a new favorites to an Application Insights component. */
  add: (
    resourceGroupName: string,
    resourceName: string,
    favoriteId: string,
    favoriteProperties: ApplicationInsightsComponentFavorite,
    options?: FavoritesAddOptionalParams,
  ) => Promise<ApplicationInsightsComponentFavorite>;
  /** Get a single favorite by its FavoriteId, defined within an Application Insights component. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    favoriteId: string,
    options?: FavoritesGetOptionalParams,
  ) => Promise<ApplicationInsightsComponentFavorite>;
  /** Gets a list of favorites defined within an Application Insights component. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: FavoritesListOptionalParams,
  ) => Promise<ApplicationInsightsComponentFavorite[]>;
}

function _getFavorites(context: ApplicationInsightsManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      resourceName: string,
      favoriteId: string,
      options?: FavoritesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, favoriteId, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      favoriteId: string,
      favoriteProperties: ApplicationInsightsComponentFavorite,
      options?: FavoritesUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, favoriteId, favoriteProperties, options),
    add: (
      resourceGroupName: string,
      resourceName: string,
      favoriteId: string,
      favoriteProperties: ApplicationInsightsComponentFavorite,
      options?: FavoritesAddOptionalParams,
    ) => add(context, resourceGroupName, resourceName, favoriteId, favoriteProperties, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      favoriteId: string,
      options?: FavoritesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, favoriteId, options),
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: FavoritesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
  };
}

export function _getFavoritesOperations(
  context: ApplicationInsightsManagementContext,
): FavoritesOperations {
  return {
    ..._getFavorites(context),
  };
}
