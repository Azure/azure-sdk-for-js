// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, RequestPrepareOptions } from "@azure/core-http";
import { IdentityClient } from "../../client/identityClient";
import { credentialLogger } from "../../util/logging";
import { MSI } from "./models";
import { msiGenericGetToken } from "./utils";

const logger = credentialLogger("ManagedIdentityCredential - AppServiceMSI 2017");

function expiresInParser(requestBody: any): number {
  // Parse a date format like "06/20/2019 02:57:58 +00:00" and
  // convert it into a JavaScript-formatted date
  return Date.parse(requestBody.expires_on);
}

function prepareRequestOptions(resource: string, clientId?: string): RequestPrepareOptions {
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
}

export const appServiceMsi2017: MSI = {
  async isAvailable(): Promise<boolean> {
    const env = process.env;
    return Boolean(env.MSI_ENDPOINT && env.MSI_SECRET);
  },
  async getToken(
    identityClient: IdentityClient,
    resource: string,
    clientId?: string,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    logger.info(
      `Using the endpoint and the secret coming form the environment variables: MSI_ENDPOINT=${process.env.MSI_ENDPOINT} and MSI_SECRET=[REDACTED].`
    );

    return msiGenericGetToken(
      identityClient,
      prepareRequestOptions(resource, clientId),
      expiresInParser,
      getTokenOptions
    );
  }
};
