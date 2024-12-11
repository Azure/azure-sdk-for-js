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
import customerConfig from "../../src/common/customerConfig.js";
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
    vi.stubEnv(
      ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL,
      "wss://eastus.playwright.microsoft.com/accounts/1234/browsers",
    );
    vi.stubEnv(InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION, "1.47.0");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("should exit with error message when fetching service config if service endpoint is not set", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL, undefined);
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

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
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    vi.stubEnv(InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION, "1.49.0");
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    const mockVersion = "1.0.0-beta.7";
    vi.mock("../../package.json", async (actualImport) => {
      const original = await actualImport();
      return {
        ...(original as any),
        version: mockVersion,
      };
    });
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
      globalSetup: [require.resolve("../../src/core/global/playwright-service-global-setup.ts")],
      globalTeardown: [
        require.resolve("../../src/core/global/playwright-service-global-teardown.ts"),
      ],
    });
  });

  it("should return service config with service connect options and global setup and teardown as list when playwright version is 1.49.0 and input global files are string", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    vi.stubEnv(InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION, "1.49.0");
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    const mockVersion = "1.0.0-beta.7";
    vi.mock("../../package.json", async (actualImport) => {
      const original = await actualImport();
      return {
        ...(original as any),
        version: mockVersion,
      };
    });
    const config = getServiceConfig(samplePlaywrightConfigInput);
    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(customerConfig.globalSetup).to.deep.equal(["sample-setup.ts"]);
    expect(customerConfig.globalTeardown).to.deep.equal(["sample-teardown.ts"]);
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
        require.resolve("../../src/core/global/playwright-service-global-setup.ts"),
      ],
      globalTeardown: [
        "sample-teardown.ts",
        require.resolve("../../src/core/global/playwright-service-global-teardown.ts"),
      ],
    });
  });

  it("should return service config with service connect options and global setup and teardown as list when playwright version is 1.49.0 and input global files are list", async () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "token";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.49.0";
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    const mockVersion = "1.0.0-beta.7";
    vi.mock("../../package.json", async (actualImport) => {
      const original = await actualImport();
      return {
        ...(original as any),
        version: mockVersion,
      };
    });
    const sampleConfig = {
      globalSetup: ["sample-setup.ts"],
      globalTeardown: ["sample-teardown.ts"],
    };
    const config = getServiceConfig(sampleConfig);
    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(customerConfig.globalSetup).to.deep.equal(["sample-setup.ts"]);
    expect(customerConfig.globalTeardown).to.deep.equal(["sample-teardown.ts"]);
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
        require.resolve("../../src/core/global/playwright-service-global-setup.ts"),
      ],
      globalTeardown: [
        "sample-teardown.ts",
        require.resolve("../../src/core/global/playwright-service-global-teardown.ts"),
      ],
    });
  });

  it("should throw error when playwright version is 1.48.0 and input global files are list", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    vi.stubEnv(InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION, "1.48.0");
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    const mockVersion = "1.0.0-beta.7";
    vi.mock("../../package.json", async (actualImport) => {
      const original = await actualImport();
      return {
        ...(original as any),
        version: mockVersion,
      };
    });
    const sampleConfig = {
      globalSetup: ["sample-setup.ts"],
      globalTeardown: ["sample-teardown.ts"],
    };
    expect(() => getServiceConfig(sampleConfig)).to.throw(
      ServiceErrorMessageConstants.MULTIPLE_SETUP_FILE_PLAYWRIGHT_VERSION_ERROR.message,
    );
  });

  it("should set customer config global setup and teardown scripts in the config if passed", async () => {
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");
    getServiceConfig(samplePlaywrightConfigInput);

    expect(customerConfig.globalSetup).to.equal("sample-setup.ts");
    expect(customerConfig.globalTeardown).to.equal("sample-teardown.ts");

    delete require.cache[require.resolve("../../src/common/customerConfig.ts")];
  });

  it("should set customer config global setup and teardown scripts to null in the config if not passed", async () => {
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");
    getServiceConfig({});

    expect(customerConfig.globalSetup).toBeUndefined();
    expect(customerConfig.globalTeardown).toBeUndefined();
  });

  it("should set service config options as passed", async () => {
    vi.stubEnv(InternalEnvironmentVariables.MPT_SERVICE_RUN_ID, undefined);
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    getServiceConfig(samplePlaywrightConfigInput, {
      os: ServiceOS.WINDOWS,
      runId: "1234",
    });
    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(playwrightServiceConfig.serviceOs).to.equal(ServiceOS.WINDOWS);
    expect(playwrightServiceConfig.runId).to.equal("1234");
  });

  it("should set service global setup and teardown for entra authentication", async () => {
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    const config = getServiceConfig(samplePlaywrightConfigInput);
    expect(config.globalSetup).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-setup.ts"),
    );
    expect(config.globalTeardown).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-teardown.ts"),
    );
  });

  it("should not set service global setup and teardown for mpt PAT authentication even if pat is not set", async () => {
    vi.spyOn(utils, "validateMptPAT").mockReturnValue();
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    const config = getServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });

    expect(config.globalSetup).not.to.equal(
      require.resolve("../../src/core/global/playwright-service-global-setup.ts"),
    );
    expect(config.globalTeardown).not.to.equal(
      require.resolve("../../src/core/global/playwright-service-global-teardown.ts"),
    );
  });

  it("should set service global setup and teardown for entra id authentication even if pat is set", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    const config = getServiceConfig(samplePlaywrightConfigInput);

    expect(config.globalSetup).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-setup.ts"),
    );
    expect(config.globalTeardown).to.equal(
      require.resolve("../../src/core/global/playwright-service-global-teardown.ts"),
    );
  });

  it("should not set service global setup and teardown for mpt pat authentication if pat is set", async () => {
    vi.spyOn(process, "exit");
    vi.spyOn(utils, "parseJwt").mockReturnValue({ exp: Date.now() / 1000 + 10000 });
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    const config = getServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });

    assert.isUndefined(config.globalSetup);
    assert.isUndefined(config.globalTeardown);
  });

  it("should return service config with service connect options", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    const playwrightServiceConfig = new PlaywrightServiceConfig();
    const mockVersion = "1.0.0-beta.7";
    vi.mock("../../package.json", async (actualImport) => {
      const original = await actualImport();
      return {
        ...(original as any),
        version: mockVersion,
      };
    });
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
      globalSetup: require.resolve("../../src/core/global/playwright-service-global-setup.ts"),
      globalTeardown: require.resolve(
        "../../src/core/global/playwright-service-global-teardown.ts",
      ),
    });
  });

  it("should not set connect options if disable scalable execution is true", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    const config = getServiceConfig(samplePlaywrightConfigInput, {
      useCloudHostedBrowsers: false,
    });
    expect(config).to.deep.equal({
      globalSetup: require.resolve("../../src/core/global/playwright-service-global-setup.ts"),
      globalTeardown: require.resolve(
        "../../src/core/global/playwright-service-global-teardown.ts",
      ),
    });
  });

  it("should set token credentials if passed on playwright service entra singleton object", async () => {
    const accessToken = "token";
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, accessToken);
    const { getServiceConfig } = await import("../../src/core/playwrightService.js");

    const playwrightServiceEntra = await import("../../src/core/playwrightServiceEntra.js");
    const credential = {
      getToken: vi.fn().mockResolvedValue(accessToken),
    };
    getServiceConfig(samplePlaywrightConfigInput, {
      credential,
    });
    // @ts-expect-error _entraIdAccessToken is private
    expect(playwrightServiceEntra.default._entraIdAccessToken._credential).to.equal(credential);
  });
});

describe("getConnectOptions", async () => {
  beforeEach(() => {
    vi.stubEnv(
      ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL,
      "wss://eastus.playwright.microsoft.com/accounts/1234/browsers",
    );
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should set service connect options with passed values", async () => {
    vi.stubEnv(InternalEnvironmentVariables.MPT_SERVICE_RUN_ID, undefined);
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
    const mockVersion = "1.0.0-beta.7";
    vi.mock("../../package.json", async (actualImport) => {
      const original = await actualImport();
      return {
        ...(original as any),
        version: mockVersion,
      };
    });
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
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, undefined);
    const { getConnectOptions } = await import("../../src/core/playwrightService.js");
    await expect(getConnectOptions()).rejects.toThrow(
      ServiceErrorMessageConstants.NO_AUTH_ERROR.message,
    );
  });

  it("should fetch entra token using credentials passed by customer", async () => {
    const accessToken = "token";
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, accessToken);

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
