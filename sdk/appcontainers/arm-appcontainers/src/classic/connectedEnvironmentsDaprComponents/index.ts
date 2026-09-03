// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listSecrets,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectedEnvironmentsDaprComponents/operations.js";
import {
  ConnectedEnvironmentsDaprComponentsListSecretsOptionalParams,
  ConnectedEnvironmentsDaprComponentsListOptionalParams,
  ConnectedEnvironmentsDaprComponentsDeleteOptionalParams,
  ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams,
  ConnectedEnvironmentsDaprComponentsGetOptionalParams,
} from "../../api/connectedEnvironmentsDaprComponents/options.js";
import { DaprComponent, DaprSecretsCollection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectedEnvironmentsDaprComponents operations. */
export interface ConnectedEnvironmentsDaprComponentsOperations {
  /** List secrets for a dapr component */
  listSecrets: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    componentName: string,
    options?: ConnectedEnvironmentsDaprComponentsListSecretsOptionalParams,
  ) => Promise<DaprSecretsCollection>;
  /** Get the Dapr Components for a connected environment. */
  list: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    options?: ConnectedEnvironmentsDaprComponentsListOptionalParams,
  ) => PagedAsyncIterableIterator<DaprComponent>;
  /** Delete a Dapr Component from a connected environment. */
  delete: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    componentName: string,
    options?: ConnectedEnvironmentsDaprComponentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    componentName: string,
    options?: ConnectedEnvironmentsDaprComponentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    componentName: string,
    options?: ConnectedEnvironmentsDaprComponentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Dapr Component in a connected environment. */
  createOrUpdate: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    componentName: string,
    daprComponentEnvelope: DaprComponent,
    options?: ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DaprComponent>, DaprComponent>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    componentName: string,
    daprComponentEnvelope: DaprComponent,
    options?: ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DaprComponent>, DaprComponent>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    componentName: string,
    daprComponentEnvelope: DaprComponent,
    options?: ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams,
  ) => Promise<DaprComponent>;
  /** Get a dapr component. */
  get: (
    resourceGroupName: string,
    connectedEnvironmentName: string,
    componentName: string,
    options?: ConnectedEnvironmentsDaprComponentsGetOptionalParams,
  ) => Promise<DaprComponent>;
}

function _getConnectedEnvironmentsDaprComponents(context: ContainerAppsAPIContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      componentName: string,
      options?: ConnectedEnvironmentsDaprComponentsListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, connectedEnvironmentName, componentName, options),
    list: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      options?: ConnectedEnvironmentsDaprComponentsListOptionalParams,
    ) => list(context, resourceGroupName, connectedEnvironmentName, options),
    delete: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      componentName: string,
      options?: ConnectedEnvironmentsDaprComponentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, connectedEnvironmentName, componentName, options),
    beginDelete: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      componentName: string,
      options?: ConnectedEnvironmentsDaprComponentsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        componentName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      componentName: string,
      options?: ConnectedEnvironmentsDaprComponentsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        componentName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      componentName: string,
      daprComponentEnvelope: DaprComponent,
      options?: ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        componentName,
        daprComponentEnvelope,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      componentName: string,
      daprComponentEnvelope: DaprComponent,
      options?: ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        componentName,
        daprComponentEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      componentName: string,
      daprComponentEnvelope: DaprComponent,
      options?: ConnectedEnvironmentsDaprComponentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        componentName,
        daprComponentEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      connectedEnvironmentName: string,
      componentName: string,
      options?: ConnectedEnvironmentsDaprComponentsGetOptionalParams,
    ) => get(context, resourceGroupName, connectedEnvironmentName, componentName, options),
  };
}

export function _getConnectedEnvironmentsDaprComponentsOperations(
  context: ContainerAppsAPIContext,
): ConnectedEnvironmentsDaprComponentsOperations {
  return {
    ..._getConnectedEnvironmentsDaprComponents(context),
  };
}
