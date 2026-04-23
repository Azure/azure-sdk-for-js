// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createFabric,
  type FabricContext,
  type FabricClientOptionalParams,
} from "./fabricContext.js";
export {
  type FabricCapacitiesGetOptionalParams,
  type FabricCapacitiesCreateOrUpdateOptionalParams,
  type FabricCapacitiesUpdateOptionalParams,
  type FabricCapacitiesDeleteOptionalParams,
  type FabricCapacitiesListByResourceGroupOptionalParams,
  type FabricCapacitiesListBySubscriptionOptionalParams,
  type FabricCapacitiesResumeOptionalParams,
  type FabricCapacitiesSuspendOptionalParams,
  type FabricCapacitiesCheckNameAvailabilityOptionalParams,
  type FabricCapacitiesListSkusForCapacityOptionalParams,
  type FabricCapacitiesListSkusOptionalParams,
  type OperationsListOptionalParams,
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
