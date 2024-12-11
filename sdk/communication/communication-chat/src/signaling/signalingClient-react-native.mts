// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SignalingClient } from "@azure/communication-signaling";
import { CommunicationSignalingClient } from "@azure/communication-signaling";
import type { CommunicationTokenCredential } from "@azure/communication-common";
import type { AzureLogger } from "@azure/logger";
import type { SignalingClientOptions } from "./signalingClientOptions.js";

export const getSignalingClient = (
  credential: CommunicationTokenCredential,
  logger: AzureLogger,
  options?: SignalingClientOptions,
): SignalingClient | undefined => {
  return new CommunicationSignalingClient(credential, logger, {
    resourceEndpoint: options?.resourceEndpoint ?? undefined,
    gatewayApiVersion: options?.gatewayApiVersion ?? undefined,
    additionalPolicies: options?.additionalPolicies ?? undefined,
    userAgentOptions: options?.userAgentOptions ?? undefined,
  });
};
