// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { sendRequest } from "../src/sendRequest.js";
import {
  MultipartRequestBody,
  Pipeline,
  PipelineResponse,
  RestError,
  createEmptyPipeline,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { stringToUint8Array } from "@azure/core-util";
import { PartDescriptor } from "../src/multipart.js";

describe("sendRequest", () => {
  const foo = new Uint8Array([0x66, 0x6f, 0x6f]);
  const mockBaseUrl = "https://example.org";

  describe("Binary content", () => {
    it("should handle request body as Uint8Array", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client, request) => {
        assert.sameOrderedMembers([...(request.body as Uint8Array)], [...foo]);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", mockBaseUrl, mockPipeline, { body: foo });
    });

    it("should send Uint8Array as bytes for octet-stream content type", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, foo);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: foo,
        contentType: "application/octet-stream",
      });
    });

    it("should handle request body as string", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const expectedBody = "foo";
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, expectedBody);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };
      await sendRequest("POST", mockBaseUrl, mockPipeline, { body: "foo" });
    });

    it("should handle request body as string if content type is text/plain", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const expectedBody = "foo";
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, expectedBody);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };
      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: "foo",
        contentType: "text/plain",
      });
    });

    it("should handle request body as string if header content type is text/plain", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const expectedBody = "foo";
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, expectedBody);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };
      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: "foo",
        headers: { "content-type": "text/plain" },
      });
    });

    it("should respect options.contentType if both options.contentType and options.headers['content-type'] are specified", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const expectedBody = "foo";
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, expectedBody);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };
      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: "foo",
        contentType: "text/plain",
        headers: { "content-type": "application/json" },
      });
    });

    it("should handle request body as json string without content type", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const body = '{"key":"value"}';
      const expectedBody = JSON.stringify(body);
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, expectedBody);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };
      await sendRequest("POST", mockBaseUrl, mockPipeline, { body });
    });

    it("should handle request body as non-json string with content type", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const expectedBody = '"foo"';
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, expectedBody);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };
      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: "foo",
        contentType: "application/json",
      });
    });

    it("should handle request body as json string with content type", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const body = '{"key":"value"}';
      const expectedBody = JSON.stringify(body);
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, expectedBody);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };
      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body,
        contentType: "application/json",
      });
    });

    it("should handle request body as non-json string with content type in header", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const expectedBody = '"foo"';
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, expectedBody);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };
      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: "foo",
        headers: { "content-type": "application/json" },
      });
    });

    it("should handle request body as json string with content type in header", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const body = '{"key":"value"}';
      const expectedBody = JSON.stringify(body);
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, expectedBody);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };
      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body,
        headers: { "content-type": "application/json" },
      });
    });

    it("should handle request body as boolean without content type", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const expectedBody = `true`;
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, expectedBody);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };
      await sendRequest("POST", mockBaseUrl, mockPipeline, { body: true });
    });
  });

  describe("FormData content", () => {
    it("should handle request body as FormData", async () => {
      const expectedFormData: PartDescriptor[] = [
        { name: "fileName", body: "foo.txt" },
        { name: "file", body: "bar" },
      ];

      const expectedBody: MultipartRequestBody = {
        parts: [
          {
            headers: createHttpHeaders({
              "content-type": "text/plain; charset=UTF-8",
              "content-disposition": `form-data; name="fileName"`,
            }),
            body: stringToUint8Array("foo.txt", "utf-8"),
          },
          {
            headers: createHttpHeaders({
              "content-type": "text/plain; charset=UTF-8",
              "content-disposition": `form-data; name="file"`,
            }),
            body: stringToUint8Array("bar", "utf-8"),
          },
        ],
      };

      const mockPipeline: Pipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client, request) => {
        assert.deepEqual(request.multipartBody, expectedBody);
        assert.equal(request.headers.get("content-type"), "multipart/form-data");
        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: expectedFormData,
        contentType: "multipart/form-data",
      });
    });

    it("should handle multipart/form-data request body with binary", async () => {
      const expectedFormData: PartDescriptor[] = [{ name: "file", filename: "foo.txt", body: foo }];
      const expectedBody: MultipartRequestBody = {
        parts: [
          {
            headers: createHttpHeaders({
              "content-type": "application/octet-stream",
              "content-disposition": `form-data; name="file"; filename="foo.txt"`,
            }),
            body: foo,
          },
        ],
      };
      const mockPipeline: Pipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client, request) => {
        assert.deepEqual(request.multipartBody, expectedBody);
        assert.equal(request.headers.get("content-type"), "multipart/form-data");

        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: expectedFormData,
        contentType: "multipart/form-data",
      });
    });

    it("should handle multipart/form-data request body with multiple files of the same field name", async () => {
      const expectedFormData: PartDescriptor[] = [
        { name: "fileName", body: "foo.txt" },
        { name: "files", body: foo },
        { name: "files", body: foo },
      ];
      const expectedBody: MultipartRequestBody = {
        parts: [
          {
            headers: createHttpHeaders({
              "content-type": "text/plain; charset=UTF-8",
              "content-disposition": `form-data; name="fileName"`,
            }),
            body: stringToUint8Array("foo.txt", "utf-8"),
          },
          {
            headers: createHttpHeaders({
              "content-type": "application/octet-stream",
              "content-disposition": `form-data; name="files"`,
            }),
            body: foo,
          },
          {
            headers: createHttpHeaders({
              "content-type": "application/octet-stream",
              "content-disposition": `form-data; name="files"`,
            }),
            body: foo,
          },
        ],
      };

      const mockPipeline: Pipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client, request) => {
        assert.deepEqual(request.multipartBody, expectedBody);
        assert.equal(request.headers.get("content-type"), "multipart/form-data");

        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: expectedFormData,
        contentType: "multipart/form-data",
      });
    });

    it("should handle request body as FormData with mixed fields including binary, text and JSON", async () => {
      const input: PartDescriptor[] = [
        {
          name: "fileArray1",
          filename: "file1.txt",
          contentType: "text/plain; charset=UTF-8",
          body: "File 1",
        },
        { name: "fileArray1", filename: "file2", body: new Uint8Array([1, 2, 3]) },
        { name: "fileArray2", body: new Uint8Array([4, 5, 6]), filename: "file3" },
        { name: "fileArray2", body: {} },
        { name: "textField", body: "Hello world!" },
      ];

      const expectedBody: MultipartRequestBody = {
        parts: [
          {
            headers: createHttpHeaders({
              "content-type": "text/plain; charset=UTF-8",
              "content-disposition": `form-data; name="fileArray1"; filename="file1.txt"`,
            }),
            body: stringToUint8Array("File 1", "utf-8"),
          },
          {
            headers: createHttpHeaders({
              "content-type": "application/octet-stream",
              "content-disposition": `form-data; name="fileArray1"; filename="file2"`,
            }),
            body: new Uint8Array([1, 2, 3]),
          },
          {
            headers: createHttpHeaders({
              "content-type": "application/octet-stream",
              "content-disposition": `form-data; name="fileArray2"; filename="file3"`,
            }),
            body: new Uint8Array([4, 5, 6]),
          },
          {
            headers: createHttpHeaders({
              "content-type": "application/json; charset=UTF-8",
              "content-disposition": `form-data; name="fileArray2"`,
            }),
            body: stringToUint8Array("{}", "utf-8"),
          },
          {
            headers: createHttpHeaders({
              "content-type": "text/plain; charset=UTF-8",
              "content-disposition": `form-data; name="textField"`,
            }),
            body: stringToUint8Array("Hello world!", "utf-8"),
          },
        ],
      };

      const mockPipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client, request) => {
        assert.deepEqual(request.multipartBody, expectedBody);
        assert.equal(request.headers.get("content-type"), "multipart/form-data");

        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: input,
        contentType: "multipart/form-data",
      });
    });
  });

  it("should send request with json body", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    const expectedBody = { foo: "foo" };
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.body, JSON.stringify(expectedBody));
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, {
      body: expectedBody,
      contentType: "application/json",
    });
  });

  it("should send request without serialization for the string body request", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    const expectedBody = JSON.stringify({ foo: "foo" });
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.body, expectedBody);
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, {
      body: expectedBody,
      contentType: "application/json",
      skipSerialization: true,
    });
  });

  it("should send request with undefined body", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.body, undefined);
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { body: undefined });
  });

  it("should set custom content-type", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("content-type"), "testContent");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { contentType: "testContent", body: {} });
  });

  it("should not set content-type if no body is present", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("content-type"), undefined);
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { contentType: "testContent" });
  });

  it("should set custom accept", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("accept"), "testContent");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { accept: "testContent" });
  });

  it("should set custom accept via headers", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("accept"), "testContent");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { headers: { accept: "testContent" } });
  });

  it("should set custom headers", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("foo"), "foo");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { headers: { foo: "foo" } });
  });

  it("should set a boolean header", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("foo"), "true");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { headers: { foo: true } });
  });

  it("should set a number header", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("foo"), "123");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { headers: { foo: 123 } });
  });

  it("should set octet-stream when binary body", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("content-type"), "application/octet-stream");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { body: new Uint8Array() });
  });

  it("should set content-type as undefined if it's unknown", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("content-type"), undefined);
      assert.equal(request.body, "test");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { body: "test" });
  });

  it("should set application/json by default if it is json string", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("content-type"), "application/json; charset=UTF-8");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { body: '{"key": "value"}' });
  });

  it("should give you back a string response", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client) => {
      return {
        headers: createHttpHeaders({ "content-type": "text/plain" }),
        bodyAsText: "test",
      } as PipelineResponse;
    };

    const response = await sendRequest("GET", mockBaseUrl, mockPipeline);
    assert.equal(response.body, "test");
  });

  it("should give you back a JSON object response", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client) => {
      return {
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: `{"foo": "test"}`,
      } as PipelineResponse;
    };

    const response = await sendRequest("GET", mockBaseUrl, mockPipeline);
    assert.deepEqual(response.body, { foo: "test" });
  });

  it("should throw with invalid JSON", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client) => {
      return {
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: `{"foo": "test"`,
      } as PipelineResponse;
    };

    try {
      await sendRequest("GET", mockBaseUrl, mockPipeline);
    } catch (error: any) {
      assert.equal(error.code, RestError.PARSE_ERROR);
    }
  });

  it("should give a string response with non-json and unspecified content-type", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client) => {
      return {
        headers: createHttpHeaders(),
        bodyAsText: "test",
      } as PipelineResponse;
    };

    const response = await sendRequest("GET", mockBaseUrl, mockPipeline);
    assert.equal(response.body, "test");
  });

  it.skipIf(typeof FormData === "undefined")("should send FormData body", async () => {
    const formData = new FormData();
    formData.append("foo", "test");

    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.deepEqual(request.body, formData);
      return {
        headers: createHttpHeaders(),
      } as PipelineResponse;
    };

    await sendRequest("GET", mockBaseUrl, mockPipeline, {
      contentType: "multipart/form-data",
      body: formData,
    });
  });

  it("should send string body", async () => {
    const testBody = "test";
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.deepEqual(request.body, testBody);
      return {
        headers: createHttpHeaders(),
      } as PipelineResponse;
    };

    await sendRequest("GET", mockBaseUrl, mockPipeline, {
      contentType: "text/plain",
      body: testBody,
    });
  });

  it("should send json body", async () => {
    const testBody = "test";
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.deepEqual(request.body, JSON.stringify(testBody));
      return {
        headers: createHttpHeaders(),
      } as PipelineResponse;
    };

    await sendRequest("GET", mockBaseUrl, mockPipeline, {
      contentType: "application/json",
      body: testBody,
    });
  });

  it("should send json when no content-type set", async () => {
    const testBody = { foo: "test" };
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.deepEqual(request.body, JSON.stringify(testBody));
      return {
        headers: createHttpHeaders(),
      } as PipelineResponse;
    };

    await sendRequest("GET", mockBaseUrl, mockPipeline, {
      body: testBody,
    });
  });

  it("should not set content-type when there is no body", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      const contentType = request.headers.get("content-type");
      assert.isUndefined(contentType);
      return {
        headers: createHttpHeaders(),
      } as PipelineResponse;
    };

    await sendRequest("GET", mockBaseUrl, mockPipeline);
  });

  it("should keep accept option over header", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      const accept = request.headers.get("accept");
      assert.equal(accept, "application/json");
      return {
        headers: createHttpHeaders(),
      } as PipelineResponse;
    };

    await sendRequest("GET", mockBaseUrl, mockPipeline, {
      accept: "application/json",
      headers: { accept: "foo" },
    });
  });

  it("should keep contentType option over header", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      const contentType = request.headers.get("content-type");
      assert.equal(contentType, "application/json");
      return {
        headers: createHttpHeaders(),
      } as PipelineResponse;
    };

    await sendRequest("GET", mockBaseUrl, mockPipeline, {
      contentType: "application/json",
      headers: { "content-type": "foo" },
      body: "test",
    });
  });

  it("should call onResponse", async () => {
    let called = false;
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async () => {
      return {
        headers: createHttpHeaders(),
      } as PipelineResponse;
    };

    await sendRequest("GET", mockBaseUrl, mockPipeline, {
      body: "{}",
      onResponse: () => {
        called = true;
      },
    });
    assert.isTrue(called);
  });

  it("should provide error to onResponse", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    let called = false;
    const error = new RestError("Error", {
      response: {
        headers: createHttpHeaders(),
        status: 500,
      } as PipelineResponse,
    });

    mockPipeline.sendRequest = async () => {
      throw error;
    };

    try {
      await sendRequest("GET", mockBaseUrl, mockPipeline, {
        body: "{}",
        onResponse: (response, callbackError, legacyError) => {
          assert.strictEqual(
            callbackError,
            legacyError,
            "Legacy error parameter must be the same as normal error for backward compatability",
          );
          assert.equal(response.status, 500);
          called = true;
        },
      });

      assert.fail("Expected sendRequest to throw");
    } catch (e: unknown) {
      assert.strictEqual(e, error);
    }

    assert.isTrue(called);
  });
});
