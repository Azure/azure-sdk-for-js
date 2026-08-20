// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list, enableDisable, get } from "../../api/chaosFault/operations.js";
import type {
  ChaosFaultListOptionalParams,
  ChaosFaultEnableDisableOptionalParams,
  ChaosFaultGetOptionalParams,
} from "../../api/chaosFault/options.js";
import type { ChaosFaultResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ChaosFault operations. */
export interface ChaosFaultOperations {
  /** List Chaos Faults for CosmosDB account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: ChaosFaultListOptionalParams,
  ) => PagedAsyncIterableIterator<ChaosFaultResource>;
  /** Enable, disable Chaos Fault in a CosmosDB account. */
  enableDisable: (
    resourceGroupName: string,
    accountName: string,
    chaosFault: string,
    chaosFaultRequest: ChaosFaultResource,
    options?: ChaosFaultEnableDisableOptionalParams,
  ) => PollerLike<OperationState<ChaosFaultResource>, ChaosFaultResource>;
  /** @deprecated use enableDisable instead */
  beginEnableDisable: (
    resourceGroupName: string,
    accountName: string,
    chaosFault: string,
    chaosFaultRequest: ChaosFaultResource,
    options?: ChaosFaultEnableDisableOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ChaosFaultResource>, ChaosFaultResource>>;
  /** @deprecated use enableDisable instead */
  beginEnableDisableAndWait: (
    resourceGroupName: string,
    accountName: string,
    chaosFault: string,
    chaosFaultRequest: ChaosFaultResource,
    options?: ChaosFaultEnableDisableOptionalParams,
  ) => Promise<ChaosFaultResource>;
  /** Get Chaos Fault for a CosmosdB account for a particular Chaos Fault. */
  get: (
    resourceGroupName: string,
    accountName: string,
    chaosFault: string,
    options?: ChaosFaultGetOptionalParams,
  ) => Promise<ChaosFaultResource>;
}

function _getChaosFault(context: CosmosDBManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: ChaosFaultListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    enableDisable: (
      resourceGroupName: string,
      accountName: string,
      chaosFault: string,
      chaosFaultRequest: ChaosFaultResource,
      options?: ChaosFaultEnableDisableOptionalParams,
    ) =>
      enableDisable(
        context,
        resourceGroupName,
        accountName,
        chaosFault,
        chaosFaultRequest,
        options,
      ),
    beginEnableDisable: async (
      resourceGroupName: string,
      accountName: string,
      chaosFault: string,
      chaosFaultRequest: ChaosFaultResource,
      options?: ChaosFaultEnableDisableOptionalParams,
    ) => {
      const poller = enableDisable(
        context,
        resourceGroupName,
        accountName,
        chaosFault,
        chaosFaultRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginEnableDisableAndWait: async (
      resourceGroupName: string,
      accountName: string,
      chaosFault: string,
      chaosFaultRequest: ChaosFaultResource,
      options?: ChaosFaultEnableDisableOptionalParams,
    ) => {
      return await enableDisable(
        context,
        resourceGroupName,
        accountName,
        chaosFault,
        chaosFaultRequest,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      chaosFault: string,
      options?: ChaosFaultGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, chaosFault, options),
  };
}

export function _getChaosFaultOperations(context: CosmosDBManagementContext): ChaosFaultOperations {
  return {
    ..._getChaosFault(context),
  };
}
