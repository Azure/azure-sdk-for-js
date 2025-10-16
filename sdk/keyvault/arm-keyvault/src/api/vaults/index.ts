// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  checkNameAvailability,
  list,
  listDeleted,
  purgeDeleted,
  getDeleted,
  updateAccessPolicy,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export {
  VaultsCheckNameAvailabilityOptionalParams,
  VaultsListOptionalParams,
  VaultsListDeletedOptionalParams,
  VaultsPurgeDeletedOptionalParams,
  VaultsGetDeletedOptionalParams,
  VaultsUpdateAccessPolicyOptionalParams,
  VaultsListBySubscriptionOptionalParams,
  VaultsListByResourceGroupOptionalParams,
  VaultsDeleteOptionalParams,
  VaultsUpdateOptionalParams,
  VaultsCreateOrUpdateOptionalParams,
  VaultsGetOptionalParams,
} from "./options.js";
