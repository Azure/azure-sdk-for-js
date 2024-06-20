// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MSI, MSIConfiguration, MSIToken } from "./models";
import {
  PipelineRequestOptions,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";

import { AuthenticationError } from "../../errors";
import { GetTokenOptions } from "@azure/core-auth";
import { IdentityClient } from "../../client/identityClient";
import { azureArcAPIVersion } from "./constants";
import { credentialLogger } from "../../util/logging";
import fs from "node:fs";
import { mapScopesToResource } from "./utils";

const msiName = "ManagedIdentityCredential - Azure Arc MSI";
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
    "api-version": azureArcAPIVersion,
  };

  if (clientId) {
    queryParameters.client_id = clientId;
  }
  if (resourceId) {
    queryParameters.msi_res_id = resourceId;
  }

  // This error should not bubble up, since we verify that this environment variable is defined in the isAvailable() method defined below.
  if (!process.env.IDENTITY_ENDPOINT) {
    throw new Error(`${msiName}: Missing environment variable: IDENTITY_ENDPOINT`);
  }

  const query = new URLSearchParams(queryParameters);

  return createPipelineRequest({
    // Should be similar to: http://localhost:40342/metadata/identity/oauth2/token
    url: `${process.env.IDENTITY_ENDPOINT}?${query.toString()}`,
    method: "GET",
    headers: createHttpHeaders({
      Accept: "application/json",
      Metadata: "true",
    }),
  });
}

/**
 * Does a request to the authentication provider that results in a file path.
 */
async function filePathRequest(
  identityClient: IdentityClient,
  requestPrepareOptions: PipelineRequestOptions,
): Promise<string | undefined> {
  const response = await identityClient.sendRequest(createPipelineRequest(requestPrepareOptions));

  if (response.status !== 401) {
    let message = "";
    if (response.bodyAsText) {
      message = ` Response: ${response.bodyAsText}`;
    }
    throw new AuthenticationError(
      response.status,
      `${msiName}: To authenticate with Azure Arc MSI, status code 401 is expected on the first request. ${message}`,
    );
  }

  const authHeader = response.headers.get("www-authenticate") || "";
  try {
    return authHeader.split("=").slice(1)[0];
  } catch (e: any) {
    throw Error(`Invalid www-authenticate header format: ${authHeader}`);
  }
}

export function platformToFilePath(): string {
  switch (process.platform) {
    case "win32":
      if (!process.env.PROGRAMDATA) {
        throw new Error(`${msiName}: PROGRAMDATA environment variable has no value.`);
      }
      return `${process.env.PROGRAMDATA}\\AzureConnectedMachineAgent\\Tokens`;
    case "linux":
      return "/var/opt/azcmagent/tokens";
    default:
      throw new Error(`${msiName}: Unsupported platform ${process.platform}.`);
  }
}

/**
 * Validates that a given Azure Arc MSI file path is valid for use.
 *
 * A valid file will:
 * 1. Be in the expected path for the current platform.
 * 2. Have a `.key` extension.
 * 3. Be at most 4096 bytes in size.
 */
export function validateKeyFile(filePath?: string): asserts filePath is string {
  if (!filePath) {
    throw new Error(`${msiName}: Failed to find the token file.`);
  }

  if (!filePath.endsWith(".key")) {
    throw new Error(`${msiName}: unexpected file path from HIMDS service: ${filePath}.`);
  }

  const expectedPath = platformToFilePath();
  if (!filePath.startsWith(expectedPath)) {
    throw new Error(`${msiName}: unexpected file path from HIMDS service: ${filePath}.`);
  }

  const stats = fs.statSync(filePath);
  if (stats.size > 4096) {
    throw new Error(
      `${msiName}: The file at ${filePath} is larger than expected at ${stats.size} bytes.`,
    );
  }
}

/**
 * Defines how to determine whether the Azure Arc MSI is available, and also how to retrieve a token from the Azure Arc MSI.
 */
export const arcMsi: MSI = {
  name: "arc",
  async isAvailable({ scopes }): Promise<boolean> {
    const resource = mapScopesToResource(scopes);
    if (!resource) {
      logger.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
      return false;
    }
    const result = Boolean(process.env.IMDS_ENDPOINT && process.env.IDENTITY_ENDPOINT);
    if (!result) {
      logger.info(
        `${msiName}: The environment variables needed are: IMDS_ENDPOINT and IDENTITY_ENDPOINT`,
      );
    }
    return result;
  },
  async getToken(
    configuration: MSIConfiguration,
    getTokenOptions: GetTokenOptions = {},
  ): Promise<MSIToken | null> {
    const { identityClient, scopes, clientId, resourceId } = configuration;

    if (clientId) {
      logger.warning(
        `${msiName}: user-assigned identities not supported. The argument clientId might be ignored by the service.`,
      );
    }
    if (resourceId) {
      logger.warning(
        `${msiName}: user defined managed Identity by resource Id is not supported. Argument resourceId will be ignored.`,
      );
    }

    logger.info(`${msiName}: Authenticating.`);

    const requestOptions = {
      disableJsonStringifyOnBody: true,
      deserializationMapper: undefined,
      abortSignal: getTokenOptions.abortSignal,
      ...prepareRequestOptions(scopes, clientId, resourceId),
      allowInsecureConnection: true,
    };

    const filePath = await filePathRequest(identityClient, requestOptions);
    validateKeyFile(filePath);

    const key = await fs.promises.readFile(filePath, { encoding: "utf-8" });
    requestOptions.headers?.set("Authorization", `Basic ${key}`);

    const request = createPipelineRequest({
      ...requestOptions,
      // Generally, MSI endpoints use the HTTP protocol, without transport layer security (TLS).
      allowInsecureConnection: true,
    });
    const tokenResponse = await identityClient.sendTokenRequest(request);
    return (tokenResponse && tokenResponse.accessToken) || null;
  },
};
