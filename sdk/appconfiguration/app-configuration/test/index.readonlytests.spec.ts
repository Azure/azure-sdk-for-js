import {
  getConnectionStringFromEnvironment,
  assertThrowsRestError,
  deleteKeyCompletely
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

  before(() => {
    client = new AppConfigurationClient(getConnectionStringFromEnvironment());
  });

  after(() => {
    deleteKeyCompletely([testConfigSetting.key], client);
  });

  it("basic", async () => {
    // before it's set to read only we can set it all we want
    await client.setConfigurationSetting(testConfigSetting);

    let storedSetting = await client.getConfigurationSetting(testConfigSetting.key, {
      label: testConfigSetting.label
    });
    assert.ok(!storedSetting.locked);

    await client.setReadOnly(testConfigSetting);

    storedSetting = await client.getConfigurationSetting(testConfigSetting.key, {
      label: testConfigSetting.label
    });
    assert.ok(storedSetting.locked);

    // any modification related methods throw exceptions
    await assertThrowsRestError(
      () => client.setConfigurationSetting(testConfigSetting),
      409,
      "Set should fail because the setting is read-only"
    );
    await assertThrowsRestError(
      () =>
        client.deleteConfigurationSetting(testConfigSetting.key, {
          label: testConfigSetting.label
        }),
      409,
      "Delete should fail because the setting is read-only"
    );
  });
});
