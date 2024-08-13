// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { KeyVaultSettingsClient } from "../../src/settingsClient.js";
import { authenticate } from "./utils/authentication.js";
import { getServiceVersion, onVersions } from "./utils/common.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

onVersions({ minVer: "7.4" }).describe("KeyVaultSettingsClient", () => {
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
    setting.value = true;
    const updated = await client.updateSetting(setting);

    assert.isTrue(setting.kind === "boolean");
    assert.isTrue(typeof setting.value === "boolean");
    assert.isTrue(updated.value);
  });
});
