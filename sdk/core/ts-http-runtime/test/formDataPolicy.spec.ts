// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import {
  PipelineResponse,
  SendRequest,
  createFile,
  createFileFromStream,
  createHttpHeaders,
  createPipelineRequest,
  formDataPolicy,
  isBrowser,
  isNodeLike,
  stringToUint8Array,
} from "../src/index.js";
import { BodyPart, FormDataMap, MultipartRequestBody } from "../src/interfaces.js";

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
    assert.ok(multipartBody, "expecting multipartBody to be defined");
    const parts = (multipartBody as any).parts as BodyPart[];
    const enc = new TextEncoder();
    assert.ok(parts.length === 3, "need 3 parts");
    assert.deepEqual(parts[0], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="a"`,
      }),
      body: enc.encode("va"),
    });
    assert.deepEqual(parts[1], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="b"`,
      }),
      body: enc.encode("vb"),
    });
    assert.deepEqual(parts[2], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="c"`,
      }),
      body: enc.encode("👻👻"),
    });
  });

  it("Prepares a form with an array of fields correctly", async function () {
    const result = await performRequest({ a: "va", b: ["vb", "👻👻"] });
    assert.isUndefined(result.request.formData);
    const multipartBody = result.request.multipartBody as any;
    assert.ok(multipartBody, "expecting multipartBody to be defined");
    const parts = (multipartBody as any).parts as BodyPart[];
    const enc = new TextEncoder();
    assert.ok(parts.length === 3, "need 3 parts");
    assert.deepEqual(parts[0], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="a"`,
      }),
      body: enc.encode("va"),
    });
    assert.deepEqual(parts[1], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="b"`,
      }),
      body: enc.encode("vb"),
    });
    assert.deepEqual(parts[2], {
      headers: createHttpHeaders({
        "Content-Disposition": `form-data; name="b"`,
      }),
      body: enc.encode("👻👻"),
    });
  });

  describe("file uploads", function () {
    it.skipIf(typeof File === "undefined")("can upload a File object", async function () {
      const result = await performRequest({
        file: new File([new Uint8Array([1, 2, 3])], "file.bin", {
          type: "application/octet-stream",
        }),
      });

      const parts = (result.request.multipartBody as MultipartRequestBody).parts;
      assert.ok(parts.length === 1, "expected 1 part");
      assert.deepEqual(
        parts[0].headers,
        createHttpHeaders({
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
        }),
      );
      const buf = new Uint8Array(await new Response((parts[0].body as any).stream()).arrayBuffer());
      assert.deepEqual([...buf], [1, 2, 3]);
    });

    it.skipIf(typeof Blob === "undefined")("can upload a Blob object", async function () {
      const result = await performRequest({
        file: new Blob([new Uint8Array([1, 2, 3])]),
      });

      const parts = (result.request.multipartBody as MultipartRequestBody).parts;
      assert.ok(parts.length === 1, "expected 1 part");
      assert.deepEqual(
        parts[0].headers,
        createHttpHeaders({
          // Content-Type should default to 'application/octet-stream' for binary content (lack of content type is reserved for text content)
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `form-data; name="file"; filename="blob"`,
        }),
      );
      const buf = new Uint8Array(await new Response((parts[0].body as any).stream()).arrayBuffer());
      assert.deepEqual([...buf], [1, 2, 3]);
    });

    it("can upload a Uint8Array using createFile", async function () {
      const result = await performRequest({
        file: createFile(new Uint8Array([0x01, 0x02, 0x03]), "file.bin", {
          type: "text/plain",
        }),
      });

      const parts = (result.request.multipartBody as MultipartRequestBody).parts;
      assert.ok(parts.length === 1, "expected 1 part");
      assert.deepEqual(
        parts[0].headers,
        createHttpHeaders({
          "Content-Type": "text/plain",
          "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
        }),
      );

      const content = new Uint8Array(await (parts[0].body as Blob).arrayBuffer());
      assert.deepEqual([...content], [0x01, 0x02, 0x03]);
    });

    it.skipIf(typeof Blob === "undefined")(
      "Can upload a Web ReadableStream using createFileFromStream",
      async function () {
        const blob = new Blob([new Uint8Array([1, 2, 3])]);
        const result = await performRequest({
          file: createFileFromStream(() => blob.stream(), "file.bin"),
        });

        const parts = (result.request.multipartBody as MultipartRequestBody).parts;
        assert.equal(parts.length, 1);
        assert.deepEqual(
          parts[0].headers,
          createHttpHeaders({
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `form-data; name="file"; filename="file.bin"`,
          }),
        );

        const buf = new Uint8Array(
          await new Response((parts[0].body as any).stream()).arrayBuffer(),
        );
        assert.deepEqual([...buf], [1, 2, 3]);
      },
    );

    it.skipIf(typeof File === "undefined")(
      "Can upload an array of files of different kinds",
      async function () {
        const file1 = new File([new Uint8Array([1, 2, 3])], "file1.bin");
        const file2 = createFile(new Uint8Array([2, 3, 4]), "file2.bin");
        const file3 = createFileFromStream(
          () => new Blob([new Uint8Array([4, 5, 6])]).stream(),
          "file3.json",
          { type: "application/json" },
        );
        const textField = "Hello, I am text!";

        const result = await performRequest({
          files: [file1, file2, file3],
          textField,
        });

        const parts = (result.request.multipartBody as MultipartRequestBody).parts;
        assert.equal(parts.length, 4);

        assert.deepEqual(
          parts[0].headers,
          createHttpHeaders({
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `form-data; name="files"; filename="file1.bin"`,
          }),
        );
        assert.deepEqual(
          [...new Uint8Array(await new Response((parts[0].body as any).stream()).arrayBuffer())],
          [1, 2, 3],
        );

        assert.deepEqual(
          parts[1].headers,
          createHttpHeaders({
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `form-data; name="files"; filename="file2.bin"`,
          }),
        );
        assert.deepEqual(
          [...new Uint8Array(await new Response((parts[1].body as any).stream()).arrayBuffer())],
          [2, 3, 4],
        );

        assert.deepEqual(
          parts[2].headers,
          createHttpHeaders({
            "Content-Type": "application/json",
            "Content-Disposition": `form-data; name="files"; filename="file3.json"`,
          }),
        );
        assert.deepEqual(
          [...new Uint8Array(await new Response((parts[2].body as any).stream()).arrayBuffer())],
          [4, 5, 6],
        );

        assert.deepEqual(
          parts[3].headers,
          createHttpHeaders({
            "Content-Disposition": `form-data; name="textField"`,
          }),
        );
        assert.deepEqual(
          [...(parts[3].body as Uint8Array)],
          [...stringToUint8Array(textField, "utf-8")],
        );
      },
    );
  });

  describe("FormData request bodies", () => {
    it.runIf(isNodeLike)("should be processed by formDataPolicy in Node", async () => {
      const request = createPipelineRequest({
        url: "https://bing.com",
        headers: createHttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      });
      request.body = new FormData();
      request.body.append("service", "registry.azurecr.io");
      request.body.append("scope", "repository:library/hello-world:metadata_read");

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

    it.runIf(isBrowser)("should be passed through in browser", async () => {
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
