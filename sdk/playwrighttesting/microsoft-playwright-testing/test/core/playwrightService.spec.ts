// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  API_VERSION,
  InternalEnvironmentVariables,
  ServiceAuth,
  ServiceEnvironmentVariable,
  ServiceOS,
} from "../../src/common/constants";
import { ServiceErrorMessageConstants } from "../../src/common/messages";
import * as utils from "../../src/utils/utils";
import { getServiceConfig } from "../../src/core/playwrightService";
import { PlaywrightServiceConfig } from "../../src/common/playwrightServiceConfig";
import { expect } from "@azure-tools/test-utils";
import sinon from "sinon";

const samplePlaywrightConfigInput = {
  globalSetup: "sample-setup.ts",
  globalTeardown: "sample-teardown.ts",
};

describe("getServiceConfig", () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(console, "error");
    sandbox.stub(console, "log");
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] =
      "wss://eastus.playwright.microsoft.com/accounts/1234/browsers";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.47.0";
  });

  afterEach(() => {
    sandbox.restore();
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should exit with error message when fetching service config if service endpoint is not set", () => {
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
    sandbox.restore();
    const consoleErrorSpy = sandbox.stub(console, "error");
    sandbox.stub(process, "exit").throws(new Error());
    expect(() => getServiceConfig(samplePlaywrightConfigInput)).to.throw();
    expect(consoleErrorSpy.calledWith(ServiceErrorMessageConstants.NO_SERVICE_URL_ERROR.message)).to
      .be.true;
  });

  it("should return service config with service connect options and global setup and teardown as list when playwright version is 1.49.0", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.49.0";
    const { getServiceConfig } = require("../../src/core/playwrightService");

    const mockVersion = "1.0.0";
    sandbox.stub(require("../../package.json"), "version").value(mockVersion);
    const config = getServiceConfig();
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    expect(config).to.deep.equal({
      use: {
        connectOptions: {
          wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${API_VERSION}`,
          headers: {
            Authorization: "Bearer token",
            "x-ms-package-version": `@azure/microsoft-playwright-testing/${encodeURIComponent(mockVersion)}`,
          },
          timeout: playwrightServiceConfig.timeout,
          exposeNetwork: playwrightServiceConfig.exposeNetwork,
          slowMo: playwrightServiceConfig.slowMo,
        },
      },
      globalSetup: [require.resolve("../../src/core/global/playwright-service-global-setup")],
      globalTeardown: [require.resolve("../../src/core/global/playwright-service-global-teardown")],
    });
  });

  it("should return service config with service connect options and global setup and teardown as list when playwright version is 1.49.0 and input global files are string", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.49.0";
    const { getServiceConfig } = require("../../src/core/playwrightService");

    const mockVersion = "1.0.0";
    sandbox.stub(require("../../package.json"), "version").value(mockVersion);
    const config = getServiceConfig(samplePlaywrightConfigInput);
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    const customerConfig = require("../../src/common/customerConfig");
    expect(customerConfig.default.globalSetup).to.deep.equal(["sample-setup.ts"]);
    expect(customerConfig.default.globalTeardown).to.deep.equal(["sample-teardown.ts"]);
    expect(config).to.deep.equal({
      use: {
        connectOptions: {
          wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${API_VERSION}`,
          headers: {
            Authorization: "Bearer token",
            "x-ms-package-version": `@azure/microsoft-playwright-testing/${encodeURIComponent(mockVersion)}`,
          },
          timeout: playwrightServiceConfig.timeout,
          exposeNetwork: playwrightServiceConfig.exposeNetwork,
          slowMo: playwrightServiceConfig.slowMo,
        },
      },
      globalSetup: [
        "sample-setup.ts",
        require.resolve("../../src/core/global/playwright-service-global-setup"),
      ],
      globalTeardown: [
        "sample-teardown.ts",
        require.resolve("../../src/core/global/playwright-service-global-teardown"),
      ],
    });
  });

  it("should return service config with service connect options and global setup and teardown as list when playwright version is 1.49.0 and input global files are list", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.49.0";
    const { getServiceConfig } = require("../../src/core/playwrightService");

    const mockVersion = "1.0.0";
    sandbox.stub(require("../../package.json"), "version").value(mockVersion);
    const sampleConfig = {
      globalSetup: ["sample-setup.ts"],
      globalTeardown: ["sample-teardown.ts"],
    };
    const config = getServiceConfig(sampleConfig);
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    const customerConfig = require("../../src/common/customerConfig");
    expect(customerConfig.default.globalSetup).to.deep.equal(["sample-setup.ts"]);
    expect(customerConfig.default.globalTeardown).to.deep.equal(["sample-teardown.ts"]);
    expect(config).to.deep.equal({
      use: {
        connectOptions: {
          wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${API_VERSION}`,
          headers: {
            Authorization: "Bearer token",
            "x-ms-package-version": `@azure/microsoft-playwright-testing/${encodeURIComponent(mockVersion)}`,
          },
          timeout: playwrightServiceConfig.timeout,
          exposeNetwork: playwrightServiceConfig.exposeNetwork,
          slowMo: playwrightServiceConfig.slowMo,
        },
      },
      globalSetup: [
        "sample-setup.ts",
        require.resolve("../../src/core/global/playwright-service-global-setup"),
      ],
      globalTeardown: [
        "sample-teardown.ts",
        require.resolve("../../src/core/global/playwright-service-global-teardown"),
      ],
    });
  });

  it("should throw error when playwright version is 1.48.0 and input global files are list", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.48.0";
    const { getServiceConfig } = require("../../src/core/playwrightService");

    const mockVersion = "1.0.0";
    sandbox.stub(require("../../package.json"), "version").value(mockVersion);
    const sampleConfig = {
      globalSetup: ["sample-setup.ts"],
      globalTeardown: ["sample-teardown.ts"],
    };
    expect(() => getServiceConfig(sampleConfig)).to.throw(
      ServiceErrorMessageConstants.MULTIPLE_SETUP_FILE_PLAYWRIGHT_VERSION_ERROR.message,
    );
  });

  it("should set customer config global setup and teardown scripts in the config if passed", () => {
    const { getServiceConfig } = require("../../src/core/playwrightService");
    getServiceConfig(samplePlaywrightConfigInput);
    const customerConfig = require("../../src/common/customerConfig");
    expect(customerConfig.default.globalSetup).to.equal("sample-setup.ts");
    expect(customerConfig.default.globalTeardown).to.equal("sample-teardown.ts");
    delete require.cache[require.resolve("../../src/common/customerConfig")];
  });

  it("should set customer config global setup and teardown scripts to null in the config if not passed", () => {
    const { getServiceConfig } = require("../../src/core/playwrightService");
    getServiceConfig({});
    const customerConfig = require("../../src/common/customerConfig");
    expect(customerConfig.default.globalSetup).to.be.undefined;
    expect(customerConfig.default.globalTeardown).to.be.undefined;
  });

  it("should set service config options as passed", () => {
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    const { getServiceConfig } = require("../../src/core/playwrightService");
    getServiceConfig(samplePlaywrightConfigInput, {
      os: ServiceOS.WINDOWS,
      runId: "1234",
    });
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    expect(playwrightServiceConfig.serviceOs).to.equal(ServiceOS.WINDOWS);
    expect(playwrightServiceConfig.runId).to.equal("1234");
  });

  it("should set service global setup and teardown for entra authentication", () => {
    const { getServiceConfig } = require("../../src/core/playwrightService");
    const config = getServiceConfig(samplePlaywrightConfigInput);
    expect(config.globalSetup).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-setup"),
    );
    expect(config.globalTeardown).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-teardown"),
    );
  });

  it("should not set service global setup and teardown for mpt PAT authentication even if pat is not set", () => {
    const { getServiceConfig } = require("../../src/core/playwrightService");
    sandbox.stub(utils, "validateMptPAT").returns();
    sandbox.stub(utils, "warnIfAccessTokenCloseToExpiry").returns();
    const config = getServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });
    expect(config.globalSetup).not.to.equal(
      require.resolve("../../src/core/global/playwright-service-global-setup"),
    );
    expect(config.globalTeardown).not.to.equal(
      require.resolve("../../src/core/global/playwright-service-global-teardown"),
    );
  });

  it("should not call warnIfAccessTokenCloseToExpiry if ONE_TIME_OPERATION_FLAG is true", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    process.env[InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG] = "true";

    const warnIfAccessTokenCloseToExpiryStub = sandbox.stub(
      utils,
      "warnIfAccessTokenCloseToExpiry",
    );

    sandbox.stub(utils, "validateMptPAT").returns();

    const { getServiceConfig } = require("../../src/core/playwrightService");
    getServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });

    sinon.assert.notCalled(warnIfAccessTokenCloseToExpiryStub);

    delete process.env[InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG];
  });

  it("should call warnIfAccessTokenCloseToExpiry if ONE_TIME_OPERATION_FLAG is not set", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";

    const warnIfAccessTokenCloseToExpiryStub = sandbox.stub(
      utils,
      "warnIfAccessTokenCloseToExpiry",
    );

    sandbox.stub(utils, "validateMptPAT").returns();

    const { getServiceConfig } = require("../../src/core/playwrightService");
    getServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });

    sinon.assert.called(warnIfAccessTokenCloseToExpiryStub);
    expect(process.env[InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG]).to.equal("true");
    delete process.env[InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG];
  });

  it("should set service global setup and teardown for entra id authentication even if pat is set", () => {
    const { getServiceConfig } = require("../../src/core/playwrightService");
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    const config = getServiceConfig(samplePlaywrightConfigInput);
    expect(config.globalSetup).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-setup"),
    );
    expect(config.globalTeardown).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-teardown"),
    );
  });

  it("should not set service global setup and teardown for mpt pat authentication if pat is set", () => {
    const processExitStub = sandbox.stub(process, "exit");
    sandbox.stub(utils, "parseJwt").returns({ exp: Date.now() / 1000 + 10000 });
    const { getServiceConfig } = require("../../src/core/playwrightService");
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    const config = getServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });
    expect(config.globalSetup).to.be.undefined;
    expect(config.globalTeardown).to.be.undefined;
    processExitStub.restore();
  });

  it("should return service config with service connect options", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    const { getServiceConfig } = require("../../src/core/playwrightService");
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    const mockVersion = "1.0.0";
    sandbox.stub(require("../../package.json"), "version").value(mockVersion);
    const config = getServiceConfig(samplePlaywrightConfigInput);
    expect(config).to.deep.equal({
      use: {
        connectOptions: {
          wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${API_VERSION}`,
          headers: {
            Authorization: "Bearer token",
            "x-ms-package-version": `@azure/microsoft-playwright-testing/${encodeURIComponent(mockVersion)}`,
          },
          timeout: playwrightServiceConfig.timeout,
          exposeNetwork: playwrightServiceConfig.exposeNetwork,
          slowMo: playwrightServiceConfig.slowMo,
        },
      },
      globalSetup: require.resolve("../../src/core/global/playwright-service-global-setup"),
      globalTeardown: require.resolve("../../src/core/global/playwright-service-global-teardown"),
    });
  });

  it("should not set connect options if disable scalable execution is true", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    const { getServiceConfig } = require("../../src/core/playwrightService");
    const config = getServiceConfig(samplePlaywrightConfigInput, { useCloudHostedBrowsers: false });
    expect(config).to.deep.equal({
      globalSetup: require.resolve("../../src/core/global/playwright-service-global-setup"),
      globalTeardown: require.resolve("../../src/core/global/playwright-service-global-teardown"),
    });
  });

  it("should set token credentials if passed on playwright service entra singleton object", () => {
    const accessToken = "token";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = accessToken;
    const { getServiceConfig } = require("../../src/core/playwrightService");
    const playwrightServiceEntra = require("../../src/core/playwrightServiceEntra");
    const credential = {
      getToken: sinon.stub().resolves(accessToken),
    };
    getServiceConfig(samplePlaywrightConfigInput, {
      credential,
    });
    expect(playwrightServiceEntra.default._entraIdAccessToken._credential).to.equal(credential);
  });
});

