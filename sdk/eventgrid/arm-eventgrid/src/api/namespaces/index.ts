// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  validateCustomDomainOwnership,
  regenerateKey,
  listSharedAccessKeys,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  NamespacesValidateCustomDomainOwnershipOptionalParams,
  NamespacesRegenerateKeyOptionalParams,
  NamespacesListSharedAccessKeysOptionalParams,
  NamespacesListBySubscriptionOptionalParams,
  NamespacesListByResourceGroupOptionalParams,
  NamespacesDeleteOptionalParams,
  NamespacesUpdateOptionalParams,
  NamespacesCreateOrUpdateOptionalParams,
  NamespacesGetOptionalParams,
} from "./options.js";
