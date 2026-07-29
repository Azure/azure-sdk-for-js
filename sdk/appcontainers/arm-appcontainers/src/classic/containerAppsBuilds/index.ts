// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { $delete, get } from "../../api/containerAppsBuilds/operations.js";
import {
  ContainerAppsBuildsDeleteOptionalParams,
  ContainerAppsBuildsGetOptionalParams,
} from "../../api/containerAppsBuilds/options.js";
import { ContainerAppsBuildResource } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ContainerAppsBuilds operations. */
export interface ContainerAppsBuildsOperations {
  /** Delete a Container Apps Build resource */
  delete: (
    resourceGroupName: string,
    containerAppName: string,
    buildName: string,
    options?: ContainerAppsBuildsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    containerAppName: string,
    buildName: string,
    options?: ContainerAppsBuildsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    containerAppName: string,
    buildName: string,
    options?: ContainerAppsBuildsDeleteOptionalParams,
  ) => Promise<void>;
  /** Get a Container Apps Build resource */
  get: (
    resourceGroupName: string,
    containerAppName: string,
    buildName: string,
    options?: ContainerAppsBuildsGetOptionalParams,
  ) => Promise<ContainerAppsBuildResource>;
}

function _getContainerAppsBuilds(context: ContainerAppsAPIContext) {
  return {
    delete: (
      resourceGroupName: string,
      containerAppName: string,
      buildName: string,
      options?: ContainerAppsBuildsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, containerAppName, buildName, options),
    beginDelete: async (
      resourceGroupName: string,
      containerAppName: string,
      buildName: string,
      options?: ContainerAppsBuildsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, containerAppName, buildName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      containerAppName: string,
      buildName: string,
      options?: ContainerAppsBuildsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, containerAppName, buildName, options);
    },
    get: (
      resourceGroupName: string,
      containerAppName: string,
      buildName: string,
      options?: ContainerAppsBuildsGetOptionalParams,
    ) => get(context, resourceGroupName, containerAppName, buildName, options),
  };
}

export function _getContainerAppsBuildsOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsBuildsOperations {
  return {
    ..._getContainerAppsBuilds(context),
  };
}
