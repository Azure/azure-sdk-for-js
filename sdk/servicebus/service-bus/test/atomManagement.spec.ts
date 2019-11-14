// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ServiceBusAtomManagementClient,
  QueueOptions,
  TopicOptions,
  SubscriptionOptions,
  RuleOptions,
  ServiceBusClient
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
const alwaysBeDeletedQueue = "alwaysbedeletedqueue";

const alwaysBeExistingTopic = "alwaysbeexistingtopic";
const alwaysBeDeletedTopic = "alwaysbedeletedtopic";

const alwaysBeExistingSubscription = "alwaysbeexistingsubscription";
const alwaysBeDeletedSubscription = "alwaysbedeletedsubscription";

const alwaysBeExistingRule = "alwaysbeexistingrule";
const alwaysBeDeletedRule = "alwaysbedeletedrule";

[EntityType.QUEUE, EntityType.TOPIC, EntityType.SUBSCRIPTION, EntityType.RULE].forEach(
  (entityType) => {
    describe(`Atom management - Basic CRUD on "${entityType}" entities #RunInBrowser`, function(): void {
      it(`Creates a non-existent ${entityType} entity successfully`, async () => {
        let response;

        switch (entityType) {
          case EntityType.QUEUE:
            try {
              await deleteEntity(entityType, alwaysBeExistingQueue);
            } catch (err) {
              console.log("Ignoring clean up step");
            }
            response = await createEntity(entityType, alwaysBeExistingQueue);
            ServiceBusClient.createFromConnectionString(
              env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]
            );
            break;
          case EntityType.TOPIC:
            try {
              await deleteEntity(entityType, alwaysBeExistingTopic);
            } catch (err) {
              console.log("Ignoring clean up step");
            }
            response = await createEntity(entityType, alwaysBeExistingTopic);
            should.equal(response.topicName, alwaysBeExistingTopic, "Topic name mismatch");
            break;
          case EntityType.SUBSCRIPTION:
            response = await createEntity(
              entityType,
              alwaysBeExistingSubscription,
              alwaysBeExistingTopic
            );
            should.equal(
              response.subscriptionName,
              alwaysBeExistingSubscription,
              "Subscription name mismatch"
            );
            break;
          case EntityType.RULE:
            try {
              response = await deleteEntity(
                entityType,
                alwaysBeExistingRule,
                alwaysBeExistingTopic,
                alwaysBeExistingSubscription
              );
            } catch (err) {
              console.log("Ignoring clean up step");
            }
            response = await createEntity(
              entityType,
              alwaysBeExistingRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            should.equal(response.ruleName, alwaysBeExistingRule, "Rule name mismatch");
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
      });

      it(`Creating an existent ${entityType} entity throws an error`, async () => {
        let error;
        switch (entityType) {
          case EntityType.QUEUE:
            try {
              await createEntity(entityType, alwaysBeExistingQueue);
            } catch (err) {
              error = err;
            }
            break;

          case EntityType.TOPIC:
            try {
              error = await createEntity(entityType, alwaysBeExistingTopic);
            } catch (err) {
              error = err;
            }

            break;

          case EntityType.SUBSCRIPTION:
            try {
              error = await createEntity(
                entityType,
                alwaysBeExistingSubscription,
                alwaysBeExistingTopic
              );
            } catch (err) {
              error = err;
            }

            break;

          case EntityType.RULE:
            try {
              error = await createEntity(
                entityType,
                alwaysBeExistingRule,
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

        should.equal(error.statusCode, 409, "Error must not be undefined");
      });

      it(`Lists available ${entityType} entities successfully`, async () => {
        let response;

        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            response = await listEntities(entityType);
            break;

          case EntityType.SUBSCRIPTION:
            response = await listEntities(entityType, alwaysBeExistingTopic);
            break;

          case EntityType.RULE:
            response = await listEntities(
              entityType,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
        should.equal(Array.isArray(response), true, "Result must be any array for list requests");
      });

      it(`Updates an existent ${entityType} entity successfully`, async () => {
        let response: any;
        switch (entityType) {
          case EntityType.QUEUE:
            response = await updateEntity(entityType, alwaysBeExistingQueue);
            should.equal(response.queueName, alwaysBeExistingQueue, "Queue name mismatch");
            break;
          case EntityType.TOPIC:
            response = await updateEntity(entityType, alwaysBeExistingTopic);
            should.equal(response.topicName, alwaysBeExistingTopic, "Topic name mismatch");
            break;
          case EntityType.SUBSCRIPTION:
            response = await updateEntity(
              entityType,
              alwaysBeExistingSubscription,
              alwaysBeExistingTopic
            );
            should.equal(
              response.subscriptionName,
              alwaysBeExistingSubscription,
              "Subscription name mismatch"
            );
            break;
          case EntityType.RULE:
            response = await updateEntity(
              entityType,
              alwaysBeExistingRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            should.equal(response.ruleName, alwaysBeExistingRule, "Rule name mismatch");
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
      });

      it(`Gets an existent ${entityType} entity successfully`, async () => {
        let response;
        switch (entityType) {
          case EntityType.QUEUE:
            response = await getEntity(entityType, alwaysBeExistingQueue);
            should.equal(response.queueName, alwaysBeExistingQueue, "Queue name mismatch");
            break;
          case EntityType.TOPIC:
            response = await getEntity(entityType, alwaysBeExistingTopic);
            should.equal(response.topicName, alwaysBeExistingTopic, "Topic name mismatch");
            break;
          case EntityType.SUBSCRIPTION:
            response = await getEntity(
              entityType,
              alwaysBeExistingSubscription,
              alwaysBeExistingTopic
            );
            should.equal(
              response.subscriptionName,
              alwaysBeExistingSubscription,
              "Subscription name mismatch"
            );
            break;
          case EntityType.RULE:
            response = await getEntity(
              entityType,
              alwaysBeExistingRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            should.equal(response.ruleName, alwaysBeExistingRule, "Rule name mismatch");
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
      });

      it(`Deletes a non-existent ${entityType} entity returns an error`, async () => {
        let error;
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            try {
              error = await deleteEntity(entityType, "notexisting");
            } catch (err) {
              error = err;
            }
            break;

          case EntityType.SUBSCRIPTION:
            try {
              error = await deleteEntity(entityType, "notexisting", alwaysBeExistingTopic);
            } catch (err) {
              error = err;
            }
            break;

          case EntityType.RULE:
            try {
              error = await deleteEntity(
                entityType,
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
        should.equal(error.statusCode, 404);
      });

      it(`Deletes an existent ${entityType} entity successfully`, async () => {
        let response;
        switch (entityType) {
          case EntityType.QUEUE:
            try {
              await createEntity(entityType, alwaysBeDeletedQueue);
            } catch (err) {
              console.log("Ignoring clean up step");
            }
            response = await deleteEntity(entityType, alwaysBeDeletedQueue);
            break;

          case EntityType.TOPIC:
            try {
              await createEntity(entityType, alwaysBeDeletedTopic);
            } catch (err) {
              console.log("Ignoring clean up step");
            }
            response = await deleteEntity(entityType, alwaysBeDeletedTopic);
            break;

          case EntityType.SUBSCRIPTION:
            try {
              await createEntity(entityType, alwaysBeDeletedSubscription, alwaysBeExistingTopic);
            } catch (err) {
              console.log("Ignoring clean up step");
            }
            response = await deleteEntity(
              entityType,
              alwaysBeDeletedSubscription,
              alwaysBeExistingTopic
            );
            break;

          case EntityType.RULE:
            try {
              await createEntity(
                entityType,
                alwaysBeDeletedRule,
                alwaysBeExistingTopic,
                alwaysBeExistingSubscription
              );
            } catch (err) {
              console.log("Ignoring clean up step");
            }
            response = await deleteEntity(
              entityType,
              alwaysBeDeletedRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
        should.equal(response._response.status, 200);
      });

      it(`Get on non-existent ${entityType} entity throws an error`, async () => {
        let error;
        switch (entityType) {
          case EntityType.QUEUE:
            try {
              await getEntity(entityType, "notexisting");
            } catch (err) {
              error = err;
            }
            break;

          case EntityType.TOPIC:
            try {
              error = await getEntity(entityType, "notexisting");
            } catch (err) {
              error = err;
            }

            break;

          case EntityType.SUBSCRIPTION:
            try {
              error = await getEntity(entityType, "notexisting", alwaysBeExistingTopic);
            } catch (err) {
              error = err;
            }
            break;

          case EntityType.RULE:
            try {
              error = await getEntity(
                entityType,
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

        should.equal(error.statusCode, 404, "Error must not be undefined");
        should.equal(error.code, "404", `Code expected to be "404" but received ${error.code}`);
        should.equal(
          error.message.startsWith("The messaging entity") ||
            error.message.startsWith("Entity") ||
            error.message.startsWith("SubCode") ||
            error.message.startsWith("No service"),
          true,
          `Expected error message to be a textual content but got "${error.message}"`
        );
      });
    });
  }
);

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
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
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
      path: undefined,
      userMetadata: undefined
    }
  },
  {
    testCaseTitle: "all properties",
    input: {
      // This should be a proper URL else the service returns an error
      // forwardDeadLetteredMessagesTo: "",
      lockDuration: "PT45S",
      messageCount: 5,
      sizeInBytes: 250,
      requiresDuplicateDetection: true,
      requiresSession: true,
      defaultMessageTimeToLive: "P2D",
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
    },
    output: {
      duplicateDetectionHistoryTimeWindow: "PT1M",
      lockDuration: "PT45S",
      messageCount: 5,
      sizeInBytes: 250,
      defaultMessageTimeToLive: "P2D",
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

      enablePartitioning: true,
      maxSizeInMegabytes: 16384,
      supportOrdering: false,

      forwardDeadLetteredMessagesTo: undefined,
      forwardTo: undefined,
      path: undefined,
      userMetadata: undefined,

      messageCountDetails: undefined,
      enableExpress: false,
      entityAvailabilityStatus: "Available",
      isAnonymousAccessible: false,
      status: "Active",
      queueName: alwaysBeExistingQueue
    }
  }
].forEach((testCase) => {
  describe(`Queue creation with differing options #RunInBrowser`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      try {
        await deleteEntity(EntityType.QUEUE, alwaysBeExistingQueue);
      } catch (err) {
        console.log("Ignoring clean up step");
      }
      const response = await createEntity(
        EntityType.QUEUE,
        alwaysBeExistingQueue,
        undefined,
        undefined,
        true,
        testCase.input
      );
      should.equal(response.queueName, alwaysBeExistingQueue, "Queue name mismatch");
      assert.deepEqualExcluding(response, testCase.output, [
        "_response",
        "createdAt",
        "updatedAt",
        "accessedAt"
      ]);
    });
  });
});

// Topic tests
[
  {
    testCaseTitle: "Undefined topic options",
    input: undefined,
    output: {
      authorizationRules: undefined,
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      messageCountDetails: undefined,
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
      duplicateDetectionHistoryTimeWindow: "PT10M",
      enableBatchedOperations: true,
      enableExpress: false,
      enablePartitioning: false,
      enableSubscriptionPartitioning: false,
      maxSubscriptionsPerTopic: undefined,
      maxSqlFiltersPerTopic: undefined,
      maxCorrelationFiltersPerTopic: undefined,
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
      topicName: alwaysBeExistingTopic
    }
  },
  {
    testCaseTitle: "all properties",
    input: {
      sizeInBytes: 100,
      messageCount: 7,
      subscriptionCount: 6,
      maxDeliveryCount: 20,
      // enableExpress: true,

      // maxSubscriptionsPerTopic: 3,
      // maxSqlFiltersPerTopic: 4,
      // maxCorrelationFiltersPerTopic: 5,
      // isExpress: true,
      // enableSubscriptionPartitioning: true,
      // filteringMessagesBeforePublishing: true,

      // maxSizeInMegabytes: 2048, // For partitioned entities, this is 16384

      requiresDuplicateDetection: true,
      defaultMessageTimeToLive: "P2D",
      deadLetteringOnMessageExpiration: true,
      duplicateDetectionHistoryTimeWindow: "PT1M",
      enableBatchedOperations: false,
      autoDeleteOnIdle: "PT1H",
      enablePartitioning: true,
      supportOrdering: false
    },
    output: {
      sizeInBytes: 100,
      messageCount: 7,
      subscriptionCount: 6,
      maxDeliveryCount: 20,
      defaultMessageTimeToLive: "P2D",
      duplicateDetectionHistoryTimeWindow: "PT1M",
      autoDeleteOnIdle: "PT1H",
      enableBatchedOperations: false,
      supportOrdering: false,
      requiresDuplicateDetection: true,

      enablePartitioning: true,
      maxSizeInMegabytes: 16384,

      maxSubscriptionsPerTopic: undefined,
      maxSqlFiltersPerTopic: undefined,
      maxCorrelationFiltersPerTopic: undefined,
      // maxSubscriptionsPerTopic: 3,
      // maxSqlFiltersPerTopic: 4,
      // maxCorrelationFiltersPerTopic: 5,

      // enableExpress: true,
      enableExpress: false,
      authorizationRules: undefined,
      userMetadata: undefined,

      isExpress: false,
      enableSubscriptionPartitioning: false,
      filteringMessagesBeforePublishing: false,
      // isExpress: true,
      // enableSubscriptionPartitioning: true,
      // filteringMessagesBeforePublishing: true,

      messageCountDetails: undefined,
      entityAvailabilityStatus: "Available",
      isAnonymousAccessible: false,
      status: "Active",
      topicName: alwaysBeExistingTopic
    }
  }
].forEach((testCase) => {
  describe(`Topic creation with differing options #RunInBrowser`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      try {
        await deleteEntity(EntityType.TOPIC, alwaysBeExistingTopic);
      } catch (err) {
        console.log("Ignoring clean up step");
      }
      const response = await createEntity(
        EntityType.TOPIC,
        alwaysBeExistingTopic,
        undefined,
        undefined,
        true,
        undefined,
        testCase.input
      );
      should.equal(response.topicName, alwaysBeExistingTopic, "Topic name mismatch");
      assert.deepEqualExcluding(response, testCase.output, [
        "_response",
        "createdAt",
        "updatedAt",
        "accessedAt"
      ]);
    });
  });
});

// Subscription tests
[
  {
    testCaseTitle: "Undefined subscription options",
    input: undefined,
    output: {
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      messageCountDetails: undefined,
      deadLetteringOnMessageExpiration: false,
      deadLetteringOnFilterEvaluationExceptions: true,
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
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

      subscriptionName: alwaysBeExistingSubscription,
      topicName: alwaysBeExistingTopic
    }
  },
  {
    testCaseTitle: "all properties",
    input: {
      lockDuration: "PT5M",
      maxDeliveryCount: 20,
      // This should be a proper URL else the service returns an error
      // forwardDeadLetteredMessagesTo: "",
      defaultMessageTimeToLive: "P2D",
      autoDeleteOnIdle: "PT1H",
      deadLetteringOnFilterEvaluationExceptions: false,
      deadLetteringOnMessageExpiration: true,
      enableBatchedOperations: false,
      requiresSession: true,

      defaultRuleDescription: {
        Name: "test1",
        Filter: { SqlExpression: "1=1", CompatibilityLevel: "20" }
      },

      messageCount: 5,
      enablePartitioning: true,
      maxSizeInMegabytes: 2048,
      sizeInBytes: 500
    },
    output: {
      lockDuration: "PT5M",
      maxDeliveryCount: 20,
      defaultMessageTimeToLive: "P2D",
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

      subscriptionName: alwaysBeExistingSubscription,
      topicName: alwaysBeExistingTopic
    }
  }
].forEach((testCase) => {
  describe(`Subscription creation with differing options #RunInBrowser`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      const response = await createEntity(
        EntityType.SUBSCRIPTION,
        alwaysBeExistingSubscription,
        alwaysBeExistingTopic,
        undefined,
        true,
        undefined,
        undefined,
        testCase.input
      );
      should.equal(
        response.subscriptionName,
        alwaysBeExistingSubscription,
        "Subscription name mismatch"
      );
      assert.deepEqualExcluding(response, testCase.output, [
        "_response",
        "createdAt",
        "updatedAt",
        "accessedAt"
      ]);

      try {
        await deleteEntity(
          EntityType.SUBSCRIPTION,
          alwaysBeExistingSubscription,
          alwaysBeExistingTopic
        );
      } catch (err) {
        console.log("Ignoring clean up step");
      }
    });
  });
});

// Rule tests
[
  {
    testCaseTitle: "Undefined rule options",
    ruleName: "temp_rule_1",
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
      subscriptionName: alwaysBeExistingSubscription,
      topicName: alwaysBeExistingTopic
    }
  },
  {
    testCaseTitle: "Sql Filter rule options",
    ruleName: "temp_rule_2",
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
      subscriptionName: alwaysBeExistingSubscription,
      topicName: alwaysBeExistingTopic
    }
  },
  {
    testCaseTitle: "Correlation Filter rule options",
    ruleName: "temp_rule_3",
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
      subscriptionName: alwaysBeExistingSubscription,
      topicName: alwaysBeExistingTopic
    }
  }
].forEach((testCase) => {
  describe(`Rule creation with differing options #RunInBrowser`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      try {
        await createEntity(
          EntityType.SUBSCRIPTION,
          alwaysBeExistingSubscription,
          alwaysBeExistingTopic
        );
      } catch (err) {
        console.log("Ignoring clean up step");
      }

      const response = await createEntity(
        EntityType.RULE,
        testCase.ruleName,
        alwaysBeExistingTopic,
        alwaysBeExistingSubscription,
        true,
        undefined,
        undefined,
        undefined,
        testCase.input
      );
      should.equal(
        response.subscriptionName,
        alwaysBeExistingSubscription,
        "Subscription name mismatch"
      );
      assert.deepEqualExcluding(response, testCase.output, [
        "_response",
        "createdAt",
        "updatedAt",
        "accessedAt"
      ]);

      try {
        await deleteEntity(
          EntityType.RULE,
          testCase.ruleName,
          alwaysBeExistingTopic,
          alwaysBeExistingSubscription
        );
      } catch (err) {
        console.log("Ignoring clean up step");
      }
    });
  });
});

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
        maxDeliveryCount: 10
      };
    }

    if (subscriptionOptions == undefined) {
      subscriptionOptions = {
        lockDuration: "PT1M",
        maxDeliveryCount: 10
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
  queueOptions?: QueueOptions,
  topicOptions?: TopicOptions,
  subscriptionOptions?: SubscriptionOptions,
  ruleOptions?: RuleOptions
): Promise<any> {
  if (queueOptions == undefined) {
    queueOptions = {
      lockDuration: "PT1M"
    };
  }

  if (topicOptions == undefined) {
    topicOptions = {
      maxDeliveryCount: 10
    };
  }

  if (subscriptionOptions == undefined) {
    subscriptionOptions = {
      lockDuration: "PT1M",
      maxDeliveryCount: 10
    };
  }

  if (ruleOptions == undefined) {
    ruleOptions = {
      filter: { sqlExpression: "1=1" }
    };
  }

  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.updateQueue(
        entityPath,
        queueOptions
      );
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.updateTopic(
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
      const subscriptionResponse = await serviceBusAtomManagementClient.updateSubscription(
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
      const ruleResponse = await serviceBusAtomManagementClient.updateRule(
        topicPath,
        subscriptionPath,
        entityPath,
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
  subscriptionPath?: string
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.listQueues({ top: 10 });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.listTopics({ top: 10 });
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient.listSubscriptions(
        topicPath,
        { top: 10 }
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
        { top: 10 }
      );
      return ruleResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}
