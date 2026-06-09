// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  changeKeyVault,
  getChangeKeyVaultInformation,
  transitionToCmk,
  renewCredentials,
  listBySubscription,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  AccountsChangeKeyVaultOptionalParams,
  AccountsGetChangeKeyVaultInformationOptionalParams,
  AccountsTransitionToCmkOptionalParams,
  AccountsRenewCredentialsOptionalParams,
  AccountsListBySubscriptionOptionalParams,
  AccountsListOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsUpdateOptionalParams,
  AccountsCreateOrUpdateOptionalParams,
  AccountsGetOptionalParams,
} from "./options.js";
