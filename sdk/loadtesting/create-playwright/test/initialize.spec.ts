// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import fs from "node:fs";
import { PlaywrightServiceInitialize } from "../src/initialize.js";
import * as utils from "../src/utils.js";
import { Languages } from "../src/constants.js";

vi.mock("../src/utils.js", async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    executeCommand: vi.fn(),
  };
});

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
      "npm install --save-dev @azure/playwright @azure/identity",
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
      "yarn add --dev @azure/playwright @azure/identity",
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
      "pnpm add --save-dev @azure/playwright @azure/identity",
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
      "pnpm add --save-dev @azure/playwright @azure/identity",
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
    const npmRunCommandParallelWorkers = `npx playwright test -c ${playwrightServiceInitialize["createAzurePlaywrightConfigFileName"]()} --workers=20`;

    const consoleLogStub = vi.spyOn(console, "log");
    playwrightServiceInitialize["displayAdditionalInformation"]();

    expect(consoleLogStub).toHaveBeenCalledTimes(4);
    expect(consoleLogStub.mock.calls[1][0]).to.equal(`\t${npmRunCommandParallelWorkers}\n`);
  });

  it("should provide additional information (yarn)", () => {
    process.env["npm_config_user_agent"] = "user-agent: yarn";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const npmRunCommandParallelWorkers = `yarn playwright test -c ${playwrightServiceInitialize["createAzurePlaywrightConfigFileName"]()} --workers=20`;

    const consoleLogStub = vi.spyOn(console, "log");
    playwrightServiceInitialize["displayAdditionalInformation"]();

    expect(consoleLogStub).toHaveBeenCalledTimes(4);
    expect(consoleLogStub.mock.calls[1][0]).to.equal(`\t${npmRunCommandParallelWorkers}\n`);
  });

  it("should provide additional information (pnpm)", () => {
    process.env["npm_config_user_agent"] = "user-agent: pnpm";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const npmRunCommandParallelWorkers = `pnpm playwright test -c ${playwrightServiceInitialize["createAzurePlaywrightConfigFileName"]()} --workers=20`;

    const consoleLogStub = vi.spyOn(console, "log");
    playwrightServiceInitialize["displayAdditionalInformation"]();

    expect(consoleLogStub).toHaveBeenCalledTimes(4);
    expect(consoleLogStub.mock.calls[1][0]).to.equal(`\t${npmRunCommandParallelWorkers}\n`);
  });
});

describe("Generated Service Config Content Validation", () => {
  beforeEach(() => {
    delete process.env["npm_config_user_agent"];
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should generate TypeScript config with correct API calls and property names", () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: Languages.TypeScript,
    });

    const generatedContent = playwrightServiceInitialize["createAzurePlaywrightConfigContent"]();
    expect(generatedContent).toContain("createAzurePlaywrightConfig");
    expect(generatedContent).toContain(
      "import { createAzurePlaywrightConfig, ServiceOS } from '@azure/playwright'",
    );
    expect(generatedContent).toContain("createAzurePlaywrightConfig(config, {");
    expect(generatedContent).toContain("connectTimeout:");
    expect(generatedContent).toContain("connectTimeout: 3 * 60 * 1000");
  });

  it("should generate JavaScript config with correct API calls and property names", () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.js",
      projectLanguage: Languages.JavaScript,
    });

    const generatedContent = playwrightServiceInitialize["createAzurePlaywrightConfigContent"]();
    expect(generatedContent).toContain("createAzurePlaywrightConfig");
    expect(generatedContent).toContain(
      "const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright')",
    );
    expect(generatedContent).toContain("createAzurePlaywrightConfig(config, {");
    expect(generatedContent).toContain("connectTimeout:");
    expect(generatedContent).toContain("connectTimeout: 3 * 60 * 1000");
  });

  it("should ensure generated config matches the current API from @azure/playwright package", () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: Languages.TypeScript,
    });

    const generatedContent = playwrightServiceInitialize["createAzurePlaywrightConfigContent"]();

    expect(generatedContent).toContain("createAzurePlaywrightConfig(config, {");

    expect(generatedContent).toContain(
      "import { createAzurePlaywrightConfig, ServiceOS } from '@azure/playwright'",
    );

    const expectedProperties = ["exposeNetwork:", "connectTimeout:", "os:", "credential:"];

    expectedProperties.forEach((prop) => {
      expect(generatedContent, `Missing property: ${prop}`).toContain(prop);
    });
  });

  it("should generate config that can be validated against expected API signature", () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: Languages.TypeScript,
    });

    const generatedContent = playwrightServiceInitialize["createAzurePlaywrightConfigContent"]();

    expect(generatedContent).toContain("export default defineConfig(");
    expect(generatedContent).toContain("config,");
    expect(generatedContent).toContain("createAzurePlaywrightConfig(config, {");

    const requiredConfigProperties = [
      "exposeNetwork: '<loopback>'",
      "connectTimeout: 3 * 60 * 1000, // 3 minutes",
      "os: ServiceOS.LINUX",
      "credential: new DefaultAzureCredential()",
    ];

    requiredConfigProperties.forEach((prop) => {
      expect(generatedContent, `Generated config missing: ${prop}`).toContain(prop);
    });
  });

  it("should create config file with correct function calls when createServiceConfig is called", async () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: Languages.TypeScript,
    });

    const writeFileSpy = vi.spyOn(fs.promises, "writeFile").mockResolvedValue();
    const consoleLogSpy = vi.spyOn(console, "log");

    await playwrightServiceInitialize["createServiceConfig"]();

    expect(writeFileSpy).toHaveBeenCalledTimes(1);

    const [filePath, fileContent] = writeFileSpy.mock.calls[0];
    expect(filePath).toBe("playwright.service.config.ts");

    expect(fileContent).toContain("createAzurePlaywrightConfig");
    expect(fileContent).toContain("connectTimeout:");

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Success! Created service configuration file - playwright.service.config.ts",
    );
  });

  it("should generate content that follows the same pattern as current working samples", () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "./playwright.config.ts",
      projectLanguage: Languages.TypeScript,
    });

    const generatedContent = playwrightServiceInitialize["createAzurePlaywrightConfigContent"]();

    expect(generatedContent).toContain("createAzurePlaywrightConfig(config, {");
    expect(generatedContent).toContain("exposeNetwork: '<loopback>'");
    expect(generatedContent).toContain("connectTimeout: 3 * 60 * 1000");
    expect(generatedContent).toContain("os: ServiceOS.LINUX");
    expect(generatedContent).toContain("credential: new DefaultAzureCredential()");
  });
});
