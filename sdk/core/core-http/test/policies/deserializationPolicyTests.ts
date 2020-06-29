// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { HttpHeaders } from "../../src/httpHeaders";
import { HttpOperationResponse } from "../../src/httpOperationResponse";
import { HttpClient, OperationSpec, Serializer, CompositeMapper } from "../../src/coreHttp";
import {
  DeserializationPolicy,
  deserializationPolicy,
  deserializeResponseBody,
  defaultJsonContentTypes,
  defaultXmlContentTypes
} from "../../src/policies/deserializationPolicy";
import { RequestPolicy, RequestPolicyOptions } from "../../src/policies/requestPolicy";
import { WebResource } from "../../src/webResource";

describe("deserializationPolicy", function() {
  const mockPolicy: RequestPolicy = {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      return Promise.resolve({
        request: request,
        status: 200,
        headers: new HttpHeaders()
      });
    }
  };

  it(`should not modify a request that has no request body mapper`, async function() {
    const deserializationPolicy = new DeserializationPolicy(
      mockPolicy,
      {},
      new RequestPolicyOptions()
    );

    const request = createRequest();
    request.body = "hello there!";

    await deserializationPolicy.sendRequest(request);
    assert.strictEqual(request.body, "hello there!");
  });

  it("should parse a JSON response body", async function() {
    const request: WebResource = createRequest();
    const mockClient: HttpClient = {
      sendRequest: (req) =>
        Promise.resolve({
          request: req,
          status: 200,
          headers: new HttpHeaders({ "Content-Type": "application/json" }),
          bodyAsText: "[123, 456, 789]"
        })
    };

    const policy = deserializationPolicy().create(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepEqual(response.parsedBody, [123, 456, 789]);
  });

  it("should parse a JSON response body with a charset specified in Content-Type", async function() {
    const request: WebResource = createRequest();
    const mockClient: HttpClient = {
      sendRequest: (req) =>
        Promise.resolve({
          request: req,
          status: 200,
          headers: new HttpHeaders({ "Content-Type": "application/json;charset=UTF-8" }),
          bodyAsText: "[123, 456, 789]"
        })
    };

    const policy = deserializationPolicy().create(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepEqual(response.parsedBody, [123, 456, 789]);
  });

  it("should parse a JSON response body with an uppercase Content-Type", async function() {
    const request: WebResource = createRequest();
    const mockClient: HttpClient = {
      sendRequest: (req) =>
        Promise.resolve({
          request: req,
          status: 200,
          headers: new HttpHeaders({ "Content-Type": "APPLICATION/JSON" }),
          bodyAsText: "[123, 456, 789]"
        })
    };

    const policy = deserializationPolicy().create(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepEqual(response.parsedBody, [123, 456, 789]);
  });

  it("should parse a JSON response body with a missing Content-Type", async function() {
    const request: WebResource = createRequest();
    const mockClient: HttpClient = {
      sendRequest: (req) =>
        Promise.resolve({
          request: req,
          status: 200,
          headers: new HttpHeaders(),
          bodyAsText: "[123, 456, 789]"
        })
    };

    const policy = deserializationPolicy().create(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepEqual(response.parsedBody, [123, 456, 789]);
  });

  describe(`parse(HttpOperationResponse)`, () => {
    it(`with no response headers or body`, async function() {
      const response: HttpOperationResponse = {
        request: createRequest(),
        status: 200,
        headers: new HttpHeaders()
      };

      const deserializedResponse: HttpOperationResponse = await deserializeResponse(response);

      assert(deserializedResponse);
      assert.strictEqual(deserializedResponse.readableStreamBody, undefined);
      assert.strictEqual(deserializedResponse.blobBody, undefined);
      assert.strictEqual(deserializedResponse.bodyAsText, undefined);
      assert.strictEqual(deserializedResponse.parsedBody, undefined);
      assert.strictEqual(deserializedResponse.parsedHeaders, undefined);
    });

    it(`with xml response body, application/xml content-type, but no operation spec`, async function() {
      const response: HttpOperationResponse = {
        request: createRequest(),
        status: 200,
        headers: new HttpHeaders({
          "content-type": "application/xml"
        }),
        bodyAsText: `<fruit><apples>3</apples></fruit>`
      };

      const deserializedResponse: HttpOperationResponse = await deserializeResponse(response);

      assert(deserializedResponse);
      assert.strictEqual(deserializedResponse.readableStreamBody, undefined);
      assert.strictEqual(deserializedResponse.blobBody, undefined);
      assert.strictEqual(deserializedResponse.bodyAsText, `<fruit><apples>3</apples></fruit>`);
      assert.deepEqual(deserializedResponse.parsedBody, { apples: "3" });
      assert.strictEqual(deserializedResponse.parsedHeaders, undefined);
    });

    it(`with xml response body with child element with attributes and value, application/xml content-type, but no operation spec`, async function() {
      const response: HttpOperationResponse = {
        request: createRequest(),
        status: 200,
        headers: new HttpHeaders({
          "content-type": "application/xml"
        }),
        bodyAsText: `<fruit><apples tasty="yes">3</apples></fruit>`
      };

      const deserializedResponse: HttpOperationResponse = await deserializeResponse(response);

      assert(deserializedResponse);
      assert.strictEqual(deserializedResponse.readableStreamBody, undefined);
      assert.strictEqual(deserializedResponse.blobBody, undefined);
      assert.strictEqual(
        deserializedResponse.bodyAsText,
        `<fruit><apples tasty="yes">3</apples></fruit>`
      );
      assert.deepEqual(deserializedResponse.parsedBody, {
        apples: {
          $: {
            tasty: "yes"
          },
          _: "3"
        }
      });
      assert.strictEqual(deserializedResponse.parsedHeaders, undefined);
    });

    it(`with xml response body, application/xml content-type, and operation spec for only String value`, async function() {
      const response: HttpOperationResponse = {
        request: createRequest({
          httpMethod: "GET",
          serializer: new Serializer({}, true),
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
                        name: "String"
                      }
                    }
                  }
                }
              }
            }
          }
        }),
        status: 200,
        headers: new HttpHeaders({
          "content-type": "application/xml"
        }),
        bodyAsText: `<fruit><apples tasty="yes">3</apples></fruit>`
      };

      const deserializedResponse: HttpOperationResponse = await deserializeResponse(response);

      assert(deserializedResponse);
      assert.strictEqual(deserializedResponse.readableStreamBody, undefined);
      assert.strictEqual(deserializedResponse.blobBody, undefined);
      assert.strictEqual(
        deserializedResponse.bodyAsText,
        `<fruit><apples tasty="yes">3</apples></fruit>`
      );
      assert.deepEqual(deserializedResponse.parsedBody, { apples: "3" });
      assert.strictEqual(deserializedResponse.parsedHeaders, undefined);
    });

    it(`with xml response body, application/xml content-type, and operation spec for only number value`, async function() {
      const response: HttpOperationResponse = {
        request: createRequest({
          httpMethod: "GET",
          serializer: new Serializer({}, true),
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
                        name: "Number"
                      }
                    }
                  }
                }
              }
            }
          }
        }),
        status: 200,
        headers: new HttpHeaders({
          "content-type": "application/xml"
        }),
        bodyAsText: `<fruit><apples tasty="yes">3</apples></fruit>`
      };

      const deserializedResponse: HttpOperationResponse = await deserializeResponse(response);

      assert(deserializedResponse);
      assert.strictEqual(deserializedResponse.readableStreamBody, undefined);
      assert.strictEqual(deserializedResponse.blobBody, undefined);
      assert.strictEqual(
        deserializedResponse.bodyAsText,
        `<fruit><apples tasty="yes">3</apples></fruit>`
      );
      assert.deepEqual(deserializedResponse.parsedBody, { apples: 3 });
      assert.strictEqual(deserializedResponse.parsedHeaders, undefined);
    });

    it(`with xml response body, application/xml content-type, and operation spec for only headers`, async function() {
      const response: HttpOperationResponse = {
        request: createRequest({
          httpMethod: "GET",
          serializer: new Serializer({}, true),
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
                              name: "String"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }),
        status: 200,
        headers: new HttpHeaders({
          "content-type": "application/xml"
        }),
        bodyAsText: `<fruit><apples tasty="yes">3</apples></fruit>`
      };

      const deserializedResponse: HttpOperationResponse = await deserializeResponse(response);

      assert(deserializedResponse);
      assert.strictEqual(deserializedResponse.readableStreamBody, undefined);
      assert.strictEqual(deserializedResponse.blobBody, undefined);
      assert.strictEqual(
        deserializedResponse.bodyAsText,
        `<fruit><apples tasty="yes">3</apples></fruit>`
      );
      assert.deepEqual(deserializedResponse.parsedBody, { apples: { tasty: "yes" } });
      assert.strictEqual(deserializedResponse.parsedHeaders, undefined);
    });

    it(`with xml response body, application/atom+xml content-type, but no operation spec`, async function() {
      const response: HttpOperationResponse = {
        request: createRequest(),
        status: 200,
        headers: new HttpHeaders({
          "content-type": "application/atom+xml"
        }),
        bodyAsText: `<fruit><apples>3</apples></fruit>`
      };

      const deserializedResponse: HttpOperationResponse = await deserializeResponse(response);

      assert(deserializedResponse);
      assert.strictEqual(deserializedResponse.readableStreamBody, undefined);
      assert.strictEqual(deserializedResponse.blobBody, undefined);
      assert.strictEqual(deserializedResponse.bodyAsText, `<fruit><apples>3</apples></fruit>`);
      assert.deepEqual(deserializedResponse.parsedBody, { apples: "3" });
      assert.strictEqual(deserializedResponse.parsedHeaders, undefined);
    });

    it(`with xml property with attribute and value, application/atom+xml content-type, but no operation spec`, async function() {
      const response: HttpOperationResponse = {
        request: createRequest(),
        status: 200,
        headers: new HttpHeaders({
          "content-type": "application/atom+xml"
        }),
        bodyAsText: `<fruit><apples taste="good">3</apples></fruit>`
      };

      const deserializedResponse: HttpOperationResponse = await deserializeResponse(response);

      assert(deserializedResponse);
      assert.strictEqual(deserializedResponse.readableStreamBody, undefined);
      assert.strictEqual(deserializedResponse.blobBody, undefined);
      assert.strictEqual(
        deserializedResponse.bodyAsText,
        `<fruit><apples taste="good">3</apples></fruit>`
      );
      assert.deepEqual(deserializedResponse.parsedBody, {
        apples: {
          $: {
            taste: "good"
          },
          _: "3"
        }
      });
      assert.strictEqual(deserializedResponse.parsedHeaders, undefined);
    });

    it(`with xml property with attribute and value, my/weird-xml content-type, but no operation spec`, async function() {
      const response: HttpOperationResponse = {
        request: createRequest(),
        status: 200,
        headers: new HttpHeaders({
          "content-type": "my/weird-xml"
        }),
        bodyAsText: `<fruit><apples taste="good">3</apples></fruit>`
      };

      const deserializedResponse: HttpOperationResponse = await deserializeResponseBody(
        [],
        ["my/weird-xml"],
        response
      );

      assert(deserializedResponse);
      assert.strictEqual(deserializedResponse.readableStreamBody, undefined);
      assert.strictEqual(deserializedResponse.blobBody, undefined);
      assert.strictEqual(
        deserializedResponse.bodyAsText,
        `<fruit><apples taste="good">3</apples></fruit>`
      );
      assert.deepEqual(deserializedResponse.parsedBody, {
        apples: {
          $: {
            taste: "good"
          },
          _: "3"
        }
      });
      assert.strictEqual(deserializedResponse.parsedHeaders, undefined);
    });

    it(`with service bus response body, application/atom+xml content-type, and no operationSpec`, async function() {
      const response: HttpOperationResponse = {
        request: createRequest(),
        status: 200,
        headers: new HttpHeaders({
          "content-type": "application/atom+xml;type=entry;charset=utf-8"
        }),
        bodyAsText: `<entry xmlns="http://www.w3.org/2005/Atom"><id>https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&amp;enrich=False</id><title type="text">testQueuePath</title><published>2018-10-09T19:56:34Z</published><updated>2018-10-09T19:56:35Z</updated><author><name>daschulttest1</name></author><link rel="self" href="https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&amp;enrich=False"/><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT1M</LockDuration><MaxSizeInMegabytes>1024</MaxSizeInMegabytes><RequiresDuplicateDetection>false</RequiresDuplicateDetection><RequiresSession>false</RequiresSession><DefaultMessageTimeToLive>P14D</DefaultMessageTimeToLive><DeadLetteringOnMessageExpiration>false</DeadLetteringOnMessageExpiration><DuplicateDetectionHistoryTimeWindow>PT10M</DuplicateDetectionHistoryTimeWindow><MaxDeliveryCount>10</MaxDeliveryCount><EnableBatchedOperations>true</EnableBatchedOperations><SizeInBytes>0</SizeInBytes><MessageCount>0</MessageCount><IsAnonymousAccessible>false</IsAnonymousAccessible><AuthorizationRules></AuthorizationRules><Status>Active</Status><CreatedAt>2018-10-09T19:56:34.903Z</CreatedAt><UpdatedAt>2018-10-09T19:56:35.013Z</UpdatedAt><AccessedAt>0001-01-01T00:00:00Z</AccessedAt><SupportOrdering>true</SupportOrdering><CountDetails xmlns:d2p1="http://schemas.microsoft.com/netservices/2011/06/servicebus"><d2p1:ActiveMessageCount>0</d2p1:ActiveMessageCount><d2p1:DeadLetterMessageCount>0</d2p1:DeadLetterMessageCount><d2p1:ScheduledMessageCount>0</d2p1:ScheduledMessageCount><d2p1:TransferMessageCount>0</d2p1:TransferMessageCount><d2p1:TransferDeadLetterMessageCount>0</d2p1:TransferDeadLetterMessageCount></CountDetails><AutoDeleteOnIdle>P10675199DT2H48M5.4775807S</AutoDeleteOnIdle><EnablePartitioning>false</EnablePartitioning><EntityAvailabilityStatus>Available</EntityAvailabilityStatus><EnableExpress>false</EnableExpress></QueueDescription></content></entry>`
      };

      const deserializedResponse: HttpOperationResponse = await deserializeResponse(response);

      assert(deserializedResponse);
      assert.strictEqual(deserializedResponse.readableStreamBody, undefined);
      assert.strictEqual(deserializedResponse.blobBody, undefined);
      assert.strictEqual(
        deserializedResponse.bodyAsText,
        `<entry xmlns="http://www.w3.org/2005/Atom"><id>https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&amp;enrich=False</id><title type="text">testQueuePath</title><published>2018-10-09T19:56:34Z</published><updated>2018-10-09T19:56:35Z</updated><author><name>daschulttest1</name></author><link rel="self" href="https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&amp;enrich=False"/><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT1M</LockDuration><MaxSizeInMegabytes>1024</MaxSizeInMegabytes><RequiresDuplicateDetection>false</RequiresDuplicateDetection><RequiresSession>false</RequiresSession><DefaultMessageTimeToLive>P14D</DefaultMessageTimeToLive><DeadLetteringOnMessageExpiration>false</DeadLetteringOnMessageExpiration><DuplicateDetectionHistoryTimeWindow>PT10M</DuplicateDetectionHistoryTimeWindow><MaxDeliveryCount>10</MaxDeliveryCount><EnableBatchedOperations>true</EnableBatchedOperations><SizeInBytes>0</SizeInBytes><MessageCount>0</MessageCount><IsAnonymousAccessible>false</IsAnonymousAccessible><AuthorizationRules></AuthorizationRules><Status>Active</Status><CreatedAt>2018-10-09T19:56:34.903Z</CreatedAt><UpdatedAt>2018-10-09T19:56:35.013Z</UpdatedAt><AccessedAt>0001-01-01T00:00:00Z</AccessedAt><SupportOrdering>true</SupportOrdering><CountDetails xmlns:d2p1="http://schemas.microsoft.com/netservices/2011/06/servicebus"><d2p1:ActiveMessageCount>0</d2p1:ActiveMessageCount><d2p1:DeadLetterMessageCount>0</d2p1:DeadLetterMessageCount><d2p1:ScheduledMessageCount>0</d2p1:ScheduledMessageCount><d2p1:TransferMessageCount>0</d2p1:TransferMessageCount><d2p1:TransferDeadLetterMessageCount>0</d2p1:TransferDeadLetterMessageCount></CountDetails><AutoDeleteOnIdle>P10675199DT2H48M5.4775807S</AutoDeleteOnIdle><EnablePartitioning>false</EnablePartitioning><EntityAvailabilityStatus>Available</EntityAvailabilityStatus><EnableExpress>false</EnableExpress></QueueDescription></content></entry>`
      );
      assert.deepEqual(deserializedResponse.parsedBody, {
        $: {
          xmlns: "http://www.w3.org/2005/Atom"
        },
        author: {
          name: "daschulttest1"
        },
        content: {
          $: {
            type: "application/xml"
          },
          QueueDescription: {
            $: {
              xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
              "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance"
            },
            AccessedAt: "0001-01-01T00:00:00Z",
            AuthorizationRules: "",
            AutoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
            CountDetails: {
              $: {
                "xmlns:d2p1": "http://schemas.microsoft.com/netservices/2011/06/servicebus"
              },
              "d2p1:ActiveMessageCount": "0",
              "d2p1:DeadLetterMessageCount": "0",
              "d2p1:ScheduledMessageCount": "0",
              "d2p1:TransferDeadLetterMessageCount": "0",
              "d2p1:TransferMessageCount": "0"
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
            UpdatedAt: "2018-10-09T19:56:35.013Z"
          }
        },
        id:
          "https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&enrich=False",
        link: {
          $: {
            href:
              "https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&enrich=False",
            rel: "self"
          }
        },
        published: "2018-10-09T19:56:34Z",
        title: {
          $: {
            type: "text"
          },
          _: "testQueuePath"
        },
        updated: "2018-10-09T19:56:35Z"
      });
      assert.strictEqual(deserializedResponse.parsedHeaders, undefined);
    });

    it(`with default response headers`, async function() {
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

      const serializer = new Serializer(HeadersMapper, true);

      const operationSpec: OperationSpec = {
        httpMethod: "GET",
        responses: {
          default: {
            headersMapper: HeadersMapper,
            bodyMapper: BodyMapper
          }
        },
        serializer
      };

      const response: HttpOperationResponse = {
        request: createRequest(operationSpec),
        status: 500,
        headers: new HttpHeaders({
          "x-ms-error-code": "InvalidResourceNameHeader"
        }),
        bodyAsText: '{"message": "InvalidResourceNameBody"}'
      };

      try {
        await deserializeResponse(response);
        assert.fail();
      } catch (e) {
        assert(e);
        assert.strictEqual(e.response.parsedHeaders.errorCode, "InvalidResourceNameHeader");
        assert.strictEqual(e.response.parsedBody.message, "InvalidResourceNameBody");
      }
    });
  });
});

function deserializeResponse(response: HttpOperationResponse): Promise<HttpOperationResponse> {
  return deserializeResponseBody(defaultJsonContentTypes, defaultXmlContentTypes, response);
}

function createRequest(operationSpec?: OperationSpec): WebResource {
  const request = new WebResource();
  request.operationSpec = operationSpec;
  return request;
}
