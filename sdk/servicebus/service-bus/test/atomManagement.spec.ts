// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ServiceBusAtomManagementClient,
  QueueOptions,
  TopicOptions,
  SubscriptionOptions,
  RuleOptions,
  EntityStatus
} from "../src";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";
chai.use(chaiAsPromised);
chai.use(chaiExclude);
const should = chai.should();
const assert = chai.assert;

import * as dotenv from "dotenv";
dotenv.config();

import { EnvVarKeys, getEnvVars } from "./utils/envVarUtils";
const env = getEnvVars();

const serviceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
  env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]
);

enum EntityType {
  QUEUE = "Queue",
  TOPIC = "Topic",
  SUBSCRIPTION = "Subscription",
  RULE = "Rule"
}

const alwaysBeExistingQueue = "alwaysbeexistingqueue";
const alwaysBeExistingTopic = "alwaysbeexistingtopic";
const alwaysBeExistingSubscription = "alwaysbeexistingsubscription";
const alwaysBeExistingRule = "alwaysbeexistingrule";

[
  {
    entityType: EntityType.QUEUE,
    alwaysBeExistingEntity: alwaysBeExistingQueue
  },
  {
    entityType: EntityType.TOPIC,
    alwaysBeExistingEntity: alwaysBeExistingTopic
  },
  {
    entityType: EntityType.SUBSCRIPTION,
    alwaysBeExistingEntity: alwaysBeExistingSubscription,
    parentTopicName: alwaysBeExistingTopic
  },
  {
    entityType: EntityType.RULE,
    alwaysBeExistingEntity: alwaysBeExistingRule,
    parentTopicName: alwaysBeExistingTopic,
    parentSubscriptionName: alwaysBeExistingSubscription
  }
].forEach((testCase) => {
  describe(`Atom management - Basic CRUD on "${testCase.entityType}" entities`, function(): void {
    before(async () => {
      await createEntity(EntityType.TOPIC, alwaysBeExistingTopic);
      try {
        await deleteEntity(EntityType.TOPIC, "alwaysBeExistingTopic1");
      } catch (err) {
        // Ignoring as creating topic test with input variations may fail
        // and handling this clean along with test case results in resource conflict error
        // Further investigation of issue and simplification of tests setup
        // will be looked into as part of https://github.com/azure/azure-sdk-for-js/issues/6276
      }
      try {
        await deleteEntity(EntityType.TOPIC, "alwaysBeExistingTopic2");
      } catch (err) {
        // Ignoring as creating topic test with input variations may fail
        // and handling this clean along with test case results in resource conflict error
        // Further investigation of issue and simplification of tests setup
        // will be looked into as part of https://github.com/azure/azure-sdk-for-js/issues/6276
      }

      await createEntity(
        EntityType.SUBSCRIPTION,
        alwaysBeExistingSubscription,
        alwaysBeExistingTopic
      );
      await createEntity(EntityType.QUEUE, alwaysBeExistingQueue);
      await createEntity(
        EntityType.RULE,
        alwaysBeExistingRule,
        alwaysBeExistingTopic,
        alwaysBeExistingSubscription
      );
    });

    after(async () => {
      await deleteEntity(EntityType.QUEUE, alwaysBeExistingQueue);
      await deleteEntity(EntityType.TOPIC, alwaysBeExistingTopic);
    });

    it(`List on existing entities for type ${testCase.entityType} with top 1 returns the first entity`, async () => {
      const allEntities = await listEntities(
        testCase.entityType,
        testCase.parentTopicName,
        testCase.parentSubscriptionName
      );

      const topOneEntity = await listEntities(
        testCase.entityType,
        testCase.parentTopicName,
        testCase.parentSubscriptionName,
        undefined,
        1
      );

      should.equal(Array.isArray(topOneEntity), true, "Result must be any array for list requests");
      should.equal(topOneEntity.length, 1, "Result must be an empty array");
      should.equal(
        allEntities[0][testCase.entityType.toLowerCase() + "Name"],
        topOneEntity[0][testCase.entityType.toLowerCase() + "Name"],
        "Entity name mismatch"
      );
    });

    it(`List on existing entities for type ${testCase.entityType} with skip 1 returns all entities skipping 1`, async () => {
      const allEntities = await listEntities(
        testCase.entityType,
        testCase.parentTopicName,
        testCase.parentSubscriptionName
      );

      const skipEntitiesResult = await listEntities(
        testCase.entityType,
        testCase.parentTopicName,
        testCase.parentSubscriptionName,
        1,
        undefined
      );

      should.equal(
        Array.isArray(skipEntitiesResult),
        true,
        "Result must be any array for list requests"
      );
      should.equal(
        skipEntitiesResult.length,
        allEntities.length - 1,
        "Result must be an empty array"
      );
      it(`Get on non-existent ${testCase.entityType} entity throws an error`, async () => {
        let error;
        switch (testCase.entityType) {
          case EntityType.QUEUE:
            try {
              await getEntity(testCase.entityType, "notexisting");
            } catch (err) {
              error = err;
            }
            break;

          case EntityType.TOPIC:
            try {
              error = await getEntity(testCase.entityType, "notexisting");
            } catch (err) {
              error = err;
            }

            break;

          case EntityType.SUBSCRIPTION:
            try {
              error = await getEntity(testCase.entityType, "notexisting", alwaysBeExistingTopic);
            } catch (err) {
              error = err;
            }
            break;

          case EntityType.RULE:
            try {
              error = await getEntity(
                testCase.entityType,
                "notexisting",
                alwaysBeExistingTopic,
                alwaysBeExistingSubscription
              );
            } catch (err) {
              error = err;
            }
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }

        should.equal(error.statusCode, 404, "Unexpected status code found.");
        should.equal(error.code, "MessageEntityNotFoundError", `Unexpected error code found.`);
        should.equal(
          error.message.startsWith("The messaging entity") ||
            error.message.startsWith("Entity") ||
            error.message.startsWith("SubCode") ||
            error.message.startsWith("No service"),
          true,
          `Unexpected error message found.`
        );
      });
    });

    it(`Creating an existent ${testCase.entityType} entity throws an error`, async () => {
      let error;
      try {
        await createEntity(
          testCase.entityType,
          testCase.alwaysBeExistingEntity,
          testCase.parentTopicName,
          testCase.parentSubscriptionName
        );
      } catch (err) {
        error = err;
      }

      should.equal(error.statusCode, 409, "Unexpected status code found.");
      should.equal(error.code, "MessageEntityAlreadyExistsError", `Unexpected error code found.`);
      should.equal(
        error.message.startsWith("The messaging entity") ||
          error.message.startsWith("Entity") ||
          error.message.startsWith("SubCode") ||
          error.message.startsWith("No service"),
        true,
        `Unexpected error message found.`
      );
    });

    it(`Lists available ${testCase.entityType} entities successfully`, async () => {
      const response = await listEntities(
        testCase.entityType,
        testCase.parentTopicName,
        testCase.parentSubscriptionName
      );

      should.equal(Array.isArray(response), true, "Result must be any array for list requests");
    });

    it(`Updates an existent ${testCase.entityType} entity successfully`, async () => {
      const response = await updateEntity(
        testCase.entityType,
        testCase.alwaysBeExistingEntity,
        testCase.parentTopicName,
        testCase.parentSubscriptionName
      );
      should.equal(
        response[testCase.entityType.toLowerCase() + "Name"],
        testCase.alwaysBeExistingEntity,
        "Entity name mismatch"
      );
    });

    it(`Update on non-existent ${testCase.entityType} entity throws an error`, async () => {
      let error;
      try {
        await updateEntity(
          testCase.entityType,
          "nonexisting",
          testCase.parentTopicName,
          testCase.parentSubscriptionName
        );
      } catch (err) {
        error = err;
      }

      should.equal(error.statusCode, 404, "Unexpected status code found.");
      should.equal(error.code, "MessageEntityNotFoundError", `Unexpected error code found.`);
      should.equal(
        error.message.startsWith("The messaging entity") ||
          error.message.startsWith("Entity") ||
          error.message.startsWith("SubCode") ||
          error.message.startsWith("No service"),
        true,
        `Unexpected error message found.`
      );
    });

    it(`Gets an existent ${testCase.entityType} entity successfully`, async () => {
      const response = await getEntity(
        testCase.entityType,
        testCase.alwaysBeExistingEntity,
        testCase.parentTopicName,
        testCase.parentSubscriptionName
      );
      should.equal(
        response[testCase.entityType.toLowerCase() + "Name"],
        testCase.alwaysBeExistingEntity,
        "Entity name mismatch"
      );
    });

    it(`Deletes a non-existent ${testCase.entityType} entity returns an error`, async () => {
      let error;
      try {
        await deleteEntity(
          testCase.entityType,
          "notexisting",
          testCase.parentTopicName,
          testCase.parentSubscriptionName
        );
      } catch (err) {
        error = err;
      }

      should.equal(error.statusCode, 404);
      should.equal(error.code, "MessageEntityNotFoundError", `Unexpected error code found.`);
      should.equal(
        error.message.startsWith("The messaging entity") ||
          error.message.startsWith("Entity") ||
          error.message.startsWith("SubCode") ||
          error.message.startsWith("No service"),
        true,
        `Unexpected error message found.`
      );
    });

    it(`Get on non-existent ${testCase.entityType} entity throws an error`, async () => {
      let error;
      try {
        error = await getEntity(
          testCase.entityType,
          "nonexisting",
          testCase.parentTopicName,
          testCase.parentSubscriptionName
        );
      } catch (err) {
        error = err;
      }

      should.equal(error.statusCode, 404, "Unexpected status code found.");
      should.equal(error.code, "MessageEntityNotFoundError", `Unexpected error code found.`);
      should.equal(
        error.message.startsWith("The messaging entity") ||
          error.message.startsWith("Entity") ||
          error.message.startsWith("SubCode") ||
          error.message.startsWith("No service"),
        true,
        `Unexpected error code message.`
      );
    });

    it(`Deletes an existent ${testCase.entityType} entity successfully`, async () => {
      await createEntity(
        testCase.entityType,
        "entity1",
        testCase.parentTopicName,
        testCase.parentSubscriptionName
      );
      const response = await deleteEntity(
        testCase.entityType,
        "entity1",
        testCase.parentTopicName,
        testCase.parentSubscriptionName
      );

      should.equal(response._response.status, 200);
    });

    it(`Creates a non-existent ${testCase.entityType} entity successfully`, async () => {
      const response = await createEntity(
        testCase.entityType,
        "entity2",
        testCase.parentTopicName,
        testCase.parentSubscriptionName
      );

      await deleteEntity(
        testCase.entityType,
        "entity2",
        testCase.parentTopicName,
        testCase.parentSubscriptionName
      );

      should.equal(
        response[testCase.entityType.toLowerCase() + "Name"],
        "entity2",
        "Entity name mismatch"
      );
    });
  });
});

