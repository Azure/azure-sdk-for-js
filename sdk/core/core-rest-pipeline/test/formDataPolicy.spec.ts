// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, describe, it, vi, expect } from "vitest";

import {
  type PipelineResponse,
  type SendRequest,
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  formDataPolicy,
  multipartPolicy,
} from "../src";
import type { FormDataMap } from "../src/interfaces";

export async function performRequest(formData: FormDataMap): Promise<PipelineResponse> {
  const request = createPipelineRequest({
    url: "https://bing.com",
    headers: createHttpHeaders({
      "Content-Type": "multipart/form-data",
    }),
    formData,
  });
  const successResponse: PipelineResponse = {
    headers: createHttpHeaders(),
    request,
    status: 200,
  };
  const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
  next.mockResolvedValue(successResponse);

  const policy = formDataPolicy();

  return policy.sendRequest(request, next);
}

describe("formDataPolicy", function () {
  it("prepares x-www-form-urlencoded form data correctly", async function () {
    const request = createPipelineRequest({
      url: "https://bing.com",
      headers: createHttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });
    request.formData = {
      service: "registry.azurecr.io",
      scope: "repository:library/hello-world:metadata_read",
    };
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.mockResolvedValue(successResponse);

    const policy = formDataPolicy();

    const result = await policy.sendRequest(request, next);

    assert.isUndefined(result.request.formData);
    assert.strictEqual(
      result.request.body,
      `service=registry.azurecr.io&scope=repository%3Alibrary%2Fhello-world%3Ametadata_read`,
    );
  });

  it("prepares x-www-form-urlencoded form data correctly for array value", async function () {
    const request = createPipelineRequest({
      url: "https://bing.com",
      headers: createHttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });
    request.formData = { a: "va", b: "vb", c: ["vc1", "vc2"] };
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.mockResolvedValue(successResponse);

    const policy = formDataPolicy();

    const result = await policy.sendRequest(request, next);

    assert.isUndefined(result.request.formData);
    assert.strictEqual(result.request.body, `a=va&b=vb&c=vc1&c=vc2`);
  });

  describe("multipart/form-data", function () {
    // test issue: in main the test is passing because we are not await policy.sendRequest()
    it.skip("throws if request.body is already present", async function () {
      const request = createPipelineRequest({
        url: "https://bing.com",
        headers: createHttpHeaders({
          "Content-Type": "multipart/form-data",
        }),
        formData: {},
        body: "AAAAAAAAAAAA",
      });
      const successResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request,
        status: 200,
      };
      const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
      next.mockResolvedValue(successResponse);

      const policy = formDataPolicy();

      await expect(policy.sendRequest(request, next)).rejects.toThrow(
        /multipart\/form-data request must not have a request body already specified/,
      );
    });
  });
});
