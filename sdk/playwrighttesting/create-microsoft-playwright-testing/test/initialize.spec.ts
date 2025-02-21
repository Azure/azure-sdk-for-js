// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import fs from "node:fs";
import { PlaywrightServiceInitialize } from "../src/initialize.js";

vi.mock("../src/utils.js", (imported) => {
  return {
    ...imported,
    executeCommand: vi.fn(),
  };
});

import * as utils from "../src/utils.js";

describe("PlaywrightServiceInitialize", () => {
  const npmConfigUserAgentInitialValue: string | undefined = process.env["npm_config_user_agent"];

  beforeEach(() => {
    vi.spyOn(console, "error");
    vi.spyOn(console, "log");
    process.env["npm_config_user_agent"] = npmConfigUserAgentInitialValue;
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete process.env["npm_config_user_agent"];
  });

  it("should install service package (npm)", async () => {
    process.env["npm_config_user_agent"] = "user-agent: npm";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const executeCommandStub = vi.spyOn(utils, "executeCommand");
    await playwrightServiceInitialize["installServicePackage"]();
    expect(executeCommandStub).toHaveBeenCalled();
    expect(executeCommandStub).toHaveBeenCalledWith(
      "npm install --save-dev @azure/microsoft-playwright-testing",
    );
  });

  it("should install service package (yarn)", async () => {
    process.env["npm_config_user_agent"] = "user-agent: yarn";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const executeCommandStub = vi.spyOn(utils, "executeCommand");
    await playwrightServiceInitialize["installServicePackage"]();
    expect(executeCommandStub).toHaveBeenCalled();
    expect(executeCommandStub).toHaveBeenCalledWith(
      "yarn add --dev @azure/microsoft-playwright-testing",
    );
  });

  it("should install service package (pnpm - no workspace)", async () => {
    process.env["npm_config_user_agent"] = "user-agent: pnpm";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const executeCommandStub = vi.spyOn(utils, "executeCommand");
    await playwrightServiceInitialize["installServicePackage"]();
    expect(executeCommandStub).toHaveBeenCalled();
    expect(executeCommandStub).toHaveBeenCalledWith(
      "pnpm add --save-dev @azure/microsoft-playwright-testing",
    );
  });

  it("should install service package (pnpm - workspace)", async () => {
    process.env["npm_config_user_agent"] = "user-agent: pnpm";
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const executeCommandStub = vi.spyOn(utils, "executeCommand");
    await playwrightServiceInitialize["installServicePackage"]();
    expect(executeCommandStub).toHaveBeenCalled();
    expect(executeCommandStub).toHaveBeenCalledWith(
      "pnpm add --save-dev @azure/microsoft-playwright-testing",
    );
  });

  it("should throw error if install service package fails", async () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    vi.spyOn(utils, "executeCommand").mockRejectedValueOnce("Failed to install package");
    expect(() => playwrightServiceInitialize["installServicePackage"]()).rejects.toThrowError(
      "Failed to install package",
    );
  });

  it("should install service package, create service config and display additional information on init", async () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const checkIfServiceConfigCanBeAddedStub = vi.fn().mockReturnValue(true);
    const installServicePackageStub = vi.fn();
    const createServiceConfigStub = vi.fn();
    const displayAdditionalInformationStub = vi.fn();

    playwrightServiceInitialize["checkIfServiceConfigCanBeAdded"] =
      checkIfServiceConfigCanBeAddedStub;
    playwrightServiceInitialize["installServicePackage"] = installServicePackageStub;
    playwrightServiceInitialize["createServiceConfig"] = createServiceConfigStub;
    playwrightServiceInitialize["displayAdditionalInformation"] = displayAdditionalInformationStub;
    await playwrightServiceInitialize.addServiceSupportToTestSuite();

    expect(checkIfServiceConfigCanBeAddedStub).toHaveBeenCalled();
    expect(installServicePackageStub).toHaveBeenCalled();
    expect(createServiceConfigStub).toHaveBeenCalled();
    expect(displayAdditionalInformationStub).toHaveBeenCalled();
  });

  it("should not install service package, create service config and display additional information on init if service config cannot be added", async () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const checkIfServiceConfigCanBeAddedStub = vi.fn().mockReturnValue(false);
    const installServicePackageStub = vi.fn();
    const createServiceConfigStub = vi.fn();
    const displayAdditionalInformationStub = vi.fn();

    playwrightServiceInitialize["checkIfServiceConfigCanBeAdded"] =
      checkIfServiceConfigCanBeAddedStub;
    playwrightServiceInitialize["installServicePackage"] = installServicePackageStub;
    playwrightServiceInitialize["createServiceConfig"] = createServiceConfigStub;
    playwrightServiceInitialize["displayAdditionalInformation"] = displayAdditionalInformationStub;
    await playwrightServiceInitialize.addServiceSupportToTestSuite();

    expect(checkIfServiceConfigCanBeAddedStub).toHaveBeenCalled();
    expect(installServicePackageStub).not.toHaveBeenCalled();
    expect(createServiceConfigStub).not.toHaveBeenCalled();
    expect(displayAdditionalInformationStub).not.toHaveBeenCalled();
  });

  it("should provide additional information (npm)", () => {
    process.env["npm_config_user_agent"] = "user-agent: npm";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const npmRunCommandParallelWorkers = `npx playwright test -c ${playwrightServiceInitialize["getServiceConfigFileName"]()} --workers=20`;

    const consoleLogStub = vi.spyOn(console, "log");
    playwrightServiceInitialize["displayAdditionalInformation"]();

    expect(consoleLogStub).toHaveBeenCalledTimes(6);
    expect(consoleLogStub.mock.calls[1][0]).to.equal(`\t${npmRunCommandParallelWorkers}\n`);
  });

  it("should provide additional information (yarn)", () => {
    process.env["npm_config_user_agent"] = "user-agent: yarn";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const npmRunCommandParallelWorkers = `yarn playwright test -c ${playwrightServiceInitialize["getServiceConfigFileName"]()} --workers=20`;

    const consoleLogStub = vi.spyOn(console, "log");
    playwrightServiceInitialize["displayAdditionalInformation"]();

    expect(consoleLogStub).toHaveBeenCalledTimes(6);
    expect(consoleLogStub.mock.calls[1][0]).to.equal(`\t${npmRunCommandParallelWorkers}\n`);
  });

  it("should provide additional information (pnpm)", () => {
    process.env["npm_config_user_agent"] = "user-agent: pnpm";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const npmRunCommandParallelWorkers = `pnpm playwright test -c ${playwrightServiceInitialize["getServiceConfigFileName"]()} --workers=20`;

    const consoleLogStub = vi.spyOn(console, "log");
    playwrightServiceInitialize["displayAdditionalInformation"]();

    expect(consoleLogStub).toHaveBeenCalledTimes(6);
    expect(consoleLogStub.mock.calls[1][0]).to.equal(`\t${npmRunCommandParallelWorkers}\n`);
  });
});
