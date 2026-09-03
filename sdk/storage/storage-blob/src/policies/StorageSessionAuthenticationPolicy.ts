// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import {
  StorageSharedKeyCredential,
  buildStorageSharedKeyStringToSign,
  prepareSharedKeyHeaders,
} from "@azure/storage-common";
import {
  ContainerSessionProvider,
  getServiceEndpoint,
  isSessionEligible,
} from "../session/ContainerSessionProvider.js";
import type { ActiveSession } from "../session/models.js";
import type { StoragePipelineOptions } from "../Pipeline.js";
import { HeaderConstants, HTTPURLConnection } from "../utils/constants.js";
import { getAccountNameFromUrl } from "../utils/utils.common.js";

/**
 * The programmatic identifier of the storageSessionAuthenticationPolicy.
 */
export const storageSessionAuthenticationPolicyName = "storageSessionAuthenticationPolicy";

/**
 * Options used to configure storageSessionAuthenticationPolicy.
 */
export interface StorageSessionAuthenticationPolicyOptions {
  /** Policy used whenever a request cannot be authenticated with a session. */
  bearerPolicy: PipelinePolicy;
  /** Credential used to mint sessions when the caller supplies no provider. */
  credential: TokenCredential;
  /** Client options, forwarded to a provider created on demand. */
  clientOptions: StoragePipelineOptions;
}

/**
 * storageSessionAuthenticationPolicy authenticates eligible requests with a container-scoped
 * session token, falling back to `bearerPolicy` for everything else.
 *
 * This policy is only installed when sessions are enabled, so it carries no mode check of its
 * own; a disabled client registers the bearer policy directly instead.
 */
export function storageSessionAuthenticationPolicy(
  options: StorageSessionAuthenticationPolicyOptions,
): PipelinePolicy {
  const { bearerPolicy, credential, clientOptions } = options;
  const accountName = clientOptions.sessionOptions?.accountName;

  // One provider per account. A single Pipeline can be shared across clients for different
  // accounts, and a session is only ever valid for the account that issued it. Deferred because
  // the pipeline is built before any URL is known.
  //
  // Deliberately uncapped: an entry only appears for an endpoint the caller drives traffic to, so
  // the size is bounded by the caller's own account set. Evicting would re-mint every container
  // session behind the evicted account, trading a caller-controlled footprint for load on the
  // service.
  const providers = new Map<string, ContainerSessionProvider>();
  const getProvider = (request: PipelineRequest): ContainerSessionProvider => {
    const endpoint = getServiceEndpoint(request.url);
    let provider = providers.get(endpoint);
    if (!provider) {
      provider = new ContainerSessionProvider(request.url, credential, {
        ...clientOptions,
        // The inner client only issues Create Session, which is never session-eligible.
        sessionOptions: undefined,
      });
      providers.set(endpoint, provider);
    }
    return provider;
  };

  return {
    name: storageSessionAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!isSessionEligible(request)) {
        return bearerPolicy.sendRequest(request, next);
      }

      const session = await getProvider(request).getSession(request, request.abortSignal);
      if (session.kind === "bearerFallback") {
        return bearerPolicy.sendRequest(request, next);
      }

      signRequest(request, session, accountName);
      const response = await next(request);
      if (response.status !== HTTPURLConnection.HTTP_UNAUTHORIZED) {
        return response;
      }

      // The session was rejected, revoked, or expired early. Drop it so the next request mints
      // a fresh one, and let this request through on a bearer token exactly once.
      getProvider(request).invalidateSession(request, session);
      request.headers.delete(HeaderConstants.AUTHORIZATION);
      request.headers.delete(HeaderConstants.X_MS_DATE);
      return bearerPolicy.sendRequest(request, next);
    },
  };
}

/**
 * Signs the request with the session key using the Shared Key protocol, then sets the
 * Authorization header with the Session scheme.
 */
function signRequest(
  request: PipelineRequest,
  session: ActiveSession,
  configuredAccountName?: string,
): void {
  const accountName = configuredAccountName || getAccountNameFromUrl(request.url);
  if (!accountName) {
    throw new Error(
      "The storage account name could not be determined from the request URL. " +
        "Set sessionOptions.accountName when using a custom endpoint URL.",
    );
  }

  prepareSharedKeyHeaders(request);
  const stringToSign = buildStorageSharedKeyStringToSign(request, accountName);
  const signature = new StorageSharedKeyCredential(
    accountName,
    session.sessionKey,
  ).computeHMACSHA256(stringToSign);

  request.headers.set(
    HeaderConstants.AUTHORIZATION,
    `Session ${session.sessionToken}:${signature}`,
  );
}