// Queue tests
[
  {
    testCaseTitle: "Undefined queue options",
    input: undefined,
    output: {
      authorizationRules: undefined,
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      messageCountDetails: undefined,
      deadLetteringOnMessageExpiration: false,
      defaultMessageTtl: "P10675199DT2H48M5.4775807S",
      duplicateDetectionHistoryTimeWindow: "PT10M",
      enableBatchedOperations: true,
      enableExpress: false,
      enablePartitioning: false,
      entityAvailabilityStatus: "Available",
      forwardDeadLetteredMessagesTo: undefined,
      isAnonymousAccessible: false,
      lockDuration: "PT1M",
      maxDeliveryCount: 10,
      maxSizeInMegabytes: 1024,
      messageCount: 0,
      queueName: alwaysBeExistingQueue,
      requiresDuplicateDetection: false,
      requiresSession: false,
      sizeInBytes: 0,
      status: "Active",
      supportOrdering: true,
      forwardTo: undefined,
      userMetadata: undefined
    }
  },
  {
    testCaseTitle: "all properties",
    input: {
      // This should be a proper URL else the service returns an error
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/6146
      // forwardDeadLetteredMessagesTo: "",
      lockDuration: "PT45S",
      requiresDuplicateDetection: true,
      requiresSession: true,
      defaultMessageTtl: "P2D",
      deadLetteringOnMessageExpiration: true,
      duplicateDetectionHistoryTimeWindow: "PT1M",
      maxDeliveryCount: 8,
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
      status: "ReceiveDisabled" as EntityStatus,
      enablePartitioning: true
      // maxSizeInMegabytes: 2048,
      // For partitioned entities, above value is 16384
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/5354
    },
    output: {
      duplicateDetectionHistoryTimeWindow: "PT1M",
      lockDuration: "PT45S",
      defaultMessageTtl: "P2D",
      deadLetteringOnMessageExpiration: true,
      enableBatchedOperations: false,
      maxDeliveryCount: 8,
      requiresDuplicateDetection: true,
      requiresSession: true,
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

      sizeInBytes: 0,
      messageCount: 0,

      enablePartitioning: true,
      maxSizeInMegabytes: 16384,
      supportOrdering: false,

      forwardDeadLetteredMessagesTo: undefined,
      forwardTo: undefined,
      status: "ReceiveDisabled",
      userMetadata: undefined,

      messageCountDetails: undefined,
      enableExpress: false,
      entityAvailabilityStatus: "Available",
      isAnonymousAccessible: false,

      queueName: alwaysBeExistingQueue
    }
  }
].forEach((testCase) => {
  describe(`createQueue() using different variations to the input parameter "queueOptions"`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      const response = await createEntity(
        EntityType.QUEUE,
        alwaysBeExistingQueue,
        undefined,
        undefined,
        true,
        testCase.input
      );
      await deleteEntity(EntityType.QUEUE, alwaysBeExistingQueue);
      should.equal(response.queueName, alwaysBeExistingQueue, "Queue name mismatch");
      assert.deepEqualExcluding(response, testCase.output, [
        "_response",
        "createdOn",
        "updatedOn",
        "accessedOn"
      ]);
    });
  });
});

