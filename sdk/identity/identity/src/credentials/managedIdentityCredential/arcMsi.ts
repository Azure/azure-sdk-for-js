// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, RequestPrepareOptions } from "@azure/core-http";
import { MSI } from "./models";
import { credentialLogger } from "../../util/logging";
import { IdentityClient } from "../../client/identityClient";
import { msiGenericGetToken } from "./utils";
import { azureArcAPIVersion, imdsApiVersion, imdsEndpoint } from "./constants";
import { AuthenticationError } from "../../client/errors";
import { readFile } from "fs";

const logger = credentialLogger("ManagedIdentityCredential - ArcMSI");

function expiresInParser(requestBody: any) {
  if (requestBody.expires_on) {
    // Use the expires_on timestamp if it's available
    const expires = +requestBody.expires_on * 1000;
    logger.info(`IMDS using expires_on: ${expires} (original value: ${requestBody.expires_on})`);
    return expires;
  } else {
    // If these aren't possible, use expires_in and calculate a timestamp
    const expires = Date.now() + requestBody.expires_in * 1000;
    logger.info(`IMDS using expires_in: ${expires} (original value: ${requestBody.expires_in})`);
    return expires;
  }
}

function prepareRequestOptions(resource?: string, clientId?: string): RequestPrepareOptions {
  const queryParameters: any = {
    resource,
    "api-version": azureArcAPIVersion
  };

  if (clientId) {
    queryParameters.client_id = clientId;
  }

  return {
    url: imdsEndpoint,
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

export const arcMsi: MSI = {
  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.IMDS_ENDPOINT);
  },
  async getToken(
    identityClient: IdentityClient,
    resource?: string,
    clientId?: string,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    logger.info(
      `Using the IMDS endpoint coming form the environment variable MSI_ENDPOINT=${process.env.IMDS_ENDPOINT}, and using the Azure Arc MSI to authenticate.`
    );

    const endpoint = process.env.IMDS_ENDPOINT;
    const requestOptions = prepareRequestOptions(resource, clientId);

    const webResource = identityClient.createWebResource({
      url: endpoint,
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      abortSignal: getTokenOptions.abortSignal,
      spanOptions: getTokenOptions.tracingOptions && getTokenOptions.tracingOptions.spanOptions,
      ...requestOptions
    });

    const response = await identityClient.sendRequest(webResource);

    if (response.status !== 401) {
      throw new AuthenticationError(
        response.status,
        "To authenticate with Azure Arc MSI, status code 401 is expected on the first request."
      );
    }

    const authHeader = response.parsedHeaders!["WWW-Authenticate"];
    const fileValue = authHeader.split("=").slice(1)[0];

    if (!authHeader || !fileValue) {
      throw new AuthenticationError(
        response.status,
        "To authenticate with Azure Arc MSI, the first request must return a valid WWW-Authenticate header."
      );
    }

    const key = await readFileAsync(fileValue, { encoding: "utf-8" });
    requestOptions.headers!["WWW-Authenticate"] = `Basic ${key}`;

    return msiGenericGetToken(identityClient, requestOptions, expiresInParser, getTokenOptions);
  }
};
