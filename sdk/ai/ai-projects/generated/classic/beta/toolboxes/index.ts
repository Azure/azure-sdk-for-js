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
    name: string,
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
    name: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: BetaToolboxesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a toolbox to point to a specific version. */
  update: (
    name: string,
    defaultVersion: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: BetaToolboxesUpdateOptionalParams,
  ) => Promise<ToolboxObject>;
  /** Retrieve a specific version of a toolbox. */
  getVersion: (
    name: string,
    version: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: GetVersionOptionalParams,
  ) => Promise<ToolboxVersionObject>;
  /** List all versions of a toolbox. */
  listVersions: (
    name: string,
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
    name: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: BetaToolboxesGetOptionalParams,
  ) => Promise<ToolboxObject>;
  /** Create a new version of a toolbox. If the toolbox does not exist, it will be created. */
  createVersion: (
    name: string,
    tools: ToolUnion[],
    foundryFeatures: "Toolboxes=V1Preview",
    options?: CreateVersionOptionalParams,
  ) => Promise<ToolboxVersionObject>;
}

function _getBetaToolboxes(context: AIProjectContext) {
  return {
    deleteVersion: (
      name: string,
      version: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: DeleteVersionOptionalParams,
    ) => deleteVersion(context, name, version, foundryFeatures, options),
    delete: (
      name: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: BetaToolboxesDeleteOptionalParams,
    ) => $delete(context, name, foundryFeatures, options),
    update: (
      name: string,
      defaultVersion: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: BetaToolboxesUpdateOptionalParams,
    ) => update(context, name, defaultVersion, foundryFeatures, options),
    getVersion: (
      name: string,
      version: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: GetVersionOptionalParams,
    ) => getVersion(context, name, version, foundryFeatures, options),
    listVersions: (
      name: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: ListVersionsOptionalParams,
    ) => listVersions(context, name, foundryFeatures, options),
    list: (foundryFeatures: "Toolboxes=V1Preview", options?: BetaToolboxesListOptionalParams) =>
      list(context, foundryFeatures, options),
    get: (
      name: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: BetaToolboxesGetOptionalParams,
    ) => get(context, name, foundryFeatures, options),
    createVersion: (
      name: string,
      tools: ToolUnion[],
      foundryFeatures: "Toolboxes=V1Preview",
      options?: CreateVersionOptionalParams,
    ) => createVersion(context, name, tools, foundryFeatures, options),
  };
}

export function _getBetaToolboxesOperations(context: AIProjectContext): BetaToolboxesOperations {
  return {
    ..._getBetaToolboxes(context),
  };
}
