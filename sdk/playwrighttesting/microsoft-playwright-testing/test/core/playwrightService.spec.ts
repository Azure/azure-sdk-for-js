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
    expect(consoleErrorSpy.calledWith(ServiceErrorMessageConstants.NO_SERVICE_URL_ERROR)).to.be
      .true;
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

  it("should set service global setup and teardown for mpt PAT authentication if pat is not set", () => {
    const { getServiceConfig } = require("../../src/core/playwrightService");
    const config = getServiceConfig(samplePlaywrightConfigInput, {
      defaultAuth: ServiceAuth.TOKEN,
    });
    expect(config.globalSetup).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-setup"),
    );
    expect(config.globalTeardown).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-teardown"),
    );
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
    sandbox.stub(utils, "parseJwt").returns({ exp: Date.now() / 1000 + 10000 });
    const { getServiceConfig } = require("../../src/core/playwrightService");
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    const config = getServiceConfig(samplePlaywrightConfigInput, {
      defaultAuth: ServiceAuth.TOKEN,
    });
    expect(config.globalSetup).to.be.undefined;
    expect(config.globalTeardown).to.be.undefined;
  });

  it("should return service config with service connect options", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    const { getServiceConfig } = require("../../src/core/playwrightService");
    const config = getServiceConfig(samplePlaywrightConfigInput);
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    expect(config).to.deep.equal({
      use: {
        connectOptions: {
          wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${API_VERSION}`,
          headers: {
            Authorization: "Bearer token",
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
    const { getConnectOptions } = require("../../src/core/playwrightService");
    const connectOptions = await getConnectOptions({});
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    expect(connectOptions).to.deep.equal({
      wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${API_VERSION}`,
      options: {
        headers: {
          Authorization: "Bearer token",
        },
        timeout: new PlaywrightServiceConfig().timeout,
        exposeNetwork: new PlaywrightServiceConfig().exposeNetwork,
        slowMo: new PlaywrightServiceConfig().slowMo,
      },
    });
  });

  it("should throw error if token is not set", async () => {
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
    const { getConnectOptions } = require("../../src/core/playwrightService");
    await expect(getConnectOptions()).to.be.rejectedWith(
      ServiceErrorMessageConstants.NO_AUTH_ERROR,
    );
  });

  it("should fetch entra token using credentials passed by customer", async () => {
    const sandbox = sinon.createSandbox();
    const accessToken = "token";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = accessToken;
    sandbox.stub(utils, "parseJwt").returns({ exp: Date.now() / 1000 });
    const credential = {
      getToken: sandbox.stub().resolves(accessToken),
    };
    const { getConnectOptions } = require("../../src/core/playwrightService");
    await getConnectOptions({
      credential,
    });
    expect(credential.getToken.called).to.be.true;
    sandbox.restore();
  });
});
