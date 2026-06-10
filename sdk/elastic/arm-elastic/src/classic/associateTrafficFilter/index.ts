// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { associate } from "../../api/associateTrafficFilter/operations.js";
import type { AssociateTrafficFilterAssociateOptionalParams } from "../../api/associateTrafficFilter/options.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AssociateTrafficFilter operations. */
export interface AssociateTrafficFilterOperations {
  /** Associate a traffic filter with your Elastic monitor resource to control and manage network traffic. */
  associate: (
    resourceGroupName: string,
    monitorName: string,
    options?: AssociateTrafficFilterAssociateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use associate instead */
  beginAssociate: (
    resourceGroupName: string,
    monitorName: string,
    options?: AssociateTrafficFilterAssociateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use associate instead */
  beginAssociateAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: AssociateTrafficFilterAssociateOptionalParams,
  ) => Promise<void>;
}

function _getAssociateTrafficFilter(context: MicrosoftElasticContext) {
  return {
    associate: (
      resourceGroupName: string,
      monitorName: string,
      options?: AssociateTrafficFilterAssociateOptionalParams,
    ) => associate(context, resourceGroupName, monitorName, options),
    beginAssociate: async (
      resourceGroupName: string,
      monitorName: string,
      options?: AssociateTrafficFilterAssociateOptionalParams,
    ) => {
      const poller = associate(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAssociateAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: AssociateTrafficFilterAssociateOptionalParams,
    ) => {
      return await associate(context, resourceGroupName, monitorName, options);
    },
  };
}

export function _getAssociateTrafficFilterOperations(
  context: MicrosoftElasticContext,
): AssociateTrafficFilterOperations {
  return {
    ..._getAssociateTrafficFilter(context),
  };
}
