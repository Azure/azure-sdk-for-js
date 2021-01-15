// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DigitalTwinsClient } from "../../src";

export default class TestClient {
  public readonly client: DigitalTwinsClient;
  constructor(client: DigitalTwinsClient) {
    this.client = client;
  }
}
