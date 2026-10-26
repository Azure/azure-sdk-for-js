// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SovereignContext } from "../../api/sovereignContext.js";
import {
  checkNameAvailabilityLocal,
  checkNameAvailability,
  list,
} from "../../api/operations/operations.js";
import type {
  OperationsCheckNameAvailabilityLocalOptionalParams,
  OperationsCheckNameAvailabilityOptionalParams,
  OperationsListOptionalParams,
} from "../../api/operations/options.js";
import type {
  Operation,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Implements local CheckNameAvailability operations */
  checkNameAvailabilityLocal: (
    location: string,
    body: CheckNameAvailabilityRequest,
    options?: OperationsCheckNameAvailabilityLocalOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** Implements global CheckNameAvailability operations */
  checkNameAvailability: (
    body: CheckNameAvailabilityRequest,
    options?: OperationsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: SovereignContext) {
  return {
    checkNameAvailabilityLocal: (
      location: string,
      body: CheckNameAvailabilityRequest,
      options?: OperationsCheckNameAvailabilityLocalOptionalParams,
    ) => checkNameAvailabilityLocal(context, location, body, options),
    checkNameAvailability: (
      body: CheckNameAvailabilityRequest,
      options?: OperationsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, body, options),
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: SovereignContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
