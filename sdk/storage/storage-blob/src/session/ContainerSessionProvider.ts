// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { TokenCredential } from "@azure/core-auth";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { isRestError } from "@azure/core-rest-pipeline";
import { BlobServiceClient } from "../BlobServiceClient.js";
import { logger } from "../log.js";
import type { StoragePipelineOptions } from "../Pipeline.js";
import { isIpEndpointStyle } from "../utils/utils.common.js";
import { HeaderConstants } from "../utils/constants.js";
import { AutoRefreshingCache } from "./AutoRefreshingCache.js";
import { createContainerSession } from "./createSession.js";
import type { SessionTokenInfo } from "./models.js";
import { createBearerFallback } from "./models.js";

/** Service error code returned when the account does not have sessions enabled. */
const FEATURE_NOT_ENABLED = "FeatureNotEnabled";

/**
 * Whether `request` may be authenticated with a session token.
 *
 * Phase-1 scope is blob download only. Widening scope is a matter of removing rules here, with
 * two exceptions that are permanent: service-level requests can never use a container-scoped
 * session, and DFS requests are excluded because storage-blob and storage-file-datalake share
 * one pipeline in JS.
 *
 * A free function rather than a provider method so the pipeline can check eligibility before
 * paying to construct a provider.
 */
export function isSessionEligible(request: PipelineRequest): boolean {
  if (request.method !== "GET") {
    return false;
  }

  const parsedUrl = new URL(request.url);

  // DataLake shares this pipeline; only its blob endpoint understands sessions. Skipping the
  // first label keeps an account literally named "dfs" eligible, while still catching private
  // endpoint hosts such as `account.privatelink.dfs.core.windows.net`.
  if (parsedUrl.hostname.split(".").slice(1).includes("dfs")) {
    return false;
  }

  // A "comp" parameter means a sub-resource (block list, metadata, tags, ...) and "restype"
  // means a container- or account-level operation. Neither is a blob download. The service
  // treats query parameter names case-insensitively, so this check must too.
  for (const key of parsedUrl.searchParams.keys()) {
    const lowered = key.toLowerCase();
    if (lowered === "comp" || lowered === "restype") {
      return false;
    }
  }

  // Structured message downloads are not supported with session authentication.
  if (request.headers.has(HeaderConstants.X_MS_STRUCTURED_BODY)) {
    return false;
  }

  const { containerName, blobName } = parseContainerAndBlob(parsedUrl);
  // Empty container => service-level request; empty blob => container-level request.
  return containerName !== "" && blobName !== "";
}

/**
 * Mints and caches session tokens for the containers of a single storage account.
 *
 * Sessions are cached per container, so every client sharing a provider also shares its
 * sessions and a container's session is created once no matter how many clients use it.
 */
export class ContainerSessionProvider {
  private readonly serviceEndpoint: string;
  private readonly caches = new Map<string, AutoRefreshingCache>();
  private serviceClient: BlobServiceClient | undefined;

  /**
   * @param url - Any URL belonging to the target account; reduced to the blob service endpoint.
   * @param credential - Token credential used to mint sessions.
   * @param options - Options applied to the internal client that issues Create Session requests.
   */
  constructor(
    url: string,
    private readonly credential: TokenCredential,
    private readonly options?: StoragePipelineOptions,
  ) {
    this.serviceEndpoint = getServiceEndpoint(url);
  }

  /**
   * Returns the cached session for the container `request` targets, acquiring one on first use.
   * The result may be a bearer-fallback sentinel.
   *
   * @internal
   */
  async getSession(
    request: PipelineRequest,
    abortSignal?: AbortSignalLike,
  ): Promise<SessionTokenInfo> {
    return this.getCache(this.containerNameFor(request)).get(abortSignal);
  }

  /**
   * Drops the cached session for the container `request` targets, but only if it is still the
   * one the caller used.
   *
   * @internal
   */
  invalidateSession(request: PipelineRequest, used: SessionTokenInfo): void {
    this.getCache(this.containerNameFor(request)).invalidateIfCurrent(used);
  }

  private containerNameFor(request: PipelineRequest): string {
    return parseContainerAndBlob(new URL(request.url)).containerName.toLowerCase();
  }

  private getCache(containerName: string): AutoRefreshingCache {
    let cache = this.caches.get(containerName);
    if (!cache) {
      // The factory itself issues no request, so a benign duplicate never costs a CreateSession.
      cache = new AutoRefreshingCache((abortSignal) =>
        this.acquireSession(containerName, abortSignal),
      );
      this.caches.set(containerName, cache);
    }
    return cache;
  }

  private async acquireSession(
    containerName: string,
    abortSignal?: AbortSignalLike,
  ): Promise<SessionTokenInfo> {
    this.serviceClient ??= new BlobServiceClient(
      this.serviceEndpoint,
      this.credential,
      this.options,
    );

    try {
      return await createContainerSession(
        this.serviceClient.getContainerClient(containerName),
        abortSignal,
      );
    } catch (error: unknown) {
      if (!isFallbackEligible(error)) {
        throw error;
      }
      // The reason is the actionable part: FeatureNotEnabled means the account opts out entirely.
      const reason = isRestError(error) ? (error.code ?? error.statusCode) : "unknown";
      logger.warning(
        // The container name comes from a caller-supplied URL, so it cannot be trusted to be
        // free of line breaks that would forge a second log record.
        `Create Session failed for container "${containerName.replace(/[\r\n]/g, "")}" ` +
          `(${reason}). Falling back to bearer token authentication for this container until ` +
          `the fallback expires.`,
      );
      return createBearerFallback();
    }
  }
}

/**
 * Splits a blob URL into its container and blob segments. Both are empty strings when the URL
 * does not reach that far, which is how service- and container-level requests are recognized.
 */
function parseContainerAndBlob(parsedUrl: URL): { containerName: string; blobName: string } {
  // IP-style and development endpoints carry the account as the first path segment.
  const containerIndex = isIpEndpointStyle(parsedUrl) ? 2 : 1;
  const segments = parsedUrl.pathname.split("/");

  return {
    containerName: decodeURIComponent(segments[containerIndex] ?? ""),
    blobName: segments.slice(containerIndex + 1).join("/"),
  };
}

/**
 * Reduces any account URL to its blob service endpoint, dropping container and blob segments
 * along with every query component so a SAS is never carried into Create Session.
 */
export function getServiceEndpoint(url: string): string {
  const parsedUrl = new URL(url);
  const accountSegments = isIpEndpointStyle(parsedUrl) ? 2 : 1;

  parsedUrl.pathname = parsedUrl.pathname.split("/").slice(0, accountSegments).join("/");
  parsedUrl.search = "";
  parsedUrl.hash = "";
  return parsedUrl.toString();
}

/**
 * Whether a Create Session failure should fall back to bearer authentication rather than
 * surface to the caller: the account may not have the feature enabled, the identity may lack
 * permission, or the service may be unhealthy. Anything else is a real error.
 */
function isFallbackEligible(error: unknown): boolean {
  if (!isRestError(error) || error.statusCode === undefined) {
    return false;
  }

  return (
    error.statusCode >= 500 ||
    error.statusCode === 403 ||
    (error.statusCode === 400 && error.code?.toLowerCase() === FEATURE_NOT_ENABLED.toLowerCase())
  );
}
