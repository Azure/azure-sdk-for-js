// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessTokenClaims, VersionInfo, JwtPayload, RunConfig } from "../common/types.js";
import {
  Constants,
  InternalEnvironmentVariables,
  ServiceEnvironmentVariable,
  RunConfigConstants,
  GitHubActionsConstants,
} from "../common/constants.js";
import { ServiceErrorMessageConstants } from "../common/messages.js";
import { coreLogger } from "../common/logger.js";
import type { TokenCredential } from "@azure/core-auth";
import process from "node:process";
import { randomUUID } from "node:crypto";
import { parseJwt } from "./parseJwt.js";
import { getPlaywrightVersion } from "./getPlaywrightVersion.js";
import { createEntraIdAccessToken } from "../common/entraIdAccessToken.js";
import { FullConfig } from "@playwright/test";
import { CI_PROVIDERS, CIInfo } from "./cIInfoProvider.js";
import { exec } from "child_process";
import { getPackageVersionFromFolder } from "./getPackageVersion.js";

// Re-exporting for backward compatibility
export { getPlaywrightVersion } from "./getPlaywrightVersion.js";
export { parseJwt } from "./parseJwt.js";

export const getPackageVersion = (): string => {
  // hacky way to get package version
  // try from dist folder first (customer perspective)
  const distVersion = getPackageVersionFromFolder("../../../");
  if (distVersion) {
    return distVersion;
  }
  // if not found, try from src folder (internal test suite)
  const srcVersion = getPackageVersionFromFolder("../../");
  if (srcVersion) {
    return srcVersion;
  }
  return "unknown-version";
};

// const playwrightServiceConfig = new PlaywrightServiceConfig();

export const exitWithFailureMessage = (
  error: {
    key: string;
    message: string;
    formatWithErrorDetails?: (errorDetails: string) => string;
  },
  errorDetails?: string,
): never => {
  console.log();

  if (error.formatWithErrorDetails && errorDetails) {
    console.error(error.formatWithErrorDetails(errorDetails));
  } else {
    console.error(error.message);
  }

  // eslint-disable-next-line n/no-process-exit
  process.exit(1);
};

export const populateValuesFromServiceUrl = (): {
  region: string;
  domain: string;
  accountId: string;
} | null => {
  // Service URL format: wss://<region>.api.playwright.microsoft.com/accounts/<workspace-id>/browsers
  const url = process.env["PLAYWRIGHT_SERVICE_URL"]!;
  if (url) {
    const parts = url.split("/");

    if (parts.length > 2) {
      const subdomainParts = parts[2]!.split(".");
      const region = subdomainParts.length > 0 ? subdomainParts[0] : null;
      const domain = subdomainParts.slice(2).join(".");
      const accountId = parts[4];

      return { region: region!, domain: domain!, accountId: accountId! };
    }
  }
  return null;
};

export const getAccessToken = (): string | undefined => {
  return process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
};

export const getServiceBaseURL = (): string | undefined => {
  return process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
};

export const isValidGuid = (guid: string | null | undefined): boolean => {
  if (!guid) {
    return false;
  }
  const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return guidRegex.test(guid);
};

export const getAndSetRunId = (): string => {
  const runId = randomUUID();
  process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] = runId;
  return runId;
};

export const getServiceWSEndpoint = (runId: string, os: string, apiVersion: string): string => {
  return `${getServiceBaseURL()}?runId=${encodeURIComponent(runId)}&os=${os}&api-version=${apiVersion}`;
};

export const validateServiceUrl = (): void => {
  const serviceUrl = getServiceBaseURL();
  if (!serviceUrl) {
    exitWithFailureMessage(ServiceErrorMessageConstants.NO_SERVICE_URL_ERROR);
  }
};

export const ValidateRunID = (runID: string): void => {
  const isValidRunID = isValidGuid(runID);
  if (!isValidRunID) {
    const errorMessage = ServiceErrorMessageConstants.INVALID_RUN_ID_FORMAT.message;
    throw new Error(errorMessage);
  }
};
export const validateMptPAT = (
  validationFailureCallback: (error: { key: string; message: string }) => void,
): void => {
  try {
    const accessToken = getAccessToken();
    const result = populateValuesFromServiceUrl();
    if (!accessToken) {
      validationFailureCallback(ServiceErrorMessageConstants.NO_AUTH_ERROR);
    }
    const claims = parseJwt<Partial<AccessTokenClaims>>(accessToken!);
    if (!claims.exp) {
      validationFailureCallback(ServiceErrorMessageConstants.INVALID_MPT_PAT_ERROR);
    }
    if (Date.now() >= claims.exp! * 1000) {
      validationFailureCallback(ServiceErrorMessageConstants.EXPIRED_MPT_PAT_ERROR);
    }
    if (result!.accountId !== claims!.pwid) {
      validationFailureCallback(ServiceErrorMessageConstants.WORKSPACE_MISMATCH_ERROR);
    }
  } catch (err) {
    coreLogger.error(err);
    exitWithFailureMessage(ServiceErrorMessageConstants.INVALID_MPT_PAT_ERROR);
  }
};
const isTokenExpiringSoon = (expirationTime: number, currentTime: number): boolean => {
  return expirationTime * 1000 - currentTime <= Constants.SevenDaysInMS;
};

const warnAboutTokenExpiry = (expirationTime: number, currentTime: number): void => {
  const daysToExpiration = Math.ceil((expirationTime * 1000 - currentTime) / Constants.OneDayInMS);
  const expirationDate = new Date(expirationTime * 1000).toLocaleDateString();
  const expirationWarning = `Warning: The access token used for this test run will expire in ${daysToExpiration} days on ${expirationDate}. Generate a new token from the portal to avoid failures. For a simpler, more secure solution, switch to Microsoft Entra ID and eliminate token management. https://learn.microsoft.com/entra/identity/`;
  console.warn(expirationWarning);
};

