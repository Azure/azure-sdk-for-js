import { expect } from "@azure-tools/test-utils";
import sinon from "sinon";
import { getPackageManager } from "../../src/utils/packageManager";

describe("Package Manager", () => {
  let sandbox: sinon.SinonSandbox;
  let npmConfigUserAgentInitialValue: string | undefined = process.env["npm_config_user_agent"];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    process.env["npm_config_user_agent"] = npmConfigUserAgentInitialValue;
  });

  afterEach(() => {
    sandbox.restore();
    delete process.env["npm_config_user_agent"];
  });

  it("should return NPM when npm_config_user_agent is not set", () => {
    const packageManager = getPackageManager();
    expect(packageManager.runCommand("playwright", "--version")).to.equal(
      "npx playwright --version",
    );
  });

  it("should return Yarn when npm_config_user_agent contains yarn", () => {
    process.env["npm_config_user_agent"] = "yarn/1.22.5 npm/? node/v14.15.4 darwin x64";
    const packageManager = getPackageManager();
    expect(packageManager.runCommand("playwright", "--version")).to.equal(
      "yarn playwright --version",
    );
  });

  it("should return PNPM when npm_config_user_agent contains pnpm", () => {
    process.env["npm_config_user_agent"] = "pnpm/6.7.0 node/v14.15.4 darwin x64";
    const packageManager = getPackageManager();
    expect(packageManager.runCommand("playwright", "--version")).to.equal(
      "pnpm playwright --version",
    );
  });

  it("should return NPM when npm_config_user_agent contains npm", () => {
    process.env["npm_config_user_agent"] = "npm/6.14.10 node/v14.15.4 darwin x64";
    const packageManager = getPackageManager();
    expect(packageManager.runCommand("playwright", "--version")).to.equal(
      "npx playwright --version",
    );
  });

  it("should return NPM when npm_config_user_agent contains npm (with tag info)", () => {
    process.env["npm_config_user_agent"] = "npm/6.14.10 node/v14.15.4 darwin x64";
    const packageManager = getPackageManager();
    expect(packageManager.getVersionFromStdout("Version 1.47.0-alpha-2024-08-01")).to.equal(
      "1.47.0-alpha-2024-08-01",
    );
  });

  it("should return NPM when npm_config_user_agent contains npm (without tag info)", () => {
    process.env["npm_config_user_agent"] = "npm/6.14.10 node/v14.15.4 darwin x64";
    const packageManager = getPackageManager();
    expect(packageManager.getVersionFromStdout("Version 1.46.2")).to.equal("1.46.2");
  });

  it("should return Yarn when npm_config_user_agent contains yarn (with tag info)", () => {
    process.env["npm_config_user_agent"] = "yarn/1.22.5 npm/? node/v14.15.4 darwin x64";
    const packageManager = getPackageManager();
    expect(
      packageManager.getVersionFromStdout(`yarn run v1.22.22
            $ /workspaces/node_modules/.bin/playwright --version
            Version 1.47.0-alpha-2024-08-01
            Done in 0.44s.
            `),
    ).to.equal("1.47.0-alpha-2024-08-01");
  });

  it("should return Yarn when npm_config_user_agent contains yarn (without tag info)", () => {
    process.env["npm_config_user_agent"] = "yarn/1.22.5 npm/? node/v14.15.4 darwin x64";
    const packageManager = getPackageManager();
    expect(
      packageManager.getVersionFromStdout(`yarn run v1.22.22
            $ /workspaces/node_modules/.bin/playwright --version
            Version 1.46.2
            Done in 0.44s.
            `),
    ).to.equal("1.46.2");
  });

  it("should return PNPM when npm_config_user_agent contains pnpm (with tag info)", () => {
    process.env["npm_config_user_agent"] = "pnpm/6.7.0 node/v14.15.4 darwin x64";
    const packageManager = getPackageManager();
    expect(packageManager.getVersionFromStdout("Version 1.47.0-alpha-2024-08-01")).to.equal(
      "1.47.0-alpha-2024-08-01",
    );
  });

  it("should return PNPM when npm_config_user_agent contains pnpm (without tag info)", () => {
    process.env["npm_config_user_agent"] = "pnpm/6.7.0 node/v14.15.4 darwin x64";
    const packageManager = getPackageManager();
    expect(packageManager.getVersionFromStdout("Version 1.46.2")).to.equal("1.46.2");
  });
});
