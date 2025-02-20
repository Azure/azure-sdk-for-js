// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactContext } from "../../api/impactContext.js";
import {
  impactCategoriesListBySubscription,
  impactCategoriesGet,
} from "../../api/impactCategories/index.js";
import { ImpactCategory } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import {
  ImpactCategoriesListBySubscriptionOptionalParams,
  ImpactCategoriesGetOptionalParams,
} from "../../api/options.js";

/** Interface representing a ImpactCategories operations. */
export interface ImpactCategoriesOperations {
  /** List ImpactCategory resources by subscription */
  listBySubscription: (
    resourceType: string,
    options?: ImpactCategoriesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ImpactCategory>;
  /** Get a ImpactCategory */
  get: (
    impactCategoryName: string,
    options?: ImpactCategoriesGetOptionalParams,
  ) => Promise<ImpactCategory>;
}

function _getImpactCategories(context: ImpactContext) {
  return {
    listBySubscription: (
      resourceType: string,
      options?: ImpactCategoriesListBySubscriptionOptionalParams,
    ) => impactCategoriesListBySubscription(context, resourceType, options),
    get: (impactCategoryName: string, options?: ImpactCategoriesGetOptionalParams) =>
      impactCategoriesGet(context, impactCategoryName, options),
  };
}

export function _getImpactCategoriesOperations(context: ImpactContext): ImpactCategoriesOperations {
  return {
    ..._getImpactCategories(context),
  };
}
