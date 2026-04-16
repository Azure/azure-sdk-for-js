// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext } from "../../api/recoveryServicesContext.js";
import { capabilities, checkNameAvailability } from "../../api/recoveryServices/operations.js";
import type {
  RecoveryServicesCapabilitiesOptionalParams,
  RecoveryServicesCheckNameAvailabilityOptionalParams,
} from "../../api/recoveryServices/options.js";
import type {
  CheckNameAvailabilityParameters,
  CheckNameAvailabilityResult,
  ResourceCapabilities,
  CapabilitiesResponse,
} from "../../models/models.js";

/** Interface representing a RecoveryServices operations. */
export interface RecoveryServicesOperations {
  /** API to get details about capabilities provided by Microsoft.RecoveryServices RP */
  capabilities: (
    location: string,
    input: ResourceCapabilities,
    options?: RecoveryServicesCapabilitiesOptionalParams,
  ) => Promise<CapabilitiesResponse>;
  /**
   * API to check for resource name availability.
   * A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type
   * or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago
   */
  checkNameAvailability: (
    resourceGroupName: string,
    location: string,
    input: CheckNameAvailabilityParameters,
    options?: RecoveryServicesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
}

function _getRecoveryServices(context: RecoveryServicesContext) {
  return {
    capabilities: (
      location: string,
      input: ResourceCapabilities,
      options?: RecoveryServicesCapabilitiesOptionalParams,
    ) => capabilities(context, location, input, options),
    checkNameAvailability: (
      resourceGroupName: string,
      location: string,
      input: CheckNameAvailabilityParameters,
      options?: RecoveryServicesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, resourceGroupName, location, input, options),
  };
}

export function _getRecoveryServicesOperations(
  context: RecoveryServicesContext,
): RecoveryServicesOperations {
  return {
    ..._getRecoveryServices(context),
  };
}
