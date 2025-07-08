// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext } from "../../api/containerServiceFleetContext.js";
import { FleetMember, FleetMemberUpdate } from "../../models/models.js";
import {
  FleetMembersListByFleetOptionalParams,
  FleetMembersDeleteOptionalParams,
  FleetMembersUpdateAsyncOptionalParams,
  FleetMembersCreateOptionalParams,
  FleetMembersGetOptionalParams,
} from "../../api/fleetMembers/options.js";
import {
  listByFleet,
  $delete,
  updateAsync,
  create,
  get,
} from "../../api/fleetMembers/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FleetMembers operations. */
export interface FleetMembersOperations {
  /** List FleetMember resources by Fleet */
  listByFleet: (
    resourceGroupName: string,
    fleetName: string,
    options?: FleetMembersListByFleetOptionalParams,
  ) => PagedAsyncIterableIterator<FleetMember>;
  /** Delete a FleetMember */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    fleetMemberName: string,
    options?: FleetMembersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a FleetMember */
  updateAsync: (
    resourceGroupName: string,
    fleetName: string,
    fleetMemberName: string,
    properties: FleetMemberUpdate,
    options?: FleetMembersUpdateAsyncOptionalParams,
  ) => PollerLike<OperationState<FleetMember>, FleetMember>;
  /** Create a FleetMember */
  create: (
    resourceGroupName: string,
    fleetName: string,
    fleetMemberName: string,
    resource: FleetMember,
    options?: FleetMembersCreateOptionalParams,
  ) => PollerLike<OperationState<FleetMember>, FleetMember>;
  /** Get a FleetMember */
  get: (
    resourceGroupName: string,
    fleetName: string,
    fleetMemberName: string,
    options?: FleetMembersGetOptionalParams,
  ) => Promise<FleetMember>;
}

function _getFleetMembers(context: ContainerServiceFleetContext) {
  return {
    listByFleet: (
      resourceGroupName: string,
      fleetName: string,
      options?: FleetMembersListByFleetOptionalParams,
    ) => listByFleet(context, resourceGroupName, fleetName, options),
    delete: (
      resourceGroupName: string,
      fleetName: string,
      fleetMemberName: string,
      options?: FleetMembersDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, fleetName, fleetMemberName, options),
    updateAsync: (
      resourceGroupName: string,
      fleetName: string,
      fleetMemberName: string,
      properties: FleetMemberUpdate,
      options?: FleetMembersUpdateAsyncOptionalParams,
    ) =>
      updateAsync(
        context,
        resourceGroupName,
        fleetName,
        fleetMemberName,
        properties,
        options,
      ),
    create: (
      resourceGroupName: string,
      fleetName: string,
      fleetMemberName: string,
      resource: FleetMember,
      options?: FleetMembersCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        fleetName,
        fleetMemberName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      fleetName: string,
      fleetMemberName: string,
      options?: FleetMembersGetOptionalParams,
    ) => get(context, resourceGroupName, fleetName, fleetMemberName, options),
  };
}

export function _getFleetMembersOperations(
  context: ContainerServiceFleetContext,
): FleetMembersOperations {
  return {
    ..._getFleetMembers(context),
  };
}
