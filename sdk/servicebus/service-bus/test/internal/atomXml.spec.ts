// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import {
  AtomXmlSerializer,
  deserializeAtomXmlResponse,
  executeAtomXmlOperation
} from "../../src/util/atomXmlHelper";
import * as Constants from "../../src/util/constants";
import { ServiceBusManagementClient } from "../../src/serviceBusAtomManagementClient";
import { QueueResourceSerializer } from "../../src/serializers/queueResourceSerializer";
import { HttpHeaders, HttpOperationResponse, WebResource } from "@azure/core-http";
import { TopicResourceSerializer } from "../../src/serializers/topicResourceSerializer";
import { SubscriptionResourceSerializer } from "../../src/serializers/subscriptionResourceSerializer";
import { RuleResourceSerializer } from "../../src/serializers/ruleResourceSerializer";

const queueProperties = [
  Constants.LOCK_DURATION,
  Constants.MAX_SIZE_IN_MEGABYTES,
  Constants.REQUIRES_DUPLICATE_DETECTION,
  Constants.REQUIRES_SESSION,
  Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
  Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION,
  Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW,
  Constants.MAX_DELIVERY_COUNT,
  Constants.ENABLE_BATCHED_OPERATIONS,
  Constants.AUTHORIZATION_RULES,
  Constants.STATUS,
  Constants.FORWARD_TO,
  Constants.USER_METADATA,
  Constants.AUTO_DELETE_ON_IDLE,
  Constants.ENABLE_PARTITIONING,
  Constants.FORWARD_DEADLETTERED_MESSAGES_TO
];

const topicProperties = [
  Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
  Constants.MAX_SIZE_IN_MEGABYTES,
  Constants.REQUIRES_DUPLICATE_DETECTION,
  Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW,
  Constants.ENABLE_BATCHED_OPERATIONS,
  Constants.AUTHORIZATION_RULES,
  Constants.STATUS,
  Constants.SUPPORT_ORDERING,
  Constants.ENABLE_PARTITIONING
];

const subscriptionProperties = [
  Constants.LOCK_DURATION,
  Constants.REQUIRES_SESSION,
  Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
  Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION,
  Constants.DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS,
  Constants.MAX_DELIVERY_COUNT,
  Constants.ENABLE_BATCHED_OPERATIONS,
  Constants.SIZE_IN_BYTES,
  Constants.MAX_SIZE_IN_MEGABYTES,
  Constants.MESSAGE_COUNT,
  Constants.ENABLE_PARTITIONING,
  Constants.FORWARD_DEADLETTERED_MESSAGES_TO,
  Constants.AUTO_DELETE_ON_IDLE
];

const ruleProperties = ["Filter", "Action", "Name"];

const mockServiceBusAtomManagementClient: ServiceBusManagementClient = new ServiceBusManagementClient(
  "Endpoint=sb://test/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=test"
);