// Topic tests
// Create different topic each testcase as updates to same topic/subscription does not scale on service side and gives us error -
// "Resource Conflict Occurred. Another conflicting operation may be in progress.
// If this is a retry for failed operation, background clean up is still pending. Try again later."
[
  {
    topicName: "alwaysBeExistingTopic1",
    testCaseTitle: "Undefined topic options",
    input: undefined,
    output: {
      authorizationRules: undefined,
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      messageCountDetails: undefined,
      defaultMessageTtl: "P10675199DT2H48M5.4775807S",
      duplicateDetectionHistoryTimeWindow: "PT10M",
      enableBatchedOperations: true,
      enableExpress: false,
      enablePartitioning: false,
      enableSubscriptionPartitioning: false,
      entityAvailabilityStatus: "Available",
      filteringMessagesBeforePublishing: false,
      isAnonymousAccessible: false,
      isExpress: false,
      maxDeliveryCount: undefined,
      maxSizeInMegabytes: 1024,
      messageCount: undefined,
      userMetadata: undefined,
      requiresDuplicateDetection: false,
      sizeInBytes: 0,
      status: "Active",
      subscriptionCount: undefined,
      supportOrdering: true,
      topicName: "alwaysBeExistingTopic1"
    }
  },
  {
    topicName: "alwaysBeExistingTopic2",
    testCaseTitle: "all properties",
    input: {
      // Following properties don't get set as expected
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/5354
      // enableExpress: true,
      // isExpress: true,
      // enableSubscriptionPartitioning: true,
      // filteringMessagesBeforePublishing: true,

      // maxSizeInMegabytes: 2048, // For partitioned entities, this is 16384

      requiresDuplicateDetection: true,
      defaultMessageTtl: "P2D",
      deadLetteringOnMessageExpiration: true,
      duplicateDetectionHistoryTimeWindow: "PT1M",
      enableBatchedOperations: false,
      status: "SendDisabled" as EntityStatus,
      enablePartitioning: true,
      supportOrdering: false
    },
    output: {
      defaultMessageTtl: "P2D",
      duplicateDetectionHistoryTimeWindow: "PT1M",
      status: "SendDisabled",
      enableBatchedOperations: false,
      supportOrdering: false,
      requiresDuplicateDetection: true,
      sizeInBytes: 0,
      messageCount: undefined,
      subscriptionCount: undefined,
      maxDeliveryCount: undefined,
      enablePartitioning: true,
      maxSizeInMegabytes: 16384,
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      enableExpress: false,
      authorizationRules: undefined,
      userMetadata: undefined,
      isExpress: false,
      enableSubscriptionPartitioning: false,
      filteringMessagesBeforePublishing: false,
      messageCountDetails: undefined,
      entityAvailabilityStatus: "Available",
      isAnonymousAccessible: false,
      topicName: "alwaysBeExistingTopic2"
    }
  }
].forEach((testCase) => {
  describe(`createTopic() using different variations to the input parameter "topicOptions"`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      const response = await createEntity(
        EntityType.TOPIC,
        testCase.topicName,
        undefined,
        undefined,
        true,
        undefined,
        testCase.input
      );

      should.equal(response.topicName, testCase.topicName, "Topic name mismatch");
      assert.deepEqualExcluding(response, testCase.output, [
        "_response",
        "createdOn",
        "updatedOn",
        "accessedOn"
      ]);
    });
  });
});

