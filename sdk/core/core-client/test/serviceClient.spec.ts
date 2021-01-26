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
  OperationSpec,
  serializationPolicy,
  FullOperationResponse
} from "../src";
import {
  createHttpHeaders,
  createEmptyPipeline,
  HttpsClient,
  createPipelineRequest
} from "@azure/core-https";

import {
  getOperationArgumentValueFromParameter,
  getOperationRequestInfo
} from "../src/operationHelpers";
import { deserializationPolicy } from "../src/deserializationPolicy";
import { TokenCredential } from "@azure/core-auth";
import { getCachedDefaultHttpsClient } from "../src/httpClientCache";

describe("ServiceClient", function() {
  describe("Auth scopes", () => {
    const testOperationArgs = {
      metadata: {
        alpha: "hello",
        beta: "world"
      },
      unrelated: 42
    };
    const testOperationSpec: OperationSpec = {
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
    };

    it("should throw if scopes contain an invalid url", async function() {
      const credential: TokenCredential = {
        getToken: async (_scopes) => {
          return { token: "testToken", expiresOnTimestamp: 11111 };
        }
      };
      try {
        let request: OperationRequest;
        const client = new ServiceClient({
          httpsClient: {
            sendRequest: (req) => {
              request = req;
              return Promise.resolve({ request, status: 200, headers: createHttpHeaders() });
            }
          },
          credential,
          credentialScopes: ["https://microsoft.com", "lalala"]
        });

        await client.sendOperationRequest(testOperationArgs, testOperationSpec);
        assert.fail();
      } catch (error) {
        assert.include(error.message, `Invalid URL`);
      }
    });

    it("should throw is no scope or baseUri are defined", async function() {
      const credential: TokenCredential = {
        getToken: async (_scopes) => {
          return { token: "testToken", expiresOnTimestamp: 11111 };
        }
      };
      try {
        let request: OperationRequest;
        const client = new ServiceClient({
          httpsClient: {
            sendRequest: (req) => {
              request = req;
              return Promise.resolve({ request, status: 200, headers: createHttpHeaders() });
            }
          },
          credential
        });

        await client.sendOperationRequest(testOperationArgs, testOperationSpec);
        assert.fail();
      } catch (error) {
        assert.equal(
          error.message,
          `When using credentials, the ServiceClientOptions must contain either a baseUri or a credentialScopes. Unable to create a bearerTokenAuthenticationPolicy`
        );
      }
    });

    it("should use baseUrl to build scope", async function() {
      const baseUri = "https://microsoft.com/baseuri";
      const credential: TokenCredential = {
        getToken: async (scopes) => {
          assert.equal(scopes, `${baseUri}/.default`);
          return { token: "testToken", expiresOnTimestamp: 11111 };
        }
      };

      let request: OperationRequest;
      const client = new ServiceClient({
        httpsClient: {
          sendRequest: (req) => {
            request = req;
            return Promise.resolve({ request, status: 200, headers: createHttpHeaders() });
          }
        },
        credential,
        baseUri
      });

      await client.sendOperationRequest(testOperationArgs, testOperationSpec);

      assert(request!);
      assert.deepEqual(request!.headers.get("authorization"), "Bearer testToken");
    });

    it("should use the provided scope", async function() {
      const authScope = "https://microsoft.com/baseuri/.default";
      const credential: TokenCredential = {
        getToken: async (scopes) => {
          assert.equal(scopes, authScope);
          return { token: "testToken", expiresOnTimestamp: 11111 };
        }
      };

      let request: OperationRequest;
      const client = new ServiceClient({
        httpsClient: {
          sendRequest: (req) => {
            request = req;
            return Promise.resolve({ request, status: 200, headers: createHttpHeaders() });
          }
        },
        credential,
        credentialScopes: authScope
      });

      await client.sendOperationRequest(testOperationArgs, testOperationSpec);

      assert(request!);
      assert.deepEqual(request!.headers.get("authorization"), "Bearer testToken");
    });
  });

  it("should serialize headerCollectionPrefix", async function() {
    const expected = {
      "foo-bar-alpha": "hello",
      "foo-bar-beta": "world",
      unrelated: "42"
    };

    let request: OperationRequest;
    let pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy(), { phase: "Serialize" });
    const client = new ServiceClient({
      httpsClient: {
        sendRequest: (req) => {
          request = req;
          return Promise.resolve({ request, status: 200, headers: createHttpHeaders() });
        }
      },
      pipeline
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

  it("should call rawResponseCallback with the full response", async function() {
    let request: OperationRequest;
    const client = new ServiceClient({
      httpsClient: {
        sendRequest: (req) => {
          request = req;
          return Promise.resolve({
            request,
            status: 200,
            headers: createHttpHeaders({ "X-Extra-Info": "foo" })
          });
        }
      },
      pipeline: createEmptyPipeline()
    });

    let rawResponse: FullOperationResponse | undefined;

    const response = await client.sendOperationRequest(
      { options: { onResponse: (response) => (rawResponse = response) } },
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
    assert.strictEqual(JSON.stringify(response), "{}");
    assert.strictEqual(rawResponse?.status, 200);
    assert.strictEqual(rawResponse?.request, request!);
    assert.strictEqual(rawResponse?.headers.get("X-Extra-Info"), "foo");
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

    let rawResponse: FullOperationResponse | undefined;
    const res = await client1.sendOperationRequest<Array<number>>(
      {
        options: {
          onResponse: (response) => {
            rawResponse = response;
          }
        }
      },
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

    assert.strictEqual(rawResponse?.status, 200);
    assert.deepStrictEqual(res.slice(), [1, 2, 3]);
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
    const operationInfo = getOperationRequestInfo(request);
    operationInfo.operationSpec = operationSpec;

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

  it("should re-use the common instance of DefaultHttpClient", function() {
    const client = new ServiceClient();
    assert.strictEqual((client as any)._httpsClient, getCachedDefaultHttpsClient());
  });
});

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
