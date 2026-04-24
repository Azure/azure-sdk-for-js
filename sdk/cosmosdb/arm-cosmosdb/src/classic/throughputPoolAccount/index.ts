// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { $delete, create, get } from "../../api/throughputPoolAccount/operations.js";
import type {
  ThroughputPoolAccountDeleteOptionalParams,
  ThroughputPoolAccountCreateOptionalParams,
  ThroughputPoolAccountGetOptionalParams,
} from "../../api/throughputPoolAccount/options.js";
import type { ThroughputPoolAccountResource } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ThroughputPoolAccount operations. */
export interface ThroughputPoolAccountOperations {
  /** Removes an existing Azure Cosmos DB database account from a throughput pool. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    throughputPoolName: string,
    throughputPoolAccountName: string,
    options?: ThroughputPoolAccountDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    throughputPoolName: string,
    throughputPoolAccountName: string,
    options?: ThroughputPoolAccountDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    throughputPoolName: string,
    throughputPoolAccountName: string,
    options?: ThroughputPoolAccountDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Azure Cosmos DB ThroughputPool account. The "Update" method is preferred when performing updates on an account. */
  create: (
    resourceGroupName: string,
    throughputPoolName: string,
    throughputPoolAccountName: string,
    body: ThroughputPoolAccountResource,
    options?: ThroughputPoolAccountCreateOptionalParams,
  ) => PollerLike<OperationState<ThroughputPoolAccountResource>, ThroughputPoolAccountResource>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    throughputPoolName: string,
    throughputPoolAccountName: string,
    body: ThroughputPoolAccountResource,
    options?: ThroughputPoolAccountCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ThroughputPoolAccountResource>, ThroughputPoolAccountResource>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    throughputPoolName: string,
    throughputPoolAccountName: string,
    body: ThroughputPoolAccountResource,
    options?: ThroughputPoolAccountCreateOptionalParams,
  ) => Promise<ThroughputPoolAccountResource>;
  /** Retrieves the properties of an existing Azure Cosmos DB Throughput Pool */
  get: (
    resourceGroupName: string,
    throughputPoolName: string,
    throughputPoolAccountName: string,
    options?: ThroughputPoolAccountGetOptionalParams,
  ) => Promise<ThroughputPoolAccountResource>;
}

function _getThroughputPoolAccount(context: CosmosDBManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      throughputPoolName: string,
      throughputPoolAccountName: string,
      options?: ThroughputPoolAccountDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, throughputPoolName, throughputPoolAccountName, options),
    beginDelete: async (
      resourceGroupName: string,
      throughputPoolName: string,
      throughputPoolAccountName: string,
      options?: ThroughputPoolAccountDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        throughputPoolName,
        throughputPoolAccountName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      throughputPoolName: string,
      throughputPoolAccountName: string,
      options?: ThroughputPoolAccountDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        throughputPoolName,
        throughputPoolAccountName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      throughputPoolName: string,
      throughputPoolAccountName: string,
      body: ThroughputPoolAccountResource,
      options?: ThroughputPoolAccountCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        throughputPoolName,
        throughputPoolAccountName,
        body,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      throughputPoolName: string,
      throughputPoolAccountName: string,
      body: ThroughputPoolAccountResource,
      options?: ThroughputPoolAccountCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        throughputPoolName,
        throughputPoolAccountName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      throughputPoolName: string,
      throughputPoolAccountName: string,
      body: ThroughputPoolAccountResource,
      options?: ThroughputPoolAccountCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        throughputPoolName,
        throughputPoolAccountName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      throughputPoolName: string,
      throughputPoolAccountName: string,
      options?: ThroughputPoolAccountGetOptionalParams,
    ) => get(context, resourceGroupName, throughputPoolName, throughputPoolAccountName, options),
  };
}

export function _getThroughputPoolAccountOperations(
  context: CosmosDBManagementContext,
): ThroughputPoolAccountOperations {
  return {
    ..._getThroughputPoolAccount(context),
  };
}
