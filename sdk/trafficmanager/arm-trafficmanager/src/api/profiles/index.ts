// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  checkTrafficManagerNameAvailabilityV2,
  checkTrafficManagerRelativeDnsNameAvailability,
  listByResourceGroup,
  listBySubscription,
  $delete,
  updateV2,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ProfilesCheckTrafficManagerNameAvailabilityV2OptionalParams,
  ProfilesCheckTrafficManagerRelativeDnsNameAvailabilityOptionalParams,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesListBySubscriptionOptionalParams,
  ProfilesDeleteOptionalParams,
  ProfilesUpdateV2OptionalParams,
  ProfilesCreateOrUpdateOptionalParams,
  ProfilesGetOptionalParams,
} from "./options.js";
