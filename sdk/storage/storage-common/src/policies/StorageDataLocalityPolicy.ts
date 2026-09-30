// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { isNodeLike } from "@azure/core-util";

/**
 * The programmatic identifier of the storageDataLocalityPolicy.
 */
export const storageDataLocalityPolicyName = "storageDataLocalityPolicy";

/**
 * Request header carrying the layout endpoint a request should be routed to.
 *
 * `PipelineRequest` has no property bag, so the endpoint is smuggled to the policy as a header,
 * which the policy keeps off the wire. Deliberately not prefixed with `x-ms-`, because Shared Key
 * signing canonicalizes every `x-ms-` header and would sign a header that never reaches the wire.
 *
 * Exported so the service packages that set it cannot drift from the policy that reads it.
 */
export const LAYOUT_ENDPOINT_HEADER = "x-azsdk-layout-endpoint";

/**
 * storageDataLocalityPolicy redirects a request to the layout endpoint that serves the range
 * being read, while keeping the request logically addressed to the original account.
 *
 * The connection is made to the layout endpoint, but the `Host` header keeps the account
 * authority the rest of the request was built and signed for. Only the host and port are
 * replaced; scheme, path and query are untouched, so the endpoint is purely a routing hint.
 *
 * Requests without the layout endpoint header pass through unchanged. Outside Node.js the
 * endpoint is ignored and the request is sent to the account. Every attempt is routed afresh, so
 * a retry is routed again, while an attempt a retry policy moves to another host, such as the
 * secondary, is not routed.
 */
export function storageDataLocalityPolicy(): PipelinePolicy {
  // Retries reuse the request object; this remembers the host its first attempt was addressed to.
  const accountHosts = new WeakMap<PipelineRequest, string>();
  return {
    name: storageDataLocalityPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const layoutEndpoint = request.headers.get(LAYOUT_ENDPOINT_HEADER);
      if (!layoutEndpoint) {
        return next(request);
      }

      const originalUrl = request.url;
      const originalHostHeader = request.headers.get("Host");
      const host = new URL(originalUrl).host;
      if (!accountHosts.has(request)) {
        accountHosts.set(request, host);
      }

      request.headers.delete(LAYOUT_ENDPOINT_HEADER);
      try {
        const layoutHost =
          host === accountHosts.get(request) ? parseLayoutHost(layoutEndpoint) : undefined;
        if (layoutHost) {
          const url = new URL(originalUrl);
          (url as unknown as { host: string }).host = layoutHost;
          request.url = url.toString();
          request.headers.set("Host", host);
        }
        return await next(request);
      } finally {
        // The storage retry policy resets only the URL before re-sending this same request.
        request.url = originalUrl;
        if (originalHostHeader === undefined) {
          request.headers.delete("Host");
        } else {
          request.headers.set("Host", originalHostHeader);
        }
        request.headers.set(LAYOUT_ENDPOINT_HEADER, layoutEndpoint);
      }
    },
  };
}

/**
 * Returns the host a request should be sent to for `layoutEndpoint`, or undefined when it cannot
 * be routed.
 */
function parseLayoutHost(layoutEndpoint: string): string | undefined {
  // Browsers forbid setting `Host`, without which the endpoint cannot tell which account is meant.
  if (!isNodeLike) {
    return undefined;
  }
  // Routing is an optimization: any endpoint serves any range, so an endpoint we cannot make
  // sense of costs a relayed read, never the download itself.
  try {
    // Endpoints come as an absolute URI or a bare `hostname:port`; only the host is used.
    const absolute = layoutEndpoint.includes("://") ? layoutEndpoint : `https://${layoutEndpoint}`;
    return new URL(absolute).host || undefined;
  } catch {
    return undefined;
  }
}
