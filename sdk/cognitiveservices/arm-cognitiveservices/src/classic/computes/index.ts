// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  restart,
  stop,
  start,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/computes/operations.js";
import {
  ComputesRestartOptionalParams,
  ComputesStopOptionalParams,
  ComputesStartOptionalParams,
  ComputesListOptionalParams,
  ComputesDeleteOptionalParams,
  ComputesUpdateOptionalParams,
  ComputesCreateOrUpdateOptionalParams,
  ComputesGetOptionalParams,
} from "../../api/computes/options.js";
import { Compute } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Computes operations. */
export interface ComputesOperations {
  /**
   * Restarts a running ContainerInstance compute resource.
   * This is a long-running operation that returns 202 Accepted.
   * Only applicable when computeType is ContainerInstance.
   */
  restart: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesRestartOptionalParams,
  ) => Promise<void>;
  /**
   * Stops a running ContainerInstance compute resource.
   * This is a long-running operation that returns 202 Accepted.
   * Only applicable when computeType is ContainerInstance.
   */
  stop: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesStopOptionalParams,
  ) => Promise<void>;
  /**
   * Starts a stopped ContainerInstance compute resource.
   * This is a long-running operation that returns 202 Accepted.
   * Only applicable when computeType is ContainerInstance.
   */
  start: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesStartOptionalParams,
  ) => Promise<void>;
  /** Gets the computes associated with the Cognitive Services account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: ComputesListOptionalParams,
  ) => PagedAsyncIterableIterator<Compute>;
  /** Deletes the specified compute associated with the Cognitive Services account. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a compute associated with the Cognitive Services account. */
  update: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    properties: Compute,
    options?: ComputesUpdateOptionalParams,
  ) => PollerLike<OperationState<Compute>, Compute>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    properties: Compute,
    options?: ComputesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Compute>, Compute>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    properties: Compute,
    options?: ComputesUpdateOptionalParams,
  ) => Promise<Compute>;
  /** Creates or updates a compute associated with the Cognitive Services account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    resource: Compute,
    options?: ComputesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Compute>, Compute>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    resource: Compute,
    options?: ComputesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Compute>, Compute>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    resource: Compute,
    options?: ComputesCreateOrUpdateOptionalParams,
  ) => Promise<Compute>;
  /** Gets the specified compute associated with the Cognitive Services account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    computeName: string,
    options?: ComputesGetOptionalParams,
  ) => Promise<Compute>;
}

function _getComputes(context: CognitiveServicesManagementContext) {
  return {
    restart: (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesRestartOptionalParams,
    ) => restart(context, resourceGroupName, accountName, computeName, options),
    beginRestart: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, accountName, computeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, accountName, computeName, options);
    },
    stop: (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesStopOptionalParams,
    ) => stop(context, resourceGroupName, accountName, computeName, options),
    beginStop: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesStopOptionalParams,
    ) => {
      const poller = stop(context, resourceGroupName, accountName, computeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, accountName, computeName, options);
    },
    start: (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesStartOptionalParams,
    ) => start(context, resourceGroupName, accountName, computeName, options),
    beginStart: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, accountName, computeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, accountName, computeName, options);
    },
    list: (resourceGroupName: string, accountName: string, options?: ComputesListOptionalParams) =>
      list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, computeName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, computeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, computeName, options);
    },
    update: (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      properties: Compute,
      options?: ComputesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, computeName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      properties: Compute,
      options?: ComputesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        accountName,
        computeName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      properties: Compute,
      options?: ComputesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        accountName,
        computeName,
        properties,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      resource: Compute,
      options?: ComputesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, computeName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      resource: Compute,
      options?: ComputesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        computeName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      resource: Compute,
      options?: ComputesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        computeName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      computeName: string,
      options?: ComputesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, computeName, options),
  };
}

export function _getComputesOperations(
  context: CognitiveServicesManagementContext,
): ComputesOperations {
  return {
    ..._getComputes(context),
  };
}
