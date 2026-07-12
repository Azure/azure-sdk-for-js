// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  apply,
  skipConfigure,
  listByContainerApp,
  $delete,
  get,
} from "../../api/containerAppsPatches/operations.js";
import {
  ContainerAppsPatchesApplyOptionalParams,
  ContainerAppsPatchesSkipConfigureOptionalParams,
  ContainerAppsPatchesListByContainerAppOptionalParams,
  ContainerAppsPatchesDeleteOptionalParams,
  ContainerAppsPatchesGetOptionalParams,
} from "../../api/containerAppsPatches/options.js";
import { ContainerAppsPatchResource, PatchSkipConfig } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ContainerAppsPatches operations. */
export interface ContainerAppsPatchesOperations {
  /** Apply a Container Apps Patch resource with patch name. */
  apply: (
    resourceGroupName: string,
    containerAppName: string,
    patchName: string,
    options?: ContainerAppsPatchesApplyOptionalParams,
  ) => PollerLike<OperationState<ContainerAppsPatchResource>, ContainerAppsPatchResource>;
  /** @deprecated use apply instead */
  beginApply: (
    resourceGroupName: string,
    containerAppName: string,
    patchName: string,
    options?: ContainerAppsPatchesApplyOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ContainerAppsPatchResource>, ContainerAppsPatchResource>
  >;
  /** @deprecated use apply instead */
  beginApplyAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    patchName: string,
    options?: ContainerAppsPatchesApplyOptionalParams,
  ) => Promise<ContainerAppsPatchResource>;
  /** Configure the Container Apps Patch skip option by patch name. */
  skipConfigure: (
    resourceGroupName: string,
    containerAppName: string,
    patchName: string,
    patchSkipConfig: PatchSkipConfig,
    options?: ContainerAppsPatchesSkipConfigureOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use skipConfigure instead */
  beginSkipConfigure: (
    resourceGroupName: string,
    containerAppName: string,
    patchName: string,
    patchSkipConfig: PatchSkipConfig,
    options?: ContainerAppsPatchesSkipConfigureOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use skipConfigure instead */
  beginSkipConfigureAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    patchName: string,
    patchSkipConfig: PatchSkipConfig,
    options?: ContainerAppsPatchesSkipConfigureOptionalParams,
  ) => Promise<void>;
  /** List Container Apps Patch resources by ContainerApp. */
  listByContainerApp: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsPatchesListByContainerAppOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerAppsPatchResource>;
  /** Delete specific Container Apps Patch by patch name. */
  delete: (
    resourceGroupName: string,
    containerAppName: string,
    patchName: string,
    options?: ContainerAppsPatchesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    containerAppName: string,
    patchName: string,
    options?: ContainerAppsPatchesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    patchName: string,
    options?: ContainerAppsPatchesDeleteOptionalParams,
  ) => Promise<void>;
  /** Get details for specific Container Apps Patch by patch name. */
  get: (
    resourceGroupName: string,
    containerAppName: string,
    patchName: string,
    options?: ContainerAppsPatchesGetOptionalParams,
  ) => Promise<ContainerAppsPatchResource>;
}

function _getContainerAppsPatches(context: ContainerAppsAPIContext) {
  return {
    apply: (
      resourceGroupName: string,
      containerAppName: string,
      patchName: string,
      options?: ContainerAppsPatchesApplyOptionalParams,
    ) => apply(context, resourceGroupName, containerAppName, patchName, options),
    beginApply: async (
      resourceGroupName: string,
      containerAppName: string,
      patchName: string,
      options?: ContainerAppsPatchesApplyOptionalParams,
    ) => {
      const poller = apply(context, resourceGroupName, containerAppName, patchName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApplyAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      patchName: string,
      options?: ContainerAppsPatchesApplyOptionalParams,
    ) => {
      return await apply(context, resourceGroupName, containerAppName, patchName, options);
    },
    skipConfigure: (
      resourceGroupName: string,
      containerAppName: string,
      patchName: string,
      patchSkipConfig: PatchSkipConfig,
      options?: ContainerAppsPatchesSkipConfigureOptionalParams,
    ) =>
      skipConfigure(
        context,
        resourceGroupName,
        containerAppName,
        patchName,
        patchSkipConfig,
        options,
      ),
    beginSkipConfigure: async (
      resourceGroupName: string,
      containerAppName: string,
      patchName: string,
      patchSkipConfig: PatchSkipConfig,
      options?: ContainerAppsPatchesSkipConfigureOptionalParams,
    ) => {
      const poller = skipConfigure(
        context,
        resourceGroupName,
        containerAppName,
        patchName,
        patchSkipConfig,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSkipConfigureAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      patchName: string,
      patchSkipConfig: PatchSkipConfig,
      options?: ContainerAppsPatchesSkipConfigureOptionalParams,
    ) => {
      return await skipConfigure(
        context,
        resourceGroupName,
        containerAppName,
        patchName,
        patchSkipConfig,
        options,
      );
    },
    listByContainerApp: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsPatchesListByContainerAppOptionalParams,
    ) => listByContainerApp(context, resourceGroupName, containerAppName, options),
    delete: (
      resourceGroupName: string,
      containerAppName: string,
      patchName: string,
      options?: ContainerAppsPatchesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, containerAppName, patchName, options),
    beginDelete: async (
      resourceGroupName: string,
      containerAppName: string,
      patchName: string,
      options?: ContainerAppsPatchesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, containerAppName, patchName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      patchName: string,
      options?: ContainerAppsPatchesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, containerAppName, patchName, options);
    },
    get: (
      resourceGroupName: string,
      containerAppName: string,
      patchName: string,
      options?: ContainerAppsPatchesGetOptionalParams,
    ) => get(context, resourceGroupName, containerAppName, patchName, options),
  };
}

export function _getContainerAppsPatchesOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsPatchesOperations {
  return {
    ..._getContainerAppsPatches(context),
  };
}
