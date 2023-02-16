import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "@azure/test-utils";
import { KeyVaultSettingsClient } from "../../src/settingsClient";
import { authenticate } from "./utils/authentication";
import { getServiceVersion, onVersions } from "./utils/common";

onVersions({ minVer: "7.4-preview.1" }).describe("KeyVaultSettingsClient", () => {
  let client: KeyVaultSettingsClient;
  let recorder: Recorder;

  beforeEach(async function () {
    const authentication = await authenticate(this, getServiceVersion());
    client = authentication.settingsClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("getSettings lists all settings", async () => {
    const { settings } = await client.getSettings();

    assert.exists(settings);
    assert.isTrue(settings.length > 0);
  });

  it("can get and update settings", async () => {
    const setting = await client.getSetting("AllowKeyManagementOperationsThroughARM");
    const updated = await client.updateSetting(setting.name, true);

    assert.isTrue(setting.kind === "boolean");
    assert.isTrue(typeof setting.value === "boolean");
    assert.isTrue(updated.value);
  });
});
