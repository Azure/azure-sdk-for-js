// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listByVirtualMachineInstance,
  $delete,
  create,
  get,
} from "../../api/guestAgents/operations.js";
import {
  GuestAgentsListByVirtualMachineInstanceOptionalParams,
  GuestAgentsDeleteOptionalParams,
  GuestAgentsCreateOptionalParams,
  GuestAgentsGetOptionalParams,
} from "../../api/guestAgents/options.js";
import { GuestAgent } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GuestAgents operations. */
export interface GuestAgentsOperations {
  /** Returns the list of GuestAgent of the given vm. */
  listByVirtualMachineInstance: (
    resourceUri: string,
    options?: GuestAgentsListByVirtualMachineInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<GuestAgent>;
  /** Implements GuestAgent DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceUri: string,
    options?: GuestAgentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create Or Update GuestAgent. */
  create: (
    resourceUri: string,
    resource: GuestAgent,
    options?: GuestAgentsCreateOptionalParams,
  ) => PollerLike<OperationState<GuestAgent>, GuestAgent>;
  /** Implements GuestAgent GET method. */
  get: (resourceUri: string, options?: GuestAgentsGetOptionalParams) => Promise<GuestAgent>;
}

function _getGuestAgents(context: AzureStackHCIContext) {
  return {
    listByVirtualMachineInstance: (
      resourceUri: string,
      options?: GuestAgentsListByVirtualMachineInstanceOptionalParams,
    ) => listByVirtualMachineInstance(context, resourceUri, options),
    delete: (resourceUri: string, options?: GuestAgentsDeleteOptionalParams) =>
      $delete(context, resourceUri, options),
    create: (
      resourceUri: string,
      resource: GuestAgent,
      options?: GuestAgentsCreateOptionalParams,
    ) => create(context, resourceUri, resource, options),
    get: (resourceUri: string, options?: GuestAgentsGetOptionalParams) =>
      get(context, resourceUri, options),
  };
}

export function _getGuestAgentsOperations(context: AzureStackHCIContext): GuestAgentsOperations {
  return {
    ..._getGuestAgents(context),
  };
}
