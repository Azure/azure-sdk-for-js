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
  OpenIdConnectProviderListSecretsOptionalParams,
  OpenIdConnectProviderListByServiceOptionalParams,
  OpenIdConnectProviderDeleteOptionalParams,
  OpenIdConnectProviderUpdateOptionalParams,
  OpenIdConnectProviderCreateOrUpdateOptionalParams,
  OpenIdConnectProviderGetEntityTagOptionalParams,
  OpenIdConnectProviderGetOptionalParams,
} from "./options.js";
