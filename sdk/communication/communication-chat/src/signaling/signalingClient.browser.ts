// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationSignalingClient, SignalingClient } from "@azure/communication-signaling";
import { CommunicationTokenCredential } from "@azure/communication-common";
import { AzureLogger } from "@azure/logger";
import { SignalingClientOptions, TrouterConfigClientOptions } from "./signalingClient";

export const getSignalingClient = (
  credential: CommunicationTokenCredential,
  logger: AzureLogger,
  options?: SignalingClientOptions,
  trouterConfigClientOptions?: TrouterConfigClientOptions,
): SignalingClient | undefined => {
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
};
