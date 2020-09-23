// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SignalingClient } from "@azure/communication-signaling";
import { CommunicationUserCredential } from "@azure/communication-common";
import { AzureLogger } from "@azure/logger";

export const getSignalingClient = (
  _credential: CommunicationUserCredential,
  _logger: AzureLogger
): SignalingClient | undefined => {
  return undefined;
};
