// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { Trial, Quota } from "../../models/models.js";
import {
  LocationsCheckQuotaAvailabilityOptionalParams,
  LocationsCheckTrialAvailabilityOptionalParams,
} from "../../api/locations/options.js";
import { checkQuotaAvailability, checkTrialAvailability } from "../../api/locations/operations.js";

/** Interface representing a Locations operations. */
export interface LocationsOperations {
  /** Return quota for subscription by region */
  checkQuotaAvailability: (
    apiVersion: string,
    location: string,
    options?: LocationsCheckQuotaAvailabilityOptionalParams,
  ) => Promise<Quota>;
  /** Return trial status for subscription by region */
  checkTrialAvailability: (
    apiVersion: string,
    location: string,
    options?: LocationsCheckTrialAvailabilityOptionalParams,
  ) => Promise<Trial>;
}

function _getLocations(context: AzureVMwareSolutionAPIContext) {
  return {
    checkQuotaAvailability: (
      apiVersion: string,
      location: string,
      options?: LocationsCheckQuotaAvailabilityOptionalParams,
    ) => checkQuotaAvailability(context, apiVersion, location, options),
    checkTrialAvailability: (
      apiVersion: string,
      location: string,
      options?: LocationsCheckTrialAvailabilityOptionalParams,
    ) => checkTrialAvailability(context, apiVersion, location, options),
  };
}

export function _getLocationsOperations(
  context: AzureVMwareSolutionAPIContext,
): LocationsOperations {
  return {
    ..._getLocations(context),
  };
}
