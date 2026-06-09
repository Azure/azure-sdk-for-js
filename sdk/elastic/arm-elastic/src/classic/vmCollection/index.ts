// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { update } from "../../api/vmCollection/operations.js";
import type { VMCollectionUpdateOptionalParams } from "../../api/vmCollection/options.js";

/** Interface representing a VMCollection operations. */
export interface VMCollectionOperations {
  /** Update the VM details that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance. */
  update: (
    resourceGroupName: string,
    monitorName: string,
    options?: VMCollectionUpdateOptionalParams,
  ) => Promise<void>;
}

function _getVMCollection(context: MicrosoftElasticContext) {
  return {
    update: (
      resourceGroupName: string,
      monitorName: string,
      options?: VMCollectionUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, options),
  };
}

export function _getVMCollectionOperations(
  context: MicrosoftElasticContext,
): VMCollectionOperations {
  return {
    ..._getVMCollection(context),
  };
}
