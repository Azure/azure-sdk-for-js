// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import {
  type PipelineResponse,
  type SendRequest,
  createPipelineRequest,
  createHttpHeaders,
} from "../../../src/index.js";
import { formDataPolicy } from "../../../src/policies/internal.js";

describe("formDataPolicy (react-native)", () => {
  describe("FormData request bodies", () => {
    it("should be passed through in react-native", async () => {
      const request = createPipelineRequest({
        url: "https://bing.com",
        headers: createHttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      });
      const formData = new FormData();
      formData.append("service", "registry.azurecr.io");
      formData.append("scope", "repository:library/hello-world:metadata_read");
      request.body = formData;

      const successResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request,
        status: 200,
      };
      const next = vi.fn<SendRequest>();
      next.mockResolvedValue(successResponse);

      const policy = formDataPolicy();

      const result = await policy.sendRequest(request, next);

      assert.isUndefined(result.request.formData);
      assert.strictEqual(result.request.body, formData);
    });
  });
});
