// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SignalingClient } from "@azure/communication-signaling";
import type { CommunicationTokenCredential } from "@azure/communication-common";
import type { AzureLogger } from "@azure/logger";
import type { SignalingClientOptions } from "./signalingClientOptions.js";

export const getSignalingClient = (
  _credential: CommunicationTokenCredential,
  _logger: AzureLogger,
  _options?: SignalingClientOptions,
): SignalingClient | undefined => {
  // In node js
  return undefined;
};
