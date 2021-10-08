// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationSignalingClient, SignalingClient } from "@azure/communication-signaling";
import { CommunicationTokenCredential } from "@azure/communication-common";
import { AzureLogger } from "@azure/logger";
import { SignalingClientOptions } from "./signalingClient";

export const getSignalingClient = (
  credential: CommunicationTokenCredential,
  logger: AzureLogger,
  options?: SignalingClientOptions
): SignalingClient | undefined => {
  return new CommunicationSignalingClient(credential, logger, {
    environment: options?.environment ?? undefined
  });
};
