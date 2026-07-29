// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi } from "vitest";
import type { PipelineRequest, PipelineResponse, SendRequest } from "../../src/interfaces.js";
import { createHttpHeaders } from "../../src/httpHeaders.js";
import { createPipelineRequest } from "../../src/pipelineRequest.js";
import { externalEvaluationPolicy } from "../../src/policies/externalEvaluationPolicy.js";

describe("externalEvaluationPolicy", function () {
  it("acquire a policy token and retry a matching challenge", async function () {
    const url = "https://management.azure.com/subscriptions/subscription-id/resourceGroups/group/providers/Microsoft.Example/widgets/widget";
    const request = createPipelineRequest({
      url,
      method: "PUT",
      body: JSON.stringify({ name: "widget" }),
      headers: createHttpHeaders({ Authorization: "Bearer credential" }),
    });
    const challengeResponse = createResponse(
      request,
      403,
      JSON.stringify({
        error: {
          code: "RequestDisallowedByPolicy",
          additionalInfo: [
            {
              info: {
                evaluationDetails: {
                  missingPolicyTokenDetails: {},
                },
              },
            },
          ],
        },
      }),
    );
    const successResponse = createResponse(request, 200);
    const next = vi
      .fn<SendRequest>()
      .mockResolvedValueOnce(challengeResponse)
      .mockImplementationOnce(async (acquireRequest) => {
        expect(acquireRequest.url).toBe(url);
        expect(acquireRequest.method).toBe("POST");
        expect(acquireRequest.headers.get("Authorization")).toBe("Bearer credential");
        expect(JSON.parse(acquireRequest.body as string)).toEqual({
          properties: {
            operation: {
              uri: request.url,
              method: request.method,
              content: request.body,
            },
          },
        });
        return createResponse(
          acquireRequest,
          200,
          JSON.stringify({ properties: { token: "Pop token" } }),
        );
      })
      .mockResolvedValueOnce(successResponse);

    const response = await externalEvaluationPolicy().sendRequest(request, next);

    expect(response).toBe(successResponse);
    expect(next).toHaveBeenCalledTimes(3);
    expect(next).toHaveBeenLastCalledWith(request);
    expect(request.headers.get("x-ms-policy-external-evaluations")).toBe("Pop token");
  });

  it("returns a 403 without RequestDisallowedByPolicy", async function () {
    const request = createPipelineRequest({
      url: "https://management.azure.com/subscriptions/subscription-id/resourceGroups/group",
      method: "DELETE",
    });
    const forbiddenResponse = createResponse(
      request,
      403,
      JSON.stringify({ error: { code: "Failed" } }),
    );
    const next = vi.fn<SendRequest>().mockResolvedValue(forbiddenResponse);

    const response = await externalEvaluationPolicy().sendRequest(request, next);

    expect(response).toBe(forbiddenResponse);
    expect(next).toHaveBeenCalledOnce();
    expect(request.headers.has("x-ms-policy-external-evaluations")).toBe(false);
  });
});

function createResponse(
  request: PipelineRequest,
  status: number,
  bodyAsText?: string,
): PipelineResponse {
  return {
    request,
    status,
    headers: createHttpHeaders(),
    bodyAsText,
  };
}
