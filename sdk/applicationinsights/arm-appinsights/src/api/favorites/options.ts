// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FavoriteType, FavoriteSourceType } from "../../models/favorites/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FavoritesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FavoritesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FavoritesAddOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FavoritesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FavoritesListOptionalParams extends OperationOptions {
  /** The type of favorite. Value can be either shared or user. */
  favoriteType?: FavoriteType;
  /** Source type of favorite to return. When left out, the source type defaults to 'other' (not present in this enum). */
  sourceType?: FavoriteSourceType;
  /** Flag indicating whether or not to return the full content for each applicable favorite. If false, only return summary content for favorites. */
  canFetchContent?: boolean;
  /** Tags that must be present on each favorite returned. */
  tags?: string[];
}
