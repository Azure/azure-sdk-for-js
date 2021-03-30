// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, RequestPrepareOptions, RestError } from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import { IdentityClient } from "../../client/identityClient";
import { credentialLogger } from "../../util/logging";
import { createSpan } from "../../util/tracing";
import { imdsApiVersion, imdsEndpoint } from "./constants";
import { MSI } from "./models";
import { msiGenericGetToken } from "./utils";

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

function prepareRequestOptions(resource?: string, clientId?: string): RequestPrepareOptions {
  const queryParameters: any = {
    resource,
    "api-version": imdsApiVersion
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

export const imdsMsi: MSI = {
  async isAvailable(
    identityClient: IdentityClient,
    resource: string,
    clientId?: string,
    getTokenOptions?: GetTokenOptions
  ): Promise<boolean> {
    const { span, updatedOptions } = createSpan(
      "ManagedIdentityCredential-pingImdsEndpoint",
      getTokenOptions
    );

    const request = prepareRequestOptions(resource, clientId);

    // This will always be populated, but let's make TypeScript happy
    if (request.headers) {
      // Remove the Metadata header to invoke a request error from
      // IMDS endpoint
      delete request.headers.Metadata;
    }

    request.spanOptions = updatedOptions?.tracingOptions?.spanOptions;
    request.tracingContext = updatedOptions?.tracingOptions?.tracingContext;

    try {
      // Create a request with a timeout since we expect that
      // not having a "Metadata" header should cause an error to be
      // returned quickly from the endpoint, proving its availability.
      const webResource = identityClient.createWebResource(request);
      webResource.timeout = updatedOptions?.requestOptions?.timeout || 500;

      try {
        logger.info(`Pinging IMDS endpoint`);
        await identityClient.sendRequest(webResource);
      } catch (err) {
        if (
          (err.name === "RestError" && err.code === RestError.REQUEST_SEND_ERROR) ||
          err.name === "AbortError" ||
          err.code === "ECONNREFUSED" || // connection refused
          err.code === "EHOSTDOWN" // host is down
        ) {
          // If the request failed, or NodeJS was unable to establish a connection,
          // or the host was down, we'll assume the IMDS endpoint isn't available.
          logger.info(`IMDS endpoint unavailable`);
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err.message
          });

          // IMDS MSI unavailable.
          return false;
        }
      }

      // If we received any response, the endpoint is available
      logger.info(`IMDS endpoint is available`);

      // IMDS MSI available!
      return true;
    } catch (err) {
      // createWebResource failed.
      // This error should bubble up to the user.
      logger.info(`Error when creating the WebResource for the IMDS endpoint: ${err.message}`);
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
      `Using the IMDS endpoint coming form the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the cloud shell to proceed with the authentication.`
    );

    return msiGenericGetToken(
      identityClient,
      prepareRequestOptions(resource, clientId),
      expiresInParser,
      getTokenOptions
    );
  }
};
