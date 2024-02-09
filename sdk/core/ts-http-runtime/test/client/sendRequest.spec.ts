// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { sendRequest } from "../../src/client/sendRequest";
import { assert } from "chai";
import { RestError } from "../../src/restError";
import { PipelineResponse } from "../../src/interfaces";
import { Pipeline, createEmptyPipeline } from "../../src/pipeline";
import { createHttpHeaders } from "../../src/httpHeaders";

describe("sendRequest", () => {
  const foo = new Uint8Array([0x66, 0x6f, 0x6f]);
  const mockBaseUrl = "https://example.org";

  describe("Binary content", () => {
    it("should handle request body as Uint8Array", async () => {
      const mockPipeline: Pipeline = createEmptyPipeline();
      const expectedBody = "foo";
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.body, expectedBody);
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
  });

  describe("FormData content", () => {
    it("should handle request body as FormData", async () => {
      const expectedFormData = { fileName: "foo.txt", file: "bar" };
      const mockPipeline: Pipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client, request) => {
        assert.deepEqual(request.formData, expectedFormData);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: expectedFormData,
        contentType: "multipart/form-data",
      });
    });

    it("should handle request body as FormData with binary", async () => {
      const expectedFormData = { fileName: "foo.txt", file: "foo" };
      const mockPipeline: Pipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client, request) => {
        assert.deepEqual(request.formData, expectedFormData);
        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: { ...expectedFormData, file: foo },
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

    await sendRequest("POST", mockBaseUrl, mockPipeline, { body: expectedBody });
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

  it("should set application/json by default if not binary", async () => {
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.equal(request.headers.get("content-type"), "application/json; charset=UTF-8");
      return { headers: createHttpHeaders() } as PipelineResponse;
    };

    await sendRequest("POST", mockBaseUrl, mockPipeline, { body: "test" });
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

  it("should send formdata body", async () => {
    const testForm = { foo: "test" };
    const mockPipeline: Pipeline = createEmptyPipeline();
    mockPipeline.sendRequest = async (_client, request) => {
      assert.deepEqual(request.formData, testForm);
      return {
        headers: createHttpHeaders(),
      } as PipelineResponse;
    };

    await sendRequest("GET", mockBaseUrl, mockPipeline, {
      contentType: "multipart/form-data",
      body: testForm,
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
});
