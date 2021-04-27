// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationSignalingClient, SignalingClient } from "@azure/communication-signaling";
import { CommunicationTokenCredential } from "@azure/communication-common";
import { AzureLogger } from "@azure/logger";

export const getSignalingClient = (
  credential: CommunicationTokenCredential,
  logger: AzureLogger
): SignalingClient | undefined => {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    // In React Native
    return new CommunicationSignalingClient(credential, logger);
  }

  // In node js
  return undefined;
};
