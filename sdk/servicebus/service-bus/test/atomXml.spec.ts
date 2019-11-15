// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

import {
  executeAtomXmlOperation,
  AtomXmlSerializer,
  deserializeAtomXmlResponse
} from "../src/util/atomXmlHelper";
import * as Constants from "../src/util/constants";
import { ServiceBusAtomManagementClient } from "../src/serviceBusAtomManagementClient";
import { QueueResourceSerializer } from "../src/serializers/queueResourceSerializer";

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
  Constants.SIZE_IN_BYTES,
  Constants.MESSAGE_COUNT,
  Constants.AUTHORIZATION_RULES,
  Constants.AUTO_DELETE_ON_IDLE,
  Constants.ENABLE_PARTITIONING,
  Constants.FORWARD_DEADLETTERED_MESSAGES_TO,
  Constants.USER_METADATA
];

const topicProperties = [
  Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
  Constants.MAX_SIZE_IN_MEGABYTES,
  Constants.REQUIRES_DUPLICATE_DETECTION,
  Constants.DUPLICATE_DETECTION_HISTORY_TIME_WINDOW,
  Constants.ENABLE_BATCHED_OPERATIONS,
  Constants.SIZE_IN_BYTES,
  Constants.AUTO_DELETE_ON_IDLE,
  Constants.AUTHORIZATION_RULES,
  Constants.SUPPORT_ORDERING,
  Constants.MAX_SUBSCRIPTIONS_PER_TOPIC,
  Constants.MAX_SQL_FILTERS_PER_TOPIC,
  Constants.MAX_CORRELATION_FILTERS_PER_TOPIC,
  Constants.ENABLE_EXPRESS,
  Constants.IS_EXPRESS,
  Constants.ENABLE_SUBSCRIPTION_PARTITIONING,
  Constants.FILTER_MESSAGES_BEFORE_PUBLISHING,
  Constants.ENABLE_PARTITIONING,
  Constants.MESSAGE_COUNT,
  Constants.SUBSCRIPTION_COUNT,
  Constants.MAX_DELIVERY_COUNT
];

const subscriptionProperties = [
  Constants.LOCK_DURATION,
  Constants.REQUIRES_SESSION,
  Constants.DEFAULT_MESSAGE_TIME_TO_LIVE,
  Constants.DEAD_LETTERING_ON_MESSAGE_EXPIRATION,
  Constants.DEAD_LETTERING_ON_FILTER_EVALUATION_EXCEPTIONS,
  Constants.DEFAULT_RULE_DESCRIPTION,
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

import { HttpOperationResponse, WebResource, HttpHeaders } from "@azure/core-http";

import * as dotenv from "dotenv";
import { TopicResourceSerializer } from "../src/serializers/topicResourceSerializer";
import { SubscriptionResourceSerializer } from "../src/serializers/subscriptionResourceSerializer";
import { RuleResourceSerializer } from "../src/serializers/ruleResourceSerializer";

dotenv.config();

const dummyRequest: WebResource = new WebResource("dummy", "PUT");

const mockServiceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
  "Endpoint=dummy/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=dummy"
);

const mockHappyServiceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
  "Endpoint=dummy/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=dummy"
);

mockHappyServiceBusAtomManagementClient.sendRequest = async () => {
  return {
    request: dummyRequest,
    status: 200,
    headers: new HttpHeaders({})
  };
};

