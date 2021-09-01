// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createHttpHeaders,
  createPipelineRequest,
  PipelineRequestOptions
} from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { readFile } from "fs";
import { MSI } from "./models";
import { credentialLogger } from "../../util/logging";
import { IdentityClient } from "../../client/identityClient";
import { msiGenericGetToken } from "./utils";
import { azureArcAPIVersion } from "./constants";
import { AuthenticationError } from "../../client/errors";

const logger = credentialLogger("ManagedIdentityCredential - ArcMSI");

// Azure Arc MSI doesn't have a special expiresIn parser.
const expiresInParser = undefined;

function prepareRequestOptions(resource?: string): PipelineRequestOptions {
  const queryParameters: any = {
    resource,
    "api-version": azureArcAPIVersion
  };

  const query = new URLSearchParams(queryParameters);

  // This error should not bubble up, since we verify that this environment variable is defined in the isAvailable() method defined below.
  if (!process.env.IDENTITY_ENDPOINT) {
    throw new Error("Missing environment variable: IDENTITY_ENDPOINT");
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
      `To authenticate with Azure Arc MSI, status code 401 is expected on the first request.${message}`
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
  async isAvailable(): Promise<boolean> {
    const result = Boolean(process.env.IMDS_ENDPOINT && process.env.IDENTITY_ENDPOINT);
    if (!result) {
      logger.info("The Azure Arc MSI is unavailable.");
    }
    return result;
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
      ...prepareRequestOptions(resource),
      allowInsecureConnection: true
    };

    const filePath = await filePathRequest(identityClient, requestOptions);

    if (!filePath) {
      throw new Error("Azure Arc MSI failed to find the token file.");
    }

    const key = await readFileAsync(filePath, { encoding: "utf-8" });
    requestOptions.headers?.set("Authorization", `Basic ${key}`);

    return msiGenericGetToken(identityClient, requestOptions, expiresInParser, getTokenOptions);
  }
};
