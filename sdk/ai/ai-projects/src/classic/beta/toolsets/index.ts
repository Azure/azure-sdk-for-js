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
    foundryFeatures: "Toolsets=V1Preview",
    options?: BetaToolsetsDeleteOptionalParams,
  ) => Promise<DeleteToolsetResponse>;
  /** List all toolsets. */
  list: (
    foundryFeatures: "Toolsets=V1Preview",
    options?: BetaToolsetsListOptionalParams,
  ) => PagedAsyncIterableIterator<ToolsetObject>;
  /** Retrieve a toolset. */
  get: (
    toolSetName: string,
    foundryFeatures: "Toolsets=V1Preview",
    options?: BetaToolsetsGetOptionalParams,
  ) => Promise<ToolsetObject>;
  /** Update a toolset. */
  update: (
    toolSetName: string,
    tools: ToolUnion[],
    foundryFeatures: "Toolsets=V1Preview",
    options?: BetaToolsetsUpdateOptionalParams,
  ) => Promise<ToolsetObject>;
  /** Create a toolset. */
  create: (
    name: string,
    tools: ToolUnion[],
    foundryFeatures: "Toolsets=V1Preview",
    options?: BetaToolsetsCreateOptionalParams,
  ) => Promise<ToolsetObject>;
}

function _getBetaToolsets(context: AIProjectContext) {
  return {
    delete: (
      toolSetName: string,
      foundryFeatures: "Toolsets=V1Preview",
      options?: BetaToolsetsDeleteOptionalParams,
    ) => $delete(context, toolSetName, foundryFeatures, options),
    list: (foundryFeatures: "Toolsets=V1Preview", options?: BetaToolsetsListOptionalParams) =>
      list(context, foundryFeatures, options),
    get: (
      toolSetName: string,
      foundryFeatures: "Toolsets=V1Preview",
      options?: BetaToolsetsGetOptionalParams,
    ) => get(context, toolSetName, foundryFeatures, options),
    update: (
      toolSetName: string,
      tools: ToolUnion[],
      foundryFeatures: "Toolsets=V1Preview",
      options?: BetaToolsetsUpdateOptionalParams,
    ) => update(context, toolSetName, tools, foundryFeatures, options),
    create: (
      name: string,
      tools: ToolUnion[],
      foundryFeatures: "Toolsets=V1Preview",
      options?: BetaToolsetsCreateOptionalParams,
    ) => create(context, name, tools, foundryFeatures, options),
  };
}

export function _getBetaToolsetsOperations(context: AIProjectContext): BetaToolsetsOperations {
  return {
    ..._getBetaToolsets(context),
  };
}
