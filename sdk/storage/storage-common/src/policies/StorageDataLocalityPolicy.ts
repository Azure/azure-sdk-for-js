// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

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
 * Requests without the layout endpoint header pass through unchanged.
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

      // Routing is an optimization: any endpoint serves any range, so an endpoint we cannot make
      // sense of costs a relayed read, never the download itself.
      let layoutHost: string;
      try {
        // The endpoint arrives as an absolute URI, e.g. https://blob.stamp.store.core.windows.net:443/
        layoutHost = new URL(layoutEndpoint).host;
      } catch {
        return next(request);
      }
      if (!layoutHost) {
        return next(request);
      }

      const url = new URL(request.url);
      const originalHost = url.host;
      url.host = layoutHost;
      request.url = url.toString();
      request.headers.set("Host", originalHost);

      return next(request);
    },
  };
}
