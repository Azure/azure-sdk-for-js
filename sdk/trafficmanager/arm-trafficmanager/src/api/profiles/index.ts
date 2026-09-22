// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  checkTrafficManagerNameAvailabilityV2,
  checkTrafficManagerRelativeDnsNameAvailability,
  listByResourceGroup,
  listBySubscription,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams,
  ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityOptionalParams,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesListBySubscriptionOptionalParams,
  ProfilesDeleteOptionalParams,
  ProfilesUpdateOptionalParams,
  ProfilesCreateOrUpdateOptionalParams,
  ProfilesGetOptionalParams,
} from "./options.js";
