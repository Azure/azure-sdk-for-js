import {
  createAppConfigurationClientForTests,
  assertThrowsRestError,
  deleteKeyCompletely,
  assertThrowsAbortError
} from "./testHelpers";
import { AppConfigurationClient } from "../src";
import * as assert from "assert";

describe("AppConfigurationClient (set|clear)ReadOnly", () => {
  let client: AppConfigurationClient;
  const testConfigSetting = {
    key: `readOnlyTests-${Date.now()}`,
    value: "world",
    label: "some label"
  };

  before(function() {
    client = createAppConfigurationClientForTests() || this.skip();
  });

  after(async function() {
    if (!this.currentTest?.isPending()) {
      await deleteKeyCompletely([testConfigSetting.key], client);
    }
  });

  it("basic", async () => {
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
  });

  it("accepts operation options", async () => {
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
  });
});
