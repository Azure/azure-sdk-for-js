// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { cloudEventDistributedTracingEnricherPolicy } from "../../src/cloudEventDistrubtedTracingEnricherPolicy";
import {
  PipelineRequest,
  PipelineResponse,
  createPipelineRequest,
  SendRequest,
} from "@azure/core-rest-pipeline";

const CloudEventBatchContentType = "application/cloudevents-batch+json; charset=utf-8";

describe("CloudEventDistributedTracingEnricherPolicy", function () {
  const emptyResponse: SendRequest = (request: PipelineRequest): Promise<PipelineResponse> => {
    return Promise.resolve({ request: request, status: 200, headers: request.headers });
  };

  const TraceParentHeaderValue = "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01";
  const TraceStateHeaderValue =
    "rojo=00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01,congo=lZWRzIHRoNhcm5hbCBwbGVhc3VyZS4";

  it("copies traceparent and tracestate as expected", async () => {
    const policy = cloudEventDistributedTracingEnricherPolicy();

    const request = createPipelineRequest({ url: "https://example.com" });
    request.headers.set("content-type", CloudEventBatchContentType);
    request.headers.set("traceparent", TraceParentHeaderValue);
    request.headers.set("tracestate", TraceStateHeaderValue);
    request.body = JSON.stringify([{}, {}]);

    const resp = await policy.sendRequest(request, emptyResponse);
    const parsedBody = JSON.parse(resp.request.body as string);

    assert.equal(parsedBody[0].traceparent, TraceParentHeaderValue);
    assert.equal(parsedBody[0].tracestate, TraceStateHeaderValue);
    assert.equal(parsedBody[1].traceparent, TraceParentHeaderValue);
    assert.equal(parsedBody[1].tracestate, TraceStateHeaderValue);
  });

  it("does nothing when no distributed tracing headers exists", async () => {
    const policy = cloudEventDistributedTracingEnricherPolicy();

    const request = createPipelineRequest({ url: "https://example.com" });
    request.headers.set("content-type", CloudEventBatchContentType);
    request.body = JSON.stringify([{}, {}]);

    const resp = await policy.sendRequest(request, emptyResponse);
    const parsedBody = JSON.parse(resp.request.body as string);

    assert.isUndefined(parsedBody[0].traceparent);
    assert.isUndefined(parsedBody[0].tracestate);
    assert.isUndefined(parsedBody[1].traceparent);
    assert.isUndefined(parsedBody[1].tracestate);
  });

  it("does not overwrite an existing traceparent or tracestate", async () => {
    const policy = cloudEventDistributedTracingEnricherPolicy();

    const traceparent = "00-0af7651916cd43dd8448eb211c80319c-b9c7c989f97918e1-01";
    const tracestate =
      "rojo=00-0af7651916cd43dd8448eb211c80319c-b9c7c989f97918e1-01,congo=lZWRzIHRoNhcm5hbCBwbGVhc3VyZS4";

    const request = createPipelineRequest({ url: "https://example.com" });
    request.headers.set("content-type", CloudEventBatchContentType);
    request.headers.set("traceparent", TraceParentHeaderValue);
    request.headers.set("tracestate", TraceStateHeaderValue);
    request.body = JSON.stringify([
      {
        traceparent,
        tracestate,
      },
      {},
    ]);

    const resp = await policy.sendRequest(request, emptyResponse);
    const parsedBody = JSON.parse(resp.request.body as string);

    // The first event already had some tracing information, and it shouldn't be overwritten
    assert.equal(parsedBody[0].traceparent, traceparent);
    assert.equal(parsedBody[0].tracestate, tracestate);

    // The second event did not have tracing information, so it should be set to the values
    // from the request.
    assert.equal(parsedBody[1].traceparent, TraceParentHeaderValue);
    assert.equal(parsedBody[1].tracestate, TraceStateHeaderValue);
  });

  it("only enriches requests with the cloud event content type", async () => {
    const policy = cloudEventDistributedTracingEnricherPolicy();

    const request = createPipelineRequest({ url: "https://example.com" });
    request.headers.set("content-type", "application/json");
    request.headers.set("traceparent", TraceParentHeaderValue);
    request.headers.set("tracestate", TraceStateHeaderValue);
    request.body = JSON.stringify([{}, {}]);

    const resp = await policy.sendRequest(request, emptyResponse);

    const parsedBody = JSON.parse(resp.request.body as string);

    assert.isUndefined(parsedBody[0].traceparent);
    assert.isUndefined(parsedBody[0].tracestate);
    assert.isUndefined(parsedBody[1].traceparent);
    assert.isUndefined(parsedBody[1].tracestate);
  });

  it("does not fail when there are no events", async () => {
    const policy = cloudEventDistributedTracingEnricherPolicy();

    const request = createPipelineRequest({ url: "https://example.com" });
    request.headers.set("content-type", CloudEventBatchContentType);
    request.headers.set("traceparent", TraceParentHeaderValue);
    request.headers.set("tracestate", TraceStateHeaderValue);
    request.body = JSON.stringify([]);

    const resp = await policy.sendRequest(request, emptyResponse);

    assert.equal(resp.request.body, JSON.stringify([]));
  });
});
