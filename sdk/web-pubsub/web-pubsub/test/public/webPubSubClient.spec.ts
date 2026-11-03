// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, beforeEach, afterEach } from "vitest";
import { WebPubSubServiceClient } from "../../src/webPubSubServiceClient.js";
import recorderOptions from "../testEnv.js";
import { getEndpoint, isLiveMode } from "../utils/injectables.js";

describe("WebPubSubClient", () => {
  let recorder: Recorder;
  let client: WebPubSubServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    client = new WebPubSubServiceClient(
      getEndpoint(),
      createTestCredential(),
      "simplechat",
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it.runIf(isLiveMode())("can get service status", async () => {
    try {
      await client.getServiceStatus();
    } catch (e: any) {
      if (e?.statusCode === 200) {
        return;
      }
      throw e;
    }
  });
});
