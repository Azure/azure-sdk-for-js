// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createHttpHeaders,
  createPipelineRequest,
  PipelineRequestOptions,
} from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { TokenResponseParsedBody } from "../../client/identityClient";
import { credentialLogger } from "../../util/logging";
import { MSI, MSIConfiguration } from "./models";
import { mapScopesToResource } from "./utils";

const msiName = "ManagedIdentityCredential - AppServiceMSI 2019";
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
  clientId?: string,
  resourceId?: string
): PipelineRequestOptions {
  const resource = mapScopesToResource(scopes);
  if (!resource) {
    throw new Error(`${msiName}: Multiple scopes are not supported.`);
  }

  const queryParameters: Record<string, string> = {
    resource,
    "api-version": "2019-08-01",
  };

  if (clientId) {
    queryParameters.client_id = clientId;
  }

  if (resourceId) {
    queryParameters.mi_res_id = resourceId;
  }
  const query = new URLSearchParams(queryParameters);

  // This error should not bubble up, since we verify that this environment variable is defined in the isAvailable() method defined below.
  if (!process.env.IDENTITY_ENDPOINT) {
    throw new Error(`${msiName}: Missing environment variable: IDENTITY_ENDPOINT`);
  }
  if (!process.env.IDENTITY_HEADER) {
    throw new Error(`${msiName}: Missing environment variable: IDENTITY_HEADER`);
  }

  return {
    url: `${process.env.IDENTITY_ENDPOINT}?${query.toString()}`,
    method: "GET",
    headers: createHttpHeaders({
      Accept: "application/json",
      "X-IDENTITY-HEADER": process.env.IDENTITY_HEADER,
    }),
  };
}

/**
 * Defines how to determine whether the Azure App Service MSI is available, and also how to retrieve a token from the Azure App Service MSI.
 */
export const appServiceMsi2019: MSI = {
  async isAvailable({ scopes }): Promise<boolean> {
    const resource = mapScopesToResource(scopes);
    if (!resource) {
      logger.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
      return false;
    }
    const env = process.env;
    const result = Boolean(env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER);
    if (!result) {
      logger.info(
        `${msiName}: Unavailable. The environment variables needed are: IDENTITY_ENDPOINT and IDENTITY_HEADER.`
      );
    }
    return result;
  },
  async getToken(
    configuration: MSIConfiguration,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    const { identityClient, scopes, clientId, resourceId } = configuration;

    logger.info(
      `${msiName}: Using the endpoint and the secret coming form the environment variables: IDENTITY_ENDPOINT=${process.env.IDENTITY_ENDPOINT} and IDENTITY_HEADER=[REDACTED].`
    );

    const request = createPipelineRequest({
      abortSignal: getTokenOptions.abortSignal,
      ...prepareRequestOptions(scopes, clientId, resourceId),
      // Generally, MSI endpoints use the HTTP protocol, without transport layer security (TLS).
      allowInsecureConnection: true,
    });
    const tokenResponse = await identityClient.sendTokenRequest(request, expiresOnParser);
    return (tokenResponse && tokenResponse.accessToken) || null;
  },
};
