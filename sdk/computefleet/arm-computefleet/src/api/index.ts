// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createAzureFleet,
  AzureFleetContext,
  AzureFleetClientOptionalParams,
} from "./azureFleetContext.js";
export {
  OperationsListOptionalParams,
  FleetsGetOptionalParams,
  FleetsCreateOrUpdateOptionalParams,
  FleetsUpdateOptionalParams,
  FleetsDeleteOptionalParams,
  FleetsListByResourceGroupOptionalParams,
  FleetsListBySubscriptionOptionalParams,
  FleetsListVirtualMachineScaleSetsOptionalParams,
} from "./options.js";
export {
  fleetsGet,
  fleetsCreateOrUpdate,
  fleetsUpdate,
  fleetsDelete,
  fleetsListByResourceGroup,
  fleetsListBySubscription,
  fleetsListVirtualMachineScaleSets,
} from "./fleets/index.js";
export { operationsList } from "./operations/index.js";
