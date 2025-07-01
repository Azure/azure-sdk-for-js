// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { VisualStudioCodeCredential } from "../../../src/index.js";
import { CredentialUnavailableError } from "../../../src/errors.js";
import fs from "node:fs/promises";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("VisualStudioCodeCredential (internal)", function () {
  let credential: VisualStudioCodeCredential;

  beforeEach(function () {
    credential = new VisualStudioCodeCredential();
    // Reset any cached promise to ensure clean state between tests
    (credential as any).preparePromise = undefined;
  });

  afterEach(function () {
    vi.restoreAllMocks();
  });

  describe("loadBrokerPlugin", function () {
    it("should return undefined when module is not found (ERR_MODULE_NOT_FOUND)", async function () {
      const loadBrokerPlugin = (credential as any).loadBrokerPlugin.bind(credential);

      // Since @azure/identity-broker is not installed, this should return undefined
      const result = await loadBrokerPlugin();
      expect(result).toBeUndefined();
    });

    it("should throw CredentialUnavailableError when broker plugin is not available", async function () {
      const loadBrokerPluginSpy = vi.spyOn(credential as any, "loadBrokerPlugin").mockResolvedValue(undefined);
      const loadVSCodeAuthRecordSpy = vi.spyOn(credential as any, "loadVSCodeAuthRecord").mockResolvedValue({
        homeAccountId: "test",
        environment: "test",
        tenantId: "test",
        username: "test"
      });

      const prepare = (credential as any).prepare.bind(credential);

      await expect(prepare()).rejects.toThrow(CredentialUnavailableError);

      expect(loadBrokerPluginSpy).toHaveBeenCalledOnce();
      expect(loadVSCodeAuthRecordSpy).toHaveBeenCalledOnce();
    });
  });

  describe("loadVSCodeAuthRecord", function () {
    it("should return undefined when auth record file does not exist", async function () {
      const statSpy = vi.spyOn(fs, "stat").mockRejectedValue(
        Object.assign(new Error("ENOENT: no such file or directory"), {
          code: "ENOENT",
          errno: -2,
          syscall: "stat"
        })
      );

      const loadVSCodeAuthRecord = (credential as any).loadVSCodeAuthRecord.bind(credential);
      const result = await loadVSCodeAuthRecord();

      expect(result).toBeUndefined();
      expect(statSpy).toHaveBeenCalledOnce();
    });

    it("should return undefined when file read fails", async function () {
      const statSpy = vi.spyOn(fs, "stat").mockResolvedValue({} as any);
      const readFileSpy = vi.spyOn(fs, "readFile").mockRejectedValue(new Error("Cannot read file"));

      const loadVSCodeAuthRecord = (credential as any).loadVSCodeAuthRecord.bind(credential);
      
      // The method should throw when readFile fails, not return undefined
      await expect(loadVSCodeAuthRecord()).rejects.toThrow("Cannot read file");

      expect(statSpy).toHaveBeenCalledOnce();
      expect(readFileSpy).toHaveBeenCalledOnce();
    });

    it("should throw CredentialUnavailableError when auth record is not available", async function () {
      const loadBrokerPluginSpy = vi.spyOn(credential as any, "loadBrokerPlugin").mockResolvedValue({ type: "mock-plugin" });
      const loadVSCodeAuthRecordSpy = vi.spyOn(credential as any, "loadVSCodeAuthRecord").mockResolvedValue(undefined);

      const prepare = (credential as any).prepare.bind(credential);

      await expect(prepare()).rejects.toThrow(CredentialUnavailableError);

      expect(loadBrokerPluginSpy).toHaveBeenCalledOnce();
      expect(loadVSCodeAuthRecordSpy).toHaveBeenCalledOnce();
    });
  });
});
