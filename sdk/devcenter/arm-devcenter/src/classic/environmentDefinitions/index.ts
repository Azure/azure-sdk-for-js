// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  getErrorDetails,
  listByCatalog,
  get,
  listByProjectCatalog,
  getByProjectCatalog,
} from "../../api/environmentDefinitions/operations.js";
import type {
  EnvironmentDefinitionsGetErrorDetailsOptionalParams,
  EnvironmentDefinitionsListByCatalogOptionalParams,
  EnvironmentDefinitionsGetOptionalParams,
  EnvironmentDefinitionsListByProjectCatalogOptionalParams,
  EnvironmentDefinitionsGetByProjectCatalogOptionalParams,
} from "../../api/environmentDefinitions/options.js";
import type {
  EnvironmentDefinition,
  CatalogResourceValidationErrorDetails,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EnvironmentDefinitions operations. */
export interface EnvironmentDefinitionsOperations {
  /** Gets Environment Definition error details. */
  getErrorDetails: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    environmentDefinitionName: string,
    options?: EnvironmentDefinitionsGetErrorDetailsOptionalParams,
  ) => Promise<CatalogResourceValidationErrorDetails>;
  /** List environment definitions in the catalog. */
  listByCatalog: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: EnvironmentDefinitionsListByCatalogOptionalParams,
  ) => PagedAsyncIterableIterator<EnvironmentDefinition>;
  /** Gets an environment definition from the catalog. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    environmentDefinitionName: string,
    options?: EnvironmentDefinitionsGetOptionalParams,
  ) => Promise<EnvironmentDefinition>;
  /** Lists the environment definitions in this project catalog. */
  listByProjectCatalog: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    options?: EnvironmentDefinitionsListByProjectCatalogOptionalParams,
  ) => PagedAsyncIterableIterator<EnvironmentDefinition>;
  /** Gets an environment definition from the catalog. */
  getByProjectCatalog: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    environmentDefinitionName: string,
    options?: EnvironmentDefinitionsGetByProjectCatalogOptionalParams,
  ) => Promise<EnvironmentDefinition>;
}

function _getEnvironmentDefinitions(context: DevCenterContext) {
  return {
    getErrorDetails: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      environmentDefinitionName: string,
      options?: EnvironmentDefinitionsGetErrorDetailsOptionalParams,
    ) =>
      getErrorDetails(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        environmentDefinitionName,
        options,
      ),
    listByCatalog: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      options?: EnvironmentDefinitionsListByCatalogOptionalParams,
    ) => listByCatalog(context, resourceGroupName, devCenterName, catalogName, options),
    get: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      environmentDefinitionName: string,
      options?: EnvironmentDefinitionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        environmentDefinitionName,
        options,
      ),
    listByProjectCatalog: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      options?: EnvironmentDefinitionsListByProjectCatalogOptionalParams,
    ) => listByProjectCatalog(context, resourceGroupName, projectName, catalogName, options),
    getByProjectCatalog: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      environmentDefinitionName: string,
      options?: EnvironmentDefinitionsGetByProjectCatalogOptionalParams,
    ) =>
      getByProjectCatalog(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        environmentDefinitionName,
        options,
      ),
  };
}

export function _getEnvironmentDefinitionsOperations(
  context: DevCenterContext,
): EnvironmentDefinitionsOperations {
  return {
    ..._getEnvironmentDefinitions(context),
  };
}
