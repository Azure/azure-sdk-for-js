// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ServiceBusAtomManagementClient } from "../src";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";

import { HttpOperationResponse } from "@azure/core-http";

chai.use(chaiAsPromised);
chai.use(chaiExclude);
const should = chai.should();
const assert = chai.assert;
const azure = require("azure-sb");

import { EnvVarKeys, getEnvVars } from "./utils/envVarUtils";
const env = getEnvVars();

const serviceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
  env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]
);

const olderAzureSbService = azure.createServiceBusService(env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING]);

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
    describe.only(`Atom management - Basic CRUD on "${entityType}" entities #RunInBrowser`, function(): void {
      it(`Creates a non-existent ${entityType} entity successfully`, async () => {
        let response;
        let oldResponse;
        switch (entityType) {
          case EntityType.QUEUE:
            await deleteEntity(entityType, alwaysBeExistingQueue);
            response = await createEntity(entityType, alwaysBeExistingQueue);
            await deleteEntity(entityType, alwaysBeExistingQueue);
            oldResponse = await oldCreateEntity(entityType, alwaysBeExistingQueue);
            break;
          case EntityType.TOPIC:
            await deleteEntity(entityType, alwaysBeExistingTopic);
            response = await createEntity(entityType, alwaysBeExistingTopic);
            await deleteEntity(entityType, alwaysBeExistingTopic);
            oldResponse = await oldCreateEntity(entityType, alwaysBeExistingTopic);
            break;
          case EntityType.SUBSCRIPTION:
            await deleteEntity(entityType, alwaysBeExistingSubscription, alwaysBeExistingTopic);
            response = await createEntity(
              entityType,
              alwaysBeExistingSubscription,
              alwaysBeExistingTopic
            );
            await deleteEntity(entityType, alwaysBeExistingSubscription, alwaysBeExistingTopic);
            oldResponse = await oldCreateEntity(
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
            await deleteEntity(
              entityType,
              alwaysBeExistingRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            oldResponse = await oldCreateEntity(
              entityType,
              alwaysBeExistingRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }

        assertDeepEqualAtomResponses(response.parsedBody, oldResponse);
      });

      it(`Creating an existent ${entityType} entity throws an error`, async () => {
        let response;
        let oldResponse: any;
        switch (entityType) {
          case EntityType.QUEUE:
            response = await createEntity(entityType, alwaysBeExistingQueue);
            oldResponse = await oldCreateEntity(entityType, alwaysBeExistingQueue);
            break;

          case EntityType.TOPIC:
            response = await createEntity(entityType, alwaysBeExistingTopic);
            oldResponse = await oldCreateEntity(entityType, alwaysBeExistingTopic);
            break;

          case EntityType.SUBSCRIPTION:
            response = await createEntity(
              entityType,
              alwaysBeExistingSubscription,
              alwaysBeExistingTopic
            );
            oldResponse = await oldCreateEntity(
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
            oldResponse = await oldCreateEntity(
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
        assertDeepEqualAtomResponses(response.parsedBody.response, oldResponse.response);
        assertDeepEqualAtomResponses(response.parsedBody.error, oldResponse.error);
        // `result` is being returned as `[null]` in older service.
      });

      it(`Lists available ${entityType} entities successfully`, async () => {
        let response;
        let oldResponse;
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            response = await listEntities(entityType);
            oldResponse = await oldListEntities(entityType);
            break;

          case EntityType.SUBSCRIPTION:
            response = await listEntities(entityType, alwaysBeExistingTopic);
            oldResponse = await oldListEntities(entityType, alwaysBeExistingTopic);
            break;

          case EntityType.RULE:
            response = await listEntities(
              entityType,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            oldResponse = await oldListEntities(
              entityType,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }

        const parsedBody = response.parsedBody;
        should.equal(parsedBody.error, null, "Error must be null");
        should.equal(
          Array.isArray(parsedBody.result),
          true,
          "Result must be any array for list requests"
        );
        assertDeepEqualAtomResponses(response.parsedBody, oldResponse);
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
        should.equal(parsedBody.error, null, "Error must be undefined");
      });

      it(`Gets an existent ${entityType} entity successfully`, async () => {
        let response;
        let oldResponse;
        switch (entityType) {
          case EntityType.QUEUE:
            response = await getEntity(entityType, alwaysBeExistingQueue);
            oldResponse = await oldGetEntity(entityType, alwaysBeExistingQueue);
            break;
          case EntityType.TOPIC:
            response = await getEntity(entityType, alwaysBeExistingTopic);
            oldResponse = await oldGetEntity(entityType, alwaysBeExistingTopic);
            break;
          case EntityType.SUBSCRIPTION:
            response = await getEntity(
              entityType,
              alwaysBeExistingSubscription,
              alwaysBeExistingTopic
            );
            oldResponse = await oldGetEntity(
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
            oldResponse = await oldGetEntity(
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
        // should.equal(parsedBody.error, undefined, "Error must be undefined");
        // Error is undefined for queues, topics - but not for non-existent subscriptions and rules
        should.equal(
          parsedBody.result == undefined,
          false,
          "Result must NOT be undefined or null for successful get request"
        );
        assertDeepEqualAtomResponses(response.parsedBody, oldResponse);
      });

      it(`Deletes a non-existent ${entityType} entity returns an error`, async () => {
        let response;
        let oldResponse: any;
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            response = await deleteEntity(entityType, "notexisting");
            oldResponse = await oldDeleteEntity(entityType, "notexisting");
            break;

          case EntityType.SUBSCRIPTION:
            response = await deleteEntity(entityType, "notexisting", alwaysBeExistingTopic);
            oldResponse = await oldDeleteEntity(entityType, "notexisting", alwaysBeExistingTopic);
            break;

          case EntityType.RULE:
            response = await deleteEntity(
              entityType,
              "notexisting",
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            oldResponse = await oldDeleteEntity(
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
        should.equal(parsedBody.error == undefined, false, "Error must be NOT null");
        assertDeepEqualAtomResponses(response.parsedBody.response, oldResponse.response);
        assertDeepEqualAtomResponses(response.parsedBody.error, oldResponse.error);
        // result is not defined for delete requests
      });

      it(`Deletes an existent ${entityType} entity successfully`, async () => {
        let response;
        let oldResponse: any;
        switch (entityType) {
          case EntityType.QUEUE:
            await createEntity(entityType, alwaysBeDeletedQueue);
            response = await deleteEntity(entityType, alwaysBeDeletedQueue);
            await createEntity(entityType, alwaysBeDeletedQueue);
            oldResponse = await oldDeleteEntity(entityType, alwaysBeDeletedQueue);
            break;

          case EntityType.TOPIC:
            await createEntity(entityType, alwaysBeDeletedTopic);
            response = await deleteEntity(entityType, alwaysBeDeletedTopic);
            await createEntity(entityType, alwaysBeDeletedTopic);
            oldResponse = await oldDeleteEntity(entityType, alwaysBeDeletedTopic);
            break;

          case EntityType.SUBSCRIPTION:
            await createEntity(entityType, alwaysBeDeletedSubscription, alwaysBeExistingTopic);
            response = await deleteEntity(
              entityType,
              alwaysBeDeletedSubscription,
              alwaysBeExistingTopic
            );
            await createEntity(entityType, alwaysBeDeletedSubscription, alwaysBeExistingTopic);
            oldResponse = await oldDeleteEntity(
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
            await createEntity(
              entityType,
              alwaysBeDeletedRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            oldResponse = await oldDeleteEntity(
              entityType,
              alwaysBeDeletedRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
        assertDeepEqualAtomResponses(response.parsedBody.response, oldResponse.response, ["body"]);
        assertDeepEqualAtomResponses(response.parsedBody.error, oldResponse.error);
        // result is not defined for delete requests
      });

      it(`Get on non-existent ${entityType} entity returns empty response`, async () => {
        let response;
        let oldResponse: any;
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            response = await getEntity(entityType, "notexisting");
            oldResponse = await oldGetEntity(entityType, "notexisting");
            break;

          case EntityType.SUBSCRIPTION:
            response = await getEntity(entityType, "notexisting", alwaysBeExistingTopic);
            oldResponse = await oldGetEntity(entityType, "notexisting", alwaysBeExistingTopic);
            break;

          case EntityType.RULE:
            response = await getEntity(
              entityType,
              "notexisting",
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            oldResponse = await oldGetEntity(
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
        should.equal(
          Array.isArray(parsedBody.result),
          true,
          "Result is array for empty get requests"
        );
        should.equal(parsedBody.result.length, 0, "Array must be empty");
        assertDeepEqualAtomResponses(response.parsedBody.response, oldResponse.response);
        assertDeepEqualAtomResponses(response.parsedBody.result, oldResponse.result);
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
        MaxSizeInMegabytes: "1024",
        RequiresDuplicateDetection: "false",
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
        MaxSizeInMegabytes: "1024",
        RequiresDuplicateDetection: "false",
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

async function oldCreateEntity(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string,
  subscriptionPath?: string
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.createQueue(
          entityPath,
          {
            LockDuration: "PT1M",
            MaxSizeInMegabytes: "1024",
            RequiresDuplicateDetection: "false",
            RequiresSession: "false",
            DeadLetteringOnMessageExpiration: "false",
            MaxDeliveryCount: "10",
            EnableBatchedOperations: "true",
            EnablePartitioning: "false"
          },
          function(err: Error, result: any, response: any) {
            try {
              let res: any = {};
              res.error = err;
              res.result = result;
              res.response = response;
              resolve(res);
            } catch (err) {
              reject(err);
            }
          }
        );
      });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.createTopic(
          entityPath,
          {
            MaxSizeInMegabytes: "1024",
            RequiresDuplicateDetection: "false",
            MaxDeliveryCount: "10",
            EnableBatchedOperations: "true",
            EnablePartitioning: "false"
          },
          function(err: Error, result: any, response: any) {
            try {
              let res: any = {};
              res.error = err;
              res.result = result;
              res.response = response;
              resolve(res);
            } catch (err) {
              reject(err);
            }
          }
        );
      });
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.createSubscription(
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
          },
          function(err: Error, result: any, response: any) {
            try {
              let res: any = {};
              res.error = err;
              res.result = result;
              res.response = response;
              resolve(res);
            } catch (err) {
              reject(err);
            }
          }
        );
      });
      return subscriptionResponse;
    case EntityType.RULE:
      if (!topicPath || !subscriptionPath) {
        throw new Error(
          "TestError: Topic path AND subscription path must be passed when invoking tests on rules"
        );
      }
      const ruleResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.createRule(
          topicPath,
          subscriptionPath,
          entityPath,
          {
            name: entityPath,
            trueFilter: "1=1"
          },
          function(err: Error, result: any, response: any) {
            try {
              let res: any = {};
              res.error = err;
              res.result = result;
              res.response = response;
              resolve(res);
            } catch (err) {
              reject(err);
            }
          }
        );
      });
      return ruleResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}

async function oldGetEntity(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string,
  subscriptionPath?: string
): Promise<HttpOperationResponse> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.getQueue(entityPath, function(err: Error, result: any, response: any) {
          try {
            let res: any = {};
            res.error = err;
            res.result = result;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.getTopic(entityPath, function(err: Error, result: any, response: any) {
          try {
            let res: any = {};
            res.error = err;
            res.result = result;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.getSubscription(topicPath, entityPath, function(
          err: Error,
          result: any,
          response: any
        ) {
          try {
            let res: any = {};
            res.error = err;
            res.result = result;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return subscriptionResponse;
    case EntityType.RULE:
      if (!topicPath || !subscriptionPath) {
        throw new Error(
          "TestError: Topic path AND subscription path must be passed when invoking tests on rules"
        );
      }
      const ruleResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.getRule(topicPath, subscriptionPath, entityPath, function(
          err: Error,
          result: any,
          response: any
        ) {
          try {
            let res: any = {};
            res.error = err;
            res.result = result;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return ruleResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}

async function oldDeleteEntity(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string,
  subscriptionPath?: string
): Promise<HttpOperationResponse> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.deleteQueue(entityPath, function(err: Error, response: any) {
          try {
            let res: any = {};
            res.error = err;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.deleteTopic(entityPath, function(err: Error, response: any) {
          try {
            let res: any = {};
            res.error = err;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.deleteSubscription(topicPath, entityPath, function(err: Error, response: any) {
          try {
            let res: any = {};
            res.error = err;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return subscriptionResponse;
    case EntityType.RULE:
      if (!topicPath || !subscriptionPath) {
        throw new Error(
          "TestError: Topic path AND subscription path must be passed when invoking tests on rules"
        );
      }
      const ruleResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.deleteRule(topicPath, subscriptionPath, entityPath, function(
          err: Error,

          response: any
        ) {
          try {
            let res: any = {};
            res.error = err;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return ruleResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}

async function oldListEntities(
  testEntityType: EntityType,
  topicPath?: string,
  subscriptionPath?: string
): Promise<HttpOperationResponse> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.listQueues({ top: 10 }, function(err: Error, result: any, response: any) {
          try {
            let res: any = {};
            res.error = err;
            res.result = result;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.listTopics({ top: 10 }, function(err: Error, result: any, response: any) {
          try {
            let res: any = {};
            res.error = err;
            res.result = result;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.listSubscriptions(topicPath, { top: 10 }, function(
          err: Error,
          result: any,
          response: any
        ) {
          try {
            let res: any = {};
            res.error = err;
            res.result = result;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return subscriptionResponse;
    case EntityType.RULE:
      if (!topicPath || !subscriptionPath) {
        throw new Error(
          "TestError: Topic path AND subscription path must be passed when invoking tests on rules"
        );
      }
      const ruleResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.listRules(topicPath, subscriptionPath, { top: 10 }, function(
          err: Error,
          result: any,
          response: any
        ) {
          try {
            let res: any = {};
            res.error = err;
            res.result = result;
            res.response = response;
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      });
      return ruleResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}

function assertDeepEqualAtomResponses(
  actual: any,
  expected: any,
  additionalPropertiesToExclude: string[] = []
) {
  if (actual == undefined) {
    actual = [];
  }
  if (expected == undefined) {
    expected = [];
  }
  const propertiesToExclude = [
    "title",
    "_",
    "Detail",
    "detail",
    "CreatedAt",
    "UpdatedAt",
    "published",
    "updated",
    "id",
    "md5",
    "date",
    "etag",
    // Older service returns stack trace in error information
    "name",
    "stack",
    "message"
  ];
  additionalPropertiesToExclude.forEach((item) => propertiesToExclude.push(item));
  assert.deepEqualExcludingEvery(actual, expected, propertiesToExclude);
}
