// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as Mappers from "./testMappers";
import {
  CompositeMapper,
  DictionaryMapper,
  Mapper,
  MapperType,
  Serializer,
} from "../src/serializer";
import {
  HttpHeaders,
  OperationArguments,
  OperationSpec,
  RestResponse,
  ServiceClientCredentials,
  ServiceClientOptions,
  TokenCredential,
  deserializationPolicy,
  isNode,
} from "../src/coreHttp";
import {
  ServiceClient,
  getOperationArgumentValueFromParameterPath,
  serializeRequestBody,
} from "../src/serviceClient";
import { HttpClient } from "../src/httpClient";
import { ParameterPath } from "../src/operationParameter";
import { QueryCollectionFormat } from "../src/queryCollectionFormat";
import { WebResource } from "../src/webResource";
import { assert } from "chai";
import { getCachedDefaultHttpClient } from "../src/httpClientCache";

describe("ServiceClient", function () {
  describe("Auth scopes", () => {
    const testArgs = {
      metadata: {
        alpha: "hello",
        beta: "world",
      },
      unrelated: 42,
    };

    const testOperationSpec: OperationSpec = {
      httpMethod: "GET",
      baseUrl: "https://bin.org",
      serializer: new Serializer(),
      headerParameters: [
        {
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
          } as DictionaryMapper,
        },
        {
          parameterPath: "unrelated",
          mapper: {
            serializedName: "unrelated",
            type: {
              name: "Number",
            },
          },
        },
      ],
      responses: {
        200: {},
      },
    };

    it("should throw when there is a non fqdm as credentialScopes", async () => {
      const cred: TokenCredential = {
        getToken: async (_scopes) => {
          return { token: "testToken", expiresOnTimestamp: 11111 };
        },
      };
      let request: WebResource;
      try {
        const client = new ServiceClient(cred, {
          httpClient: {
            sendRequest: (req) => {
              request = req;
              return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
            },
          },
          credentialScopes: ["/lalala//", "https://microsoft.com"],
        });
        await client.sendOperationRequest(testArgs, testOperationSpec);
        assert.fail("Expected to throw");
      } catch (error: any) {
        assert.include(error.message, `Invalid URL`);
      }
    });

    it("should throw when there is no credentialScopes or baseUri", async () => {
      const cred: TokenCredential = {
        getToken: async (_scopes) => {
          return { token: "testToken", expiresOnTimestamp: 11111 };
        },
      };
      let request: WebResource;
      try {
        const client = new ServiceClient(cred, {
          httpClient: {
            sendRequest: (req) => {
              request = req;
              return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
            },
          },
        });
        await client.sendOperationRequest(testArgs, testOperationSpec);
        assert.fail("Expected to throw");
      } catch (error: any) {
        assert.equal(
          error.message,
          `When using credential, the ServiceClient must contain a baseUri or a credentialScopes in ServiceClientOptions. Unable to create a bearerTokenAuthenticationPolicy`
        );
      }
    });

    it("should use the provided scope", async () => {
      const scope = "https://microsoft.com/.default";
      const cred: TokenCredential = {
        getToken: async (scopes) => {
          assert.equal(scopes, scope);
          return { token: "testToken", expiresOnTimestamp: 11111 };
        },
      };
      let request: WebResource;
      const client = new ServiceClient(cred, {
        httpClient: {
          sendRequest: (req) => {
            request = req;
            return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
          },
        },
        credentialScopes: scope,
      });

      await client.sendOperationRequest(testArgs, testOperationSpec);

      assert(request!);
      assert.deepEqual(request!.headers.get("authorization"), "Bearer testToken");
    });

    it("should use the baseUri to build scope", async () => {
      const scope = "https://microsoft.com/wrappedClient";
      class MockService extends ServiceClient {
        constructor(
          credentials?: TokenCredential | ServiceClientCredentials,
          /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
          options?: ServiceClientOptions
        ) {
          super(credentials, options);
          this.baseUri = scope;
        }
      }

      const cred: TokenCredential = {
        getToken: async (scopes) => {
          assert.equal(scopes, `${scope}/.default`);
          return { token: "testToken", expiresOnTimestamp: 11111 };
        },
      };

      let request: WebResource;
      const client = new MockService(cred, {
        httpClient: {
          sendRequest: (req) => {
            request = req;
            return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
          },
        },
      });

      await client.sendOperationRequest(testArgs, testOperationSpec);

      assert(request!);
      assert.deepEqual(request!.headers.get("authorization"), "Bearer testToken");
    });
  });

  it("should serialize headerCollectionPrefix", async function () {
    const expected = {
      "foo-bar-alpha": "hello",
      "foo-bar-beta": "world",
      unrelated: "42",
    };

    let request: WebResource;
    const client = new ServiceClient(undefined, {
      httpClient: {
        sendRequest: (req) => {
          request = req;
          return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
        },
      },
      requestPolicyFactories: [],
    });

    await client.sendOperationRequest(
      {
        metadata: {
          alpha: "hello",
          beta: "world",
        },
        unrelated: 42,
      },
      {
        httpMethod: "GET",
        baseUrl: "https://bin.org",
        serializer: new Serializer(),
        headerParameters: [
          {
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
            } as DictionaryMapper,
          },
          {
            parameterPath: "unrelated",
            mapper: {
              serializedName: "unrelated",
              type: {
                name: "Number",
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
    assert.deepEqual(request!.headers.toJson(), expected);
  });

  it("responses should not show the _response property when serializing", async function () {
    let request: WebResource;
    const client = new ServiceClient(undefined, {
      httpClient: {
        sendRequest: (req) => {
          request = req;
          return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
        },
      },
      requestPolicyFactories: [],
    });

    const response = await client.sendOperationRequest(
      {},
      {
        httpMethod: "GET",
        baseUrl: "https://bin.org",
        serializer: new Serializer(),
        headerParameters: [],
        responses: {
          200: {},
        },
      }
    );

    assert(request!);
    assert.strictEqual(JSON.stringify(response), "{}");
  });

  it("should serialize collection:csv query parameters", async function () {
    await testSendOperationRequest(["1", "2", "3"], QueryCollectionFormat.Csv, false, "?q=1,2,3");
  });

  it("should serialize collection:csv query parameters with commas & skipEncoding true", async function () {
    await testSendOperationRequest(
      ["1,2", "3,4", "5"],
      QueryCollectionFormat.Csv,
      true,
      "?q=1,2,3,4,5"
    );
  });

  it("should serialize collection:csv query parameters with commas", async function () {
    await testSendOperationRequest(
      ["1,2", "3,4", "5"],
      QueryCollectionFormat.Csv,
      false,
      "?q=1%2C2,3%2C4,5"
    );
  });

  it("should serialize collection:csv query parameters with undefined and null", async function () {
    await testSendOperationRequest(
      ["1,2", undefined, "5"],
      QueryCollectionFormat.Csv,
      false,
      "?q=1%2C2,,5"
    );
    await testSendOperationRequest(
      ["1,2", null, "5"],
      QueryCollectionFormat.Csv,
      false,
      "?q=1%2C2,,5"
    );
  });

  it("should serialize collection:tsv query parameters with undefined and null", async function () {
    await testSendOperationRequest(
      ["1,2", undefined, "5"],
      QueryCollectionFormat.Tsv,
      false,
      "?q=1%2C2%09%095"
    );
    await testSendOperationRequest(
      ["1,2", null, "5"],
      QueryCollectionFormat.Tsv,
      false,
      "?q=1%2C2%09%095"
    );
    await testSendOperationRequest(
      ["1,2", "3", "5"],
      QueryCollectionFormat.Tsv,
      false,
      "?q=1%2C2%093%095"
    );
  });

  it("should serialize collection:ssv query parameters with undefined and null", async function () {
    await testSendOperationRequest(
      ["1,2", undefined, "5"],
      QueryCollectionFormat.Ssv,
      false,
      "?q=1%2C2%20%205"
    );
    await testSendOperationRequest(
      ["1,2", null, "5"],
      QueryCollectionFormat.Ssv,
      false,
      "?q=1%2C2%20%205"
    );
    await testSendOperationRequest(
      ["1,2", "3", "5"],
      QueryCollectionFormat.Ssv,
      false,
      "?q=1%2C2%203%205"
    );
  });

  it("should serialize collection:multi query parameters", async function () {
    await testSendOperationRequest(
      ["1", "2", "3"],
      QueryCollectionFormat.Multi,
      false,
      "?q=1&q=2&q=3"
    );
    await testSendOperationRequest(
      ["1,2", "3,4", "5"],
      QueryCollectionFormat.Multi,
      false,
      "?q=1%2C2&q=3%2C4&q=5"
    );
    await testSendOperationRequest(
      ["1,2", "3,4", "5"],
      QueryCollectionFormat.Multi,
      true,
      "?q=1,2&q=3,4&q=5"
    );
  });

  it("should serialize collection with empty multi query parameter", async function () {
    await testSendOperationRequest([], QueryCollectionFormat.Multi, true, "https://bin.org");
  });

  it("should apply withCredentials to requests", async function () {
    let request: WebResource;
    const httpClient: HttpClient = {
      sendRequest: (req) => {
        request = req;
        return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
      },
    };

    const client1 = new ServiceClient(undefined, {
      httpClient,
      requestPolicyFactories: () => [],
    });
    await client1.sendOperationRequest(
      {},
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "https://bin.org",
        responses: { 200: {} },
      }
    );

    assert.strictEqual(request!.withCredentials, false);

    const client2 = new ServiceClient(undefined, {
      httpClient,
      requestPolicyFactories: [],
      withCredentials: true,
    });
    await client2.sendOperationRequest(
      {},
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "https://bin.org",
        responses: { 200: {} },
      }
    );
    assert.strictEqual(request!.withCredentials, true);
  });

  it("should deserialize response bodies", async function () {
    let request: WebResource;
    const httpClient: HttpClient = {
      sendRequest: (req) => {
        request = req;
        return Promise.resolve({
          request,
          status: 200,
          headers: new HttpHeaders(),
          bodyAsText: "[1,2,3]",
        });
      },
    };

    const client1 = new ServiceClient(undefined, {
      httpClient,
      requestPolicyFactories: [deserializationPolicy()],
    });

    const res = await client1.sendOperationRequest(
      {},
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "https://bin.org",
        responses: {
          200: {
            bodyMapper: {
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Number",
                  },
                },
              },
            },
          },
        },
      }
    );

    assert.strictEqual(res._response.status, 200);
    assert.deepStrictEqual(res.slice(), [1, 2, 3]);
  });

  it("should use userAgent header name value from options", async function () {
    const httpClient: HttpClient = {
      sendRequest: (request: WebResource) => {
        return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
      },
    };

    const client1 = new ServiceClient(undefined, {
      httpClient,
      userAgentHeaderName: "my-user-agent-key",
      userAgent: "blah blah",
    });

    const response: RestResponse = await client1.sendOperationRequest(
      {},
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "https://bin.org",
        responses: {},
      }
    );

    assert.strictEqual(response._response.status, 200);
    assert.strictEqual(response._response.request.headers.get("my-user-agent-key"), "blah blah");
  });

  it("should use userAgent header name function from options", async function () {
    const httpClient: HttpClient = {
      sendRequest: (request: WebResource) => {
        return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
      },
    };

    const client1 = new ServiceClient(undefined, {
      httpClient,
      userAgentHeaderName: () => "my-user-agent-key-2",
      userAgent: "blah blah",
    });

    const response: RestResponse = await client1.sendOperationRequest(
      {},
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "https://bin.org",
        responses: {},
      }
    );

    assert.strictEqual(response._response.status, 200);
    assert.strictEqual(response._response.request.headers.get("my-user-agent-key-2"), "blah blah");
  });

  it("should use userAgent string from options", async function () {
    const httpClient: HttpClient = {
      sendRequest: (request: WebResource) => {
        return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
      },
    };

    const client1 = new ServiceClient(undefined, {
      httpClient,
      userAgent: "blah blah",
    });

    const response: RestResponse = await client1.sendOperationRequest(
      {},
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "https://bin.org",
        responses: {},
      }
    );

    assert.strictEqual(response._response.status, 200);
    assert.strictEqual(
      response._response.request.headers.get(isNode ? "user-agent" : "x-ms-useragent"),
      "blah blah"
    );
  });

  it("should use userAgent function from options that appends to defaultUserAgent", async function () {
    const httpClient: HttpClient = {
      sendRequest: (request: WebResource) => {
        return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
      },
    };

    const client1 = new ServiceClient(undefined, {
      httpClient,
      userAgent: (defaultUserAgent: string) => `${defaultUserAgent}/blah blah`,
    });

    const response: RestResponse = await client1.sendOperationRequest(
      {},
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "https://bin.org",
        responses: {},
      }
    );

    assert.strictEqual(response._response.status, 200);
    const userAgentHeaderValue: string | undefined = response._response.request.headers.get(
      isNode ? "user-agent" : "x-ms-useragent"
    );
    assert(userAgentHeaderValue);
    assert(userAgentHeaderValue!.startsWith("core-http/"));
    assert(userAgentHeaderValue!.endsWith("/blah blah"));
  });

  it("should use userAgent function from options that ignores defaultUserAgent", async function () {
    const httpClient: HttpClient = {
      sendRequest: (request: WebResource) => {
        return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
      },
    };

    const client1 = new ServiceClient(undefined, {
      httpClient,
      userAgent: () => `blah blah 2`,
    });

    const response: RestResponse = await client1.sendOperationRequest(
      {},
      {
        serializer: new Serializer(),
        httpMethod: "GET",
        baseUrl: "https://bin.org",
        responses: {},
      }
    );

    assert.strictEqual(response._response.status, 200);
    assert.strictEqual(
      response._response.request.headers.get(isNode ? "user-agent" : "x-ms-useragent"),
      "blah blah 2"
    );
  });

  describe("serializeRequestBody()", () => {
    it("should serialize a JSON String request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(),
        }
      );
      assert.strictEqual(httpRequest.body, `"body value"`);
    });

    it("should serialize additional properties when the mapper is refd by className", () => {
      const httpRequest = new WebResource();
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
        new ServiceClient(),
        httpRequest,
        {
          body,
        },
        {
          httpMethod: "POST",
          requestBody: Mappers.body,
          responses: { 200: {} },
          serializer: new Serializer(Mappers),
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `[{"ver":1,"name":"Test","time":"2020-09-24T17:31:35.034Z","data":{"baseData":{"test":"Hello!","extraProp":"FooBar"}}}]`
      );
    });

    it("should serialize a JSON String request body with namespace, ignoring namespace", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(),
        }
      );
      assert.strictEqual(httpRequest.body, `"body value"`);
    });

    it("should serialize a JSON ByteArray request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.ByteArray,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(),
        }
      );
      assert.strictEqual(httpRequest.body, `"SmF2YXNjcmlwdA=="`);
    });

    it("should serialize a JSON ByteArray request body with namespace, ignoring xml properties", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.ByteArray,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(undefined, false /** isXML */),
        }
      );
      assert.strictEqual(httpRequest.body, `"SmF2YXNjcmlwdA=="`);
    });

    it("should serialize a JSON Stream request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.Stream,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(),
        }
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize a JSON Stream request body, ignore namespace", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
              serializedName: "bodyArg",
              type: {
                name: MapperType.Stream,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(),
        }
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize an XML String request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg>body value</bodyArg>`
      );
    });

    it("should serialize an XML String request body with namespace", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(undefined, true /** isXML*/),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com">body value</bodyArg>`
      );
    });

    it("should serialize an XML ByteArray request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.ByteArray,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(undefined, true /** isXml */),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg>SmF2YXNjcmlwdA==</bodyArg>`
      );
    });

    it("should serialize an XML Dictionary request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
          serializer: new Serializer(undefined, true /** isXml */),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><metadata><alpha>hello</alpha><beta>world</beta></metadata>`
      );
    });

    it("should serialize an XML Dictionary request body, with namespace and prefix", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
          serializer: new Serializer(undefined, true /** isXml */),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><metadata xmlns:sample="https://microsoft.com"><alpha xmlns:el="https://microsoft.com/element">hello</alpha><beta xmlns:el="https://microsoft.com/element">world</beta></metadata>`
      );
    });

    it("should serialize a JSON Dictionary request body, ignoring xml metadata", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
          serializer: new Serializer(),
        }
      );
      assert.deepEqual(httpRequest.body, `{"alpha":"hello","beta":"world"}`);
    });

    it("should serialize a Json ByteArray request body, ignoring namespace", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
              xmlNamespace: "https://google.com",
              serializedName: "bodyArg",
              type: {
                name: MapperType.ByteArray,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(undefined, false /** isXML */),
        }
      );
      assert.strictEqual(httpRequest.body, `"SmF2YXNjcmlwdA=="`);
    });

    it("should serialize an XML ByteArray request body with namespace", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
              required: true,
              serializedName: "bodyArg",
              type: {
                name: MapperType.ByteArray,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(undefined, true),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com">SmF2YXNjcmlwdA==</bodyArg>`
      );
    });

    it("should serialize an XML ByteArray request body with namespace and prefix", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.ByteArray,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(undefined, true),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns:sample="https://microsoft.com">SmF2YXNjcmlwdA==</bodyArg>`
      );
    });

    it("should serialize an XML Composite request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
        httpRequest,
        {
          requestBody: {
            updated: new Date("2020-08-12T23:36:18.308Z"),
            content: {
              type: "application/xml",
              queueDescription: { maxDeliveryCount: 15 },
            },
          },
        },
        {
          httpMethod: "POST",
          requestBody: Mappers.requestBody1,
          responses: { 200: {} },
          serializer: new Serializer(undefined, true /** isXML */),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><entry xmlns="http://www.w3.org/2005/Atom"><updated xmlns="http://www.w3.org/2005/Atom">2020-08-12T23:36:18.308Z</updated><content xmlns="http://www.w3.org/2005/Atom" type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect"><MaxDeliveryCount xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">15</MaxDeliveryCount></QueueDescription></content></entry>`
      );
    });

    it("should serialize a JSON Composite request body, ignoring XML metadata", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
        httpRequest,
        {
          requestBody: {
            updated: new Date("2020-08-12T23:36:18.308Z"),
            content: {
              type: "application/xml",
              queueDescription: { maxDeliveryCount: 15 },
            },
          },
        },
        {
          httpMethod: "POST",
          requestBody: Mappers.requestBody1,
          responses: { 200: {} },
          serializer: new Serializer(),
        }
      );

      assert.deepEqual(
        httpRequest.body,
        '{"updated":"2020-08-12T23:36:18.308Z","content":{"type":"application/xml","queueDescription":{"maxDeliveryCount":15}}}'
      );
    });

    it("should serialize an XML Array request body with namespace and prefix", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.Sequence,
                element: {
                  xmlNamespace: "https://microsoft.com/element",
                  type: { name: "String" },
                },
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(undefined, true),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com"><testItem xmlns="https://microsoft.com/element">Foo</testItem><testItem xmlns="https://microsoft.com/element">Bar</testItem></bodyArg>`
      );
    });

    it("should serialize a JSON Array request body, ignoring XML metadata", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.Sequence,
                element: {
                  xmlNamespace: "https://microsoft.com/element",
                  type: { name: "String" },
                },
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(),
        }
      );
      assert.deepEqual(httpRequest.body, JSON.stringify(["Foo", "Bar"]));
    });

    it("should serialize an XML Array of composite elements, namespace and prefix", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.Sequence,
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
          serializer: new Serializer(undefined, true),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com"><testItem xmlns="https://microsoft.com/element"><Foo xmlns="https://microsoft.com/foo">Foo1</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar1</Bar></testItem><testItem xmlns="https://microsoft.com/element"><Foo xmlns="https://microsoft.com/foo">Foo2</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar2</Bar></testItem><testItem xmlns="https://microsoft.com/element"><Foo xmlns="https://microsoft.com/foo">Foo3</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar3</Bar></testItem></bodyArg>`
      );
    });

    it("should serialize an XML Composite request body with namespace and prefix", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.Composite,
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
          serializer: new Serializer(undefined, true),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com"><Foo xmlns="https://microsoft.com/foo">Foo</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar</Bar></bodyArg>`
      );
    });

    it("should serialize an XML Stream request body", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.Stream,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(),
          isXML: true,
        }
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize an XML Stream request body, with namespace", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.Stream,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(),
          isXML: true,
        }
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize an XML request body with custom xml char key", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
        httpRequest,
        {
          requestBody: {
            "#": "pound value",
          },
          options: {
            serializerOptions: {
              xmlCharKey: "#",
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
          serializer: new Serializer(undefined, true /** isXML */),
          isXML: true,
        }
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><entry>pound value</entry>`
      );
    });

    it("should serialize a string send to a text/plain endpoint as just a string", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(),
        }
      );
      assert.strictEqual(httpRequest.body, "body value");
    });

    it("should serialize a string send with the mediaType 'text' as just a string", () => {
      const httpRequest = new WebResource();
      serializeRequestBody(
        new ServiceClient(),
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
                name: MapperType.String,
              },
            },
          },
          responses: { 200: {} },
          serializer: new Serializer(),
        }
      );
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
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return undefined when the parameter path is found in the operation arguments but is undefined and doesn't have a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        myParameter: undefined,
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return null when the parameter path is null in the operation arguments but is undefined and doesn't have a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        // tslint:disable-next-line:no-null-keyword
        myParameter: null,
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
      // tslint:disable-next-line:no-null-keyword
      assert.strictEqual(parameterValue, null);
    });

    it("should return the operation argument value when the parameter path is found in the operation arguments", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        myParameter: 20,
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
      assert.strictEqual(parameterValue, 20);
    });

    it("should return the options operation argument value when the parameter path is found in the optional operation arguments", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        options: {
          myParameter: 1,
        },
      };
      const parameterPath: ParameterPath = ["options", "myParameter"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
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
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
      assert.strictEqual(parameterValue, 21);
    });

    it("should return the operation argument value when the parameter path is found in both the operation arguments and the service client", () => {
      const serviceClient = new ServiceClient();
      (serviceClient as any)["myParameter"] = 21;
      const operationArguments: OperationArguments = {
        myParameter: 22,
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        type: {
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
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
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
      assert.strictEqual(parameterValue, 1);
    });

    it("should return the default value when it is a constant and the parameter path exists in other places", () => {
      const serviceClient = new ServiceClient();
      (serviceClient as any)["myParameter"] = 1;
      const operationArguments: OperationArguments = {
        myParameter: 2,
        options: {
          myParameter: 3,
        },
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        isConstant: true,
        defaultValue: 4,
        type: {
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
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
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
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
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
      assert.strictEqual(parameterValue, 21);
    });

    it("should return the default value when the parameter path is partially found in the operation arguments, the parameter is required, and it has a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        myParameter: {
          differentProperty: "hello",
        },
      };
      const parameterPath: ParameterPath = ["myParameter", "myProperty"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        required: true,
        type: {
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
      assert.strictEqual(parameterValue, 21);
    });

    it("should return undefined when the parameter path is partially found in the operation arguments, the parameter is optional, and it has a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        myParameter: {
          differentProperty: "hello",
        },
      };
      const parameterPath: ParameterPath = ["myParameter", "myProperty"];
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 21,
        type: {
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
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
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
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
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
      assert.strictEqual(parameterValue, undefined);
    });

    it("should return null when the parameter path is null in the operation arguments but is undefined and it has a default value", () => {
      const serviceClient = new ServiceClient();
      const operationArguments: OperationArguments = {
        // tslint:disable-next-line:no-null-keyword
        myParameter: null,
      };
      const parameterPath: ParameterPath = "myParameter";
      const parameterMapper: Mapper = {
        serializedName: "my-parameter",
        defaultValue: 2,
        type: {
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
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
          name: MapperType.Number,
        },
      };
      const parameterValue: any = getOperationArgumentValueFromParameterPath(
        serviceClient,
        operationArguments,
        parameterPath,
        parameterMapper,
        new Serializer()
      );
      // tslint:disable-next-line:no-null-keyword
      assert.strictEqual(parameterValue, 5);
    });
  });

  it("should deserialize error response headers", async function () {
    const BodyMapper: CompositeMapper = {
      serializedName: "getproperties-body",
      type: {
        name: "Composite",
        className: "PropertiesBody",
        modelProperties: {
          message: {
            type: {
              name: "String",
            },
          },
        },
      },
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
              name: "String",
            },
          },
        },
      },
    };

    const serializer = new Serializer(HeadersMapper, true);

    const operationSpec: OperationSpec = {
      httpMethod: "GET",
      responses: {
        default: {
          headersMapper: HeadersMapper,
          bodyMapper: BodyMapper,
        },
      },
      baseUrl: "https://bin.org",
      serializer,
    };

    let request = new WebResource();
    request.operationSpec = operationSpec;

    const httpClient: HttpClient = {
      sendRequest: (req) => {
        request = req;
        return Promise.resolve({
          request,
          status: 500,
          headers: new HttpHeaders({
            "x-ms-error-code": "InvalidResourceNameHeader",
          }),
          bodyAsText: '{"message": "InvalidResourceNameBody"}',
        });
      },
    };

    const client = new ServiceClient(undefined, {
      httpClient,
      requestPolicyFactories: [deserializationPolicy()],
    });

    try {
      await client.sendOperationRequest({}, operationSpec);
      assert.fail();
    } catch (ex: any) {
      assert.strictEqual(ex.details.errorCode, "InvalidResourceNameHeader");
      assert.strictEqual(ex.details.message, "InvalidResourceNameBody");
    }
  });

  it("should re-use the common instance of DefaultHttpClient", function () {
    const client = new ServiceClient();
    assert.strictEqual((client as any)._httpClient, getCachedDefaultHttpClient());
  });
});

function stringToByteArray(str: string): Uint8Array {
  if (typeof Buffer === "function" && isNode) {
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
  let request: WebResource;
  const client = new ServiceClient(undefined, {
    httpClient: {
      sendRequest: (req) => {
        request = req;
        return Promise.resolve({ request, status: 200, headers: new HttpHeaders() });
      },
    },
    requestPolicyFactories: () => [],
  });

  await client.sendOperationRequest(
    {
      q: queryValue,
    },
    {
      httpMethod: "GET",
      baseUrl: "https://bin.org",
      serializer: new Serializer(),
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
                  name: "String",
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
}
