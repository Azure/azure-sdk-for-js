// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHttpHeaders, PipelineRequestOptions } from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { MSI, MSIConfiguration } from "./models";
import { credentialLogger } from "../../util/logging";
import { mapScopesToResource, msiGenericGetToken } from "./utils";
import { azureFabricVersion } from "./constants";

const msiName = "ManagedIdentityCredential - Fabric MSI";
const logger = credentialLogger(msiName);

function expiresInParser(requestBody: any): number {
  // Parses a string representation of the seconds since epoch into a number value
  return Number(requestBody.expires_on);
}

function prepareRequestOptions(
  scopes: string | string[],
  clientId?: string
): PipelineRequestOptions {
  const resource = mapScopesToResource(scopes);
  if (!resource) {
    throw new Error(`${msiName}: Multiple scopes are not supported.`);
  }

  const queryParameters: any = {
    resource,
    "api-version": azureFabricVersion
  };

  if (clientId) {
    queryParameters.client_id = clientId;
  }

  const query = new URLSearchParams(queryParameters);

  // This error should not bubble up, since we verify that this environment variable is defined in the isAvailable() method defined below.
  if (!process.env.IDENTITY_ENDPOINT) {
    throw new Error("Missing environment variable: IDENTITY_ENDPOINT");
  }
  if (!process.env.IDENTITY_HEADER) {
    throw new Error("Missing environment variable: IDENTITY_HEADER");
  }

  return {
    url: `${process.env.IDENTITY_ENDPOINT}?${query.toString()}`,
    method: "GET",
    headers: createHttpHeaders({
      Accept: "application/json",
      Secret: process.env.IDENTITY_HEADER
    })
  };
}

// This credential can be easily tested by deploying a container to Azure Service Fabric with the Dockerfile:
//
//   FROM node:12
//   RUN wget https://host.any/path/bash.sh
//   CMD ["bash", "bash.sh"]
//
// Where the bash script contains:
//
//   curl --insecure $IDENTITY_ENDPOINT'?api-version=2019-07-01-preview&resource=https://vault.azure.net/' -H "Secret: $IDENTITY_HEADER"
//

export const fabricMsi: MSI = {
  async isAvailable(scopes): Promise<boolean> {
    const resource = mapScopesToResource(scopes);
    if (!resource) {
      logger.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
      return false;
    }
    const env = process.env;
    const result = Boolean(
      env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER && env.IDENTITY_SERVER_THUMBPRINT
    );
    if (!result) {
      logger.info(
        `${msiName}: Unavailable. The environment variables needed are: IDENTITY_ENDPOINT, IDENTITY_HEADER and IDENTITY_SERVER_THUMBPRINT`
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
      [
        `${msiName}:`,
        "Using the endpoint and the secret coming from the environment variables:",
        `IDENTITY_ENDPOINT=${process.env.IDENTITY_ENDPOINT},`,
        "IDENTITY_HEADER=[REDACTED] and",
        "IDENTITY_SERVER_THUMBPRINT=[REDACTED]."
      ].join(" ")
    );

    return msiGenericGetToken(
      identityClient,
      prepareRequestOptions(scopes, clientId),
      expiresInParser,
      getTokenOptions
    );
  }
};
