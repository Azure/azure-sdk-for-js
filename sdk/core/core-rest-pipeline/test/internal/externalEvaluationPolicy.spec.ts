// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi } from "vitest";
import { AbortError } from "@azure/abort-controller";
import { createClientLogger } from "@azure/logger";
import type { Mock } from "vitest";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../../src/index.js";
import {
  bearerTokenAuthenticationPolicy,
  bearerTokenAuthenticationPolicyName,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineFromOptions,
  createPipelineRequest,
  defaultRetryPolicy,
  externalEvaluationPolicy,
  externalEvaluationPolicyName,
  logPolicy,
  RestError,
} from "../../src/index.js";

const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
const operationUrl =
  `https://management.usgovcloudapi.net/subscriptions/${subscriptionId}` +
  "/resourceGroups/test/providers/Microsoft.Example/widgets/widget?api-version=2026-01-01";
const serializedBody = '{\r\n  "properties": { "count": 1.00, "name": "\\u0061" }\r\n}';
const policyToken = "PoP opaque-policy-token";

function challenge(isChangeReferenceRequired = false): object {
  return {
    error: {
      code: "RequestDisallowedByPolicy",
      additionalInfo: [
        { type: "Unrelated" },
        {
          info: {
            evaluationDetails: {
              missingPolicyTokenDetails: { isChangeReferenceRequired },
            },
          },
        },
      ],
    },
  };
}

function acquisition(policyAction = "Allow"): object {
  return { result: "Succeeded", token: policyToken, results: [{ policyAction }] };
}

function operation(): PipelineRequest {
  return createPipelineRequest({
    url: operationUrl,
    method: "PUT",
    body: serializedBody,
    headers: createHttpHeaders({ "Content-Type": "application/json" }),
  });
}

function response(request: PipelineRequest, status: number, body?: unknown): PipelineResponse {
  return {
    request,
    status,
    headers: createHttpHeaders(),
    bodyAsText: typeof body === "string" ? body : JSON.stringify(body),
  };
}

function successfulFlow(request: PipelineRequest): Mock<SendRequest> {
  return vi
    .fn<SendRequest>()
    .mockResolvedValueOnce(response(request, 403, challenge()))
    .mockImplementationOnce(async (acquireRequest) => response(acquireRequest, 200, acquisition()))
    .mockResolvedValueOnce(response(request, 200));
}

