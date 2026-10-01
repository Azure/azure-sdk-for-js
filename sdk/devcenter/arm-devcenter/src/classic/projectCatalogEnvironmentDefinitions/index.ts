// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { getErrorDetails } from "../../api/projectCatalogEnvironmentDefinitions/operations.js";
import type { ProjectCatalogEnvironmentDefinitionsGetErrorDetailsOptionalParams } from "../../api/projectCatalogEnvironmentDefinitions/options.js";
import type { CatalogResourceValidationErrorDetails } from "../../models/models.js";

/** Interface representing a ProjectCatalogEnvironmentDefinitions operations. */
export interface ProjectCatalogEnvironmentDefinitionsOperations {
  /** Gets Environment Definition error details. */
  getErrorDetails: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    environmentDefinitionName: string,
    options?: ProjectCatalogEnvironmentDefinitionsGetErrorDetailsOptionalParams,
  ) => Promise<CatalogResourceValidationErrorDetails>;
}

function _getProjectCatalogEnvironmentDefinitions(context: DevCenterContext) {
  return {
    getErrorDetails: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      environmentDefinitionName: string,
      options?: ProjectCatalogEnvironmentDefinitionsGetErrorDetailsOptionalParams,
    ) =>
      getErrorDetails(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        environmentDefinitionName,
        options,
      ),
  };
}

export function _getProjectCatalogEnvironmentDefinitionsOperations(
  context: DevCenterContext,
): ProjectCatalogEnvironmentDefinitionsOperations {
  return {
    ..._getProjectCatalogEnvironmentDefinitions(context),
  };
}
