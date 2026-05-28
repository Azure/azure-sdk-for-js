// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dotNetComponents/operations.js";
import {
  DotNetComponentsListOptionalParams,
  DotNetComponentsDeleteOptionalParams,
  DotNetComponentsUpdateOptionalParams,
  DotNetComponentsCreateOrUpdateOptionalParams,
  DotNetComponentsGetOptionalParams,
} from "../../api/dotNetComponents/options.js";
import { DotNetComponent } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DotNetComponents operations. */
export interface DotNetComponentsOperations {
  /** Get the .NET Components for a managed environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: DotNetComponentsListOptionalParams,
  ) => PagedAsyncIterableIterator<DotNetComponent>;
  /** Delete a .NET Component. */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: DotNetComponentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: DotNetComponentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: DotNetComponentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches a .NET Component using JSON Merge Patch */
  update: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    dotNetComponentEnvelope: DotNetComponent,
    options?: DotNetComponentsUpdateOptionalParams,
  ) => PollerLike<OperationState<DotNetComponent>, DotNetComponent>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    dotNetComponentEnvelope: DotNetComponent,
    options?: DotNetComponentsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DotNetComponent>, DotNetComponent>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    dotNetComponentEnvelope: DotNetComponent,
    options?: DotNetComponentsUpdateOptionalParams,
  ) => Promise<DotNetComponent>;
  /** Creates or updates a .NET Component in a Managed Environment. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    dotNetComponentEnvelope: DotNetComponent,
    options?: DotNetComponentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DotNetComponent>, DotNetComponent>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    dotNetComponentEnvelope: DotNetComponent,
    options?: DotNetComponentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DotNetComponent>, DotNetComponent>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    dotNetComponentEnvelope: DotNetComponent,
    options?: DotNetComponentsCreateOrUpdateOptionalParams,
  ) => Promise<DotNetComponent>;
  /** Get a .NET Component. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: DotNetComponentsGetOptionalParams,
  ) => Promise<DotNetComponent>;
}

function _getDotNetComponents(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: DotNetComponentsListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      options?: DotNetComponentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, environmentName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      options?: DotNetComponentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, environmentName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      options?: DotNetComponentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, environmentName, name, options);
    },
    update: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      dotNetComponentEnvelope: DotNetComponent,
      options?: DotNetComponentsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, environmentName, name, dotNetComponentEnvelope, options),
    beginUpdate: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      dotNetComponentEnvelope: DotNetComponent,
      options?: DotNetComponentsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        environmentName,
        name,
        dotNetComponentEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      dotNetComponentEnvelope: DotNetComponent,
      options?: DotNetComponentsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        environmentName,
        name,
        dotNetComponentEnvelope,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      dotNetComponentEnvelope: DotNetComponent,
      options?: DotNetComponentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        name,
        dotNetComponentEnvelope,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      dotNetComponentEnvelope: DotNetComponent,
      options?: DotNetComponentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        name,
        dotNetComponentEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      dotNetComponentEnvelope: DotNetComponent,
      options?: DotNetComponentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        name,
        dotNetComponentEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      options?: DotNetComponentsGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, name, options),
  };
}

export function _getDotNetComponentsOperations(
  context: ContainerAppsAPIContext,
): DotNetComponentsOperations {
  return {
    ..._getDotNetComponents(context),
  };
}
