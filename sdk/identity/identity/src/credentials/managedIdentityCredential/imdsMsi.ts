// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import qs from "qs";
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
import { imdsApiVersion, imdsEndpoint } from "./constants";
import { MSI } from "./models";
import { msiGenericGetToken } from "./utils";
import { AuthenticationError } from "../../client/errors";

const logger = credentialLogger("ManagedIdentityCredential - IMDS");

function expiresInParser(requestBody: any): number {
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

function prepareRequestOptions(resource?: string, clientId?: string): PipelineRequestOptions {
  const queryParameters: any = {
    resource,
    "api-version": imdsApiVersion
  };

  if (clientId) {
    queryParameters.client_id = clientId;
  }

  const query = qs.stringify(queryParameters);

  return {
    url: process.env.AZURE_POD_IDENTITY_TOKEN_URL ?? `${imdsEndpoint}?${query}`,
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
    identityClient: IdentityClient,
    resource: string,
    clientId?: string,
    getTokenOptions?: GetTokenOptions
  ): Promise<boolean> {
    const { span, updatedOptions: options } = createSpan(
      "ManagedIdentityCredential-pingImdsEndpoint",
      getTokenOptions
    );

    // if the PodIdenityEndpoint environment variable was set no need to probe the endpoint, it can be assumed to exist
    if (process.env.AZURE_POD_IDENTITY_TOKEN_URL) {
      return true;
    }

    const requestOptions = prepareRequestOptions(resource, clientId);

    // This will always be populated, but let's make TypeScript happy
    if (requestOptions.headers) {
      // Remove the Metadata header to invoke a request error from
      // IMDS endpoint
      requestOptions.headers.delete("Metadata");
    }

    requestOptions.tracingOptions = {
      spanOptions: options.tracingOptions && options.tracingOptions.spanOptions,
      tracingContext: options.tracingOptions && options.tracingOptions.tracingContext
    };

    try {
      // Create a request with a timeout since we expect that
      // not having a "Metadata" header should cause an error to be
      // returned quickly from the endpoint, proving its availability.
      const request = createPipelineRequest(requestOptions);

      request.timeout = options.requestOptions?.timeout ?? 300;

      // This MSI uses the imdsEndpoint to get the token, which only uses http://
      request.allowInsecureConnection = true;

      try {
        logger.info(`Pinging the Azure IMDS endpoint`);
        await identityClient.sendRequest(request);
      } catch (err) {
        if (
          (err.name === "RestError" && err.code === RestError.REQUEST_SEND_ERROR) ||
          err.name === "AbortError" ||
          err.code === "ECONNREFUSED" || // connection refused
          err.code === "EHOSTDOWN" // host is down
        ) {
          // If the request failed, or Node.js was unable to establish a connection,
          // or the host was down, we'll assume the IMDS endpoint isn't available.
          logger.info(`The Azure IMDS endpoint is unavailable`);
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err.message
          });
          return false;
        }
      }

      // If we received any response, the endpoint is available
      logger.info(`The Azure IMDS endpoint is available`);
      return true;
    } catch (err) {
      // createWebResource failed.
      // This error should bubble up to the user.
      logger.info(
        `Error when creating the WebResource for the Azure IMDS endpoint: ${err.message}`
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
    identityClient: IdentityClient,
    resource: string,
    clientId?: string,
    getTokenOptions: GetTokenOptions = {}
  ): Promise<AccessToken | null> {
    logger.info(
      `Using the Azure IMDS endpoint coming from the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the cloud shell to proceed with the authentication.`
    );

    let nextDelayInMs = imdsMsiRetryConfig.startDelayInMs;
    for (let retries = 0; retries < imdsMsiRetryConfig.maxRetries; retries++) {
      try {
        return await msiGenericGetToken(
          identityClient,
          prepareRequestOptions(resource, clientId),
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
      `Failed to retrieve IMDS token after ${imdsMsiRetryConfig.maxRetries} retries.`
    );
  }
};
