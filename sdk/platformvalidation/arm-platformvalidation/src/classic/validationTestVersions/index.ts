// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext } from "../../api/platformValidationContext.js";
import { list, get } from "../../api/validationTestVersions/operations.js";
import {
  ValidationTestVersionsListOptionalParams,
  ValidationTestVersionsGetOptionalParams,
} from "../../api/validationTestVersions/options.js";
import { ValidationTestVersion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ValidationTestVersions operations. */
export interface ValidationTestVersionsOperations {
  /** List validation test version catalog entries */
  list: (
    validationTestName: string,
    options?: ValidationTestVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ValidationTestVersion>;
  /** Get a validation test version catalog entry */
  get: (
    validationTestName: string,
    version: string,
    options?: ValidationTestVersionsGetOptionalParams,
  ) => Promise<ValidationTestVersion>;
}

function _getValidationTestVersions(context: PlatformValidationContext) {
  return {
    list: (validationTestName: string, options?: ValidationTestVersionsListOptionalParams) =>
      list(context, validationTestName, options),
    get: (
      validationTestName: string,
      version: string,
      options?: ValidationTestVersionsGetOptionalParams,
    ) => get(context, validationTestName, version, options),
  };
}

export function _getValidationTestVersionsOperations(
  context: PlatformValidationContext,
): ValidationTestVersionsOperations {
  return {
    ..._getValidationTestVersions(context),
  };
}
