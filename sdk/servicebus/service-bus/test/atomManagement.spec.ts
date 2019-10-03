// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ServiceBusAtomManagementClient,
  QueueOptions,
  TopicOptions,
  SubscriptionOptions,
  RuleOptions
} from "../src";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";
chai.use(chaiAsPromised);
chai.use(chaiExclude);
const should = chai.should();
const assert = chai.assert;

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
            await deleteEntity(entityType, alwaysBeExistingQueue);
            response = await createEntity(entityType, alwaysBeExistingQueue);
            should.equal(response.queueName, alwaysBeExistingQueue, "Queue name mismatch");
            break;
          case EntityType.TOPIC:
            await deleteEntity(entityType, alwaysBeExistingTopic);
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
        let response;
        switch (entityType) {
          case EntityType.QUEUE:
            try {
              await createEntity(entityType, alwaysBeExistingQueue);
            } catch (err) {
              response = err;
            }
            break;

          case EntityType.TOPIC:
            try {
              response = await createEntity(entityType, alwaysBeExistingTopic);
            } catch (err) {
              response = err;
            }

            break;

          case EntityType.SUBSCRIPTION:
            try {
              response = await createEntity(
                entityType,
                alwaysBeExistingSubscription,
                alwaysBeExistingTopic
              );
            } catch (err) {
              response = err;
            }

            break;

          case EntityType.RULE:
            try {
              response = await createEntity(
                entityType,
                alwaysBeExistingRule,
                alwaysBeExistingTopic,
                alwaysBeExistingSubscription
              );
            } catch (err) {
              response = err;
            }

            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }

        should.equal(response.statusCode, 409, "Error must not be undefined");
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
            // Disabling tests on Rule updates
            // should.equal(response.ruleName, alwaysBeExistingRule, "Rule name mismatch");
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
        let response;
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            try {
              response = await deleteEntity(entityType, "notexisting");
            } catch (err) {
              response = err;
            }
            break;

          case EntityType.SUBSCRIPTION:
            try {
              response = await deleteEntity(entityType, "notexisting", alwaysBeExistingTopic);
            } catch (err) {
              response = err;
            }
            break;

          case EntityType.RULE:
            try {
              response = await deleteEntity(
                entityType,
                "notexisting",
                alwaysBeExistingTopic,
                alwaysBeExistingSubscription
              );
            } catch (err) {
              response = err;
            }
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
        should.equal(response.statusCode, 404);
      });

      it(`Deletes an existent ${entityType} entity successfully`, async () => {
        let response;
        switch (entityType) {
          case EntityType.QUEUE:
            await createEntity(entityType, alwaysBeDeletedQueue);
            response = await deleteEntity(entityType, alwaysBeDeletedQueue);
            break;

          case EntityType.TOPIC:
            await createEntity(entityType, alwaysBeDeletedTopic);
            response = await deleteEntity(entityType, alwaysBeDeletedTopic);
            break;

          case EntityType.SUBSCRIPTION:
            await createEntity(entityType, alwaysBeDeletedSubscription, alwaysBeExistingTopic);
            response = await deleteEntity(
              entityType,
              alwaysBeDeletedSubscription,
              alwaysBeExistingTopic
            );
            break;

          case EntityType.RULE:
            await createEntity(
              entityType,
              alwaysBeDeletedRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
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

      it(`Get on non-existent ${entityType} entity returns empty response`, async () => {
        let response;

        let skipTest = false;
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            response = await getEntity(entityType, "notexisting");

            break;

          case EntityType.SUBSCRIPTION:
            skipTest = true;
            // response = await getEntity(entityType, "notexisting", alwaysBeExistingTopic);
            break;

          case EntityType.RULE:
            skipTest = true;
            // response = await getEntity(
            //   entityType,
            //   "notexisting",
            //   alwaysBeExistingTopic,
            //   alwaysBeExistingSubscription
            // );
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }

        if (!skipTest) {
          should.equal(
            response.createdAt,
            undefined,
            "Should receive empty result and just the raw response"
          );
        }
        // Error is undefined for queues, topics - but not for non-existent subscriptions and rules
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
      authorizationRules: "",
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      countDetails: undefined,
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
      queueName: "alwaysbeexistingqueue",
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
      maxSizeInMegabytes: 2048,
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

      enablePartitioning: true
    },
    output: {
      duplicateDetectionHistoryTimeWindow: "PT1M",
      lockDuration: "PT45S",
      messageCount: 5,
      sizeInBytes: 250,
      maxSizeInMegabytes: 2048,
      defaultMessageTimeToLive: "P2D",
      deadLetteringOnMessageExpiration: true,
      enableBatchedOperations: false,
      maxDeliveryCount: 8,
      requiresDuplicateDetection: true,
      requiresSession: true,
      autoDeleteOnIdle: "PT1H",

      // enablePartitioning: true,
      enablePartitioning: false,
      authorizationRules: "",
      forwardDeadLetteredMessagesTo: undefined,
      forwardTo: undefined,
      path: undefined,
      userMetadata: undefined,

      countDetails: undefined,
      enableExpress: false,
      entityAvailabilityStatus: "Available",
      isAnonymousAccessible: false,
      status: "Active",
      supportOrdering: true,
      queueName: "alwaysbeexistingqueue"
    }
  }
].forEach((testCase) => {
  describe(`Queue creation with differing options`, function(): void {
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
      authorizationRules: "",
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      countDetails: undefined,
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
      requiresDuplicateDetection: false,
      sizeInBytes: 0,
      status: "Active",
      subscriptionCount: undefined,
      supportOrdering: true,
      topicName: "alwaysbeexistingtopic"
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

      maxSizeInMegabytes: 2048,
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
      maxSizeInMegabytes: 2048,
      enableBatchedOperations: false,
      supportOrdering: false,
      requiresDuplicateDetection: true,

      maxSubscriptionsPerTopic: undefined,
      maxSqlFiltersPerTopic: undefined,
      maxCorrelationFiltersPerTopic: undefined,
      // maxSubscriptionsPerTopic: 3,
      // maxSqlFiltersPerTopic: 4,
      // maxCorrelationFiltersPerTopic: 5,

      // enableExpress: true,
      enableExpress: false,
      authorizationRules: "",

      enablePartitioning: false,
      isExpress: false,
      enableSubscriptionPartitioning: false,
      filteringMessagesBeforePublishing: false,
      // enablePartitioning: true,
      // isExpress: true,
      // enableSubscriptionPartitioning: true,
      // filteringMessagesBeforePublishing: true,

      countDetails: undefined,
      entityAvailabilityStatus: "Available",
      isAnonymousAccessible: false,
      status: "Active",
      topicName: "alwaysbeexistingtopic"
    }
  }
].forEach((testCase) => {
  describe(`Topic creation with differing options`, function(): void {
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
      countDetails: undefined,
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

      subscriptionName: "alwaysbeexistingsubscription",
      topicName: "alwaysbeexistingtopic"
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
      countDetails: undefined,
      entityAvailabilityStatus: "Available",
      status: "Active",

      subscriptionName: "alwaysbeexistingsubscription",
      topicName: "alwaysbeexistingtopic"
    }
  }
].forEach((testCase) => {
  describe(`Subscription creation with differing options`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      try {
        await deleteEntity(
          EntityType.SUBSCRIPTION,
          alwaysBeExistingSubscription,
          alwaysBeExistingTopic
        );
      } catch (err) {
        console.log("Ignoring clean up step");
      }
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
    });
  });
});

// Rule tests
[
  {
    testCaseTitle: "Undefined rule options",
    input: undefined,
    output: {
      filter: {
        sqlExpression: "1=1",
        compatibilityLevel: 20
      },
      action: "",

      ruleName: "alwaysbeexistingrule",
      subscriptionName: "alwaysbeexistingsubscription",
      topicName: "alwaysbeexistingtopic"
    }
  }
].forEach((testCase) => {
  describe(`Rule creation with differing options`, function(): void {
    it(`${testCase.testCaseTitle}`, async () => {
      try {
        await deleteEntity(
          EntityType.RULE,
          alwaysBeExistingRule,
          alwaysBeExistingTopic,
          alwaysBeExistingSubscription
        );
      } catch (err) {
        console.log("Ignoring clean up step");
      }
      const response = await createEntity(
        EntityType.RULE,
        alwaysBeExistingRule,
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
        trueFilter: "1=1"
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
        entityPath
        // ruleOptions
        // Disabling use of ruleOptions
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
      const queueResponse = await serviceBusAtomManagementClient.getQueue(entityPath);
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.getTopic(entityPath);
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient.getSubscription(
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
      lockDuration: "PT5M"
    };
  }

  if (topicOptions == undefined) {
    topicOptions = {
      maxDeliveryCount: 11
    };
  }

  if (subscriptionOptions == undefined) {
    subscriptionOptions = {
      lockDuration: "PT1M",
      maxDeliveryCount: 11
    };
  }

  if (ruleOptions == undefined) {
    ruleOptions = {
      trueFilter: "1=1"
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
      // const ruleResponse = await serviceBusAtomManagementClient.updateRule(
      //   topicPath,
      //   subscriptionPath,
      //   entityPath,
      //   ruleOptions
      // );
      // return ruleResponse;

      // Disabling tests on Rule updates
      return;
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
