// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationSignalingClient, SignalingClient } from "@azure/communication-signaling";
import { AzureLogger } from "@azure/logger";
import { CommunicationTokenCredential } from "@azure/communication-common";

export interface SignalingClientOptions {
  environment?: string;
}

export const getSignalingClient = (
  credential: CommunicationTokenCredential,
  logger: AzureLogger,
  options?: SignalingClientOptions
): SignalingClient | undefined => {
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    // In React Native
    return new CommunicationSignalingClient(credential, logger, {
      environment: options?.environment ?? undefined
    });
  }

  // In node js
  return undefined;
};
