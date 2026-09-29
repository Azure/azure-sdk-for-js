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
 * `PipelineRequest` has no property bag, so the endpoint is smuggled to the policy as a header
 * that the policy consumes and removes before the request is sent. Deliberately not prefixed
 * with `x-ms-`, because Shared Key signing canonicalizes every `x-ms-` header and would sign a
 * header that never reaches the wire.
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
 * endpoint is ignored and the request is sent to the account.
 */
export function storageDataLocalityPolicy(): PipelinePolicy {
  return {
    name: storageDataLocalityPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const layoutEndpoint = request.headers.get(LAYOUT_ENDPOINT_HEADER);
      if (!layoutEndpoint) {
        return next(request);
      }
      request.headers.delete(LAYOUT_ENDPOINT_HEADER);
      // Browsers forbid setting `Host`, without which the endpoint cannot tell which account is meant.
      if (!isNodeLike) {
        return next(request);
      }

      // Routing is an optimization: any endpoint serves any range, so an endpoint we cannot make
      // sense of costs a relayed read, never the download itself.
      let layoutHost: string;
      try {
        // Endpoints come as an absolute URI or a bare `hostname:port`; only the host is used.
        const absolute = layoutEndpoint.includes("://")
          ? layoutEndpoint
          : `https://${layoutEndpoint}`;
        layoutHost = new URL(absolute).host;
      } catch {
        return next(request);
      }
      if (!layoutHost) {
        return next(request);
      }

      const url = new URL(request.url);
      const originalHost = url.host;
      (url as unknown as { host: string }).host = layoutHost;
      request.url = url.toString();
      request.headers.set("Host", originalHost);

      return next(request);
    },
  };
}
