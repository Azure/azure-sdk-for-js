// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { QuantumJobClient } from "../../src";

export default class TestClient {
  public readonly client: QuantumJobClient;
  constructor(client: QuantumJobClient) {
    this.client = client;
  }
}
