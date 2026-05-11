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
  const userAgentInfo = `azsdk-js-confidential-ledger-rest/1.1.2-beta.5`;
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
 * HTTP methods that are considered write operations for redirect caching.
 * Only writes cache and use the redirect target URL.
 */
const writeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

/**
 * Rewrite a URL by replacing its scheme and host with those from the cached base URL,
 * preserving the original path, query string, and fragment.
 *
 * @param originalUrl - The original request URL.
 * @param cachedBaseUrl - The cached base URL (scheme + host) from a previous redirect.
 * @returns The rewritten URL string.
 */
function rewriteUrl(originalUrl: string, cachedBaseUrl: string): string {
  const original = new URL(originalUrl);
  const cached = new URL(cachedBaseUrl);
  original.protocol = cached.protocol;
  original.host = cached.host;
  return original.toString();
}

/**
 * A custom redirect policy for Confidential Ledger that preserves all headers,
 * including the Authorization header, when following redirects. Additionally,
 * caches the redirect target URL for write operations so that subsequent writes
 * skip the load balancer.
 *
 * Cache behavior:
 * - Write requests (POST/PUT/PATCH/DELETE) that receive a 307/308 redirect
 *   cache the target URL's base (scheme + host).
 * - Subsequent writes rewrite their URL to the cached primary before sending.
 * - Read requests (GET/HEAD/OPTIONS) never use or populate the cache.
 * - 5xx responses or transport errors on writes invalidate the cache.
 *
 * NOTE: Python SDK caches on all redirect codes (301/302/307/308). JS only
 * caches on 307/308 because JS only follows 301/302 for GET/HEAD, so writes
 * never encounter those status codes. This is an intentional difference.
 *
 * @param maxRetries - The maximum number of redirects to follow. Defaults to 20.
 * @returns A PipelinePolicy that handles redirects with caching.
 */
function confidentialLedgerRedirectPolicy(maxRetries: number = 20): PipelinePolicy {
  let cachedBaseUrl: string | null = null;

  return {
    name: "confidentialLedgerRedirectPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const method = request.method.toUpperCase();
      const isWrite = writeMethods.has(method);

      // Save the original URL and method so we can restore on errors.
      // This is critical because the retry policy (upstream) may re-invoke
      // sendRequest with the same request object after a transport error.
      // handleRedirect also mutates request.url (and method on 303), so
      // we must restore in ALL failure paths, not just the top-level catch.
      const originalUrl = request.url;
      const originalMethod = request.method;

      // For writes, rewrite URL to cached primary if cache is warm.
      if (isWrite && cachedBaseUrl) {
        request.url = rewriteUrl(request.url, cachedBaseUrl);
      }

      let response: PipelineResponse;
      try {
        response = await next(request);
      } catch (e) {
        // Restore original URL and method so retry policy can re-send cleanly.
        request.url = originalUrl;
        request.method = originalMethod;
        // Transport error on write: invalidate cache and rethrow.
        if (isWrite) {
          cachedBaseUrl = null;
        }
        throw e;
      }

      // Follow redirect chain. This may mutate request.url and method (303).
      try {
        response = await handleRedirect(next, response, maxRetries, isWrite, (url: string) => {
          const parsed = new URL(url);
          cachedBaseUrl = `${parsed.protocol}//${parsed.host}`;
        });
      } catch (e) {
        // Transport error during redirect follow: restore and invalidate.
        request.url = originalUrl;
        request.method = originalMethod;
        if (isWrite) {
          cachedBaseUrl = null;
        }
        throw e;
      }

      // Invalidate cache on server errors for writes and restore the original
      // URL so the upstream retry policy re-enters sendRequest with the LB URL
      // instead of the rewritten cached-primary URL.
      // Use the CURRENT request method (not original isWrite) because 303
      // may have converted POST→GET, and a GET 5xx should not invalidate.
      if (writeMethods.has(request.method.toUpperCase()) && response.status >= 500) {
        cachedBaseUrl = null;
        request.url = originalUrl;
        request.method = originalMethod;
      }

      return response;
    },
  };
}

async function handleRedirect(
  next: SendRequest,
  response: PipelineResponse,
  maxRetries: number,
  isWrite: boolean,
  cacheRedirectUrl: (url: string) => void,
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
      status === 307 ||
      status === 308) &&
    currentRetries < maxRetries
  ) {
    const url = new URL(locationHeader, request.url);
    request.url = url.toString();

    // Cache the redirect target for write methods on 307/308.
    // We only cache on 307/308 (not 301/302) because those are the only
    // method-preserving redirects. 301/302 are only followed for GET/HEAD
    // in this policy, so writes never hit those code paths.
    if (isWrite && (status === 307 || status === 308)) {
      cacheRedirectUrl(request.url);
    }

    // POST request with Status code 303 should be converted into a
    // redirected GET request if the redirect url is present in the location header
    if (status === 303) {
      request.method = "GET";
      request.headers.delete("Content-Length");
      delete request.body;
    }

    // Recalculate isWrite after potential 303 POST→GET conversion.
    const isWriteAfterRedirect = writeMethods.has(request.method.toUpperCase());

    // NOTE: Unlike the default redirectPolicy, we intentionally do NOT strip the
    // Authorization header here. Confidential Ledger redirects are always within
    // the same trusted service (e.g., secondary to primary node), so credentials
    // must be forwarded for the redirected request to succeed.

    // Transport errors from redirect-follow propagate to sendRequest's
    // outer try/catch which handles URL restore and cache invalidation.
    const res = await next(request);
    return handleRedirect(
      next,
      res,
      maxRetries,
      isWriteAfterRedirect,
      cacheRedirectUrl,
      currentRetries + 1,
    );
  }

  return response;
}
