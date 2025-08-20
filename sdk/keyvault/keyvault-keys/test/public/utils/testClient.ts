// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { testPollerProperties } from "./recorderUtils.js";
import type { KeyClient } from "@azure/keyvault-keys";

export interface TestClientInterface {
  client: KeyClient;
  formatName: (name: string) => string;
  purgeKey: (keyName: string) => Promise<void>;
  flushKey: (keyName: string) => Promise<void>;
}
export default class TestClient implements TestClientInterface {
  public readonly client: KeyClient;
  constructor(client: KeyClient) {
    this.client = client;
  }
  public formatName(name: string): string {
    return name.replace(/[^0-9a-zA-Z-]/g, "");
  }
  public async purgeKey(keyName: string): Promise<void> {
    await this.client.purgeDeletedKey(keyName);
  }
  public async flushKey(keyName: string): Promise<void> {
    const poller = await this.client.beginDeleteKey(keyName, testPollerProperties);
    await poller.pollUntilDone();
    await this.purgeKey(keyName);
  }
}
