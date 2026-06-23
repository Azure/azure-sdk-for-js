// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import {
  disableHttps,
  enableHttps,
  listByFrontDoor,
  get,
} from "../../api/frontendEndpoints/operations.js";
import type {
  FrontendEndpointsDisableHttpsOptionalParams,
  FrontendEndpointsEnableHttpsOptionalParams,
  FrontendEndpointsListByFrontDoorOptionalParams,
  FrontendEndpointsGetOptionalParams,
} from "../../api/frontendEndpoints/options.js";
import type { FrontendEndpoint, CustomHttpsConfiguration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FrontendEndpoints operations. */
export interface FrontendEndpointsOperations {
  /** Disables a frontendEndpoint for HTTPS traffic */
  disableHttps: (
    resourceGroupName: string,
    frontDoorName: string,
    frontendEndpointName: string,
    options?: FrontendEndpointsDisableHttpsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use disableHttps instead */
  beginDisableHttps: (
    resourceGroupName: string,
    frontDoorName: string,
    frontendEndpointName: string,
    options?: FrontendEndpointsDisableHttpsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use disableHttps instead */
  beginDisableHttpsAndWait: (
    resourceGroupName: string,
    frontDoorName: string,
    frontendEndpointName: string,
    options?: FrontendEndpointsDisableHttpsOptionalParams,
  ) => Promise<void>;
  /** Enables a frontendEndpoint for HTTPS traffic */
  enableHttps: (
    resourceGroupName: string,
    frontDoorName: string,
    frontendEndpointName: string,
    customHttpsConfiguration: CustomHttpsConfiguration,
    options?: FrontendEndpointsEnableHttpsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use enableHttps instead */
  beginEnableHttps: (
    resourceGroupName: string,
    frontDoorName: string,
    frontendEndpointName: string,
    customHttpsConfiguration: CustomHttpsConfiguration,
    options?: FrontendEndpointsEnableHttpsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use enableHttps instead */
  beginEnableHttpsAndWait: (
    resourceGroupName: string,
    frontDoorName: string,
    frontendEndpointName: string,
    customHttpsConfiguration: CustomHttpsConfiguration,
    options?: FrontendEndpointsEnableHttpsOptionalParams,
  ) => Promise<void>;
  /** Lists all of the frontend endpoints within a Front Door. */
  listByFrontDoor: (
    resourceGroupName: string,
    frontDoorName: string,
    options?: FrontendEndpointsListByFrontDoorOptionalParams,
  ) => PagedAsyncIterableIterator<FrontendEndpoint>;
  /** Gets a Frontend endpoint with the specified name within the specified Front Door. */
  get: (
    resourceGroupName: string,
    frontDoorName: string,
    frontendEndpointName: string,
    options?: FrontendEndpointsGetOptionalParams,
  ) => Promise<FrontendEndpoint>;
}

function _getFrontendEndpoints(context: FrontDoorManagementContext) {
  return {
    disableHttps: (
      resourceGroupName: string,
      frontDoorName: string,
      frontendEndpointName: string,
      options?: FrontendEndpointsDisableHttpsOptionalParams,
    ) => disableHttps(context, resourceGroupName, frontDoorName, frontendEndpointName, options),
    beginDisableHttps: async (
      resourceGroupName: string,
      frontDoorName: string,
      frontendEndpointName: string,
      options?: FrontendEndpointsDisableHttpsOptionalParams,
    ) => {
      const poller = disableHttps(
        context,
        resourceGroupName,
        frontDoorName,
        frontendEndpointName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisableHttpsAndWait: async (
      resourceGroupName: string,
      frontDoorName: string,
      frontendEndpointName: string,
      options?: FrontendEndpointsDisableHttpsOptionalParams,
    ) => {
      return await disableHttps(
        context,
        resourceGroupName,
        frontDoorName,
        frontendEndpointName,
        options,
      );
    },
    enableHttps: (
      resourceGroupName: string,
      frontDoorName: string,
      frontendEndpointName: string,
      customHttpsConfiguration: CustomHttpsConfiguration,
      options?: FrontendEndpointsEnableHttpsOptionalParams,
    ) =>
      enableHttps(
        context,
        resourceGroupName,
        frontDoorName,
        frontendEndpointName,
        customHttpsConfiguration,
        options,
      ),
    beginEnableHttps: async (
      resourceGroupName: string,
      frontDoorName: string,
      frontendEndpointName: string,
      customHttpsConfiguration: CustomHttpsConfiguration,
      options?: FrontendEndpointsEnableHttpsOptionalParams,
    ) => {
      const poller = enableHttps(
        context,
        resourceGroupName,
        frontDoorName,
        frontendEndpointName,
        customHttpsConfiguration,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginEnableHttpsAndWait: async (
      resourceGroupName: string,
      frontDoorName: string,
      frontendEndpointName: string,
      customHttpsConfiguration: CustomHttpsConfiguration,
      options?: FrontendEndpointsEnableHttpsOptionalParams,
    ) => {
      return await enableHttps(
        context,
        resourceGroupName,
        frontDoorName,
        frontendEndpointName,
        customHttpsConfiguration,
        options,
      );
    },
    listByFrontDoor: (
      resourceGroupName: string,
      frontDoorName: string,
      options?: FrontendEndpointsListByFrontDoorOptionalParams,
    ) => listByFrontDoor(context, resourceGroupName, frontDoorName, options),
    get: (
      resourceGroupName: string,
      frontDoorName: string,
      frontendEndpointName: string,
      options?: FrontendEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, frontDoorName, frontendEndpointName, options),
  };
}

export function _getFrontendEndpointsOperations(
  context: FrontDoorManagementContext,
): FrontendEndpointsOperations {
  return {
    ..._getFrontendEndpoints(context),
  };
}
