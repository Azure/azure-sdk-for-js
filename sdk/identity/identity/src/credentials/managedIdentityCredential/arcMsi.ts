// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createHttpHeaders,
  createPipelineRequest,
  PipelineRequestOptions
} from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { readFile } from "fs";
import { MSI, MSIConfiguration } from "./models";
import { credentialLogger } from "../../util/logging";
import { IdentityClient } from "../../client/identityClient";
import { mapScopesToResource, msiGenericGetToken } from "./utils";
import { azureArcAPIVersion } from "./constants";
import { AuthenticationError } from "../../client/errors";

const msiName = "ManagedIdentityCredential - Azure Arc MSI";
const logger = credentialLogger(msiName);

// Azure Arc MSI doesn't have a special expiresIn parser.
const expiresInParser = undefined;

function prepareRequestOptions(scopes: string | string[]): PipelineRequestOptions {
  const resource = mapScopesToResource(scopes);
  if (!resource) {
    throw new Error(`${msiName}: Multiple scopes are not supported.`);
  }
  const queryParameters: any = {
    resource,
    "api-version": azureArcAPIVersion
  };

  const query = new URLSearchParams(queryParameters);

  // This error should not bubble up, since we verify that this environment variable is defined in the isAvailable() method defined below.
  if (!process.env.IDENTITY_ENDPOINT) {
    throw new Error(`${msiName}: Missing environment variable: IDENTITY_ENDPOINT`);
  }

  return createPipelineRequest({
    // Should be similar to: http://localhost:40342/metadata/identity/oauth2/token
    url: `${process.env.IDENTITY_ENDPOINT}?${query.toString()}`,
    method: "GET",
    headers: createHttpHeaders({
      Accept: "application/json",
      Metadata: "true"
    })
  });
}

// Since "fs"'s readFileSync locks the thread, and to avoid extra dependencies.
function readFileAsync(path: string, options: { encoding: string }): Promise<string> {
  return new Promise((resolve, reject) =>
    readFile(path, options, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    })
  );
}

async function filePathRequest(
  identityClient: IdentityClient,
  requestPrepareOptions: PipelineRequestOptions
): Promise<string | undefined> {
  const response = await identityClient.sendRequest(createPipelineRequest(requestPrepareOptions));

  if (response.status !== 401) {
    let message = "";
    if (response.bodyAsText) {
      message = ` Response: ${response.bodyAsText}`;
    }
    throw new AuthenticationError(
      response.status,
      `${msiName}: To authenticate with Azure Arc MSI, status code 401 is expected on the first request. ${message}`
    );
  }

  const authHeader = response.headers.get("www-authenticate") || "";
  try {
    return authHeader.split("=").slice(1)[0];
  } catch (e) {
    throw Error(`Invalid www-authenticate header format: ${authHeader}`);
  }
}

export const arcMsi: MSI = {
  async isAvailable(scopes): Promise<boolean> {
    const resource = mapScopesToResource(scopes);
    if (!resource) {
      logger.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
      return false;
    }
    const result = Boolean(process.env.IMDS_ENDPOINT && process.env.IDENTITY_ENDPOINT);
    if (!result) {
      logger.info(
        `${msiName}: The environment variables needed are: IMDS_ENDPOINT and IDENTITY_ENDPOINT`
      );
    }
    return result;
  },
  async getToken(
    configuration: MSIConfiguration,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    const { identityClient, scopes, clientId } = configuration;

    logger.info(`${msiName}: Authenticating.`);

    if (clientId) {
      throw new Error(
        `${msiName}: User assigned identity is not supported by the Azure Arc Managed Identity Endpoint. To authenticate with the system assigned identity, omit the client id when constructing the ManagedIdentityCredential, or if authenticating with the DefaultAzureCredential ensure the AZURE_CLIENT_ID environment variable is not set.`
      );
    }

    const requestOptions = {
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      abortSignal: getTokenOptions.abortSignal,
      ...prepareRequestOptions(scopes),
      allowInsecureConnection: true
    };

    const filePath = await filePathRequest(identityClient, requestOptions);

    if (!filePath) {
      throw new Error(`${msiName}: Failed to find the token file.`);
    }

    const key = await readFileAsync(filePath, { encoding: "utf-8" });
    requestOptions.headers?.set("Authorization", `Basic ${key}`);

    return msiGenericGetToken(identityClient, requestOptions, expiresInParser, getTokenOptions);
  }
};
