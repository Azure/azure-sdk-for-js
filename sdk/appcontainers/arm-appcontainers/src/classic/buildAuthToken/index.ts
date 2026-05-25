// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list } from "../../api/buildAuthToken/operations.js";
import { BuildAuthTokenListOptionalParams } from "../../api/buildAuthToken/options.js";
import { BuildToken } from "../../models/models.js";

/** Interface representing a BuildAuthToken operations. */
export interface BuildAuthTokenOperations {
  /** Gets the token used to connect to the endpoint where source code can be uploaded for a build. */
  list: (
    resourceGroupName: string,
    builderName: string,
    buildName: string,
    options?: BuildAuthTokenListOptionalParams,
  ) => Promise<BuildToken>;
}

function _getBuildAuthToken(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      builderName: string,
      buildName: string,
      options?: BuildAuthTokenListOptionalParams,
    ) => list(context, resourceGroupName, builderName, buildName, options),
  };
}

export function _getBuildAuthTokenOperations(
  context: ContainerAppsAPIContext,
): BuildAuthTokenOperations {
  return {
    ..._getBuildAuthToken(context),
  };
}
