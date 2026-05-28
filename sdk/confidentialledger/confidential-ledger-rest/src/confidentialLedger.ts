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
  const userAgentInfo = `azsdk-js-confidential-ledger-rest/1.1.2-beta.6`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  const updatedOptions = {
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
  const client = getClient(endpointUrl, credentials, updatedOptions) as ConfidentialLedgerClient;

  // Replace the default redirect policy with one that preserves headers (including
  // Authorization) on redirects, but ONLY for targets that remain within the trust
  // boundary of the configured ledger endpoint (HTTPS + same origin or a subdomain
  // with the same port). Confidential Ledger redirects write operations from the
  // load balancer to a primary node on a subdomain, and the default redirectPolicy
  // would strip Authorization causing 401 errors. Redirects to any other target
  // are refused to prevent credential and request-body leakage to untrusted hosts.
  client.pipeline.removePolicy({ name: "redirectPolicy" });
  client.pipeline.addPolicy(confidentialLedgerRedirectPolicy(endpointUrl), {
    afterPhase: "Retry",
  });

  // Ensure PATCH requests to user management endpoints send the correct
  // Content-Type. The service requires "application/merge-patch+json" for
  // /app/users/{userId} and /app/ledgerUsers/{userId}, but the generated
  // parameter types declare contentType as optional — so when callers omit it,
  // @azure-rest/core-client defaults to "application/json" which the service
  // rejects with UnsupportedContentType (415).
  client.pipeline.addPolicy(confidentialLedgerMergePatchContentTypePolicy());

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
 * HTTP status codes that this policy interprets as redirects. Used to detect
 * when a redirect chain terminated on an actual non-redirect response vs. one
 * the chain failed to follow (e.g., max-retries exhausted or malformed
 * Location). The staged cache is only committed on a terminal non-redirect
 * response.
 */
const redirectStatusCodes = new Set([300, 301, 302, 303, 307, 308]);

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
 * A custom redirect policy for Confidential Ledger that preserves headers
 * (including the Authorization header) when following redirects, but only when
 * the redirect target stays within the configured ledger's trust boundary.
 *
 * Trust boundary:
 * - Target URL must use HTTPS.
 * - Target port must match the configured ledger endpoint port.
 * - Target hostname must either equal the configured ledger hostname or be a
 *   subdomain of it (after canonicalization: lowercase, one trailing dot stripped).
 *
 * Untrusted redirects:
 * - The policy refuses to follow them by throwing a non-retryable error.
 *   This prevents credentials AND the request body from being sent to an
 *   untrusted host (compared to strip-and-follow, which still leaks the body).
 * - The outer sendRequest catch handler restores the original URL/method and
 *   invalidates the write cache so the next attempt starts clean from the
 *   load balancer.
 *
 * Cache behavior:
 * - Write requests (POST/PUT/PATCH/DELETE) that receive a 307/308 redirect to a
 *   TRUSTED target may cache the target URL's base (scheme + host + port).
 * - The cache is staged during the redirect chain and only committed after the
 *   chain returns a non-5xx response without any untrusted hop.
 * - Subsequent writes rewrite their URL to the cached primary before sending.
 * - Read requests (GET/HEAD/OPTIONS) never use or populate the cache.
 * - 5xx responses, transport errors, or refused untrusted redirects invalidate
 *   the cache.
 *
 * NOTE: Python SDK caches on all redirect codes (301/302/307/308). JS only
 * caches on 307/308 because JS only follows 301/302 for GET/HEAD, so writes
 * never encounter those status codes. This is an intentional difference.
 *
 * @param endpointUrl - The configured ledger endpoint URL used as the trust anchor.
 * @param maxRetries - The maximum number of redirects to follow. Defaults to 20.
 * @returns A PipelinePolicy that handles redirects with trust enforcement and caching.
 */
function confidentialLedgerRedirectPolicy(
  endpointUrl: string,
  maxRetries: number = 20,
): PipelinePolicy {
  let ledgerUrl: URL;
  try {
    ledgerUrl = new URL(endpointUrl);
  } catch {
    // If the endpoint URL is unparseable, the client cannot operate anyway;
    // throw a clear error at policy creation rather than at first request.
    throw new Error(`Confidential Ledger endpoint is not a valid URL: ${endpointUrl}`);
  }
  if (ledgerUrl.protocol !== "https:") {
    // HTTPS is required for the bearer token policy upstream; warn loudly if
    // the configured endpoint is not HTTPS. We do not throw to preserve
    // test/dev scenarios that override the endpoint with a local proxy.
    logger.warning(
      `Confidential Ledger endpoint uses non-HTTPS scheme (${ledgerUrl.protocol}); redirect trust enforcement still requires HTTPS targets.`,
    );
  }
  const ledgerHostname = canonicalHostname(ledgerUrl.hostname);
  const ledgerPort = ledgerUrl.port;

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
      // Cache mutations are staged via `pendingCacheUrl` and committed below
      // only if the final response is successful (or at least not 5xx) AND no
      // untrusted hop was encountered.
      let pendingCacheUrl: string | null = null;
      try {
        response = await handleRedirect(
          next,
          response,
          maxRetries,
          isWrite,
          ledgerHostname,
          ledgerPort,
          (url: string) => {
            const parsed = new URL(url);
            pendingCacheUrl = `${parsed.protocol}//${parsed.host}`;
          },
        );
      } catch (e) {
        // Transport error OR refused untrusted redirect during redirect follow:
        // restore the request to its original state and invalidate cache so the
        // upstream retry policy (and any subsequent write) starts cleanly from
        // the load balancer URL.
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
      } else if (pendingCacheUrl && !redirectStatusCodes.has(response.status)) {
        // Commit the staged cache only when the redirect chain reached a
        // terminal non-redirect response. If the chain ended on a 3xx (e.g.,
        // max-retries exhausted, malformed Location, or no Location header),
        // we do not know the staged URL is reachable, so the cache is
        // discarded to avoid poisoning subsequent writes.
        cachedBaseUrl = pendingCacheUrl;
      }

      return response;
    },
  };
}