// Subscription tests
[
  {
    subscriptionName: "alwaysBeExistingSubscription1",
    topicName: "alwaysBeExistingTopic1",
    testCaseTitle: "Undefined subscription options",
    input: undefined,
    output: {
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      messageCountDetails: undefined,
      deadLetteringOnMessageExpiration: false,
      deadLetteringOnFilterEvaluationExceptions: true,
      defaultMessageTtl: "P10675199DT2H48M5.4775807S",
      forwardDeadLetteredMessagesTo: undefined,
      enableBatchedOperations: true,
      forwardTo: undefined,
      userMetadata: undefined,
      defaultRuleDescription: undefined,
      enablePartitioning: undefined,
      entityAvailabilityStatus: "Available",
      lockDuration: "PT1M",
      maxDeliveryCount: 10,
      maxSizeInMegabytes: undefined,
      messageCount: 0,
      requiresSession: false,
      sizeInBytes: undefined,
      status: "Active",
      subscriptionName: "alwaysBeExistingSubscription1",
      topicName: "alwaysBeExistingTopic1"
    }
  },
  {
    subscriptionName: "alwaysBeExistingSubscription2",
    topicName: "alwaysBeExistingTopic1",
    testCaseTitle: "all properties",
    input: {
      lockDuration: "PT5M",
      maxDeliveryCount: 20,
      // This should be a proper URL else the service returns an error
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/6146
      // forwardDeadLetteredMessagesTo: "",
      defaultMessageTtl: "P2D",
      autoDeleteOnIdle: "PT1H",
      deadLetteringOnFilterEvaluationExceptions: false,
      deadLetteringOnMessageExpiration: true,
      enableBatchedOperations: false,
      requiresSession: true
    },
    output: {
      lockDuration: "PT5M",
      maxDeliveryCount: 20,
      defaultMessageTtl: "P2D",
      autoDeleteOnIdle: "PT1H",
      deadLetteringOnFilterEvaluationExceptions: false,
      deadLetteringOnMessageExpiration: true,
      enableBatchedOperations: false,
      requiresSession: true,

      forwardDeadLetteredMessagesTo: undefined,
      defaultRuleDescription: undefined,

      messageCount: 0,
      enablePartitioning: undefined,
      maxSizeInMegabytes: undefined,
      sizeInBytes: undefined,

      forwardTo: undefined,
      userMetadata: undefined,
      messageCountDetails: undefined,
      entityAvailabilityStatus: "Available",
      status: "Active",

      subscriptionName: "alwaysBeExistingSubscription2",
      topicName: "alwaysBeExistingTopic1"
    }
  }
].forEach((testCase) => {
  describe(`createSubscription() using different variations to the input parameter "subscriptionOptions"`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      const response = await createEntity(
        EntityType.SUBSCRIPTION,
        testCase.subscriptionName,
        testCase.topicName,
        undefined,
        true,
        undefined,
        undefined,
        testCase.input
      );

      should.equal(
        response.subscriptionName,
        testCase.subscriptionName,
        "Subscription name mismatch"
      );
      assert.deepEqualExcluding(response, testCase.output, [
        "_response",
        "createdOn",
        "updatedOn",
        "accessedOn"
      ]);
    });
  });
});

// Rule tests
[
  {
    testCaseTitle: "Undefined rule options",
    ruleName: "temp_rule_1",
    subscriptionName: "alwaysBeExistingSubscription2",
    topicName: "alwaysBeExistingTopic1",
    input: undefined,
    output: {
      filter: {
        sqlExpression: "1=1",
        requiresPreprocessing: undefined,
        sqlParameters: undefined,
        compatibilityLevel: 20
      },
      action: {
        sqlExpression: undefined,
        requiresPreprocessing: undefined,
        sqlParameters: undefined,
        compatibilityLevel: undefined
      },

      ruleName: "temp_rule_1",
      subscriptionName: "alwaysBeExistingSubscription2",
      topicName: "alwaysBeExistingTopic1"
    }
  },
  {
    testCaseTitle: "Sql Filter rule options",
    ruleName: "temp_rule_2",
    subscriptionName: "alwaysBeExistingSubscription2",
    topicName: "alwaysBeExistingTopic1",
    input: {
      filter: {
        sqlExpression: "stringValue = @stringParam AND intValue = @intParam",
        sqlParameters: [
          { key: "@intParam", value: 1, type: "int" },
          { key: "@stringParam", value: "b", type: "string" }
        ]
      },
      action: { sqlExpression: "SET a='b'" }
    },
    output: {
      filter: {
        sqlExpression: "stringValue = @stringParam AND intValue = @intParam",
        sqlParameters: [
          { key: "@intParam", value: 1, type: "int" },
          { key: "@stringParam", value: "b", type: "string" }
        ],
        requiresPreprocessing: false,
        compatibilityLevel: 20
      },
      action: {
        sqlExpression: "SET a='b'",
        requiresPreprocessing: false,
        sqlParameters: undefined,
        compatibilityLevel: 20
      },

      ruleName: "temp_rule_2",
      subscriptionName: "alwaysBeExistingSubscription2",
      topicName: "alwaysBeExistingTopic1"
    }
  },
  {
    testCaseTitle: "Correlation Filter rule options",
    ruleName: "temp_rule_3",
    subscriptionName: "alwaysBeExistingSubscription2",
    topicName: "alwaysBeExistingTopic1",
    input: {
      filter: {
        correlationId: "abcd"
      },
      action: { sqlExpression: "SET sys.label='GREEN'" }
    },
    output: {
      filter: {
        correlationId: "abcd",
        contentType: "",
        label: "",
        messageId: "",
        replyTo: "",
        replyToSessionId: "",
        sessionId: "",
        to: "",
        userProperties: undefined
      },
      action: {
        sqlExpression: "SET sys.label='GREEN'",
        requiresPreprocessing: false,
        sqlParameters: undefined,
        compatibilityLevel: 20
      },

      ruleName: "temp_rule_3",
      subscriptionName: "alwaysBeExistingSubscription2",
      topicName: "alwaysBeExistingTopic1"
    }
  }
].forEach((testCase) => {
  describe(`createRule() using different variations to the input parameter "ruleOptions"`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      const response = await createEntity(
        EntityType.RULE,
        testCase.ruleName,
        testCase.topicName,
        testCase.subscriptionName,
        true,
        undefined,
        undefined,
        undefined,
        testCase.input
      );

      should.equal(
        response.subscriptionName,
        testCase.subscriptionName,
        "Subscription name mismatch"
      );
      assert.deepEqualExcluding(response, testCase.output, [
        "_response",
        "createdOn",
        "updatedOn",
        "accessedOn"
      ]);
    });
  });
});

