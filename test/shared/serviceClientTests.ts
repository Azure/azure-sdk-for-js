import { ServiceClient, WebResource, Serializer, HttpOperationResponse, DictionaryMapper, QueryCollectionFormat, SequenceMapper, HttpClient, MapperType } from "../../lib/msRest";
import { serializeRequestBody } from "../../lib/serviceClient";
import * as assert from "assert";

describe("ServiceClient", function () {
  it("should serialize headerCollectionPrefix", async function () {
    const expected = {
      "foo-bar-alpha": "hello",
      "foo-bar-beta": "world",
      "unrelated": "42"
    };

    // TODO: might make more sense to factor out a method in ServiceClient which returns the prepared request
    let request: WebResource;
    const client = new ServiceClient(undefined, {
      httpClient: {
        sendRequest: req => {
          request = req;
          return Promise.resolve({} as HttpOperationResponse);
        }
      },
      requestPolicyCreators: []
    });

    await client.sendOperationRequest(
      {
        arguments: {
          metadata: {
            "alpha": "hello",
            "beta": "world"
          },
          unrelated: 42
        }
      },
      {
        httpMethod: "GET",
        baseUrl: "httpbin.org",
        serializer: new Serializer(),
        headerParameters: [{
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
        }, {
          parameterPath: "unrelated",
          mapper: {
            serializedName: "unrelated",
            type: {
              name: "Number"
            }
          }
        }],
        responses: {
          200: {}
        }
      });

    assert(request!);
    assert.deepStrictEqual(request!.headers.toJson(), expected);
  });

  it("Should serialize collection:multi query parameters", async function () {
    const expected = "?q=1&q=2&q=3";

    let request: WebResource;
    const client = new ServiceClient(undefined, {
      httpClient: {
        sendRequest: req => {
          request = req;
          return Promise.resolve({} as HttpOperationResponse);
        },
      },
      requestPolicyCreators: [],
    });

    await client.sendOperationRequest(
      {
        arguments: {
          q: [1, 2, 3],
        },
      },
      {
        httpMethod: "GET",
        baseUrl: "httpbin.org",
        serializer: new Serializer(),
        queryParameters: [
          {
            collectionFormat: QueryCollectionFormat.Multi,
            parameterPath: "q",
            mapper: {
              serializedName: "q",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "number",
                  },
                  serializedName: "q",
                },
              },
            } as SequenceMapper,
          },
        ],
        responses: {
          200: {},
        },
      }
    );

    assert(request!);
    assert(request!.url.endsWith(expected), `"${request!.url}" does not end with "${expected}"`);
  });

  it("should apply withCredentials to requests", async function() {
    let request: WebResource;
    const httpClient: HttpClient = {
      sendRequest: req => {
        request = req;
        return Promise.resolve({} as HttpOperationResponse);
      }
    };

    const client1 = new ServiceClient(undefined, {
      httpClient,
      requestPolicyCreators: []
    });
    await client1.sendOperationRequest({ arguments: {} },
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "httpbin.org",
        responses: { 200: {} }
      });

    assert.strictEqual(request!.withCredentials, false);

    const client2 = new ServiceClient(undefined, {
      httpClient,
      requestPolicyCreators: [],
      withCredentials: true
    });
    await client2.sendOperationRequest({ arguments: {} },
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "httpbin.org",
        responses: { 200: {} }
      });
    assert.strictEqual(request!.withCredentials, true);
  });

  describe("serializeRequestBody()", () => {
    it("should serialize a JSON String request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
        httpRequest,
        {
          arguments: {
            bodyArg: "body value"
          }
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperType.String
              }
            }
          },
          responses: { 200: {} },
          serializer: new Serializer()
        });
      assert.strictEqual(httpRequest.body, `"body value"`);
    });

    it("should serialize a JSON ByteArray request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
        httpRequest,
        {
          arguments: {
            bodyArg: stringToByteArray("Javascript")
          }
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperType.ByteArray
              }
            }
          },
          responses: { 200: {} },
          serializer: new Serializer()
        });
      assert.strictEqual(httpRequest.body, `"SmF2YXNjcmlwdA=="`);
    });

    it("should serialize a JSON Stream request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
        httpRequest,
        {
          arguments: {
            bodyArg: "body value"
          }
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperType.Stream
              }
            }
          },
          responses: { 200: {} },
          serializer: new Serializer()
        });
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize an XML String request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
        httpRequest,
        {
          arguments: {
            bodyArg: "body value"
          }
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperType.String
              }
            }
          },
          responses: { 200: {} },
          serializer: new Serializer(),
          isXML: true
        });
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg>body value</bodyArg>`);
    });

    it("should serialize an XML ByteArray request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
        httpRequest,
        {
          arguments: {
            bodyArg: stringToByteArray("Javascript")
          }
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperType.ByteArray
              }
            }
          },
          responses: { 200: {} },
          serializer: new Serializer(),
          isXML: true
        });
        assert.strictEqual(
          httpRequest.body,
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg>SmF2YXNjcmlwdA==</bodyArg>`);
    });

    it("should serialize an XML Stream request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
        httpRequest,
        {
          arguments: {
            bodyArg: "body value"
          }
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperType.Stream
              }
            }
          },
          responses: { 200: {} },
          serializer: new Serializer(),
          isXML: true
        });
        assert.strictEqual(httpRequest.body, "body value");
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