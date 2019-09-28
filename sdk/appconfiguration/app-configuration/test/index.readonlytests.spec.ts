import { getConnectionStringFromEnvironment, assertThrowsRestError, deleteKeyCompletely } from "./testHelpers";
import { AppConfigurationClient } from "../src";
import * as assert from "assert";

describe("appconfig readonly settings tests", () => {
  let client: AppConfigurationClient;
  const testConfigSetting = { key: `readOnlyTests-${Date.now()}`, value: "world", label: "some label" };

  before(() => {
    client = new AppConfigurationClient(getConnectionStringFromEnvironment());
  });

  after(() => {
    deleteKeyCompletely([testConfigSetting.key], client);
  });

  it("setReadOnly/clearReadOnly (formerly known as lock/unlock)", async () => {

    // before it's set to read only we can set it all we want
    await client.setConfigurationSetting(testConfigSetting);
    
    let storedSetting = await client.getConfigurationSetting(testConfigSetting.key, { label: testConfigSetting.label });
    assert.ok(!storedSetting.locked);

    await client.setReadOnly(testConfigSetting);

    storedSetting = await client.getConfigurationSetting(testConfigSetting.key, { label: testConfigSetting.label });
    assert.ok(storedSetting.locked);

    // now set throws exceptions
    await assertThrowsRestError(() => client.setConfigurationSetting(testConfigSetting), 409, "Set should fail because the setting is locked");
  });
});
