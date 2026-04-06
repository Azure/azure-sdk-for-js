// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  deleteToolboxVersion,
  getToolboxVersion,
  listToolboxVersions,
} from "../../api/toolboxes/operations.js";
import {
  ToolboxesDeleteToolboxVersionOptionalParams,
  ToolboxesGetToolboxVersionOptionalParams,
  ToolboxesListToolboxVersionsOptionalParams,
} from "../../api/toolboxes/options.js";
import { ToolboxVersionObject } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Toolboxes operations. */
export interface ToolboxesOperations {
  /** Delete a specific version of a toolbox. */
  deleteToolboxVersion: (
    toolboxName: string,
    version: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: ToolboxesDeleteToolboxVersionOptionalParams,
  ) => Promise<void>;
  /** Retrieve a specific version of a toolbox. */
  getToolboxVersion: (
    toolboxName: string,
    version: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: ToolboxesGetToolboxVersionOptionalParams,
  ) => Promise<ToolboxVersionObject>;
  /** List all versions of a toolbox. */
  listToolboxVersions: (
    toolboxName: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: ToolboxesListToolboxVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<ToolboxVersionObject>;
}

function _getToolboxes(context: AIProjectContext) {
  return {
    deleteToolboxVersion: (
      toolboxName: string,
      version: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: ToolboxesDeleteToolboxVersionOptionalParams,
    ) => deleteToolboxVersion(context, toolboxName, version, foundryFeatures, options),
    getToolboxVersion: (
      toolboxName: string,
      version: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: ToolboxesGetToolboxVersionOptionalParams,
    ) => getToolboxVersion(context, toolboxName, version, foundryFeatures, options),
    listToolboxVersions: (
      toolboxName: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: ToolboxesListToolboxVersionsOptionalParams,
    ) => listToolboxVersions(context, toolboxName, foundryFeatures, options),
  };
}

export function _getToolboxesOperations(context: AIProjectContext): ToolboxesOperations {
  return {
    ..._getToolboxes(context),
  };
}
