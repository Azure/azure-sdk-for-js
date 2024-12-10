// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  API_VERSION,
  InternalEnvironmentVariables,
  ServiceAuth,
  ServiceEnvironmentVariable,
  ServiceOS,
} from "../../src/common/constants.js";
import { ServiceErrorMessageConstants } from "../../src/common/messages.js";
import * as utils from "../../src/utils/utils.js";
import { getServiceConfig } from "../../src/core/playwrightService.js";
import { PlaywrightServiceConfig } from "../../src/common/playwrightServiceConfig.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

const samplePlaywrightConfigInput = {
  globalSetup: "sample-setup.ts",
  globalTeardown: "sample-teardown.ts",
};

describe("getServiceConfig", async () => {
  beforeEach(() => {
    vi.spyOn(console, "error");
    vi.spyOn(console, "log");
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] =
      "wss://eastus.playwright.microsoft.com/accounts/1234/browsers";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.47.0";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should exit with error message when fetching service config if service endpoint is not set", async () => {
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];

    const consoleErrorSpy = vi.spyOn(console, "error");
    vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error();
    });

    expect(() => getServiceConfig(samplePlaywrightConfigInput)).to.throw();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.NO_SERVICE_URL_ERROR.message,
    );
  });

  it("should return service config with service connect options and global setup and teardown as list when playwright version is 1.49.0", async () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.49.0";
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

    const mockVersion = "1.0.0";
    vi.spyOn(await import("../../package.json"), "version").value(mockVersion);
    const config = testGetServiceConfig();
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

  it("should return service config with service connect options and global setup and teardown as list when playwright version is 1.49.0 and input global files are string", async () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.49.0";
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

    const mockVersion = "1.0.0";
    vi.spyOn(await import("../../package.json"), "version").value(mockVersion);
    const config = testGetServiceConfig(samplePlaywrightConfigInput);
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    const customerConfig = await import("../../src/common/customerConfig.js");
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

  it("should return service config with service connect options and global setup and teardown as list when playwright version is 1.49.0 and input global files are list", async () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.49.0";
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

    const mockVersion = "1.0.0";
    vi.spyOn(await import("../../package.json"), "version").value(mockVersion);
    const sampleConfig = {
      globalSetup: ["sample-setup.ts"],
      globalTeardown: ["sample-teardown.ts"],
    };
    const config = testGetServiceConfig(sampleConfig);
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    const customerConfig = await import("../../src/common/customerConfig.js");
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

  it("should throw error when playwright version is 1.48.0 and input global files are list", async () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.48.0";
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

    const mockVersion = "1.0.0";
    vi.spyOn(await import("../../package.json"), "version").value(mockVersion);
    const sampleConfig = {
      globalSetup: ["sample-setup.ts"],
      globalTeardown: ["sample-teardown.ts"],
    };
    expect(() => testGetServiceConfig(sampleConfig)).to.throw(
      ServiceErrorMessageConstants.MULTIPLE_SETUP_FILE_PLAYWRIGHT_VERSION_ERROR.message,
    );
  });

  it("should set customer config global setup and teardown scripts in the config if passed", async () => {
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    testGetServiceConfig(samplePlaywrightConfigInput);
    const customerConfig = await import("../../src/common/customerConfig.js");

    expect(customerConfig.default.globalSetup).to.equal("sample-setup.ts");
    expect(customerConfig.default.globalTeardown).to.equal("sample-teardown.ts");

    delete require.cache[require.resolve("../../src/common/customerConfig")];
  });

  it("should set customer config global setup and teardown scripts to null in the config if not passed", async () => {
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    testGetServiceConfig({});
    const customerConfig = await import("../../src/common/customerConfig.js");
    expect(customerConfig.default.globalSetup).to.be.undefined;
    expect(customerConfig.default.globalTeardown).to.be.undefined;
  });

  it("should set service config options as passed", async () => {
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

    testGetServiceConfig(samplePlaywrightConfigInput, {
      os: ServiceOS.WINDOWS,
      runId: "1234",
    });
    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(playwrightServiceConfig.serviceOs).to.equal(ServiceOS.WINDOWS);
    expect(playwrightServiceConfig.runId).to.equal("1234");
  });

  it("should set service global setup and teardown for entra authentication", async () => {
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    const config = testGetServiceConfig(samplePlaywrightConfigInput);
    expect(config.globalSetup).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-setup"),
    );
    expect(config.globalTeardown).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-teardown"),
    );
  });

  it("should not set service global setup and teardown for mpt PAT authentication even if pat is not set", async () => {
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    vi.spyOn(utils, "validateMptPAT").mockReturnValue();
    const config = testGetServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });
    expect(config.globalSetup).not.to.equal(
      require.resolve("../../src/core/global/playwright-service-global-setup"),
    );
    expect(config.globalTeardown).not.to.equal(
      require.resolve("../../src/core/global/playwright-service-global-teardown"),
    );
  });

  it("should set service global setup and teardown for entra id authentication even if pat is set", async () => {
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    const config = testGetServiceConfig(samplePlaywrightConfigInput);
    expect(config.globalSetup).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-setup"),
    );
    expect(config.globalTeardown).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-teardown"),
    );
  });

  it("should not set service global setup and teardown for mpt pat authentication if pat is set", async () => {
    vi.spyOn(process, "exit");
    vi.spyOn(utils, "parseJwt").mockReturnValue({ exp: Date.now() / 1000 + 10000 });
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    const config = testGetServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });

    assert.isUndefined(config.globalSetup);
    assert.isUndefined(config.globalTeardown);
  });

  it("should return service config with service connect options", async () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    const mockVersion = "1.0.0";
    vi.spyOn(await import("../../package.json"), "version").value(mockVersion);
    const config = testGetServiceConfig(samplePlaywrightConfigInput);
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

  it("should not set connect options if disable scalable execution is true", async () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    const config = testGetServiceConfig(samplePlaywrightConfigInput, {
      useCloudHostedBrowsers: false,
    });
    expect(config).to.deep.equal({
      globalSetup: require.resolve("../../src/core/global/playwright-service-global-setup"),
      globalTeardown: require.resolve("../../src/core/global/playwright-service-global-teardown"),
    });
  });

  it("should set token credentials if passed on playwright service entra singleton object", async () => {
    const accessToken = "token";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = accessToken;
    const { getServiceConfig: testGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    const playwrightServiceEntra = await import("../../src/core/playwrightServiceEntra.js");
    const credential = {
      getToken: vi.fn().mockResolvedValue(accessToken),
    };
    testGetServiceConfig(samplePlaywrightConfigInput, {
      credential,
    });
    expect(playwrightServiceEntra.default._entraIdAccessToken._credential).to.equal(credential);
  });
});

