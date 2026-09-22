// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  buildImage,
  getErrorDetails,
  listByProjectCatalog,
  getByProjectCatalog,
} from "../../api/projectCatalogImageDefinitions/operations.js";
import type {
  ProjectCatalogImageDefinitionsBuildImageOptionalParams,
  ProjectCatalogImageDefinitionsGetErrorDetailsOptionalParams,
  ProjectCatalogImageDefinitionsListByProjectCatalogOptionalParams,
  ProjectCatalogImageDefinitionsGetByProjectCatalogOptionalParams,
} from "../../api/projectCatalogImageDefinitions/options.js";
import type {
  CatalogResourceValidationErrorDetails,
  ImageDefinition,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProjectCatalogImageDefinitions operations. */
export interface ProjectCatalogImageDefinitionsOperations {
  /** Builds an image for the specified Image Definition. */
  buildImage: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: ProjectCatalogImageDefinitionsBuildImageOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use buildImage instead */
  beginBuildImage: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: ProjectCatalogImageDefinitionsBuildImageOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use buildImage instead */
  beginBuildImageAndWait: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: ProjectCatalogImageDefinitionsBuildImageOptionalParams,
  ) => Promise<void>;
  /** Gets Image Definition error details. */
  getErrorDetails: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: ProjectCatalogImageDefinitionsGetErrorDetailsOptionalParams,
  ) => Promise<CatalogResourceValidationErrorDetails>;
  /** List Image Definitions in the catalog. */
  listByProjectCatalog: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: ProjectCatalogImageDefinitionsListByProjectCatalogOptionalParams,
  ) => PagedAsyncIterableIterator<ImageDefinition>;
  /** Gets an Image Definition from the catalog. */
  getByProjectCatalog: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: ProjectCatalogImageDefinitionsGetByProjectCatalogOptionalParams,
  ) => Promise<ImageDefinition>;
}

function _getProjectCatalogImageDefinitions(context: DevCenterContext) {
  return {
    buildImage: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: ProjectCatalogImageDefinitionsBuildImageOptionalParams,
    ) =>
      buildImage(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        imageDefinitionName,
        options,
      ),
    beginBuildImage: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: ProjectCatalogImageDefinitionsBuildImageOptionalParams,
    ) => {
      const poller = buildImage(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        imageDefinitionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginBuildImageAndWait: async (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: ProjectCatalogImageDefinitionsBuildImageOptionalParams,
    ) => {
      return await buildImage(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        imageDefinitionName,
        options,
      );
    },
    getErrorDetails: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: ProjectCatalogImageDefinitionsGetErrorDetailsOptionalParams,
    ) =>
      getErrorDetails(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        imageDefinitionName,
        options,
      ),
    listByProjectCatalog: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: ProjectCatalogImageDefinitionsListByProjectCatalogOptionalParams,
    ) => listByProjectCatalog(context, resourceGroupName, projectName, catalogName, options),
    getByProjectCatalog: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: ProjectCatalogImageDefinitionsGetByProjectCatalogOptionalParams,
    ) =>
      getByProjectCatalog(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        imageDefinitionName,
        options,
      ),
  };
}

export function _getProjectCatalogImageDefinitionsOperations(
  context: DevCenterContext,
): ProjectCatalogImageDefinitionsOperations {
  return {
    ..._getProjectCatalogImageDefinitions(context),
  };
}
