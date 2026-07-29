// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listByContainerApp,
  $delete,
  createOrUpdate,
  get,
} from "../../api/containerAppsSourceControls/operations.js";
import {
  ContainerAppsSourceControlsListByContainerAppOptionalParams,
  ContainerAppsSourceControlsDeleteOptionalParams,
  ContainerAppsSourceControlsCreateOrUpdateOptionalParams,
  ContainerAppsSourceControlsGetOptionalParams,
} from "../../api/containerAppsSourceControls/options.js";
import { SourceControl } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ContainerAppsSourceControls operations. */
export interface ContainerAppsSourceControlsOperations {
  /** Get the Container App SourceControls in a given resource group. */
  listByContainerApp: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsSourceControlsListByContainerAppOptionalParams,
  ) => PagedAsyncIterableIterator<SourceControl>;
  /** Delete a Container App SourceControl. */
  delete: (
    resourceGroupName: string,
    containerAppName: string,
    sourceControlName: string,
    options?: ContainerAppsSourceControlsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    containerAppName: string,
    sourceControlName: string,
    options?: ContainerAppsSourceControlsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    sourceControlName: string,
    options?: ContainerAppsSourceControlsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update the SourceControl for a Container App. */
  createOrUpdate: (
    resourceGroupName: string,
    containerAppName: string,
    sourceControlName: string,
    sourceControlEnvelope: SourceControl,
    options?: ContainerAppsSourceControlsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SourceControl>, SourceControl>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    containerAppName: string,
    sourceControlName: string,
    sourceControlEnvelope: SourceControl,
    options?: ContainerAppsSourceControlsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SourceControl>, SourceControl>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    sourceControlName: string,
    sourceControlEnvelope: SourceControl,
    options?: ContainerAppsSourceControlsCreateOrUpdateOptionalParams,
  ) => Promise<SourceControl>;
  /** Get a SourceControl of a Container App. */
  get: (
    resourceGroupName: string,
    containerAppName: string,
    sourceControlName: string,
    options?: ContainerAppsSourceControlsGetOptionalParams,
  ) => Promise<SourceControl>;
}

function _getContainerAppsSourceControls(context: ContainerAppsAPIContext) {
  return {
    listByContainerApp: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsSourceControlsListByContainerAppOptionalParams,
    ) => listByContainerApp(context, resourceGroupName, containerAppName, options),
    delete: (
      resourceGroupName: string,
      containerAppName: string,
      sourceControlName: string,
      options?: ContainerAppsSourceControlsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, containerAppName, sourceControlName, options),
    beginDelete: async (
      resourceGroupName: string,
      containerAppName: string,
      sourceControlName: string,
      options?: ContainerAppsSourceControlsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        containerAppName,
        sourceControlName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      sourceControlName: string,
      options?: ContainerAppsSourceControlsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        containerAppName,
        sourceControlName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      containerAppName: string,
      sourceControlName: string,
      sourceControlEnvelope: SourceControl,
      options?: ContainerAppsSourceControlsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        containerAppName,
        sourceControlName,
        sourceControlEnvelope,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      containerAppName: string,
      sourceControlName: string,
      sourceControlEnvelope: SourceControl,
      options?: ContainerAppsSourceControlsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        containerAppName,
        sourceControlName,
        sourceControlEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      sourceControlName: string,
      sourceControlEnvelope: SourceControl,
      options?: ContainerAppsSourceControlsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        containerAppName,
        sourceControlName,
        sourceControlEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      containerAppName: string,
      sourceControlName: string,
      options?: ContainerAppsSourceControlsGetOptionalParams,
    ) => get(context, resourceGroupName, containerAppName, sourceControlName, options),
  };
}

export function _getContainerAppsSourceControlsOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsSourceControlsOperations {
  return {
    ..._getContainerAppsSourceControls(context),
  };
}
