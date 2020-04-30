// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { testPollerProperties } from "./recorderUtils";
import { SecretClient } from "../../src";

export default class TestClient {
  public readonly client: SecretClient;
  constructor(client: SecretClient) {
    this.client = client;
  }
  public formatName(name: string): string {
    return name.replace(/[^0-9a-zA-Z-]/g, "");
  }
  public async purgeSecret(secretName: string): Promise<void> {
    await this.client.purgeDeletedSecret(secretName);
  }
  public async flushSecret(secretName: string): Promise<void> {
    const that = this;
    const deletePoller = await that.client.beginDeleteSecret(secretName, testPollerProperties);
    await deletePoller.pollUntilDone();
    await this.purgeSecret(secretName);
  }
}