describe("ATOM Serializers", () => {
  describe("atomSerializationPolicy", function() {
    it("should throw an error if receiving a non-XML response body", async function() {
      const request = new WebResource();
      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: request,
          status: 200,
          headers: new HttpHeaders({}),
          bodyAsText: `{ hello: "this is a JSON response body" }`
        };
      };

      try {
        await executeAtomXmlOperation(
          mockServiceBusAtomManagementClient,
          request,
          new MockSerializer(),
          {}
        );
        assert.fail("Error must be thrown");
      } catch (err) {
        assert.equal(
          err.message.startsWith(
            "Error occurred while parsing the response body - expected the service to return valid xml content."
          ),
          true,
          `"${err.message}" was expected to begin with "Error occurred while parsing the response body - expected the service to return valid xml content." `
        );
        assert.equal(err.code, "PARSE_ERROR");
      }
    });

    it("should properly serialize when using valid inputs and serializer", async function() {
      const request = new WebResource();
      request.body = { lockDuration: "PT3M", maxSizeInMegabytes: "2048" };
      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: request,
          status: 200,
          headers: new HttpHeaders({})
        };
      };
      await executeAtomXmlOperation(
        mockServiceBusAtomManagementClient,
        request,
        new MockSerializer(),
        {}
      );

      const expectedRequestBody = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><entry xmlns="http://www.w3.org/2005/Atom"><updated>2019-10-15T19:55:26.821Z</updated><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT3M</LockDuration><MaxSizeInMegabytes>2048</MaxSizeInMegabytes></QueueDescription></content></entry>`;

      const requestBody: string = request.body.toString();
      const indexOfOpenUpdateTag = requestBody.indexOf("<updated>");
      const indexOfCloseUpdateTag = requestBody.indexOf("</updated>");
      assert.equal(
        requestBody.substring(0, indexOfOpenUpdateTag),
        expectedRequestBody.substring(0, indexOfOpenUpdateTag),
        "Atom XML serialization failure"
      );
      assert.equal(
        requestBody.substring(indexOfCloseUpdateTag),
        expectedRequestBody.substring(indexOfCloseUpdateTag),
        "Atom XML serialization failure"
      );
    });
  });

  describe("deserializeAtomXmlResponse", function() {
    it("should throw an error if receiving a valid XML but invalid Atom XML", async function() {
      const request: WebResource = new WebResource();
      const _response = {
        request,
        status: 200,
        headers: new HttpHeaders({}),
        bodyAsText: null,
        parsedBody: { notAnEntry: "" }
      };

      try {
        await deserializeAtomXmlResponse(["QueueName"], _response);
        assert.fail("Error must be thrown");
      } catch (err) {
        assert.equal(
          err.message,
          "Error occurred while parsing the response body - expected the service to return atom xml content with either feed or entry elements.",
          `Unexpected error message found.`
        );
        assert.equal(err.code, "PARSE_ERROR");
      }
    });

    it("should throw appropriate error if unrecognized HTTP code is returned by service", async function() {
      const request: WebResource = new WebResource();
      const _response = {
        request,
        status: 666,
        headers: new HttpHeaders({}),
        bodyAsText: null,
        parsedBody: undefined
      };
      try {
        await deserializeAtomXmlResponse(["QueueName"], _response);
        assert.fail("Error must be thrown");
      } catch (err) {
        assert.equal(
          err.message,
          "Service returned an error response with an unrecognized HTTP status code - 666",
          `Unexpected error message found.`
        );
        assert.equal(err.code, "ServiceError", `Unexpected error code found.`);
      }
    });
  });

  describe("Serializer construct requests with properties in specific order", function() {
    it("Queue serializer generates XML in expected order", async function() {
      const queueOptions = {
        messageCount: 5,
        sizeInBytes: 250,
        requiresDuplicateDetection: true,
        requiresSession: true,
        defaultMessageTimeToLive: "P2D",
        deadLetteringOnMessageExpiration: true,
        duplicateDetectionHistoryTimeWindow: "PT1M",
        maxDeliveryCount: 8,
        lockDuration: "PT45S",
        enableBatchedOperations: false,
        autoDeleteOnIdle: "PT1H",
        authorizationRules: [
          {
            claimType: "SharedAccessKey",
            claimValue: "None",
            rights: {
              accessRights: ["Manage", "Send", "Listen"]
            },
            keyName: "allClaims_v2",
            primaryKey: "pNSRzKKm2vfdbCuTXMa9gOMHD66NwCTxJi4KWJX/TDc=",
            secondaryKey: "UreXLPWiP6Murmsq2HYiIXs23qAvWa36ZOL3gb9rXLs="
          },
          {
            claimType: "SharedAccessKey",
            claimValue: "None",
            rights: {
              accessRights: ["Manage", "Send", "Listen"]
            },
            keyName: "allClaims_v3",
            primaryKey: "pNSRzKKm2vfdbCuTXMa9gOMHD66NwCTxJi4KWJX/TDc=",
            secondaryKey: "UreXLPWiP6Murmsq2HYiIXs23qAvWa36ZOL3gb9rXLs="
          }
        ],
        enablePartitioning: true
      };

      const request: WebResource = new WebResource();
      request.body = queueOptions;

      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: request,
          status: 200,
          headers: new HttpHeaders({})
        };
      };

      await executeAtomXmlOperation(
        mockServiceBusAtomManagementClient,
        request,
        new QueueResourceSerializer(),
        {}
      );

      checkXmlHasPropertiesInExpectedOrder(request.body.toString(), queueProperties);
    });

    it("Topic serializer generates XML in expected order", async function() {
      const topicOptions = {
        sizeInBytes: 100,
        messageCount: 7,
        subscriptionCount: 6,
        maxDeliveryCount: 20,
        requiresDuplicateDetection: true,
        defaultMessageTimeToLive: "P2D",
        duplicateDetectionHistoryTimeWindow: "PT1M",
        enableBatchedOperations: false,
        autoDeleteOnIdle: "PT1H",
        enablePartitioning: true,
        supportOrdering: false,
        authorizationRules: [
          {
            claimType: "SharedAccessKey",
            claimValue: "None",
            rights: {
              accessRights: ["Manage", "Send", "Listen"]
            },
            keyName: "allClaims_v2",
            primaryKey: "pNSRzKKm2vfdbCuTXMa9gOMHD66NwCTxJi4KWJX/TDc=",
            secondaryKey: "UreXLPWiP6Murmsq2HYiIXs23qAvWa36ZOL3gb9rXLs="
          },
          {
            claimType: "SharedAccessKey",
            claimValue: "None",
            rights: {
              accessRights: ["Manage", "Send", "Listen"]
            },
            keyName: "allClaims_v3",
            primaryKey: "pNSRzKKm2vfdbCuTXMa9gOMHD66NwCTxJi4KWJX/TDc=",
            secondaryKey: "UreXLPWiP6Murmsq2HYiIXs23qAvWa36ZOL3gb9rXLs="
          }
        ]
      };

      const request: WebResource = new WebResource();
      request.body = topicOptions;

      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: request,
          status: 200,
          headers: new HttpHeaders({})
        };
      };

      await executeAtomXmlOperation(
        mockServiceBusAtomManagementClient,
        request,
        new TopicResourceSerializer(),
        {}
      );

      checkXmlHasPropertiesInExpectedOrder(request.body.toString(), topicProperties);
    });

    it("Subscription serializer generates XML in expected order", async function() {
      const subscriptionOptions = {
        defaultMessageTimeToLive: "P2D",
        autoDeleteOnIdle: "PT1H",
        deadLetteringOnFilterEvaluationExceptions: false,
        deadLetteringOnMessageExpiration: true,
        enableBatchedOperations: false,
        requiresSession: true,
        lockDuration: "PT5M",
        maxDeliveryCount: 20
      };

      const request: WebResource = new WebResource();
      request.body = subscriptionOptions;

      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: request,
          status: 200,
          headers: new HttpHeaders({})
        };
      };

      await executeAtomXmlOperation(
        mockServiceBusAtomManagementClient,
        request,
        new SubscriptionResourceSerializer(),
        {}
      );

      checkXmlHasPropertiesInExpectedOrder(request.body.toString(), subscriptionProperties);
    });

    it("Rule serializer generates XML in expected order", async function() {
      const ruleOptions = {
        filter: {
          sqlExpression: "stringValue = @stringParam AND intValue = @intParam",
          sqlParameters: [
            { key: "@intParam", value: 1, type: "int" },
            { key: "@stringParam", value: "b", type: "string" }
          ]
        },
        action: { sqlExpression: "SET a='b'" }
      };

      const request: WebResource = new WebResource();
      request.body = ruleOptions;

      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: request,
          status: 200,
          headers: new HttpHeaders({})
        };
      };

      await executeAtomXmlOperation(
        mockServiceBusAtomManagementClient,
        request,
        new RuleResourceSerializer(),
        {}
      );

      checkXmlHasPropertiesInExpectedOrder(request.body.toString(), ruleProperties);
    });
  });

  function checkXmlHasPropertiesInExpectedOrder(
    xml: string,
    expectedOrderedProperties: Array<string>
  ) {
    const orderedPropertyIndices: Array<number> = [];
    for (let i = 0; i < expectedOrderedProperties.length; i++) {
      const index = xml.indexOf(`<${expectedOrderedProperties[i]}>`);
      if (index < 0) {
        continue;
      } else {
        orderedPropertyIndices.push(index);
      }
    }

    for (let i = 0; i < orderedPropertyIndices.length - 1; i++) {
      const curr = orderedPropertyIndices[i];
      const next = orderedPropertyIndices[i + 1];
      assert.equal(
        curr < next,
        true,
        "The properties in constructed request are not in expected order"
      );
    }
  }

  class MockSerializer implements AtomXmlSerializer {
    serialize(resource: any): object {
      const property1 = "LockDuration";
      const property2 = "MaxSizeInMegabytes";

      const serializedContent = {
        $: {
          type: "application/xml"
        },
        QueueDescription: {
          $: {
            xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
            "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance"
          },
          LockDuration: "PT1M",
          MaxSizeInMegabytes: "1024"
        }
      };
      serializedContent.QueueDescription[property1] = resource["lockDuration"];
      serializedContent.QueueDescription[property2] = resource["maxSizeInMegabytes"];

      return {
        $: {
          xmlns: "http://www.w3.org/2005/Atom"
        },
        updated: new Date().toISOString(),
        content: serializedContent
      };
    }

    async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
      return response;
    }
  }

  [
    {
      testCaseTitle:
        "Rule serializer throws Error if rule filter input has SQL parameters that uses an unsupported type",
      input: {
        filter: {
          sqlExpression: "stringValue = @stringParam AND intValue = @intParam",
          sqlParameters: [
            { key: "@intParam", value: 1, type: "int" },
            { key: "@stringParam", value: "b", type: "notAKnownType" }
          ]
        },
        action: { sqlExpression: "SET a='b'" }
      },
      output: {
        testErrorMessage: `Invalid type "notAKnownType" supplied for the SQL Parameter. Must be either of "int", "string", "long" or "date".`,
        testErrorType: Error
      }
    },
    {
      testCaseTitle:
        "Rule serializer throws Error if rule filter input has SQL parameters as not an array",
      input: {
        filter: {
          sqlExpression: "stringValue = @stringParam AND intValue = @intParam",
          sqlParameters: "notAnArray"
        },
        action: { sqlExpression: "SET a='b'" }
      },
      output: {
        testErrorMessage: `parameters must be an array of SqlParameter objects or undefined, but received "notAnArray"`,
        testErrorType: TypeError
      }
    },
    {
      testCaseTitle:
        "Rule serializer throws Error if rule filter input has SQL parameter information in not a JS object like representation",
      input: {
        filter: {
          sqlExpression: "stringValue = @stringParam AND intValue = @intParam",
          sqlParameters: ["notAJsObjectLikeValue"]
        },
        action: { sqlExpression: "SET a='b'" }
      },
      output: {
        testErrorMessage: `Expected SQL parameter input to be a JS object value, but received "notAJsObjectLikeValue"`,
        testErrorType: TypeError
      }
    },
    {
      testCaseTitle:
        "Rule serializer throws Error if rule action input has SQL parameters that uses an unsupported type",
      input: {
        filter: {
          sqlExpression: "stringValue = 'abc'"
        },
        action: {
          sqlExpression: "stringValue = @stringParam AND intValue = @intParam",
          sqlParameters: [
            { notKey: "@intParam", value: 1, type: "int" },
            { key: "@stringParam", value: "b", type: "notAKnownType" }
          ]
        }
      },
      output: {
        testErrorMessage: `Invalid type "notAKnownType" supplied for the SQL Parameter. Must be either of "int", "string", "long" or "date".`,
        testErrorType: Error
      }
    },
    {
      testCaseTitle:
        "Rule serializer throws Error if rule action input has SQL parameters as not an array",
      input: {
        filter: {
          sqlExpression: "stringValue = 'abc'"
        },
        action: { sqlExpression: "SET a='b'", sqlParameters: "notAnArray" }
      },
      output: {
        testErrorMessage: `parameters must be an array of SqlParameter objects or undefined, but received "notAnArray"`,
        testErrorType: TypeError
      }
    },
    {
      testCaseTitle:
        "Rule serializer throws Error if rule action input has SQL parameter information in not a JS object like representation",
      input: {
        filter: {
          sqlExpression: "stringValue = 'abc'"
        },
        action: { sqlExpression: "SET a='b'", sqlParameters: ["notAJsObjectLikeValue"] }
      },
      output: {
        testErrorMessage: `Expected SQL parameter input to be a JS object value, but received "notAJsObjectLikeValue"`,
        testErrorType: TypeError
      }
    }
  ].forEach((testCase) => {
    describe(`Type validation errors on SQL parameter inputs`, function(): void {
      it(`${testCase.testCaseTitle}`, async () => {
        try {
          const request = new WebResource();
          request.body = testCase.input;

          mockServiceBusAtomManagementClient.sendRequest = async () => {
            return {
              request: request,
              status: 200,
              headers: new HttpHeaders({})
            };
          };
          await executeAtomXmlOperation(
            mockServiceBusAtomManagementClient,
            request,
            new RuleResourceSerializer(),
            {}
          );
          assert.fail("Error must be thrown");
        } catch (err) {
          assert.equal(
            err.message,
            testCase.output.testErrorMessage,
            `Unexpected error message found.`
          );

          assert.equal(
            err instanceof testCase.output.testErrorType,
            true,
            `Expected error type to be "${testCase.output.testErrorType}"`
          );
        }
      });
    });
  });

  [
    {
      testCaseTitle:
        "Rule serializer throws Error if rule correlation filter input has user properties has an array as value",
      input: {
        filter: {
          correlationId: "abcd",
          properties: {
            message: ["hello"]
          }
        }
      },
      output: {
        testErrorMessage: `Unsupported type for the value in the user property {message:["hello"]}`,
        testErrorType: Error
      }
    },
    {
      testCaseTitle:
        "Rule serializer throws Error if rule correlation filter input has user properties has an empty object as value",
      input: {
        filter: {
          correlationId: "abcd",
          properties: {
            message: {}
          }
        }
      },
      output: {
        testErrorMessage: `Unsupported type for the value in the user property {message:{}}`,
        testErrorType: Error
      }
    },
    {
      testCaseTitle:
        "Rule serializer throws Error if rule correlation filter input has user properties that uses an unsupported type",
      input: {
        filter: {
          correlationId: "abcd",
          properties: {
            message: undefined
          }
        }
      },
      output: {
        testErrorMessage: `Unsupported type for the value in the user property {message:undefined}`,
        testErrorType: Error
      }
    },
    {
      testCaseTitle:
        "Rule serializer throws Error if rule correlation filter input has user properties an integer",
      input: {
        filter: {
          correlationId: "abcd",
          properties: 123
        }
      },
      output: {
        testErrorMessage: `Unsupported value for the properties 123, expected a JSON object with key-value pairs.`,
        testErrorType: Error
      }
    },
    {
      testCaseTitle:
        "Rule serializer throws Error if rule correlation filter input has user properties a string",
      input: {
        filter: {
          correlationId: "abcd",
          properties: "abcd"
        }
      },
      output: {
        testErrorMessage: `Unsupported value for the properties "abcd", expected a JSON object with key-value pairs.`,
        testErrorType: Error
      }
    },
    {
      testCaseTitle:
        "Rule serializer throws Error if rule correlation filter input has user properties an array",
      input: {
        filter: {
          correlationId: "abcd",
          properties: ["abcd"]
        }
      },
      output: {
        testErrorMessage: `Unsupported value for the properties ["abcd"], expected a JSON object with key-value pairs.`,
        testErrorType: Error
      }
    },
    {
      testCaseTitle:
        "Rule serializer throws Error if rule correlation filter input has user properties an empty object",
      input: {
        filter: {
          correlationId: "abcd",
          properties: {}
        }
      },
      output: {
        testErrorMessage: `Unsupported value for the properties {}, expected a JSON object with key-value pairs.`,
        testErrorType: Error
      }
    }
  ].forEach((testCase) => {
    describe(`Type validation errors on Correlation user property inputs`, function(): void {
      it(`${testCase.testCaseTitle}`, async () => {
        try {
          const request = new WebResource();
          request.body = testCase.input;

          mockServiceBusAtomManagementClient.sendRequest = async () => {
            return {
              request: request,
              status: 200,
              headers: new HttpHeaders({})
            };
          };
          await executeAtomXmlOperation(
            mockServiceBusAtomManagementClient,
            request,
            new RuleResourceSerializer(),
            {}
          );
          assert.fail("Error must be thrown");
        } catch (err) {
          assert.equal(
            err.message,
            testCase.output.testErrorMessage,
            `Unexpected error message found.`
          );

          assert.equal(
            err instanceof testCase.output.testErrorType,
            true,
            `Expected error type to be "${testCase.output.testErrorType}"`
          );
        }
      });
    });
  });

  [
    {
      testCaseTitle: "Create queue throws Error if authorization rules input is not an array",
      input: {
        authorizationRules: "notAnArray"
      },
      output: {
        testErrorMessage: `authorizationRules must be an array of AuthorizationRule objects or undefined, but received "notAnArray"`,
        testErrorType: TypeError
      }
    },
    {
      testCaseTitle:
        "Create queue throws Error if authorization rule information is not a JS object like representation",
      input: {
        authorizationRules: ["notAJsObjectLikeValue"]
      },
      output: {
        testErrorMessage: `Expected authorizationRule input to be a JS object value, but received "notAJsObjectLikeValue"`,
        testErrorType: TypeError
      }
    }
  ].forEach((testCase) => {
    describe(`Type validation errors on authorization rule inputs`, function(): void {
      it(`${testCase.testCaseTitle}`, async () => {
        mockServiceBusAtomManagementClient.sendRequest = async () => {
          return {
            request: new WebResource(),
            status: 200,
            headers: new HttpHeaders({})
          };
        };
        try {
          await mockServiceBusAtomManagementClient.createQueue("test", {
            ...(testCase.input as any)
          });
          assert.fail("Error must be thrown");
        } catch (err) {
          assert.equal(
            err.message,
            testCase.output.testErrorMessage,
            `Unexpected error message found.`
          );

          assert.equal(
            err instanceof testCase.output.testErrorType,
            true,
            `Expected error type to be "${testCase.output.testErrorType}"`
          );
        }
      });
    });
  });

  [
    {
      testCaseTitle: `Receives error code "UnauthorizedRequestError" when response status is "401"`,
      input: {
        responseStatus: 401,
        body: ""
      },
      output: {
        errorCode: "UnauthorizedRequestError"
      }
    },
    {
      testCaseTitle: `Receives error code "MessageEntityNotFoundError" when response status is "404"`,
      input: {
        responseStatus: 404,
        body: ""
      },
      output: {
        errorCode: "MessageEntityNotFoundError"
      }
    },
    {
      testCaseTitle: `Receives error code "ServiceError" when response status is "409" and method is "DELETE`,
      input: {
        responseStatus: 409,
        body: "",
        requestMethod: "DELETE"
      },
      output: {
        errorCode: "ServiceError"
      }
    },
    {
      testCaseTitle: `Receives error code "ServiceError" when response status is "409" and method is "PUT" with "If-Match" headers set`,
      input: {
        responseStatus: 409,
        body: "",
        requestMethod: "PUT",
        requestHeaders: { "If-Match": "*" }
      },
      output: {
        errorCode: "ServiceError"
      }
    },
    {
      testCaseTitle: `Receives error code "ServiceError" when response status is "409" and error message has subcode 40901 in it`,
      input: {
        responseStatus: 409,
        body: { Error: { Detail: " ... SubCode=40901  ..." } }
      },
      output: {
        errorCode: "ServiceError"
      }
    },
    {
      testCaseTitle: `Receives error code "MessageEntityAlreadyExistsError" when response status is "409" and no other special conditions are required`,
      input: {
        responseStatus: 409,
        body: "",
        requestMethod: "GET"
      },
      output: {
        errorCode: "MessageEntityAlreadyExistsError"
      }
    },
    {
      input: {
        testCaseTitle: `Receives error code "InvalidOperationError" when response status is "403" and error message has subcode 40301 in it`,
        responseStatus: 403,
        body: { Error: { Detail: " ... SubCode=40301  ..." } }
      },
      output: {
        errorCode: "InvalidOperationError"
      }
    },
    {
      testCaseTitle: `Receives error code "InvalidOperationError" when response status is "403" and error message does NOT have subcode 40301 in it`,
      input: {
        responseStatus: 403,
        body: ""
      },
      output: {
        errorCode: "QuotaExceededError"
      }
    },
    {
      testCaseTitle: `Receives error code "ServiceError" when response status is "400"`,
      input: {
        responseStatus: 400,
        body: ""
      },
      output: {
        errorCode: "ServiceError"
      }
    },
    {
      testCaseTitle: `Receives error code "ServerBusyError" when response status is "503"`,
      input: {
        responseStatus: 503,
        body: ""
      },
      output: {
        errorCode: "ServerBusyError"
      }
    },
    {
      testCaseTitle: `Receives useful error message when service returned information doesn't have the 'Detail' property defined`,
      input: {
        responseStatus: 400,
        body: { Error: { NoDetails: "no Detail property available" } }
      },
      output: {
        errorCode: "ServiceError",
        errorMessage:
          "Detailed error message information not available. Look at the 'code' property on error for more information."
      }
    }
  ].forEach((testCase) => {
    describe(`Verify error codes and messages get constructed correctly for different scenarios`, function(): void {
      it(`${testCase.testCaseTitle}`, async () => {
        mockServiceBusAtomManagementClient.sendRequest = async () => {
          const response = {
            request: new WebResource("", testCase.input.requestMethod as "DELETE" | "GET" | "PUT"),
            status: testCase.input.responseStatus,
            headers: new HttpHeaders(),
            parsedBody: testCase.input.body
          };

          if (testCase.input.requestHeaders) {
            Object.keys(testCase.input.requestHeaders).forEach((key) => {
              const value = (testCase.input.requestHeaders as any)[key];
              response.request.headers.set(key, value);
            });
          }
          return response;
        };
        try {
          await mockServiceBusAtomManagementClient.createQueue({
            queueName: "test",
            ...(testCase.input as any)
          });
          assert.fail("Error must be thrown");
        } catch (err) {
          assert.equal(err.code, testCase.output.errorCode, `Unexpected error code found.`);

          if (testCase.output.errorMessage) {
            assert.equal(
              err.message,
              testCase.output.errorMessage,
              `Unexpected error message found.`
            );
          }
        }
      });
    });
  });

  [
    {
      responseStatus: 100,
      errorCode: "Continue"
    },
    {
      responseStatus: 101,
      errorCode: "SwitchingProtocols"
    },
    {
      responseStatus: 300,
      errorCode: "MultipleChoices"
    },
    {
      responseStatus: 301,
      errorCode: "Moved"
    },
    {
      responseStatus: 302,
      errorCode: "Redirect"
    },
    {
      responseStatus: 303,
      errorCode: "RedirectMethod"
    },
    {
      responseStatus: 304,
      errorCode: "NotModified"
    },
    {
      responseStatus: 305,
      errorCode: "UseProxy"
    },
    {
      responseStatus: 306,
      errorCode: "Unused"
    },
    {
      responseStatus: 402,
      errorCode: "PaymentRequired"
    },
    {
      responseStatus: 405,
      errorCode: "MethodNotAllowed"
    },
    {
      responseStatus: 406,
      errorCode: "NotAcceptable"
    },
    {
      responseStatus: 407,
      errorCode: "ProxyAuthenticationRequired"
    },
    {
      responseStatus: 410,
      errorCode: "Gone"
    },
    {
      responseStatus: 411,
      errorCode: "LengthRequired"
    },
    {
      responseStatus: 412,
      errorCode: "PreconditionFailed"
    },
    {
      responseStatus: 413,
      errorCode: "RequestEntityTooLarge"
    },
    {
      responseStatus: 414,
      errorCode: "RequestUriTooLong"
    },
    {
      responseStatus: 415,
      errorCode: "UnsupportedMediaType"
    },
    {
      responseStatus: 416,
      errorCode: "RequestRangeNotSatisfiable"
    },
    {
      responseStatus: 417,
      errorCode: "ExpectationFailed"
    },
    {
      responseStatus: 426,
      errorCode: "UpgradeRequired"
    },
    {
      responseStatus: 500,
      errorCode: "InternalServerError"
    },
    {
      responseStatus: 501,
      errorCode: "NotImplemented"
    },
    {
      responseStatus: 502,
      errorCode: "BadGateway"
    },
    {
      responseStatus: 504,
      errorCode: "GatewayTimeout"
    },
    {
      responseStatus: 505,
      errorCode: "HttpVersionNotSupported"
    }
  ].forEach((testCase) => {
    describe(`Verify error code mapping for non-specialized failed HTTP status codes`, function(): void {
      it(`Verify mapping for response status code "${testCase.responseStatus}" to result in "${testCase.errorCode}" error code.`, async () => {
        mockServiceBusAtomManagementClient.sendRequest = async () => {
          return {
            request: new WebResource(),
            status: testCase.responseStatus,
            headers: new HttpHeaders()
          };
        };

        try {
          await mockServiceBusAtomManagementClient.createQueue({
            queueName: "test",
            ...(testCase as any)
          });
          assert.fail("Error must be thrown");
        } catch (err) {
          assert.equal(err.code, testCase.errorCode, `Unexpected error code found.`);
        }
      });
    });
  });

  describe(`Parse empty response for list() requests to return as empty array`, function(): void {
    function assertEmptyArray(result: any) {
      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: new WebResource(),
          bodyAsText: '<feed xmlns="http://www.w3.org/2005/Atom"></feed>',
          status: 200,
          headers: new HttpHeaders({})
        };
      };
      assert.equal(Array.isArray(result), true, "Result must be an array");
      assert.equal(result.length, 0, "Result must be an empty array");
    }

    beforeEach(async () => {
      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: new WebResource(),
          bodyAsText: '<feed xmlns="http://www.w3.org/2005/Atom"></feed>',
          status: 200,
          headers: new HttpHeaders({})
        };
      };
    });

    it(`List on empty list of queues gives an empty array`, async () => {
      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: new WebResource(),
          bodyAsText: '<feed xmlns="http://www.w3.org/2005/Atom"></feed>',
          status: 200,
          headers: new HttpHeaders({})
        };
      };
      const result = await mockServiceBusAtomManagementClient["getQueues"]();
      assertEmptyArray(result);
    });

    it(`List on empty list of topics gives an empty array`, async () => {
      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: new WebResource(),
          bodyAsText: '<feed xmlns="http://www.w3.org/2005/Atom"></feed>',
          status: 200,
          headers: new HttpHeaders({})
        };
      };
      const result = await mockServiceBusAtomManagementClient["getTopics"]();
      assertEmptyArray(result);
    });

    it(`List on empty list of subscriptions gives an empty array`, async () => {
      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: new WebResource(),
          bodyAsText: '<feed xmlns="http://www.w3.org/2005/Atom"></feed>',
          status: 200,
          headers: new HttpHeaders({})
        };
      };
      const result = await mockServiceBusAtomManagementClient["getSubscriptions"]("testTopic");
      assertEmptyArray(result);
    });

    it(`List on empty list of rules gives an empty array`, async () => {
      mockServiceBusAtomManagementClient.sendRequest = async () => {
        return {
          request: new WebResource(),
          bodyAsText: '<feed xmlns="http://www.w3.org/2005/Atom"></feed>',
          status: 200,
          headers: new HttpHeaders({})
        };
      };
      const result = await mockServiceBusAtomManagementClient["getRules"](
        "testTopic",
        "testSubscription"
      );
      assertEmptyArray(result);
    });
  });
});
