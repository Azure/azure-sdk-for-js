// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list } from "../../api/buildsByBuilderResource/operations.js";
import { BuildsByBuilderResourceListOptionalParams } from "../../api/buildsByBuilderResource/options.js";
import { BuildResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BuildsByBuilderResource operations. */
export interface BuildsByBuilderResourceOperations {
  /** List BuildResource resources by BuilderResource */
  list: (
    resourceGroupName: string,
    builderName: string,
    options?: BuildsByBuilderResourceListOptionalParams,
  ) => PagedAsyncIterableIterator<BuildResource>;
}

function _getBuildsByBuilderResource(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      builderName: string,
      options?: BuildsByBuilderResourceListOptionalParams,
    ) => list(context, resourceGroupName, builderName, options),
  };
}

export function _getBuildsByBuilderResourceOperations(
  context: ContainerAppsAPIContext,
): BuildsByBuilderResourceOperations {
  return {
    ..._getBuildsByBuilderResource(context),
  };
}
