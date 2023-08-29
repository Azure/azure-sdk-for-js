// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as sinon from "sinon";
import {
  CompositeMapper,
  FullOperationResponse,
  OperationRequest,
  OperationSpec,
  SerializerOptions,
  createSerializer,
  deserializationPolicy,
} from "../src/index.js";
import {
  PipelineResponse,
  RawHttpHeaders,
  SendRequest,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import { assert } from "chai";
import { getOperationRequestInfo } from "../src/operationHelpers.js";
import { parseXML } from "@azure/core-xml";

describe("deserializationPolicy", function () {
  it(`should not modify a request that has no request body mapper`, async function () {
    const response = await getDeserializedResponse({ requestBody: "hello there!" });
    assert.strictEqual(response.request.body, "hello there!");
  });

  it("should parse a JSON response body", async function () {
    const response = await getDeserializedResponse({
      headers: { "Content-Type": "application/json" },
      bodyAsText: "[123, 456, 789]",
    });
    assert.deepEqual(response.parsedBody, [123, 456, 789]);
  });

  it("should parse a JSON response body with a charset specified in Content-Type", async function () {
    const response = await getDeserializedResponse({
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      bodyAsText: "[123, 456, 789]",
    });
    assert.deepEqual(response.parsedBody, [123, 456, 789]);
  });

  it("should parse a JSON response body with an uppercase Content-Type", async function () {
    const response = await getDeserializedResponse({
      headers: { "Content-Type": "APPLICATION/JSON" },
      bodyAsText: "[123, 456, 789]",
    });
    assert.deepEqual(response.parsedBody, [123, 456, 789]);
  });

  it("should parse a JSON response body with a missing Content-Type", async function () {
    const response = await getDeserializedResponse({
      bodyAsText: "[123, 456, 789]",
    });
    assert.deepEqual(response.parsedBody, [123, 456, 789]);
  });

  describe(`parse(HttpOperationResponse)`, () => {
    it(`with no response headers or body`, async function () {
      const response = await getDeserializedResponse();

      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.isUndefined(response.bodyAsText);
      assert.isUndefined(response.parsedBody);
      assert.isUndefined(response.parsedHeaders);
    });

    it(`with xml response body, application/xml content-type, but no operation spec`, async function () {
      const response = await getDeserializedResponse({
        headers: { "content-type": "application/xml" },
        bodyAsText: `<fruit><apples>3</apples></fruit>`,
      });
      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.isUndefined(response.parsedHeaders);
      assert.strictEqual(response.bodyAsText, `<fruit><apples>3</apples></fruit>`);
      assert.deepEqual(response.parsedBody, { apples: "3" });
    });

    it(`with xml response body with child element with attributes and value, application/xml content-type, but no operation spec`, async function () {
      const response = await getDeserializedResponse({
        headers: { "content-type": "application/xml" },
        bodyAsText: `<fruit><apples tasty="yes">3</apples></fruit>`,
      });

      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.strictEqual(response.bodyAsText, `<fruit><apples tasty="yes">3</apples></fruit>`);
      assert.deepEqual(response.parsedBody, {
        apples: {
          $: {
            tasty: "yes",
          },
          _: "3",
        },
      });
      assert.isUndefined(response.parsedHeaders);
    });

    it(`with xml response body, application/xml content-type, and operation spec for only String value`, async function () {
      const operationSpec: OperationSpec = {
        httpMethod: "GET",
        serializer: createSerializer({}, true),
        responses: {
          200: {
            bodyMapper: {
              xmlName: "fruit",
              serializedName: "fruit",
              type: {
                name: "Composite",
                className: "Fruit",
                modelProperties: {
                  apples: {
                    xmlName: "apples",
                    serializedName: "apples",
                    type: {
                      name: "String",
                    },
                  },
                },
              },
            },
          },
        },
      };

      const response = await getDeserializedResponse({
        operationSpec,
        headers: { "content-type": "application/xml" },
        bodyAsText: `<fruit><apples tasty="yes">3</apples></fruit>`,
      });

      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.strictEqual(response.bodyAsText, `<fruit><apples tasty="yes">3</apples></fruit>`);
      assert.deepEqual(response.parsedBody, { apples: "3" });
      assert.isUndefined(response.parsedHeaders);
    });

    it(`with xml response body, application/xml content-type, and operation spec for only number value`, async function () {
      const operationSpec: OperationSpec = {
        httpMethod: "GET",
        serializer: createSerializer({}, true),
        responses: {
          200: {
            bodyMapper: {
              xmlName: "fruit",
              serializedName: "fruit",
              type: {
                name: "Composite",
                className: "Fruit",
                modelProperties: {
                  apples: {
                    xmlName: "apples",
                    serializedName: "apples",
                    type: {
                      name: "Number",
                    },
                  },
                },
              },
            },
          },
        },
      };
      const response = await getDeserializedResponse({
        operationSpec,
        headers: { "content-type": "application/xml" },
        bodyAsText: `<fruit><apples tasty="yes">3</apples></fruit>`,
      });

      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.strictEqual(response.bodyAsText, `<fruit><apples tasty="yes">3</apples></fruit>`);
      assert.deepEqual(response.parsedBody, { apples: 3 });
      assert.isUndefined(response.parsedHeaders);
    });

    it(`with xml response body, application/xml content-type, and operation spec for only headers`, async function () {
      const operationSpec: OperationSpec = {
        httpMethod: "GET",
        serializer: createSerializer({}, true),
        responses: {
          200: {
            bodyMapper: {
              xmlName: "fruit",
              serializedName: "fruit",
              type: {
                name: "Composite",
                className: "Fruit",
                modelProperties: {
                  apples: {
                    xmlName: "apples",
                    serializedName: "apples",
                    type: {
                      name: "Composite",
                      className: "Apples",
                      modelProperties: {
                        tasty: {
                          xmlName: "tasty",
                          xmlIsAttribute: true,
                          serializedName: "tasty",
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
          },
        },
      };
      const response = await getDeserializedResponse({
        operationSpec,
        headers: { "content-type": "application/xml" },
        bodyAsText: `<fruit><apples tasty="yes">3</apples></fruit>`,
      });

      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.strictEqual(response.bodyAsText, `<fruit><apples tasty="yes">3</apples></fruit>`);
      assert.isUndefined(response.parsedHeaders);
      assert.deepEqual(response.parsedBody, { apples: { tasty: "yes" } });
    });

    it(`with xml response body, application/atom+xml content-type, but no operation spec`, async function () {
      const response = await getDeserializedResponse({
        headers: { "content-type": "application/xml" },
        bodyAsText: `<fruit><apples>3</apples></fruit>`,
      });

      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.strictEqual(response.bodyAsText, `<fruit><apples>3</apples></fruit>`);
      assert.isUndefined(response.parsedHeaders);
      assert.deepEqual(response.parsedBody, { apples: "3" });
    });

    it(`with xml property with attribute and value, application/atom+xml content-type, but no operation spec`, async function () {
      const response = await getDeserializedResponse({
        headers: { "content-type": "application/atom+xml" },
        bodyAsText: `<fruit><apples taste="good">3</apples></fruit>`,
      });

      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.strictEqual(response.bodyAsText, `<fruit><apples taste="good">3</apples></fruit>`);
      assert.isUndefined(response.parsedHeaders);
      assert.deepEqual(response.parsedBody, {
        apples: {
          $: {
            taste: "good",
          },
          _: "3",
        },
      });
    });

    it(`with xml property with attribute and value, my/weird-xml content-type, but no operation spec`, async function () {
      const response = await getDeserializedResponse({
        headers: { "content-type": "my/weird-xml" },
        bodyAsText: `<fruit><apples taste="good">3</apples></fruit>`,
        xmlContentTypes: ["my/weird-xml"],
      });

      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.strictEqual(response.bodyAsText, `<fruit><apples taste="good">3</apples></fruit>`);
      assert.isUndefined(response.parsedHeaders);
      assert.deepEqual(response.parsedBody, {
        apples: {
          $: {
            taste: "good",
          },
          _: "3",
        },
      });
    });

    it(`with service bus response body, application/atom+xml content-type, and no operationSpec`, async function () {
      const response = await getDeserializedResponse({
        headers: { "content-type": "application/atom+xml;type=entry;charset=utf-8" },
        bodyAsText: `<entry xmlns="http://www.w3.org/2005/Atom"><id>https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&amp;enrich=False</id><title type="text">testQueuePath</title><published>2018-10-09T19:56:34Z</published><updated>2018-10-09T19:56:35Z</updated><author><name>daschulttest1</name></author><link rel="self" href="https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&amp;enrich=False"/><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT1M</LockDuration><MaxSizeInMegabytes>1024</MaxSizeInMegabytes><RequiresDuplicateDetection>false</RequiresDuplicateDetection><RequiresSession>false</RequiresSession><DefaultMessageTimeToLive>P14D</DefaultMessageTimeToLive><DeadLetteringOnMessageExpiration>false</DeadLetteringOnMessageExpiration><DuplicateDetectionHistoryTimeWindow>PT10M</DuplicateDetectionHistoryTimeWindow><MaxDeliveryCount>10</MaxDeliveryCount><EnableBatchedOperations>true</EnableBatchedOperations><SizeInBytes>0</SizeInBytes><MessageCount>0</MessageCount><IsAnonymousAccessible>false</IsAnonymousAccessible><AuthorizationRules></AuthorizationRules><Status>Active</Status><CreatedAt>2018-10-09T19:56:34.903Z</CreatedAt><UpdatedAt>2018-10-09T19:56:35.013Z</UpdatedAt><AccessedAt>0001-01-01T00:00:00Z</AccessedAt><SupportOrdering>true</SupportOrdering><CountDetails xmlns:d2p1="http://schemas.microsoft.com/netservices/2011/06/servicebus"><d2p1:ActiveMessageCount>0</d2p1:ActiveMessageCount><d2p1:DeadLetterMessageCount>0</d2p1:DeadLetterMessageCount><d2p1:ScheduledMessageCount>0</d2p1:ScheduledMessageCount><d2p1:TransferMessageCount>0</d2p1:TransferMessageCount><d2p1:TransferDeadLetterMessageCount>0</d2p1:TransferDeadLetterMessageCount></CountDetails><AutoDeleteOnIdle>P10675199DT2H48M5.4775807S</AutoDeleteOnIdle><EnablePartitioning>false</EnablePartitioning><EntityAvailabilityStatus>Available</EntityAvailabilityStatus><EnableExpress>false</EnableExpress></QueueDescription></content></entry>`,
      });

      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.isUndefined(response.parsedHeaders);
      assert.deepEqual(response.parsedBody, {
        $: {
          xmlns: "http://www.w3.org/2005/Atom",
        },
        author: {
          name: "daschulttest1",
        },
        content: {
          $: {
            type: "application/xml",
          },
          QueueDescription: {
            $: {
              xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
              "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance",
            },
            AccessedAt: "0001-01-01T00:00:00Z",
            AuthorizationRules: "",
            AutoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
            CountDetails: {
              $: {
                "xmlns:d2p1": "http://schemas.microsoft.com/netservices/2011/06/servicebus",
              },
              "d2p1:ActiveMessageCount": "0",
              "d2p1:DeadLetterMessageCount": "0",
              "d2p1:ScheduledMessageCount": "0",
              "d2p1:TransferDeadLetterMessageCount": "0",
              "d2p1:TransferMessageCount": "0",
            },
            CreatedAt: "2018-10-09T19:56:34.903Z",
            DeadLetteringOnMessageExpiration: "false",
            DefaultMessageTimeToLive: "P14D",
            DuplicateDetectionHistoryTimeWindow: "PT10M",
            EnableBatchedOperations: "true",
            EnableExpress: "false",
            EnablePartitioning: "false",
            EntityAvailabilityStatus: "Available",
            IsAnonymousAccessible: "false",
            LockDuration: "PT1M",
            MaxDeliveryCount: "10",
            MaxSizeInMegabytes: "1024",
            MessageCount: "0",
            RequiresDuplicateDetection: "false",
            RequiresSession: "false",
            SizeInBytes: "0",
            Status: "Active",
            SupportOrdering: "true",
            UpdatedAt: "2018-10-09T19:56:35.013Z",
          },
        },
        id: "https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&enrich=False",
        link: {
          $: {
            href: "https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&enrich=False",
            rel: "self",
          },
        },
        published: "2018-10-09T19:56:34Z",
        title: {
          $: {
            type: "text",
          },
          _: "testQueuePath",
        },
        updated: "2018-10-09T19:56:35Z",
      });
    });

    it(`should deserialize underscore xml element with custom xml char key`, async function () {
      const response = await getDeserializedResponse({
        headers: { "content-type": "application/xml" },
        bodyAsText: `<Metadata><h>v</h><_>underscore</_></Metadata>`,
        serializerOptions: { xml: { xmlCharKey: "#" } },
      });
      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.isUndefined(response.parsedHeaders);
      assert.strictEqual(response.bodyAsText, `<Metadata><h>v</h><_>underscore</_></Metadata>`);
      assert.deepEqual(response.parsedBody, {
        h: "v",
        _: "underscore",
      });
    });

    it(`with custom xml char key`, async function () {
      const response = await getDeserializedResponse({
        headers: { "content-type": "application/xml" },
        bodyAsText: `<fruit><apples taste="good">3</apples></fruit>`,
        serializerOptions: { xml: { xmlCharKey: "#" } },
      });

      assert.exists(response);
      assert.isUndefined(response.readableStreamBody);
      assert.isUndefined(response.blobBody);
      assert.strictEqual(response.bodyAsText, `<fruit><apples taste="good">3</apples></fruit>`);
      assert.isUndefined(response.parsedHeaders);
      assert.deepEqual(response.parsedBody, {
        apples: {
          $: {
            taste: "good",
          },
          "#": "3",
        },
      });
    });

    it(`with default response headers`, async function () {
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

      const serializer = createSerializer(HeadersMapper, true);

      const operationSpec: OperationSpec = {
        httpMethod: "GET",
        responses: {
          default: {
            headersMapper: HeadersMapper,
            bodyMapper: BodyMapper,
          },
        },
        serializer,
      };

      try {
        await getDeserializedResponse({
          operationSpec,
          headers: { "x-ms-error-code": "InvalidResourceNameHeader" },
          bodyAsText: '{"message": "InvalidResourceNameBody"}',
          status: 500,
        });
        assert.fail();
      } catch (e: any) {
        assert.exists(e);
        assert.strictEqual(e.response.parsedHeaders.errorCode, "InvalidResourceNameHeader");
        assert.strictEqual(e.response.parsedBody.message, "InvalidResourceNameBody");
      }
    });

    it(`with non default error response headers`, async function () {
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

      const serializer = createSerializer(HeadersMapper, true);

      const operationSpec: OperationSpec = {
        httpMethod: "GET",
        responses: {
          500: {
            headersMapper: HeadersMapper,
            bodyMapper: BodyMapper,
            isError: true,
          },
        },
        serializer,
      };

      try {
        await getDeserializedResponse({
          operationSpec,
          headers: { "x-ms-error-code": "InvalidResourceNameHeader" },
          bodyAsText: '{"message": "InvalidResourceNameBody"}',
          status: 500,
        });
        assert.fail();
      } catch (e: any) {
        assert.exists(e);
        assert.strictEqual(e.response.parsedHeaders.errorCode, "InvalidResourceNameHeader");
        assert.strictEqual(e.response.parsedBody.message, "InvalidResourceNameBody");
      }
    });

    it(`should throw when the response code is not defined in the operationSpec`, async function () {
      const serializer = createSerializer(undefined, true);

      const operationSpec: OperationSpec = {
        httpMethod: "GET",
        responses: {
          200: {},
        },
        serializer,
      };
      try {
        await getDeserializedResponse({
          operationSpec,
          headers: {},
          bodyAsText: '{"message": "InternalServerError"}',
          status: 400,
        });
        assert.fail();
      } catch (e: any) {
        assert(e);
        assert.strictEqual(e.statusCode, 400);
        assert.include(e.message, "InternalServerError");
      }
    });

    it(`with non default complex error response`, async function () {
      const BodyMapper: CompositeMapper = {
        serializedName: "getproperties-body",
        type: {
          name: "Composite",
          className: "PropertiesBody",
          modelProperties: {
            message1: {
              type: {
                name: "String",
              },
            },
            message2: {
              type: {
                name: "String",
              },
            },
            message3: {
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

      const serializer = createSerializer(HeadersMapper, true);

      const operationSpec: OperationSpec = {
        httpMethod: "GET",
        responses: {
          503: {
            headersMapper: HeadersMapper,
            bodyMapper: BodyMapper,
            isError: true,
          },
        },
        serializer,
      };

      try {
        await getDeserializedResponse({
          operationSpec,
          headers: { "x-ms-error-code": "InvalidResourceNameHeader" },
          bodyAsText:
            '{"message1": "InvalidResourceNameBody1", "message2": "InvalidResourceNameBody2", "message3": "InvalidResourceNameBody3"}',
          status: 503,
        });
        assert.fail();
      } catch (e: any) {
        assert.exists(e);
        assert.strictEqual(e.response.parsedHeaders.errorCode, "InvalidResourceNameHeader");
        assert.strictEqual(e.response.parsedBody.message1, "InvalidResourceNameBody1");
        assert.strictEqual(e.response.parsedBody.message2, "InvalidResourceNameBody2");
        assert.strictEqual(e.response.parsedBody.message3, "InvalidResourceNameBody3");
      }
    });

    it(`with default error response body`, async function () {
      const BodyMapper: CompositeMapper = {
        serializedName: "StorageError",
        type: {
          name: "Composite",
          className: "StorageError",
          modelProperties: {
            code: {
              xmlName: "Code",
              serializedName: "Code",
              type: {
                name: "String",
              },
            },
            message: {
              xmlName: "Message",
              serializedName: "Message",
              type: {
                name: "String",
              },
            },
          },
        },
      };

      const serializer = createSerializer(undefined, true);

      const operationSpec: OperationSpec = {
        httpMethod: "GET",
        responses: {
          default: {
            bodyMapper: BodyMapper,
          },
        },
        serializer,
      };

      try {
        await getDeserializedResponse({
          operationSpec,
          headers: {},
          bodyAsText:
            '{"Code": "ContainerAlreadyExists", "Message": "The specified container already exists."}',
          status: 500,
        });
        assert.fail();
      } catch (e: any) {
        assert.exists(e);
        assert.strictEqual(e.code, "ContainerAlreadyExists");
        assert.strictEqual(e.message, "The specified container already exists.");
        assert.strictEqual(e.response.parsedBody.code, "ContainerAlreadyExists");
        assert.strictEqual(
          e.response.parsedBody.message,
          "The specified container already exists."
        );
      }
    });

    it(`json response with headers`, async function () {
      const BodyMapper: CompositeMapper = {
        serializedName: "getproperties-body",
        type: {
          name: "Composite",
          className: "PropertiesBody",
          modelProperties: {
            message: {
              serializedName: "message",
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
            foo: {
              serializedName: "x-ms-foo",
              type: {
                name: "String",
              },
            },
          },
        },
      };

      const serializer = createSerializer({ HeadersMapper, BodyMapper }, false);

      const operationSpec: OperationSpec = {
        httpMethod: "GET",
        responses: {
          200: {
            headersMapper: HeadersMapper,
            bodyMapper: BodyMapper,
          },
        },
        serializer,
      };

      const result = await getDeserializedResponse({
        operationSpec,
        headers: { "x-ms-foo": "SomeHeaderValue", "x-ms-bar": "SomeOtherHeaderValue" },
        bodyAsText: '{"message": "Some kind of message", "extraProp": "An extra property value"}',
        status: 200,
      });
      assert.exists(result);
      assert.strictEqual(result.parsedHeaders?.foo, "SomeHeaderValue");
      assert.strictEqual(result.parsedBody.message, "Some kind of message");
      assert.notExists(result.parsedHeaders?.["x-ms-bar"]);
      assert.strictEqual(result.parsedBody.extraProp, "An extra property value");
    });

    it(`json response body with null value`, async function () {
      const BodyMapper: CompositeMapper = {
        serializedName: "getproperties-body",
        type: {
          name: "Composite",
          className: "PropertiesBody",
          modelProperties: {
            message: {
              serializedName: "message",
              type: {
                name: "String",
              },
            },
            status: {
              serializedName: "properties.status",
              type: {
                name: "String",
              },
            },
          },
        },
      };

      const serializer = createSerializer({ BodyMapper }, false);

      const operationSpec: OperationSpec = {
        httpMethod: "GET",
        responses: {
          200: {
            bodyMapper: BodyMapper,
          },
        },
        serializer,
      };

      const result = await getDeserializedResponse({
        operationSpec,
        bodyAsText: '{"message": null, "extraProp": "An extra property value", "properties": null}',
        status: 200,
      });
      assert.exists(result);
      assert.isNull(result.parsedBody.message);
      assert.isUndefined(result.parsedBody.status);
      assert.strictEqual(result.parsedBody.extraProp, "An extra property value");
    });
  });
});

async function getDeserializedResponse(
  options: {
    operationSpec?: OperationSpec;
    requestBody?: any;
    headers?: RawHttpHeaders;
    status?: number;
    bodyAsText?: string;
    xmlContentTypes?: string[];
    serializerOptions?: SerializerOptions;
  } = {}
): Promise<FullOperationResponse> {
  const policy = deserializationPolicy({
    expectedContentTypes: { xml: options.xmlContentTypes },
    parseXML,
    serializerOptions: options.serializerOptions,
  });
  const request: OperationRequest = createPipelineRequest({ url: "https://example.com" });
  const operationInfo = getOperationRequestInfo(request);
  operationInfo.operationSpec = options.operationSpec;
  request.body = options.requestBody;

  const res: PipelineResponse = {
    headers: createHttpHeaders(options.headers),
    request,
    bodyAsText: options.bodyAsText,
    status: options.status ?? 200,
  };
  const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
  next.resolves(res);

  const response = await policy.sendRequest(request, next);
  return response;
}
