// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createHttpHeaders,
  createPipelineRequest,
  PipelineRequestOptions
} from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { TokenResponseParsedBody } from "../../client/identityClient";
import { credentialLogger } from "../../util/logging";
import { MSI, MSIConfiguration } from "./models";
import { mapScopesToResource } from "./utils";

const msiName = "ManagedIdentityCredential - AppServiceMSI 2017";
const logger = credentialLogger(msiName);

/**
 * Formats the expiration date of the received token into the number of milliseconds between that date and midnight, January 1, 1970.
 */
function expiresOnParser(requestBody: TokenResponseParsedBody): number {
  // App Service always returns string expires_on values.
  return Date.parse(requestBody.expires_on! as string);
}

/**
 * Generates the options used on the request for an access token.
 */
function prepareRequestOptions(
  scopes: string | string[],
  clientId?: string
): PipelineRequestOptions {
  const resource = mapScopesToResource(scopes);
  if (!resource) {
    throw new Error(`${msiName}: Multiple scopes are not supported.`);
  }

  const queryParameters: Record<string, string> = {
    resource,
    "api-version": "2017-09-01"
  };

  if (clientId) {
    queryParameters.clientid = clientId;
  }

  const query = new URLSearchParams(queryParameters);

  // This error should not bubble up, since we verify that this environment variable is defined in the isAvailable() method defined below.
  if (!process.env.MSI_ENDPOINT) {
    throw new Error(`${msiName}: Missing environment variable: MSI_ENDPOINT`);
  }
  if (!process.env.MSI_SECRET) {
    throw new Error(`${msiName}: Missing environment variable: MSI_SECRET`);
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

/**
 * Defines how to determine whether the Azure App Service MSI is available, and also how to retrieve a token from the Azure App Service MSI.
 */
export const appServiceMsi2017: MSI = {
  async isAvailable(scopes): Promise<boolean> {
    const resource = mapScopesToResource(scopes);
    if (!resource) {
      logger.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
      return false;
    }
    const env = process.env;
    const result = Boolean(env.MSI_ENDPOINT && env.MSI_SECRET);
    if (!result) {
      logger.info(
        `${msiName}: Unavailable. The environment variables needed are: MSI_ENDPOINT and MSI_SECRET.`
      );
    }
    return result;
  },
  async getToken(
    configuration: MSIConfiguration,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    const { identityClient, scopes, clientId } = configuration;

    logger.info(
      `${msiName}: Using the endpoint and the secret coming form the environment variables: MSI_ENDPOINT=${process.env.MSI_ENDPOINT} and MSI_SECRET=[REDACTED].`
    );

    const request = createPipelineRequest({
      abortSignal: getTokenOptions.abortSignal,
      ...prepareRequestOptions(scopes, clientId),
      // Generally, MSI endpoints use the HTTP protocol, without transport layer security (TLS).
      allowInsecureConnection: true
    });
    const tokenResponse = await identityClient.sendTokenRequest(request, expiresOnParser);
    return (tokenResponse && tokenResponse.accessToken) || null;
  }
};
