// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  getBuildDetails,
  cancel,
  get,
} from "../../api/devCenterCatalogImageDefinitionBuild/operations.js";
import type {
  DevCenterCatalogImageDefinitionBuildGetBuildDetailsOptionalParams,
  DevCenterCatalogImageDefinitionBuildCancelOptionalParams,
  DevCenterCatalogImageDefinitionBuildGetOptionalParams,
} from "../../api/devCenterCatalogImageDefinitionBuild/options.js";
import type { ImageDefinitionBuild, ImageDefinitionBuildDetails } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DevCenterCatalogImageDefinitionBuild operations. */
export interface DevCenterCatalogImageDefinitionBuildOperations {
  /** Gets Build details. */
  getBuildDetails: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    imageDefinitionName: string,
    buildName: string,
    options?: DevCenterCatalogImageDefinitionBuildGetBuildDetailsOptionalParams,
  ) => Promise<ImageDefinitionBuildDetails>;
  /** Cancels the specified build for an image definition. */
  cancel: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    imageDefinitionName: string,
    buildName: string,
    options?: DevCenterCatalogImageDefinitionBuildCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets a build for a specified image definition. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    imageDefinitionName: string,
    buildName: string,
    options?: DevCenterCatalogImageDefinitionBuildGetOptionalParams,
  ) => Promise<ImageDefinitionBuild>;
}

function _getDevCenterCatalogImageDefinitionBuild(context: DevCenterContext) {
  return {
    getBuildDetails: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      imageDefinitionName: string,
      buildName: string,
      options?: DevCenterCatalogImageDefinitionBuildGetBuildDetailsOptionalParams,
    ) =>
      getBuildDetails(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        buildName,
        options,
      ),
    cancel: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      imageDefinitionName: string,
      buildName: string,
      options?: DevCenterCatalogImageDefinitionBuildCancelOptionalParams,
    ) =>
      cancel(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        buildName,
        options,
      ),
    get: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      imageDefinitionName: string,
      buildName: string,
      options?: DevCenterCatalogImageDefinitionBuildGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        buildName,
        options,
      ),
  };
}

export function _getDevCenterCatalogImageDefinitionBuildOperations(
  context: DevCenterContext,
): DevCenterCatalogImageDefinitionBuildOperations {
  return {
    ..._getDevCenterCatalogImageDefinitionBuild(context),
  };
}
