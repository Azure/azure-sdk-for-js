// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { checkNameAvailability } from "../../api/namespaces/operations.js";
import { NamespacesCheckNameAvailabilityOptionalParams } from "../../api/namespaces/options.js";
import {
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";

/** Interface representing a Namespaces operations. */
export interface NamespacesOperations {
  /** Checks if resource name is available. */
  checkNameAvailability: (
    resourceGroupName: string,
    environmentName: string,
    checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
    options?: NamespacesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
}

function _getNamespaces(context: ContainerAppsAPIContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      environmentName: string,
      checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
      options?: NamespacesCheckNameAvailabilityOptionalParams,
    ) =>
      checkNameAvailability(
        context,
        resourceGroupName,
        environmentName,
        checkNameAvailabilityRequest,
        options,
      ),
  };
}

export function _getNamespacesOperations(context: ContainerAppsAPIContext): NamespacesOperations {
  return {
    ..._getNamespaces(context),
  };
}
