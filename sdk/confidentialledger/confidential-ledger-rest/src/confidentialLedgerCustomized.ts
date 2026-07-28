// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { PipelinePolicy, PipelineRequest, SendRequest } from "@azure/core-rest-pipeline";

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { ConfidentialLedgerClient } from "./clientDefinitions.js";
import type { ConfidentialLedgerClientOptions } from "./confidentialLedgerClient.js";
import { logger } from "./logger.js";

const REDIRECT_STATUS_CODES = new Set([300, 301, 302, 303, 307, 308]);
const METHOD_PRESERVING_CODES = new Set([307, 308]);
const WRITE_METHODS = new Set(["POST", "PUT", "DELETE", "PATCH"]);
const MAX_REDIRECTS = 20;

/**
 * Check whether a redirect target is a trusted origin relative to the
 * configured ledger endpoint. Trusted means: same scheme, same port, and the
 * target hostname is either the ledger hostname itself or a subdomain thereof.
 */
function isTrustedTarget(targetUrl: URL, ledgerUrl: URL): boolean {
  if (targetUrl.protocol !== ledgerUrl.protocol) return false;

  const defaultPort = ledgerUrl.protocol === "https:" ? "443" : "80";
  const targetPort = targetUrl.port || defaultPort;
  const ledgerPort = ledgerUrl.port || defaultPort;
  if (targetPort !== ledgerPort) return false;

  const targetHost = targetUrl.hostname.toLowerCase().replace(/\.$/, "");
  const ledgerHost = ledgerUrl.hostname.toLowerCase().replace(/\.$/, "");

  if (targetHost === ledgerHost) return true;
  if (targetHost.endsWith(`.${ledgerHost}`)) return true;
  return false;
}

/** URL pattern for user PATCH endpoints that need merge-patch content type. */
const MERGE_PATCH_PATTERN = /\/app\/(users|ledgerUsers)\/[^/]+\/?$/;

function createMergePatchContentTypePolicy(): PipelinePolicy {
  return {
    name: "confidentialLedgerMergePatchContentTypePolicy",
    sendRequest: async (request: PipelineRequest, next: SendRequest) => {
      if (request.method === "PATCH") {
        const url = new URL(request.url);
        if (MERGE_PATCH_PATTERN.test(url.pathname)) {
          request.headers.set("Content-Type", "application/merge-patch+json");
        }
      }
      return next(request);
    },
  };
}

function createRedirectPolicy(ledgerEndpoint: string): PipelinePolicy {
  const ledgerUrl = new URL(ledgerEndpoint);
  let cachedPrimaryOrigin: string | undefined;

  return {
    name: "confidentialLedgerRedirectPolicy",
    sendRequest: async (request: PipelineRequest, next: SendRequest) => {
      const originalUrl = request.url;
      const originalMethod = request.method;
      const originalBody = request.body;
      const isWrite = WRITE_METHODS.has(request.method.toUpperCase());

      // If write and cache is warm, rewrite URL to cached primary
      if (isWrite && cachedPrimaryOrigin) {
        const reqUrl = new URL(request.url);
        request.url = `${cachedPrimaryOrigin}${reqUrl.pathname}${reqUrl.search}`;
      }

      let stagedOrigin: string | undefined;
      let currentMethod = request.method;

      try {
        let response = await next(request);

        for (let i = 0; i < MAX_REDIRECTS; i++) {
          if (!REDIRECT_STATUS_CODES.has(response.status)) break;

          const location = response.headers.get("location");
          if (!location) break;

          const status = response.status;

          // 300, 301, 302: only follow GET/HEAD
          if (status === 300 || status === 301 || status === 302) {
            if (currentMethod !== "GET" && currentMethod !== "HEAD") break;
          }

          // Parse the redirect target
          let targetUrl: URL;
          try {
            targetUrl = new URL(location, request.url);
          } catch {
            break;
          }

          // Trust validation — must run before any method/body conversion
          if (!isTrustedTarget(targetUrl, ledgerUrl)) {
            request.url = originalUrl;
            request.method = originalMethod;
            if (originalBody !== undefined) {
              request.body = originalBody;
            }
            cachedPrimaryOrigin = undefined;
            throw new Error(`Untrusted target origin: ${targetUrl.origin}`);
          }

          // Apply redirect
          if (status === 303) {
            request.url = targetUrl.href;
            request.method = "GET";
            currentMethod = "GET";
            request.body = undefined;
            request.headers.delete("Content-Length");
          } else {
            request.url = targetUrl.href;
          }

          // Stage cache for write method-preserving redirects only
          if (isWrite && METHOD_PRESERVING_CODES.has(status) && WRITE_METHODS.has(currentMethod)) {
            stagedOrigin = targetUrl.origin;
          }

          response = await next(request);
        }

        // Post-loop cache management
        if (WRITE_METHODS.has(currentMethod)) {
          if (response.status >= 500) {
            cachedPrimaryOrigin = undefined;
            request.url = originalUrl;
          } else if (stagedOrigin && !REDIRECT_STATUS_CODES.has(response.status)) {
            cachedPrimaryOrigin = stagedOrigin;
          }
        }

        return response;
      } catch (error) {
        if (WRITE_METHODS.has(currentMethod)) {
          cachedPrimaryOrigin = undefined;
        }
        request.url = originalUrl;
        request.method = originalMethod;
        throw error;
      }
    },
  };
}

