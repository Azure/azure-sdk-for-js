// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-util";
import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import {
  createHttpHeaders,
  PipelineRequestOptions,
  createPipelineRequest,
  RestError
} from "@azure/core-rest-pipeline";
import { SpanStatusCode } from "@azure/core-tracing";
import { IdentityClient } from "../../client/identityClient";
import { credentialLogger } from "../../util/logging";
import { createSpan } from "../../util/tracing";
import { imdsApiVersion, imdsEndpointPath, imdsHost } from "./constants";
import { MSI, MSIConfiguration } from "./models";
import { mapScopesToResource, msiGenericGetToken } from "./utils";
import { AuthenticationError } from "../../client/errors";

const msiName = "ManagedIdentityCredential - IMDS";
const logger = credentialLogger(msiName);

function expiresInParser(requestBody: any): number {
  if (requestBody.expires_on) {
    // Use the expires_on timestamp if it's available
    const expires = +requestBody.expires_on * 1000;
    logger.info(
      `${msiName}: IMDS using expires_on: ${expires} (original value: ${requestBody.expires_on})`
    );
    return expires;
  } else {
    // If these aren't possible, use expires_in and calculate a timestamp
    const expires = Date.now() + requestBody.expires_in * 1000;
    logger.info(
      `${msiName}: IMDS using expires_in: ${expires} (original value: ${requestBody.expires_in})`
    );
    return expires;
  }
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
    "api-version": imdsApiVersion
  };

  if (clientId) {
    queryParameters.client_id = clientId;
  }

  const params = new URLSearchParams(queryParameters);
  const query = params.toString();
  const url = new URL(imdsEndpointPath, process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST ?? imdsHost);

  return {
    url: `${url}?${query}`,
    method: "GET",
    headers: createHttpHeaders({
      Accept: "application/json",
      Metadata: "true"
    })
  };
}

// 800ms -> 1600ms -> 3200ms
export const imdsMsiRetryConfig = {
  maxRetries: 3,
  startDelayInMs: 800,
  intervalIncrement: 2
};

export const imdsMsi: MSI = {
  async isAvailable(
    scopes: string | string[],
    identityClient: IdentityClient,
    clientId?: string,
    getTokenOptions?: GetTokenOptions
  ): Promise<boolean> {
    const resource = mapScopesToResource(scopes);
    if (!resource) {
      logger.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
      return false;
    }
    const { span, updatedOptions: options } = createSpan(
      "ManagedIdentityCredential-pingImdsEndpoint",
      getTokenOptions
    );

    // if the PodIdenityEndpoint environment variable was set no need to probe the endpoint, it can be assumed to exist
    if (process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) {
      return true;
    }

    const requestOptions = prepareRequestOptions(resource, clientId);

    // This will always be populated, but let's make TypeScript happy
    if (requestOptions.headers) {
      // Remove the Metadata header to invoke a request error from
      // IMDS endpoint
      requestOptions.headers.delete("Metadata");
    }

    requestOptions.tracingOptions = options.tracingOptions;

    try {
      // Create a request with a timeout since we expect that
      // not having a "Metadata" header should cause an error to be
      // returned quickly from the endpoint, proving its availability.
      const request = createPipelineRequest(requestOptions);

      request.timeout = options.requestOptions?.timeout ?? 300;

      // This MSI uses the imdsEndpoint to get the token, which only uses http://
      request.allowInsecureConnection = true;

      try {
        logger.info(`${msiName}: Pinging the Azure IMDS endpoint`);
        await identityClient.sendRequest(request);
      } catch (err) {
        if (
          (err.name === "RestError" && err.code === RestError.REQUEST_SEND_ERROR) ||
          err.name === "AbortError" ||
          err.code === "ENETUNREACH" || // Network unreachable
          err.code === "ECONNREFUSED" || // connection refused
          err.code === "EHOSTDOWN" // host is down
        ) {
          // If the request failed, or Node.js was unable to establish a connection,
          // or the host was down, we'll assume the IMDS endpoint isn't available.
          logger.info(`${msiName}: The Azure IMDS endpoint is unavailable`);
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err.message
          });
          return false;
        }
      }

      // If we received any response, the endpoint is available
      logger.info(`${msiName}: The Azure IMDS endpoint is available`);
      return true;
    } catch (err) {
      // createWebResource failed.
      // This error should bubble up to the user.
      logger.info(
        `${msiName}: Error when creating the WebResource for the Azure IMDS endpoint: ${err.message}`
      );
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: err.message
      });
      throw err;
    } finally {
      span.end();
    }
  },
  async getToken(
    configuration: MSIConfiguration,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    const { identityClient, scopes, clientId } = configuration;

    logger.info(
      `${msiName}: Using the Azure IMDS endpoint coming from the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the cloud shell to proceed with the authentication.`
    );

    let nextDelayInMs = imdsMsiRetryConfig.startDelayInMs;
    for (let retries = 0; retries < imdsMsiRetryConfig.maxRetries; retries++) {
      try {
        return await msiGenericGetToken(
          identityClient,
          prepareRequestOptions(scopes, clientId),
          expiresInParser,
          getTokenOptions
        );
      } catch (error) {
        if (error.statusCode === 404) {
          await delay(nextDelayInMs);
          nextDelayInMs *= imdsMsiRetryConfig.intervalIncrement;
          continue;
        }
        throw error;
      }
    }

    throw new AuthenticationError(
      404,
      `${msiName}: Failed to retrieve IMDS token after ${imdsMsiRetryConfig.maxRetries} retries.`
    );
  }
};
