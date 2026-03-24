// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext } from "../../api/hdInsightManagementContext.js";
import {
  validateClusterCreateRequest,
  checkNameAvailability,
  getAzureAsyncOperationStatus,
  listBillingSpecs,
  listUsages,
  getCapabilities,
} from "../../api/locations/operations.js";
import type {
  LocationsValidateClusterCreateRequestOptionalParams,
  LocationsCheckNameAvailabilityOptionalParams,
  LocationsGetAzureAsyncOperationStatusOptionalParams,
  LocationsListBillingSpecsOptionalParams,
  LocationsListUsagesOptionalParams,
  LocationsGetCapabilitiesOptionalParams,
} from "../../api/locations/options.js";
import type {
  AsyncOperationResult,
  CapabilitiesResult,
  UsagesListResult,
  BillingResponseListResult,
  NameAvailabilityCheckRequestParameters,
  NameAvailabilityCheckResult,
  ClusterCreateRequestValidationParameters,
  ClusterCreateValidationResult,
} from "../../models/models.js";

/** Interface representing a Locations operations. */
export interface LocationsOperations {
  /** Validate the cluster create request spec is valid or not. */
  validateClusterCreateRequest: (
    location: string,
    parameters: ClusterCreateRequestValidationParameters,
    options?: LocationsValidateClusterCreateRequestOptionalParams,
  ) => Promise<ClusterCreateValidationResult>;
  /** Check the cluster name is available or not. */
  checkNameAvailability: (
    location: string,
    parameters: NameAvailabilityCheckRequestParameters,
    options?: LocationsCheckNameAvailabilityOptionalParams,
  ) => Promise<NameAvailabilityCheckResult>;
  /** Get the async operation status. */
  getAzureAsyncOperationStatus: (
    location: string,
    operationId: string,
    options?: LocationsGetAzureAsyncOperationStatusOptionalParams,
  ) => Promise<AsyncOperationResult>;
  /** Lists the billingSpecs for the specified subscription and location. */
  listBillingSpecs: (
    location: string,
    options?: LocationsListBillingSpecsOptionalParams,
  ) => Promise<BillingResponseListResult>;
  /** Lists the usages for the specified location. */
  listUsages: (
    location: string,
    options?: LocationsListUsagesOptionalParams,
  ) => Promise<UsagesListResult>;
  /** Gets the capabilities for the specified location. */
  getCapabilities: (
    location: string,
    options?: LocationsGetCapabilitiesOptionalParams,
  ) => Promise<CapabilitiesResult>;
}

function _getLocations(context: HDInsightManagementContext) {
  return {
    validateClusterCreateRequest: (
      location: string,
      parameters: ClusterCreateRequestValidationParameters,
      options?: LocationsValidateClusterCreateRequestOptionalParams,
    ) => validateClusterCreateRequest(context, location, parameters, options),
    checkNameAvailability: (
      location: string,
      parameters: NameAvailabilityCheckRequestParameters,
      options?: LocationsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, location, parameters, options),
    getAzureAsyncOperationStatus: (
      location: string,
      operationId: string,
      options?: LocationsGetAzureAsyncOperationStatusOptionalParams,
    ) => getAzureAsyncOperationStatus(context, location, operationId, options),
    listBillingSpecs: (location: string, options?: LocationsListBillingSpecsOptionalParams) =>
      listBillingSpecs(context, location, options),
    listUsages: (location: string, options?: LocationsListUsagesOptionalParams) =>
      listUsages(context, location, options),
    getCapabilities: (location: string, options?: LocationsGetCapabilitiesOptionalParams) =>
      getCapabilities(context, location, options),
  };
}

export function _getLocationsOperations(context: HDInsightManagementContext): LocationsOperations {
  return {
    ..._getLocations(context),
  };
}
