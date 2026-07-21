// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listSecrets,
  regenerateSecondaryKey,
  regeneratePrimaryKey,
  listByService,
  update,
  create,
  getEntityTag,
  get,
} from "./operations.js";
export type {
  TenantAccessListSecretsOptionalParams,
  TenantAccessRegenerateSecondaryKeyOptionalParams,
  TenantAccessRegeneratePrimaryKeyOptionalParams,
  TenantAccessListByServiceOptionalParams,
  TenantAccessUpdateOptionalParams,
  TenantAccessCreateOptionalParams,
  TenantAccessGetEntityTagOptionalParams,
  TenantAccessGetOptionalParams,
} from "./options.js";