// Queue tests
[
  {
    testCaseTitle: "Undefined queue options",
    input: undefined,
    output: {
      testErrorMessage: `Parameter "queueOptions" must be an object of type "QueueOptions" and cannot be undefined or null.`
    }
  },
  {
    testCaseTitle: "all properties",
    input: {
      // This should be a proper URL else the service returns an error
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/6146
      // forwardDeadLetteredMessagesTo: "",
      lockDuration: "PT50S",
      status: "ReceiveDisabled" as EntityStatus,
      defaultMessageTtl: "P1D",
      deadLetteringOnMessageExpiration: true,
      duplicateDetectionHistoryTimeWindow: "PT2M",
      maxDeliveryCount: 5,
      enableBatchedOperations: false,
      autoDeleteOnIdle: "PT2H",
      authorizationRules: [
        {
          claimType: "SharedAccessKey",
          claimValue: "None",
          rights: {
            accessRights: ["Send"]
          },
          keyName: "allClaims_v2",
          primaryKey: "pNSRzKKm2vfdbCuTXMa9gOMHD66NwCTxJi4KWJX/TDc=",
          secondaryKey: "UreXLPWiP6Murmsq2HYiIXs23qAvWa36ZOL3gb9rXLs="
        },
        {
          claimType: "SharedAccessKey",
          claimValue: "None",
          rights: {
            accessRights: ["Listen"]
          },
          keyName: "allClaims_v3",
          primaryKey: "pNSRzKKm2vfdbCuTXMa9gOMHD66NwCTxJi4KWJX/TDc=",
          secondaryKey: "UreXLPWiP6Murmsq2HYiIXs23qAvWa36ZOL3gb9rXLs="
        }
      ],

      enablePartitioning: true,
      requiresDuplicateDetection: true,
      requiresSession: true,

      maxSizeInMegabytes: 3072
      // maxSizeInMegabytes: 2048,
      // For partitioned entities, this is 16384
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/5354
    },
    output: {
      duplicateDetectionHistoryTimeWindow: "PT2M",
      lockDuration: "PT50S",
      defaultMessageTtl: "P1D",
      deadLetteringOnMessageExpiration: true,
      enableBatchedOperations: false,
      maxDeliveryCount: 5,
      messageCount: undefined,
      sizeInBytes: undefined,
      autoDeleteOnIdle: "PT2H",
      authorizationRules: [
        {
          claimType: "SharedAccessKey",
          claimValue: "None",
          rights: {
            accessRights: ["Send"]
          },
          keyName: "allClaims_v2",
          primaryKey: "pNSRzKKm2vfdbCuTXMa9gOMHD66NwCTxJi4KWJX/TDc=",
          secondaryKey: "UreXLPWiP6Murmsq2HYiIXs23qAvWa36ZOL3gb9rXLs="
        },
        {
          claimType: "SharedAccessKey",
          claimValue: "None",
          rights: {
            accessRights: ["Listen"]
          },
          keyName: "allClaims_v3",
          primaryKey: "pNSRzKKm2vfdbCuTXMa9gOMHD66NwCTxJi4KWJX/TDc=",
          secondaryKey: "UreXLPWiP6Murmsq2HYiIXs23qAvWa36ZOL3gb9rXLs="
        }
      ],

      maxSizeInMegabytes: 49152,

      forwardDeadLetteredMessagesTo: undefined,
      forwardTo: undefined,
      userMetadata: undefined,

      messageCountDetails: undefined,

      enableExpress: undefined,
      entityAvailabilityStatus: undefined,
      isAnonymousAccessible: undefined,
      supportOrdering: undefined,
      status: "ReceiveDisabled",

      requiresDuplicateDetection: true,
      requiresSession: true,
      enablePartitioning: true,
      queueName: alwaysBeExistingQueue
    }
  }
].forEach((testCase) => {
  describe(`updateQueue() using different variations to the input parameter "queueOptions"`, function(): void {
    beforeEach(async () => {
      await createEntity(EntityType.QUEUE, alwaysBeExistingQueue, undefined, undefined, true, {
        // This should be a proper URL else the service returns an error
        // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/6146
        // forwardDeadLetteredMessagesTo: "",
        lockDuration: "PT45S",
        requiresDuplicateDetection: true,
        requiresSession: true,
        defaultMessageTtl: "P2D",
        deadLetteringOnMessageExpiration: true,
        duplicateDetectionHistoryTimeWindow: "PT1M",
        maxDeliveryCount: 8,
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
        // maxSizeInMegabytes: 2048, // For partitioned entities, this is 16384
      });
    });
    afterEach(async () => {
      await deleteEntity(EntityType.QUEUE, alwaysBeExistingQueue);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      try {
        const response = await updateEntity(
          EntityType.QUEUE,
          alwaysBeExistingQueue,
          undefined,
          undefined,
          true,
          testCase.input
        );

        assert.deepEqualExcluding(response, testCase.output, [
          "_response",
          "createdOn",
          "updatedOn",
          "accessedOn"
        ]);
      } catch (err) {
        checkForValidErrorScenario(err, testCase.output);
      }
    });
  });
});

