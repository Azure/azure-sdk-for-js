// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHttpHeaders, PipelineRequestOptions } from "@azure/core-rest-pipeline";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { MSI } from "./models";
import { credentialLogger } from "../../util/logging";
import { IdentityClient } from "../../client/identityClient";
import { msiGenericGetToken } from "./utils";
import { azureFabricVersion } from "./constants";

const logger = credentialLogger("ManagedIdentityCredential - Fabric MSI");

function expiresInParser(requestBody: any): number {
  // Parses a string representation of the seconds since epoch into a number value
  return Number(requestBody.expires_on);
}

function prepareRequestOptions(resource: string, clientId?: string): PipelineRequestOptions {
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
  async isAvailable(): Promise<boolean> {
    const env = process.env;
    const result = Boolean(
      env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER && env.IDENTITY_SERVER_THUMBPRINT
    );
    if (!result) {
      logger.info("The Azure App Service Fabric MSI is unavailable.");
    }
    return result;
  },
  async getToken(
    configuration: {
      identityClient: IdentityClient;
      resource: string;
      clientId?: string;
    },
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    const { identityClient, resource, clientId } = configuration;

    logger.info(
      [
        "Using the endpoint and the secret coming from the environment variables:",
        `IDENTITY_ENDPOINT=${process.env.IDENTITY_ENDPOINT},`,
        "IDENTITY_HEADER=[REDACTED] and",
        "IDENTITY_SERVER_THUMBPRINT=[REDACTED]."
      ].join(" ")
    );

    return msiGenericGetToken(
      identityClient,
      prepareRequestOptions(resource, clientId),
      expiresInParser,
      getTokenOptions
    );
  }
};
