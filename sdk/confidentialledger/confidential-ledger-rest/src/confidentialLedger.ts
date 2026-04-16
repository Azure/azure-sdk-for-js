// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import type { TokenCredential } from "@azure/core-auth";
import type { ConfidentialLedgerClient } from "./clientDefinitions.js";
import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

/** The optional parameters for the client */
export interface ConfidentialLedgerClientOptions extends ClientOptions {
  /** The api version option of the client */
  apiVersion?: string;
}

/**
 * Initialize a new instance of `ConfidentialLedgerClient`
 * @param ledgerEndpoint - The Confidential Ledger URL, for example https://contoso.confidentialledger.azure.com
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  ledgerEndpoint: string,
  credentials: TokenCredential,
  { apiVersion = "2024-12-09-preview", ...options }: ConfidentialLedgerClientOptions = {},
): ConfidentialLedgerClient {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${ledgerEndpoint}`;
  const userAgentInfo = `azsdk-js-confidential-ledger-rest/1.1.2-beta.4`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://confidential-ledger.azure.com/.default"],
    },
  };
  const client = getClient(endpointUrl, credentials, options) as ConfidentialLedgerClient;

  // Replace the default redirect policy with one that preserves all headers.
  // The default redirectPolicy strips the Authorization header on redirect,
  // which causes 401 errors when Confidential Ledger redirects write operations
  // from a secondary node to the primary node.
  client.pipeline.removePolicy({ name: "redirectPolicy" });
  client.pipeline.addPolicy(confidentialLedgerRedirectPolicy(), { afterPhase: "Retry" });

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  client.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      // Use the apiVersion defined in request url directly
      // Append one if there is no apiVersion and we have one at client options
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version") && apiVersion) {
        req.url = `${req.url}${
          Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
        }api-version=${apiVersion}`;
      }

      return next(req);
    },
  });

  return client;
}

/**
 * Methods that are allowed to follow redirects 301 and 302.
 */
const allowedRedirect = ["GET", "HEAD"];

/**
 * A custom redirect policy for Confidential Ledger that preserves all headers,
 * including the Authorization header, when following redirects.
 *
 * The default core redirect policy strips the Authorization header on redirect
 * as a general security measure. However, Confidential Ledger may redirect write
 * operations (e.g., POST) from a secondary node to the primary node using a 307
 * redirect. Because the redirect target is the same trusted Confidential Ledger
 * service, the Authorization header must be forwarded to avoid 401 errors.
 *
 * @param maxRetries - The maximum number of redirects to follow. Defaults to 20.
 * @returns A PipelinePolicy that handles redirects while preserving all headers.
 */
function confidentialLedgerRedirectPolicy(maxRetries: number = 20): PipelinePolicy {
  return {
    name: "confidentialLedgerRedirectPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const response = await next(request);
      return handleRedirect(next, response, maxRetries);
    },
  };
}

async function handleRedirect(
  next: SendRequest,
  response: PipelineResponse,
  maxRetries: number,
  currentRetries: number = 0,
): Promise<PipelineResponse> {
  const { request, status, headers } = response;
  const locationHeader = headers.get("location");
  if (
    locationHeader &&
    (status === 300 ||
      (status === 301 && allowedRedirect.includes(request.method)) ||
      (status === 302 && allowedRedirect.includes(request.method)) ||
      (status === 303 && request.method === "POST") ||
      status === 307) &&
    currentRetries < maxRetries
  ) {
    const url = new URL(locationHeader, request.url);
    request.url = url.toString();

    // POST request with Status code 303 should be converted into a
    // redirected GET request if the redirect url is present in the location header
    if (status === 303) {
      request.method = "GET";
      request.headers.delete("Content-Length");
      delete request.body;
    }

    // NOTE: Unlike the default redirectPolicy, we intentionally do NOT strip the
    // Authorization header here. Confidential Ledger redirects are always within
    // the same trusted service (e.g., secondary to primary node), so credentials
    // must be forwarded for the redirected request to succeed.

    const res = await next(request);
    return handleRedirect(next, res, maxRetries, currentRetries + 1);
  }

  return response;
}
