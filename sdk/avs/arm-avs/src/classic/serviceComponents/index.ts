// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { checkAvailability } from "../../api/serviceComponents/operations.js";
import type { ServiceComponentsCheckAvailabilityOptionalParams } from "../../api/serviceComponents/options.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServiceComponents operations. */
export interface ServiceComponentsOperations {
  /** Return service component availability */
  checkAvailability: (
    location: string,
    serviceComponentName: string,
    options?: ServiceComponentsCheckAvailabilityOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getServiceComponents(context: AzureVMwareSolutionAPIContext) {
  return {
    checkAvailability: (
      location: string,
      serviceComponentName: string,
      options?: ServiceComponentsCheckAvailabilityOptionalParams,
    ) => checkAvailability(context, location, serviceComponentName, options),
  };
}

export function _getServiceComponentsOperations(
  context: AzureVMwareSolutionAPIContext,
): ServiceComponentsOperations {
  return {
    ..._getServiceComponents(context),
  };
}
