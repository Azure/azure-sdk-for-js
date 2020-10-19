// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestPrepareOptions } from "@azure/core-http";
import { credentialLogger } from "../../util/logging";
import { MSI, MSIExpiresInParser } from "./models";

const logger = credentialLogger("ManagedIdentityCredential - AppServiceMSI 2017");

export const appServiceMsi2017: MSI = {
  async isAvailable(): Promise<boolean> {
    const env = process.env;
    return Boolean(env.MSI_ENDPOINT && env.MSI_SECRET);
  },
  prepareRequestOptions(resource: string, clientId?: string): RequestPrepareOptions {
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
  getExpiresInParser(): MSIExpiresInParser | undefined {
    return (requestBody: any) => {
      // Parse a date format like "06/20/2019 02:57:58 +00:00" and
      // convert it into a JavaScript-formatted date
      return Date.parse(requestBody.expires_on);
    };
  }
};
