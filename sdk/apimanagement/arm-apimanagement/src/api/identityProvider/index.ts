// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listSecrets,
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "./operations.js";
export type {
  IdentityProviderListSecretsOptionalParams,
  IdentityProviderListByServiceOptionalParams,
  IdentityProviderDeleteOptionalParams,
  IdentityProviderUpdateOptionalParams,
  IdentityProviderCreateOrUpdateOptionalParams,
  IdentityProviderGetEntityTagOptionalParams,
  IdentityProviderGetOptionalParams,
} from "./options.js";
