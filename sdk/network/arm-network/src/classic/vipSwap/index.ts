// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, create, get } from "../../api/vipSwap/operations.js";
import type {
  VipSwapListOptionalParams,
  VipSwapCreateOptionalParams,
  VipSwapGetOptionalParams,
} from "../../api/vipSwap/options.js";
import type {
  SwapResource,
  SwapResourceListResult,
} from "../../models/microsoft/network/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VipSwap operations. */
export interface VipSwapOperations {
  /** Gets the list of SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production */
  list: (
    groupName: string,
    resourceName: string,
    options?: VipSwapListOptionalParams,
  ) => Promise<SwapResourceListResult>;
  /** Performs vip swap operation on swappable cloud services. */
  create: (
    groupName: string,
    resourceName: string,
    parameters: SwapResource,
    options?: VipSwapCreateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use create instead */
  beginCreate: (
    groupName: string,
    resourceName: string,
    parameters: SwapResource,
    options?: VipSwapCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    groupName: string,
    resourceName: string,
    parameters: SwapResource,
    options?: VipSwapCreateOptionalParams,
  ) => Promise<void>;
  /** Gets the SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production */
  get: (
    groupName: string,
    resourceName: string,
    options?: VipSwapGetOptionalParams,
  ) => Promise<SwapResource>;
}

function _getVipSwap(context: NetworkManagementContext) {
  return {
    list: (groupName: string, resourceName: string, options?: VipSwapListOptionalParams) =>
      list(context, groupName, resourceName, options),
    create: (
      groupName: string,
      resourceName: string,
      parameters: SwapResource,
      options?: VipSwapCreateOptionalParams,
    ) => create(context, groupName, resourceName, parameters, options),
    beginCreate: async (
      groupName: string,
      resourceName: string,
      parameters: SwapResource,
      options?: VipSwapCreateOptionalParams,
    ) => {
      const poller = create(context, groupName, resourceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      groupName: string,
      resourceName: string,
      parameters: SwapResource,
      options?: VipSwapCreateOptionalParams,
    ) => {
      return await create(context, groupName, resourceName, parameters, options);
    },
    get: (groupName: string, resourceName: string, options?: VipSwapGetOptionalParams) =>
      get(context, groupName, resourceName, options),
  };
}

export function _getVipSwapOperations(context: NetworkManagementContext): VipSwapOperations {
  return {
    ..._getVipSwap(context),
  };
}
