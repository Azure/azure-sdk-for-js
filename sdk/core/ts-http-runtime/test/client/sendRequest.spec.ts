// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { sendRequest } from "../../src/client/sendRequest.js";
import { RestError } from "../../src/restError.js";
import type { MultipartRequestBody, PipelineResponse } from "../../src/interfaces.js";
import type { Pipeline } from "../../src/pipeline.js";
import { createEmptyPipeline } from "../../src/pipeline.js";
import { createHttpHeaders } from "../../src/httpHeaders.js";
import { stringToUint8Array } from "../../src/util/bytesEncoding.js";
import type { PartDescriptor } from "../../src/client/multipart.js";

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
              "content-type": "application/json",
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

  it("should set content-type via contentType option even without body", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("content-type"), "testContent");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { contentType: "testContent" });
  });

  it("should set content-type via headers option even without body", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("content-type"), "application/xml");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, {
      headers: { "content-type": "application/xml" },
    });
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
      assert.equal(request.headers.get("content-type"), "application/json");
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

  describe("Multipart response parsing", () => {
    it("should parse multipart/mixed response with single part", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client) => {
        return {
          headers: createHttpHeaders({ "content-type": "multipart/mixed; boundary=test123" }),
          bodyAsText: "--test123\r\nContent-Type: text/plain\r\n\r\nHello World\r\n--test123--",
        } as PipelineResponse;
      };

      const response = await sendRequest("GET", mockBaseUrl, mockPipeline);

      assert.isDefined(response.body);
      assert.property(response.body, "parts");
      assert.isArray((response.body as any).parts);
      assert.equal((response.body as any).parts.length, 1);

      const part = (response.body as any).parts[0];
      assert.equal(part.headers["Content-Type"], "text/plain");

      const bodyText = new TextDecoder().decode(part.body);
      assert.equal(bodyText, "Hello World");
    });

    it("should parse multipart/mixed response with multiple parts", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const multipartBody = `--boundary\r
Content-Type: application/json\r
\r
{"status":"ok"}\r
--boundary\r
Content-Type: text/plain\r
\r
Plain text data\r
--boundary--`;

      mockPipeline.sendRequest = async (_client) => {
        return {
          headers: createHttpHeaders({ "content-type": "multipart/mixed; boundary=boundary" }),
          bodyAsText: multipartBody,
        } as PipelineResponse;
      };

      const response = await sendRequest("GET", mockBaseUrl, mockPipeline);

      assert.isDefined(response.body);
      const parts = (response.body as any).parts;
      assert.equal(parts.length, 2);

      // First part - JSON
      assert.equal(parts[0].headers["Content-Type"], "application/json");
      const part1Text = new TextDecoder().decode(parts[0].body);
      assert.equal(part1Text, '{"status":"ok"}');

      // Second part - Plain text
      assert.equal(parts[1].headers["Content-Type"], "text/plain");
      const part2Text = new TextDecoder().decode(parts[1].body);
      assert.equal(part2Text, "Plain text data");
    });

    it("should parse Azure Blob Storage batch response format", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const batchResponse = `--batchresponse_12345\r
Content-Type: application/http\r
Content-ID: 0\r
\r
HTTP/1.1 200 OK\r
Content-Type: application/json\r
\r
{"id":1,"status":"ok"}\r
--batchresponse_12345\r
Content-Type: application/http\r
Content-ID: 1\r
\r
HTTP/1.1 201 Created\r
Content-Type: application/json\r
\r
{"id":2,"status":"created"}\r
--batchresponse_12345--`;

      mockPipeline.sendRequest = async (_client) => {
        return {
          headers: createHttpHeaders({
            "content-type": "multipart/mixed; boundary=batchresponse_12345",
          }),
          bodyAsText: batchResponse,
        } as PipelineResponse;
      };

      const response = await sendRequest("POST", mockBaseUrl, mockPipeline);

      const parts = (response.body as any).parts;
      assert.equal(parts.length, 2);

      // First sub-response
      assert.equal(parts[0].headers["Content-Type"], "application/http");
      assert.equal(parts[0].headers["Content-ID"], "0");
      const part1Text = new TextDecoder().decode(parts[0].body);
      assert.include(part1Text, "HTTP/1.1 200 OK");
      assert.include(part1Text, '{"id":1,"status":"ok"}');

      // Second sub-response
      assert.equal(parts[1].headers["Content-Type"], "application/http");
      assert.equal(parts[1].headers["Content-ID"], "1");
      const part2Text = new TextDecoder().decode(parts[1].body);
      assert.include(part2Text, "HTTP/1.1 201 Created");
      assert.include(part2Text, '{"id":2,"status":"created"}');
    });

    it("should return raw text if multipart has no boundary", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const bodyText = "not really multipart data";

      mockPipeline.sendRequest = async (_client) => {
        return {
          headers: createHttpHeaders({ "content-type": "multipart/mixed" }),
          bodyAsText: bodyText,
        } as PipelineResponse;
      };

      const response = await sendRequest("GET", mockBaseUrl, mockPipeline);

      // Should return raw text since boundary is missing
      assert.equal(response.body, bodyText);
    });

    it("should handle multipart response with quoted boundary", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client) => {
        return {
          headers: createHttpHeaders({
            "content-type": 'multipart/form-data; boundary="----WebKitBoundary"',
          }),
          bodyAsText:
            "------WebKitBoundary\r\nContent-Type: text/plain\r\n\r\nData\r\n------WebKitBoundary--",
        } as PipelineResponse;
      };

      const response = await sendRequest("GET", mockBaseUrl, mockPipeline);

      const parts = (response.body as any).parts;
      assert.equal(parts.length, 1);

      const bodyText = new TextDecoder().decode(parts[0].body);
      assert.equal(bodyText, "Data");
    });

    it("should handle empty multipart response body", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client) => {
        return {
          headers: createHttpHeaders({ "content-type": "multipart/mixed; boundary=test" }),
          bodyAsText: "",
        } as PipelineResponse;
      };

      const response = await sendRequest("GET", mockBaseUrl, mockPipeline);

      // Should return undefined for empty body
      assert.isUndefined(response.body);
    });

    it("should parse multipart with binary content in parts", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const multipartBody =
        "--boundary\r\nContent-Type: application/octet-stream\r\n\r\n\x00\x01\x02\x03\xFF\r\n--boundary--";

      mockPipeline.sendRequest = async (_client) => {
        return {
          headers: createHttpHeaders({ "content-type": "multipart/mixed; boundary=boundary" }),
          bodyAsText: multipartBody,
        } as PipelineResponse;
      };

      const response = await sendRequest("GET", mockBaseUrl, mockPipeline);

      const parts = (response.body as any).parts;
      assert.equal(parts.length, 1);
      assert.equal(parts[0].headers["Content-Type"], "application/octet-stream");
      assert.isTrue(parts[0].body instanceof Uint8Array);
      assert.isTrue(parts[0].body.length > 0);
    });
  });
});
