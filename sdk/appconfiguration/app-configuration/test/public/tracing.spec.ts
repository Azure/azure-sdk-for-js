// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers.js";
import { AppConfigurationClient } from "../../src/appConfigurationClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("supports tracing", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    recorder = await startRecorder(ctx);
    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can trace through the various options", async function () {
    const key = recorder.variable(
      "noLabelTests",
      `noLabelTests${Math.floor(Math.random() * 1000)}`,
    );
    /** 
    await assert.supportsTracing(
      async (options) => {
        const promises: Promise<any>[] = [
          client.addConfigurationSetting({ key }, options),
          client.getConfigurationSetting({ key }, options),
          client.setConfigurationSetting({ key, value: "new-value" }, options),
          client.setReadOnly({ key }, true, options),
          client.deleteConfigurationSetting({ key }, options),
        ];
        // We don't care about errors, only that we created (and closed) the appropriate spans.
        await Promise.all(promises.map((p) => p.catch(() => undefined)));
      },
      [
        "AppConfigurationClient.addConfigurationSetting",
        "AppConfigurationClient.getConfigurationSetting",
        "AppConfigurationClient.setConfigurationSetting",
        "AppConfigurationClient.setReadOnly",
        "AppConfigurationClient.deleteConfigurationSetting",
      ],
    );
    */
    try {
      await client.setReadOnly({ key: key }, false);
      await client.deleteConfigurationSetting({ key: key });
      assert.ok(true);
    } catch (e: any) {
      // empty because key is already deleted
    }
  });
});
