// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext } from "../../api/appConfigurationManagementContext.js";
import {
  regionalCheckNameAvailability,
  checkNameAvailability,
  list,
} from "../../api/operations/operations.js";
import type {
  OperationsRegionalCheckNameAvailabilityOptionalParams,
  OperationsCheckNameAvailabilityOptionalParams,
  OperationsListOptionalParams,
} from "../../api/operations/options.js";
import type {
  OperationDefinition,
  CheckNameAvailabilityParameters,
  NameAvailabilityStatus,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Checks whether the configuration store name is available for use. */
  regionalCheckNameAvailability: (
    location: string,
    checkNameAvailabilityParameters: CheckNameAvailabilityParameters,
    options?: OperationsRegionalCheckNameAvailabilityOptionalParams,
  ) => Promise<NameAvailabilityStatus>;
  /** Checks whether the configuration store name is available for use. */
  checkNameAvailability: (
    checkNameAvailabilityParameters: CheckNameAvailabilityParameters,
    options?: OperationsCheckNameAvailabilityOptionalParams,
  ) => Promise<NameAvailabilityStatus>;
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<OperationDefinition>;
}

function _getOperations(context: AppConfigurationManagementContext) {
  return {
    regionalCheckNameAvailability: (
      location: string,
      checkNameAvailabilityParameters: CheckNameAvailabilityParameters,
      options?: OperationsRegionalCheckNameAvailabilityOptionalParams,
    ) => regionalCheckNameAvailability(context, location, checkNameAvailabilityParameters, options),
    checkNameAvailability: (
      checkNameAvailabilityParameters: CheckNameAvailabilityParameters,
      options?: OperationsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, checkNameAvailabilityParameters, options),
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: AppConfigurationManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
