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
  WorkspaceSubscriptionListSecretsOptionalParams,
  WorkspaceSubscriptionRegenerateSecondaryKeyOptionalParams,
  WorkspaceSubscriptionRegeneratePrimaryKeyOptionalParams,
  WorkspaceSubscriptionListOptionalParams,
  WorkspaceSubscriptionDeleteOptionalParams,
  WorkspaceSubscriptionUpdateOptionalParams,
  WorkspaceSubscriptionCreateOrUpdateOptionalParams,
  WorkspaceSubscriptionGetEntityTagOptionalParams,
  WorkspaceSubscriptionGetOptionalParams,
} from "./options.js";
