// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { KeyVaultSettingsClient } from "../../src/settingsClient.js";
import { authenticate } from "./utils/authentication.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";

describe("KeyVaultSettingsClient", () => {
  let client: KeyVaultSettingsClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    client = authentication.settingsClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("getSettings lists all settings", async () => {
    const { settings } = await client.getSettings();

    expect(settings).toBeDefined();
    expect(settings.length).toBeGreaterThan(0);
  });

  it("can get and update settings", async () => {
    const setting = await client.getSetting("AllowKeyManagementOperationsThroughARM");
    setting.value = true;
    const updated = await client.updateSetting(setting);

    expect(setting.kind).toEqual("boolean");
    expect(setting.value).toBeTypeOf("boolean");
    expect(updated.value).toBeTruthy();
  });
});
