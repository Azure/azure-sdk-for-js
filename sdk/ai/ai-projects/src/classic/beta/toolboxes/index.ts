// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
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
import type {
  DeleteVersionOptionalParams,
  BetaToolboxesDeleteOptionalParams,
  BetaToolboxesUpdateOptionalParams,
  GetVersionOptionalParams,
  ListVersionsOptionalParams,
  BetaToolboxesListOptionalParams,
  BetaToolboxesGetOptionalParams,
  CreateVersionOptionalParams,
} from "../../../api/beta/toolboxes/options.js";
import type { ToolUnion, ToolboxVersionObject, ToolboxObject } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaToolboxes operations. */
export interface BetaToolboxesOperations {
  /** Delete a specific version of a toolbox. */
  deleteVersion: (
    name: string,
    version: string,
    options?: DeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Delete a toolbox and all its versions. */
  delete: (name: string, options?: BetaToolboxesDeleteOptionalParams) => Promise<void>;
  /** Update a toolbox to point to a specific version. */
  update: (
    name: string,
    defaultVersion: string,
    options?: BetaToolboxesUpdateOptionalParams,
  ) => Promise<ToolboxObject>;
  /** Retrieve a specific version of a toolbox. */
  getVersion: (
    name: string,
    version: string,
    options?: GetVersionOptionalParams,
  ) => Promise<ToolboxVersionObject>;
  /** List all versions of a toolbox. */
  listVersions: (
    name: string,
    options?: ListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<ToolboxVersionObject>;
  /** List all toolboxes. */
  list: (options?: BetaToolboxesListOptionalParams) => PagedAsyncIterableIterator<ToolboxObject>;
  /** Retrieve a toolbox. */
  get: (name: string, options?: BetaToolboxesGetOptionalParams) => Promise<ToolboxObject>;
  /** Create a new version of a toolbox. If the toolbox does not exist, it will be created. */
  createVersion: (
    name: string,
    tools: ToolUnion[],
    options?: CreateVersionOptionalParams,
  ) => Promise<ToolboxVersionObject>;
}

function _getBetaToolboxes(context: AIProjectContext) {
  return {
    deleteVersion: (name: string, version: string, options?: DeleteVersionOptionalParams) =>
      deleteVersion(context, name, version, options),
    delete: (name: string, options?: BetaToolboxesDeleteOptionalParams) =>
      $delete(context, name, options),
    update: (name: string, defaultVersion: string, options?: BetaToolboxesUpdateOptionalParams) =>
      update(context, name, defaultVersion, options),
    getVersion: (name: string, version: string, options?: GetVersionOptionalParams) =>
      getVersion(context, name, version, options),
    listVersions: (name: string, options?: ListVersionsOptionalParams) =>
      listVersions(context, name, options),
    list: (options?: BetaToolboxesListOptionalParams) => list(context, options),
    get: (name: string, options?: BetaToolboxesGetOptionalParams) => get(context, name, options),
    createVersion: (name: string, tools: ToolUnion[], options?: CreateVersionOptionalParams) =>
      createVersion(context, name, tools, options),
  };
}

export function _getBetaToolboxesOperations(context: AIProjectContext): BetaToolboxesOperations {
  return {
    ..._getBetaToolboxes(context),
  };
}
