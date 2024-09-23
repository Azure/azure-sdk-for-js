// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MSI, MSIConfiguration, MSIToken } from "./models";
import {
  PipelineRequestOptions,
  PipelineResponse,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { delay, isError } from "@azure/core-util";
import { imdsApiVersion, imdsEndpointPath, imdsHost } from "./constants";

import { AuthenticationError } from "../../errors";
import { GetTokenOptions } from "@azure/core-auth";
import { credentialLogger } from "../../util/logging";
import { mapScopesToResource } from "./utils";
import { tracingClient } from "../../util/tracing";

const msiName = "ManagedIdentityCredential - IMDS";
const logger = credentialLogger(msiName);

/**
 * Generates the options used on the request for an access token.
 */
function prepareRequestOptions(
  scopes: string | string[],
  clientId?: string,
  resourceId?: string,
  options?: {
    skipQuery?: boolean;
    skipMetadataHeader?: boolean;
  },
): PipelineRequestOptions {
  const resource = mapScopesToResource(scopes);
  if (!resource) {
    throw new Error(`${msiName}: Multiple scopes are not supported.`);
  }

  const { skipQuery, skipMetadataHeader } = options || {};
  let query = "";

  // Pod Identity will try to process this request even if the Metadata header is missing.
  // We can exclude the request query to ensure no IMDS endpoint tries to process the ping request.
  if (!skipQuery) {
    const queryParameters: Record<string, string> = {
      resource,
      "api-version": imdsApiVersion,
    };
    if (clientId) {
      queryParameters.client_id = clientId;
    }
    if (resourceId) {
      queryParameters.msi_res_id = resourceId;
    }
    const params = new URLSearchParams(queryParameters);
    query = `?${params.toString()}`;
  }

  const url = new URL(imdsEndpointPath, process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST ?? imdsHost);

  const rawHeaders: Record<string, string> = {
    Accept: "application/json",
    Metadata: "true",
  };

  // Remove the Metadata header to invoke a request error from some IMDS endpoints.
  if (skipMetadataHeader) {
    delete rawHeaders.Metadata;
  }

  return {
    // In this case, the `?` should be added in the "query" variable `skipQuery` is not set.
    url: `${url}${query}`,
    method: "GET",
    headers: createHttpHeaders(rawHeaders),
  };
}

/**
 * Defines how to determine whether the Azure IMDS MSI is available, and also how to retrieve a token from the Azure IMDS MSI.
 */
export const imdsMsi: MSI = {
  name: "imdsMsi",
  async isAvailable({
    scopes,
    identityClient,
    clientId,
    resourceId,
    getTokenOptions = {},
  }): Promise<boolean> {
    const resource = mapScopesToResource(scopes);
    if (!resource) {
      logger.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
      return false;
    }

    // if the PodIdentityEndpoint environment variable was set no need to probe the endpoint, it can be assumed to exist
    if (process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) {
      return true;
    }

    if (!identityClient) {
      throw new Error("Missing IdentityClient");
    }

    const requestOptions = prepareRequestOptions(resource, clientId, resourceId, {
      skipMetadataHeader: true,
      skipQuery: true,
    });

    return tracingClient.withSpan(
      "ManagedIdentityCredential-pingImdsEndpoint",
      getTokenOptions,
      async (options) => {
        requestOptions.tracingOptions = options.tracingOptions;

        // Create a request with a timeout since we expect that
        // not having a "Metadata" header should cause an error to be
        // returned quickly from the endpoint, proving its availability.
        const request = createPipelineRequest(requestOptions);

        // Default to 1000 if the default of 0 is used.
        // Negative values can still be used to disable the timeout.
        request.timeout = options.requestOptions?.timeout || 1000;

        // This MSI uses the imdsEndpoint to get the token, which only uses http://
        request.allowInsecureConnection = true;
        let response: PipelineResponse;
        try {
          logger.info(`${msiName}: Pinging the Azure IMDS endpoint`);
          response = await identityClient.sendRequest(request);
        } catch (err: unknown) {
          // If the request failed, or Node.js was unable to establish a connection,
          // or the host was down, we'll assume the IMDS endpoint isn't available.
          if (isError(err)) {
            logger.verbose(`${msiName}: Caught error ${err.name}: ${err.message}`);
          }
          // This is a special case for Docker Desktop which responds with a 403 with a message that contains "A socket operation was attempted to an unreachable network" or "A socket operation was attempted to an unreachable host"
          // rather than just timing out, as expected.
          logger.info(`${msiName}: The Azure IMDS endpoint is unavailable`);
          return false;
        }
        if (response.status === 403) {
          if (response.bodyAsText?.includes("unreachable")) {
            logger.info(`${msiName}: The Azure IMDS endpoint is unavailable`);
            logger.info(`${msiName}: ${response.bodyAsText}`);
            return false;
          }
        }
        // If we received any response, the endpoint is available
        logger.info(`${msiName}: The Azure IMDS endpoint is available`);
        return true;
      },
    );
  },
  async getToken(
    configuration: MSIConfiguration,
    getTokenOptions: GetTokenOptions = {},
  ): Promise<MSIToken | null> {
    const { identityClient, scopes, clientId, resourceId } = configuration;

    if (process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) {
      logger.info(
        `${msiName}: Using the Azure IMDS endpoint coming from the environment variable AZURE_POD_IDENTITY_AUTHORITY_HOST=${process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST}.`,
      );
    } else {
      logger.info(`${msiName}: Using the default Azure IMDS endpoint ${imdsHost}.`);
    }

    let nextDelayInMs = configuration.retryConfig.startDelayInMs;
    for (let retries = 0; retries < configuration.retryConfig.maxRetries; retries++) {
      try {
        const request = createPipelineRequest({
          abortSignal: getTokenOptions.abortSignal,
          ...prepareRequestOptions(scopes, clientId, resourceId),
          allowInsecureConnection: true,
        });
        const tokenResponse = await identityClient.sendTokenRequest(request);

        return (tokenResponse && tokenResponse.accessToken) || null;
      } catch (error: any) {
        if (error.statusCode === 404) {
          await delay(nextDelayInMs);
          nextDelayInMs *= configuration.retryConfig.intervalIncrement;
          continue;
        }
        throw error;
      }
    }

    throw new AuthenticationError(
      404,
      `${msiName}: Failed to retrieve IMDS token after ${configuration.retryConfig.maxRetries} retries.`,
    );
  },
};
