// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable no-unused-expressions */

import { NoOpCredential } from "@azure-tools/test-credential";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { isNodeLike } from "@azure/core-util";
import { DefaultAzureCredential, TokenCredential } from "@azure/identity";

export class EnvTokenCredential implements TokenCredential {
  private token: string;

  constructor(envName: string) {
    const token = process.env[envName];
    if (!token) {
      throw new Error(`${envName} must be set`);
    }
    this.token = token;
  }

  async getToken(): Promise<{ token: string; expiresOnTimestamp: number }> {
    return { token: this.token, expiresOnTimestamp: Date.now() + 60 * 60 * 24 };
  }
}

export function getArmCredential(): TokenCredential {
  return isPlaybackMode()
    ? new NoOpCredential()
    : isNodeLike
      ? new DefaultAzureCredential()
      : new EnvTokenCredential("ARM_ACCESS_TOKEN");
}
