// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext } from "../../api/containerServiceFleetContext.js";
import { listByFleet, update, get } from "../../api/gates/operations.js";
import {
  GatesListByFleetOptionalParams,
  GatesUpdateOptionalParams,
  GatesGetOptionalParams,
} from "../../api/gates/options.js";
import { Gate, GatePatch } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Gates operations. */
export interface GatesOperations {
  /** List Gate resources by Fleet */
  listByFleet: (
    resourceGroupName: string,
    fleetName: string,
    options?: GatesListByFleetOptionalParams,
  ) => PagedAsyncIterableIterator<Gate>;
  /** Update a Gate */
  update: (
    resourceGroupName: string,
    fleetName: string,
    gateName: string,
    properties: GatePatch,
    options?: GatesUpdateOptionalParams,
  ) => PollerLike<OperationState<Gate>, Gate>;
  /** Get a Gate */
  get: (
    resourceGroupName: string,
    fleetName: string,
    gateName: string,
    options?: GatesGetOptionalParams,
  ) => Promise<Gate>;
}

function _getGates(context: ContainerServiceFleetContext) {
  return {
    listByFleet: (
      resourceGroupName: string,
      fleetName: string,
      options?: GatesListByFleetOptionalParams,
    ) => listByFleet(context, resourceGroupName, fleetName, options),
    update: (
      resourceGroupName: string,
      fleetName: string,
      gateName: string,
      properties: GatePatch,
      options?: GatesUpdateOptionalParams,
    ) => update(context, resourceGroupName, fleetName, gateName, properties, options),
    get: (
      resourceGroupName: string,
      fleetName: string,
      gateName: string,
      options?: GatesGetOptionalParams,
    ) => get(context, resourceGroupName, fleetName, gateName, options),
  };
}

export function _getGatesOperations(context: ContainerServiceFleetContext): GatesOperations {
  return {
    ..._getGates(context),
  };
}
