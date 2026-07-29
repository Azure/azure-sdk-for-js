// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { invokeFunctionsHost } from "../../api/functionsExtension/operations.js";
import { FunctionsExtensionInvokeFunctionsHostOptionalParams } from "../../api/functionsExtension/options.js";
import { FunctionsExtensionInvokeFunctionsHostResponse } from "../../models/models.js";

/** Interface representing a FunctionsExtension operations. */
export interface FunctionsExtensionOperations {
  /** Proxies a Functions host call to the function app backed by the container app. */
  invokeFunctionsHost: (
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    functionAppName: string,
    options?: FunctionsExtensionInvokeFunctionsHostOptionalParams,
  ) => Promise<FunctionsExtensionInvokeFunctionsHostResponse>;
}

function _getFunctionsExtension(context: ContainerAppsAPIContext) {
  return {
    invokeFunctionsHost: (
      resourceGroupName: string,
      containerAppName: string,
      revisionName: string,
      functionAppName: string,
      options?: FunctionsExtensionInvokeFunctionsHostOptionalParams,
    ) =>
      invokeFunctionsHost(
        context,
        resourceGroupName,
        containerAppName,
        revisionName,
        functionAppName,
        options,
      ),
  };
}

export function _getFunctionsExtensionOperations(
  context: ContainerAppsAPIContext,
): FunctionsExtensionOperations {
  return {
    ..._getFunctionsExtension(context),
  };
}
