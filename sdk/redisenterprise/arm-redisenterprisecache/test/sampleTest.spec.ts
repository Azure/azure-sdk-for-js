// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { afterEach, beforeEach, describe, it, assert } from "vitest";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
};

describe("My test", () => {
  let recorder: Recorder;

  beforeEach(async () => {
    recorder = new Recorder();
    await recorder.start(recorderOptions);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("sample test", async () => {
    assert(true);
  });
});
