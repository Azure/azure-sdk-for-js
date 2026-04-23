// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { $delete, update, createOrUpdate, get } from "../../api/throughputPool/operations.js";
import type {
  ThroughputPoolDeleteOptionalParams,
  ThroughputPoolUpdateOptionalParams,
  ThroughputPoolCreateOrUpdateOptionalParams,
  ThroughputPoolGetOptionalParams,
} from "../../api/throughputPool/options.js";
import type { ThroughputPoolResource } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ThroughputPool operations. */
export interface ThroughputPoolOperations {
  /** Deletes an existing Azure Cosmos DB Throughput Pool. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    throughputPoolName: string,
    options?: ThroughputPoolDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    throughputPoolName: string,
    options?: ThroughputPoolDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    throughputPoolName: string,
    options?: ThroughputPoolDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the properties of an existing Azure Cosmos DB Throughput Pool. */
  update: (
    resourceGroupName: string,
    throughputPoolName: string,
    options?: ThroughputPoolUpdateOptionalParams,
  ) => PollerLike<OperationState<ThroughputPoolResource>, ThroughputPoolResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    throughputPoolName: string,
    options?: ThroughputPoolUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ThroughputPoolResource>, ThroughputPoolResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    throughputPoolName: string,
    options?: ThroughputPoolUpdateOptionalParams,
  ) => Promise<ThroughputPoolResource>;
  /** Creates or updates an Azure Cosmos DB ThroughputPool account. The "Update" method is preferred when performing updates on an account. */
  createOrUpdate: (
    resourceGroupName: string,
    throughputPoolName: string,
    body: ThroughputPoolResource,
    options?: ThroughputPoolCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ThroughputPoolResource>, ThroughputPoolResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    throughputPoolName: string,
    body: ThroughputPoolResource,
    options?: ThroughputPoolCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ThroughputPoolResource>, ThroughputPoolResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    throughputPoolName: string,
    body: ThroughputPoolResource,
    options?: ThroughputPoolCreateOrUpdateOptionalParams,
  ) => Promise<ThroughputPoolResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB Throughput Pool */
  get: (
    resourceGroupName: string,
    throughputPoolName: string,
    options?: ThroughputPoolGetOptionalParams,
  ) => Promise<ThroughputPoolResource>;
}

function _getThroughputPool(context: CosmosDBManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      throughputPoolName: string,
      options?: ThroughputPoolDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, throughputPoolName, options),
    beginDelete: async (
      resourceGroupName: string,
      throughputPoolName: string,
      options?: ThroughputPoolDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, throughputPoolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      throughputPoolName: string,
      options?: ThroughputPoolDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, throughputPoolName, options);
    },
    update: (
      resourceGroupName: string,
      throughputPoolName: string,
      options?: ThroughputPoolUpdateOptionalParams,
    ) => update(context, resourceGroupName, throughputPoolName, options),
    beginUpdate: async (
      resourceGroupName: string,
      throughputPoolName: string,
      options?: ThroughputPoolUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, throughputPoolName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      throughputPoolName: string,
      options?: ThroughputPoolUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, throughputPoolName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      throughputPoolName: string,
      body: ThroughputPoolResource,
      options?: ThroughputPoolCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, throughputPoolName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      throughputPoolName: string,
      body: ThroughputPoolResource,
      options?: ThroughputPoolCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, throughputPoolName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      throughputPoolName: string,
      body: ThroughputPoolResource,
      options?: ThroughputPoolCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, throughputPoolName, body, options);
    },
    get: (
      resourceGroupName: string,
      throughputPoolName: string,
      options?: ThroughputPoolGetOptionalParams,
    ) => get(context, resourceGroupName, throughputPoolName, options),
  };
}

export function _getThroughputPoolOperations(
  context: CosmosDBManagementContext,
): ThroughputPoolOperations {
  return {
    ..._getThroughputPool(context),
  };
}
