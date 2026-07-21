// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import {
  checkNameAvailability,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managedPrivateEndpoints/operations.js";
import type {
  ManagedPrivateEndpointsCheckNameAvailabilityOptionalParams,
  ManagedPrivateEndpointsListOptionalParams,
  ManagedPrivateEndpointsDeleteOptionalParams,
  ManagedPrivateEndpointsUpdateOptionalParams,
  ManagedPrivateEndpointsCreateOrUpdateOptionalParams,
  ManagedPrivateEndpointsGetOptionalParams,
} from "../../api/managedPrivateEndpoints/options.js";
import type {
  CheckNameResult,
  ManagedPrivateEndpoint,
  ManagedPrivateEndpointsCheckNameRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedPrivateEndpoints operations. */
export interface ManagedPrivateEndpointsOperations {
  /** Checks that the managed private endpoints resource name is valid and is not already in use. */
  checkNameAvailability: (
    resourceGroupName: string,
    clusterName: string,
    resourceName: ManagedPrivateEndpointsCheckNameRequest,
    options?: ManagedPrivateEndpointsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameResult>;
  /** Returns the list of managed private endpoints. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: ManagedPrivateEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedPrivateEndpoint>;
  /** Deletes a managed private endpoint. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    managedPrivateEndpointName: string,
    options?: ManagedPrivateEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    managedPrivateEndpointName: string,
    options?: ManagedPrivateEndpointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    managedPrivateEndpointName: string,
    options?: ManagedPrivateEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a managed private endpoint. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    managedPrivateEndpointName: string,
    parameters: ManagedPrivateEndpoint,
    options?: ManagedPrivateEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedPrivateEndpoint>, ManagedPrivateEndpoint>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    managedPrivateEndpointName: string,
    parameters: ManagedPrivateEndpoint,
    options?: ManagedPrivateEndpointsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedPrivateEndpoint>, ManagedPrivateEndpoint>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    managedPrivateEndpointName: string,
    parameters: ManagedPrivateEndpoint,
    options?: ManagedPrivateEndpointsUpdateOptionalParams,
  ) => Promise<ManagedPrivateEndpoint>;
  /** Creates a managed private endpoint. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    managedPrivateEndpointName: string,
    parameters: ManagedPrivateEndpoint,
    options?: ManagedPrivateEndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedPrivateEndpoint>, ManagedPrivateEndpoint>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    managedPrivateEndpointName: string,
    parameters: ManagedPrivateEndpoint,
    options?: ManagedPrivateEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedPrivateEndpoint>, ManagedPrivateEndpoint>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    managedPrivateEndpointName: string,
    parameters: ManagedPrivateEndpoint,
    options?: ManagedPrivateEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedPrivateEndpoint>;
  /** Gets a managed private endpoint. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    managedPrivateEndpointName: string,
    options?: ManagedPrivateEndpointsGetOptionalParams,
  ) => Promise<ManagedPrivateEndpoint>;
}

function _getManagedPrivateEndpoints(context: KustoManagementContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      clusterName: string,
      resourceName: ManagedPrivateEndpointsCheckNameRequest,
      options?: ManagedPrivateEndpointsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, resourceGroupName, clusterName, resourceName, options),
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: ManagedPrivateEndpointsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      managedPrivateEndpointName: string,
      options?: ManagedPrivateEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, managedPrivateEndpointName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      managedPrivateEndpointName: string,
      options?: ManagedPrivateEndpointsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        managedPrivateEndpointName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      managedPrivateEndpointName: string,
      options?: ManagedPrivateEndpointsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        managedPrivateEndpointName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      managedPrivateEndpointName: string,
      parameters: ManagedPrivateEndpoint,
      options?: ManagedPrivateEndpointsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        clusterName,
        managedPrivateEndpointName,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      managedPrivateEndpointName: string,
      parameters: ManagedPrivateEndpoint,
      options?: ManagedPrivateEndpointsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        managedPrivateEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      managedPrivateEndpointName: string,
      parameters: ManagedPrivateEndpoint,
      options?: ManagedPrivateEndpointsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        managedPrivateEndpointName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      managedPrivateEndpointName: string,
      parameters: ManagedPrivateEndpoint,
      options?: ManagedPrivateEndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        managedPrivateEndpointName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      managedPrivateEndpointName: string,
      parameters: ManagedPrivateEndpoint,
      options?: ManagedPrivateEndpointsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        managedPrivateEndpointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      managedPrivateEndpointName: string,
      parameters: ManagedPrivateEndpoint,
      options?: ManagedPrivateEndpointsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        managedPrivateEndpointName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      managedPrivateEndpointName: string,
      options?: ManagedPrivateEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, managedPrivateEndpointName, options),
  };
}

export function _getManagedPrivateEndpointsOperations(
  context: KustoManagementContext,
): ManagedPrivateEndpointsOperations {
  return {
    ..._getManagedPrivateEndpoints(context),
  };
}
