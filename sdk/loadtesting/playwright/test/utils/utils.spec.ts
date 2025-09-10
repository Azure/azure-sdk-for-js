// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Constants,
  GitHubActionsConstants,
  InternalEnvironmentVariables,
  ServiceEnvironmentVariable,
} from "../../src/common/constants.js";
import {
  getAccessToken,
  getServiceBaseURL,
  getAndSetRunId,
  getServiceWSEndpoint,
  getVersionInfo,
  validateServiceUrl,
  validateMptPAT,
  exitWithFailureMessage,
  validatePlaywrightVersion,
  warnIfAccessTokenCloseToExpiry,
  fetchOrValidateAccessToken,
  populateValuesFromServiceUrl,
  getRunName,
  isValidGuid,
  ValidateRunID,
} from "../../src/utils/utils.js";
import * as packageManager from "../../src/utils/packageManager.js";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import process from "node:process";
import { getPlaywrightVersion } from "../../src/utils/getPlaywrightVersion.js";
import { parseJwt } from "../../src/utils/parseJwt.js";
import { EntraIdAccessToken } from "../../src/common/entraIdAccessToken.js";
import { createEntraIdAccessToken } from "../../src/common/entraIdAccessToken.js";
import { CI_PROVIDERS } from "../../src/utils/cIInfoProvider.js";
import * as childProcess from "node:child_process";

vi.mock("child_process", async (importOriginal) => {
  const actual = await importOriginal<typeof import("child_process")>();
  return {
    ...actual,
    exec: vi.fn((command, callback) => {
      if (command === GitHubActionsConstants.GIT_VERSION_COMMAND) {
        callback(null, "git version 2.37.1", "");
      } else if (command === GitHubActionsConstants.GIT_REV_PARSE) {
        callback(null, "true", "");
      } else if (command === GitHubActionsConstants.GIT_COMMIT_MESSAGE_COMMAND) {
        callback(null, "Test commit message", "");
      } else {
        callback(new Error(`Command not mocked: ${command}`), "", "");
      }
      return {} as childProcess.ChildProcess;
    }),
    execSync: vi.fn((command) => {
      if (command.includes("playwright --version")) {
        return Buffer.from("1.42.0");
      } else if (command === "echo") {
        return Buffer.from("Version 1.2.3");
      } else {
        throw new Error(`Command not mocked: ${command}`);
      }
    }),
  };
});

