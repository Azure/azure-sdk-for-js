// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationSignalingClient, SignalingClient } from "@azure/communication-signaling";
import { CommunicationTokenCredential } from "@azure/communication-common";
import { AzureLogger } from "@azure/logger";
import { ChatClientOptions } from "../models/options";

export interface SignalingClientOptions {
  resourceEndpoint?: string;
  gatewayApiVersion?: string;
}

export interface TrouterConfigClientOptions extends ChatClientOptions {}

export const getSignalingClient = (
  credential: CommunicationTokenCredential,
  logger: AzureLogger,
  options?: SignalingClientOptions,
  trouterConfigClientOptions?: TrouterConfigClientOptions,
): SignalingClient | undefined => {
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    // In React Native
    return new CommunicationSignalingClient(
      credential,
      logger,
      {
        resourceEndpoint: options?.resourceEndpoint ?? undefined,
        gatewayApiVersion: options?.gatewayApiVersion ?? undefined,
      },
      {
        httpClient: trouterConfigClientOptions?.httpClient ?? undefined,
        additionalPolicies: trouterConfigClientOptions?.additionalPolicies ?? undefined,
        userAgentOptions: trouterConfigClientOptions?.userAgentOptions ?? undefined,
      },
    );
  }

  // In node js
  return undefined;
};
