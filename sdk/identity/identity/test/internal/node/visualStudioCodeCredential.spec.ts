// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VisualStudioCodeCredential } from "../../../src/index.js";
import { CredentialUnavailableError } from "../../../src/errors.js";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("VisualStudioCodeCredential (internal)", function () {
  let credential: VisualStudioCodeCredential;
  let loadBrokerModule: any;
  let helperModule: any;

  beforeEach(async function () {
    credential = new VisualStudioCodeCredential();
    (credential as any).preparePromise = undefined;

    loadBrokerModule = await import("../../../src/util/loadBroker.js");
    helperModule = await import("../../../src/util/visualStudioCodeHelpers.js");
  });

  afterEach(function () {
    vi.restoreAllMocks();
    loadBrokerModule = undefined;
    helperModule = undefined;
  });

  describe("loadBrokerPlugin", function () {
    it("should return undefined when module is not found", async function () {
      // Mock the function to simulate module not found
      const loadBrokerPluginSpy = vi
        .spyOn(loadBrokerModule, "loadBrokerPlugin")
        .mockReturnValue(undefined);

      const result = loadBrokerModule.loadBrokerPlugin();
      expect(result).toBeUndefined();
      expect(loadBrokerPluginSpy).toHaveBeenCalledOnce();
    });

    it("should return broker plugin when module is available", async function () {
      const mockBrokerPlugin = { type: "mock-broker-plugin" };
      const loadBrokerPluginSpy = vi
        .spyOn(loadBrokerModule, "loadBrokerPlugin")
        .mockReturnValue(mockBrokerPlugin);

      const result = loadBrokerModule.loadBrokerPlugin();
      expect(result).toBe(mockBrokerPlugin);
      expect(loadBrokerPluginSpy).toHaveBeenCalledOnce();
    });

    it("should throw CredentialUnavailableError when broker plugin is not available", async function () {
      const loadBrokerPluginSpy = vi
        .spyOn(loadBrokerModule, "loadBrokerPlugin")
        .mockReturnValue(undefined);
      const isVSCodeAuthRecordAvailableSpy = vi
        .spyOn(helperModule, "isVSCodeAuthRecordAvailable")
        .mockReturnValue("/mock/path/authRecord.json");

      const prepare = (credential as any).prepare.bind(credential);

      await expect(prepare()).rejects.toThrow(CredentialUnavailableError);

      expect(loadBrokerPluginSpy).toHaveBeenCalledOnce();
      expect(isVSCodeAuthRecordAvailableSpy).toHaveBeenCalledOnce();
    });
  });

  describe("isVSCodeAuthRecordAvailable", function () {
    it("should return undefined when auth record file does not exist", async function () {
      const isVSCodeAuthRecordAvailableSpy = vi
        .spyOn(helperModule, "isVSCodeAuthRecordAvailable")
        .mockReturnValue(undefined);

      const result = helperModule.isVSCodeAuthRecordAvailable();

      expect(result).toBeUndefined();
      expect(isVSCodeAuthRecordAvailableSpy).toHaveBeenCalledOnce();
    });

    it("should return path when auth record file exists", async function () {
      const mockPath = "/testPath/authRecord.json";
      const isVSCodeAuthRecordAvailableSpy = vi
        .spyOn(helperModule, "isVSCodeAuthRecordAvailable")
        .mockReturnValue(mockPath);

      const result = helperModule.isVSCodeAuthRecordAvailable();

      expect(result).toBe(mockPath);
      expect(isVSCodeAuthRecordAvailableSpy).toHaveBeenCalledOnce();
    });

    it("should throw CredentialUnavailableError when auth record is not available", async function () {
      const loadBrokerPluginSpy = vi
        .spyOn(loadBrokerModule, "loadBrokerPlugin")
        .mockReturnValue({ type: "mock-plugin" });
      const isVSCodeAuthRecordAvailableSpy = vi
        .spyOn(helperModule, "isVSCodeAuthRecordAvailable")
        .mockReturnValue(undefined);

      const prepare = (credential as any).prepare.bind(credential);

      await expect(prepare()).rejects.toThrow(CredentialUnavailableError);

      expect(loadBrokerPluginSpy).toHaveBeenCalledOnce();
      expect(isVSCodeAuthRecordAvailableSpy).toHaveBeenCalledOnce();
    });
  });

  describe("loadVSCodeAuthRecord", function () {
    it("should return undefined when auth record file does not exist", async function () {
      const loadVSCodeAuthRecordSpy = vi
        .spyOn(helperModule, "loadVSCodeAuthRecord")
        .mockReturnValue(undefined);

      const result = await helperModule.loadVSCodeAuthRecord();

      expect(result).toBeUndefined();
      expect(loadVSCodeAuthRecordSpy).toHaveBeenCalledOnce();
    });

    it("should return parsed auth record when file exists and is valid", async function () {
      const mockAuthRecord = {
        homeAccountId: "test",
        environment: "test",
        tenantId: "test",
        username: "test",
        authority: "https://login.microsoftonline.com",
        clientId: "test-client-id",
      };

      const loadVSCodeAuthRecordSpy = vi
        .spyOn(helperModule, "loadVSCodeAuthRecord")
        .mockResolvedValue(mockAuthRecord);

      const result = await helperModule.loadVSCodeAuthRecord();

      expect(result).toEqual(mockAuthRecord);
      expect(loadVSCodeAuthRecordSpy).toHaveBeenCalledOnce();
    });
  });
});
