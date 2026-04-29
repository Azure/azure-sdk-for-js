// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteVersion,
  $delete,
  update,
  getVersion,
  listVersions,
  list,
  get,
  createVersion,
} from "../../../api/beta/toolboxes/operations.js";
import {
  DeleteVersionOptionalParams,
  BetaToolboxesDeleteOptionalParams,
  BetaToolboxesUpdateOptionalParams,
  GetVersionOptionalParams,
  ListVersionsOptionalParams,
  BetaToolboxesListOptionalParams,
  BetaToolboxesGetOptionalParams,
  CreateVersionOptionalParams,
} from "../../../api/beta/toolboxes/options.js";
import { ToolUnion, ToolboxVersionObject, ToolboxObject } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaToolboxes operations. */
export interface BetaToolboxesOperations {
  /** Delete a specific version of a toolbox. */
  deleteVersion: (
    toolboxName: string,
    version: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: DeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Delete a toolbox and all its versions. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    toolboxName: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: BetaToolboxesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a toolbox to point to a specific version. */
  update: (
    toolboxName: string,
    defaultVersion: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: BetaToolboxesUpdateOptionalParams,
  ) => Promise<ToolboxObject>;
  /** Retrieve a specific version of a toolbox. */
  getVersion: (
    toolboxName: string,
    version: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: GetVersionOptionalParams,
  ) => Promise<ToolboxVersionObject>;
  /** List all versions of a toolbox. */
  listVersions: (
    toolboxName: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: ListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<ToolboxVersionObject>;
  /** List all toolboxes. */
  list: (
    foundryFeatures: "Toolboxes=V1Preview",
    options?: BetaToolboxesListOptionalParams,
  ) => PagedAsyncIterableIterator<ToolboxObject>;
  /** Retrieve a toolbox. */
  get: (
    toolboxName: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: BetaToolboxesGetOptionalParams,
  ) => Promise<ToolboxObject>;
  /** Create a new version of a toolbox. If the toolbox does not exist, it will be created. */
  createVersion: (
    toolboxName: string,
    tools: ToolUnion[],
    foundryFeatures: "Toolboxes=V1Preview",
    options?: CreateVersionOptionalParams,
  ) => Promise<ToolboxVersionObject>;
}

function _getBetaToolboxes(context: AIProjectContext) {
  return {
    deleteVersion: (
      toolboxName: string,
      version: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: DeleteVersionOptionalParams,
    ) => deleteVersion(context, toolboxName, version, foundryFeatures, options),
    delete: (
      toolboxName: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: BetaToolboxesDeleteOptionalParams,
    ) => $delete(context, toolboxName, foundryFeatures, options),
    update: (
      toolboxName: string,
      defaultVersion: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: BetaToolboxesUpdateOptionalParams,
    ) => update(context, toolboxName, defaultVersion, foundryFeatures, options),
    getVersion: (
      toolboxName: string,
      version: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: GetVersionOptionalParams,
    ) => getVersion(context, toolboxName, version, foundryFeatures, options),
    listVersions: (
      toolboxName: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: ListVersionsOptionalParams,
    ) => listVersions(context, toolboxName, foundryFeatures, options),
    list: (foundryFeatures: "Toolboxes=V1Preview", options?: BetaToolboxesListOptionalParams) =>
      list(context, foundryFeatures, options),
    get: (
      toolboxName: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: BetaToolboxesGetOptionalParams,
    ) => get(context, toolboxName, foundryFeatures, options),
    createVersion: (
      toolboxName: string,
      tools: ToolUnion[],
      foundryFeatures: "Toolboxes=V1Preview",
      options?: CreateVersionOptionalParams,
    ) => createVersion(context, toolboxName, tools, foundryFeatures, options),
  };
}

export function _getBetaToolboxesOperations(context: AIProjectContext): BetaToolboxesOperations {
  return {
    ..._getBetaToolboxes(context),
  };
}
