// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import { $delete, update, list, get, create } from "../../../api/beta/toolboxes/operations.js";
import {
  BetaToolboxesDeleteOptionalParams,
  BetaToolboxesUpdateOptionalParams,
  BetaToolboxesListOptionalParams,
  BetaToolboxesGetOptionalParams,
  BetaToolboxesCreateOptionalParams,
} from "../../../api/beta/toolboxes/options.js";
import { ToolUnion, ToolboxVersionObject, ToolboxObject } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaToolboxes operations. */
export interface BetaToolboxesOperations {
  /** Delete a toolbox and all its versions. */
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
  create: (
    toolboxName: string,
    tools: ToolUnion[],
    foundryFeatures: "Toolboxes=V1Preview",
    options?: BetaToolboxesCreateOptionalParams,
  ) => Promise<ToolboxVersionObject>;
}

function _getBetaToolboxes(context: AIProjectContext) {
  return {
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
    list: (foundryFeatures: "Toolboxes=V1Preview", options?: BetaToolboxesListOptionalParams) =>
      list(context, foundryFeatures, options),
    get: (
      toolboxName: string,
      foundryFeatures: "Toolboxes=V1Preview",
      options?: BetaToolboxesGetOptionalParams,
    ) => get(context, toolboxName, foundryFeatures, options),
    create: (
      toolboxName: string,
      tools: ToolUnion[],
      foundryFeatures: "Toolboxes=V1Preview",
      options?: BetaToolboxesCreateOptionalParams,
    ) => create(context, toolboxName, tools, foundryFeatures, options),
  };
}

export function _getBetaToolboxesOperations(context: AIProjectContext): BetaToolboxesOperations {
  return {
    ..._getBetaToolboxes(context),
  };
}
