// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import {
  assertThrowsAbortError,
  assertThrowsRestError,
  createAppConfigurationClientForTests,
  deleteKeyCompletely,
  startRecorder,
} from "./utils/testHelpers.js";
import type { AppConfigurationClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("AppConfigurationClient (set|clear)ReadOnly", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;
  const testConfigSetting = {
    key: "",
    value: "world",
    label: "some label",
  };

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    testConfigSetting.key = recorder.variable(
      "readOnlyTests",
      `readOnlyTests${Math.floor(Math.random() * 1000)}`,
    );
    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
    // before it's set to read only we can set it all we want
    await client.setConfigurationSetting(testConfigSetting);
  });

  afterEach(async () => {
    await deleteKeyCompletely([testConfigSetting.key], client);
    await recorder.stop();
  });

  it("basic", async () => {
    let storedSetting = await client.getConfigurationSetting({
      key: testConfigSetting.key,
      label: testConfigSetting.label,
    });
    assert.ok(!storedSetting.isReadOnly);

    await client.setReadOnly(testConfigSetting, true);

    storedSetting = await client.getConfigurationSetting({
      key: testConfigSetting.key,
      label: testConfigSetting.label,
    });
    assert.ok(storedSetting.isReadOnly);

    // any modification related methods throw exceptions
    await assertThrowsRestError(
      () => client.setConfigurationSetting(testConfigSetting),
      409,
      "Set should fail because the setting is read-only",
    );
    await assertThrowsRestError(
      () =>
        client.deleteConfigurationSetting({
          key: testConfigSetting.key,
          label: testConfigSetting.label,
        }),
      409,
      "Delete should fail because the setting is read-only",
    );
  });

  // Skipping all "accepts operation options flaky tests" https://github.com/Azure/azure-sdk-for-js/issues/26447
  it.skip("accepts operation options", async () => {
    // Recorder checks for the recording and complains before core-rest-pipeline could throw the AbortError (Recorder v2 should help here)
    await client.getConfigurationSetting({
      key: testConfigSetting.key,
      label: testConfigSetting.label,
    });

    await assertThrowsAbortError(async () => {
      await client.setReadOnly(testConfigSetting, true, { requestOptions: { timeout: 1 } });
    });
    await assertThrowsAbortError(async () => {
      await client.setReadOnly(testConfigSetting, false, { requestOptions: { timeout: 1 } });
    });
  });
});