export const warnIfAccessTokenCloseToExpiry = (): void => {
  const accessToken = getAccessToken();
  const claims = parseJwt<JwtPayload>(accessToken!);
  const currentTime = Date.now();
  if (isTokenExpiringSoon(claims.exp!, currentTime)) {
    warnAboutTokenExpiry(claims.exp!, currentTime);
  }
};

export const fetchOrValidateAccessToken = async (credential?: TokenCredential): Promise<string> => {
  const entraIdAccessToken = createEntraIdAccessToken(credential);
  if (entraIdAccessToken.token && entraIdAccessToken.doesEntraIdAccessTokenNeedRotation()) {
    await entraIdAccessToken.fetchEntraIdAccessToken();
  }
  if (!getAccessToken()) {
    throw new Error(ServiceErrorMessageConstants.NO_AUTH_ERROR.message);
  }
  return getAccessToken()!;
};

export const getVersionInfo = (version: string): VersionInfo => {
  const regex = /^(\d+)(?:\.(\d+))?(?:\.(\d+))?/;
  const match = version.match(regex);
  const versionInfo = {
    major: 0,
    minor: 0,
    patch: 0,
  };
  versionInfo.major = match && match[1] ? parseInt(match[1], 10) : 0;
  versionInfo.minor = match && match[2] ? parseInt(match[2], 10) : 0;
  versionInfo.patch = match && match[3] ? parseInt(match[3], 10) : 0;
  return versionInfo;
};

export const validatePlaywrightVersion = (): void => {
  const minimumSupportedVersion = Constants.MinimumSupportedPlaywrightVersion;
  const installedVersion = getPlaywrightVersion();

  const minimumSupportedVersionInfo = getVersionInfo(minimumSupportedVersion);
  const installedVersionInfo = getVersionInfo(installedVersion);

  const isInstalledVersionGreater =
    installedVersionInfo.major > minimumSupportedVersionInfo.major ||
    (installedVersionInfo.major === minimumSupportedVersionInfo.major &&
      installedVersionInfo.minor >= minimumSupportedVersionInfo.minor);
  if (!isInstalledVersionGreater) {
    exitWithFailureMessage(ServiceErrorMessageConstants.INVALID_PLAYWRIGHT_VERSION_ERROR);
  }
};

export const getTestRunConfig = (config: FullConfig): RunConfig => {
  const maxWorkers = config.workers || config.metadata.actualWorkers;
  const frameWorkVersion = config.version;

  const testRunConfig: RunConfig = {
    framework: {
      name: RunConfigConstants.TEST_FRAMEWORK_NAME,
      version: frameWorkVersion,
      runnerName: RunConfigConstants.TEST_FRAMEWORK_RUNNERNAME,
    },
    sdkLanguage: RunConfigConstants.TEST_SDK_LANGUAGE,
    maxWorkers: maxWorkers,
  };
  return testRunConfig;
};

export function getTestRunApiUrl(): string {
  const result = populateValuesFromServiceUrl();
  const runId = process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];

  if (!result?.region || !result?.domain || !result?.accountId) {
    exitWithFailureMessage(ServiceErrorMessageConstants.NO_SERVICE_URL_ERROR);
  }
  const baseUrl = `https://${result?.region}.reporting.api.${result?.domain}/playwrightworkspaces/${result?.accountId}/test-runs`;
  const url = runId ? `${baseUrl}/${runId}` : baseUrl;

  return `${url}?api-version=${Constants.LatestAPIVersion}`;
}

export function isNullOrEmpty(str: string | null | undefined): boolean {
  return !str || str.trim() === "";
}

async function runCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(new Error(stderr));
        return;
      }
      resolve(stdout.trim());
    });
  });
}

export async function getRunName(ciInfo: CIInfo): Promise<string> {
  if (
    ciInfo.providerName === CI_PROVIDERS.GITHUB &&
    process.env["GITHUB_EVENT_NAME"] === "pull_request"
  ) {
    const prNumber: string = `${process.env["GITHUB_REF_NAME"]?.split("/")[0]}`;
    const prLink: string = `${process.env["GITHUB_REPOSITORY"]}/pull/${prNumber}`;
    return `PR# ${prNumber} on Repo: ${process.env["GITHUB_REPOSITORY"]} (${prLink})`;
  }

  try {
    const gitVersion = await runCommand(GitHubActionsConstants.GIT_VERSION_COMMAND);
    if (isNullOrEmpty(gitVersion)) {
      throw new Error("Git is not installed on the machine");
    }
    const isInsideWorkTree = await runCommand(GitHubActionsConstants.GIT_REV_PARSE);
    if (isInsideWorkTree !== "true") {
      throw new Error("Not inside a git repository");
    }
    const gitCommitMessage = await runCommand(GitHubActionsConstants.GIT_COMMIT_MESSAGE_COMMAND);
    return gitCommitMessage;
  } catch (err) {
    coreLogger.error(`Error in getting git commit message: ${err}.`);
    return "";
  }
}

export function extractErrorMessage(responseBody: string): string {
  if (!responseBody) {
    return "";
  }

  try {
    const errorResponse = JSON.parse(responseBody);
    if (errorResponse.error && errorResponse.error.message) {
      return errorResponse.error.message;
    }
    return responseBody;
  } catch (e) {
    return responseBody;
  }
}
