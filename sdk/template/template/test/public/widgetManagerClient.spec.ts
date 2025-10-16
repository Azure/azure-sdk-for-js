// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { WidgetAnalyticsClient } from "../../src/widgetAnalyticsClient.js";

describe("WidgetManagerClient", () => {
  let recorder: Recorder;
  let client: WidgetAnalyticsClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = new WidgetAnalyticsClient(
      process.env.WIDGET_MANAGER_ENDPOINT!,
      createTestCredential(),
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("supports customMethod", () => {
    expect(client.customMethod()).toBe("This is a custom method!");
  });
});
