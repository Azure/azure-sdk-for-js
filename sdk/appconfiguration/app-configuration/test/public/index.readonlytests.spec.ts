import {
  createAppConfigurationClientForTests,
  assertThrowsRestError,
  deleteKeyCompletely,
  assertThrowsAbortError,
  startRecorder
} from "../utils/testHelpers";
import { AppConfigurationClient } from "../../src";
import * as assert from "assert";
import { Recorder } from "@azure/test-utils-recorder";

describe("AppConfigurationClient (set|clear)ReadOnly", () => {
  let appConfigClient: AppConfigurationClient;
  let recorder: Recorder;
  const testConfigSetting = {
    key: "",
    value: "world",
    label: "some label"
  };

  beforeEach(async function() {
    recorder = startRecorder(this);
    testConfigSetting.key = recorder.getUniqueName("readOnlyTests");
    appConfigClient = createAppConfigurationClientForTests() || this.skip();
    // before it's set to read only we can set it all we want
    await appConfigClient.setConfigurationSetting(testConfigSetting);
  });

  afterEach(async function() {
    await deleteKeyCompletely([testConfigSetting.key], appConfigClient);
    await recorder.stop();
  });

  it("basic", async function() {
    let storedSetting = await appConfigClient.getConfigurationSetting({
      key: testConfigSetting.key,
      label: testConfigSetting.label
    });
    assert.ok(!storedSetting.isReadOnly);

    await appConfigClient.setReadOnly(testConfigSetting, true);

    storedSetting = await appConfigClient.getConfigurationSetting({
      key: testConfigSetting.key,
      label: testConfigSetting.label
    });
    assert.ok(storedSetting.isReadOnly);

    // any modification related methods throw exceptions
    await assertThrowsRestError(
      () => appConfigClient.setConfigurationSetting(testConfigSetting),
      409,
      "Set should fail because the setting is read-only"
    );
    await assertThrowsRestError(
      () =>
        appConfigClient.deleteConfigurationSetting({
          key: testConfigSetting.key,
          label: testConfigSetting.label
        }),
      409,
      "Delete should fail because the setting is read-only"
    );
  });

  it("accepts operation options", async function() {
    await appConfigClient.getConfigurationSetting({
      key: testConfigSetting.key,
      label: testConfigSetting.label
    });

    await assertThrowsAbortError(async () => {
      await appConfigClient.setReadOnly(testConfigSetting, true, { requestOptions: { timeout: 1 } });
    });
    await assertThrowsAbortError(async () => {
      await appConfigClient.setReadOnly(testConfigSetting, false, { requestOptions: { timeout: 1 } });
    });
  });
});
