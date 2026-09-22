// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExtensionsContext } from "../../api/extensionsContext.js";
import { get } from "../../api/operationStatus/operations.js";
import type { OperationStatusGetOptionalParams } from "../../api/operationStatus/options.js";
import type { OperationStatusResult } from "../../models/models.js";

/** Interface representing a OperationStatus operations. */
export interface OperationStatusOperations {
  /** Get Async Operation status */
  get: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionName: string,
    operationId: string,
    options?: OperationStatusGetOptionalParams,
  ) => Promise<OperationStatusResult>;
}

function _getOperationStatus(context: ExtensionsContext) {
  return {
    get: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionName: string,
      operationId: string,
      options?: OperationStatusGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        operationId,
        options,
      ),
  };
}

export function _getOperationStatusOperations(
  context: ExtensionsContext,
): OperationStatusOperations {
  return {
    ..._getOperationStatus(context),
  };
}
