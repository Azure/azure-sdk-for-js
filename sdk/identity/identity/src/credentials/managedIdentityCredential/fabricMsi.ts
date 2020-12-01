// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, RequestPrepareOptions } from "@azure/core-http";
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

function prepareRequestOptions(resource: string, clientId?: string): RequestPrepareOptions {
  const queryParameters: any = {
    resource,
    "api-version": azureFabricVersion
  };

  if (clientId) {
    queryParameters.client_id = clientId;
  }

  return {
    url: process.env.IDENTITY_ENDPOINT,
    method: "GET",
    queryParameters,
    headers: {
      Accept: "application/json",
      Secret: process.env.IDENTITY_HEADER
    }
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
    return Boolean(env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER && env.IDENTITY_SERVER_THUMBPRINT);
  },
  async getToken(
    identityClient: IdentityClient,
    resource: string,
    clientId?: string,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
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
