// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { update } from "../../api/detachTrafficFilter/operations.js";
import type { DetachTrafficFilterUpdateOptionalParams } from "../../api/detachTrafficFilter/options.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DetachTrafficFilter operations. */
export interface DetachTrafficFilterOperations {
  /** Detach an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities. */
  update: (
    resourceGroupName: string,
    monitorName: string,
    options?: DetachTrafficFilterUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    monitorName: string,
    options?: DetachTrafficFilterUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: DetachTrafficFilterUpdateOptionalParams,
  ) => Promise<void>;
}

function _getDetachTrafficFilter(context: MicrosoftElasticContext) {
  return {
    update: (
      resourceGroupName: string,
      monitorName: string,
      options?: DetachTrafficFilterUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, options),
    beginUpdate: async (
      resourceGroupName: string,
      monitorName: string,
      options?: DetachTrafficFilterUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: DetachTrafficFilterUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, monitorName, options);
    },
  };
}

export function _getDetachTrafficFilterOperations(
  context: MicrosoftElasticContext,
): DetachTrafficFilterOperations {
  return {
    ..._getDetachTrafficFilter(context),
  };
}
