// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  upgrade,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
  checkNameAvailability,
} from "./operations.js";
export type {
  ServicesUpgradeOptionalParams,
  ServicesListBySubscriptionOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
  ServicesCheckNameAvailabilityOptionalParams,
} from "./options.js";
