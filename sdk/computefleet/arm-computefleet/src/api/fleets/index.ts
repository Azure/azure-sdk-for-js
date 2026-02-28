// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  cancel,
  listVirtualMachines,
  listVirtualMachineScaleSets,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export {
  type FleetsCancelOptionalParams,
  type FleetsListVirtualMachinesOptionalParams,
  type FleetsListVirtualMachineScaleSetsOptionalParams,
  type FleetsListBySubscriptionOptionalParams,
  type FleetsListByResourceGroupOptionalParams,
  type FleetsDeleteOptionalParams,
  type FleetsUpdateOptionalParams,
  type FleetsCreateOrUpdateOptionalParams,
  type FleetsGetOptionalParams,
} from "./options.js";
