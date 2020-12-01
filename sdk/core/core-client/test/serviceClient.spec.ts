// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  ServiceClient,
  OperationRequest,
  createSerializer,
  DictionaryMapper,
  QueryCollectionFormat,
  ParameterPath,
  MapperTypeNames,
  OperationArguments,
  Mapper,
  CompositeMapper,
  OperationSpec
} from "../src";
import {
  createHttpHeaders,
  createEmptyPipeline,
  HttpsClient,
  createPipelineRequest
} from "@azure/core-https";
import { stringifyXML } from "@azure/core-xml";
import { serializeRequestBody } from "../src/serviceClient";
import { getOperationArgumentValueFromParameter } from "../src/operationHelpers";
import { deserializationPolicy } from "../src/deserializationPolicy";
import { Mappers } from "./testMappers";

describe("ServiceClient", function() {
  it("should serialize headerCollectionPrefix", async function() {
    const expected = {
      "foo-bar-alpha": "hello",
      "foo-bar-beta": "world",
      unrelated: "42"
    };

    let request: OperationRequest;
    const client = new ServiceClient({
      httpsClient: {
        sendRequest: (req) => {
          request = req;
          return Promise.resolve({ request, status: 200, headers: createHttpHeaders() });
        }
      },
      pipeline: createEmptyPipeline()
    });

    await client.sendOperationRequest(
      {
        metadata: {
          alpha: "hello",
          beta: "world"
        },
        unrelated: 42
      },
      {
        httpMethod: "GET",
        baseUrl: "https://example.com",
        serializer: createSerializer(),
        headerParameters: [
          {
            parameterPath: "metadata",
            mapper: {
              serializedName: "metadata",
              type: {
                name: "Dictionary",
                value: {
                  type: {
                    name: "String"
                  }
                }
              },
              headerCollectionPrefix: "foo-bar-"
            } as DictionaryMapper
          },
          {
            parameterPath: "unrelated",
            mapper: {
              serializedName: "unrelated",
              type: {
                name: "Number"
              }
            }
          }
        ],
        responses: {
          200: {}
        }
      }
    );

    assert(request!);
    assert.deepEqual(request!.headers.toJSON(), expected);
  });

  it("responses should not show the _response property when serializing", async function() {
    let request: OperationRequest;
    const client = new ServiceClient({
      httpsClient: {
        sendRequest: (req) => {
          request = req;
          return Promise.resolve({ request, status: 200, headers: createHttpHeaders() });
        }
      },
      pipeline: createEmptyPipeline()
    });

    const response = await client.sendOperationRequest(
      {},
      {
        httpMethod: "GET",
        baseUrl: "https://example.com",
        serializer: createSerializer(),
        headerParameters: [],
        responses: {
          200: {}
        }
      }
    );

    assert(request!);
    // _response should be not enumerable
    assert.strictEqual(JSON.stringify(response), "{}");
  });

  it("should serialize collection:csv query parameters", async function() {
    await testSendOperationRequest(["1", "2", "3"], "CSV", false, "?q=1,2,3");
  });

  it("should serialize collection:csv query parameters with commas & skipEncoding true", async function() {
    await testSendOperationRequest(["1,2", "3,4", "5"], "CSV", true, "?q=1,2,3,4,5");
  });

  it("should serialize collection:csv query parameters with commas", async function() {
    await testSendOperationRequest(["1,2", "3,4", "5"], "CSV", false, "?q=1%2C2,3%2C4,5");
  });

  it("should serialize collection:csv query parameters with undefined and null", async function() {
    await testSendOperationRequest(["1,2", undefined, "5"], "CSV", false, "?q=1%2C2,,5");
    await testSendOperationRequest(["1,2", null, "5"], "CSV", false, "?q=1%2C2,,5");
  });

  it("should serialize collection:tsv query parameters with undefined and null", async function() {
    await testSendOperationRequest(["1,2", undefined, "5"], "TSV", false, "?q=1%2C2%09%095");
    await testSendOperationRequest(["1,2", null, "5"], "TSV", false, "?q=1%2C2%09%095");
    await testSendOperationRequest(["1,2", "3", "5"], "TSV", false, "?q=1%2C2%093%095");
  });

  it("should serialize collection:ssv query parameters with undefined and null", async function() {
    await testSendOperationRequest(["1,2", undefined, "5"], "SSV", false, "?q=1%2C2%20%205");
    await testSendOperationRequest(["1,2", null, "5"], "SSV", false, "?q=1%2C2%20%205");
    await testSendOperationRequest(["1,2", "3", "5"], "SSV", false, "?q=1%2C2%203%205");
  });

  it("should serialize collection:multi query parameters", async function() {
    await testSendOperationRequest(["1", "2", "3"], "Multi", false, "?q=1&q=2&q=3");
    await testSendOperationRequest(["1,2", "3,4", "5"], "Multi", false, "?q=1%2C2&q=3%2C4&q=5");
    await testSendOperationRequest(["1,2", "3,4", "5"], "Multi", true, "?q=1,2&q=3,4&q=5");
    await testSendOperationRequest([], "Multi", true, "https://example.com");
  });

  it("should deserialize response bodies", async function() {
    let request: OperationRequest;
    const httpsClient: HttpsClient = {
      sendRequest: (req) => {
        request = req;
        return Promise.resolve({
          request,
          status: 200,
          headers: createHttpHeaders(),
          bodyAsText: "[1,2,3]"
        });
      }
    };

    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(deserializationPolicy());
    const client1 = new ServiceClient({
      httpsClient,
      pipeline
    });

    const res = await client1.sendOperationRequest(
      {},
      {
        serializer: createSerializer(),
        httpMethod: "GET",
        baseUrl: "https://example.com",
        responses: {
          200: {
            bodyMapper: {
              type: {
                name: MapperTypeNames.Sequence,
                element: {
                  type: {
                    name: "Number"
                  }
                }
              }
            }
          }
        }
      }
    );

    assert.strictEqual(res._response.status, 200);
    assert.deepStrictEqual(res.slice(), [1, 2, 3]);
  });

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
              extraProp: "FooBar"
            }
          }
        }
      ];

      serializeRequestBody(
        httpRequest,
        {
          body
        },
        {
          httpMethod: "POST",
          requestBody: Mappers.body,
          responses: { 200: {} },
          serializer: createSerializer(Mappers)
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `[{"ver":1,"name":"Test","time":"2020-09-24T17:31:35.034Z","data":{"baseData":{"test":"Hello!","extraProp":"FooBar"}}}]`
      );
    });

    it("should serialize a JSON String request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value"
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.String
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer()
        }
      );
      assert.strictEqual(httpRequest.body, `"body value"`);
    });

    it("should serialize a JSON String request body with namespace, ignoring namespace", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value"
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
                name: "String"
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer()
        }
      );
      assert.strictEqual(httpRequest.body, `"body value"`);
    });

    it("should serialize a JSON ByteArray request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: stringToByteArray("Javascript")
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.ByteArray
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer()
        }
      );
      assert.strictEqual(httpRequest.body, `"SmF2YXNjcmlwdA=="`);
    });

    it("should serialize a JSON ByteArray request body, ignoring xml properties", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: stringToByteArray("Javascript")
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
                name: MapperTypeNames.ByteArray
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer()
        }
      );
      assert.strictEqual(httpRequest.body, `"SmF2YXNjcmlwdA=="`);
    });

    it("should serialize a JSON Stream request body", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value"
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.Stream
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer()
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
          bodyArg: "body value"
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
                name: MapperTypeNames.Stream
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer()
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
          bodyArg: "body value"
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.String
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(),
          isXML: true
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
          bodyArg: "body value"
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
                name: MapperTypeNames.String
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
          bodyArg: stringToByteArray("Javascript")
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.ByteArray
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
          bodyArg: "body value"
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperTypeNames.Stream
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
          bodyArg: "body value"
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
                name: MapperTypeNames.Stream
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
          bodyArg: stringToByteArray("Javascript")
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
                name: MapperTypeNames.ByteArray
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
            content: { type: "application/xml", queueDescription: { maxDeliveryCount: 15 } }
          }
        },
        {
          httpMethod: "POST",
          requestBody: Mappers.requestBody1,
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
            content: { type: "application/xml", queueDescription: { maxDeliveryCount: 15 } }
          }
        },
        {
          httpMethod: "POST",
          requestBody: Mappers.requestBody1,
          responses: { 200: {} },
          serializer: createSerializer()
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
          bodyArg: ["Foo", "Bar"]
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
                  type: { name: "String" }
                }
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
          bodyArg: ["Foo", "Bar"]
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
                  type: { name: "String" }
                }
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer()
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
            { foo: "Foo3", bar: "Bar3" }
          ]
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
                          name: "String"
                        }
                      },
                      bar: {
                        xmlNamespacePrefix: "bar",
                        xmlNamespace: "https://microsoft.com/bar",
                        xmlName: "Bar",
                        serializedName: "bar",
                        type: {
                          name: "String"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
          bodyArg: { foo: "Foo", bar: "Bar" }
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
                      name: "String"
                    }
                  },
                  bar: {
                    xmlNamespacePrefix: "bar",
                    xmlNamespace: "https://microsoft.com/bar",
                    xmlName: "Bar",
                    serializedName: "bar",
                    type: {
                      name: "String"
                    }
                  }
                }
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
            beta: "world"
          }
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
                    name: "String"
                  }
                }
              },
              headerCollectionPrefix: "foo-bar-"
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
            beta: "world"
          }
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
                    name: "String"
                  }
                }
              },
              headerCollectionPrefix: "foo-bar-"
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
            beta: "world"
          }
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
                    name: "String"
                  }
                }
              },
              headerCollectionPrefix: "foo-bar-"
            }
          },
          responses: { 200: {} },
          serializer: createSerializer()
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
            "#": "pound value"
          },
          options: {
            serializerOptions: {
              xml: {
                xmlCharKey: "#"
              }
            }
          }
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
                    type: { name: "String" }
                  }
                }
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true
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
          bodyArg: "body value"
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
                name: MapperTypeNames.String
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer()
        }
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize a string send with the mediaType 'text' as just a string", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: "body value"
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
                name: MapperTypeNames.String
              }
            }
          },
          responses: { 200: {} },
          serializer: createSerializer()
        }
      );
      assert.strictEqual(httpRequest.body, "body value");
    });
  });

  describe("getOperationArgumentValueFromParameter()", () => {
    it("should return undefined when the parameter path isn't found in the operation arguments or service client", () => {
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(operationArguments, {
        parameterPath,
        mapper: parameterMapper
      });
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return undefined when the parameter path is found in the operation arguments but is undefined and doesn't have a default value", () => {
      const operationArguments: OperationArguments = {
        myParameter: undefined
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(operationArguments, {
        parameterPath,
        mapper: parameterMapper
      });
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return null when the parameter path is null in the operation arguments but is undefined and doesn't have a default value", () => {
      const operationArguments: OperationArguments = {
        myParameter: null
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(operationArguments, {
        parameterPath,
        mapper: parameterMapper
      });

      assert.strictEqual(parameterValue, null);
    });

    it("should return the operation argument value when the parameter path is found in the operation arguments", () => {
      const operationArguments: OperationArguments = {
        myParameter: 20
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(operationArguments, {
        mapper: parameterMapper,
        parameterPath
      });
      assert.strictEqual(parameterValue, 20);
    });

    // TODO: confirm if we need this support from RequestOptionsBase
    // it("should return the options operation argument value when the parameter path is found in the optional operation arguments", () => {
    //   const operationArguments: OperationArguments = {
    //     options: {
    //       myParameter: 1
    //     }
    //   };
    //   const parameterPath: ParameterPath = ["options", "myParameter"];
    //   const parameterMapper: Mapper = {
    //     serializedName: "my-parameter",
    //     type: {
    //       name: MapperTypeNames.Number
    //     }
    //   };
    //   const parameterValue: any = getOperationArgumentValueFromParameter(
    //     operationArguments,
    //     {
    //       parameterPath,
    //       mapper: parameterMapper
    //     }
    //   );
    //   assert.strictEqual(parameterValue, 1);
    // });

    it("should return the service client value when the parameter path is found in the service client", () => {
      const serviceClient = new ServiceClient();
      (serviceClient as any)["myParameter"] = 21;
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(
        operationArguments,
        {
          parameterPath,
          mapper: parameterMapper
        },

        serviceClient
      );
      assert.strictEqual(parameterValue, 21);
    });

    it("should return the operation argument value when the parameter path is found in both the operation arguments and the service client", () => {
      const serviceClient = new ServiceClient();
      (serviceClient as any)["myParameter"] = 21;
      const operationArguments: OperationArguments = {
        myParameter: 22
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(
        operationArguments,
        {
          parameterPath,
          mapper: parameterMapper
        },

        serviceClient
      );
      assert.strictEqual(parameterValue, 22);
    });

    it("should return the default value when it is a constant and the parameter path doesn't exist in other places", () => {
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        isConstant: true,
        defaultValue: 1,
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(operationArguments, {
        parameterPath,
        mapper: parameterMapper
      });
      assert.strictEqual(parameterValue, 1);
    });

    it("should return the default value when it is a constant and the parameter path exists in other places", () => {
      const serviceClient = new ServiceClient();
      (serviceClient as any)["myParameter"] = 1;
      const operationArguments: OperationArguments = {
        myParameter: 2
        // TODO: confirm if we need this support from RequestOptionsBase
        // options: {
        //   myParameter: 3
        // }
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        isConstant: true,
        defaultValue: 4,
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(
        operationArguments,
        {
          parameterPath,
          mapper: parameterMapper
        },
        serviceClient
      );
      assert.strictEqual(parameterValue, 4);
    });

    it("should return undefined when the parameter path isn't found in the operation arguments or the service client, the parameter is optional, and it has a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(
        operationArguments,
        {
          parameterPath,
          mapper: parameterMapper
        },
        serviceClient
      );
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return the default value when the parameter path isn't found in the operation arguments or the service client, the parameter is required, and it has a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        required: true,
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(
        operationArguments,
        {
          parameterPath,
          mapper: parameterMapper
        },
        serviceClient
      );
      assert.strictEqual(parameterValue, 21);
    });

    it("should return the default value when the parameter path is partially found in the operation arguments, the parameter is required, and it has a default value", () => {
      const operationArguments: OperationArguments = {
        myParameter: {
          differentProperty: "hello"
        }
      };
      const parameterPath: ParameterPath = ["myParameter", "myProperty"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        required: true,
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(operationArguments, {
        parameterPath,
        mapper: parameterMapper
      });
      assert.strictEqual(parameterValue, 21);
    });

    it("should return undefined when the parameter path is partially found in the operation arguments, the parameter is optional, and it has a default value", () => {
      const operationArguments: OperationArguments = {
        myParameter: {
          differentProperty: "hello"
        }
      };
      const parameterPath: ParameterPath = ["myParameter", "myProperty"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(operationArguments, {
        parameterPath,
        mapper: parameterMapper
      });
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return the default value when the parameter path is not found in the options operation arguments and it has a default value", () => {
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = ["options", "myParameter"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(operationArguments, {
        parameterPath,
        mapper: parameterMapper
      });
      assert.strictEqual(parameterValue, 21);
    });

    it("should return undefined when the parameter path is not found as a property on a parameter within the options operation arguments and it has a default value", () => {
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = ["options", "myParameter", "myProperty"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(operationArguments, {
        parameterPath,
        mapper: parameterMapper
      });
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return null when the parameter path is null in the operation arguments but is undefined and it has a default value", () => {
      const operationArguments: OperationArguments = {
        myParameter: null
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 2,
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(operationArguments, {
        parameterPath,
        mapper: parameterMapper
      });

      assert.strictEqual(parameterValue, null);
    });

    it("should return the service client value when the parameter path is found in the service client and it has a default value", () => {
      const serviceClient = new ServiceClient();
      (serviceClient as any)["myParameter"] = 5;
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 2,
        type: {
          name: MapperTypeNames.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameter(
        operationArguments,
        {
          parameterPath,
          mapper: parameterMapper
        },
        serviceClient
      );

      assert.strictEqual(parameterValue, 5);
    });
  });

  it("should deserialize error response headers", async function() {
    const BodyMapper: CompositeMapper = {
      serializedName: "getproperties-body",
      type: {
        name: "Composite",
        className: "PropertiesBody",
        modelProperties: {
          message: {
            type: {
              name: "String"
            }
          }
        }
      }
    };

    const HeadersMapper: CompositeMapper = {
      serializedName: "getproperties-headers",
      type: {
        name: "Composite",
        className: "PropertiesHeaders",
        modelProperties: {
          errorCode: {
            serializedName: "x-ms-error-code",
            type: {
              name: "String"
            }
          }
        }
      }
    };

    const serializer = createSerializer(HeadersMapper, true);

    const operationSpec: OperationSpec = {
      httpMethod: "GET",
      responses: {
        default: {
          headersMapper: HeadersMapper,
          bodyMapper: BodyMapper
        }
      },
      baseUrl: "https://example.com",
      serializer
    };

    let request: OperationRequest = createPipelineRequest({ url: "https://example.com" });
    request.additionalInfo = {
      operationSpec
    };

    const httpsClient: HttpsClient = {
      sendRequest: (req) => {
        request = req;
        return Promise.resolve({
          request,
          status: 500,
          headers: createHttpHeaders({
            "x-ms-error-code": "InvalidResourceNameHeader"
          }),
          bodyAsText: '{"message": "InvalidResourceNameBody"}'
        });
      }
    };

    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(deserializationPolicy());
    const client = new ServiceClient({
      httpsClient,
      pipeline
    });

    try {
      await client.sendOperationRequest({}, operationSpec);
      assert.fail();
    } catch (ex) {
      assert.strictEqual(ex.details.errorCode, "InvalidResourceNameHeader");
      assert.strictEqual(ex.details.message, "InvalidResourceNameBody");
    }
  });
});

function stringToByteArray(str: string): Uint8Array {
  if (typeof Buffer === "function") {
    return Buffer.from(str, "utf-8");
  } else {
    return new TextEncoder().encode(str);
  }
}

async function testSendOperationRequest(
  queryValue: any,
  queryCollectionFormat: QueryCollectionFormat,
  skipEncodingParameter: boolean,
  expected: string
): Promise<void> {
  let request: OperationRequest;
  const client = new ServiceClient({
    httpsClient: {
      sendRequest: (req) => {
        request = req;
        return Promise.resolve({ request, status: 200, headers: createHttpHeaders() });
      }
    },
    pipeline: createEmptyPipeline()
  });

  await client.sendOperationRequest(
    {
      q: queryValue
    },
    {
      httpMethod: "GET",
      baseUrl: "https://example.com",
      serializer: createSerializer(),
      queryParameters: [
        {
          collectionFormat: queryCollectionFormat,
          skipEncoding: skipEncodingParameter,
          parameterPath: "q",
          mapper: {
            serializedName: "q",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "String"
                },
                serializedName: "q"
              }
            }
          }
        }
      ],
      responses: {
        200: {}
      }
    }
  );

  assert(request!);
  assert(request!.url.endsWith(expected), `"${request!.url}" does not end with "${expected}"`);
}
