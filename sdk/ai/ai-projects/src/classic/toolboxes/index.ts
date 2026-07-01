// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  deleteVersion,
  $delete,
  update,
  getVersion,
  listVersions,
  list,
  get,
  createVersion,
} from "../../api/toolboxes/operations.js";
import type {
  DeleteVersionOptionalParams,
  ToolboxesDeleteOptionalParams,
  ToolboxesUpdateOptionalParams,
  GetVersionOptionalParams,
  ListVersionsOptionalParams,
  ToolboxesListOptionalParams,
  ToolboxesGetOptionalParams,
  CreateVersionOptionalParams,
} from "../../api/toolboxes/options.js";
import type { ToolboxToolUnion, ToolboxVersionObject, ToolboxObject } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a Toolboxes operations. */
export interface ToolboxesOperations {
  /** Removes the specified version of a toolbox. */
  deleteVersion: (
    name: string,
    version: string,
    options?: DeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Removes the specified toolbox along with all of its versions. */
  delete: (name: string, options?: ToolboxesDeleteOptionalParams) => Promise<void>;
  /** Updates the toolbox's default version pointer to the specified version. */
  update: (
    name: string,
    defaultVersion: string,
    options?: ToolboxesUpdateOptionalParams,
  ) => Promise<ToolboxObject>;
  /** Retrieves the specified version of a toolbox by name and version identifier. */
  getVersion: (
    name: string,
    version: string,
    options?: GetVersionOptionalParams,
  ) => Promise<ToolboxVersionObject>;
  /** Returns the available versions for the specified toolbox. */
  listVersions: (
    name: string,
    options?: ListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<ToolboxVersionObject>;
  /** Returns the toolboxes available in the current project. */
  list: (options?: ToolboxesListOptionalParams) => PagedAsyncIterableIterator<ToolboxObject>;
  /** Retrieves the specified toolbox and its current configuration. */
  get: (name: string, options?: ToolboxesGetOptionalParams) => Promise<ToolboxObject>;
  /** Creates a new toolbox version, provisioning the toolbox itself if it does not already exist. */
  createVersion: (
    name: string,
    tools: ToolboxToolUnion[],
    options?: CreateVersionOptionalParams,
  ) => Promise<ToolboxVersionObject>;
}

function _getToolboxes(context: AIProjectContext) {
  return {
    deleteVersion: (name: string, version: string, options?: DeleteVersionOptionalParams) =>
      deleteVersion(context, name, version, options),
    delete: (name: string, options?: ToolboxesDeleteOptionalParams) =>
      $delete(context, name, options),
    update: (name: string, defaultVersion: string, options?: ToolboxesUpdateOptionalParams) =>
      update(context, name, defaultVersion, options),
    getVersion: (name: string, version: string, options?: GetVersionOptionalParams) =>
      getVersion(context, name, version, options),
    listVersions: (name: string, options?: ListVersionsOptionalParams) =>
      listVersions(context, name, options),
    list: (options?: ToolboxesListOptionalParams) => list(context, options),
    get: (name: string, options?: ToolboxesGetOptionalParams) => get(context, name, options),
    createVersion: (
      name: string,
      tools: ToolboxToolUnion[],
      options?: CreateVersionOptionalParams,
    ) => createVersion(context, name, tools, options),
  };
}

export function _getToolboxesOperations(context: AIProjectContext): ToolboxesOperations {
  return {
    ..._getToolboxes(context),
  };
}
