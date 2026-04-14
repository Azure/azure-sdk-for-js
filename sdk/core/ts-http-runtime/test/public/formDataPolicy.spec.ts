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

function createFakeFile(content: Uint8Array, name: string, options: { type?: string } = {}): File {
  // Mimics what core-rest-pipeline's createFile() returns in Node:
  // a plain object cast as File, NOT a real File instance.
  return {
    arrayBuffer: async () => content.buffer,
    bytes: () => {
      throw new Error("Not implemented");
    },
    slice: () => {
      throw new Error("Not implemented");
    },
    text: () => {
      throw new Error("Not implemented");
    },
    stream: () => new Blob([content]).stream(),
    type: options.type ?? "",
    lastModified: new Date().getTime(),
    webkitRelativePath: "",
    size: content.byteLength,
    name,
  } as File;
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

  it("preserves filename from a real File object", async function () {
    const file = new File([new Uint8Array([1, 2, 3])], "real-file.txt", {
      type: "text/plain",
    });
    const result = await performRequest({ attachment: file });
    const parts = (result.request.multipartBody as any).parts as BodyPart[];
    assert.equal(parts.length, 1);
    const disposition = parts[0].headers.get("Content-Disposition");
    assert.include(disposition, 'filename="real-file.txt"');
    assert.equal(parts[0].headers.get("Content-Type"), "text/plain");
  });

  it("preserves filename from a File-like object (e.g. createFile helper)", async function () {
    const fakeFile = createFakeFile(new Uint8Array([1, 2, 3]), "fake-file.bin", {
      type: "application/octet-stream",
    });
    // Verify this is NOT a real File instance (matches createFile behavior in Node)
    assert.isFalse(fakeFile instanceof File);
    const result = await performRequest({ attachment: fakeFile });
    const parts = (result.request.multipartBody as any).parts as BodyPart[];
    assert.equal(parts.length, 1);
    const disposition = parts[0].headers.get("Content-Disposition");
    assert.include(disposition, 'filename="fake-file.bin"');
  });

  it("falls back to 'blob' when File-like object has no name", async function () {
    const blob = new Blob([new Uint8Array([1, 2, 3])], { type: "image/png" });
    const result = await performRequest({ attachment: blob });
    const parts = (result.request.multipartBody as any).parts as BodyPart[];
    assert.equal(parts.length, 1);
    const disposition = parts[0].headers.get("Content-Disposition");
    assert.include(disposition, 'filename="blob"');
    assert.equal(parts[0].headers.get("Content-Type"), "image/png");
  });
});
