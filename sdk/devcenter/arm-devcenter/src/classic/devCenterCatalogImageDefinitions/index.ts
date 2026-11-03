// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  buildImage,
  getErrorDetails,
  listByDevCenterCatalog,
  getByDevCenterCatalog,
} from "../../api/devCenterCatalogImageDefinitions/operations.js";
import type {
  DevCenterCatalogImageDefinitionsBuildImageOptionalParams,
  DevCenterCatalogImageDefinitionsGetErrorDetailsOptionalParams,
  DevCenterCatalogImageDefinitionsListByDevCenterCatalogOptionalParams,
  DevCenterCatalogImageDefinitionsGetByDevCenterCatalogOptionalParams,
} from "../../api/devCenterCatalogImageDefinitions/options.js";
import type {
  CatalogResourceValidationErrorDetails,
  ImageDefinition,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DevCenterCatalogImageDefinitions operations. */
export interface DevCenterCatalogImageDefinitionsOperations {
  /** Builds an image for the specified Image Definition. */
  buildImage: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: DevCenterCatalogImageDefinitionsBuildImageOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use buildImage instead */
  beginBuildImage: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: DevCenterCatalogImageDefinitionsBuildImageOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use buildImage instead */
  beginBuildImageAndWait: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: DevCenterCatalogImageDefinitionsBuildImageOptionalParams,
  ) => Promise<void>;
  /** Gets Image Definition error details. */
  getErrorDetails: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: DevCenterCatalogImageDefinitionsGetErrorDetailsOptionalParams,
  ) => Promise<CatalogResourceValidationErrorDetails>;
  /** List Image Definitions in the catalog. */
  listByDevCenterCatalog: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: DevCenterCatalogImageDefinitionsListByDevCenterCatalogOptionalParams,
  ) => PagedAsyncIterableIterator<ImageDefinition>;
  /** Gets an Image Definition from the catalog */
  getByDevCenterCatalog: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: DevCenterCatalogImageDefinitionsGetByDevCenterCatalogOptionalParams,
  ) => Promise<ImageDefinition>;
}

function _getDevCenterCatalogImageDefinitions(context: DevCenterContext) {
  return {
    buildImage: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: DevCenterCatalogImageDefinitionsBuildImageOptionalParams,
    ) =>
      buildImage(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        options,
      ),
    beginBuildImage: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: DevCenterCatalogImageDefinitionsBuildImageOptionalParams,
    ) => {
      const poller = buildImage(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginBuildImageAndWait: async (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: DevCenterCatalogImageDefinitionsBuildImageOptionalParams,
    ) => {
      return await buildImage(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        options,
      );
    },
    getErrorDetails: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: DevCenterCatalogImageDefinitionsGetErrorDetailsOptionalParams,
    ) =>
      getErrorDetails(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        options,
      ),
    listByDevCenterCatalog: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: DevCenterCatalogImageDefinitionsListByDevCenterCatalogOptionalParams,
    ) => listByDevCenterCatalog(context, resourceGroupName, devCenterName, catalogName, options),
    getByDevCenterCatalog: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: DevCenterCatalogImageDefinitionsGetByDevCenterCatalogOptionalParams,
    ) =>
      getByDevCenterCatalog(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        options,
      ),
  };
}

export function _getDevCenterCatalogImageDefinitionsOperations(
  context: DevCenterContext,
): DevCenterCatalogImageDefinitionsOperations {
  return {
    ..._getDevCenterCatalogImageDefinitions(context),
  };
}
