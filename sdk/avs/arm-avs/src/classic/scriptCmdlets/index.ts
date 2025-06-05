// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { ScriptCmdlet } from "../../models/models.js";
import {
  ScriptCmdletsGetOptionalParams,
  ScriptCmdletsListOptionalParams,
} from "../../api/scriptCmdlets/options.js";
import { get, list } from "../../api/scriptCmdlets/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScriptCmdlets operations. */
export interface ScriptCmdletsOperations {
  /** Get a ScriptCmdlet */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    scriptPackageName: string,
    scriptCmdletName: string,
    options?: ScriptCmdletsGetOptionalParams,
  ) => Promise<ScriptCmdlet>;
  /** List ScriptCmdlet resources by ScriptPackage */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    scriptPackageName: string,
    options?: ScriptCmdletsListOptionalParams,
  ) => PagedAsyncIterableIterator<ScriptCmdlet>;
}

function _getScriptCmdlets(context: AzureVMwareSolutionAPIContext) {
  return {
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      scriptPackageName: string,
      scriptCmdletName: string,
      options?: ScriptCmdletsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        privateCloudName,
        scriptPackageName,
        scriptCmdletName,
        options,
      ),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      scriptPackageName: string,
      options?: ScriptCmdletsListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, scriptPackageName, options),
  };
}

export function _getScriptCmdletsOperations(
  context: AzureVMwareSolutionAPIContext,
): ScriptCmdletsOperations {
  return {
    ..._getScriptCmdlets(context),
  };
}
