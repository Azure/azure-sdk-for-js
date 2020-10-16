// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions, RequestPrepareOptions, RestError } from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";
import { IdentityClient } from "../../client/identityClient";
import { credentialLogger, formatError } from "../../util/logging";
import { createSpan } from "../../util/tracing";
import { ImdsApiVersion, ImdsEndpoint } from "./constants";
import { MSI, MSIExpiresInParser, MSIOptions, MSIRequestPreparations } from "./models";

const logger = credentialLogger("ManagedIdentityCredential - IMDS");

async function pingImdsEndpoint(
  identityClient: IdentityClient,
  resource: string,
  clientId?: string,
  getTokenOptions?: GetTokenOptions
): Promise<boolean> {
  const { span, options } = createSpan(
    "ManagedIdentityCredential-pingImdsEndpoint",
    getTokenOptions
  );
  const request = imdsMsi.prepareRequestOptions({ resource, clientId });

  // This will always be populated, but let's make TypeScript happy
  if (request.headers) {
    // Remove the Metadata header to invoke a request error from
    // IMDS endpoint
    delete request.headers.Metadata;
  }

  request.spanOptions = options.tracingOptions && options.tracingOptions.spanOptions;

  try {
    // Create a request with a timeout since we expect that
    // not having a "Metadata" header should cause an error to be
    // returned quickly from the endpoint, proving its availability.
    const webResource = identityClient.createWebResource(request);
    webResource.timeout = (options.requestOptions && options.requestOptions.timeout) || 500;

    try {
      logger.info(`Pinging IMDS endpoint`);
      await identityClient.sendRequest(webResource);
    } catch (err) {
      if (
        (err instanceof RestError && err.code === RestError.REQUEST_SEND_ERROR) ||
        err.name === "AbortError" ||
        err.code === "ECONNREFUSED" || // connection refused
        err.code === "EHOSTDOWN" // host is down
      ) {
        // If the request failed, or NodeJS was unable to establish a connection,
        // or the host was down, we'll assume the IMDS endpoint isn't available.
        logger.info(`IMDS endpoint unavailable`);
        span.setStatus({
          code: CanonicalCode.UNAVAILABLE,
          message: err.message
        });
        return false;
      }
    }

    // If we received any response, the endpoint is available
    logger.info(`IMDS endpoint is available`);
    return true;
  } catch (err) {
    // createWebResource failed.
    // This error should bubble up to the user.
    logger.info(
      formatError(`Error when creating the WebResource for the IMDS endpoint: ${err.message}`)
    );
    span.setStatus({
      code: CanonicalCode.UNKNOWN,
      message: err.message
    });
    throw err;
  } finally {
    span.end();
  }
}

export interface ImdsCachedPing {
  pingOnce: (
    resource: string,
    clientId?: string,
    getTokenOptions?: GetTokenOptions
  ) => Promise<boolean>;
}

export function imdsCachedPing(identityClient: IdentityClient): ImdsCachedPing {
  let doneOnce = false;
  let result = false;
  return {
    async pingOnce(
      resource: string,
      clientId?: string,
      getTokenOptions?: GetTokenOptions
    ): Promise<boolean> {
      if (doneOnce) {
        return result;
      }
      // pingImdsEndpoint errors should bubble up to the user.
      result = await pingImdsEndpoint(identityClient, resource, clientId, getTokenOptions);
      doneOnce = true;
      return result;
    }
  };
}

export const imdsMsi: MSI = {
  isAvailable(): boolean {
    // IMPORTANT: Must ping manually.
    // Use the "pingOnce" method above.
    return false;
  },
  prepareRequestOptions(options: MSIOptions): RequestPrepareOptions {
    const { resource, clientId } = options;

    logger.info(
      `Using the IMDS endpoint coming form the environment variable MSI_ENDPOINT=${process.env.MSI_ENDPOINT}, and using the cloud shell to proceed with the authentication.`
    );

    const queryParameters: any = {
      resource,
      "api-version": ImdsApiVersion
    };

    if (clientId) {
      queryParameters.client_id = clientId;
    }

    return {
      url: ImdsEndpoint,
      method: "GET",
      queryParameters,
      headers: {
        Accept: "application/json",
        Metadata: true
      }
    };
  },
  getExpiresInParser(): MSIExpiresInParser {
    return (requestBody: any) => {
      if (requestBody.expires_on) {
        // Use the expires_on timestamp if it's available
        const expires = +requestBody.expires_on * 1000;
        logger.info(
          `IMDS using expires_on: ${expires} (original value: ${requestBody.expires_on})`
        );
        return expires;
      } else {
        // If these aren't possible, use expires_in and calculate a timestamp
        const expires = Date.now() + requestBody.expires_in * 1000;
        logger.info(
          `IMDS using expires_in: ${expires} (original value: ${requestBody.expires_in})`
        );
        return expires;
      }
    };
  },
  prepareRequest(options: MSIOptions): MSIRequestPreparations {
    return {
      options: imdsMsi.prepareRequestOptions(options),
      expiresInParser: imdsMsi.getExpiresInParser()
    };
  }
};