describe("externalEvaluationPolicy", () => {
  it.each([
    [200, {}],
    [403, { error: { code: "Forbidden" } }],
    [403, { error: { code: "RequestDisallowedByPolicy" } }],
    [403, { error: { code: "RequestDisallowedByPolicy", additionalInfo: [] } }],
    [403, { error: { code: "RequestDisallowedByPolicy", additionalInfo: [null] } }],
    [403, "invalid JSON"],
    [403, null],
    [403, challenge(true)],
    [401, challenge()],
    [500, challenge()],
  ])("preserves non-actionable response %s (%j)", async (status, body) => {
    const request = operation();
    const original = response(request, status, body);
    const next = vi.fn<SendRequest>().mockResolvedValue(original);
    expect(await externalEvaluationPolicy().sendRequest(request, next)).toBe(original);
    expect(next).toHaveBeenCalledOnce();
  });

  it.each(["Allow", "Audit"])("acquires and replays once for %s", async (policyAction) => {
    const request = operation();
    request.headers.set("If-Match", "etag");
    request.headers.set("Content-Length", serializedBody.length);
    request.headers.set("x-resource-header", "resource-specific");
    request.headers.set("x-ms-policy-external-evaluations", "old-token");
    const next = vi
      .fn<SendRequest>()
      .mockResolvedValueOnce(response(request, 403, challenge()))
      .mockImplementationOnce(async (acquireRequest) => {
        expect(acquireRequest.url).toBe(
          `https://management.usgovcloudapi.net/subscriptions/${subscriptionId}` +
            "/providers/Microsoft.Authorization/acquirePolicyToken?api-version=2025-11-01",
        );
        expect(acquireRequest.method).toBe("POST");
        expect(acquireRequest.headers.toJSON()).toEqual({
          "content-type": "application/json",
          accept: "application/json",
        });
        expect(acquireRequest.body).toBe(
          `{"operation":{"uri":${JSON.stringify(operationUrl)},"httpMethod":"PUT",` +
            `"content":${serializedBody}}}`,
        );
        return response(acquireRequest, 200, acquisition(policyAction));
      })
      .mockImplementationOnce(async (replay) => {
        expect(replay.url).toBe(operationUrl);
        expect(replay.method).toBe("PUT");
        expect(replay.body).toBe(serializedBody);
        expect(replay.headers.get("x-ms-policy-external-evaluations")).toBe(policyToken);
        expect(replay.headers.get("If-Match")).toBe("etag");
        return response(replay, 201);
      });

    expect((await externalEvaluationPolicy().sendRequest(request, next)).status).toBe(201);
    expect(next).toHaveBeenCalledTimes(3);
  });

  it("restores the captured operation after downstream policies mutate it", async () => {
    const request = operation();
    const next = vi
      .fn<SendRequest>()
      .mockImplementationOnce(async (initial) => {
        initial.url = "https://redirect.example.com";
        initial.method = "POST";
        initial.body = "{}";
        return response(initial, 403, challenge());
      })
      .mockImplementationOnce(async (acquireRequest) => {
        expect(acquireRequest.body).toContain(`"content":${serializedBody}`);
        expect(acquireRequest.body).toContain(JSON.stringify(operationUrl));
        return response(acquireRequest, 200, acquisition());
      })
      .mockImplementationOnce(async (replay) => {
        expect(replay.url).toBe(operationUrl);
        expect(replay.method).toBe("PUT");
        expect(replay.body).toBe(serializedBody);
        return response(replay, 200);
      });
    await externalEvaluationPolicy().sendRequest(request, next);
    expect(next).toHaveBeenCalledTimes(3);
  });

  it("uses a custom ARM origin, not endpoint information in the challenge", async () => {
    const request = operation();
    request.url = operationUrl.replace(
      "https://management.usgovcloudapi.net",
      "https://custom-arm.example.com:8443",
    );
    const body = {
      error: {
        code: "RequestDisallowedByPolicy",
        additionalInfo: [
          {
            info: {
              evaluationDetails: {
                missingPolicyTokenDetails: [
                  {
                    endpointDetails: { uri: "https://untrusted.example.com/acquire" },
                    isChangeReferenceRequired: false,
                  },
                ],
              },
            },
          },
        ],
      },
    };
    const next = vi
      .fn<SendRequest>()
      .mockResolvedValueOnce(response(request, 403, body))
      .mockImplementationOnce(async (acquireRequest) => {
        expect(acquireRequest.url).toBe(
          `https://custom-arm.example.com:8443/subscriptions/${subscriptionId}` +
            "/providers/Microsoft.Authorization/acquirePolicyToken?api-version=2025-11-01",
        );
        return response(acquireRequest, 200, acquisition());
      })
      .mockResolvedValueOnce(response(request, 200));
    await externalEvaluationPolicy().sendRequest(request, next);
    expect(next).toHaveBeenCalledTimes(3);
  });

  it("propagates cancellation, tracing, timeout, proxy, TLS and agent settings only", async () => {
    const request = operation();
    request.abortSignal = new AbortController().signal;
    request.timeout = 1234;
    request.tracingOptions = {};
    request.proxySettings = { host: "proxy.example.com", port: 8080 };
    request.tlsSettings = { ca: "test-ca" };
    request.agent = { destroy() {}, maxFreeSockets: 1, maxSockets: 1, requests: {}, sockets: {} };
    request.disableKeepAlive = true;
    request.streamResponseStatusCodes = new Set([200]);
    request.onDownloadProgress = vi.fn();
    request.onUploadProgress = vi.fn();
    const next = successfulFlow(request);
    await externalEvaluationPolicy({ apiVersion: "custom version" }).sendRequest(request, next);
    const acquireRequest = next.mock.calls[1][0];
    expect(new URL(acquireRequest.url).searchParams.get("api-version")).toBe("custom version");
    for (const key of [
      "abortSignal",
      "timeout",
      "tracingOptions",
      "proxySettings",
      "tlsSettings",
      "agent",
      "disableKeepAlive",
    ] as const) {
      expect(acquireRequest[key]).toBe(request[key]);
    }
    expect(acquireRequest.requestId).not.toBe(request.requestId);
    expect(acquireRequest.streamResponseStatusCodes).toBeUndefined();
    expect(acquireRequest.onDownloadProgress).toBeUndefined();
    expect(acquireRequest.onUploadProgress).toBeUndefined();
  });

  it.each(["PUT", "PATCH", "POST", "DELETE"] as const)(
    "supports bodyless %s requests",
    async (method) => {
      for (const body of [undefined, null]) {
        const request = operation();
        request.method = method;
        request.body = body;
        const next = successfulFlow(request);
        await externalEvaluationPolicy().sendRequest(request, next);
        expect(next.mock.calls[1][0].body).toBe(
          `{"operation":{"uri":${JSON.stringify(operationUrl)},"httpMethod":"${method}"}}`,
        );
        expect(request.body).toBe(body);
        expect(next).toHaveBeenCalledTimes(3);
      }
    },
  );

  it.each([
    { body: new Uint8Array([1, 2]) },
    { body: new ArrayBuffer(4) },
    {
      body: () => {
        throw new Error("Unsupported stream must not be read");
      },
    },
    { body: "not JSON" },
    { body: "" },
    { formData: { key: "value" } },
    { multipartBody: { parts: [] } },
    { method: "GET" as const },
    { url: "not a URL" },
    { url: "https://management.azure.com/providers/Microsoft.Management/managementGroups/group" },
    { url: "https://management.azure.com/subscriptions/not-a-subscription/resourceGroups/test" },
    { url: operationUrl.replace("https:", "http:") },
    { url: operationUrl.replace("https://", "https://user:password@") },
    { url: `${operationUrl}#fragment` },
  ])("preserves the original 403 for unsupported operations (%j)", async (overrides) => {
    const request = Object.assign(operation(), overrides);
    const original = response(request, 403, challenge());
    const next = vi.fn<SendRequest>().mockResolvedValue(original);
    expect(await externalEvaluationPolicy().sendRequest(request, next)).toBe(original);
    expect(next).toHaveBeenCalledOnce();
  });

  it("rejects a non-JSON content type even when the body is valid JSON", async () => {
    const request = operation();
    request.headers.set("content-type", "application/x-www-form-urlencoded");
    const next = vi.fn<SendRequest>().mockResolvedValue(response(request, 403, challenge()));
    await externalEvaluationPolicy().sendRequest(request, next);
    expect(next).toHaveBeenCalledOnce();
  });

  it.each([
    "null",
    "true",
    "0",
    '"string"',
    "[1,2]",
    '{"large":9007199254740993,"duplicate":1,"duplicate":2}',
  ])("embeds valid JSON verbatim (%s)", async (body) => {
    const request = operation();
    request.body = body;
    request.headers.set("content-type", "application/merge-patch+json; charset=utf-8");
    const next = successfulFlow(request);
    await externalEvaluationPolicy().sendRequest(request, next);
    expect(next.mock.calls[1][0].body).toContain(`"content":${body}}}`);
    expect(request.body).toBe(body);
  });

  it.each([
    { result: "Failed", token: policyToken },
    acquisition("Deny"),
    acquisition("Error"),
    { result: "Succeeded" },
    { result: "Succeeded", token: "" },
    { result: "Succeeded", token: "  " },
    { result: "Succeeded", token: 123 },
    { result: "Succeeded", token: policyToken, results: {} },
    { result: "Succeeded", token: policyToken, results: [null] },
    {
      result: "Succeeded",
      token: policyToken,
      results: [{ policyAction: "Allow" }, { policyAction: "Deny" }],
    },
    "invalid JSON",
    null,
    [[]],
  ])("does not replay an unsuccessful or malformed acquisition (%j)", async (body) => {
    const request = operation();
    const original = response(request, 403, challenge());
    const next = vi
      .fn<SendRequest>()
      .mockResolvedValueOnce(original)
      .mockResolvedValueOnce(response(request, 200, body));
    expect(await externalEvaluationPolicy().sendRequest(request, next)).toBe(original);
    expect(request.headers.has("x-ms-policy-external-evaluations")).toBe(false);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it.each([400, 401, 403, 429, 500])(
    "preserves the original error on acquisition HTTP %s",
    async (status) => {
      const request = operation();
      const original = new RestError("original denial", {
        response: response(request, 403, challenge()),
      });
      const next = vi
        .fn<SendRequest>()
        .mockRejectedValueOnce(original)
        .mockRejectedValueOnce(
          new RestError("acquisition failed", {
            response: response(request, status, acquisition()),
          }),
        );
      await expect(externalEvaluationPolicy().sendRequest(request, next)).rejects.toBe(original);
      expect(next).toHaveBeenCalledTimes(2);
    },
  );

  it("preserves a returned 403 when acquisition returns a non-success HTTP response", async () => {
    const request = operation();
    const original = response(request, 403, challenge());
    const next = vi
      .fn<SendRequest>()
      .mockResolvedValueOnce(original)
      .mockResolvedValueOnce(response(request, 500, acquisition()));
    expect(await externalEvaluationPolicy().sendRequest(request, next)).toBe(original);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it.each([false, true])("reads parsed RestError.details (wrapped: %s)", async (wrapped) => {
    const request = operation();
    const original = new RestError("policy denial", { response: response(request, 403) });
    const payload = challenge();
    original.details = wrapped ? payload : Reflect.get(payload, "error");
    const next = vi
      .fn<SendRequest>()
      .mockRejectedValueOnce(original)
      .mockResolvedValueOnce(response(request, 200, acquisition()))
      .mockResolvedValueOnce(response(request, 200));
    expect((await externalEvaluationPolicy().sendRequest(request, next)).status).toBe(200);
    expect(next).toHaveBeenCalledTimes(3);
  });

  it("preserves an unrelated RestError by identity", async () => {
    const request = operation();
    const original = new RestError("policy denial", { response: response(request, 403, "{}") });
    const next = vi.fn<SendRequest>().mockRejectedValue(original);
    await expect(externalEvaluationPolicy().sendRequest(request, next)).rejects.toBe(original);
    expect(next).toHaveBeenCalledOnce();
  });

  it("preserves the original response on acquisition transport failure", async () => {
    const request = operation();
    const original = response(request, 403, challenge());
    const next = vi
      .fn<SendRequest>()
      .mockResolvedValueOnce(original)
      .mockRejectedValueOnce(
        new RestError("connection failed", { code: RestError.REQUEST_SEND_ERROR }),
      );
    expect(await externalEvaluationPolicy().sendRequest(request, next)).toBe(original);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it("propagates cancellation during acquisition without replay", async () => {
    const request = operation();
    const controller = new AbortController();
    request.abortSignal = controller.signal;
    const aborted = new AbortError();
    const next = vi
      .fn<SendRequest>()
      .mockResolvedValueOnce(response(request, 403, challenge()))
      .mockImplementationOnce(async (acquireRequest) => {
        expect(acquireRequest.abortSignal).toBe(controller.signal);
        controller.abort();
        throw aborted;
      });
    await expect(externalEvaluationPolicy().sendRequest(request, next)).rejects.toBe(aborted);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it("propagates non-RestError failures", async () => {
    const request = operation();
    const failure = new Error("transport failed");
    const next = vi.fn<SendRequest>().mockRejectedValue(failure);
    await expect(externalEvaluationPolicy().sendRequest(request, next)).rejects.toBe(failure);
    next
      .mockReset()
      .mockResolvedValueOnce(response(request, 403, challenge()))
      .mockRejectedValueOnce(failure);
    await expect(externalEvaluationPolicy().sendRequest(request, next)).rejects.toBe(failure);
  });

  it.each([false, true])(
    "surfaces the replay's denial without reacquiring (throw: %s)",
    async (throws) => {
      const request = operation();
      const replay = response(request, 403, challenge());
      const error = new RestError("replay denied", { response: replay });
      const next = vi
        .fn<SendRequest>()
        .mockResolvedValueOnce(response(request, 403, challenge()))
        .mockResolvedValueOnce(response(request, 200, acquisition()));
      if (throws) {
        next.mockRejectedValueOnce(error);
        await expect(externalEvaluationPolicy().sendRequest(request, next)).rejects.toBe(error);
      } else {
        next.mockResolvedValueOnce(replay);
        expect(await externalEvaluationPolicy().sendRequest(request, next)).toBe(replay);
      }
      expect(next).toHaveBeenCalledTimes(3);
    },
  );

  it("rejects changeReference requirements even after another actionable entry", async () => {
    const request = operation();
    const body = {
      error: {
        code: "RequestDisallowedByPolicy",
        additionalInfo: [
          { info: { evaluationDetails: { missingPolicyTokenDetails: [{}] } } },
          {
            info: {
              evaluationDetails: {
                missingPolicyTokenDetails: [{ isChangeReferenceRequired: true }],
              },
            },
          },
        ],
      },
    };
    const original = response(request, 403, body);
    const next = vi.fn<SendRequest>().mockResolvedValue(original);
    expect(await externalEvaluationPolicy().sendRequest(request, next)).toBe(original);
    expect(next).toHaveBeenCalledOnce();
  });

  it("logs safe diagnostics without payloads or tokens", async () => {
    const logger = createClientLogger("external-evaluation-test");
    const warning = vi.spyOn(logger, "warning");
    const info = vi.spyOn(logger, "info");
    try {
      const request = operation();
      await externalEvaluationPolicy({ logger }).sendRequest(request, successfulFlow(request));
      const next = vi
        .fn<SendRequest>()
        .mockResolvedValueOnce(response(request, 403, challenge()))
        .mockResolvedValueOnce(response(request, 500, acquisition()));
      await externalEvaluationPolicy({ logger }).sendRequest(request, next);
      expect(info).toHaveBeenCalledOnce();
      expect(warning).toHaveBeenCalledOnce();
      const logs = JSON.stringify([warning.mock.calls, info.mock.calls]);
      expect(logs).not.toContain(policyToken);
      expect(logs).not.toContain(serializedBody);
      expect(logs).not.toContain(operationUrl);
    } finally {
      warning.mockRestore();
      info.mockRestore();
    }
  });
});

describe("External Evaluation ARM integration fixture", () => {
  it.each([undefined, "Sign"] as const)(
    "runs after serialization, before bearer (phase: %s) and outside standard retry",
    async (phase) => {
      const pipeline = createPipelineFromOptions({});
      pipeline.addPolicy(
        {
          name: "serializeOperation",
          async sendRequest(request, next) {
            request.body = serializedBody;
            return next(request);
          },
        },
        { phase: "Serialize" },
      );
      pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({
          scopes: "https://management.usgovcloudapi.net/.default",
          credential: {
            async getToken() {
              return { token: "access-token", expiresOnTimestamp: Date.now() + 3_600_000 };
            },
          },
        }),
        { phase },
      );
      pipeline.addPolicy(externalEvaluationPolicy(), {
        beforePolicies: [bearerTokenAuthenticationPolicyName],
      });
      const order = pipeline.getOrderedPolicies().map((policy) => policy.name);
      expect(order.indexOf("serializeOperation")).toBeLessThan(
        order.indexOf(externalEvaluationPolicyName),
      );
      expect(order.indexOf(externalEvaluationPolicyName)).toBeLessThan(
        order.indexOf("defaultRetryPolicy"),
      );
      expect(order.indexOf(externalEvaluationPolicyName)).toBeLessThan(
        order.indexOf(bearerTokenAuthenticationPolicyName),
      );

      const request = operation();
      request.body = undefined;
      const calls: { url: string; method: string; body: unknown; token?: string }[] = [];
      const sendRequest = vi.fn<SendRequest>().mockImplementation(async (sent) => {
        expect(sent.headers.get("Authorization")).toBe("Bearer access-token");
        calls.push({
          url: sent.url,
          method: sent.method,
          body: sent.body,
          token: sent.headers.get("x-ms-policy-external-evaluations"),
        });
        switch (calls.length) {
          case 1:
            return response(sent, 403, challenge());
          case 2:
            expect(sent.headers.has("x-ms-policy-external-evaluations")).toBe(false);
            return response(sent, 200, acquisition());
          case 3:
            return response(sent, 200, { name: "widget" });
          default:
            throw new Error("Unexpected request");
        }
      });
      expect((await pipeline.sendRequest({ sendRequest }, request)).status).toBe(200);
      expect(calls).toHaveLength(3);
      expect(calls[0]).toEqual({
        url: operationUrl,
        method: "PUT",
        body: serializedBody,
        token: undefined,
      });
      expect(calls[1].body).toContain(`"content":${serializedBody}`);
      expect(calls[2]).toEqual({ ...calls[0], token: policyToken });
    },
  );

  it("preserves standard transient retries for the operation, acquisition and replay", async () => {
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(externalEvaluationPolicy());
    pipeline.addPolicy(defaultRetryPolicy({ maxRetries: 1, retryDelayInMs: 1 }), {
      phase: "Retry",
    });
    const request = operation();
    const next = vi.fn<SendRequest>();
    for (const [status, body] of [
      [503, {}],
      [403, challenge()],
      [503, {}],
      [200, acquisition()],
      [503, {}],
      [200, {}],
    ] as const) {
      next.mockImplementationOnce(async (sent) => response(sent, status, body));
    }
    expect((await pipeline.sendRequest({ sendRequest: next }, request)).status).toBe(200);
    expect(next).toHaveBeenCalledTimes(6);
  });

  it("allows acquisition to complete a bearer CAE challenge", async () => {
    const pipeline = createEmptyPipeline();
    const getToken = vi.fn().mockResolvedValue({
      token: "access-token",
      expiresOnTimestamp: Date.now() + 3_600_000,
    });
    pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        scopes: "https://management.azure.com/.default",
        credential: { getToken },
      }),
      { phase: "Sign" },
    );
    pipeline.addPolicy(externalEvaluationPolicy(), {
      beforePolicies: [bearerTokenAuthenticationPolicyName],
    });
    const request = operation();
    const next = vi
      .fn<SendRequest>()
      .mockResolvedValueOnce(response(request, 403, challenge()))
      .mockImplementationOnce(async (sent) => ({
        ...response(sent, 401),
        headers: createHttpHeaders({
          "WWW-Authenticate": 'Bearer error="insufficient_claims", claims="e30="',
        }),
      }))
      .mockImplementationOnce(async (sent) => response(sent, 200, acquisition()))
      .mockImplementationOnce(async (sent) => response(sent, 200));
    expect((await pipeline.sendRequest({ sendRequest: next }, request)).status).toBe(200);
    expect(next).toHaveBeenCalledTimes(4);
    expect(getToken).toHaveBeenCalledWith(
      ["https://management.azure.com/.default"],
      expect.objectContaining({ enableCae: true, claims: "{}" }),
    );
  });

  it("does not enable External Evaluation for ordinary pipelines", () => {
    expect(
      createPipelineFromOptions({})
        .getOrderedPolicies()
        .map((policy) => policy.name),
    ).not.toContain(externalEvaluationPolicyName);
  });

  it("redacts authentication and policy token headers from pipeline logs", async () => {
    const pipeline = createEmptyPipeline();
    const logger = createClientLogger("external-evaluation-http-test").info;
    logger.enabled = true;
    const log = vi.spyOn(logger, "log").mockImplementation(() => {});
    try {
      pipeline.addPolicy(externalEvaluationPolicy());
      pipeline.addPolicy(logPolicy({ logger }));
      const request = operation();
      request.headers.set("Authorization", "Bearer access-token");
      await pipeline.sendRequest({ sendRequest: successfulFlow(request) }, request);
      expect(log).toHaveBeenCalled();
      const logs = JSON.stringify(log.mock.calls);
      expect(logs).not.toContain(policyToken);
      expect(logs).not.toContain("access-token");
      expect(logs).not.toContain("opaque-policy-token");
      expect(logs).not.toContain("count");
    } finally {
      log.mockRestore();
      logger.enabled = false;
    }
  });
});
