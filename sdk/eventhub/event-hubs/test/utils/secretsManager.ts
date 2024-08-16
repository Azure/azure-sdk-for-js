// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTestCredential } from "@azure-tools/test-credential";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { SecretClient } from "@azure/keyvault-secrets";
import { EnvVarKeys } from "./constants.js";

function getKvUri(): string {
  return assertEnvironmentVariable(EnvVarKeys.KEYVAULT_URI);
}

export class SecretsManager {
  private _client: SecretClient;
  private eventHubConnectionString?: string;

  constructor() {
    this._client = new SecretClient(getKvUri(), createTestCredential());
  }

  async getEventHubConnectionString(): Promise<string> {
    if (this.eventHubConnectionString) {
      return this.eventHubConnectionString;
    }
    const secretName = assertEnvironmentVariable(EnvVarKeys.EVENTHUB_CONNECTION_STRING_SECRET_NAME);
    const { value } = await this._client.getSecret(secretName);
    if (!value) {
      throw new Error(`Failed to retrieve the event hub connection string from Key Vault.`);
    }
    this.eventHubConnectionString = value;
    return value;
  }
}