// Topic tests
[
  {
    topicName: "alwaysBeExistingTopic1",
    testCaseTitle: "Undefined topic options",
    input: undefined,
    output: {
      testErrorMessage: `Parameter "topicOptions" must be an object of type "TopicOptions" and cannot be undefined or null.`
    }
  },
  {
    topicName: "alwaysBeExistingTopic1",
    testCaseTitle: "all properties",
    input: {
      // Property gets set but is not exposed to user in .NET SDK
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/5354
      // maxDeliveryCount: 10,
      // subscriptionCount: 8,

      // Following properties don't get set as expected
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/5354
      // enableExpress: true,
      // isExpress: true,
      // enableSubscriptionPartitioning: true,
      // filteringMessagesBeforePublishing: true,

      // maxSizeInMegabytes: 2048, // For partitioned entities, this is 16384

      status: "Active" as EntityStatus,
      userMetadata: "test metadata",
      requiresDuplicateDetection: false,
      defaultMessageTtl: "P1D",
      duplicateDetectionHistoryTimeWindow: "PT2M",
      autoDeleteOnIdle: "PT2H",
      supportOrdering: true,

      maxSizeInMegabytes: 3072
    },
    output: {
      // Property gets set but is not exposed to user in .NET SDK
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/5354
      maxDeliveryCount: undefined,
      subscriptionCount: undefined,
      // Used to return as 0, but now returns as undefined
      sizeInBytes: undefined,

      messageCount: undefined,

      requiresDuplicateDetection: false,
      defaultMessageTtl: "P1D",
      duplicateDetectionHistoryTimeWindow: "PT2M",
      autoDeleteOnIdle: "PT2H",

      supportOrdering: true,

      maxSizeInMegabytes: 3072,

      enableBatchedOperations: true,
      enablePartitioning: false,

      // Following properties don't get set as expected
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/5354
      // enableExpress: true,

      authorizationRules: undefined,

      // Following properties don't get set as expected
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/5354
      // Properties used to return as false, but based on newer .NET SDK based changes now returns as undefined
      isExpress: undefined,
      enableSubscriptionPartitioning: undefined,
      filteringMessagesBeforePublishing: undefined,
      enableExpress: undefined,

      // isExpress: true,
      // enableSubscriptionPartitioning: true,
      // filteringMessagesBeforePublishing: true,

      entityAvailabilityStatus: undefined,
      isAnonymousAccessible: undefined,
      status: "Active",
      userMetadata: "test metadata",

      messageCountDetails: undefined,

      topicName: "alwaysbeexistingtopic1"
    }
  }
].forEach((testCase) => {
  describe(`updateTopic() using different variations to the input parameter "topicOptions"`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      try {
        const response = await updateEntity(
          EntityType.TOPIC,
          testCase.topicName,
          undefined,
          undefined,
          true,
          undefined,
          testCase.input
        );

        assert.deepEqualExcluding(response, testCase.output, [
          "_response",
          "createdOn",
          "updatedOn",
          "accessedOn"
        ]);
      } catch (err) {
        checkForValidErrorScenario(err, testCase.output);
      }
    });
  });
});

// Subscription tests
[
  {
    topicName: alwaysBeExistingTopic,
    subscriptionName: "alwaysBeExistingSubscription1",
    testCaseTitle: "Undefined subscription options",
    input: undefined,
    output: {
      testErrorMessage: `Parameter "subscriptionOptions" must be an object of type "SubscriptionOptions" and cannot be undefined or null.`
    }
  },
  {
    topicName: "alwaysBeExistingTopic1",
    subscriptionName: "alwaysbeExistingSubscription1",
    testCaseTitle: "all properties",
    input: {
      lockDuration: "PT3M",
      maxDeliveryCount: 10,
      // This should be a proper URL else the service returns an error
      // To be investigated further as part of https://github.com/azure/azure-sdk-for-js/issues/6146
      // forwardDeadLetteredMessagesTo: "",
      defaultMessageTtl: "P1D",
      autoDeleteOnIdle: "PT2H",
      deadLetteringOnFilterEvaluationExceptions: true,
      deadLetteringOnMessageExpiration: false,
      enableBatchedOperations: true,
      requiresSession: false
    },
    output: {
      lockDuration: "PT3M",
      maxDeliveryCount: 10,
      defaultMessageTtl: "P1D",
      autoDeleteOnIdle: "PT2H",
      deadLetteringOnFilterEvaluationExceptions: true,
      deadLetteringOnMessageExpiration: false,
      enableBatchedOperations: true,

      forwardDeadLetteredMessagesTo: undefined,
      defaultRuleDescription: undefined,

      messageCount: 0,
      maxSizeInMegabytes: undefined,
      sizeInBytes: undefined,

      requiresSession: false,
      enablePartitioning: undefined,

      forwardTo: undefined,
      userMetadata: undefined,
      messageCountDetails: undefined,
      entityAvailabilityStatus: "Available",
      status: "Active",

      subscriptionName: "alwaysbeExistingSubscription1",
      topicName: "alwaysBeExistingTopic1"
    }
  }
].forEach((testCase) => {
  describe(`updateSubscription() using different variations to the input parameter "subscriptionOptions"`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      try {
        const response = await updateEntity(
          EntityType.SUBSCRIPTION,
          testCase.subscriptionName,
          testCase.topicName,
          undefined,
          true,
          undefined,
          undefined,
          testCase.input
        );

        assert.deepEqualExcluding(response, testCase.output, [
          "_response",
          "createdOn",
          "updatedOn",
          "accessedOn"
        ]);
      } catch (err) {
        checkForValidErrorScenario(err, testCase.output);
      }
    });
  });
});

