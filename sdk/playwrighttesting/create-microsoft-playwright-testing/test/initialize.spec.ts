import sinon from "sinon";
import { expect } from "@azure-tools/test-utils";
import fs from "fs";
import { PlaywrightServiceInitialize } from "../src/initialize";
import * as utils from "../src/utils";

describe("PlaywrightServiceInitialize", () => {
  let sandbox: sinon.SinonSandbox;
  let npmConfigUserAgentInitialValue: string | undefined = process.env["npm_config_user_agent"];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(console, "error");
    sandbox.stub(console, "log");
    process.env["npm_config_user_agent"] = npmConfigUserAgentInitialValue;
  });

  afterEach(() => {
    sandbox.restore();
    delete process.env["npm_config_user_agent"];
  });

  it("should install service package (npm)", async () => {
    process.env["npm_config_user_agent"] = "user-agent: npm";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const executeCommandStub = sandbox.stub(utils, "executeCommand").resolves();
    await playwrightServiceInitialize["installServicePackage"]();
    expect(executeCommandStub.called).to.be.true;
    expect(
      executeCommandStub.calledWith("npm install --save-dev @azure/microsoft-playwright-testing"),
    ).to.be.true;
  });

  it("should install service package (yarn)", async () => {
    process.env["npm_config_user_agent"] = "user-agent: yarn";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const executeCommandStub = sandbox.stub(utils, "executeCommand").resolves();
    await playwrightServiceInitialize["installServicePackage"]();
    expect(executeCommandStub.called).to.be.true;
    expect(executeCommandStub.calledWith("yarn add --dev @azure/microsoft-playwright-testing")).to
      .be.true;
  });

  it("should install service package (pnpm - no workspace)", async () => {
    process.env["npm_config_user_agent"] = "user-agent: pnpm";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const executeCommandStub = sandbox.stub(utils, "executeCommand").resolves();
    await playwrightServiceInitialize["installServicePackage"]();
    expect(executeCommandStub.called).to.be.true;
    expect(executeCommandStub.calledWith("pnpm add --save-dev @azure/microsoft-playwright-testing"))
      .to.be.true;
  });

  it("should install service package (pnpm - workspace)", async () => {
    process.env["npm_config_user_agent"] = "user-agent: pnpm";
    sandbox.stub(fs, "existsSync").returns(true);
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const executeCommandStub = sandbox.stub(utils, "executeCommand").resolves();
    await playwrightServiceInitialize["installServicePackage"]();
    expect(executeCommandStub.called).to.be.true;
    expect(
      executeCommandStub.calledWith("pnpm add --save-dev -w @azure/microsoft-playwright-testing"),
    ).to.be.true;
  });

  it("should throw error if install service package fails", async () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    sandbox.stub(utils, "executeCommand").rejects(new Error("Command failed"));
    await expect(playwrightServiceInitialize["installServicePackage"]()).to.be.rejectedWith(Error);
  });

  it("should install service package, create service config and display additional information on init", async () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const checkIfServiceConfigCanBeAddedStub = sandbox.stub().returns(true);
    const installServicePackageStub = sandbox.stub().resolves();
    const createServiceConfigStub = sandbox.stub().resolves();
    const displayAdditionalInformationStub = sandbox.stub().resolves();

    playwrightServiceInitialize["checkIfServiceConfigCanBeAdded"] =
      checkIfServiceConfigCanBeAddedStub;
    playwrightServiceInitialize["installServicePackage"] = installServicePackageStub;
    playwrightServiceInitialize["createServiceConfig"] = createServiceConfigStub;
    playwrightServiceInitialize["displayAdditionalInformation"] = displayAdditionalInformationStub;
    await playwrightServiceInitialize.addServiceSupportToTestSuite();

    expect(checkIfServiceConfigCanBeAddedStub.called).to.be.true;
    expect(installServicePackageStub.called).to.be.true;
    expect(createServiceConfigStub.called).to.be.true;
    expect(displayAdditionalInformationStub.called).to.be.true;
  });

  it("should not install service package, create service config and display additional information on init if service config cannot be added", async () => {
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const checkIfServiceConfigCanBeAddedStub = sandbox.stub().returns(false);
    const installServicePackageStub = sandbox.stub().resolves();
    const createServiceConfigStub = sandbox.stub().resolves();
    const displayAdditionalInformationStub = sandbox.stub().resolves();

    playwrightServiceInitialize["checkIfServiceConfigCanBeAdded"] =
      checkIfServiceConfigCanBeAddedStub;
    playwrightServiceInitialize["installServicePackage"] = installServicePackageStub;
    playwrightServiceInitialize["createServiceConfig"] = createServiceConfigStub;
    playwrightServiceInitialize["displayAdditionalInformation"] = displayAdditionalInformationStub;
    await playwrightServiceInitialize.addServiceSupportToTestSuite();

    expect(checkIfServiceConfigCanBeAddedStub.called).to.be.true;
    expect(installServicePackageStub.called).to.be.false;
    expect(createServiceConfigStub.called).to.be.false;
    expect(displayAdditionalInformationStub.called).to.be.false;
  });

  it("should provide additional information (npm)", () => {
    sandbox.restore();
    process.env["npm_config_user_agent"] = "user-agent: npm";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const npmRunCommandParallelWorkers = `npx playwright test -c ${playwrightServiceInitialize["getServiceConfigFileName"]()} --workers=20`;

    const consoleLogStub = sandbox.stub(console, "log");
    playwrightServiceInitialize["displayAdditionalInformation"]();

    expect(consoleLogStub.callCount).to.equal(4);
    expect(consoleLogStub.getCall(1).args[0]).to.equal(`\t${npmRunCommandParallelWorkers}\n`);
  });

  it("should provide additional information (yarn)", () => {
    sandbox.restore();
    process.env["npm_config_user_agent"] = "user-agent: yarn";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const npmRunCommandParallelWorkers = `yarn playwright test -c ${playwrightServiceInitialize["getServiceConfigFileName"]()} --workers=20`;

    const consoleLogStub = sandbox.stub(console, "log");
    playwrightServiceInitialize["displayAdditionalInformation"]();

    expect(consoleLogStub.callCount).to.equal(4);
    expect(consoleLogStub.getCall(1).args[0]).to.equal(`\t${npmRunCommandParallelWorkers}\n`);
  });

  it("should provide additional information (pnpm)", () => {
    sandbox.restore();
    process.env["npm_config_user_agent"] = "user-agent: pnpm";
    const playwrightServiceInitialize = new PlaywrightServiceInitialize({
      playwrightConfigFile: "playwright.config.ts",
      projectLanguage: "TypeScript",
    });
    const npmRunCommandParallelWorkers = `pnpm playwright test -c ${playwrightServiceInitialize["getServiceConfigFileName"]()} --workers=20`;

    const consoleLogStub = sandbox.stub(console, "log");
    playwrightServiceInitialize["displayAdditionalInformation"]();

    expect(consoleLogStub.callCount).to.equal(4);
    expect(consoleLogStub.getCall(1).args[0]).to.equal(`\t${npmRunCommandParallelWorkers}\n`);
  });
});
