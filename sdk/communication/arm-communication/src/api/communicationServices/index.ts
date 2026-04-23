// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  checkNameAvailability,
  regenerateKey,
  listKeys,
  linkNotificationHub,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  CommunicationServicesCheckNameAvailabilityOptionalParams,
  CommunicationServicesRegenerateKeyOptionalParams,
  CommunicationServicesListKeysOptionalParams,
  CommunicationServicesLinkNotificationHubOptionalParams,
  CommunicationServicesListBySubscriptionOptionalParams,
  CommunicationServicesListByResourceGroupOptionalParams,
  CommunicationServicesDeleteOptionalParams,
  CommunicationServicesUpdateOptionalParams,
  CommunicationServicesCreateOrUpdateOptionalParams,
  CommunicationServicesGetOptionalParams,
} from "./options.js";
