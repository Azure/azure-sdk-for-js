// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { FabricAgentModel } from "../../models/models.js";
import {
  FabricAgentListOptionalParams,
  FabricAgentDeleteOptionalParams,
  FabricAgentCreateOptionalParams,
  FabricAgentGetOptionalParams,
} from "../../api/fabricAgent/options.js";
import { list, $delete, create, get } from "../../api/fabricAgent/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FabricAgent operations. */
export interface FabricAgentOperations {
  /** Gets the list of fabric agents in the given fabric. */
  list: (
    resourceGroupName: string,
    fabricName: string,
    options?: FabricAgentListOptionalParams,
  ) => PagedAsyncIterableIterator<FabricAgentModel>;
  /** Deletes fabric agent. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    fabricName: string,
    fabricAgentName: string,
    options?: FabricAgentDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates the fabric agent. */
  create: (
    resourceGroupName: string,
    fabricName: string,
    fabricAgentName: string,
    resource: FabricAgentModel,
    options?: FabricAgentCreateOptionalParams,
  ) => PollerLike<OperationState<FabricAgentModel>, FabricAgentModel>;
  /** Gets the details of the fabric agent. */
  get: (
    resourceGroupName: string,
    fabricName: string,
    fabricAgentName: string,
    options?: FabricAgentGetOptionalParams,
  ) => Promise<FabricAgentModel>;
}

function _getFabricAgent(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      fabricName: string,
      options?: FabricAgentListOptionalParams,
    ) => list(context, resourceGroupName, fabricName, options),
    delete: (
      resourceGroupName: string,
      fabricName: string,
      fabricAgentName: string,
      options?: FabricAgentDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, fabricName, fabricAgentName, options),
    create: (
      resourceGroupName: string,
      fabricName: string,
      fabricAgentName: string,
      resource: FabricAgentModel,
      options?: FabricAgentCreateOptionalParams,
    ) => create(context, resourceGroupName, fabricName, fabricAgentName, resource, options),
    get: (
      resourceGroupName: string,
      fabricName: string,
      fabricAgentName: string,
      options?: FabricAgentGetOptionalParams,
    ) => get(context, resourceGroupName, fabricName, fabricAgentName, options),
  };
}

export function _getFabricAgentOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): FabricAgentOperations {
  return {
    ..._getFabricAgent(context),
  };
}
