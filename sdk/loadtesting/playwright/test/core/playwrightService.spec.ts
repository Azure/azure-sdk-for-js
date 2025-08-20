// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Constants,
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
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should exit with error message when fetching service config if service endpoint is not set", async () => {
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

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
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

    const mockVersion = "1.0.0";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    vi.spyOn(require("../../package.json"), "version", "get").mockReturnValue(mockVersion);
    const config = localGetServiceConfig({});
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    expect(config).to.deep.equal({
      use: {
        connectOptions: {
          wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${Constants.LatestAPIVersion}`,
          headers: {
            Authorization: "Bearer token",
            "x-ms-package-version": `@azure/playwright/${encodeURIComponent(mockVersion)}`,
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
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

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
          wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${Constants.LatestAPIVersion}`,
          headers: {
            Authorization: "Bearer token",
            "x-ms-package-version": `@azure/playwright/${encodeURIComponent(mockVersion)}`,
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
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

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
          wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${Constants.LatestAPIVersion}`,
          headers: {
            Authorization: "Bearer token",
            "x-ms-package-version": `@azure/playwright/${encodeURIComponent(mockVersion)}`,
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
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

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
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
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
      const { getServiceConfig: localGetServiceConfig } = await import(
        "../../src/core/playwrightService.js"
      );
      const config = localGetServiceConfig(undefined as any);

      console.log(config);

      const customerConfig = await import("../../src/common/customerConfig.js");
      expect(customerConfig.default.globalSetup).toBeUndefined();
      expect(customerConfig.default.globalTeardown).toBeUndefined();
    },
  );

  it("should set service config options as passed", async () => {
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    localGetServiceConfig(samplePlaywrightConfigInput, {
      os: ServiceOS.WINDOWS,
      runId: "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6",
    });
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    expect(playwrightServiceConfig.serviceOs).to.equal(ServiceOS.WINDOWS);
    expect(playwrightServiceConfig.runId).to.equal("a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6");
  });

  it("should set service global setup and teardown for entra authentication", async () => {
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    const config = localGetServiceConfig(samplePlaywrightConfigInput);
    expect(config.globalSetup).to.equal(globalSetupPath);
    expect(config.globalTeardown).to.equal(globalTeardownPath);
  });

  it("should not set service global setup and teardown for mpt PAT authentication even if pat is not set", async () => {
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    vi.spyOn(utils, "validateMptPAT").mockReturnValue();
    vi.spyOn(utils, "warnIfAccessTokenCloseToExpiry").mockReturnValue();
    const config = localGetServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });
    expect(config.globalSetup).equal(globalSetupPath);
    expect(config.globalTeardown).equal(globalTeardownPath);
  });

  it("should not call warnIfAccessTokenCloseToExpiry if ONE_TIME_OPERATION_FLAG is true", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    vi.stubEnv(InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG, "true");
    const warnIfAccessTokenCloseToExpiryStub = vi.spyOn(utils, "warnIfAccessTokenCloseToExpiry");
    vi.spyOn(utils, "validateMptPAT").mockReturnValue();
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

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

    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );

    localGetServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });

    expect(warnIfAccessTokenCloseToExpiryStub).toHaveBeenCalled();
    expect(process.env[InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG]).to.equal("true");

    delete process.env[InternalEnvironmentVariables.ONE_TIME_OPERATION_FLAG];
  });

  it("should set service global setup and teardown for entra id authentication even if pat is set", async () => {
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");

    const config = localGetServiceConfig(samplePlaywrightConfigInput);

    expect(config.globalSetup).to.equal(globalSetupPath);
    expect(config.globalTeardown).to.equal(globalTeardownPath);
  });

  it("should not set service global setup and teardown for mpt pat authentication if pat is set", async () => {
    vi.mocked(parseJwt).mockReturnValue({ exp: Date.now() / 1000 + 10000 });
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    const config = localGetServiceConfig(samplePlaywrightConfigInput, {
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });
    expect(config.globalSetup).equal(globalSetupPath);
    expect(config.globalTeardown).equal(globalTeardownPath);
  });

  it("should return service config with service connect options", async () => {
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, "token");
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    const mockVersion = "1.0.0";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    vi.spyOn(require("../../package.json"), "version", "get").mockReturnValue(mockVersion);
    const config = localGetServiceConfig(samplePlaywrightConfigInput);
    expect(config).to.deep.equal({
      use: {
        connectOptions: {
          wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${Constants.LatestAPIVersion}`,
          headers: {
            Authorization: "Bearer token",
            "x-ms-package-version": `@azure/playwright/${encodeURIComponent(mockVersion)}`,
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

  it("should set token credentials if passed on playwright service entra singleton object", async () => {
    const accessToken = "token";
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, accessToken);
    const { getServiceConfig: localGetServiceConfig } = await import(
      "../../src/core/playwrightService.js"
    );
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
    delete process.env[InternalEnvironmentVariables.USING_SERVICE_CONFIG];
    const { getConnectOptions } = await import("../../src/core/playwrightService.js");
    const credential = {
      getToken: vi
        .fn()
        .mockResolvedValue({ token: "token", expiresOnTimestamp: Date.now() + 10000 }),
    };
    await getConnectOptions({
      runId: "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6",
      os: ServiceOS.WINDOWS,
      credential,
      serviceAuthType: ServiceAuth.ENTRA_ID,
    });
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    expect(playwrightServiceConfig.runId).to.equal("a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6");
    expect(playwrightServiceConfig.serviceOs).to.equal(ServiceOS.WINDOWS);
  });

  it("should throw error when using both getServiceConfig and getConnectOptions with restricted params", async () => {
    process.env[InternalEnvironmentVariables.USING_SERVICE_CONFIG] = "true";
    const { getConnectOptions } = await import("../../src/core/playwrightService.js");
    await expect(
      getConnectOptions({
        runId: "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6",
      }),
    ).rejects.toThrow(ServiceErrorMessageConstants.INVALID_PARAM_WITH_SERVICE_CONFIG.message);
    delete process.env[InternalEnvironmentVariables.USING_SERVICE_CONFIG];
  });

  it("should set service connect options with fetched token", async () => {
    const { getConnectOptions } = await import("../../src/core/playwrightService.js");
    const mockVersion = "1.0.0";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    vi.spyOn(require("../../package.json"), "version", "get").mockReturnValue(mockVersion);
    const credential = {
      getToken: vi
        .fn()
        .mockResolvedValue({ token: "token", expiresOnTimestamp: Date.now() + 10000 }),
    };
    const connectOptions = await getConnectOptions({
      credential,
      serviceAuthType: ServiceAuth.ENTRA_ID,
    });
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    expect(connectOptions).to.deep.equal({
      wsEndpoint: `wss://eastus.playwright.microsoft.com/accounts/1234/browsers?runId=${playwrightServiceConfig.runId}&os=${playwrightServiceConfig.serviceOs}&api-version=${Constants.LatestAPIVersion}`,
      options: {
        headers: {
          Authorization: "Bearer token",
          "x-ms-package-version": `@azure/playwright/${encodeURIComponent(mockVersion)}`,
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

    await expect(() =>
      getConnectOptions({
        serviceAuthType: ServiceAuth.ACCESS_TOKEN,
      }),
    ).rejects.toThrow(ServiceErrorMessageConstants.NO_AUTH_ERROR.message);
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

  it("should throw error when ENTRA_ID auth type is specified but no credential is provided", async () => {
    const { getConnectOptions } = await import("../../src/core/playwrightService.js");

    await expect(() =>
      getConnectOptions({
        serviceAuthType: ServiceAuth.ENTRA_ID,
      }),
    ).rejects.toThrow(ServiceErrorMessageConstants.NO_CRED_ENTRA_AUTH_ERROR.message);
  });

  it("should use environment access token when ACCESS_TOKEN auth type is specified", async () => {
    const accessToken = "token";
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, accessToken);
    vi.spyOn(utils, "validateMptPAT").mockReturnValue();
    vi.spyOn(utils, "getAccessToken").mockReturnValue(accessToken);

    const { getConnectOptions } = await import("../../src/core/playwrightService.js");

    const connectOptions = await getConnectOptions({
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });

    // Access the options correctly based on the structure
    expect(connectOptions.options?.headers?.Authorization).to.equal(`Bearer ${accessToken}`);
  });

  it("should throw error when invalid auth type is specified", async () => {
    const { getConnectOptions } = await import("../../src/core/playwrightService.js");

    await expect(() =>
      getConnectOptions({
        serviceAuthType: "INVALID_AUTH_TYPE" as any,
      }),
    ).rejects.toThrow(ServiceErrorMessageConstants.INVALID_AUTH_TYPE_ERROR.message);
  });

  it("should honor serviceAuthType when specified", async () => {
    const accessToken = "token";
    vi.stubEnv(ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN, accessToken);
    vi.spyOn(utils, "validateMptPAT").mockReturnValue();

    const { getConnectOptions } = await import("../../src/core/playwrightService.js");

    const playwrightServiceConfigSpy = vi.spyOn(
      PlaywrightServiceConfig.prototype,
      "serviceAuthType",
      "set",
    );

    await getConnectOptions({
      serviceAuthType: ServiceAuth.ACCESS_TOKEN,
    });

    expect(playwrightServiceConfigSpy).toHaveBeenCalledWith(ServiceAuth.ACCESS_TOKEN);
  });
});