describe("getConnectOptions", () => {
  beforeEach(() => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] =
      "wss://eastus.playwright.microsoft.com/accounts/1234/browsers";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
  });

  afterEach(() => {
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should set service connect options with passed values", async () => {
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    const { getConnectOptions } = require("../../src/core/playwrightService");
    await getConnectOptions({
      runId: "1234",
      os: ServiceOS.WINDOWS,
    });
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    expect(playwrightServiceConfig.runId).to.equal("1234");
    expect(playwrightServiceConfig.serviceOs).to.equal(ServiceOS.WINDOWS);
  });

  it("should set service connect options with fetched token", async () => {
    const sandbox = sinon.createSandbox();
    const { getConnectOptions } = require("../../src/core/playwrightService");
    const mockVersion = "1.0.0";
    sandbox.stub(require("../../package.json"), "version").value(mockVersion);
    const connectOptions = await getConnectOptions({});
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    expect(connectOptions).to.deep.equal({
      wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${API_VERSION}`,
      options: {
        headers: {
          Authorization: "Bearer token",
          "x-ms-package-version": `@azure/microsoft-playwright-testing/${encodeURIComponent(mockVersion)}`,
        },
        timeout: new PlaywrightServiceConfig().timeout,
        exposeNetwork: new PlaywrightServiceConfig().exposeNetwork,
        slowMo: new PlaywrightServiceConfig().slowMo,
      },
    });
    sandbox.restore();
  });

  it("should throw error if token is not set", async () => {
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
    const { getConnectOptions } = require("../../src/core/playwrightService");
    await expect(getConnectOptions()).to.be.rejectedWith(
      ServiceErrorMessageConstants.NO_AUTH_ERROR.message,
    );
  });

  it("should fetch entra token using credentials passed by customer", async () => {
    const sandbox = sinon.createSandbox();
    const accessToken = "token";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = accessToken;
    sandbox.stub(utils, "parseJwt").returns({ exp: Date.now() / 1000 });
    const credential = {
      getToken: sandbox
        .stub()
        .resolves({ token: accessToken, expiresOnTimestamp: Date.now() + 10000 }),
    };
    const { getConnectOptions } = require("../../src/core/playwrightService");
    await getConnectOptions({
      credential,
    });
    expect(credential.getToken.called).to.be.true;
    sandbox.restore();
  });
});
