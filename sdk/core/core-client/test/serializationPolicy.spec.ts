// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MapperTypeNames, createSerializer } from "../src";
import { serializeHeaders, serializeRequestBody } from "../src/serializationPolicy";
import { Mappers } from "./testMappers1";
import { assert } from "chai";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { stringifyXML } from "@azure/core-xml";

describe("serializationPolicy", function () {
  describe("serializeRequestBody()", () => {
    it("should serialize additional properties when the mapper is refd by className", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `[{"ver":1,"name":"Test","time":"2020-09-24T17:31:35.034Z","data":{"baseData":{"test":"Hello!","extraProp":"FooBar"}}}]`
      );
    });

    it("should serialize a JSON false request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );
      assert.strictEqual(httpRequest.body, `false`);
    });

    it("should serialize a JSON null request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );
      assert.strictEqual(httpRequest.body, `null`);
    });

    it("should serialize a JSON String request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );
      assert.strictEqual(httpRequest.body, `"body value"`);
    });

    it("should serialize a JSON String request body with namespace, ignoring namespace", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );
      assert.strictEqual(httpRequest.body, `"body value"`);
    });

    it("should serialize a JSON ByteArray request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );
      assert.strictEqual(httpRequest.body, `"SmF2YXNjcmlwdA=="`);
    });

    it("should serialize a JSON ByteArray request body, ignoring xml properties", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );
      assert.strictEqual(httpRequest.body, `"SmF2YXNjcmlwdA=="`);
    });

    it("should serialize a JSON Stream request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize a JSON Stream request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize an XML String request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg>body value</bodyArg>`
      );
    });

    it("should serialize an XML String request body, with namespace", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com">body value</bodyArg>`
      );
    });

    it("should serialize an XML ByteArray request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg>SmF2YXNjcmlwdA==</bodyArg>`
      );
    });

    it("should serialize an XML Stream request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize an XML Stream request body, with namespace", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize an XML ByteArray request body with namespace and prefix", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns:sample="https://microsoft.com">SmF2YXNjcmlwdA==</bodyArg>`
      );
    });

    it("should serialize an XML Composite request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><entry xmlns="http://www.w3.org/2005/Atom"><updated xmlns="http://www.w3.org/2005/Atom">2020-08-12T23:36:18.308Z</updated><content xmlns="http://www.w3.org/2005/Atom" type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect"><MaxDeliveryCount xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">15</MaxDeliveryCount></QueueDescription></content></entry>`
      );
    });

    it("should serialize a JSON Composite request body, ignoring XML metadata", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );

      assert.deepEqual(
        httpRequest.body,
        '{"updated":"2020-08-12T23:36:18.308Z","content":{"type":"application/xml","queueDescription":{"maxDeliveryCount":15}}}'
      );
    });

    it("should serialize an XML Array request body with namespace and prefix", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com"><testItem xmlns="https://microsoft.com/element">Foo</testItem><testItem xmlns="https://microsoft.com/element">Bar</testItem></bodyArg>`
      );
    });

    it("should serialize a JSON Array request body, ignoring XML metadata", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );
      assert.deepEqual(httpRequest.body, JSON.stringify(["Foo", "Bar"]));
    });

    it("should serialize an XML Array of composite elements, namespace and prefix", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: [
            { foo: "Foo1", bar: "Bar1" },
            { foo: "Foo2", bar: "Bar2" },
            { foo: "Foo3", bar: "Bar3" },
          ],
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
                  type: {
                    name: "Composite",
                    modelProperties: {
                      foo: {
                        serializedName: "foo",
                        xmlNamespace: "https://microsoft.com/foo",
                        xmlName: "Foo",
                        type: {
                          name: "String",
                        },
                      },
                      bar: {
                        xmlNamespacePrefix: "bar",
                        xmlNamespace: "https://microsoft.com/bar",
                        xmlName: "Bar",
                        serializedName: "bar",
                        type: {
                          name: "String",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com"><testItem xmlns="https://microsoft.com/element"><Foo xmlns="https://microsoft.com/foo">Foo1</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar1</Bar></testItem><testItem xmlns="https://microsoft.com/element"><Foo xmlns="https://microsoft.com/foo">Foo2</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar2</Bar></testItem><testItem xmlns="https://microsoft.com/element"><Foo xmlns="https://microsoft.com/foo">Foo3</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar3</Bar></testItem></bodyArg>`
      );
    });

    it("should serialize an XML Composite request body with namespace and prefix", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: { foo: "Foo", bar: "Bar" },
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
                name: MapperTypeNames.Composite,
                modelProperties: {
                  foo: {
                    serializedName: "foo",
                    xmlNamespace: "https://microsoft.com/foo",
                    xmlName: "Foo",
                    type: {
                      name: "String",
                    },
                  },
                  bar: {
                    xmlNamespacePrefix: "bar",
                    xmlNamespace: "https://microsoft.com/bar",
                    xmlName: "Bar",
                    serializedName: "bar",
                    type: {
                      name: "String",
                    },
                  },
                },
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com"><Foo xmlns="https://microsoft.com/foo">Foo</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar</Bar></bodyArg>`
      );
    });

    it("should serialize an XML Dictionary request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><metadata><alpha>hello</alpha><beta>world</beta></metadata>`
      );
    });

    it("should serialize an XML Dictionary request body, with namespace and prefix", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><metadata xmlns:sample="https://microsoft.com"><alpha xmlns:el="https://microsoft.com/element">hello</alpha><beta xmlns:el="https://microsoft.com/element">world</beta></metadata>`
      );
    });

    it("should serialize a JSON Dictionary request body, ignoring xml metadata", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.deepEqual(httpRequest.body, `{"alpha":"hello","beta":"world"}`);
    });

    it("should serialize an XML request body with custom xml char key", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        stringifyXML
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><entry>pound value</entry>`
      );
    });

    it("should serialize a string send to a text/plain endpoint as just a string", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize a string send with the mediaType 'text' as just a string", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );
      assert.strictEqual(httpRequest.body, "body value");
    });
  });

  describe("serializeHeaders()", () => {
    it("should respect customHeaders", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
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
        }
      );
      assert.strictEqual(httpRequest.headers.get("Content-Type"), "custom/type");
    });
  });
});

function stringToByteArray(str: string): Uint8Array {
  if (typeof Buffer === "function") {
    return Buffer.from(str, "utf-8");
  } else {
    return new TextEncoder().encode(str);
  }
}
