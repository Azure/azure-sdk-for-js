// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { sendRequest } from "../src/sendRequest.js";
import {
  FormDataValue,
  Pipeline,
  PipelineResponse,
  RestError,
  createEmptyPipeline,
  createFile,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { stringToUint8Array } from "@azure/core-util";

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
        assert.equal(request.formData?.fileName, "foo.txt");
        assert.sameOrderedMembers(
          [...new Uint8Array(await (request.formData?.file as Blob).arrayBuffer())],
          [...foo],
        );
        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: { ...expectedFormData, file: foo },
        contentType: "multipart/form-data",
      });
    });

    it("should handle request body as FormData with array of binary", async () => {
      const expectedFormData = { fileName: "foo.txt" };
      const mockPipeline: Pipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client, request) => {
        assert.equal(request.formData?.fileName, "foo.txt");
        assert.isArray(request.formData?.files);
        const files = request.formData?.files as Blob[];
        assert.lengthOf(files, 2);

        assert.sameOrderedMembers([...new Uint8Array(await files[0].arrayBuffer())], [...foo]);
        assert.sameOrderedMembers([...new Uint8Array(await files[1].arrayBuffer())], [...foo]);

        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: { ...expectedFormData, files: [foo, foo] },
        contentType: "multipart/form-data",
      });
    });

    it("should handle request body as FormData with multiple file and text fields", async () => {
      const file1 = createFile(stringToUint8Array("File 1", "utf-8"), "file1.txt", {
        type: "text/plain",
      });
      const file2 = createFile(new Uint8Array([1, 2, 3]), "file1.txt", {
        type: "application/octet-stream",
      });
      const file3 = new Blob([stringToUint8Array("{}", "utf-8")], { type: "application/json" });
      const text = "Hello";

      const mockPipeline = createEmptyPipeline();
      mockPipeline.sendRequest = async (_client, request) => {
        assert.strictEqual((request.formData?.fileArray1 as FormDataValue[])[0], file1);
        assert.strictEqual((request.formData?.fileArray1 as FormDataValue[])[1], file2);
        assert.strictEqual((request.formData?.fileArray2 as FormDataValue[])[0], file2);
        assert.strictEqual((request.formData?.fileArray2 as FormDataValue[])[1], file3);
        assert.strictEqual(request.formData?.standaloneFile as FormDataValue, file3);
        assert.strictEqual(request.formData?.text as string, "Hello");

        return { headers: createHttpHeaders() } as PipelineResponse;
      };

      await sendRequest("POST", mockBaseUrl, mockPipeline, {
        body: {
          fileArray1: [file1, file2],
          fileArray2: [file2, file3],
          standaloneFile: file3,
          text,
        },
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
});
