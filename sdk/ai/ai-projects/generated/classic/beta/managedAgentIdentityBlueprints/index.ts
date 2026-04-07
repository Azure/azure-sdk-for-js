// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  list,
  $delete,
  get,
  createOrUpdate,
} from "../../../api/beta/managedAgentIdentityBlueprints/operations.js";
import {
  BetaManagedAgentIdentityBlueprintsListOptionalParams,
  BetaManagedAgentIdentityBlueprintsDeleteOptionalParams,
  BetaManagedAgentIdentityBlueprintsGetOptionalParams,
  CreateOrUpdateOptionalParams,
} from "../../../api/beta/managedAgentIdentityBlueprints/options.js";
import {
  ManagedAgentIdentityBlueprint,
  PagedManagedAgentIdentityBlueprint,
} from "../../../models/models.js";

/** Interface representing a BetaManagedAgentIdentityBlueprints operations. */
export interface BetaManagedAgentIdentityBlueprintsOperations {
  list: (
    foundryFeatures: "AgentEndpoints=V1Preview",
    options?: BetaManagedAgentIdentityBlueprintsListOptionalParams,
  ) => Promise<PagedManagedAgentIdentityBlueprint>;
  /** Deletes a managed agent identity blueprint by name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    foundryFeatures: "AgentEndpoints=V1Preview",
    blueprintName: string,
    options?: BetaManagedAgentIdentityBlueprintsDeleteOptionalParams,
  ) => Promise<void>;
  /** Retrieves a managed agent identity blueprint by name. */
  get: (
    foundryFeatures: "AgentEndpoints=V1Preview",
    blueprintName: string,
    options?: BetaManagedAgentIdentityBlueprintsGetOptionalParams,
  ) => Promise<ManagedAgentIdentityBlueprint>;
  createOrUpdate: (
    foundryFeatures: "AgentEndpoints=V1Preview",
    blueprintName: string,
    name: string,
    options?: CreateOrUpdateOptionalParams,
  ) => Promise<ManagedAgentIdentityBlueprint>;
}

function _getBetaManagedAgentIdentityBlueprints(context: AIProjectContext) {
  return {
    list: (
      foundryFeatures: "AgentEndpoints=V1Preview",
      options?: BetaManagedAgentIdentityBlueprintsListOptionalParams,
    ) => list(context, foundryFeatures, options),
    delete: (
      foundryFeatures: "AgentEndpoints=V1Preview",
      blueprintName: string,
      options?: BetaManagedAgentIdentityBlueprintsDeleteOptionalParams,
    ) => $delete(context, foundryFeatures, blueprintName, options),
    get: (
      foundryFeatures: "AgentEndpoints=V1Preview",
      blueprintName: string,
      options?: BetaManagedAgentIdentityBlueprintsGetOptionalParams,
    ) => get(context, foundryFeatures, blueprintName, options),
    createOrUpdate: (
      foundryFeatures: "AgentEndpoints=V1Preview",
      blueprintName: string,
      name: string,
      options?: CreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, foundryFeatures, blueprintName, name, options),
  };
}

export function _getBetaManagedAgentIdentityBlueprintsOperations(
  context: AIProjectContext,
): BetaManagedAgentIdentityBlueprintsOperations {
  return {
    ..._getBetaManagedAgentIdentityBlueprints(context),
  };
}
