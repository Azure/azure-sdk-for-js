// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationSignalingClient, SignalingClient } from "@azure/communication-signaling";
import { CommunicationTokenCredential } from "@azure/communication-common";
import { AzureLogger } from "@azure/logger";

export interface SignalingClientOptions {
  environment?: string;
  resourceEndpoint?: string;
  gatewayApiVersion?: string;
}

export const getSignalingClient = (
  credential: CommunicationTokenCredential,
  logger: AzureLogger,
  options?: SignalingClientOptions,
): SignalingClient | undefined => {
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    // In React Native
    return new CommunicationSignalingClient(credential, logger, {
      environment: options?.environment ?? undefined,
      resourceEndpoint: options?.resourceEndpoint ?? undefined,
      gatewayApiVersion: options?.gatewayApiVersion ?? undefined,
    });
  }

  // In node js
  return undefined;
};
