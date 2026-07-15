// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { listByImageDefinition } from "../../api/projectCatalogImageDefinitionBuilds/operations.js";
import type { ProjectCatalogImageDefinitionBuildsListByImageDefinitionOptionalParams } from "../../api/projectCatalogImageDefinitionBuilds/options.js";
import type { ImageDefinitionBuild } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProjectCatalogImageDefinitionBuilds operations. */
export interface ProjectCatalogImageDefinitionBuildsOperations {
  /** Lists builds for a specified image definition. */
  listByImageDefinition: (
    resourceGroupName: string,
    projectName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: ProjectCatalogImageDefinitionBuildsListByImageDefinitionOptionalParams,
  ) => PagedAsyncIterableIterator<ImageDefinitionBuild>;
}

function _getProjectCatalogImageDefinitionBuilds(context: DevCenterContext) {
  return {
    listByImageDefinition: (
      resourceGroupName: string,
      projectName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: ProjectCatalogImageDefinitionBuildsListByImageDefinitionOptionalParams,
    ) =>
      listByImageDefinition(
        context,
        resourceGroupName,
        projectName,
        catalogName,
        imageDefinitionName,
        options,
      ),
  };
}

export function _getProjectCatalogImageDefinitionBuildsOperations(
  context: DevCenterContext,
): ProjectCatalogImageDefinitionBuildsOperations {
  return {
    ..._getProjectCatalogImageDefinitionBuilds(context),
  };
}
