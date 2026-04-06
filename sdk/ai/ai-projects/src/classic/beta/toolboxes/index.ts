// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import { $delete, list, get, update, create } from "../../../api/beta/toolboxes/operations.js";
import type {
  BetaToolboxesDeleteOptionalParams,
  BetaToolboxesListOptionalParams,
  BetaToolboxesGetOptionalParams,
  BetaToolboxesUpdateOptionalParams,
  BetaToolboxesCreateOptionalParams,
} from "../../../api/beta/toolboxes/options.js";
import type { ToolUnion, ToolboxObject, DeleteToolboxResponse } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaToolboxes operations. */
export interface BetaToolboxesOperations {
  /** Delete a toolbox. */
  delete: (
    toolboxName: string,
    options?: BetaToolboxesDeleteOptionalParams,
  ) => Promise<DeleteToolboxResponse>;
  /** List all toolboxes. */
  list: (options?: BetaToolboxesListOptionalParams) => PagedAsyncIterableIterator<ToolboxObject>;
  /** Retrieve a toolbox. */
  get: (toolboxName: string, options?: BetaToolboxesGetOptionalParams) => Promise<ToolboxObject>;
  /** Update a toolbox. */
  update: (
    toolboxName: string,
    tools: ToolUnion[],
    options?: BetaToolboxesUpdateOptionalParams,
  ) => Promise<ToolboxObject>;
  /** Create a toolbox. */
  create: (
    name: string,
    tools: ToolUnion[],
    options?: BetaToolboxesCreateOptionalParams,
  ) => Promise<ToolboxObject>;
}

function _getBetaToolboxes(context: AIProjectContext) {
  return {
    delete: (toolboxName: string, options?: BetaToolboxesDeleteOptionalParams) =>
      $delete(context, toolboxName, options),
    list: (options?: BetaToolboxesListOptionalParams) => list(context, options),
    get: (toolboxName: string, options?: BetaToolboxesGetOptionalParams) =>
      get(context, toolboxName, options),
    update: (toolboxName: string, tools: ToolUnion[], options?: BetaToolboxesUpdateOptionalParams) =>
      update(context, toolboxName, tools, options),
    create: (name: string, tools: ToolUnion[], options?: BetaToolboxesCreateOptionalParams) =>
      create(context, name, tools, options),
  };
}

export function _getBetaToolboxesOperations(context: AIProjectContext): BetaToolboxesOperations {
  return {
    ..._getBetaToolboxes(context),
  };
}
