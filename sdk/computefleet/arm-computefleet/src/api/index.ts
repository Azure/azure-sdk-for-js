// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  createAzureFleet,
  AzureFleetClientOptionalParams,
  AzureFleetContext,
} from "./azureFleetContext.js";
export {
  get,
  createOrUpdate,
  update,
  $delete,
  listByResourceGroup,
  listBySubscription,
  listVirtualMachineScaleSets,
} from "./fleets/index.js";
export { list } from "./operations/index.js";
