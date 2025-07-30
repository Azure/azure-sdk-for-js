// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VisualStudioCodeCredential } from "@azure/identity";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("VisualStudioCodeCredential (internal)", function () {
  let credential: VisualStudioCodeCredential;
  let msalPluginsModule: any;

  beforeEach(async function () {
    credential = new VisualStudioCodeCredential();
    (credential as any).preparePromise = undefined;

    msalPluginsModule = await import("$internal/msal/nodeFlows/msalPlugins.js");
  });

  afterEach(function () {
    vi.restoreAllMocks();
    msalPluginsModule = undefined;
  });

  describe("hasVSCodePlugin", function () {
    it("should return false when plugin is not initialized", async function () {
      const hasVSCodePluginSpy = vi
        .spyOn(msalPluginsModule, "hasVSCodePlugin")
        .mockReturnValue(false);

      const result = msalPluginsModule.hasVSCodePlugin();

      expect(result).toBe(false);
      expect(hasVSCodePluginSpy).toHaveBeenCalledOnce();
    });

    it("should return true when plugin is initialized with auth record path and broker", async function () {
      const hasVSCodePluginSpy = vi
        .spyOn(msalPluginsModule, "hasVSCodePlugin")
        .mockReturnValue(true);

      const result = msalPluginsModule.hasVSCodePlugin();

      expect(result).toBe(true);
      expect(hasVSCodePluginSpy).toHaveBeenCalledOnce();
    });
  });

  describe("vsCodeAuthRecordPath", function () {
    it("should be undefined when plugin is not initialized", function () {
      Object.defineProperty(msalPluginsModule, "vsCodeAuthRecordPath", {
        value: undefined,
        writable: true,
        configurable: true,
      });

      expect(msalPluginsModule.vsCodeAuthRecordPath).toBeUndefined();
    });

    it("should contain path when plugin is initialized", function () {
      const mockPath = "/testPath/authRecord.json";
      Object.defineProperty(msalPluginsModule, "vsCodeAuthRecordPath", {
        value: mockPath,
        writable: true,
        configurable: true,
      });

      expect(msalPluginsModule.vsCodeAuthRecordPath).toBe(mockPath);
    });
  });

  describe("VSCode plugin control", function () {
    it("should set auth record path through plugin control", function () {
      const mockPath = "/testPath/authRecord.json";
      const control = msalPluginsModule.msalNodeFlowVSCodeCredentialControl;

      control.setVSCodeAuthRecordPath(mockPath);

      expect(msalPluginsModule.vsCodeAuthRecordPath).toBe(mockPath);
    });

    it("should set broker through plugin control", function () {
      const mockBroker = { broker: "mockBroker" };
      const control = msalPluginsModule.msalNodeFlowVSCodeCredentialControl;

      control.setVSCodeBroker(mockBroker);

      expect(msalPluginsModule.vsCodeBrokerInfo).toEqual({ broker: mockBroker });
    });
  });
});
