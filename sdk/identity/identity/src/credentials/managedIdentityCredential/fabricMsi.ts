// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import https from "https";
import {
  PipelineRequestOptions,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { GetTokenOptions } from "@azure/core-auth";
import { credentialLogger } from "../../util/logging";
import { MSI, MSIConfiguration, MSIToken } from "./models";
import { mapScopesToResource } from "./utils";
import { azureFabricVersion } from "./constants";

// This MSI can be easily tested by deploying a container to Azure Service Fabric with the Dockerfile:
//
//   FROM node:12
//   RUN wget https://host.any/path/bash.sh
//   CMD ["bash", "bash.sh"]
//
// Where the bash script contains:
//
//   curl --insecure $IDENTITY_ENDPOINT'?api-version=2019-07-01-preview&resource=https://vault.azure.net/' -H "Secret: $IDENTITY_HEADER"
//

const msiName = "ManagedIdentityCredential - Fabric MSI";
const logger = credentialLogger(msiName);

/**
 * Generates the options used on the request for an access token.
 */
function prepareRequestOptions(
  scopes: string | string[],
  clientId?: string,
  resourceId?: string,
): PipelineRequestOptions {
  const resource = mapScopesToResource(scopes);
  if (!resource) {
    throw new Error(`${msiName}: Multiple scopes are not supported.`);
  }

  const queryParameters: Record<string, string> = {
    resource,
    "api-version": azureFabricVersion,
  };

  if (clientId) {
    queryParameters.client_id = clientId;
  }
  if (resourceId) {
    queryParameters.msi_res_id = resourceId;
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
      secret: process.env.IDENTITY_HEADER,
    }),
  };
}

/**
 * Defines how to determine whether the Azure Service Fabric MSI is available, and also how to retrieve a token from the Azure Service Fabric MSI.
 */
export const fabricMsi: MSI = {
  name: "fabricMsi",
  async isAvailable({ scopes }): Promise<boolean> {
    const resource = mapScopesToResource(scopes);
    if (!resource) {
      logger.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
      return false;
    }
    const env = process.env;
    const result = Boolean(
      env.IDENTITY_ENDPOINT && env.IDENTITY_HEADER && env.IDENTITY_SERVER_THUMBPRINT,
    );
    if (!result) {
      logger.info(
        `${msiName}: Unavailable. The environment variables needed are: IDENTITY_ENDPOINT, IDENTITY_HEADER and IDENTITY_SERVER_THUMBPRINT`,
      );
    }
    return result;
  },
  async getToken(
    configuration: MSIConfiguration,
    getTokenOptions: GetTokenOptions = {},
  ): Promise<MSIToken | null> {
    const { scopes, identityClient, clientId, resourceId } = configuration;

    if (resourceId) {
      logger.warning(
        `${msiName}: user defined managed Identity by resource Id is not supported. Argument resourceId might be ignored by the service.`,
      );
    }

    logger.info(
      [
        `${msiName}:`,
        "Using the endpoint and the secret coming from the environment variables:",
        `IDENTITY_ENDPOINT=${process.env.IDENTITY_ENDPOINT},`,
        "IDENTITY_HEADER=[REDACTED] and",
        "IDENTITY_SERVER_THUMBPRINT=[REDACTED].",
      ].join(" "),
    );

    const request = createPipelineRequest({
      abortSignal: getTokenOptions.abortSignal,
      ...prepareRequestOptions(scopes, clientId, resourceId),
      // The service fabric MSI endpoint will be HTTPS (however, the certificate will be self-signed).
      // allowInsecureConnection: true
    });

    request.agent = new https.Agent({
      // This is necessary because Service Fabric provides a self-signed certificate.
      // The alternative path is to verify the certificate using the IDENTITY_SERVER_THUMBPRINT env variable.
      rejectUnauthorized: false,
    });

    const tokenResponse = await identityClient.sendTokenRequest(request);
    return (tokenResponse && tokenResponse.accessToken) || null;
  },
};
