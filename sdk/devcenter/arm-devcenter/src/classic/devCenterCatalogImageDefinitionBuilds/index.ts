// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { listByImageDefinition } from "../../api/devCenterCatalogImageDefinitionBuilds/operations.js";
import type { DevCenterCatalogImageDefinitionBuildsListByImageDefinitionOptionalParams } from "../../api/devCenterCatalogImageDefinitionBuilds/options.js";
import type { ImageDefinitionBuild } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DevCenterCatalogImageDefinitionBuilds operations. */
export interface DevCenterCatalogImageDefinitionBuildsOperations {
  /** Lists builds for a specified image definition. */
  listByImageDefinition: (
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    imageDefinitionName: string,
    options?: DevCenterCatalogImageDefinitionBuildsListByImageDefinitionOptionalParams,
  ) => PagedAsyncIterableIterator<ImageDefinitionBuild>;
}

function _getDevCenterCatalogImageDefinitionBuilds(context: DevCenterContext) {
  return {
    listByImageDefinition: (
      resourceGroupName: string,
      devCenterName: string,
      catalogName: string,
      imageDefinitionName: string,
      options?: DevCenterCatalogImageDefinitionBuildsListByImageDefinitionOptionalParams,
    ) =>
      listByImageDefinition(
        context,
        resourceGroupName,
        devCenterName,
        catalogName,
        imageDefinitionName,
        options,
      ),
  };
}

export function _getDevCenterCatalogImageDefinitionBuildsOperations(
  context: DevCenterContext,
): DevCenterCatalogImageDefinitionBuildsOperations {
  return {
    ..._getDevCenterCatalogImageDefinitionBuilds(context),
  };
}
