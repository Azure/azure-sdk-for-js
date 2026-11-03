// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import { purgeContent } from "../../api/endpoints/operations.js";
import type { EndpointsPurgeContentOptionalParams } from "../../api/endpoints/options.js";
import type { PurgeParameters } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Endpoints operations. */
export interface EndpointsOperations {
  /** Removes a content from Front Door. */
  purgeContent: (
    resourceGroupName: string,
    frontDoorName: string,
    contentFilePaths: PurgeParameters,
    options?: EndpointsPurgeContentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use purgeContent instead */
  beginPurgeContent: (
    resourceGroupName: string,
    frontDoorName: string,
    contentFilePaths: PurgeParameters,
    options?: EndpointsPurgeContentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use purgeContent instead */
  beginPurgeContentAndWait: (
    resourceGroupName: string,
    frontDoorName: string,
    contentFilePaths: PurgeParameters,
    options?: EndpointsPurgeContentOptionalParams,
  ) => Promise<void>;
}

function _getEndpoints(context: FrontDoorManagementContext) {
  return {
    purgeContent: (
      resourceGroupName: string,
      frontDoorName: string,
      contentFilePaths: PurgeParameters,
      options?: EndpointsPurgeContentOptionalParams,
    ) => purgeContent(context, resourceGroupName, frontDoorName, contentFilePaths, options),
    beginPurgeContent: async (
      resourceGroupName: string,
      frontDoorName: string,
      contentFilePaths: PurgeParameters,
      options?: EndpointsPurgeContentOptionalParams,
    ) => {
      const poller = purgeContent(
        context,
        resourceGroupName,
        frontDoorName,
        contentFilePaths,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurgeContentAndWait: async (
      resourceGroupName: string,
      frontDoorName: string,
      contentFilePaths: PurgeParameters,
      options?: EndpointsPurgeContentOptionalParams,
    ) => {
      return await purgeContent(
        context,
        resourceGroupName,
        frontDoorName,
        contentFilePaths,
        options,
      );
    },
  };
}

export function _getEndpointsOperations(context: FrontDoorManagementContext): EndpointsOperations {
  return {
    ..._getEndpoints(context),
  };
}
