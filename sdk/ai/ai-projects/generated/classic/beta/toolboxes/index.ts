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
  /** Removes the specified version of a toolbox. */
  deleteVersion: (
    name: string,
    version: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: DeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Removes the specified toolbox along with all of its versions. */
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
  /** Updates the toolbox's default version pointer to the specified version. */
  update: (
    name: string,
    defaultVersion: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: BetaToolboxesUpdateOptionalParams,
  ) => Promise<ToolboxObject>;
  /** Retrieves the specified version of a toolbox by name and version identifier. */
  getVersion: (
    name: string,
    version: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: GetVersionOptionalParams,
  ) => Promise<ToolboxVersionObject>;
  /** Returns the available versions for the specified toolbox. */
  listVersions: (
    name: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: ListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<ToolboxVersionObject>;
  /** Returns the toolboxes available in the current project. */
  list: (
    foundryFeatures: "Toolboxes=V1Preview",
    options?: BetaToolboxesListOptionalParams,
  ) => PagedAsyncIterableIterator<ToolboxObject>;
  /** Retrieves the specified toolbox and its current configuration. */
  get: (
    name: string,
    foundryFeatures: "Toolboxes=V1Preview",
    options?: BetaToolboxesGetOptionalParams,
  ) => Promise<ToolboxObject>;
  /** Creates a new toolbox version, provisioning the toolbox itself if it does not already exist. */
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
