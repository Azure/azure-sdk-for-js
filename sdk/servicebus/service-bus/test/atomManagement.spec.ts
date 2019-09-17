// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ServiceBusAtomManagementClient } from "../src";
import { HttpOperationResponse } from "@azure/core-http";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { EnvVarKeys, getEnvVars } from "./utils/envVarUtils";
const env = getEnvVars();
const should = chai.should();

const serviceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
  env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]
);

enum EntityType {
  QUEUE = "Queue",
  TOPIC = "Topic",
  SUBSCRIPTION = "Subscription",
  RULE = "Rule"
}

const alwaysBeExistingQueue = "alwaysBeExistingQueue";
const alwaysBeDeletedQueue = "alwaysBeDeletedQueue";

const alwaysBeExistingTopic = "alwaysBeExistingTopic";
const alwaysBeDeletedTopic = "alwaysBeDeletedTopic";

const alwaysBeExistingSubscription = "alwaysBeExistingSubscription";
const alwaysBeDeletedSubscription = "alwaysBeDeletedSubscription";

const alwaysBeExistingRule = "alwaysBeExistingRule";
const alwaysBeDeletedRule = "alwaysBeDeletedRule";

[EntityType.QUEUE, EntityType.TOPIC, EntityType.SUBSCRIPTION, EntityType.RULE].forEach(
  (entityType) => {
    describe(`Atom management - Basic CRUD on "${entityType}" entities #RunInBrowser`, function(): void {
      it(`Creates a non-existent ${entityType} entity successfully`, async () => {
        let response;
        switch (entityType) {
          case EntityType.QUEUE:
            await deleteEntity(entityType, alwaysBeExistingQueue);
            response = await createEntity(entityType, alwaysBeExistingQueue);
            break;
          case EntityType.TOPIC:
            await deleteEntity(entityType, alwaysBeExistingTopic);
            response = await createEntity(entityType, alwaysBeExistingTopic);
            break;
          case EntityType.SUBSCRIPTION:
            await deleteEntity(entityType, alwaysBeExistingSubscription, alwaysBeExistingTopic);
            response = await createEntity(
              entityType,
              alwaysBeExistingSubscription,
              alwaysBeExistingTopic
            );
            break;
          case EntityType.RULE:
            await deleteEntity(
              entityType,
              alwaysBeExistingRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            response = await createEntity(
              entityType,
              alwaysBeExistingRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }

        const parsedBody = response.parsedBody;
        should.equal(parsedBody.error, undefined, "Error must be undefined");
        should.equal(parsedBody.result, undefined, "Result must be undefined for create requests");
      });

      it(`Creating an existent ${entityType} entity throws an error`, async () => {
        let response;
        switch (entityType) {
          case EntityType.QUEUE:
            response = await createEntity(entityType, alwaysBeExistingQueue);
            break;

          case EntityType.TOPIC:
            response = await createEntity(entityType, alwaysBeExistingTopic);
            break;

          case EntityType.SUBSCRIPTION:
            response = await createEntity(
              entityType,
              alwaysBeExistingSubscription,
              alwaysBeExistingTopic
            );
            break;

          case EntityType.RULE:
            response = await createEntity(
              entityType,
              alwaysBeExistingRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }

        const parsedBody = response.parsedBody;
        should.equal(parsedBody.error == undefined, false, "Error must not be undefined");
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

        const parsedBody = response.parsedBody;
        should.equal(parsedBody.error, undefined, "Error must be undefined");
        should.equal(
          Array.isArray(parsedBody.result),
          true,
          "Result must be any array for list requests"
        );
      });

      it(`Updates an existent ${entityType} entity successfully`, async () => {
        let response;
        switch (entityType) {
          case EntityType.QUEUE:
            response = await updateEntity(entityType, alwaysBeExistingQueue);
            break;
          case EntityType.TOPIC:
            response = await updateEntity(entityType, alwaysBeExistingTopic);
            break;
          case EntityType.SUBSCRIPTION:
            response = await updateEntity(
              entityType,
              alwaysBeExistingSubscription,
              alwaysBeExistingTopic
            );
            break;
          case EntityType.RULE:
            response = await updateEntity(
              entityType,
              alwaysBeExistingRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }

        const parsedBody = response.parsedBody;
        should.equal(parsedBody.error, undefined, "Error must be undefined");
        should.equal(
          parsedBody.result,
          undefined,
          "Result must be undefined for update() requests"
        );
      });

      it(`Gets an existent ${entityType} entity successfully`, async () => {
        let response;
        switch (entityType) {
          case EntityType.QUEUE:
            response = await getEntity(entityType, alwaysBeExistingQueue);
            break;
          case EntityType.TOPIC:
            response = await getEntity(entityType, alwaysBeExistingTopic);
            break;
          case EntityType.SUBSCRIPTION:
            response = await getEntity(
              entityType,
              alwaysBeExistingSubscription,
              alwaysBeExistingTopic
            );
            break;
          case EntityType.RULE:
            response = await getEntity(
              entityType,
              alwaysBeExistingRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }

        const parsedBody = response.parsedBody;
        should.equal(parsedBody.error, undefined, "Error must be undefined");
        should.equal(
          parsedBody.result == undefined,
          false,
          "Result must be NOT undefined for successful get request"
        );
      });

      it(`Deletes a non-existent ${entityType} entity returns an error`, async () => {
        let response;
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            response = await deleteEntity(entityType, "notexisting");
            break;

          case EntityType.SUBSCRIPTION:
            response = await deleteEntity(entityType, "notexisting", alwaysBeExistingTopic);
            break;

          case EntityType.RULE:
            response = await deleteEntity(
              entityType,
              "notexisting",
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }

        const parsedBody = response.parsedBody;
        should.equal(parsedBody.error == undefined, false, "Error must be NOT undefined");
        should.equal(
          parsedBody.result,
          undefined,
          "Result must be undefined for create() requests"
        );
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

        const parsedBody = response.parsedBody;
        should.equal(parsedBody.error, undefined, "Error must be undefined");
        should.equal(
          parsedBody.result,
          undefined,
          "Result must be undefined for delete() requests"
        );
      });

      it(`Get on non-existent ${entityType} entity returns empty response`, async () => {
        let response;
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            response = await getEntity(entityType, "notexisting");
            break;

          case EntityType.SUBSCRIPTION:
            response = await getEntity(entityType, "notexisting", alwaysBeExistingTopic);

            break;

          case EntityType.RULE:
            response = await getEntity(
              entityType,
              "notexisting",
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }

        const parsedBody = response.parsedBody;
        // should.equal(parsedBody.error, undefined, "Error must be undefined");
        // Error is undefined for queues, topics - but not for non-existent subscriptions and rules
        should.equal(
          Array.isArray(parsedBody.result),
          true,
          "Result is array for empty get requests"
        );
        should.equal(parsedBody.result.length, 0, "Array must be empty");
      });
    });
  }
);

async function createEntity(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string,
  subscriptionPath?: string
): Promise<HttpOperationResponse> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.createQueue(entityPath, {
        LockDuration: "PT1M",
        MaxSizeInMegabytes: "1024",
        RequiresDuplicateDetection: "false",
        RequiresSession: "false",
        DeadLetteringOnMessageExpiration: "false",
        MaxDeliveryCount: "10",
        EnableBatchedOperations: "true",
        EnablePartitioning: "false"
      });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.createTopic(entityPath, {
        LockDuration: "PT1M",
        MaxSizeInMegabytes: "1024",
        RequiresDuplicateDetection: "false",
        RequiresSession: "false",
        DeadLetteringOnMessageExpiration: "false",
        MaxDeliveryCount: "10",
        EnableBatchedOperations: "true",
        EnablePartitioning: "false"
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
          LockDuration: "PT1M",
          MaxSizeInMegabytes: "1024",
          RequiresSession: "false",
          DeadLetteringOnMessageExpiration: "false",
          MaxDeliveryCount: "10",
          EnableBatchedOperations: "true",
          EnablePartitioning: "false"
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
          name: entityPath,
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
): Promise<HttpOperationResponse> {
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
): Promise<HttpOperationResponse> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.updateQueue(entityPath, {
        LockDuration: "PT1M",
        MaxSizeInMegabytes: "1024",
        RequiresDuplicateDetection: "false",
        RequiresSession: "false",
        DeadLetteringOnMessageExpiration: "false",
        MaxDeliveryCount: "10",
        EnableBatchedOperations: "true",
        EnablePartitioning: "false"
      });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.updateTopic(entityPath, {
        LockDuration: "PT1M",
        MaxSizeInMegabytes: "1024",
        RequiresDuplicateDetection: "false",
        RequiresSession: "false",
        DeadLetteringOnMessageExpiration: "false",
        MaxDeliveryCount: "10",
        EnableBatchedOperations: "true",
        EnablePartitioning: "false"
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
          LockDuration: "PT1M",
          MaxSizeInMegabytes: "1024",
          RequiresSession: "false",
          DeadLetteringOnMessageExpiration: "false",
          MaxDeliveryCount: "10",
          EnableBatchedOperations: "true",
          EnablePartitioning: "false"
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
          name: entityPath,
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
): Promise<HttpOperationResponse> {
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
): Promise<HttpOperationResponse> {
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
