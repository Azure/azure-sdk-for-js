// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext } from "../../api/platformValidationContext.js";
import { listBySubscription, get } from "../../api/validationTests/operations.js";
import {
  ValidationTestsListBySubscriptionOptionalParams,
  ValidationTestsGetOptionalParams,
} from "../../api/validationTests/options.js";
import { ValidationTest } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ValidationTests operations. */
export interface ValidationTestsOperations {
  /** List validation test catalog entries for a subscription */
  listBySubscription: (
    options?: ValidationTestsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ValidationTest>;
  /** Get a validation test catalog entry */
  get: (
    validationTestName: string,
    options?: ValidationTestsGetOptionalParams,
  ) => Promise<ValidationTest>;
}

function _getValidationTests(context: PlatformValidationContext) {
  return {
    listBySubscription: (options?: ValidationTestsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    get: (validationTestName: string, options?: ValidationTestsGetOptionalParams) =>
      get(context, validationTestName, options),
  };
}

export function _getValidationTestsOperations(
  context: PlatformValidationContext,
): ValidationTestsOperations {
  return {
    ..._getValidationTests(context),
  };
}
