// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestPrepareOptions } from "@azure/core-http";
import { credentialLogger } from "../../util/logging";
import { MSI, MSIOptions, MSIExpiresInParser } from "./models";

const logger = credentialLogger("ManagedIdentityCredential - AppServiceMSI");

export type AppServiceMSIVersions = "2019-08-01" | "2017-09-01";
const validAppServiceMSIVersions: Array<AppServiceMSIVersions> = ["2019-08-01", "2017-09-01"];

export const appServiceMsi2019: MSI = {
  isAvailable(): boolean {
    const env = process.env;
    return Boolean(env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER);
  },
  prepareRequestOptions(options: MSIOptions): RequestPrepareOptions {
    const { resource, clientId } = options;

    logger.info(
      `Using the endpoint and the secret coming form the environment variables: IDENTITY_ENDPOINT=${process.env.IDENTITY_ENDPOINT} and IDENTITY_HEADER=[REDACTED].`
    );

    const queryParameters: any = {
      resource,
      "api-version": "2019-08-01"
    };

    if (clientId) {
      queryParameters.client_id = clientId;
    }

    return {
      url: process.env.IDENTITY_ENDPOINT,
      method: "GET",
      queryParameters,
      headers: {
        Accept: "application/json",
        "X-IDENTITY-HEADER": process.env.IDENTITY_HEADER
      }
    };
  },
  getExpiresInParser() {
    return (requestBody: any) => {
      // Parses a string representation of the seconds since epoch into a number value
      return Number(requestBody.expires_on);
    };
  }
};

export const appServiceMsi2017: MSI = {
  isAvailable(): boolean {
    const env = process.env;
    return Boolean(env.MSI_ENDPOINT && env.MSI_SECRET);
  },
  prepareRequestOptions(options: MSIOptions): RequestPrepareOptions {
    const { resource, clientId } = options;

    logger.info(
      `Using the endpoint and the secret coming form the environment variables: MSI_ENDPOINT=${process.env.MSI_ENDPOINT} and MSI_SECRET=[REDACTED].`
    );

    const queryParameters: any = {
      resource,
      "api-version": "2017-09-01"
    };

    if (clientId) {
      queryParameters.clientid = clientId;
    }

    return {
      url: process.env.MSI_ENDPOINT,
      method: "GET",
      queryParameters,
      headers: {
        Accept: "application/json",
        secret: process.env.MSI_SECRET
      }
    };
  },
  getExpiresInParser() {
    return (requestBody: any) => {
      // Parse a date format like "06/20/2019 02:57:58 +00:00" and
      // convert it into a JavaScript-formatted date
      return Date.parse(requestBody.expires_on);
    };
  }
};

export const appServiceMsiVersions: Record<AppServiceMSIVersions, MSI> = {
  "2019-08-01": appServiceMsi2019,
  "2017-09-01": appServiceMsi2017
};

function findAvailableAppServiceMSI(): MSI {
  return appServiceMsiVersions[
    validAppServiceMSIVersions.find((version) => appServiceMsiVersions[version].isAvailable())!
  ];
}

// TODO:
// The current Managed Identity Credential behavior checks for environment availability on each getToken.
// If we could check for environment availability on program load, we could just:
// const appServiceMsi = findAvailableAppServiceMSI();
export const appServiceMsi: MSI = {
  isAvailable(): boolean {
    return Boolean(
      validAppServiceMSIVersions.find((version) => appServiceMsiVersions[version].isAvailable())
    );
  },
  prepareRequestOptions(options: MSIOptions): RequestPrepareOptions {
    const { resource, clientId } = options;
    const msi = findAvailableAppServiceMSI();
    return msi.prepareRequestOptions({ resource, clientId });
  },
  getExpiresInParser(): MSIExpiresInParser {
    const msi = findAvailableAppServiceMSI();
    return msi.getExpiresInParser();
  }
};