// Rule tests
[
  {
    testCaseTitle: "Undefined rule options",
    ruleName: "temp_rule_2",
    subscriptionName: "alwaysBeExistingSubscription2",
    topicName: "alwaysBeExistingTopic1",
    input: undefined,
    output: {
      testErrorMessage: `Parameter "ruleOptions" must be an object of type "RuleOptions" and cannot be undefined or null.`
    }
  },
  {
    testCaseTitle: "Sql Filter rule options",
    ruleName: "temp_rule_2",
    subscriptionName: "alwaysBeExistingSubscription2",
    topicName: "alwaysBeExistingTopic1",
    input: {
      filter: {
        sqlExpression: "stringValue = @stringParam",
        sqlParameters: [{ key: "@stringParam", value: "b", type: "string" }]
      },
      action: { sqlExpression: "SET a='c'" }
    },
    output: {
      filter: {
        sqlExpression: "stringValue = @stringParam",
        sqlParameters: [{ key: "@stringParam", value: "b", type: "string" }],
        requiresPreprocessing: false,
        compatibilityLevel: 20
      },
      action: {
        sqlExpression: "SET a='c'",
        requiresPreprocessing: false,
        sqlParameters: undefined,
        compatibilityLevel: 20
      },

      ruleName: "temp_rule_2",
      subscriptionName: "alwaysBeExistingSubscription2",
      topicName: "alwaysBeExistingTopic1"
    }
  },
  {
    testCaseTitle: "Correlation Filter rule options",
    ruleName: "temp_rule_3",
    subscriptionName: "alwaysBeExistingSubscription2",
    topicName: "alwaysBeExistingTopic1",
    input: {
      filter: {
        correlationId: "defg"
      },
      action: { sqlExpression: "SET sys.label='RED'" }
    },
    output: {
      filter: {
        correlationId: "defg",
        contentType: "",
        label: "",
        messageId: "",
        replyTo: "",
        replyToSessionId: "",
        sessionId: "",
        to: "",
        userProperties: undefined
      },
      action: {
        sqlExpression: "SET sys.label='RED'",
        requiresPreprocessing: false,
        sqlParameters: undefined,
        compatibilityLevel: 20
      },

      ruleName: "temp_rule_3",
      subscriptionName: "alwaysBeExistingSubscription2",
      topicName: "alwaysBeExistingTopic1"
    }
  }
].forEach((testCase) => {
  describe(`updateRule() using different variations to the input parameter "ruleOptions"`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      try {
        const response = await updateEntity(
          EntityType.RULE,
          testCase.ruleName,
          testCase.topicName,
          testCase.subscriptionName,
          true,
          undefined,
          undefined,
          undefined,
          testCase.input
        );

        assert.deepEqualExcluding(response, testCase.output, [
          "_response",
          "createdOn",
          "updatedOn",
          "accessedOn"
        ]);
      } catch (err) {
        checkForValidErrorScenario(err, testCase.output);
      }
    });
  });
});

function checkForValidErrorScenario(err: any, expectedtestOutput: any) {
  let isErrorExpected = false;

  if (expectedtestOutput.testErrorMessage) {
    isErrorExpected = true;
    should.equal(
      err.message && err.message.startsWith(expectedtestOutput.testErrorMessage),
      true,
      `Unexpected error message prefix found.`
    );
  }

  if (expectedtestOutput.testErrorCode) {
    isErrorExpected = true;
    should.equal(
      err.code && err.code.startsWith(expectedtestOutput.testErrorCode),
      true,
      `Unexpected error code found.`
    );
  }

  if (!isErrorExpected) {
    throw err;
  }
}

