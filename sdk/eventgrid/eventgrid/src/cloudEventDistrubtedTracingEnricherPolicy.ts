// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

export const CloudEventBatchContentType = "application/cloudevents-batch+json; charset=utf-8";
export const TraceParentHeaderName = "traceparent";
export const TraceStateHeaderName = "tracestate";
export const ContentTypeHeaderName = "Content-Type";

/**
 * The programmatic identifier of the cloudEventDistributedTracingEnricherPolicy.
 */
export const cloudEventDistributedTracingEnricherPolicyName =
  "cloudEventDistributedTracingEnricherPolicy";

/**
 * cloudEventDistributedTracingEnricherPolicy is a policy which adds distributed tracing information
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
export function cloudEventDistributedTracingEnricherPolicy(): PipelinePolicy {
  return {
    name: cloudEventDistributedTracingEnricherPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const traceparent = request.headers.get(TraceParentHeaderName);
      const tracestate = request.headers.get(TraceStateHeaderName);

      if (
        request.headers.get(ContentTypeHeaderName) === CloudEventBatchContentType &&
        typeof request.body === "string" &&
        traceparent
      ) {
        // per the cloud event batched content type we know the body is an array encoded in JSON.
        const parsedBody = JSON.parse(request.body) as any[];

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

        request.body = JSON.stringify(parsedBody);
      }

      return next(request);
    },
  };
}
