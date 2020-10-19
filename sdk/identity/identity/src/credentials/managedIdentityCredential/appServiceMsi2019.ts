// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestPrepareOptions } from "@azure/core-http";
import { credentialLogger } from "../../util/logging";
import { MSI, MSIExpiresInParser } from "./models";

const logger = credentialLogger("ManagedIdentityCredential - AppServiceMSI 2019");

export const appServiceMsi2019: MSI = {
  async isAvailable(): Promise<boolean> {
    const env = process.env;
    return Boolean(env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER);
  },
  prepareRequestOptions(resource: string, clientId?: string): RequestPrepareOptions {
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
  getExpiresInParser(): MSIExpiresInParser | undefined {
    return (requestBody: any) => {
      // Parses a string representation of the seconds since epoch into a number value
      return Number(requestBody.expires_on);
    };
  }
};