describe("getConnectOptions", async () => {
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
    const { getConnectOptions } = await import("../../src/core/playwrightService.js");

    await getConnectOptions({
      runId: "1234",
      os: ServiceOS.WINDOWS,
    });

    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(playwrightServiceConfig.runId).to.equal("1234");
    expect(playwrightServiceConfig.serviceOs).to.equal(ServiceOS.WINDOWS);
  });

  it("should set service connect options with fetched token", async () => {
    const { getConnectOptions } = await import("../../src/core/playwrightService.js");
    const mockVersion = "1.0.0";
    vi.spyOn(await import("../../package.json"), "version").value(mockVersion);
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
  });

  it("should throw error if token is not set", async () => {
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
    const { getConnectOptions } = await import("../../src/core/playwrightService.js");
    await expect(getConnectOptions()).rejects.toThrow(
      ServiceErrorMessageConstants.NO_AUTH_ERROR.message,
    );
  });

  it("should fetch entra token using credentials passed by customer", async () => {
    const accessToken = "token";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = accessToken;

    vi.spyOn(utils, "parseJwt").mockReturnValue({ exp: Date.now() / 1000 });
    const credential = {
      getToken: vi
        .fn()
        .mockResolvedValue({ token: accessToken, expiresOnTimestamp: Date.now() + 10000 }),
    };

    const { getConnectOptions } = await import("../../src/core/playwrightService.js");

    await getConnectOptions({
      credential,
    });

    expect(credential.getToken).toHaveBeenCalled();
  });
});
