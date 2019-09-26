// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ServiceBusAtomManagementClient } from "../src";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";

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

const olderAzureSbService = azure.createServiceBusService(
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
        let currResponse;
        let oldResponse;
        switch (entityType) {
          case EntityType.QUEUE:
            await deleteEntity(entityType, alwaysBeExistingQueue);
            currResponse = await createEntity(entityType, alwaysBeExistingQueue);
            await deleteEntity(entityType, alwaysBeExistingQueue);
            oldResponse = await oldCreateEntity(entityType, alwaysBeExistingQueue);
            break;
          case EntityType.TOPIC:
            await deleteEntity(entityType, alwaysBeExistingTopic);
            currResponse = await createEntity(entityType, alwaysBeExistingTopic);
            await deleteEntity(entityType, alwaysBeExistingTopic);
            oldResponse = await oldCreateEntity(entityType, alwaysBeExistingTopic);
            break;
          case EntityType.SUBSCRIPTION:
            currResponse = await createEntity(
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
            currResponse = await createEntity(
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
        assertDeepEqualAtomResponses(currResponse, oldResponse.result, ["_response"]);
      });

      it(`Creating an existent ${entityType} entity throws an error`, async () => {
        let currResponse;
        let oldResponse: any;
        switch (entityType) {
          case EntityType.QUEUE:
            try {
              await createEntity(entityType, alwaysBeExistingQueue);
            } catch (err) {
              currResponse = err;
            }

            oldResponse = await oldCreateEntity(entityType, alwaysBeExistingQueue);

            break;

          case EntityType.TOPIC:
            try {
              currResponse = await createEntity(entityType, alwaysBeExistingTopic);
            } catch (err) {
              currResponse = err;
            }

            oldResponse = await oldCreateEntity(entityType, alwaysBeExistingTopic);

            break;

          case EntityType.SUBSCRIPTION:
            try {
              currResponse = await createEntity(
                entityType,
                alwaysBeExistingSubscription,
                alwaysBeExistingTopic
              );
            } catch (err) {
              currResponse = err;
            }

            oldResponse = await oldCreateEntity(
              entityType,
              alwaysBeExistingSubscription,
              alwaysBeExistingTopic
            );

            break;

          case EntityType.RULE:
            try {
              currResponse = await createEntity(
                entityType,
                alwaysBeExistingRule,
                alwaysBeExistingTopic,
                alwaysBeExistingSubscription
              );
            } catch (err) {
              currResponse = err;
            }

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

        should.equal(
          currResponse.statusCode,
          oldResponse.error.statusCode,
          `${currResponse.statusCode} -- mismatch with ${oldResponse.error.statusCode}`
        );
        // `result` is being returned as `[null]` in older service.
      });

      it(`Lists available ${entityType} entities successfully`, async () => {
        let currResponse;
        let oldResponse;
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            currResponse = await listEntities(entityType);
            oldResponse = await oldListEntities(entityType);
            break;

          case EntityType.SUBSCRIPTION:
            currResponse = await listEntities(entityType, alwaysBeExistingTopic);
            oldResponse = await oldListEntities(entityType, alwaysBeExistingTopic);
            break;

          case EntityType.RULE:
            currResponse = await listEntities(
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

        should.equal(
          Array.isArray(currResponse),
          true,
          "Result must be any array for list requests"
        );

        assertDeepEqualAtomResponses(currResponse, oldResponse.result, ["_response"]);
      });

      it(`Updates an existent ${entityType} entity successfully`, async () => {
        switch (entityType) {
          case EntityType.QUEUE:
            await updateEntity(entityType, alwaysBeExistingQueue);
            break;
          case EntityType.TOPIC:
            await updateEntity(entityType, alwaysBeExistingTopic);
            break;
          case EntityType.SUBSCRIPTION:
            await updateEntity(entityType, alwaysBeExistingSubscription, alwaysBeExistingTopic);
            break;
          case EntityType.RULE:
            await updateEntity(
              entityType,
              alwaysBeExistingRule,
              alwaysBeExistingTopic,
              alwaysBeExistingSubscription
            );
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
      });

      it(`Gets an existent ${entityType} entity successfully`, async () => {
        let currResponse;
        let oldResponse;
        switch (entityType) {
          case EntityType.QUEUE:
            try {
              currResponse = await getEntity(entityType, alwaysBeExistingQueue);
            } catch (err) {
              currResponse = err;
            }
            try {
              oldResponse = await oldGetEntity(entityType, alwaysBeExistingQueue);
            } catch (err) {
              oldResponse = err;
            }
            break;
          case EntityType.TOPIC:
            try {
              currResponse = await getEntity(entityType, alwaysBeExistingTopic);
            } catch (err) {
              currResponse = err;
            }
            try {
              oldResponse = await oldGetEntity(entityType, alwaysBeExistingTopic);
            } catch (err) {
              oldResponse = err;
            }
            break;
          case EntityType.SUBSCRIPTION:
            try {
              currResponse = await getEntity(
                entityType,
                alwaysBeExistingSubscription,
                alwaysBeExistingTopic
              );
            } catch (err) {
              currResponse = err;
            }
            try {
              oldResponse = await oldGetEntity(
                entityType,
                alwaysBeExistingSubscription,
                alwaysBeExistingTopic
              );
            } catch (err) {
              oldResponse = err;
            }
            break;
          case EntityType.RULE:
            try {
              currResponse = await getEntity(
                entityType,
                alwaysBeExistingRule,
                alwaysBeExistingTopic,
                alwaysBeExistingSubscription
              );
            } catch (err) {
              currResponse = err;
            }
            try {
              oldResponse = await oldGetEntity(
                entityType,
                alwaysBeExistingRule,
                alwaysBeExistingTopic,
                alwaysBeExistingSubscription
              );
            } catch (err) {
              oldResponse = err;
            }
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
        // should.equal(response.error, undefined, "Error must be undefined");
        // Error is undefined for queues, topics - but not for non-existent subscriptions and rules

        assertDeepEqualAtomResponses(currResponse, oldResponse.result, ["_response"]);
      });

      it(`Deletes a non-existent ${entityType} entity returns an error`, async () => {
        let currResponse;
        let oldResponse: any;
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            try {
              currResponse = await deleteEntity(entityType, "notexisting");
            } catch (err) {
              currResponse = err;
            }

            oldResponse = await oldDeleteEntity(entityType, "notexisting");

            break;

          case EntityType.SUBSCRIPTION:
            try {
              currResponse = await deleteEntity(entityType, "notexisting", alwaysBeExistingTopic);
            } catch (err) {
              currResponse = err;
            }

            oldResponse = await oldDeleteEntity(entityType, "notexisting", alwaysBeExistingTopic);

            break;

          case EntityType.RULE:
            try {
              currResponse = await deleteEntity(
                entityType,
                "notexisting",
                alwaysBeExistingTopic,
                alwaysBeExistingSubscription
              );
            } catch (err) {
              currResponse = err;
            }

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

        should.equal(currResponse.statusCode, oldResponse.error.statusCode);
      });

      it(`Deletes an existent ${entityType} entity successfully`, async () => {
        let currResponse;
        let oldResponse: any;
        switch (entityType) {
          case EntityType.QUEUE:
            await createEntity(entityType, alwaysBeDeletedQueue);
            currResponse = await deleteEntity(entityType, alwaysBeDeletedQueue);
            await createEntity(entityType, alwaysBeDeletedQueue);
            oldResponse = await oldDeleteEntity(entityType, alwaysBeDeletedQueue);
            break;

          case EntityType.TOPIC:
            await createEntity(entityType, alwaysBeDeletedTopic);
            currResponse = await deleteEntity(entityType, alwaysBeDeletedTopic);
            await createEntity(entityType, alwaysBeDeletedTopic);
            oldResponse = await oldDeleteEntity(entityType, alwaysBeDeletedTopic);
            break;

          case EntityType.SUBSCRIPTION:
            await createEntity(entityType, alwaysBeDeletedSubscription, alwaysBeExistingTopic);
            currResponse = await deleteEntity(
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
            currResponse = await deleteEntity(
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

        should.equal(currResponse._response.status, oldResponse.response.statusCode);
      });

      it(`Get on non-existent ${entityType} entity returns empty response`, async () => {
        let currResponse;
        let oldResponse: any;
        let skipTest = false;
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            currResponse = await getEntity(entityType, "notexisting");
            oldResponse = await oldGetEntity(entityType, "notexisting");
            break;

          case EntityType.SUBSCRIPTION:
            skipTest = true;
            // response = await getEntity(entityType, "notexisting", alwaysBeExistingTopic);
            // oldResponse = await oldGetEntity(entityType, "notexisting", alwaysBeExistingTopic);
            break;

          case EntityType.RULE:
            skipTest = true;
            // response = await getEntity(
            //   entityType,
            //   "notexisting",
            //   alwaysBeExistingTopic,
            //   alwaysBeExistingSubscription
            // );
            // oldResponse = await oldGetEntity(
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
          should.equal(Array.isArray(currResponse), true, "Result is array for empty get requests");
          should.equal(currResponse.length, 0, "Array must be empty");
          assertDeepEqualAtomResponses(currResponse, oldResponse.result, ["_response"]);
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
): Promise<any> {
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
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.deleteQueue(entityPath, function(err: Error, response: any) {
          try {
            let res: any = {};
            res.error = err;
            res.result = [];
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
        olderAzureSbService.deleteSubscription(topicPath, entityPath, function(
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
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.listQueues({ top: 10 }, function(
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
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse: any = await new Promise((resolve, reject) => {
        olderAzureSbService.listTopics({ top: 10 }, function(
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
    "message",
    "error"
  ];
  additionalPropertiesToExclude.forEach((item) => propertiesToExclude.push(item));
  assert.deepEqualExcludingEvery(actual, expected, propertiesToExclude);
}
