// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { JwtPayload } from "../common/types";
import { API_VERSION, ServiceEnvironmentVariable } from "../common/constants";
import { ServiceErrorMessageConstants } from "../common/messages";
import { EntraIdAccessToken } from "../common/entraIdAccessToken";
import { coreLogger } from "../common/logger";
import type { TokenCredential } from "@azure/identity";
import ReporterUtils from "./reporterUtils";
import { CIInfoProvider } from "./cIInfoProvider";

export const exitWithFailureMessage = (message: string): never => {
  console.log();
  console.error(message);
  process.exit(1);
};

export const base64UrlDecode = (base64Url: string): string => {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const buffer = Buffer.from(base64, "base64");
  return buffer.toString("utf-8");
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

export const getDefaultRunId = (): string => {
  const runId = ReporterUtils.getRunId(CIInfoProvider.getCIInfo());
  process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_RUN_ID] = runId;
  return runId;
};

export const getServiceWSEndpoint = (runId: string, os: string): string => {
  return `${getServiceBaseURL()}?runId=${runId}&os=${os}&api-version=${API_VERSION}`;
};

export const validateServiceUrl = (): void => {
  const serviceUrl = getServiceBaseURL();
  if (!serviceUrl) {
    exitWithFailureMessage(ServiceErrorMessageConstants.NO_SERVICE_URL_ERROR);
  }
};

export const validateMptPAT = (): void => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      exitWithFailureMessage(ServiceErrorMessageConstants.NO_AUTH_ERROR);
    }
    const claims = parseJwt<JwtPayload>(accessToken!);
    if (!claims.exp) {
      exitWithFailureMessage(ServiceErrorMessageConstants.INVALID_MPT_PAT_ERROR);
    }
    if (Date.now() >= claims.exp! * 1000) {
      exitWithFailureMessage(ServiceErrorMessageConstants.EXPIRED_MPT_PAT_ERROR);
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
    throw new Error(ServiceErrorMessageConstants.NO_AUTH_ERROR);
  }
  return getAccessToken()!;
};

export const emitReportingUrl = (): void => {
  const regex =
    /wss:\/\/([\w-]+)\.api\.(playwright(?:-test|-int)?\.io|playwright\.microsoft\.com)\//;
  const url = getServiceBaseURL();
  const match = url?.match(regex);
  if (match && match.length >= 3) {
    const [_, region, domain] = match;
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_REPORTING_URL] =
      `https://${region}.reporting.api.${domain}`;
  }
};