vi.mock("../../src/common/entraIdAccessToken.js", async (importActual) => {
  const actual = await importActual<typeof import("../../src/common/entraIdAccessToken.js")>();
  return {
    ...actual,
    createEntraIdAccessToken: vi.fn(),
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

vi.mock("../../src/utils/parseJwt.js", async (importActual) => {
  const actual = await importActual<typeof import("../../src/utils/parseJwt.js")>();
  return {
    ...actual,
    parseJwt: vi.fn(),
  };
});

vi.mock("../../src/utils/getPlaywrightVersion.js", async (importActual) => {
  const actual = await importActual<typeof import("../../src/utils/getPlaywrightVersion.js")>();
  return {
    ...actual,
    getPlaywrightVersion: vi.fn(),
  };
});

vi.mock("../../src/utils/utils.js", async (importActual) => {
  const actual = await importActual<typeof import("../../src/utils/utils.js")>();
  return {
    ...actual,
    populateValuesFromServiceUrl: vi.fn(),
  };
});

describe("Service Utils", () => {
  beforeEach(() => {
    vi.stubEnv(InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION, Constants.LatestAPIVersion);
    vi.spyOn(console, "error");
    vi.spyOn(console, "log");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("should return access token set in env variable", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    expect(getAccessToken()).to.equal("test");

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should return undefined if access token is not set in env variable", () => {
    expect(getAccessToken()).toBeUndefined();
  });

  it("should return service base url set in env variable", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] = "test";
    expect(getServiceBaseURL()).to.equal("test");

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
  });

  it("should return undefined if service base url is not set in env variable", () => {
    expect(getServiceBaseURL()).toBeUndefined();
  });

  it("should return and set run id set in env variable", () => {
    const runId = getAndSetRunId();
    expect(runId).to.be.a("string");
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal(runId);

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
  });

  it("should return service base url with query params and should escape runID", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] =
      "wss://eastus.api.playwright.microsoft.com/workspaces/1234/browsers";
    const runId = "2021-10-11T07:00:00.000Z";
    const escapeRunId = encodeURIComponent(runId);
    const os = "windows";
    const expected = `wss://eastus.api.playwright.microsoft.com/workspaces/1234/browsers?runId=${escapeRunId}&os=${os}&api-version=${Constants.LatestAPIVersion}`;
    expect(getServiceWSEndpoint(runId, os, Constants.LatestAPIVersion)).to.equal(expected);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
  });

  it("should escape special character in runId", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] =
      "wss://eastus.api.playwright.microsoft.com/workspaces/1234/browsers";
    const runId = "2021-10-11T07:00:00.000Z";
    const escapeRunId = encodeURIComponent(runId);
    const os = "windows";
    const expected = `wss://eastus.api.playwright.microsoft.com/workspaces/1234/browsers?runId=${escapeRunId}&os=${os}&api-version=${Constants.LatestAPIVersion}`;
    expect(getServiceWSEndpoint(runId, os, Constants.LatestAPIVersion)).to.equal(expected);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
  });

  it("should exit with error message if service url is not set", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] = "";
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });

    expect(() => validateServiceUrl()).to.throw();
    expect(exitStub).toHaveBeenCalledWith(1);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
  });

  it("should be no-op if service url is set", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] = "test";
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });

    expect(() => validateServiceUrl()).not.to.throw();
    expect(exitStub).not.toHaveBeenCalled();

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
  });

  it("should exit with error message if MPT PAT is not set", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "";
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });

    expect(() => validateMptPAT(exitWithFailureMessage)).to.throw();
    expect(exitStub).toHaveBeenCalledWith(1);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should exit with error message if MPT PAT is not valid", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });

    expect(() => validateMptPAT(exitWithFailureMessage)).to.throw();
    expect(exitStub).toHaveBeenCalledWith(1);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should exit with error message if invalid token is set in env variable", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    vi.mocked(parseJwt).mockReturnValue({});
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });

    expect(() => validateMptPAT(exitWithFailureMessage)).to.throw();
    expect(exitStub).toHaveBeenCalledWith(1);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should exit with error message if MPT PAT is expired", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    vi.mocked(parseJwt).mockReturnValue({ exp: Date.now() / 1000 - 10 });
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });

    expect(() => validateMptPAT(exitWithFailureMessage)).to.throw();
    expect(exitStub).toHaveBeenCalledWith(1);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should be no-op if MPT PAT is valid", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    vi.mocked(parseJwt).mockReturnValue({ exp: Date.now() / 1000 + 10 });

    expect(() => validateMptPAT(exitWithFailureMessage)).not.to.throw();

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("Should exit with an error message if the MPT PAT and service URL are from different workspaces", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    vi.mocked(parseJwt).mockReturnValue({
      aid: "eastasia_c24330dd-9249-4ae8-9ba9-b5766060427c",
    });
    vi.mocked(populateValuesFromServiceUrl).mockReturnValue({
      region: "",
      domain: "playwright.microsoft.com",
      accountId: "eastasia_8bda26b5-300f-4f4f-810d-eae055e4a69b",
    });
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });
    expect(() => validateMptPAT(exitWithFailureMessage)).to.throw();
    expect(exitStub).toHaveBeenCalledWith(1);
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should log a warning if the token is close to expiry", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    const currentTime = Date.now();
    vi.spyOn(Date, "now").mockReturnValue(currentTime);
    const fiveDaysFromNow = Math.floor((currentTime + 5 * 24 * 60 * 60 * 1000) / 1000);
    vi.mocked(parseJwt).mockReturnValue({ exp: fiveDaysFromNow });
    const consoleWarningSpy = vi.spyOn(console, "warn");
    warnIfAccessTokenCloseToExpiry();
    const expirationTime = fiveDaysFromNow * 1000;
    const daysToExpiration = Math.ceil((expirationTime - currentTime) / (24 * 60 * 60 * 1000));
    const expirationDate = new Date(expirationTime).toLocaleDateString();
    const expirationWarning = `Warning: The access token used for this test run will expire in ${daysToExpiration} days on ${expirationDate}. Generate a new token from the portal to avoid failures. For a simpler, more secure solution, switch to Microsoft Entra ID and eliminate token management. https://learn.microsoft.com/entra/identity/`;
    expect(consoleWarningSpy).toHaveBeenCalledOnce();
    expect(consoleWarningSpy).toHaveBeenCalledWith(expirationWarning);
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should not log a warning if the token is not close to expiry", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    const thirtyDaysFromNow = Math.ceil((Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000);
    vi.mocked(parseJwt).mockReturnValue({ exp: thirtyDaysFromNow });
    vi.mocked(populateValuesFromServiceUrl).mockReturnValue({
      region: "eastus",
      domain: "playwright.microsoft.com",
      accountId: "123456789",
    });

    const consoleWarningSpy = vi.spyOn(console, "warn");

    warnIfAccessTokenCloseToExpiry();
    expect(consoleWarningSpy).not.toHaveBeenCalled();

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should be no-op if the MPT PAT and service URL are from same workspaces", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    vi.mocked(parseJwt).mockReturnValue({
      aid: "eastasia_8bda26b5-300f-4f4f-810d-eae055e4a69b",
    });
    vi.mocked(populateValuesFromServiceUrl).mockReturnValue({
      region: "",
      domain: "playwright.microsoft.com",
      accountId: "eastasia_8bda26b5-300f-4f4f-810d-eae055e4a69b",
    });

    expect(() => validateMptPAT(exitWithFailureMessage)).not.to.throw();
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should not exit the process if workspace URL is mismatched", async () => {
    const { populateValuesFromServiceUrl: localPopulateValuesFromServiceUrl } =
      await vi.importActual<typeof import("../../src/utils/utils.js")>("../../src/utils/utils.js");

    const exitStub = vi.mocked(process.exit);
    process.env["PLAYWRIGHT_SERVICE_URL"] =
      "wss://eastus.api.playwright.microsoft.com/workspaces/wrong-id/browsers";
    const result = localPopulateValuesFromServiceUrl();

    expect(result).to.deep.equal({
      region: "eastus",
      domain: "playwright.microsoft.com",
      accountId: "wrong-id",
    });
    expect(exitStub).not.toHaveBeenCalled();

    delete process.env["PLAYWRIGHT_SERVICE_URL"];
  });

  it("should return entra access token (not close to expiry)", async () => {
    const tokenMock = "test";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = tokenMock;
    const entraIdAccessToken = {
      token: tokenMock,
      doesEntraIdAccessTokenNeedRotation: vi.fn().mockReturnValue(false),
      fetchEntraIdAccessToken: vi.fn(),
    } as any as EntraIdAccessToken;

    vi.mocked(createEntraIdAccessToken).mockReturnValue(entraIdAccessToken);

    const token = await fetchOrValidateAccessToken();
    expect(entraIdAccessToken.doesEntraIdAccessTokenNeedRotation).toHaveBeenCalled();
    expect(entraIdAccessToken.fetchEntraIdAccessToken).not.toHaveBeenCalled();

    expect(token).to.equal(tokenMock);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should fetch entra access token if expired", async () => {
    const tokenMock = "test";
    const newTokenMock = "newTest";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = tokenMock;
    const entraIdAccessToken = {
      token: tokenMock,
      doesEntraIdAccessTokenNeedRotation: vi.fn().mockReturnValue(true),
      fetchEntraIdAccessToken: vi.fn().mockImplementation(() => {
        process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = newTokenMock;
      }),
    } as any as EntraIdAccessToken;

    vi.mocked(createEntraIdAccessToken).mockReturnValue(entraIdAccessToken);

    const token = await fetchOrValidateAccessToken();
    expect(entraIdAccessToken.doesEntraIdAccessTokenNeedRotation).toHaveBeenCalled();
    expect(entraIdAccessToken.fetchEntraIdAccessToken).toHaveBeenCalled();

    expect(token).to.equal(newTokenMock);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should fetch entra access token using passed credentials if expired", async () => {
    const tokenMock = "test";
    const newTokenMock = "newTest";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = tokenMock;
    const expiry = Date.now();
    vi.mocked(parseJwt).mockReturnValue({ exp: expiry / 1000 });
    const credential = {
      token: tokenMock,
      getToken: vi.fn().mockResolvedValue({
        token: newTokenMock,
        expiresOnTimestamp: Date.now() / 1000,
      }),
    };

    vi.mocked(createEntraIdAccessToken).mockReturnValue(new EntraIdAccessToken(credential));

    const token = await fetchOrValidateAccessToken(credential);

    expect(credential.getToken).toHaveBeenCalled();
    expect(token).to.equal(newTokenMock);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should return mpt pat", async () => {
    const tokenMock = "test";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = tokenMock;
    const entraIdAccessToken = {
      token: "existing-token", // Change to non-empty token to avoid fetchEntraIdAccessToken call
      doesEntraIdAccessTokenNeedRotation: vi.fn().mockReturnValue(false),
      fetchEntraIdAccessToken: vi.fn(),
    } as any as EntraIdAccessToken;

    vi.mocked(createEntraIdAccessToken).mockReturnValue(entraIdAccessToken);

    const token = await fetchOrValidateAccessToken();
    expect(entraIdAccessToken.doesEntraIdAccessTokenNeedRotation).toHaveBeenCalled();
    expect(entraIdAccessToken.fetchEntraIdAccessToken).not.toHaveBeenCalled();

    expect(token).to.equal(tokenMock);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should throw error if no auth token is set", async () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "";
    const entraIdAccessToken = {
      token: "",
    } as any as EntraIdAccessToken;

    vi.mocked(createEntraIdAccessToken).mockReturnValue(entraIdAccessToken);

    await expect(() => fetchOrValidateAccessToken()).rejects.toThrowError();

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should print error message and exit", () => {
    vi.resetAllMocks();
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      return undefined as never;
    });
    const consoleErrorSpy = vi.spyOn(console, "error");

    exitWithFailureMessage({ key: "error", message: "error message" });

    expect(exitStub).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith("error message");
  });

  it("should return version info with major only", () => {
    const version = "1";
    const versionInfo = getVersionInfo(version);
    expect(versionInfo.major).to.equal(1);
    expect(versionInfo.minor).to.equal(0);
    expect(versionInfo.patch).to.equal(0);
  });

  it("should return version info with major, minor only", () => {
    const version = "1.47";
    const versionInfo = getVersionInfo(version);
    expect(versionInfo.major).to.equal(1);
    expect(versionInfo.minor).to.equal(47);
    expect(versionInfo.patch).to.equal(0);
  });

  it("should return version info with major, minor and patch", () => {
    const version = "1.47.1";
    const versionInfo = getVersionInfo(version);
    expect(versionInfo.major).to.equal(1);
    expect(versionInfo.minor).to.equal(47);
    expect(versionInfo.patch).to.equal(1);
  });

  it("should remove extra characters from version", () => {
    const version = "1.47.1-beta";
    const versionInfo = getVersionInfo(version);
    expect(versionInfo.major).to.equal(1);
    expect(versionInfo.minor).to.equal(47);
    expect(versionInfo.patch).to.equal(1);
  });

  it("should return version info with empty version", () => {
    const version = "";
    const versionInfo = getVersionInfo(version);
    expect(versionInfo.major).to.equal(0);
    expect(versionInfo.minor).to.equal(0);
    expect(versionInfo.patch).to.equal(0);
  });

  it("should exit with error message if installed version is less than minimum supported version", () => {
    vi.mocked(getPlaywrightVersion).mockReturnValue("1.46.0");
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });

    expect(() => validatePlaywrightVersion()).to.throw();
    expect(exitStub).toHaveBeenCalledWith(1);
  });

  it("should be no-op if installed version is greater than minimum supported version (patch change)", () => {
    vi.mocked(getPlaywrightVersion).mockReturnValue("1.47.1");
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });

    expect(() => validatePlaywrightVersion()).not.to.throw();
    expect(exitStub).not.toHaveBeenCalled();
  });

  it("should be no-op if installed version is greater than minimum supported version (minor change)", () => {
    vi.mocked(getPlaywrightVersion).mockReturnValue("1.48.0");
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });

    expect(() => validatePlaywrightVersion()).not.to.throw();
    expect(exitStub).not.toHaveBeenCalled();
  });

  it("should be no-op if installed version is greater than minimum supported version (major change)", () => {
    vi.mocked(getPlaywrightVersion).mockReturnValue("2.0.0");
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });

    expect(() => validatePlaywrightVersion()).not.to.throw();
    expect(exitStub).not.toHaveBeenCalled();
  });

  it("should be no-op if installed version is equal to minimum supported version", () => {
    vi.mocked(getPlaywrightVersion).mockReturnValue(Constants.MinimumSupportedPlaywrightVersion);
    const exitStub = vi.mocked(process.exit).mockImplementation(() => {
      throw new Error();
    });

    expect(() => validatePlaywrightVersion()).not.to.throw();
    expect(exitStub).not.toHaveBeenCalled();
  });

  it("should return playwright version from env variable", async () => {
    const { getPlaywrightVersion: localGetPlaywrightVersion } = await vi.importActual<
      typeof import("../../src/utils/getPlaywrightVersion.js")
    >("../../src/utils/getPlaywrightVersion.js");
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.2.0";
    expect(localGetPlaywrightVersion()).to.equal("1.2.0");
  });

  it("should fetch playwright version and set it in env variable", async () => {
    const { getPlaywrightVersion: localGetPlaywrightVersion } = await vi.importActual<
      typeof import("../../src/utils/getPlaywrightVersion.js")
    >("../../src/utils/getPlaywrightVersion.js");
    const mockVersion = "1.2.3";
    delete process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION];
    vi.spyOn(packageManager, "getPackageManager").mockReturnValue({
      runCommand: vi.fn().mockReturnValue("echo"),
      getVersionFromStdout: vi.fn().mockReturnValue(mockVersion),
    });

    const version = localGetPlaywrightVersion();
    expect(version).to.equal(mockVersion);
    expect(process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]).to.equal(mockVersion);
  });

  it("should return region, domain and accountId from a valid service URL", async () => {
    const { populateValuesFromServiceUrl: localPopulateValuesFromServiceUrl } =
      await vi.importActual<typeof import("../../src/utils/utils.js")>("../../src/utils/utils.js");
    process.env["PLAYWRIGHT_SERVICE_URL"] =
      "wss://eastus.api.playwright.microsoft.com/workspaces/1234/browsers";

    const result = localPopulateValuesFromServiceUrl();
    expect(result).to.deep.equal({
      region: "eastus",
      domain: "playwright.microsoft.com",
      accountId: "1234",
    });

    delete process.env["PLAYWRIGHT_SERVICE_URL"];
  });
  describe("isValidGuid", () => {
    it("should return true for valid GUIDs", () => {
      const validGuids = [
        "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6",
        "f3a0f9c8-1b4b-4f44-9a77-062d8d418878",
        "00000000-0000-0000-0000-000000000000",
        "AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE",
      ];

      validGuids.forEach((guid) => {
        expect(isValidGuid(guid)).toBe(true);
      });
    });

    it("should return false for invalid GUIDs", () => {
      const invalidGuids = [
        "",
        "not-a-guid",
        "a1b2c3d4e5f647a8b9c0d1e2f3a4b5c6",
        "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5",
        "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6c",
      ];

      invalidGuids.forEach((guid) => {
        expect(isValidGuid(guid)).toBe(false);
      });
    });

    it("should handle undefined and null values", () => {
      expect(isValidGuid(undefined as unknown as string)).toBe(false);
      expect(isValidGuid(null as unknown as string)).toBe(false);
    });
  });
  it("should throw error when invalid GUID is provided in runId", () => {
    const invalidGuid = "not-a-valid-guid";

    expect(() => ValidateRunID(invalidGuid)).toThrow(
      "The Run ID must be a valid GUID format. Please provide a valid GUID for the Run ID.",
    );
  });

  it("should not throw error when valid GUID is provided in runId", () => {
    const validGuid = "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6";

    expect(() => ValidateRunID(validGuid)).not.toThrow();
  });
  it("should return null for an invalid service URL", async () => {
    const { populateValuesFromServiceUrl: localPopulateValuesFromServiceUrl } =
      await vi.importActual<typeof import("../../src/utils/utils.js")>("../../src/utils/utils.js");
    process.env["PLAYWRIGHT_SERVICE_URL"] = "invalid-url";

    const result = localPopulateValuesFromServiceUrl();
    expect(result).toBeNull();

    delete process.env["PLAYWRIGHT_SERVICE_URL"];
  });

  it("should return null if PLAYWRIGHT_SERVICE_URL is not set", async () => {
    const { populateValuesFromServiceUrl: localPopulateValuesFromServiceUrl } =
      await vi.importActual<typeof import("../../src/utils/utils.js")>("../../src/utils/utils.js");

    const result = localPopulateValuesFromServiceUrl();

    expect(result).toBeNull();
  });

  it("should return PR information when in GitHub PR context", async () => {
    // Save original env vars
    const originalEnv = { ...process.env };

    // Setup GitHub PR environment variables
    process.env["GITHUB_EVENT_NAME"] = "pull_request";
    process.env["GITHUB_REF_NAME"] = "123/merge";
    process.env["GITHUB_REPOSITORY"] = "Azure/test-repo";

    const ciInfo = {
      providerName: CI_PROVIDERS.GITHUB,
    };

    try {
      const result = await getRunName(ciInfo);
      expect(result).toBe("PR# 123 on Repo: Azure/test-repo (Azure/test-repo/pull/123)");
    } finally {
      // Restore env vars
      for (const key in process.env) {
        if (!originalEnv[key]) {
          delete process.env[key];
        } else {
          process.env[key] = originalEnv[key];
        }
      }
    }
  });

  it("should return git commit message when not in GitHub PR context", async () => {
    // Setup non-PR context
    const ciInfo = {
      providerName: CI_PROVIDERS.DEFAULT,
    };

    const result = await getRunName(ciInfo);
    expect(result).toBe("Test commit message");
  });

  it("should return empty string when not inside a git repository", async () => {
    const ciInfo = {
      providerName: CI_PROVIDERS.DEFAULT,
    };

    // Create a new mock implementation for this test only
    vi.mocked(childProcess.exec).mockImplementation(
      (command: any, options: any, callback?: any) => {
        // Handle the case where callback is the second argument
        const cb = typeof options === "function" ? options : callback;

        if (command === GitHubActionsConstants.GIT_VERSION_COMMAND) {
          setTimeout(() => cb(null, "git version 2.37.1", ""), 0);
        } else if (command === GitHubActionsConstants.GIT_REV_PARSE) {
          setTimeout(() => cb(null, "false", ""), 0); // Not inside a git repository
        } else {
          setTimeout(() => cb(new Error(`Command not mocked: ${command}`), "", ""), 0);
        }
        return {} as childProcess.ChildProcess;
      },
    );

    const result = await getRunName(ciInfo);
    expect(result).toBe("");

    // Restore the mock
    vi.resetAllMocks();
  });

  it("should return empty string when git command throws an error", async () => {
    const ciInfo = {
      providerName: CI_PROVIDERS.DEFAULT,
    };

    // Create a new mock implementation for this test only
    vi.mocked(childProcess.exec).mockImplementation(
      (command: any, options: any, callback?: any) => {
        // Handle the case where callback is the second argument
        const cb = typeof options === "function" ? options : callback;

        if (command === GitHubActionsConstants.GIT_VERSION_COMMAND) {
          setTimeout(() => cb(null, "git version 2.37.1", ""), 0);
        } else if (command === GitHubActionsConstants.GIT_REV_PARSE) {
          setTimeout(() => cb(null, "true", ""), 0);
        } else if (command === GitHubActionsConstants.GIT_COMMIT_MESSAGE_COMMAND) {
          setTimeout(() => cb(new Error("Command failed"), "", "stderr output"), 0);
        } else {
          setTimeout(() => cb(new Error(`Command not mocked: ${command}`), "", ""), 0);
        }
        return {} as childProcess.ChildProcess;
      },
    );

    const result = await getRunName(ciInfo);
    expect(result).toBe("");

    // Restore the mock
    vi.resetAllMocks();
  });
});
