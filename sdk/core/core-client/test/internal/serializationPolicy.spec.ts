// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import type { CompositeMapper, OperationRequest, SequenceMapper } from "../../src/index.js";
import {
  MapperTypeNames,
  ServiceClient,
  createSerializer,
  serializationPolicy,
} from "../../src/index.js";
import { serializeHeaders, serializeRequestBody } from "../../src/serializationPolicy.js";
import { Mappers } from "../testMappers1.js";
import {
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { stringifyXML } from "@azure/core-xml";

const defaultRequest = () => createPipelineRequest({ url: "https://example.com" });

describe("serializationPolicy", function () {
  describe("serializeRequestBody()", () => {
    it("should serialize additional properties when the mapper is refd by className", () => {
      const httpRequest = defaultRequest();
      const body = [
        {
          version: 1,
          name: "Test",
          time: new Date("2020-09-24T17:31:35.034Z"),
          data: {
            baseData: {
              test: "Hello!",
              extraProp: "FooBar",
            },
          },
        },
      ];

      serializeRequestBody(
        httpRequest,
        {
          body,
        },
        {
          httpMethod: "POST",
          requestBody: Mappers.body,
          responses: { 200: {} },
          serializer: createSerializer(Mappers),
        },
      );
      assert.strictEqual(
        httpRequest.body,
        `[{"ver":1,"name":"Test","time":"2020-09-24T17:31:35.034Z","data":{"baseData":{"test":"Hello!","extraProp":"FooBar"}}}]`,
      );
    });

    it("should serialize a JSON false request body", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          boolBody: false,
        },
        {
          httpMethod: "PUT",
          requestBody: {
            parameterPath: "boolBody",
            mapper: {
              defaultValue: false,
              isConstant: true,
              serializedName: "boolBody",
              type: {
                name: "Boolean",
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
      );
      assert.strictEqual(httpRequest.body, `false`);
    });

    it("should serialize a JSON null request body", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          boolBody: null,
        },
        {
          httpMethod: "PUT",
          requestBody: {
            parameterPath: "nullBody",
            mapper: {
              defaultValue: null,
              isConstant: true,
              serializedName: "nullBody",
              nullable: true,
              type: {
                name: "String",
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
      );
      assert.strictEqual(httpRequest.body, `null`);
    });

    it("should serialize a JSON String request body", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value",
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
      );
      assert.strictEqual(httpRequest.body, `"body value"`);
    });

    it("should serialize a JSON String request body with namespace, ignoring namespace", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value",
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              xmlNamespace: "https://example.com",
              xmlNamespacePrefix: "foo",
              serializedName: "bodyArg",
              type: {
                name: "String",
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
      );
      assert.strictEqual(httpRequest.body, `"body value"`);
    });

    it("should serialize a JSON ByteArray request body", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: stringToByteArray("Javascript"),
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.ByteArray,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
      );
      assert.strictEqual(httpRequest.body, `"SmF2YXNjcmlwdA=="`);
    });

    it("should serialize a JSON ByteArray request body, ignoring xml properties", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: stringToByteArray("Javascript"),
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              xmlNamespace: "https://microsoft.com",
              xmlNamespacePrefix: "test",
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.ByteArray,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
      );
      assert.strictEqual(httpRequest.body, `"SmF2YXNjcmlwdA=="`);
    });

    it("should serialize a JSON Stream request body", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value",
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.Stream,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
        stringifyXML,
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize a JSON Stream request body", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value",
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              xmlNamespace: "http://microsoft.com",
              xmlNamespacePrefix: "test",
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.Stream,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
        stringifyXML,
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize an XML String request body", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value",
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg>body value</bodyArg>`,
      );
    });

    it("should serialize an XML String request body, with namespace", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value",
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              xmlNamespace: "https://microsoft.com",
              type: {
                name: MapperTypeNames.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com">body value</bodyArg>`,
      );
    });

    it("should serialize an XML ByteArray request body", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: stringToByteArray("Javascript"),
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.ByteArray,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg>SmF2YXNjcmlwdA==</bodyArg>`,
      );
    });

    it("should serialize an XML Stream request body", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value",
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.Stream,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize an XML Stream request body, with namespace", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value",
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              xmlNamespace: "https://microsoft.com",
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.Stream,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize an XML ByteArray request body with namespace and prefix", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: stringToByteArray("Javascript"),
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              xmlNamespace: "https://microsoft.com",
              xmlNamespacePrefix: "sample",
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.ByteArray,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns:sample="https://microsoft.com">SmF2YXNjcmlwdA==</bodyArg>`,
      );
    });

    it("should serialize an XML Composite request body", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          requestBody: {
            updated: new Date("2020-08-12T23:36:18.308Z"),
            content: { type: "application/xml", queueDescription: { maxDeliveryCount: 15 } },
          },
        },
        {
          httpMethod: "POST",
          requestBody: Mappers.requestBody1,
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><entry xmlns="http://www.w3.org/2005/Atom"><updated xmlns="http://www.w3.org/2005/Atom">2020-08-12T23:36:18.308Z</updated><content xmlns="http://www.w3.org/2005/Atom" type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect"><MaxDeliveryCount xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">15</MaxDeliveryCount></QueueDescription></content></entry>`,
      );
    });

    it("should serialize a JSON Composite request body, ignoring XML metadata", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          requestBody: {
            updated: new Date("2020-08-12T23:36:18.308Z"),
            content: { type: "application/xml", queueDescription: { maxDeliveryCount: 15 } },
          },
        },
        {
          httpMethod: "POST",
          requestBody: Mappers.requestBody1,
          responses: { 200: {} },
          serializer: createSerializer(),
        },
      );

      assert.deepEqual(
        httpRequest.body,
        '{"updated":"2020-08-12T23:36:18.308Z","content":{"type":"application/xml","queueDescription":{"maxDeliveryCount":15}}}',
      );
    });

    it("should serialize an XML Array request body with namespace and prefix", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: ["Foo", "Bar"],
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              xmlNamespace: "https://microsoft.com",
              xmlElementName: "testItem",
              type: {
                name: MapperTypeNames.Sequence,
                element: {
                  xmlNamespace: "https://microsoft.com/element",
                  type: { name: "String" },
                },
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com"><testItem xmlns="https://microsoft.com/element">Foo</testItem><testItem xmlns="https://microsoft.com/element">Bar</testItem></bodyArg>`,
      );
    });

    it("should serialize a JSON Array request body, ignoring XML metadata", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: ["Foo", "Bar"],
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              xmlNamespace: "https://microsoft.com",
              xmlElementName: "testItem",
              type: {
                name: MapperTypeNames.Sequence,
                element: {
                  xmlNamespace: "https://microsoft.com/element",
                  type: { name: "String" },
                },
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
      );
      assert.deepEqual(httpRequest.body, JSON.stringify(["Foo", "Bar"]));
    });

    it("should serialize an XML Dictionary request body", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          metadata: {
            alpha: "hello",
            beta: "world",
          },
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "metadata",
            mapper: {
              serializedName: "metadata",
              type: {
                name: "Dictionary",
                value: {
                  type: {
                    name: "String",
                  },
                },
              },
              headerCollectionPrefix: "foo-bar-",
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><metadata><alpha>hello</alpha><beta>world</beta></metadata>`,
      );
    });

    it("should serialize an XML Dictionary request body, with namespace and prefix", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          metadata: {
            alpha: "hello",
            beta: "world",
          },
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "metadata",
            mapper: {
              xmlNamespacePrefix: "sample",
              xmlNamespace: "https://microsoft.com",
              serializedName: "metadata",
              type: {
                name: "Dictionary",
                value: {
                  xmlNamespacePrefix: "el",
                  xmlNamespace: "https://microsoft.com/element",
                  type: {
                    name: "String",
                  },
                },
              },
              headerCollectionPrefix: "foo-bar-",
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><metadata xmlns:sample="https://microsoft.com"><alpha xmlns:el="https://microsoft.com/element">hello</alpha><beta xmlns:el="https://microsoft.com/element">world</beta></metadata>`,
      );
    });

    it("should serialize a JSON Dictionary request body, ignoring xml metadata", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          metadata: {
            alpha: "hello",
            beta: "world",
          },
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "metadata",
            mapper: {
              xmlNamespacePrefix: "sample",
              xmlNamespace: "https://microsoft.com",
              serializedName: "metadata",
              type: {
                name: "Dictionary",
                value: {
                  xmlNamespacePrefix: "el",
                  xmlNamespace: "https://microsoft.com/element",
                  type: {
                    name: "String",
                  },
                },
              },
              headerCollectionPrefix: "foo-bar-",
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
        stringifyXML,
      );
      assert.deepEqual(httpRequest.body, `{"alpha":"hello","beta":"world"}`);
    });

    it("should serialize an XML request body with custom xml char key", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          requestBody: {
            "#": "pound value",
          },
          options: {
            serializerOptions: {
              xml: {
                xmlCharKey: "#",
              },
            },
          },
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "requestBody",
            mapper: {
              serializedName: "Body",
              xmlName: "entry",
              type: {
                name: "Composite",
                className: "Body",
                modelProperties: {
                  "#": {
                    serializedName: "#",
                    xmlName: "#",
                    type: { name: "String" },
                  },
                },
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><entry>pound value</entry>`,
      );
    });

    it("should serialize a string send to a text/plain endpoint as just a string", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value",
        },
        {
          httpMethod: "POST",
          contentType: "text/plain; charset=UTF-8",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize a string send with the mediaType 'text' as just a string", () => {
      const httpRequest = defaultRequest();
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value",
        },
        {
          httpMethod: "POST",
          mediaType: "text",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
        },
      );
      assert.strictEqual(httpRequest.body, "body value");
    });
  });

  describe("serializeHeaders()", () => {
    it("should respect customHeaders", () => {
      const httpRequest = defaultRequest();
      serializeHeaders(
        httpRequest,
        {
          options: {
            requestOptions: {
              customHeaders: {
                "content-type": "custom/type",
              },
            },
          },
        },
        {
          httpMethod: "POST",
          mediaType: "text",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(),
          headerParameters: [
            {
              parameterPath: ["options", "contentType"],
              mapper: {
                defaultValue: "text/plain",
                isConstant: true,
                serializedName: "Content-Type",
                type: {
                  name: "String",
                },
              },
            },
          ],
        },
      );
      assert.strictEqual(httpRequest.headers.get("Content-Type"), "custom/type");
    });
  });
});

function stringToByteArray(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

describe("serializationPolicy", () => {
  it("should serialize formData parameters", async () => {
    let capturedRequest: OperationRequest | undefined;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy(), { phase: "Serialize" });
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) => {
          capturedRequest = req;
          return Promise.resolve({
            request: req,
            status: 200,
            headers: createHttpHeaders(),
          });
        },
      },
      pipeline,
    });

    await client.sendOperationRequest(
      { file: "fileContent" },
      {
        httpMethod: "POST",
        baseUrl: "https://example.com",
        serializer: createSerializer(),
        formDataParameters: [
          {
            parameterPath: "file",
            mapper: {
              serializedName: "file",
              type: { name: "String" },
            },
          },
        ],
        responses: { 200: {} },
      },
    );

    assert.ok(capturedRequest);
    assert.deepStrictEqual(capturedRequest?.formData, { file: "fileContent" });
  });

  it("should handle text/plain content type without JSON stringifying", async () => {
    let capturedRequest: OperationRequest | undefined;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy(), { phase: "Serialize" });
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) => {
          capturedRequest = req;
          return Promise.resolve({
            request: req,
            status: 200,
            headers: createHttpHeaders(),
          });
        },
      },
      pipeline,
    });

    await client.sendOperationRequest(
      { body: "plain text content" },
      {
        httpMethod: "POST",
        baseUrl: "https://example.com",
        contentType: "text/plain",
        mediaType: "text",
        serializer: createSerializer(),
        requestBody: {
          parameterPath: "body",
          mapper: {
            serializedName: "body",
            type: { name: "String" },
          },
        },
        responses: { 200: {} },
      },
    );

    assert.ok(capturedRequest);
    assert.strictEqual(capturedRequest?.body, "plain text content");
  });
});

describe("serializationPolicy - XML serialization", () => {
  it("should throw XML serialization unsupported when no stringifyXML provided", async () => {
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy(), { phase: "Serialize" });
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) =>
          Promise.resolve({ request: req, status: 200, headers: createHttpHeaders() }),
      },
      pipeline,
    });

    await expect(
      client.sendOperationRequest(
        { body: { name: "test" } },
        {
          httpMethod: "POST",
          baseUrl: "https://example.com",
          isXML: true,
          contentType: "application/xml",
          serializer: createSerializer({}, true),
          requestBody: {
            parameterPath: "body",
            mapper: {
              serializedName: "body",
              xmlName: "TestBody",
              type: {
                name: "Composite",
                modelProperties: {
                  name: { serializedName: "name", xmlName: "name", type: { name: "String" } },
                },
              },
            } as CompositeMapper,
          },
          responses: { 200: {} },
        },
      ),
    ).rejects.toThrow(/XML serialization unsupported/);
  });

  it("should serialize XML Sequence with stringifyXML", async () => {
    let capturedRequest: OperationRequest | undefined;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy({ stringifyXML: (obj) => JSON.stringify(obj) }), {
      phase: "Serialize",
    });
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) => {
          capturedRequest = req;
          return Promise.resolve({ request: req, status: 200, headers: createHttpHeaders() });
        },
      },
      pipeline,
    });

    await client.sendOperationRequest(
      { body: ["item1", "item2"] },
      {
        httpMethod: "POST",
        baseUrl: "https://example.com",
        isXML: true,
        contentType: "application/xml",
        serializer: createSerializer({}, true),
        requestBody: {
          parameterPath: "body",
          mapper: {
            serializedName: "Items",
            xmlName: "Items",
            xmlElementName: "Item",
            type: {
              name: "Sequence",
              element: { type: { name: "String" } },
            },
          } as SequenceMapper,
        },
        responses: { 200: {} },
      },
    );

    assert.ok(capturedRequest);
    assert.isString(capturedRequest?.body);
  });

  it("should serialize XML Sequence with xmlNamespace", async () => {
    let capturedRequest: OperationRequest | undefined;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy({ stringifyXML: (obj) => JSON.stringify(obj) }), {
      phase: "Serialize",
    });
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) => {
          capturedRequest = req;
          return Promise.resolve({ request: req, status: 200, headers: createHttpHeaders() });
        },
      },
      pipeline,
    });

    await client.sendOperationRequest(
      { body: ["item1"] },
      {
        httpMethod: "POST",
        baseUrl: "https://example.com",
        isXML: true,
        contentType: "application/xml",
        serializer: createSerializer({}, true),
        requestBody: {
          parameterPath: "body",
          mapper: {
            serializedName: "Items",
            xmlName: "Items",
            xmlElementName: "Item",
            xmlNamespace: "http://example.com",
            xmlNamespacePrefix: "ex",
            type: {
              name: "Sequence",
              element: { type: { name: "String" } },
            },
          } as SequenceMapper,
        },
        responses: { 200: {} },
      },
    );

    assert.ok(capturedRequest);
  });

  it("should serialize XML with xmlNamespace on non-Composite/Sequence/Dictionary type", async () => {
    let capturedRequest: OperationRequest | undefined;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy({ stringifyXML: (obj) => JSON.stringify(obj) }), {
      phase: "Serialize",
    });
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) => {
          capturedRequest = req;
          return Promise.resolve({ request: req, status: 200, headers: createHttpHeaders() });
        },
      },
      pipeline,
    });

    await client.sendOperationRequest(
      { body: "stringValue" },
      {
        httpMethod: "POST",
        baseUrl: "https://example.com",
        isXML: true,
        contentType: "application/xml",
        serializer: createSerializer({}, true),
        requestBody: {
          parameterPath: "body",
          mapper: {
            serializedName: "Value",
            xmlName: "Value",
            xmlNamespace: "http://example.com",
            type: { name: "String" },
          },
        },
        responses: { 200: {} },
      },
    );

    assert.ok(capturedRequest);
  });

  it("should handle serialization error in request body", async () => {
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy(), { phase: "Serialize" });
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) =>
          Promise.resolve({ request: req, status: 200, headers: createHttpHeaders() }),
      },
      pipeline,
    });

    await expect(
      client.sendOperationRequest(
        { body: "not a number" },
        {
          httpMethod: "POST",
          baseUrl: "https://example.com",
          serializer: createSerializer(),
          requestBody: {
            parameterPath: "body",
            mapper: {
              serializedName: "body",
              required: true,
              type: { name: "Number" },
            },
          },
          responses: { 200: {} },
        },
      ),
    ).rejects.toThrow(/occurred in serializing the payload/);
  });

  it("should handle nullable body being null", async () => {
    let capturedRequest: OperationRequest | undefined;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy(), { phase: "Serialize" });
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) => {
          capturedRequest = req;
          return Promise.resolve({ request: req, status: 200, headers: createHttpHeaders() });
        },
      },
      pipeline,
    });

    await client.sendOperationRequest(
      { body: null },
      {
        httpMethod: "POST",
        baseUrl: "https://example.com",
        serializer: createSerializer(),
        requestBody: {
          parameterPath: "body",
          mapper: {
            serializedName: "body",
            nullable: true,
            type: { name: "String" },
          },
        },
        responses: { 200: {} },
      },
    );

    assert.ok(capturedRequest);
    assert.strictEqual(capturedRequest?.body, "null");
  });

  it("should serialize Stream body without JSON.stringify in non-XML", async () => {
    const streamBody = { pipe: vi.fn(), on: vi.fn() } as unknown as NodeJS.ReadableStream;
    let capturedRequest: OperationRequest | undefined;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy(), { phase: "Serialize" });
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) => {
          capturedRequest = req;
          return Promise.resolve({ request: req, status: 200, headers: createHttpHeaders() });
        },
      },
      pipeline,
    });

    await client.sendOperationRequest(
      { body: streamBody },
      {
        httpMethod: "POST",
        baseUrl: "https://example.com",
        serializer: createSerializer(),
        requestBody: {
          parameterPath: "body",
          mapper: {
            serializedName: "body",
            type: { name: "Stream" },
          },
        },
        responses: { 200: {} },
      },
    );

    assert.ok(capturedRequest);
    assert.strictEqual(capturedRequest?.body, streamBody);
  });
});

describe("serializationPolicy - prepareXMLRootList non-array", () => {
  it("should serialize XML Sequence without namespace (prepareXMLRootList no-namespace path)", async () => {
    let capturedRequest: OperationRequest | undefined;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(
      serializationPolicy({
        stringifyXML: (obj) => JSON.stringify(obj),
      }),
      { phase: "Serialize" },
    );
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) => {
          capturedRequest = req;
          return Promise.resolve({ request: req, status: 200, headers: createHttpHeaders() });
        },
      },
      pipeline,
    });

    // Sequence without xmlNamespace to hit the !xmlNamespaceKey || !xmlNamespace path in prepareXMLRootList
    await client.sendOperationRequest(
      { body: ["item1", "item2"] },
      {
        httpMethod: "POST",
        baseUrl: "https://example.com",
        isXML: true,
        contentType: "application/xml",
        serializer: createSerializer({}, true),
        requestBody: {
          parameterPath: "body",
          mapper: {
            serializedName: "Items",
            xmlName: "Items",
            xmlElementName: "Item",
            // No xmlNamespace
            type: {
              name: "Sequence",
              element: { type: { name: "String" } },
            },
          } as SequenceMapper,
        },
        responses: { 200: {} },
      },
    );

    assert.isDefined(capturedRequest, "Expected request to be captured");
    const parsed = JSON.parse(capturedRequest.body as string);
    assert.isArray(parsed.Item);
  });

  it("should wrap non-array value in prepareXMLRootList when body is null", async () => {
    let capturedRequest: OperationRequest | undefined;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(
      serializationPolicy({
        stringifyXML: (obj) => JSON.stringify(obj),
      }),
      { phase: "Serialize" },
    );
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) => {
          capturedRequest = req;
          return Promise.resolve({ request: req, status: 200, headers: createHttpHeaders() });
        },
      },
      pipeline,
    });

    // nullable Sequence with null body: serializer returns null (not an array),
    // which reaches prepareXMLRootList and triggers the !Array.isArray(obj) branch
    await client.sendOperationRequest(
      { body: null },
      {
        httpMethod: "POST",
        baseUrl: "https://example.com",
        isXML: true,
        contentType: "application/xml",
        serializer: createSerializer({}, true),
        requestBody: {
          parameterPath: "body",
          mapper: {
            serializedName: "Items",
            xmlName: "Items",
            xmlElementName: "Item",
            nullable: true,
            type: {
              name: "Sequence",
              element: { type: { name: "String" } },
            },
          } as SequenceMapper,
        },
        responses: { 200: {} },
      },
    );

    assert.isDefined(capturedRequest, "Expected request to be captured");
    const parsed = JSON.parse(capturedRequest.body as string);
    // null was wrapped into [null] by prepareXMLRootList
    assert.isArray(parsed.Item);
    assert.strictEqual(parsed.Item.length, 1);
    assert.isNull(parsed.Item[0]);
  });
});

describe("serializationPolicy - XML Stream body should not be stringified", () => {
  it("should pass stream through in XML mode", async () => {
    const streamBody = { pipe: vi.fn(), on: vi.fn() } as unknown as NodeJS.ReadableStream;
    let capturedRequest: OperationRequest | undefined;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(
      serializationPolicy({
        stringifyXML: (obj) => JSON.stringify(obj),
      }),
      { phase: "Serialize" },
    );
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) => {
          capturedRequest = req;
          return Promise.resolve({ request: req, status: 200, headers: createHttpHeaders() });
        },
      },
      pipeline,
    });

    await client.sendOperationRequest(
      { body: streamBody },
      {
        httpMethod: "POST",
        baseUrl: "https://example.com",
        isXML: true,
        contentType: "application/xml",
        serializer: createSerializer({}, true),
        requestBody: {
          parameterPath: "body",
          mapper: {
            serializedName: "body",
            type: { name: "Stream" },
          },
        },
        responses: { 200: {} },
      },
    );

    assert.ok(capturedRequest);
    // Stream should not be stringified
    assert.strictEqual(capturedRequest?.body, streamBody);
  });
});

describe("serializationPolicy - custom headers via requestOptions", () => {
  it("should apply custom headers from requestOptions", async () => {
    let capturedRequest: OperationRequest | undefined;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy(), { phase: "Serialize" });
    const client = new ServiceClient({
      httpClient: {
        sendRequest: (req) => {
          capturedRequest = req;
          return Promise.resolve({ request: req, status: 200, headers: createHttpHeaders() });
        },
      },
      pipeline,
    });

    await client.sendOperationRequest(
      {
        options: {
          requestOptions: {
            customHeaders: { "X-Custom": "myValue" },
          },
        },
      },
      {
        httpMethod: "GET",
        baseUrl: "https://example.com",
        serializer: createSerializer(),
        responses: { 200: {} },
      },
    );

    assert.ok(capturedRequest);
    assert.strictEqual(capturedRequest?.headers.get("X-Custom"), "myValue");
  });
});
