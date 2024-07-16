// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import dotenv from "dotenv";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { API_VERSION, ServiceEnvironmentVariable } from "../common/constants";
import { ServiceErrorMessageConstants } from "../common/messages";
import { EntraIdAccessToken } from "../common/entraIdAccessToken";
import playwrightServiceDebugLogger from "../common/debugLogger";
import type { TokenCredential } from "@azure/identity";
import ReporterUtils from "./reporterUtils";
import { CIInfoProvider } from "./cIInfoProvider";
dotenv.config();

export const exitWithFailureMessage = (message: string): never => {
  console.log();
  console.error(message);
  process.exit(1);
};

export const getAccessToken = (): string => {
  return process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
};

export const getServiceBaseURL = (): string => {
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
    const claims = jwtDecode(accessToken) as JwtPayload;
    if (!claims.exp) {
      exitWithFailureMessage(ServiceErrorMessageConstants.INVALID_MPT_PAT_ERROR);
    }
    if (Date.now() >= claims.exp! * 1000) {
      exitWithFailureMessage(ServiceErrorMessageConstants.EXPIRED_MPT_PAT_ERROR);
    }
  } catch (err) {
    playwrightServiceDebugLogger(err);
    exitWithFailureMessage(ServiceErrorMessageConstants.INVALID_MPT_PAT_ERROR);
  }
};

export const fetchOrValidateAccessToken = async (
  credential: TokenCredential = null,
): Promise<string> => {
  const entraIdAccessToken = new EntraIdAccessToken(credential);
  if (entraIdAccessToken.token && entraIdAccessToken.doesEntraIdAccessTokenNeedRotation()) {
    await entraIdAccessToken.fetchEntraIdAccessToken();
  }
  if (!getAccessToken()) {
    throw new Error(ServiceErrorMessageConstants.NO_AUTH_ERROR);
  }
  return getAccessToken();
};

export const emitReportingUrl = (): void => {
  const regex =
    /wss:\/\/(?<region>[\w-]+)\.api\.(?<domain>playwright(?:-test|-int)?\.io|playwright\.microsoft\.com)\//;
  const url = getServiceBaseURL();
  const match = url.match(regex);
  if (match && match.groups) {
    const { region, domain } = match.groups;
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_REPORTING_URL] =
      `https://${region}.reporting.api.${domain}`;
  }
};
