// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationSignalingClient,
  CommunicationUserCredential,
  SignalingClient
} from "@azure/communication-signaling";
import { CommunicationTokenCredential } from "@azure/communication-common";
import { AzureLogger } from "@azure/logger";
import { AbortSignalLike, AccessToken } from "@azure/core-http";

export const getSignalingClient = (
  credential: CommunicationTokenCredential,
  logger: AzureLogger
): SignalingClient | undefined => {
  return new CommunicationSignalingClient(new SignalingCredentialType(credential), logger);
};

/**
 * Bridge credential until @azure/communication-signaling has been updated
 * to match common's CommunicationTokenCredential interface.
 */
class SignalingCredentialType implements CommunicationUserCredential {
  constructor(private credential: CommunicationTokenCredential) {}

  getToken(abortSignal?: AbortSignalLike): Promise<AccessToken> {
    return this.credential.getToken({ abortSignal });
  }

  dispose() {
    this.credential.dispose();
  }
}