/**
 * Canonicalize a hostname for trust comparison: lowercase (URL already does
 * this) and strip a single trailing dot (FQDN absolute form).
 */
function canonicalHostname(hostname: string): string {
  return hostname.toLowerCase().replace(/\.$/, "");
}

/**
 * Returns true if the redirect target URL is inside the configured ledger's
 * trust boundary: HTTPS, same port, and either same host or a subdomain.
 *
 * The subdomain check uses a leading-dot boundary so that, e.g.,
 * `evil-test-ledger.confidential-ledger.azure.com` is NOT considered a
 * subdomain of `test-ledger.confidential-ledger.azure.com`.
 */
function isTrustedRedirectTarget(target: URL, ledgerHostname: string, ledgerPort: string): boolean {
  if (target.protocol !== "https:") return false;
  if (target.port !== ledgerPort) return false;
  const host = canonicalHostname(target.hostname);
  if (host === ledgerHostname) return true;
  return host.endsWith("." + ledgerHostname);
}

/**
 * Regex matching the path portion of user management endpoints that require
 * the "application/merge-patch+json" content type on PATCH requests.
 * Matches /app/users/\{userId\} and /app/ledgerUsers/\{userId\}.
 */
const usersPatchPathRe = /\/app\/(?:users|ledgerUsers)\/[^/?#]+\/?$/i;

/**
 * Pipeline policy that ensures PATCH requests to user management endpoints
 * (/app/users/\{userId\} and /app/ledgerUsers/\{userId\}) use the
 * "application/merge-patch+json" content type required by the service.
 *
 * The generated parameter types declare contentType as optional, so when
 * callers omit it the framework defaults to "application/json", which TPAL
 * rejects for api-versions after 2022-04-20-preview. This policy corrects the
 * header transparently so callers don't need to remember to set it.
 *
 * Other PATCH endpoints (e.g. /app/roles, /app/userDefinedEndpoints/runtimeOptions)
 * are intentionally excluded — those accept "application/json".
 */
function confidentialLedgerMergePatchContentTypePolicy(): PipelinePolicy {
  return {
    name: "confidentialLedgerMergePatchContentTypePolicy",
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (request.method.toUpperCase() === "PATCH") {
        const path = new URL(request.url).pathname;
        if (usersPatchPathRe.test(path)) {
          request.headers.set("Content-Type", "application/merge-patch+json");
        }
      }
      return next(request);
    },
  };
}

async function handleRedirect(
  next: SendRequest,
  response: PipelineResponse,
  maxRetries: number,
  isWrite: boolean,
  ledgerHostname: string,
  ledgerPort: string,
  stageCacheUrl: (url: string) => void,
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
    let url: URL;
    try {
      url = new URL(locationHeader, request.url);
    } catch {
      // Malformed Location header — surface the original 3xx unchanged.
      return response;
    }

    // SECURITY: refuse to follow redirects to targets outside the configured
    // ledger's trust boundary. Throw rather than strip-and-follow so the
    // request body is never sent to the untrusted target, and so the outer
    // sendRequest handler restores the original URL/method and invalidates
    // the write cache.
    if (!isTrustedRedirectTarget(url, ledgerHostname, ledgerPort)) {
      logger.warning(
        `Refusing to follow Confidential Ledger redirect to untrusted target origin: ${url.origin}`,
      );
      throw new Error(
        `Confidential Ledger refused to follow redirect to untrusted target origin: ${url.origin}`,
      );
    }

    request.url = url.toString();

    // Cache the redirect target for write methods on 307/308.
    // We only cache on 307/308 (not 301/302) because those are the only
    // method-preserving redirects. 301/302 are only followed for GET/HEAD
    // in this policy, so writes never hit those code paths.
    if (isWrite && (status === 307 || status === 308)) {
      stageCacheUrl(request.url);
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

    // Authorization header is intentionally preserved on TRUSTED redirects.
    // Trust was validated above; cross-origin/non-HTTPS/different-port targets
    // have already been refused.

    // Transport errors from redirect-follow propagate to sendRequest's
    // outer try/catch which handles URL restore and cache invalidation.
    const res = await next(request);
    return handleRedirect(
      next,
      res,
      maxRetries,
      isWriteAfterRedirect,
      ledgerHostname,
      ledgerPort,
      stageCacheUrl,
      currentRetries + 1,
    );
  }

  return response;
}
