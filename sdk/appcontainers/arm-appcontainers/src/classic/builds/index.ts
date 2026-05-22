// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { $delete, createOrUpdate, get } from "../../api/builds/operations.js";
import {
  BuildsDeleteOptionalParams,
  BuildsCreateOrUpdateOptionalParams,
  BuildsGetOptionalParams,
} from "../../api/builds/options.js";
import { BuildResource } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Builds operations. */
export interface BuildsOperations {
  /** Delete a BuildResource */
  delete: (
    resourceGroupName: string,
    builderName: string,
    buildName: string,
    options?: BuildsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    builderName: string,
    buildName: string,
    options?: BuildsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    builderName: string,
    buildName: string,
    options?: BuildsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a BuildResource */
  createOrUpdate: (
    resourceGroupName: string,
    builderName: string,
    buildName: string,
    buildEnvelope: BuildResource,
    options?: BuildsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<BuildResource>, BuildResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    builderName: string,
    buildName: string,
    buildEnvelope: BuildResource,
    options?: BuildsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BuildResource>, BuildResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    builderName: string,
    buildName: string,
    buildEnvelope: BuildResource,
    options?: BuildsCreateOrUpdateOptionalParams,
  ) => Promise<BuildResource>;
  /** Get a BuildResource */
  get: (
    resourceGroupName: string,
    builderName: string,
    buildName: string,
    options?: BuildsGetOptionalParams,
  ) => Promise<BuildResource>;
}

function _getBuilds(context: ContainerAppsAPIContext) {
  return {
    delete: (
      resourceGroupName: string,
      builderName: string,
      buildName: string,
      options?: BuildsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, builderName, buildName, options),
    beginDelete: async (
      resourceGroupName: string,
      builderName: string,
      buildName: string,
      options?: BuildsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, builderName, buildName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      builderName: string,
      buildName: string,
      options?: BuildsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, builderName, buildName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      builderName: string,
      buildName: string,
      buildEnvelope: BuildResource,
      options?: BuildsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, builderName, buildName, buildEnvelope, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      builderName: string,
      buildName: string,
      buildEnvelope: BuildResource,
      options?: BuildsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        builderName,
        buildName,
        buildEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      builderName: string,
      buildName: string,
      buildEnvelope: BuildResource,
      options?: BuildsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        builderName,
        buildName,
        buildEnvelope,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      builderName: string,
      buildName: string,
      options?: BuildsGetOptionalParams,
    ) => get(context, resourceGroupName, builderName, buildName, options),
  };
}

export function _getBuildsOperations(context: ContainerAppsAPIContext): BuildsOperations {
  return {
    ..._getBuilds(context),
  };
}
