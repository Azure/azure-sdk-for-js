// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequestOptions, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { isError } from "@azure/core-util";

import type { GetTokenOptions } from "@azure/core-auth";
import { credentialLogger } from "../../util/logging.js";
import { mapScopesToResource } from "./utils.js";
import { tracingClient } from "../../util/tracing.js";
import type { IdentityClient } from "../../client/identityClient.js";

const msiName = "ManagedIdentityCredential - IMDS";
const logger = credentialLogger(msiName);

const imdsHost = "http://169.254.169.254";
const imdsEndpointPath = "/metadata/identity/oauth2/token";

/**
 * Generates an invalid request options to get a response quickly from IMDS endpoint.
 * The response indicates the availability of IMSD service; otherwise the request would time out.
 */
function prepareInvalidRequestOptions(scopes: string | string[]): PipelineRequestOptions {
  const resource = mapScopesToResource(scopes);
  if (!resource) {
    throw new Error(`${msiName}: Multiple scopes are not supported.`);
  }

  // Pod Identity will try to process this request even if the Metadata header is missing.
  // We can exclude the request query to ensure no IMDS endpoint tries to process the ping request.
  const url = new URL(imdsEndpointPath, process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST ?? imdsHost);

  const rawHeaders: Record<string, string> = {
    Accept: "application/json",
    // intentionally leave out the Metadata header to invoke an error from IMDS endpoint.
  };

  return {
    // intentionally not including any query
    url: `${url}`,
    method: "GET",
    headers: createHttpHeaders(rawHeaders),
  };
}

/**
 * Defines how to determine whether the Azure IMDS MSI is available.
 *
 * Actually getting the token once we determine IMDS is available is handled by MSAL.
 */
export const imdsMsi = {
  name: "imdsMsi",
  async isAvailable(options: {
    scopes: string | string[];
    identityClient?: IdentityClient;
    clientId?: string;
    resourceId?: string;
    getTokenOptions?: GetTokenOptions;
  }): Promise<boolean> {
    const { scopes, identityClient, getTokenOptions } = options;
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

    const requestOptions = prepareInvalidRequestOptions(resource);

    return tracingClient.withSpan(
      "ManagedIdentityCredential-pingImdsEndpoint",
      getTokenOptions ?? {},
      async (updatedOptions) => {
        requestOptions.tracingOptions = updatedOptions.tracingOptions;

        // Create a request with a timeout since we expect that
        // not having a "Metadata" header should cause an error to be
        // returned quickly from the endpoint, proving its availability.
        const request = createPipelineRequest(requestOptions);

        // Default to 1000 if the default of 0 is used.
        // Negative values can still be used to disable the timeout.
        request.timeout = updatedOptions.requestOptions?.timeout || 1000;

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
};
