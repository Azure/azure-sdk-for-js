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
import { PlaywrightServiceConfig } from "../../src/common/playwrightServiceConfig.js";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import { parseJwt } from "../../src/utils/parseJwt.js";

vi.mock("../../src/utils/parseJwt.js", async (importActual) => {
  const actual = await importActual<typeof import("../../src/utils/parseJwt.js")>();
  return {
    ...actual,
    parseJwt: vi.fn(),
  };
});

vi.mock("node:process", async (importActual) => {
  const actual = await importActual<typeof import("node:process")>();
  return {
    default: {
      ...(actual as any).default,
      exit: vi.fn(),
    },
  };
});

// Derive __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the path
const globalSetupPath = path.join(
  __dirname,
  "../../src/core/global/playwright-service-global-setup.js",
);
const globalTeardownPath = path.join(
  __dirname,
  "../../src/core/global/playwright-service-global-teardown.js",
);

const samplePlaywrightConfigInput = {
  globalSetup: "sample-setup.ts",
  globalTeardown: "sample-teardown.ts",
};

describe("getServiceConfig", () => {
  beforeEach(() => {
    vi.spyOn(console, "error");
    vi.spyOn(console, "log");
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] =
      "wss://eastus.playwright.microsoft.com/accounts/1234/browsers";
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.47.0";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    vi.mocked(process.exit).mockReset();
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should exit with error message when fetching service config if service endpoint is not set", async () => {
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
    vi.restoreAllMocks();
    const consoleErrorSpy = vi.spyOn(console, "error");
    vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });
    expect(() => localGetServiceConfig(samplePlaywrightConfigInput)).to.throw();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      ServiceErrorMessageConstants.NO_SERVICE_URL_ERROR.message,
    );
  });

  it("should return service config with service connect options and global setup and teardown as list when playwright version is 1.49.0", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    vi.stubEnv(InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION, "1.49.0");
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");

    const mockVersion = "1.0.0";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    vi.spyOn(require("../../package.json"), "version", "get").mockReturnValue(mockVersion);
    const config = localGetServiceConfig({});
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
      globalSetup: [globalSetupPath],
      globalTeardown: [globalTeardownPath],
    });
  });

  it("should return service config with service connect options and global setup and teardown as list when playwright version is 1.49.0 and input global files are string", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    vi.stubEnv(InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION, "1.49.0");
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");

    const mockVersion = "1.0.0";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    vi.spyOn(require("../../package.json"), "version", "get").mockReturnValue(mockVersion);
    const config = localGetServiceConfig(samplePlaywrightConfigInput);
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
      globalSetup: ["sample-setup.ts", globalSetupPath],
      globalTeardown: ["sample-teardown.ts", globalTeardownPath],
    });
  });

  it("should return service config with service connect options and global setup and teardown as list when playwright version is 1.49.0 and input global files are list", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    vi.stubEnv(InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION, "1.49.0");
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");

    const mockVersion = "1.0.0";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    vi.spyOn(require("../../package.json"), "version", "get").mockReturnValue(mockVersion);
    const sampleConfig = {
      globalSetup: ["sample-setup.ts"],
      globalTeardown: ["sample-teardown.ts"],
    };
    const config = localGetServiceConfig(sampleConfig);
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
      globalSetup: ["sample-setup.ts", globalSetupPath],
      globalTeardown: ["sample-teardown.ts", globalTeardownPath],
    });
  });

  it("should throw error when playwright version is 1.48.0 and input global files are list", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    vi.stubEnv(InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION, "1.48.0");
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");

    const mockVersion = "1.0.0";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    vi.spyOn(require("../../package.json"), "version", "get").mockReturnValue(mockVersion);
    const sampleConfig = {
      globalSetup: ["sample-setup.ts"],
      globalTeardown: ["sample-teardown.ts"],
    };
    expect(() => localGetServiceConfig(sampleConfig)).to.throw(
      ServiceErrorMessageConstants.MULTIPLE_SETUP_FILE_PLAYWRIGHT_VERSION_ERROR.message,
    );
  });

  it("should set customer config global setup and teardown scripts in the config if passed", async () => {
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");
    localGetServiceConfig(samplePlaywrightConfigInput);
    const customerConfig = await import("../../src/common/customerConfig.js");
    expect(customerConfig.default.globalSetup).to.equal("sample-setup.ts");
    expect(customerConfig.default.globalTeardown).to.equal("sample-teardown.ts");
  });

  // TODO:
  // This test should be rewritten to check if the global setup and teardown are set to undefined
  // This doesn't actually set anything to null or undefined with a blank object
  it(
    "should set customer config global setup and teardown scripts to null in the config if not passed",
    { skip: true },
    async () => {
      const { getServiceConfig: localGetServiceConfig } =
        await import("../../src/core/playwrightService.js");
      const config = localGetServiceConfig(undefined as any);

      console.log(config);

      const customerConfig = await import("../../src/common/customerConfig.js");
      expect(customerConfig.default.globalSetup).toBeUndefined();
      expect(customerConfig.default.globalTeardown).toBeUndefined();
    },
  );

  it("should set service config options as passed", async () => {
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");
    localGetServiceConfig(samplePlaywrightConfigInput, {
      os: ServiceOS.WINDOWS,
      runId: "1234",
    });
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    expect(playwrightServiceConfig.serviceOs).to.equal(ServiceOS.WINDOWS);
    expect(playwrightServiceConfig.runId).to.equal("1234");
  });

  it("should set service global setup and teardown for entra authentication", async () => {
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");
    const config = localGetServiceConfig(samplePlaywrightConfigInput);
    expect(config.globalSetup).to.equal(globalSetupPath);
    expect(config.globalTeardown).to.equal(globalTeardownPath);
  });

  it("should not set service global setup and teardown for mpt PAT authentication even if pat is not set", async () => {
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");
    vi.spyOn(utils, "validateMptPAT").mockReturnValue();
    vi.spyOn(utils, "warnIfAccessTokenCloseToExpiry").mockReturnValue();
    const config = localGetServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });
    expect(config.globalSetup).not.to.equal(globalSetupPath);
    expect(config.globalTeardown).not.to.equal(globalTeardownPath);
  });

  it("should not call warnIfAccessTokenCloseToExpiry if ONE_TIME_OPERATION_FLAG is true", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    vi.stubEnv(InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG, "true");
    const warnIfAccessTokenCloseToExpiryStub = vi.spyOn(utils, "warnIfAccessTokenCloseToExpiry");
    vi.spyOn(utils, "validateMptPAT").mockReturnValue();
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");

    localGetServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });

    expect(warnIfAccessTokenCloseToExpiryStub).not.toHaveBeenCalled();

    delete process.env[InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG];
  });

  it("should call warnIfAccessTokenCloseToExpiry if ONE_TIME_OPERATION_FLAG is not set", async () => {
    vi.stubEnv(InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG, "false");
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    const warnIfAccessTokenCloseToExpiryStub = vi.spyOn(utils, "warnIfAccessTokenCloseToExpiry");
    vi.spyOn(utils, "validateMptPAT").mockReturnValue();
    vi.mocked(parseJwt).mockReturnValue({ exp: Date.now() / 1000 + 10000 });

    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");

    localGetServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });

    expect(warnIfAccessTokenCloseToExpiryStub).toHaveBeenCalled();
    expect(process.env[InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG]).to.equal("true");

    delete process.env[InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG];
  });

  it("should set service global setup and teardown for entra id authentication even if pat is set", async () => {
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");

    const config = localGetServiceConfig(samplePlaywrightConfigInput);

    expect(config.globalSetup).to.equal(globalSetupPath);
    expect(config.globalTeardown).to.equal(globalTeardownPath);
  });

  it("should not set service global setup and teardown for mpt pat authentication if pat is set", async () => {
    vi.mocked(parseJwt).mockReturnValue({ exp: Date.now() / 1000 + 10000 });
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    const config = localGetServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });
    expect(config.globalSetup).toBeUndefined();
    expect(config.globalTeardown).toBeUndefined();
  });

  it("should return service config with service connect options", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    const mockVersion = "1.0.0";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    vi.spyOn(require("../../package.json"), "version", "get").mockReturnValue(mockVersion);
    const config = localGetServiceConfig(samplePlaywrightConfigInput);
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
      globalSetup: globalSetupPath,
      globalTeardown: globalTeardownPath,
    });
  });

  it("should not set connect options if disable scalable execution is true", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");

    const config = localGetServiceConfig(samplePlaywrightConfigInput, {
      useCloudHostedBrowsers: false,
    });

    expect(config).to.deep.equal({
      globalSetup: globalSetupPath,
      globalTeardown: globalTeardownPath,
    });
  });

  it("should set token credentials if passed on playwright service entra singleton object", async () => {
    const accessToken = "token";
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, accessToken);
    const { getServiceConfig: localGetServiceConfig } =
      await import("../../src/core/playwrightService.js");
    const playwrightServiceEntra = await import("../../src/core/playwrightServiceEntra.js");
    const credential = {
      getToken: vi.fn().mockResolvedValue(accessToken),
    };

    localGetServiceConfig(samplePlaywrightConfigInput, {
      credential,
    });

    expect((playwrightServiceEntra.default as any)._entraIdAccessToken._credential).to.equal(
      credential,
    );
  });
});

describe("getConnectOptions", () => {
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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    vi.spyOn(require("../../package.json"), "version", "get").mockReturnValue(mockVersion);
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
    vi.restoreAllMocks();
  });

  it("should throw error if token is not set", async () => {
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
    const { getConnectOptions } = await import("../../src/core/playwrightService.js");
    await expect(() => getConnectOptions()).rejects.toThrow(
      ServiceErrorMessageConstants.NO_AUTH_ERROR.message,
    );
  });

  it("should fetch entra token using credentials passed by customer", async () => {
    const accessToken = "token";
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, accessToken);

    vi.mocked(parseJwt).mockReturnValue({ exp: Date.now() / 1000 });
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
