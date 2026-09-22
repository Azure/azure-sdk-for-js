// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  checkNameAvailability,
  listReplicaSkus,
  listSkus,
  restart,
  regenerateKey,
  listKeys,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  SignalRCheckNameAvailabilityOptionalParams,
  SignalRListReplicaSkusOptionalParams,
  SignalRListSkusOptionalParams,
  SignalRRestartOptionalParams,
  SignalRRegenerateKeyOptionalParams,
  SignalRListKeysOptionalParams,
  SignalRListBySubscriptionOptionalParams,
  SignalRListByResourceGroupOptionalParams,
  SignalRDeleteOptionalParams,
  SignalRUpdateOptionalParams,
  SignalRCreateOrUpdateOptionalParams,
  SignalRGetOptionalParams,
} from "./options.js";
