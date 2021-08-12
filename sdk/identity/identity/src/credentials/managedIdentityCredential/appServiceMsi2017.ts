// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHttpHeaders, PipelineRequestOptions } from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
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

function prepareRequestOptions(resource: string, clientId?: string): PipelineRequestOptions {
  const queryParameters: any = {
    resource,
    "api-version": "2017-09-01"
  };

  if (clientId) {
    queryParameters.clientid = clientId;
  }

  const query = new URLSearchParams(queryParameters);

  // This error should not bubble up, since we verify that this environment variable is defined in the isAvailable() method defined below.
  if (!process.env.MSI_ENDPOINT) {
    throw new Error("Missing environment variable: MSI_ENDPOINT");
  }
  if (!process.env.MSI_SECRET) {
    throw new Error("Missing environment variable: MSI_SECRET");
  }

  return {
    url: `${process.env.MSI_ENDPOINT}?${query.toString()}`,
    method: "GET",
    headers: createHttpHeaders({
      Accept: "application/json",
      secret: process.env.MSI_SECRET
    })
  };
}

export const appServiceMsi2017: MSI = {
  async isAvailable(): Promise<boolean> {
    const env = process.env;
    const result = Boolean(env.MSI_ENDPOINT && env.MSI_SECRET);
    if (!result) {
      logger.info("The Azure App Service MSI 2017 is unavailable.");
    }
    return result;
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
