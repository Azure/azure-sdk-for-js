// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  getBuildDetails,
  cancel,
  get,
} from "../../api/projectCatalogImageDefinitionBuild/operations.js";
import type {
  ProjectCatalogImageDefinitionBuildGetBuildDetailsOptionalParams,
  ProjectCatalogImageDefinitionBuildCancelOptionalParams,
  ProjectCatalogImageDefinitionBuildGetOptionalParams,
} from "../../api/projectCatalogImageDefinitionBuild/options.js";
import type { ImageDefinitionBuild, ImageDefinitionBuildDetails } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProjectCatalogImageDefinitionBuild operations. */
export interface ProjectCatalogImageDefinitionBuildOperations {
  /** Gets Build details. */
  getBuildDetails: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    imageDefinitionName: string,
    buildName: string,
    options?: ProjectCatalogImageDefinitionBuildGetBuildDetailsOptionalParams,
  ) => Promise<ImageDefinitionBuildDetails>;
  /** Cancels the specified build for an image definition. */
  cancel: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    imageDefinitionName: string,
    buildName: string,
    options?: ProjectCatalogImageDefinitionBuildCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets a build for a specified image definition. */
  get: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    imageDefinitionName: string,
    buildName: string,
    options?: ProjectCatalogImageDefinitionBuildGetOptionalParams,
  ) => Promise<ImageDefinitionBuild>;
}

function _getProjectCatalogImageDefinitionBuild(context: DevCenterContext) {
  return {
    getBuildDetails: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      imageDefinitionName: string,
      buildName: string,
      options?: ProjectCatalogImageDefinitionBuildGetBuildDetailsOptionalParams,
    ) =>
      getBuildDetails(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        imageDefinitionName,
        buildName,
        options,
      ),
    cancel: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      imageDefinitionName: string,
      buildName: string,
      options?: ProjectCatalogImageDefinitionBuildCancelOptionalParams,
    ) =>
      cancel(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        imageDefinitionName,
        buildName,
        options,
      ),
    get: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      imageDefinitionName: string,
      buildName: string,
      options?: ProjectCatalogImageDefinitionBuildGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        imageDefinitionName,
        buildName,
        options,
      ),
  };
}

export function _getProjectCatalogImageDefinitionBuildOperations(
  context: DevCenterContext,
): ProjectCatalogImageDefinitionBuildOperations {
  return {
    ..._getProjectCatalogImageDefinitionBuild(context),
  };
}
