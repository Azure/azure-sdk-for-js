// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createAppConfigurationClientForTests,
  assertThrowsRestError,
  deleteKeyCompletely,
  assertThrowsAbortError,
  recorderStartOptions
} from "./utils/testHelpers";
import { AppConfigurationClient } from "../../src";
import * as assert from "assert";
import { Context } from "mocha";
import { TestProxyHttpClientCoreV1 } from "@azure-tools/test-recorder-new";
import { isPlaybackMode } from "@azure-tools/test-recorder";

describe("AppConfigurationClient (set|clear)ReadOnly", () => {
  let client: AppConfigurationClient;
  let recorder: TestProxyHttpClientCoreV1;
  const testConfigSetting = {
    key: "",
    value: "world",
    label: "some label"
  };

  beforeEach(async function(this: Context) {
    recorder = new TestProxyHttpClientCoreV1(this.currentTest);
    await recorder.start(recorderStartOptions);
    if (!isPlaybackMode()) {
      recorder.variables["readOnlyTests"] = `readOnlyTests-${Math.ceil(
        Math.random() * 1000 + 1000
      )}`;
    }
    testConfigSetting.key = recorder.variables["readOnlyTests"];
    client = createAppConfigurationClientForTests({ httpClient: recorder }) || this.skip();
    // before it's set to read only we can set it all we want
    await client.setConfigurationSetting(testConfigSetting);
  });

  afterEach(async function() {
    await deleteKeyCompletely([testConfigSetting.key], client);
    await recorder.stop();
  });

  it("basic", async function() {
    let storedSetting = await client.getConfigurationSetting({
      key: testConfigSetting.key,
      label: testConfigSetting.label
    });
    assert.ok(!storedSetting.isReadOnly);

    await client.setReadOnly(testConfigSetting, true);

    storedSetting = await client.getConfigurationSetting({
      key: testConfigSetting.key,
      label: testConfigSetting.label
    });
    assert.ok(storedSetting.isReadOnly);

    // any modification related methods throw exceptions
    await assertThrowsRestError(
      () => client.setConfigurationSetting(testConfigSetting),
      409,
      "Set should fail because the setting is read-only"
    );
    await assertThrowsRestError(
      () =>
        client.deleteConfigurationSetting({
          key: testConfigSetting.key,
          label: testConfigSetting.label
        }),
      409,
      "Delete should fail because the setting is read-only"
    );
  });

  it("accepts operation options", async function() {
    await client.getConfigurationSetting({
      key: testConfigSetting.key,
      label: testConfigSetting.label
    });

    await assertThrowsAbortError(async () => {
      await client.setReadOnly(testConfigSetting, true, { requestOptions: { timeout: 1 } });
    });
    await assertThrowsAbortError(async () => {
      await client.setReadOnly(testConfigSetting, false, { requestOptions: { timeout: 1 } });
    });
  });
});
