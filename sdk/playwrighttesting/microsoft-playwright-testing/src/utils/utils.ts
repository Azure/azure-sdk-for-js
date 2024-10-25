// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { JwtPayload, VersionInfo } from "../common/types";
import {
  API_VERSION,
  InternalEnvironmentVariables,
  MINIMUM_SUPPORTED_PLAYWRIGHT_VERSION,
  ServiceEnvironmentVariable,
} from "../common/constants";
import { ServiceErrorMessageConstants } from "../common/messages";
import { EntraIdAccessToken } from "../common/entraIdAccessToken";
import { coreLogger } from "../common/logger";
import type { TokenCredential } from "@azure/identity";
import ReporterUtils from "./reporterUtils";
import { CIInfoProvider } from "./cIInfoProvider";
import { getPackageManager } from "./packageManager";
import { execSync } from "child_process";

export const exitWithFailureMessage = (error: { key: string; message: string }): never => {
  console.log();
  console.error(error.message);
  // eslint-disable-next-line n/no-process-exit
  process.exit(1);
};
export const base64UrlDecode = (base64Url: string): string => {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const buffer = Buffer.from(base64, "base64");
  return buffer.toString("utf-8");
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
export const parseJwt = <T = JwtPayload>(token: string): T => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT token.");
  }
  const payload = base64UrlDecode(parts[1]!);
  return JSON.parse(payload) as T;
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

export const getServiceWSEndpoint = (runId: string, runName: string, os: string): string => {
  return `${getServiceBaseURL()}?runId=${encodeURIComponent(runId)}&runName=${encodeURIComponent(runName)}&os=${os}&api-version=${API_VERSION}`;
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

export const fetchOrValidateAccessToken = async (credential?: TokenCredential): Promise<string> => {
  const entraIdAccessToken = new EntraIdAccessToken(credential);
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
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_REPORTING_URL] =
      `https://${region}.reporting.api.${domain}`;
  }
};

export const getPlaywrightVersion = (): string => {
  if (process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]) {
    return process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]!;
  }

  const packageManager = getPackageManager();
  const command = packageManager.runCommand("playwright", "--version");
  const stdout = execSync(command).toString().trim();
  const version = packageManager.getVersionFromStdout(stdout);
  process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = version;
  coreLogger.info(
    `Playwright version being used - ${process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]}`,
  );
  return process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]!;
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
