// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerBIDedicatedContext } from "../../api/powerBIDedicatedContext.js";
import {
  DedicatedCapacity,
  DedicatedCapacityUpdateParameters,
  OkResponse,
  SkuEnumerationForExistingResourceResult,
  SkuEnumerationForNewResourceResult,
  CheckCapacityNameAvailabilityParameters,
  CheckCapacityNameAvailabilityResult,
} from "../../models/models.js";
import {
  CapacitiesCheckNameAvailabilityOptionalParams,
  CapacitiesListSkusOptionalParams,
  CapacitiesListSkusForCapacityOptionalParams,
  CapacitiesResumeOptionalParams,
  CapacitiesSuspendOptionalParams,
  CapacitiesListOptionalParams,
  CapacitiesListByResourceGroupOptionalParams,
  CapacitiesDeleteOptionalParams,
  CapacitiesUpdateOptionalParams,
  CapacitiesCreateOptionalParams,
  CapacitiesGetDetailsOptionalParams,
} from "../../api/capacities/options.js";
import {
  checkNameAvailability,
  listSkus,
  listSkusForCapacity,
  resume,
  suspend,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  getDetails,
} from "../../api/capacities/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Capacities operations. */
export interface CapacitiesOperations {
  /** Check the name availability in the target location. */
  checkNameAvailability: (
    location: string,
    capacityParameters: CheckCapacityNameAvailabilityParameters,
    options?: CapacitiesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckCapacityNameAvailabilityResult>;
  /** Lists eligible SKUs for PowerBI Dedicated resource provider. */
  listSkus: (
    options?: CapacitiesListSkusOptionalParams,
  ) => Promise<SkuEnumerationForNewResourceResult>;
  /** Lists eligible SKUs for a PowerBI Dedicated resource. */
  listSkusForCapacity: (
    resourceGroupName: string,
    dedicatedCapacityName: string,
    options?: CapacitiesListSkusForCapacityOptionalParams,
  ) => Promise<SkuEnumerationForExistingResourceResult>;
  /** Resumes operation of the specified Dedicated capacity instance. */
  resume: (
    resourceGroupName: string,
    dedicatedCapacityName: string,
    options?: CapacitiesResumeOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** Suspends operation of the specified dedicated capacity instance. */
  suspend: (
    resourceGroupName: string,
    dedicatedCapacityName: string,
    options?: CapacitiesSuspendOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** Lists all the Dedicated capacities for the given subscription. */
  list: (options?: CapacitiesListOptionalParams) => PagedAsyncIterableIterator<DedicatedCapacity>;
  /** Gets all the Dedicated capacities for the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CapacitiesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DedicatedCapacity>;
  /** Deletes the specified Dedicated capacity. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dedicatedCapacityName: string,
    options?: CapacitiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the current state of the specified Dedicated capacity. */
  update: (
    resourceGroupName: string,
    dedicatedCapacityName: string,
    capacityUpdateParameters: DedicatedCapacityUpdateParameters,
    options?: CapacitiesUpdateOptionalParams,
  ) => PollerLike<OperationState<DedicatedCapacity>, DedicatedCapacity>;
  /** Provisions the specified Dedicated capacity based on the configuration specified in the request. */
  create: (
    resourceGroupName: string,
    dedicatedCapacityName: string,
    capacityParameters: DedicatedCapacity,
    options?: CapacitiesCreateOptionalParams,
  ) => PollerLike<OperationState<DedicatedCapacity>, DedicatedCapacity>;
  /** Gets details about the specified dedicated capacity. */
  getDetails: (
    resourceGroupName: string,
    dedicatedCapacityName: string,
    options?: CapacitiesGetDetailsOptionalParams,
  ) => Promise<DedicatedCapacity>;
}

function _getCapacities(context: PowerBIDedicatedContext) {
  return {
    checkNameAvailability: (
      location: string,
      capacityParameters: CheckCapacityNameAvailabilityParameters,
      options?: CapacitiesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, location, capacityParameters, options),
    listSkus: (options?: CapacitiesListSkusOptionalParams) => listSkus(context, options),
    listSkusForCapacity: (
      resourceGroupName: string,
      dedicatedCapacityName: string,
      options?: CapacitiesListSkusForCapacityOptionalParams,
    ) => listSkusForCapacity(context, resourceGroupName, dedicatedCapacityName, options),
    resume: (
      resourceGroupName: string,
      dedicatedCapacityName: string,
      options?: CapacitiesResumeOptionalParams,
    ) => resume(context, resourceGroupName, dedicatedCapacityName, options),
    suspend: (
      resourceGroupName: string,
      dedicatedCapacityName: string,
      options?: CapacitiesSuspendOptionalParams,
    ) => suspend(context, resourceGroupName, dedicatedCapacityName, options),
    list: (options?: CapacitiesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CapacitiesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      dedicatedCapacityName: string,
      options?: CapacitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dedicatedCapacityName, options),
    update: (
      resourceGroupName: string,
      dedicatedCapacityName: string,
      capacityUpdateParameters: DedicatedCapacityUpdateParameters,
      options?: CapacitiesUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, dedicatedCapacityName, capacityUpdateParameters, options),
    create: (
      resourceGroupName: string,
      dedicatedCapacityName: string,
      capacityParameters: DedicatedCapacity,
      options?: CapacitiesCreateOptionalParams,
    ) => create(context, resourceGroupName, dedicatedCapacityName, capacityParameters, options),
    getDetails: (
      resourceGroupName: string,
      dedicatedCapacityName: string,
      options?: CapacitiesGetDetailsOptionalParams,
    ) => getDetails(context, resourceGroupName, dedicatedCapacityName, options),
  };
}

export function _getCapacitiesOperations(context: PowerBIDedicatedContext): CapacitiesOperations {
  return {
    ..._getCapacities(context),
  };
}
