// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import {
  type PipelineResponse,
  type SendRequest,
  type BodyPart,
  type FormDataMap,
  createPipelineRequest,
  createHttpHeaders,
  stringToUint8Array,
} from "../../src/index.js";
import { formDataPolicy } from "../../src/policies/internal.js";

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
  const next = vi.fn<SendRequest>();
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
    const next = vi.fn<SendRequest>();
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
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const policy = formDataPolicy();

    const result = await policy.sendRequest(request, next);

    assert.isUndefined(result.request.formData);
    assert.strictEqual(result.request.body, `a=va&b=vb&c=vc1&c=vc2`);
  });

  it("prepares a form with multiple fields correctly", async function () {
    // add field with spooky unicode characters to ensure encoding is working
    const result = await performRequest({ a: "va", b: "vb", c: "👻👻" });
    assert.isUndefined(result.request.formData);
    const multipartBody = result.request.multipartBody as any;
    assert.isDefined(multipartBody, "expecting multipartBody to be defined");
    const parts = (multipartBody as any).parts as BodyPart[];
    assert.equal(parts.length, 3, "need 3 parts");
    assert.deepEqual(parts[0], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="a"`,
      }),
      body: stringToUint8Array("va", "utf-8"),
    });
    assert.deepEqual(parts[1], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="b"`,
      }),
      body: stringToUint8Array("vb", "utf-8"),
    });
    assert.deepEqual(parts[2], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="c"`,
      }),
      body: stringToUint8Array("👻👻", "utf-8"),
    });
  });

  it("Prepares a form with an array of fields correctly", async function () {
    const result = await performRequest({ a: "va", b: ["vb", "👻👻"] });
    assert.isUndefined(result.request.formData);
    const multipartBody = result.request.multipartBody as any;
    assert.isDefined(multipartBody, "expecting multipartBody to be defined");
    const parts = (multipartBody as any).parts as BodyPart[];
    assert.equal(parts.length, 3, "need 3 parts");
    assert.deepEqual(parts[0], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="a"`,
      }),
      body: stringToUint8Array("va", "utf-8"),
    });
    assert.deepEqual(parts[1], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="b"`,
      }),
      body: stringToUint8Array("vb", "utf-8"),
    });
    assert.deepEqual(parts[2], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="b"`,
      }),
      body: stringToUint8Array("👻👻", "utf-8"),
    });
  });
});
