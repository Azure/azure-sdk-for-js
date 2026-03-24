// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listSecrets,
  regenerateSecondaryKey,
  regeneratePrimaryKey,
  list,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "./operations.js";
export type {
  SubscriptionListSecretsOptionalParams,
  SubscriptionRegenerateSecondaryKeyOptionalParams,
  SubscriptionRegeneratePrimaryKeyOptionalParams,
  SubscriptionListOptionalParams,
  SubscriptionDeleteOptionalParams,
  SubscriptionUpdateOptionalParams,
  SubscriptionCreateOrUpdateOptionalParams,
  SubscriptionGetEntityTagOptionalParams,
  SubscriptionGetOptionalParams,
} from "./options.js";
