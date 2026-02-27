// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { createFabric, type FabricContext, type FabricClientOptionalParams } from "./fabricContext.js";
export type {
  FabricCapacitiesGetOptionalParams,
  FabricCapacitiesCreateOrUpdateOptionalParams,
  FabricCapacitiesUpdateOptionalParams,
  FabricCapacitiesDeleteOptionalParams,
  FabricCapacitiesListByResourceGroupOptionalParams,
  FabricCapacitiesListBySubscriptionOptionalParams,
  FabricCapacitiesResumeOptionalParams,
  FabricCapacitiesSuspendOptionalParams,
  FabricCapacitiesCheckNameAvailabilityOptionalParams,
  FabricCapacitiesListSkusForCapacityOptionalParams,
  FabricCapacitiesListSkusOptionalParams,
  OperationsListOptionalParams,
} from "./options.js";
export {
  fabricCapacitiesGet,
  fabricCapacitiesCreateOrUpdate,
  fabricCapacitiesUpdate,
  fabricCapacitiesDelete,
  fabricCapacitiesListByResourceGroup,
  fabricCapacitiesListBySubscription,
  fabricCapacitiesResume,
  fabricCapacitiesSuspend,
  fabricCapacitiesCheckNameAvailability,
  fabricCapacitiesListSkusForCapacity,
  fabricCapacitiesListSkus,
} from "./fabricCapacities/index.js";
export { operationsList } from "./operations/index.js";
