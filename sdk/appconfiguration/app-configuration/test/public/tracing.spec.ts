// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, instrumenter } from "@azure-tools/test-utils";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers";

import { AppConfigurationClient } from "../../src/appConfigurationClient";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import Sinon from "sinon";
import { createTracingClient } from "@azure/core-tracing";
import { tracing } from "../../src/internal/tracing";

describe.only("supports tracing", () => {
  let client: AppConfigurationClient;
  let fixedClient: AppConfigurationClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
    fixedClient = createAppConfigurationClientForTests(
      recorder.configureClientOptions({
        instrumenter,
      }),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can trace through the various options", async function () {
    console.log("expected to fail with missing spans");
    const key = recorder.variable(
      "noLabelTests",
      `noLabelTests${Math.floor(Math.random() * 1000)}`,
    );
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
  });

  it("can trace through the various options", async function () {
    console.log("expected to pass with all spans");
    const key = recorder.variable(
      "noLabelTests",
      `noLabelTests${Math.floor(Math.random() * 1000)}`,
    );
    await assert.supportsTracing(
      async (options) => {
        const promises: Promise<any>[] = [
          fixedClient.addConfigurationSetting({ key }, options),
          fixedClient.getConfigurationSetting({ key }, options),
          fixedClient.setConfigurationSetting({ key, value: "new-value" }, options),
          fixedClient.setReadOnly({ key }, true, options),
          fixedClient.deleteConfigurationSetting({ key }, options),
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
  });

  it("can trace through the various options", async function () {
    console.log("expected to pass with mocking");
    // mock the createTracingClient call to return a stubbed instance of tracingClient
    const stubbedClient = createTracingClient({
      namespace: "",
      packageName: "",
    });
    const withSpanSpy = Sinon.spy(stubbedClient, "withSpan");

    Sinon.stub(tracing, "createTracingClient").returns(stubbedClient);

    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
    const key = recorder.variable(
      "noLabelTests",
      `noLabelTests${Math.floor(Math.random() * 1000)}`,
    );
    const promises: Promise<any>[] = [
      client.addConfigurationSetting({ key }),
      client.getConfigurationSetting({ key }),
      client.setConfigurationSetting({ key, value: "new-value" }),
      client.setReadOnly({ key }, true),
      client.deleteConfigurationSetting({ key }),
    ];

    await Promise.allSettled(promises); // we don't care about errors, only that the spans are created correctly
    const spanNames = withSpanSpy.getCalls().map((call) => call.args[0]);

    // and you can assert that withSpan was called with the expected span names and all that
    // I am just doing a quick and easy way
    assert.sameMembers(spanNames, [
      "AppConfigurationClient.addConfigurationSetting",
      "AppConfigurationClient.getConfigurationSetting",
      "AppConfigurationClient.setConfigurationSetting",
      "AppConfigurationClient.setReadOnly",
      "AppConfigurationClient.deleteConfigurationSetting",
    ]);
  });
});
