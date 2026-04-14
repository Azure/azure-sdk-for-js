// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FluxConfigurationContext } from "../../api/fluxConfigurationContext.js";
import { get } from "../../api/fluxConfigOperationStatus/operations.js";
import type { FluxConfigOperationStatusGetOptionalParams } from "../../api/fluxConfigOperationStatus/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a FluxConfigOperationStatus operations. */
export interface FluxConfigOperationStatusOperations {
  /** Get Async Operation status */
  get: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    fluxConfigurationName: string,
    operationId: string,
    options?: FluxConfigOperationStatusGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getFluxConfigOperationStatus(context: FluxConfigurationContext) {
  return {
    get: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      fluxConfigurationName: string,
      operationId: string,
      options?: FluxConfigOperationStatusGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        operationId,
        options,
      ),
  };
}

export function _getFluxConfigOperationStatusOperations(
  context: FluxConfigurationContext,
): FluxConfigOperationStatusOperations {
  return {
    ..._getFluxConfigOperationStatus(context),
  };
}
