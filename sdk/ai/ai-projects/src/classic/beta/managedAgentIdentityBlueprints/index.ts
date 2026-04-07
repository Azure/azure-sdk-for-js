// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  list,
  $delete,
  get,
  createOrUpdate,
} from "../../../api/beta/managedAgentIdentityBlueprints/operations.js";
import type {
  BetaManagedAgentIdentityBlueprintsListOptionalParams,
  BetaManagedAgentIdentityBlueprintsDeleteOptionalParams,
  BetaManagedAgentIdentityBlueprintsGetOptionalParams,
  CreateOrUpdateOptionalParams,
} from "../../../api/beta/managedAgentIdentityBlueprints/options.js";
import type {
  ManagedAgentIdentityBlueprint,
  PagedManagedAgentIdentityBlueprint,
} from "../../../models/models.js";

/** Interface representing a BetaManagedAgentIdentityBlueprints operations. */
export interface BetaManagedAgentIdentityBlueprintsOperations {
  list: (
    options?: BetaManagedAgentIdentityBlueprintsListOptionalParams,
  ) => Promise<PagedManagedAgentIdentityBlueprint>;
  /** Deletes a managed agent identity blueprint by name. */
  delete: (
    blueprintName: string,
    options?: BetaManagedAgentIdentityBlueprintsDeleteOptionalParams,
  ) => Promise<void>;
  /** Retrieves a managed agent identity blueprint by name. */
  get: (
    blueprintName: string,
    options?: BetaManagedAgentIdentityBlueprintsGetOptionalParams,
  ) => Promise<ManagedAgentIdentityBlueprint>;
  createOrUpdate: (
    blueprintName: string,
    name: string,
    options?: CreateOrUpdateOptionalParams,
  ) => Promise<ManagedAgentIdentityBlueprint>;
}

function _getBetaManagedAgentIdentityBlueprints(context: AIProjectContext) {
  return {
    list: (options?: BetaManagedAgentIdentityBlueprintsListOptionalParams) =>
      list(context, options),
    delete: (
      blueprintName: string,
      options?: BetaManagedAgentIdentityBlueprintsDeleteOptionalParams,
    ) => $delete(context, blueprintName, options),
    get: (blueprintName: string, options?: BetaManagedAgentIdentityBlueprintsGetOptionalParams) =>
      get(context, blueprintName, options),
    createOrUpdate: (blueprintName: string, name: string, options?: CreateOrUpdateOptionalParams) =>
      createOrUpdate(context, blueprintName, name, options),
  };
}

export function _getBetaManagedAgentIdentityBlueprintsOperations(
  context: AIProjectContext,
): BetaManagedAgentIdentityBlueprintsOperations {
  return {
    ..._getBetaManagedAgentIdentityBlueprints(context),
  };
}