export default function ConfidentialLedger(
  ledgerEndpoint: string,
  credentials: TokenCredential,
  options?: ClientOptions,
): ConfidentialLedgerClient;
export default function ConfidentialLedger(
  ledgerEndpoint: string,
  ledgerIdentityCertificate: string,
  options?: ClientOptions,
): ConfidentialLedgerClient;
export default function ConfidentialLedger(
  ledgerEndpoint: string,
  ledgerIdentityCertificate: string,
  credentials: TokenCredential,
  options?: ClientOptions,
): ConfidentialLedgerClient;
export default function ConfidentialLedger(
  ledgerEndpoint: string,
  credentialOrCert: TokenCredential | string,
  credentialOrOptions?: TokenCredential | ClientOptions,
  opts?: ClientOptions,
): ConfidentialLedgerClient {
  let credentials: TokenCredential | undefined;
  let options: ConfidentialLedgerClientOptions;
  let ledgerIdentityCertificate: string | undefined;

  if (isTokenCredential(credentialOrCert)) {
    credentials = credentialOrCert;
    options = (credentialOrOptions as ClientOptions) ?? {};
  } else {
    ledgerIdentityCertificate = credentialOrCert;
    if (isTokenCredential(credentialOrOptions)) {
      credentials = credentialOrOptions;
      options = opts ?? {};
    } else {
      options = (credentialOrOptions as ClientOptions) ?? {};
    }
  }

  const tlsOptions = options?.tlsOptions ?? {};
  if (ledgerIdentityCertificate) {
    tlsOptions.ca = ledgerIdentityCertificate;
  }

  const apiVersion = options.apiVersion ?? "2026-02-23";
  const endpointUrl = options.endpoint ?? `${ledgerEndpoint}`;
  const userAgentInfo = `azsdk-js-confidential-ledger-rest/2.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;

  const clientOptions = {
    ...options,
    tlsOptions,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
  };

  const client = (
    credentials
      ? getClient(endpointUrl, credentials, clientOptions)
      : getClient(endpointUrl, clientOptions)
  ) as ConfidentialLedgerClient;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  client.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version") && apiVersion) {
        req.url = `${req.url}${
          Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
        }api-version=${apiVersion}`;
      }
      return next(req);
    },
  });

  // Replace default redirect policy with custom one that preserves auth headers
  // and validates redirect trust (MSRC #116673)
  client.pipeline.removePolicy({ name: "redirectPolicy" });
  client.pipeline.addPolicy(createRedirectPolicy(ledgerEndpoint));

  // Auto-set Content-Type for PATCH on user endpoints
  client.pipeline.addPolicy(createMergePatchContentTypePolicy());

  return client;
}
