// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, RequestPrepareOptions } from "@azure/core-http";
import { MSI } from "./models";
import { credentialLogger } from "../../util/logging";
import { IdentityClient } from "../../client/identityClient";
import { msiGenericGetToken } from "./utils";
import { azureArcAPIVersion } from "./constants";
import { AuthenticationError } from "../../client/errors";
import { readFile } from "fs";

const logger = credentialLogger("ManagedIdentityCredential - ArcMSI");

// Azure Arc MSI doesn't have a special expiresIn parser.
const expiresInParser = undefined;

function prepareRequestOptions(resource?: string): RequestPrepareOptions {
  const queryParameters: any = {
    resource,
    "api-version": azureArcAPIVersion
  };

  return {
    // Should be similar to: http://localhost:40342/metadata/identity/oauth2/token
    url: process.env.IDENTITY_ENDPOINT,
    method: "GET",
    queryParameters,
    headers: {
      Accept: "application/json",
      Metadata: true
    }
  };
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
  requestPrepareOptions: RequestPrepareOptions
): Promise<string | undefined> {
  const response = await identityClient.sendRequest(
    identityClient.createWebResource(requestPrepareOptions)
  );

  if (response.status !== 401) {
    let message = "";
    if (response.bodyAsText) {
      message = ` Response: ${response.bodyAsText}`;
    }
    throw new AuthenticationError(
      response.status,
      `To authenticate with Azure Arc MSI, status code 401 is expected on the first request.${message}`
    );
  }

  const authHeader = response.headers.get("www-authenticate") || "";
  return authHeader.split("=").slice(1)[0];
}

export const arcMsi: MSI = {
  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.IMDS_ENDPOINT && process.env.IDENTITY_ENDPOINT);
  },
  async getToken(
    identityClient: IdentityClient,
    resource?: string,
    clientId?: string,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    logger.info(`Using the Azure Arc MSI to authenticate.`);

    if (clientId) {
      throw new Error(
        "User assigned identity is not supported by the Azure Arc Managed Identity Endpoint. To authenticate with the system assigned identity omit the client id when constructing the ManagedIdentityCredential, or if authenticating with the DefaultAzureCredential ensure the AZURE_CLIENT_ID environment variable is not set."
      );
    }

    const requestOptions = {
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      abortSignal: getTokenOptions.abortSignal,
      spanOptions: getTokenOptions.tracingOptions && getTokenOptions.tracingOptions.spanOptions,
      ...prepareRequestOptions(resource)
    };

    const filePath = await filePathRequest(identityClient, requestOptions);

    if (!filePath) {
      throw new Error("Azure Arc MSI failed to find the token file.");
    }

    const key = await readFileAsync(filePath, { encoding: "utf-8" });
    requestOptions.headers!["Authorization"] = `Basic ${key}`;

    return msiGenericGetToken(identityClient, requestOptions, expiresInParser, getTokenOptions);
  }
};
