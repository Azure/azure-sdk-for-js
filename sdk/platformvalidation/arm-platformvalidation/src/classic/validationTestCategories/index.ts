// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformValidationContext } from "../../api/platformValidationContext.js";
import { listBySubscription, get } from "../../api/validationTestCategories/operations.js";
import type {
  ValidationTestCategoriesListBySubscriptionOptionalParams,
  ValidationTestCategoriesGetOptionalParams,
} from "../../api/validationTestCategories/options.js";
import type { ValidationTestCategory } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ValidationTestCategories operations. */
export interface ValidationTestCategoriesOperations {
  /** List validation test category catalog entries for a subscription */
  listBySubscription: (
    options?: ValidationTestCategoriesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ValidationTestCategory>;
  /** Get a validation test category catalog entry */
  get: (
    validationTestCategoryName: string,
    options?: ValidationTestCategoriesGetOptionalParams,
  ) => Promise<ValidationTestCategory>;
}

function _getValidationTestCategories(context: PlatformValidationContext) {
  return {
    listBySubscription: (options?: ValidationTestCategoriesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    get: (
      validationTestCategoryName: string,
      options?: ValidationTestCategoriesGetOptionalParams,
    ) => get(context, validationTestCategoryName, options),
  };
}

export function _getValidationTestCategoriesOperations(
  context: PlatformValidationContext,
): ValidationTestCategoriesOperations {
  return {
    ..._getValidationTestCategories(context),
  };
}
