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
const defaultArcMsiEndpoint = "http://localhost:40342/metadata/identity/oauth2/token";
const arcMsiEndpoint = process.env.IDENTITY_ENDPOINT || defaultArcMsiEndpoint;

// Azure Arc MSI doesn't have a special expiresIn parser.
const expiresInParser = undefined;

function prepareRequestOptions(resource?: string, clientId?: string): RequestPrepareOptions {
  const queryParameters: any = {
    resource,
    "api-version": azureArcAPIVersion
  };

  if (clientId) {
    queryParameters.client_id = clientId;
  }

  return {
    url: arcMsiEndpoint,
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
    throw new AuthenticationError(
      response.status,
      "To authenticate with Azure Arc MSI, status code 401 is expected on the first request."
    );
  }

  const authHeader = response.headers.get("www-authenticate") || "";
  return authHeader.split("=").slice(1)[0];
}

export const arcMsi: MSI = {
  async isAvailable(
    identityClient: IdentityClient,
    resource?: string,
    clientId?: string,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<boolean> {
    // To check that the Arc MSI is available, we confirm that we're able to read the token if requested.

    const requestOptions = {
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      abortSignal: getTokenOptions.abortSignal,
      spanOptions: getTokenOptions.tracingOptions && getTokenOptions.tracingOptions.spanOptions,
      ...prepareRequestOptions(resource, clientId)
    };

    return Boolean(await filePathRequest(identityClient, requestOptions));
  },
  async getToken(
    identityClient: IdentityClient,
    resource?: string,
    clientId?: string,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    logger.info(`Using the Azure Arc MSI to authenticate.`);

    const requestOptions = {
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      abortSignal: getTokenOptions.abortSignal,
      spanOptions: getTokenOptions.tracingOptions && getTokenOptions.tracingOptions.spanOptions,
      ...prepareRequestOptions(resource, clientId)
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
