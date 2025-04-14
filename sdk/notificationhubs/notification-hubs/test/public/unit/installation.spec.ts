// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  createAdmInstallation,
  createAppleInstallation,
  createBaiduInstallation,
  createBrowserInstallation,
  createFcmV1Installation,
  createFcmLegacyInstallation,
  createXiaomiInstallation,
  createWindowsInstallation,
} from "../../../src/models/installation.js";

describe("createAppleInstallation", () => {
  it("should set the default properties", () => {
    const installation = createAppleInstallation({
      installationId: "abc123",
      pushChannel: "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0",
    });

    assert.equal(installation.installationId, "abc123");
    assert.equal(
      installation.pushChannel,
      "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0",
    );
    assert.equal(installation.platform, "apns");
  });
});

describe("createAdmInstallation", () => {
  it("should set the default properties", () => {
    const installation = createAdmInstallation({
      installationId: "abc123",
      pushChannel: "zxy321",
    });

    assert.equal(installation.installationId, "abc123");
    assert.equal(installation.pushChannel, "zxy321");
    assert.equal(installation.platform, "adm");
  });
});

describe("createBaiduInstallation", () => {
  it("should set the default properties", () => {
    const installation = createBaiduInstallation({
      installationId: "abc123",
      pushChannel: "zxy321-abcabc",
    });

    assert.equal(installation.installationId, "abc123");
    assert.equal(installation.pushChannel, "zxy321-abcabc");
    assert.equal(installation.platform, "baidu");
  });
});

describe("createBrowserInstallation", () => {
  it("should set the default properties", () => {
    const installation = createBrowserInstallation({
      installationId: "abc123",
      pushChannel: {
        endpoint: "https://www.microsoft.com",
        p256dh: "{P256DH}",
        auth: "{Auth Secret}",
      },
    });

    assert.equal(installation.installationId, "abc123");
    assert.equal(installation.pushChannel.endpoint, "https://www.microsoft.com");
    assert.equal(installation.pushChannel.p256dh, "{P256DH}");
    assert.equal(installation.pushChannel.auth, "{Auth Secret}");
    assert.equal(installation.platform, "browser");
  });
});

describe("createFcmV1Installation", () => {
  it("should set the default properties", () => {
    const installation = createFcmV1Installation({
      installationId: "abc123",
      pushChannel: "zxy321",
    });

    assert.equal(installation.installationId, "abc123");
    assert.equal(installation.pushChannel, "zxy321");
    assert.equal(installation.platform, "fcmv1");
  });
});

describe("createFcmLegacyInstallation", () => {
  it("should set the default properties", () => {
    const installation = createFcmLegacyInstallation({
      installationId: "abc123",
      pushChannel: "zxy321",
    });

    assert.equal(installation.installationId, "abc123");
    assert.equal(installation.pushChannel, "zxy321");
    assert.equal(installation.platform, "gcm");
  });
});

describe("createXiaomiInstallation", () => {
  it("should set the default properties", () => {
    const installation = createXiaomiInstallation({
      installationId: "abc123",
      pushChannel: "zxy321",
    });

    assert.equal(installation.installationId, "abc123");
    assert.equal(installation.pushChannel, "zxy321");
    assert.equal(installation.platform, "xiaomi");
  });
});

describe("createWindowsInstallation", () => {
  it("should set the default properties", () => {
    const installation = createWindowsInstallation({
      installationId: "abc123",
      pushChannel: "https://www.microsoft.com/",
    });

    assert.equal(installation.installationId, "abc123");
    assert.equal(installation.pushChannel, "https://www.microsoft.com/");
    assert.equal(installation.platform, "wns");
  });
});
