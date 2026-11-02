// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { describe, expect, it, vi } from "vitest";
import type { PipelineResponse, SendRequest } from "../../../src/index.js";
import {
  createHttpHeaders,
  createPipelineRequest,
  externalEvaluationPolicy,
} from "../../../src/index.js";

describe("externalEvaluationPolicy response disposal", () => {
  it.each([true, false])(
    "disposes the original stream only before replay (acquisition succeeds: %s)",
    async (succeeds) => {
      const request = createPipelineRequest({
        url: "https://management.azure.com/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/resourceGroups/test?api-version=2026-01-01",
        method: "DELETE",
      });
      const stream = new Readable({ read() {} });
      const original: PipelineResponse = {
        request,
        status: 403,
        headers: createHttpHeaders(),
        readableStreamBody: stream,
        bodyAsText: JSON.stringify({
          error: {
            code: "RequestDisallowedByPolicy",
            additionalInfo: [{ info: { evaluationDetails: { missingPolicyTokenDetails: {} } } }],
          },
        }),
      };
      const next = vi
        .fn<SendRequest>()
        .mockResolvedValueOnce(original)
        .mockResolvedValueOnce({
          request,
          status: 200,
          headers: createHttpHeaders(),
          bodyAsText: JSON.stringify(
            succeeds ? { result: "Succeeded", token: "PoP test-token" } : {},
          ),
        })
        .mockImplementationOnce(async (replay) => {
          expect(stream.destroyed).toBe(true);
          return { request: replay, status: 200, headers: createHttpHeaders() };
        });
      try {
        await externalEvaluationPolicy().sendRequest(request, next);
        expect(stream.destroyed).toBe(succeeds);
        expect(next).toHaveBeenCalledTimes(succeeds ? 3 : 2);
      } finally {
        stream.destroy();
      }
    },
  );
});
