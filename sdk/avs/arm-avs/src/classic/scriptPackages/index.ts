// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { ScriptPackage } from "../../models/models.js";
import {
  ScriptPackagesGetOptionalParams,
  ScriptPackagesListOptionalParams,
} from "../../api/scriptPackages/options.js";
import { get, list } from "../../api/scriptPackages/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScriptPackages operations. */
export interface ScriptPackagesOperations {
  /** Get a ScriptPackage */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    scriptPackageName: string,
    options?: ScriptPackagesGetOptionalParams,
  ) => Promise<ScriptPackage>;
  /** List ScriptPackage resources by PrivateCloud */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: ScriptPackagesListOptionalParams,
  ) => PagedAsyncIterableIterator<ScriptPackage>;
}

function _getScriptPackages(context: AzureVMwareSolutionAPIContext) {
  return {
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      scriptPackageName: string,
      options?: ScriptPackagesGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, scriptPackageName, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: ScriptPackagesListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, options),
  };
}

export function _getScriptPackagesOperations(
  context: AzureVMwareSolutionAPIContext,
): ScriptPackagesOperations {
  return {
    ..._getScriptPackages(context),
  };
}
