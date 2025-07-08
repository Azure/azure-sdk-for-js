// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VisualStudioCodeCredential } from "../../../src/index.js";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("VisualStudioCodeCredential (internal)", function () {
  let credential: VisualStudioCodeCredential;
  let helperModule: any;

  beforeEach(async function () {
    credential = new VisualStudioCodeCredential();
    (credential as any).preparePromise = undefined;

    helperModule = await import("../../../src/util/visualStudioCodeHelpers.js");
  });

  afterEach(function () {
    vi.restoreAllMocks();
    helperModule = undefined;
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
