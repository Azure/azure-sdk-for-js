// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers";
import { AppConfigurationClient } from "../../src/appConfigurationClient";
import { Context } from "mocha";
import { assert } from "@azure-tools/test-utils";
import { tracingClient } from "../../src/internal/tracing";
import Sinon from "sinon";

describe("supports tracing", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    Sinon.restore();
    await recorder.stop();
  });

  it("can trace through the various options", async function () {
    const key = recorder.variable(
      "noLabelTests",
      `noLabelTests${Math.floor(Math.random() * 1000)}`,
    );

    const spy = Sinon.spy(tracingClient, "withSpan");

    // We don't care about errors, only that we created a span for each operation
    await Promise.allSettled([
      client.addConfigurationSetting({ key }),
      client.getConfigurationSetting({ key }),
      client.setConfigurationSetting({ key, value: "new-value" }),
      client.setReadOnly({ key }, true),
      client.deleteConfigurationSetting({ key }),
    ]);

    const expected = [
      "AppConfigurationClient.addConfigurationSetting",
      "AppConfigurationClient.getConfigurationSetting",
      "AppConfigurationClient.setConfigurationSetting",
      "AppConfigurationClient.setReadOnly",
      "AppConfigurationClient.deleteConfigurationSetting",
    ];

    assert.sameMembers(
      expected,
      spy.getCalls().map((call) => call.args[0]),
    );
  });
});
