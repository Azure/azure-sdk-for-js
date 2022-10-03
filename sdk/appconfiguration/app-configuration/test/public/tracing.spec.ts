// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "@azure/test-utils";
import { Context } from "mocha";
import { AppConfigurationClient } from "../../src/appConfigurationClient";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers";

describe("supports tracing", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = startRecorder(this);
    client = createAppConfigurationClientForTests() || this.skip();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can trace through the various options", async function () {
    const key = recorder.getUniqueName("noLabelTests");
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
      ]
    );
  });
});
