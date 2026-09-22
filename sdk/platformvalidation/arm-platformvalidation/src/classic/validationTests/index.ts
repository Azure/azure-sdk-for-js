// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformValidationContext } from "../../api/platformValidationContext.js";
import { listBySubscription, get } from "../../api/validationTests/operations.js";
import type {
  ValidationTestsListBySubscriptionOptionalParams,
  ValidationTestsGetOptionalParams,
} from "../../api/validationTests/options.js";
import type { ValidationTest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
