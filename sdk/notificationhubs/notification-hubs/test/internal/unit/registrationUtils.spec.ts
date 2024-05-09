// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import type {
  AdmRegistrationChannel,
  AppleRegistrationChannel,
  BaiduRegistrationChannel,
  BrowserRegistrationChannel,
  FirebaseLegacyRegistrationChannel,
  FirebaseV1RegistrationChannel,
  WindowsRegistrationChannel,
} from "../../../src/models/registration.js";
import { getFilterByChannel } from "../../../src/utils/registrationUtils.js";

describe("registrationUtils", () => {
  describe("getFilterByChannel", () => {
    it("should return a filter string for ADM", () => {
      const channel: AdmRegistrationChannel = {
        kind: "adm",
        admRegistrationId: "admRegistrationId",
      };

      const result = getFilterByChannel(channel);

      assert.equal(result, "AdmRegistrationId eq 'admRegistrationId'");
    });

    it("should return a filter string for Apple", () => {
      const channel: AppleRegistrationChannel = {
        kind: "apple",
        deviceToken: "deviceToken",
      };

      const result = getFilterByChannel(channel);

      assert.equal(result, "DeviceToken eq 'DEVICETOKEN'");
    });

    it("should return a filter string for Baidu", () => {
      const channel: BaiduRegistrationChannel = {
        kind: "baidu",
        baiduChannelId: "baiduChannelId",
        baiduUserId: "baiduUserId",
      };

      const result = getFilterByChannel(channel);

      assert.equal(result, "BaiduChannelId eq baiduChannelId' and BaiduUserId eq 'baiduUserId'");
    });

    it("should return a filter string for Browser", () => {
      const channel: BrowserRegistrationChannel = {
        kind: "browser",
        endpoint: "endpoint",
        p256dh: "p256dh",
        auth: "auth",
      };

      const result = getFilterByChannel(channel);

      assert.equal(result, "Endpoint eq 'endpoint' and P256DH eq 'p256dh' and Auth eq 'auth'");
    });

    it("should return a filter string for Firebase Legacy", () => {
      const channel: FirebaseLegacyRegistrationChannel = {
        kind: "gcm",
        gcmRegistrationId: "gcmRegistrationId",
      };

      const result = getFilterByChannel(channel);

      assert.equal(result, "GcmRegistrationId eq 'gcmRegistrationId'");
    });

    it("should return a filter string for Firebase V1", () => {
      const channel: FirebaseV1RegistrationChannel = {
        kind: "fcmv1",
        fcmV1RegistrationId: "fcmV1RegistrationId",
      };

      const result = getFilterByChannel(channel);

      assert.equal(result, "FcmV1RegistrationId eq 'fcmV1RegistrationId'");
    });

    it("should return a filter string for Windows", () => {
      const channel: WindowsRegistrationChannel = {
        kind: "windows",
        channelUri: "channelUri",
      };

      const result = getFilterByChannel(channel);

      assert.equal(result, "ChannelUri eq 'channelUri'");
    });

    it("should throw an error for an unsupported device type", () => {
      const channel = {
        kind: "unsupported",
      };

      assert.throws(() => getFilterByChannel(channel as any), "Device type is unsupported");
    });
  });
});