async function createEntity(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string,
  subscriptionPath?: string,
  overrideOptions?: boolean, // If this is false, then the default options will be populated as used for basic testing.
  queueOptions?: QueueOptions,
  topicOptions?: TopicOptions,
  subscriptionOptions?: SubscriptionOptions,
  ruleOptions?: RuleOptions
): Promise<any> {
  if (!overrideOptions) {
    if (queueOptions == undefined) {
      queueOptions = {
        lockDuration: "PT1M",
        authorizationRules: [
          {
            claimType: "SharedAccessKey",
            claimValue: "None",
            rights: {
              accessRights: ["Manage", "Send", "Listen"]
            },
            keyName: "allClaims_v1",
            primaryKey: "pNSRzKKm2vfdbCuTXMa9gOMHD66NwCTxJi4KWJX/TDc=",
            secondaryKey: "UreXLPWiP6Murmsq2HYiIXs23qAvWa36ZOL3gb9rXLs="
          }
        ]
      };
    }

    if (topicOptions == undefined) {
      topicOptions = {
        status: "Active"
      };
    }

    if (subscriptionOptions == undefined) {
      subscriptionOptions = {
        lockDuration: "PT1M"
      };
    }

    if (ruleOptions == undefined) {
      ruleOptions = {
        filter: {
          sqlExpression: "stringValue = @stringParam AND intValue = @intParam",
          sqlParameters: [
            { key: "@intParam", value: 1, type: "int" },
            { key: "@stringParam", value: "b", type: "string" }
          ]
        },
        action: { sqlExpression: "SET a='b'" }
      };
    }
  }

  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.createQueue(
        entityPath,
        queueOptions
      );
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.createTopic(
        entityPath,
        topicOptions
      );
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient.createSubscription(
        topicPath,
        entityPath,
        subscriptionOptions
      );
      return subscriptionResponse;
    case EntityType.RULE:
      if (!topicPath || !subscriptionPath) {
        throw new Error(
          "TestError: Topic path AND subscription path must be passed when invoking tests on rules"
        );
      }
      const ruleResponse = await serviceBusAtomManagementClient.createRule(
        topicPath,
        subscriptionPath,
        entityPath,
        ruleOptions
      );
      return ruleResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}

async function getEntity(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string,
  subscriptionPath?: string
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.getQueueDetails(entityPath);
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.getTopicDetails(entityPath);
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient.getSubscriptionDetails(
        topicPath,
        entityPath
      );
      return subscriptionResponse;
    case EntityType.RULE:
      if (!topicPath || !subscriptionPath) {
        throw new Error(
          "TestError: Topic path AND subscription path must be passed when invoking tests on rules"
        );
      }
      const ruleResponse = await serviceBusAtomManagementClient.getRule(
        topicPath,
        subscriptionPath,
        entityPath
      );
      return ruleResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}

async function updateEntity(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string,
  subscriptionPath?: string,
  overrideOptions?: boolean, // If this is false, then the default options will be populated as used for basic testing.
  queueOptions?: QueueOptions,
  topicOptions?: TopicOptions,
  subscriptionOptions?: SubscriptionOptions,
  ruleOptions?: RuleOptions
): Promise<any> {
  if (!overrideOptions) {
    if (queueOptions == undefined) {
      queueOptions = {
        lockDuration: "PT1M",
        authorizationRules: [
          {
            claimType: "SharedAccessKey",
            claimValue: "None",
            rights: {
              accessRights: ["Manage", "Send", "Listen"]
            },
            keyName: "allClaims_v1",
            primaryKey: "pNSRzKKm2vfdbCuTXMa9gOMHD66NwCTxJi4KWJX/TDc=",
            secondaryKey: "UreXLPWiP6Murmsq2HYiIXs23qAvWa36ZOL3gb9rXLs="
          }
        ]
      };
    }

    if (topicOptions == undefined) {
      topicOptions = {
        status: "Active"
      };
    }

    if (subscriptionOptions == undefined) {
      subscriptionOptions = {
        lockDuration: "PT1M"
      };
    }

    if (ruleOptions == undefined) {
      ruleOptions = {
        filter: {
          sqlExpression: "stringValue = @stringParam AND intValue = @intParam",
          sqlParameters: [
            { key: "@intParam", value: 1, type: "int" },
            { key: "@stringParam", value: "b", type: "string" }
          ]
        },
        action: { sqlExpression: "SET a='b'" }
      };
    }
  }

  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.updateQueue(
        entityPath,
        // @ts-ignore
        queueOptions
      );
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.updateTopic(
        entityPath,
        // @ts-ignore
        topicOptions
      );
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient.updateSubscription(
        topicPath,
        entityPath,
        // @ts-ignore
        subscriptionOptions
      );
      return subscriptionResponse;
    case EntityType.RULE:
      if (!topicPath || !subscriptionPath) {
        throw new Error(
          "TestError: Topic path AND subscription path must be passed when invoking tests on rules"
        );
      }
      const ruleResponse = await serviceBusAtomManagementClient.updateRule(
        topicPath,
        subscriptionPath,
        entityPath,
        // @ts-ignore
        ruleOptions
      );
      return ruleResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}

async function deleteEntity(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string,
  subscriptionPath?: string
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.deleteQueue(entityPath);
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.deleteTopic(entityPath);
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient.deleteSubscription(
        topicPath,
        entityPath
      );
      return subscriptionResponse;
    case EntityType.RULE:
      if (!topicPath || !subscriptionPath) {
        throw new Error(
          "TestError: Topic path AND subscription path must be passed when invoking tests on rules"
        );
      }
      const ruleResponse = await serviceBusAtomManagementClient.deleteRule(
        topicPath,
        subscriptionPath,
        entityPath
      );
      return ruleResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}

async function listEntities(
  testEntityType: EntityType,
  topicPath?: string,
  subscriptionPath?: string,
  skip?: number,
  top?: number
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.listQueues({
        skip: skip,
        top: top
      });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.listTopics({
        skip: skip,
        top: top
      });
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient.listSubscriptions(
        topicPath,
        { skip: skip, top: top }
      );
      return subscriptionResponse;
    case EntityType.RULE:
      if (!topicPath || !subscriptionPath) {
        throw new Error(
          "TestError: Topic path AND subscription path must be passed when invoking tests on rules"
        );
      }
      const ruleResponse = await serviceBusAtomManagementClient.listRules(
        topicPath,
        subscriptionPath,
        { skip: skip, top: top }
      );
      return ruleResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}
