import * as assert from "assert";
import { HttpClient } from "../../lib/httpClient";
import { QueryCollectionFormat } from "../../lib/queryCollectionFormat";
import { DictionaryMapper, MapperType, Serializer, Mapper } from "../../lib/serializer";
import { serializeRequestBody, ServiceClient, getOperationArgumentValueFromParameterPath } from "../../lib/serviceClient";
import { WebResource } from "../../lib/webResource";
import { OperationArguments, HttpHeaders, deserializationPolicy } from "../../lib/msRest";
import { ParameterPath } from "../../lib/operationParameter";

describe("ServiceClient", function () {
  it("should serialize headerCollectionPrefix", async function () {
    const expected = {
      "foo-bar-alpha": "hello",
      "foo-bar-beta": "world",
      "unrelated": "42"
    };

    let request: WebResource;
    const client = new ServiceClient(undefined, {
      httpClient: {
        sendRequest: req => {
          request = req;
          return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
        }
      },
      requestPolicyFactories: []
    });

    await client.sendOperationRequest(
      {
        metadata: {
          "alpha": "hello",
          "beta": "world"
        },
        unrelated: 42
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

  it("responses should not show the _response property when serializing", async function () {
    let request: WebResource;
    const client = new ServiceClient(undefined, {
      httpClient: {
        sendRequest: req => {
          request = req;
          return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
        }
      },
      requestPolicyFactories: []
    });

    const response = await client.sendOperationRequest(
      {},
      {
        httpMethod: "GET",
        baseUrl: "httpbin.org",
        serializer: new Serializer(),
        headerParameters: [],
        responses: {
          200: {}
        }
      });

    assert(request!);
    assert.strictEqual(JSON.stringify(response), "{}");
  });

  it("Should serialize collection:multi query parameters", async function () {
    const expected = "?q=1&q=2&q=3";

    let request: WebResource;
    const client = new ServiceClient(undefined, {
      httpClient: {
        sendRequest: req => {
          request = req;
          return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
        },
      },
      requestPolicyFactories: [],
    });

    await client.sendOperationRequest(
      {
        q: [1, 2, 3]
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
                    name: "Number",
                  },
                  serializedName: "q",
                },
              },
            },
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
        return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
      }
    };

    const client1 = new ServiceClient(undefined, {
      httpClient,
      requestPolicyFactories: []
    });
    await client1.sendOperationRequest(
      {},
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "httpbin.org",
        responses: { 200: {} }
      });

    assert.strictEqual(request!.withCredentials, false);

    const client2 = new ServiceClient(undefined, {
      httpClient,
      requestPolicyFactories: [],
      withCredentials: true
    });
    await client2.sendOperationRequest(
      {},
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "httpbin.org",
        responses: { 200: {} }
      });
    assert.strictEqual(request!.withCredentials, true);
  });

  it("should deserialize response bodies", async function() {
    let request: WebResource;
    const httpClient: HttpClient = {
      sendRequest: req => {
        request = req;
        return Promise.resolve({ request, status: 200, headers: new HttpHeaders(), bodyAsText: "[1,2,3]" });
      }
    };

    const client1 = new ServiceClient(undefined, {
      httpClient,
      requestPolicyFactories: [deserializationPolicy()]
    });

    const res = await client1.sendOperationRequest(
      {},
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "httpbin.org",
        responses: {
          200: {
            bodyMapper: {
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Number"
                }
              }
            }
          }
        }
      }
    });

    assert.strictEqual(res._response.status, 200);
    assert.deepStrictEqual(res.slice(), [1,2,3]);
  });

  describe("serializeRequestBody()", () => {
    it("should serialize a JSON String request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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

  describe("getOperationArgumentValueFromParameterPath()", () => {
    it("should return undefined when the parameter path isn't found in the operation arguments or service client", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return undefined when the parameter path is found in the operation arguments but is undefined and doesn't have a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        "myParameter": undefined
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return null when the parameter path is null in the operation arguments but is undefined and doesn't have a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        // tslint:disable-next-line:no-null-keyword
        "myParameter": null
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      // tslint:disable-next-line:no-null-keyword
      assert.strictEqual(parameterValue, null);
    });

    it("should return the operation argument value when the parameter path is found in the operation arguments", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        "myParameter": 20
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, 20);
    });

    it("should return the options operation argument value when the parameter path is found in the optional operation arguments", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        "options": {
          "myParameter": 1
        }
      };
      const parameterPath: ParameterPath = ["options", "myParameter"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, 1);
    });

    it("should return the service client value when the parameter path is found in the service client", () => {
      const serviceClient = new ServiceClient();
      (serviceClient as any)["myParameter"] = 21;
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, 21);
    });

    it("should return the operation argument value when the parameter path is found in both the operation arguments and the service client", () => {
      const serviceClient = new ServiceClient();
      (serviceClient as any)["myParameter"] = 21;
      const operationArguments: OperationArguments = {
        "myParameter": 22
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, 22);
    });

    it("should return the default value when it is a constant and the parameter path doesn't exist in other places", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        isConstant: true,
        defaultValue: 1,
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, 1);
    });

    it("should return the default value when it is a constant and the parameter path exists in other places", () => {
      const serviceClient = new ServiceClient();
      (serviceClient as any)["myParameter"] = 1;
      const operationArguments: OperationArguments = {
        "myParameter": 2,
        "options": {
          "myParameter": 3
        }
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        isConstant: true,
        defaultValue: 4,
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
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
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
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
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, 21);
    });

    it("should return the default value when the parameter path is partially found in the operation arguments, the parameter is required, and it has a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        "myParameter": {
          "differentProperty": "hello"
        }
      };
      const parameterPath: ParameterPath = ["myParameter", "myProperty"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        required: true,
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, 21);
    });

    it("should return undefined when the parameter path is partially found in the operation arguments, the parameter is optional, and it has a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        "myParameter": {
          "differentProperty": "hello"
        }
      };
      const parameterPath: ParameterPath = ["myParameter", "myProperty"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return the default value when the parameter path is not found in the options operation arguments and it has a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = ["options", "myParameter"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, 21);
    });

    it("should return undefined when the parameter path is not found as a property on a parameter within the options operation arguments and it has a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {};
      const parameterPath: ParameterPath = ["options", "myParameter", "myProperty"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return null when the parameter path is null in the operation arguments but is undefined and it has a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        // tslint:disable-next-line:no-null-keyword
        "myParameter": null
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 2,
        type: {
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      // tslint:disable-next-line:no-null-keyword
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
          name: MapperType.Number
        }
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(serviceClient, operationArguments, parameterPath, parameterMapper, new Serializer());
      // tslint:disable-next-line:no-null-keyword
      assert.strictEqual(parameterValue, 5);
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