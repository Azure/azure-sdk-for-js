import {
  createAppConfigurationClientForTests,
  assertThrowsRestError,
  deleteKeyCompletely,
  assertThrowsAbortError,
  startRecorder
} from "./testHelpers";
import { AppConfigurationClient } from "../src";
import * as assert from "assert";
import { Recorder, isPlaybackMode } from '@azure/test-utils-recorder';

describe("AppConfigurationClient (set|clear)ReadOnly", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;
  const testConfigSetting = {
    key: "",
    value: "world",
    label: "some label"
  };

  beforeEach(function() {
    recorder = startRecorder(this);
    testConfigSetting.key = recorder.getUniqueName("readOnlyTests");
    client = createAppConfigurationClientForTests() || this.skip();
  });

  afterEach(function() {
    recorder.stop();
  });

  it("basic", async function() {
    // before it's set to read only we can set it all we want
    await client.setConfigurationSetting(testConfigSetting);

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

    await deleteKeyCompletely([testConfigSetting.key], client);
  });

  it("accepts operation options", async function() {
    // before it's set to read only we can set it all we want
    await client.setConfigurationSetting(testConfigSetting);

    let storedSetting = await client.getConfigurationSetting({
      key: testConfigSetting.key,
      label: testConfigSetting.label
    });

    await assertThrowsAbortError(async () => {
      await client.setReadOnly(testConfigSetting, true, { requestOptions: { timeout: 1 } });
    });
    await assertThrowsAbortError(async () => {
      await client.setReadOnly(testConfigSetting, false, { requestOptions: { timeout: 1 } });
    });

    await deleteKeyCompletely([testConfigSetting.key], client);
  });
});
