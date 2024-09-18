// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createAzureFleet,
  AzureFleetClientOptionalParams,
  AzureFleetContext,
} from "./azureFleetContext.js";
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
