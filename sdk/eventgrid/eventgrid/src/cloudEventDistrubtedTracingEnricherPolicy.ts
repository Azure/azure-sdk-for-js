// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpOperationResponse,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory,
  WebResourceLike
} from "@azure/core-http";

export const CloudEventBatchContentType = "application/cloudevents-batch+json; charset=utf-8";
export const TraceParentHeaderName = "traceparent";
export const TraceStateHeaderName = "tracestate";
export const ContentTypeHeaderName = "Content-Type";

export function cloudEventDistributedTracingEnricherPolicy(): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, _options: RequestPolicyOptions) => {
      return new CloudEventDistributedTracingEnricherPolicy(nextPolicy);
    }
  };
}

/**
 * CloudEventDistributedTracingEnricherPolicy is a policy which adds distributed tracing information
 * to a batch of cloud events. It does so by copying the `traceparent` and `tracestate` properties
 * from the HTTP request into the individual events as extension properties.
 *
 * This will only happen in the case where an event does not have a `traceparent` defined already. This
 * allows events to explicitly set a traceparent and tracestate which would be respected during "multi-hop
 * transmition".
 *
 * See https://github.com/cloudevents/spec/blob/master/extensions/distributed-tracing.md
 * for more information on distributed tracing and cloud events.
 */
export class CloudEventDistributedTracingEnricherPolicy implements RequestPolicy {
  constructor(readonly _nextPolicy: RequestPolicy) {}

  sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
    const traceparent = httpRequest.headers.get(TraceParentHeaderName);
    const tracestate = httpRequest.headers.get(TraceStateHeaderName);

    if (
      httpRequest.headers.get(ContentTypeHeaderName) === CloudEventBatchContentType &&
      typeof httpRequest.body === "string" &&
      traceparent
    ) {
      // per the cloud event batched content type we know the body is an array encoded in JSON.
      const parsedBody = JSON.parse(httpRequest.body) as any[];

      for (const item of parsedBody) {
        // When using the distributed tracing extension, the "traceparent" is a required property
        // and "tracestate" is optional. This means if an item already has a "traceparent" property
        // we should not stomp over it. Well formed events will not have a "tracestate" without
        // also having a "traceparent" so there's no need to guard against that case.
        if (typeof item !== "object" || item.traceparent) {
          continue;
        }

        item.traceparent = traceparent;
        if (tracestate) {
          item.tracestate = tracestate;
        }
      }

      httpRequest.body = JSON.stringify(parsedBody);
    }

    return this._nextPolicy.sendRequest(httpRequest);
  }
}
