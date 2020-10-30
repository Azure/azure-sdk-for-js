// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, RequestPrepareOptions } from "@azure/core-http";
import { IdentityClient } from "../../client/identityClient";
import { credentialLogger } from "../../util/logging";
import { MSI } from "./models";
import { msiGenericGetToken } from "./utils";

const logger = credentialLogger("ManagedIdentityCredential - AppServiceMSI 2019");

function expiresInParser(requestBody: any): number {
  // Parses a string representation of the seconds since epoch into a number value
  return Number(requestBody.expires_on);
}

function prepareRequestOptions(resource: string, clientId?: string): RequestPrepareOptions {
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
}

export const appServiceMsi2019: MSI = {
  async isAvailable(): Promise<boolean> {
    const env = process.env;
    return Boolean(env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER);
  },
  async getToken(
    identityClient: IdentityClient,
    resource: string,
    clientId?: string,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    logger.info(
      `Using the endpoint and the secret coming form the environment variables: IDENTITY_ENDPOINT=${process.env.IDENTITY_ENDPOINT} and IDENTITY_HEADER=[REDACTED].`
    );

    return msiGenericGetToken(
      identityClient,
      prepareRequestOptions(resource, clientId),
      expiresInParser,
      getTokenOptions
    );
  }
};
