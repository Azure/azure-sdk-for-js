// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { update } from "../../api/vMCollection/operations.js";
import type { vMCollectionUpdateOptionalParams } from "../../api/vMCollection/options.js";

/** Interface representing a vMCollection operations. */
export interface vMCollectionOperations {
  /** Update the VM details that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance. */
  update: (
    resourceGroupName: string,
    monitorName: string,
    options?: vMCollectionUpdateOptionalParams,
  ) => Promise<void>;
}

function _getvMCollection(context: MicrosoftElasticContext) {
  return {
    update: (
      resourceGroupName: string,
      monitorName: string,
      options?: vMCollectionUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, options),
  };
}

export function _getvMCollectionOperations(
  context: MicrosoftElasticContext,
): vMCollectionOperations {
  return {
    ..._getvMCollection(context),
  };
}
