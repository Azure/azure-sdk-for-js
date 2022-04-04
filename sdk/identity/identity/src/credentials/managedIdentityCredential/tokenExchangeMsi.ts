// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";
import {
  createHttpHeaders,
  createPipelineRequest,
  PipelineRequestOptions,
} from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { promisify } from "util";
import { DefaultAuthorityHost } from "../../constants";
import { credentialLogger } from "../../util/logging";
import { MSI, MSIConfiguration } from "./models";

const msiName = "ManagedIdentityCredential - Token Exchange";
const logger = credentialLogger(msiName);

const readFileAsync = promisify(fs.readFile);

/**
 * Generates the options used on the request for an access token.
 */
function prepareRequestOptions(
  scopes: string | string[],
  clientAssertion: string,
  clientId: string
): PipelineRequestOptions {
  const bodyParams: Record<string, string> = {
    scope: Array.isArray(scopes) ? scopes.join(" ") : scopes,
    client_assertion: clientAssertion,
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    client_id: clientId,
    grant_type: "client_credentials",
  };

  const urlParams = new URLSearchParams(bodyParams);
  const url = new URL(
    `${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
    process.env.AZURE_AUTHORITY_HOST ?? DefaultAuthorityHost
  );

  return {
    url: url.toString(),
    method: "POST",
    body: urlParams.toString(),
    headers: createHttpHeaders({
      Accept: "application/json",
    }),
  };
}

/**
 * Defines how to determine whether the token exchange MSI is available, and also how to retrieve a token from the token exchange MSI.
 */
export function tokenExchangeMsi(): MSI {
  const azureFederatedTokenFilePath = process.env.AZURE_FEDERATED_TOKEN_FILE;
  let azureFederatedTokenFileContent: string | undefined = undefined;
  let cacheDate: number | undefined = undefined;

  // Only reads from the assertion file once every 5 minutes
  async function readAssertion(): Promise<string> {
    // Cached assertions expire after 5 minutes
    if (cacheDate !== undefined && Date.now() - cacheDate >= 1000 * 60 * 5) {
      azureFederatedTokenFileContent = undefined;
    }
    if (!azureFederatedTokenFileContent) {
      const file = await readFileAsync(azureFederatedTokenFilePath!, "utf8");
      const value = file.trim();
      if (!value) {
        throw new Error(
          `No content on the file ${azureFederatedTokenFilePath}, indicated by the environment variable AZURE_FEDERATED_TOKEN_FILE`
        );
      } else {
        azureFederatedTokenFileContent = value;
        cacheDate = Date.now();
      }
    }
    return azureFederatedTokenFileContent;
  }

  return {
    async isAvailable({ clientId }): Promise<boolean> {
      const env = process.env;
      const result = Boolean(
        (clientId || env.AZURE_CLIENT_ID) && env.AZURE_TENANT_ID && azureFederatedTokenFilePath
      );
      if (!result) {
        logger.info(
          `${msiName}: Unavailable. The environment variables needed are: AZURE_CLIENT_ID (or the client ID sent through the parameters), AZURE_TENANT_ID and AZURE_FEDERATED_TOKEN_FILE`
        );
      }
      return result;
    },
    async getToken(
      configuration: MSIConfiguration,
      getTokenOptions: GetTokenOptions = {}
    ): Promise<AccessToken | null> {
      const { identityClient, scopes, clientId } = configuration;

      logger.info(`${msiName}: Using the client assertion coming from environment variables.`);

      let assertion: string;

      try {
        assertion = await readAssertion();
      } catch (err) {
        throw new Error(
          `${msiName}: Failed to read ${azureFederatedTokenFilePath}, indicated by the environment variable AZURE_FEDERATED_TOKEN_FILE`
        );
      }

      const request = createPipelineRequest({
        abortSignal: getTokenOptions.abortSignal,
        ...prepareRequestOptions(scopes, assertion, clientId || process.env.AZURE_CLIENT_ID!),
        // Generally, MSI endpoints use the HTTP protocol, without transport layer security (TLS).
        allowInsecureConnection: true,
      });
      const tokenResponse = await identityClient.sendTokenRequest(request);
      return (tokenResponse && tokenResponse.accessToken) || null;
    },
  };
}
