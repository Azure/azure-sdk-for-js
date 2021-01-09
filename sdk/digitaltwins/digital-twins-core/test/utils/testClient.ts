// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// import { testPollerProperties } from "./recorderUtils";
import { DigitalTwinsClient } from "../../src";
// import { PollerLike, PollOperationState } from "@azure/core-lro";
// import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
// import { RestoreKeyBackupPoller } from "./lro/restore/poller";
// import { BeginRestoreKeyBackupOptions } from "./lro/restore/operation";

export default class TestClient {
  public readonly client: DigitalTwinsClient;
  constructor(client: DigitalTwinsClient) {
    this.client = client;
  }
}