describe("atomSerializationPolicy #RunInBrowser", function() {
  it("should throw an error if receiving a non-XML response body", async function() {
    mockServiceBusAtomManagementClient.sendRequest = async () => {
      return {
        request: dummyRequest,
        status: 200,
        headers: new HttpHeaders({}),
        bodyAsText: `{ hello: "this is a JSON response body" }`
      };
    };

    dummyRequest.body = JSON.stringify({ lockDuration: "PT3M", maxSizeInMegabytes: "2048" });
    const testSerializer = new DummySerializer();
    try {
      await executeAtomXmlOperation(
        mockServiceBusAtomManagementClient,
        dummyRequest,
        testSerializer
      );
      assert.equal(true, false, "Error must be thrown");
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
    dummyRequest.body = JSON.stringify({ lockDuration: "PT3M", maxSizeInMegabytes: "2048" });

    const testSerializer = new DummySerializer();

    await executeAtomXmlOperation(
      mockHappyServiceBusAtomManagementClient,
      dummyRequest,
      testSerializer
    );

    const expectedRequestBody = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><entry xmlns="http://www.w3.org/2005/Atom"><updated>2019-10-15T19:55:26.821Z</updated><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT3M</LockDuration><MaxSizeInMegabytes>2048</MaxSizeInMegabytes></QueueDescription></content></entry>`;

    const requestBody: string = dummyRequest.body.toString();
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

describe("deserializeAtomXmlResponse #RunInBrowser", function() {
  it("should throw an error if receiving a valid XML but invalid Atom XML", async function() {
    const request: WebResource = new WebResource("dummy", "GET");
    const _response = {
      request,
      status: 200,
      headers: new HttpHeaders({}),
      bodyAsText: null,
      parsedBody: { notAnEntry: "" }
    };

    try {
      await deserializeAtomXmlResponse(["QueueName"], _response);
      assert.equal(true, false, "Error must be thrown");
    } catch (err) {
      assert.equal(
        err.message,
        "Error occurred while parsing the response body - expected the service to return atom xml content with either feed or entry elements.",
        `"${err.message}" was expected to begin with "Error occurred while parsing the response body - expected the service to return atom xml content with either feed or entry elements." `
      );
      assert.equal(err.code, "PARSE_ERROR");
    }
  });

  it("should throw appropriate error if unrecognized HTTP code is returned by service", async function() {
    const request: WebResource = new WebResource("dummy", "GET");
    const _response = {
      request,
      status: 666,
      headers: new HttpHeaders({}),
      bodyAsText: null,
      parsedBody: undefined
    };
    try {
      await deserializeAtomXmlResponse(["QueueName"], _response);
      assert.equal(true, false, "Error must be thrown");
    } catch (err) {
      assert.equal(
        err.message,
        "Service returned an error response.",
        `Message expected to be "Service returned an error response." but received ${err.message}`
      );
      assert.equal(
        err.code,
        "UnrecognizedHttpResponseStatus: 666",
        `Code expected to be "UnrecognizedHttpResponseStatus: 666" but received ${err.code}`
      );
    }
  });
});

describe("Serializer construct requests with properties in specific order #RunInBrowser", function() {
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

    const request: WebResource = new WebResource("dummy", "PUT");
    request.body = JSON.stringify(queueOptions);

    const serializer = new QueueResourceSerializer();

    await executeAtomXmlOperation(mockHappyServiceBusAtomManagementClient, request, serializer);

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

    const request: WebResource = new WebResource("dummy", "PUT");
    request.body = JSON.stringify(topicOptions);

    const serializer = new TopicResourceSerializer();

    await executeAtomXmlOperation(mockHappyServiceBusAtomManagementClient, request, serializer);

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

    const request: WebResource = new WebResource("dummy", "PUT");
    request.body = JSON.stringify(subscriptionOptions);

    const serializer = new SubscriptionResourceSerializer();

    await executeAtomXmlOperation(mockHappyServiceBusAtomManagementClient, request, serializer);

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

    const request: WebResource = new WebResource("dummy", "PUT");
    request.body = JSON.stringify(ruleOptions);

    const serializer = new RuleResourceSerializer();

    await executeAtomXmlOperation(mockHappyServiceBusAtomManagementClient, request, serializer);

    checkXmlHasPropertiesInExpectedOrder(request.body.toString(), ruleProperties);
  });

  it("SQL parameter", async function() {
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

    const request: WebResource = new WebResource("dummy", "PUT");
    request.body = JSON.stringify(ruleOptions);

    const serializer = new RuleResourceSerializer();

    await executeAtomXmlOperation(mockHappyServiceBusAtomManagementClient, request, serializer);

    checkXmlHasPropertiesInExpectedOrder(request.body.toString(), ruleProperties);
  });

  it("SQL Action", async function() {
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

    const request: WebResource = new WebResource("dummy", "PUT");
    request.body = JSON.stringify(ruleOptions);

    const serializer = new RuleResourceSerializer();

    await executeAtomXmlOperation(mockHappyServiceBusAtomManagementClient, request, serializer);

    checkXmlHasPropertiesInExpectedOrder(request.body.toString(), ruleProperties);
  });

  it("Authorization rule", async function() {
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

    const request: WebResource = new WebResource("dummy", "PUT");
    request.body = JSON.stringify(ruleOptions);

    const serializer = new RuleResourceSerializer();

    await executeAtomXmlOperation(mockHappyServiceBusAtomManagementClient, request, serializer);

    checkXmlHasPropertiesInExpectedOrder(request.body.toString(), ruleProperties);
  });
});

function checkXmlHasPropertiesInExpectedOrder(
  xml: string,
  expectedOrderedProperties: Array<string>
) {
  let orderedPropertyIndices: Array<number> = [];
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

class DummySerializer implements AtomXmlSerializer {
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
