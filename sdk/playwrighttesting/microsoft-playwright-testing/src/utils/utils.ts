// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { JwtPayload, VersionInfo } from "../common/types.js";
import {
  API_VERSION,
  Constants,
  InternalEnvironmentVariables,
  MINIMUM_SUPPORTED_PLAYWRIGHT_VERSION,
  ServiceEnvironmentVariable,
} from "../common/constants.js";
import { ServiceErrorMessageConstants } from "../common/messages.js";
import { coreLogger } from "../common/logger.js";
import type { TokenCredential } from "@azure/identity";
import ReporterUtils from "./reporterUtils.js";
import { CIInfoProvider } from "./cIInfoProvider.js";
import * as process from "node:process";
import { parseJwt } from "./parseJwt.js";
import { getPlaywrightVersion } from "./getPlaywrightVersion.js";
import { createEntraIdAccessToken } from "../common/entraIdAccessToken.js";

// Re-exporting for backward compatibility
export { getPlaywrightVersion } from "./getPlaywrightVersion.js";
export { parseJwt } from "./parseJwt.js";

export const exitWithFailureMessage = (error: { key: string; message: string }): never => {
  console.log();
  console.error(error.message);
  // eslint-disable-next-line n/no-process-exit
  process.exit(1);
};

export const populateValuesFromServiceUrl = (): { region: string; accountId: string } | null => {
  // Service URL format: wss://<region>.api.playwright.microsoft.com/accounts/<workspace-id>/browsers
  const url = process.env["PLAYWRIGHT_SERVICE_URL"]!;
  if (!ReporterUtils.isNullOrEmpty(url)) {
    const parts = url.split("/");

    if (parts.length > 2) {
      const subdomainParts = parts[2]!.split(".");
      const region = subdomainParts.length > 0 ? subdomainParts[0] : null;
      const accountId = parts[4];

      return { region: region!, accountId: accountId! };
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

export const getAndSetRunId = (): string => {
  const runId = ReporterUtils.getRunId(CIInfoProvider.getCIInfo());
  process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] = runId;
  return runId;
};

export const getServiceWSEndpoint = (runId: string, os: string): string => {
  return `${getServiceBaseURL()}?runId=${encodeURIComponent(runId)}&os=${os}&api-version=${API_VERSION}`;
};

export const validateServiceUrl = (): void => {
  const serviceUrl = getServiceBaseURL();
  if (!serviceUrl) {
    exitWithFailureMessage(ServiceErrorMessageConstants.NO_SERVICE_URL_ERROR);
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
    const claims = parseJwt<JwtPayload>(accessToken!);
    if (!claims.exp) {
      validationFailureCallback(ServiceErrorMessageConstants.INVALID_MPT_PAT_ERROR);
    }
    if (Date.now() >= claims.exp! * 1000) {
      validationFailureCallback(ServiceErrorMessageConstants.EXPIRED_MPT_PAT_ERROR);
    }
    if (result!.accountId !== claims!.aid) {
      validationFailureCallback(ServiceErrorMessageConstants.WORKSPACE_MISMATCH_ERROR);
    }
  } catch (err) {
    coreLogger.error(err);
    exitWithFailureMessage(ServiceErrorMessageConstants.INVALID_MPT_PAT_ERROR);
  }
};
const isTokenExpiringSoon = (expirationTime: number, currentTime: number): boolean => {
  return expirationTime * 1000 - currentTime <= Constants.sevenDaysInMs;
};

const warnAboutTokenExpiry = (expirationTime: number, currentTime: number): void => {
  const daysToExpiration = Math.ceil((expirationTime * 1000 - currentTime) / Constants.oneDayInMs);
  const expirationDate = new Date(expirationTime * 1000).toLocaleDateString();
  const expirationWarning = `Warning: The access token used for this test run will expire in ${daysToExpiration} days on ${expirationDate}. Generate a new token from the portal to avoid failures. For a simpler, more secure solution, switch to Microsoft Entra ID and eliminate token management. https://learn.microsoft.com/en-us/entra/identity/`;
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

export const emitReportingUrl = (): void => {
  const regex =
    /wss:\/\/([\w-]+)\.api\.(playwright(?:-test|-int)?\.io|playwright\.microsoft\.com)\//;
  const url = getServiceBaseURL();
  const match = url?.match(regex);
  if (match && match.length >= 3) {
    const [, region, domain] = match;
    process.env[InternalEnvironmentVariables.MPT_SERVICE_REPORTING_URL] =
      `https://${region}.reporting.api.${domain}`;
  }
};

export const getPackageVersion = (): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const version = require("../../package.json").version;
    return version;
  } catch (error) {
    console.error("Error fetching package version:", error);
    return "unknown version";
  }
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
  const minimumSupportedVersion = MINIMUM_SUPPORTED_PLAYWRIGHT_VERSION;
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
