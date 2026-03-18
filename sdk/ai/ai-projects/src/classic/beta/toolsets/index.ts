// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import { $delete, list, get, update, create } from "../../../api/beta/toolsets/operations.js";
import {
  BetaToolsetsDeleteOptionalParams,
  BetaToolsetsListOptionalParams,
  BetaToolsetsGetOptionalParams,
  BetaToolsetsUpdateOptionalParams,
  BetaToolsetsCreateOptionalParams,
} from "../../../api/beta/toolsets/options.js";
import { ToolUnion, ToolsetObject, DeleteToolsetResponse } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaToolsets operations. */
export interface BetaToolsetsOperations {
  /** Delete a toolset. */
  delete: (
    toolSetName: string,
    options?: BetaToolsetsDeleteOptionalParams,
  ) => Promise<DeleteToolsetResponse>;
  /** List all toolsets. */
  list: (options?: BetaToolsetsListOptionalParams) => PagedAsyncIterableIterator<ToolsetObject>;
  /** Retrieve a toolset. */
  get: (toolSetName: string, options?: BetaToolsetsGetOptionalParams) => Promise<ToolsetObject>;
  /** Update a toolset. */
  update: (
    toolSetName: string,
    tools: ToolUnion[],
    options?: BetaToolsetsUpdateOptionalParams,
  ) => Promise<ToolsetObject>;
  /** Create a toolset. */
  create: (
    name: string,
    tools: ToolUnion[],
    options?: BetaToolsetsCreateOptionalParams,
  ) => Promise<ToolsetObject>;
}

function _getBetaToolsets(context: AIProjectContext) {
  return {
    delete: (toolSetName: string, options?: BetaToolsetsDeleteOptionalParams) =>
      $delete(context, toolSetName, options),
    list: (options?: BetaToolsetsListOptionalParams) => list(context, options),
    get: (toolSetName: string, options?: BetaToolsetsGetOptionalParams) =>
      get(context, toolSetName, options),
    update: (toolSetName: string, tools: ToolUnion[], options?: BetaToolsetsUpdateOptionalParams) =>
      update(context, toolSetName, tools, options),
    create: (name: string, tools: ToolUnion[], options?: BetaToolsetsCreateOptionalParams) =>
      create(context, name, tools, options),
  };
}

export function _getBetaToolsetsOperations(context: AIProjectContext): BetaToolsetsOperations {
  return {
    ..._getBetaToolsets(context),
  };
}
