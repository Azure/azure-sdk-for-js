// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ServiceBusAtomManagementClient } from "../src";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const should = chai.should();

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
        console.log(JSON.stringify(response, undefined, 2));
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

async function createEntity(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string,
  subscriptionPath?: string
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.createQueue(entityPath, {
        lockDuration: "PT1M",
        maxSizeInMegabytes: 1024,
        requiresDuplicateDetection: false,
        requiresSession: false,
        deadLetteringOnMessageExpiration: false,
        maxDeliveryCount: 10,
        enableBatchedOperations: true,
        enablePartitioning: false
      });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.createTopic(entityPath, {
        maxSizeInMegabytes: 1024,
        requiresDuplicateDetection: false,
        maxDeliveryCount: 10,
        enableBatchedOperations: true,
        enablePartitioning: false
      });
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
        {
          lockDuration: "PT1M",
          maxSizeInMegabytes: 1024,
          requiresSession: false,
          deadLetteringOnMessageExpiration: false,
          maxDeliveryCount: 10,
          enableBatchedOperations: true,
          enablePartitioning: false
        }
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
        {
          trueFilter: "1=1"
        }
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
  subscriptionPath?: string
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.updateQueue(entityPath, {
        lockDuration: "PT1M",
        maxSizeInMegabytes: 1024,
        requiresDuplicateDetection: false,
        requiresSession: false,
        deadLetteringOnMessageExpiration: false,
        maxDeliveryCount: 10,
        enableBatchedOperations: true,
        enablePartitioning: false
      });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.updateTopic(entityPath, {
        maxSizeInMegabytes: 1024,
        requiresDuplicateDetection: false,
        maxDeliveryCount: 10,
        enableBatchedOperations: true,
        enablePartitioning: false
      });
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
        {
          lockDuration: "PT1M",
          maxSizeInMegabytes: 1024,
          requiresSession: false,
          deadLetteringOnMessageExpiration: false,
          maxDeliveryCount: 10,
          enableBatchedOperations: true,
          enablePartitioning: false
        }
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
        {
          trueFilter: "1=1"
        }
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
