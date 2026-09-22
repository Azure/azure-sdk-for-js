// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchManagementContext } from "../../api/batchManagementContext.js";
import {
  checkNameAvailability,
  listSupportedVirtualMachineSkus,
  getQuotas,
} from "../../api/location/operations.js";
import type {
  LocationCheckNameAvailabilityOptionalParams,
  LocationListSupportedVirtualMachineSkusOptionalParams,
  LocationGetQuotasOptionalParams,
} from "../../api/location/options.js";
import type {
  BatchLocationQuota,
  SupportedSku,
  CheckNameAvailabilityParameters,
  CheckNameAvailabilityResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Location operations. */
export interface LocationOperations {
  /** Checks whether the Batch account name is available in the specified region. */
  checkNameAvailability: (
    locationName: string,
    parameters: CheckNameAvailabilityParameters,
    options?: LocationCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
  /** Gets the list of Batch supported Virtual Machine VM sizes available at the given location. */
  listSupportedVirtualMachineSkus: (
    locationName: string,
    options?: LocationListSupportedVirtualMachineSkusOptionalParams,
  ) => PagedAsyncIterableIterator<SupportedSku>;
  /** Gets the Batch service quotas for the specified subscription at the given location. */
  getQuotas: (
    locationName: string,
    options?: LocationGetQuotasOptionalParams,
  ) => Promise<BatchLocationQuota>;
}

function _getLocation(context: BatchManagementContext) {
  return {
    checkNameAvailability: (
      locationName: string,
      parameters: CheckNameAvailabilityParameters,
      options?: LocationCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, locationName, parameters, options),
    listSupportedVirtualMachineSkus: (
      locationName: string,
      options?: LocationListSupportedVirtualMachineSkusOptionalParams,
    ) => listSupportedVirtualMachineSkus(context, locationName, options),
    getQuotas: (locationName: string, options?: LocationGetQuotasOptionalParams) =>
      getQuotas(context, locationName, options),
  };
}

export function _getLocationOperations(context: BatchManagementContext): LocationOperations {
  return {
    ..._getLocation(context),
  };
}
