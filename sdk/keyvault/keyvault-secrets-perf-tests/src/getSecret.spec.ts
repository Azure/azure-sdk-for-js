// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecretTest } from "./secretTest.js";
import { randomUUID } from "node:crypto";

export class GetSecretTest extends SecretTest {
  static secretName = `s-${randomUUID()}`;

  public options = {};

  async globalSetup() {
    await this.secretClient.setSecret(GetSecretTest.secretName, "value");
  }

  async run(): Promise<void> {
    await this.secretClient.getSecret(GetSecretTest.secretName);
  }

  async globalCleanup() {
    await this.deleteAndPurgeSecrets(GetSecretTest.secretName);
  }
}
