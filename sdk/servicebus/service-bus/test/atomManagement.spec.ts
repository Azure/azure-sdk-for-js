// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { QueueOptions } from "../src/serializers/queueResourceSerializer";
import { TopicOptions } from "../src/serializers/topicResourceSerializer";
import { SubscriptionOptions } from "../src/serializers/subscriptionResourceSerializer";
import { RuleOptions } from "../src/serializers/ruleResourceSerializer";
import { EntityStatus } from "../src/util/utils";
import { ServiceBusAtomManagementClient } from "../src/serviceBusAtomManagementClient";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";
chai.use(chaiAsPromised);
chai.use(chaiExclude);
const should = chai.should();
const assert = chai.assert;

import * as dotenv from "dotenv";
dotenv.config();

import { EnvVarNames, getEnvVars } from "./utils/envVarUtils";
const env = getEnvVars();

import { EntityNames } from "./utils/testUtils";

import { parseConnectionString } from "@azure/core-amqp";
import { recreateQueue, recreateTopic, recreateSubscription } from "./utils/managementUtils";

const serviceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
  env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]
);

const endpointWithProtocol = (parseConnectionString(
  env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]
) as any).Endpoint;

enum EntityType {
  QUEUE = "Queue",
  TOPIC = "Topic",
  SUBSCRIPTION = "Subscription",
  RULE = "Rule"
}

const managementQueue1 = EntityNames.MANAGEMENT_QUEUE_1;
const managementTopic1 = EntityNames.MANAGEMENT_TOPIC_1;
const managementSubscription1 = EntityNames.MANAGEMENT_SUBSCRIPTION_1;
const managementRule1 = EntityNames.MANAGEMENT_RULE_1;

const managementQueue2 = EntityNames.MANAGEMENT_QUEUE_2;
const managementTopic2 = EntityNames.MANAGEMENT_TOPIC_2;
const managementSubscription2 = EntityNames.MANAGEMENT_SUBSCRIPTION_2;
const managementRule2 = EntityNames.MANAGEMENT_RULE_2;

const newManagementEntity1 = EntityNames.MANAGEMENT_NEW_ENTITY_1;
const newManagementEntity2 = EntityNames.MANAGEMENT_NEW_ENTITY_2;

[EntityType.QUEUE, EntityType.TOPIC, EntityType.SUBSCRIPTION, EntityType.RULE].forEach(
  (entityType) => {
    describe(`Atom management - List on "${entityType}" entities #RunInBrowser`, function(): void {
      beforeEach(async () => {
        switch (entityType) {
          case EntityType.QUEUE:
            await recreateQueue(managementQueue1);
            await recreateQueue(managementQueue2);
            break;

          case EntityType.TOPIC:
            await recreateTopic(managementTopic1);
            await recreateTopic(managementTopic2);
            break;

          case EntityType.SUBSCRIPTION:
            await recreateTopic(managementTopic1);
            await recreateSubscription(managementTopic1, managementSubscription1);
            await recreateSubscription(managementTopic1, managementSubscription2);
            break;

          case EntityType.RULE:
            await recreateTopic(managementTopic1);
            await recreateSubscription(managementTopic1, managementSubscription1);
            await createEntity(
              EntityType.RULE,
              managementRule1,
              managementTopic1,
              managementSubscription1
            );
            await createEntity(
              EntityType.RULE,
              managementRule2,
              managementTopic1,
              managementSubscription1
            );
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
      });

      afterEach(async () => {
        switch (entityType) {
          case EntityType.QUEUE:
            await deleteEntity(EntityType.QUEUE, managementQueue1);
            await deleteEntity(EntityType.QUEUE, managementQueue2);
            break;

          case EntityType.TOPIC:
            await deleteEntity(EntityType.TOPIC, managementTopic1);
            await deleteEntity(EntityType.TOPIC, managementTopic2);
            break;
          case EntityType.SUBSCRIPTION:
          case EntityType.RULE:
            await deleteEntity(EntityType.TOPIC, managementTopic1);
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
      });

      it(`List on existing entities for type ${entityType} with top 1 returns the first entity`, async () => {
        const topOneEntity = await listEntities(
          entityType,
          managementTopic1,
          managementSubscription1,
          undefined,
          1
        );

        should.equal(
          Array.isArray(topOneEntity),
          true,
          "Result must be any array for list requests"
        );
        should.equal(topOneEntity.length, 1, "Result must be an empty array");
      });

      it(`List on existing entities for type ${entityType} with skip 1 returns all entities skipping 1`, async () => {
        const allEntitiesResult = await listEntities(
          entityType,
          managementTopic1,
          managementSubscription1
        );

        const skipEntitiesResult = await listEntities(
          entityType,
          managementTopic1,
          managementSubscription1,
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
          allEntitiesResult.length - 1,
          "Result array size should be exactly 1 less than all entities"
        );
      });

      it(`Lists available ${entityType} entities successfully`, async () => {
        const response = await listEntities(entityType, managementTopic1, managementSubscription1);

        should.equal(Array.isArray(response), true, "Result must be any array for list requests");
      });
    });
  }
);

[
  {
    entityType: EntityType.QUEUE,
    alwaysBeExistingEntity: managementQueue1
  },
  {
    entityType: EntityType.TOPIC,
    alwaysBeExistingEntity: managementTopic1
  },
  {
    entityType: EntityType.SUBSCRIPTION,
    alwaysBeExistingEntity: managementSubscription1
  },
  {
    entityType: EntityType.RULE,
    alwaysBeExistingEntity: managementRule1
  }
].forEach((testCase) => {
  describe(`Atom management - Get on "${testCase.entityType}" entities #RunInBrowser`, function(): void {
    beforeEach(async () => {
      switch (testCase.entityType) {
        case EntityType.QUEUE:
          await recreateQueue(managementQueue1);
          break;

        case EntityType.TOPIC:
          await recreateTopic(managementTopic1);
          break;

        case EntityType.SUBSCRIPTION:
          await recreateTopic(managementTopic1);
          await recreateSubscription(managementTopic1, managementSubscription1);
          break;

        case EntityType.RULE:
          await recreateTopic(managementTopic1);
          await recreateSubscription(managementTopic1, managementSubscription1);
          await createEntity(
            EntityType.RULE,
            managementRule1,
            managementTopic1,
            managementSubscription1
          );
          break;
        default:
          throw new Error("TestError: Unrecognized EntityType");
      }
    });

    afterEach(async () => {
      switch (testCase.entityType) {
        case EntityType.QUEUE:
          await deleteEntity(EntityType.QUEUE, managementQueue1);
          break;

        case EntityType.TOPIC:
        case EntityType.SUBSCRIPTION:
        case EntityType.RULE:
          await deleteEntity(EntityType.TOPIC, managementTopic1);
          break;

        default:
          throw new Error("TestError: Unrecognized EntityType");
      }
    });

    it(`Gets an existent ${testCase.entityType} entity successfully`, async () => {
      const response = await getEntity(
        testCase.entityType,
        testCase.alwaysBeExistingEntity,
        managementTopic1,
        managementSubscription1
      );
      should.equal(
        response[testCase.entityType.toLowerCase() + "Name"],
        testCase.alwaysBeExistingEntity,
        "Entity name mismatch"
      );
    });
  });
});

[
  {
    entityType: EntityType.QUEUE,
    alwaysBeExistingEntity: managementQueue1
  },
  {
    entityType: EntityType.TOPIC,
    alwaysBeExistingEntity: managementTopic1
  },
  {
    entityType: EntityType.SUBSCRIPTION,
    alwaysBeExistingEntity: managementSubscription1
  },
  {
    entityType: EntityType.RULE,
    alwaysBeExistingEntity: managementRule1
  }
].forEach((testCase) => {
  describe(`Atom management - Update on "${testCase.entityType}" entities #RunInBrowser`, function(): void {
    beforeEach(async () => {
      switch (testCase.entityType) {
        case EntityType.QUEUE:
          await recreateQueue(managementQueue1);
          break;

        case EntityType.TOPIC:
          await recreateTopic(managementTopic1);
          break;

        case EntityType.SUBSCRIPTION:
          await recreateTopic(managementTopic1);
          await recreateSubscription(managementTopic1, managementSubscription1);
          break;

        case EntityType.RULE:
          await recreateTopic(managementTopic1);
          await recreateSubscription(managementTopic1, managementSubscription1);
          await createEntity(
            EntityType.RULE,
            managementRule1,
            managementTopic1,
            managementSubscription1
          );
          break;
        default:
          throw new Error("TestError: Unrecognized EntityType");
      }
    });

    afterEach(async () => {
      switch (testCase.entityType) {
        case EntityType.QUEUE:
          await deleteEntity(EntityType.QUEUE, managementQueue1);
          break;

        case EntityType.TOPIC:
        case EntityType.SUBSCRIPTION:
        case EntityType.RULE:
          await deleteEntity(EntityType.TOPIC, managementTopic1);
          break;

        default:
          throw new Error("TestError: Unrecognized EntityType");
      }
    });

    it(`Updates an existent ${testCase.entityType} entity successfully`, async () => {
      const response = await updateEntity(
        testCase.entityType,
        testCase.alwaysBeExistingEntity,
        managementTopic1,
        managementSubscription1
      );
      should.equal(
        response[testCase.entityType.toLowerCase() + "Name"],
        testCase.alwaysBeExistingEntity,
        "Entity name mismatch"
      );
    });
  });
});

[EntityType.QUEUE, EntityType.TOPIC, EntityType.SUBSCRIPTION, EntityType.RULE].forEach(
  (entityType) => {
    describe(`Atom management - Delete on "${entityType}" entities #RunInBrowser`, function(): void {
      beforeEach(async () => {
        switch (entityType) {
          case EntityType.QUEUE:
            break;

          case EntityType.TOPIC:
            break;

          case EntityType.SUBSCRIPTION:
            await recreateTopic(managementTopic1);
            break;

          case EntityType.RULE:
            await recreateTopic(managementTopic1);
            await recreateSubscription(managementTopic1, managementSubscription1);
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
      });

      afterEach(async () => {
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            break;
          case EntityType.SUBSCRIPTION:
          case EntityType.RULE:
            await deleteEntity(EntityType.TOPIC, managementTopic1);
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
      });

      it(`Deletes an existent ${entityType} entity successfully`, async () => {
        await createEntity(
          entityType,
          newManagementEntity1,
          managementTopic1,
          managementSubscription1
        );

        const response = await deleteEntity(
          entityType,
          newManagementEntity1,
          managementTopic1,
          managementSubscription1
        );

        should.equal(response._response.status, 200);
      });
    });
  }
);

[
  {
    entityType: EntityType.QUEUE,
    alwaysBeExistingEntity: managementQueue1
  },
  {
    entityType: EntityType.TOPIC,
    alwaysBeExistingEntity: managementTopic1
  },
  {
    entityType: EntityType.SUBSCRIPTION,
    alwaysBeExistingEntity: managementSubscription1
  },
  {
    entityType: EntityType.RULE,
    alwaysBeExistingEntity: managementRule1
  }
].forEach((testCase) => {
  describe(`Atom management - Create on "${testCase.entityType}" entities #RunInBrowser`, function(): void {
    beforeEach(async () => {
      switch (testCase.entityType) {
        case EntityType.QUEUE:
          await recreateQueue(managementQueue1);
          break;

        case EntityType.TOPIC:
          await recreateTopic(managementTopic1);
          break;

        case EntityType.SUBSCRIPTION:
          await recreateTopic(managementTopic1);
          await recreateSubscription(managementTopic1, managementSubscription1);
          break;

        case EntityType.RULE:
          await recreateTopic(managementTopic1);
          await recreateSubscription(managementTopic1, managementSubscription1);
          await createEntity(
            EntityType.RULE,
            managementRule1,
            managementTopic1,
            managementSubscription1
          );
          break;
        default:
          throw new Error("TestError: Unrecognized EntityType");
      }
    });

    afterEach(async () => {
      switch (testCase.entityType) {
        case EntityType.QUEUE:
          await deleteEntity(EntityType.QUEUE, managementQueue1);
          break;

        case EntityType.TOPIC:
        case EntityType.SUBSCRIPTION:
        case EntityType.RULE:
          await deleteEntity(EntityType.TOPIC, managementTopic1);
          break;

        default:
          throw new Error("TestError: Unrecognized EntityType");
      }
    });

    it(`Creating an existent ${testCase.entityType} entity throws an error`, async () => {
      let error;
      try {
        await createEntity(
          testCase.entityType,
          testCase.alwaysBeExistingEntity,
          managementTopic1,
          managementSubscription1
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
  });
});

[EntityType.QUEUE, EntityType.TOPIC, EntityType.SUBSCRIPTION, EntityType.RULE].forEach(
  (entityType) => {
    describe(`Atom management - CRUD on non-existent entities for type "${entityType}" #RunInBrowser`, function(): void {
      beforeEach(async () => {
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            break;

          case EntityType.SUBSCRIPTION:
            await recreateTopic(managementTopic1);
            break;

          case EntityType.RULE:
            await recreateTopic(managementTopic1);
            await recreateSubscription(managementTopic1, managementSubscription1);
            break;
          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
      });

      afterEach(async () => {
        switch (entityType) {
          case EntityType.QUEUE:
          case EntityType.TOPIC:
            break;

          case EntityType.SUBSCRIPTION:
          case EntityType.RULE:
            await deleteEntity(EntityType.TOPIC, managementTopic1);
            break;

          default:
            throw new Error("TestError: Unrecognized EntityType");
        }
      });

      it(`Creates a non-existent ${entityType} entity successfully`, async () => {
        const response = await createEntity(
          entityType,
          newManagementEntity2,
          managementTopic1,
          managementSubscription1
        );

        await deleteEntity(
          entityType,
          newManagementEntity2,
          managementTopic1,
          managementSubscription1
        );

        should.equal(
          response[entityType.toLowerCase() + "Name"],
          newManagementEntity2,
          "Entity name mismatch"
        );
      });

      it(`Deletes a non-existent ${entityType} entity returns an error`, async () => {
        let error;
        try {
          await deleteEntity(entityType, "notexisting", managementTopic1, managementSubscription1);
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

      it(`Update on non-existent ${entityType} entity throws an error`, async () => {
        let error;
        try {
          await updateEntity(entityType, "nonexisting", managementTopic1, managementSubscription1);
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
              error = await getEntity(entityType, "notexisting", managementTopic1);
            } catch (err) {
              error = err;
            }
            break;

          case EntityType.RULE:
            try {
              error = await getEntity(
                entityType,
                "notexisting",
                managementTopic1,
                managementSubscription1
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
  }
);

// Topic tests
[
  {
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
      topicName: managementTopic1
    }
  },
  {
    testCaseTitle: "all properties",
    input: {
      requiresDuplicateDetection: true,
      defaultMessageTtl: "P2D",
      deadLetteringOnMessageExpiration: true,
      duplicateDetectionHistoryTimeWindow: "PT1M",
      enableBatchedOperations: false,
      status: "SendDisabled" as EntityStatus,
      enablePartitioning: true,
      supportOrdering: false,
      userMetadata: "test metadata"
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
      userMetadata: "test metadata",
      isExpress: false,
      enableSubscriptionPartitioning: false,
      filteringMessagesBeforePublishing: false,
      messageCountDetails: undefined,
      entityAvailabilityStatus: "Available",
      isAnonymousAccessible: false,
      topicName: managementTopic1
    }
  }
].forEach((testCase) => {
  describe(`createTopic() using different variations to the input parameter "topicOptions" #RunInBrowser`, function(): void {
    afterEach(async () => {
      await deleteEntity(EntityType.TOPIC, managementTopic1);
    });
    it(`${testCase.testCaseTitle}`, async () => {
      const response = await createEntity(
        EntityType.TOPIC,
        managementTopic1,
        undefined,
        undefined,
        true,
        undefined,
        testCase.input
      );

      should.equal(response.topicName, managementTopic1, "Topic name mismatch");
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
      subscriptionName: managementSubscription1,
      topicName: managementTopic1
    }
  },
  {
    testCaseTitle: "all properties except forwardTo, forwardDeadLetteredMessagesTo",
    input: {
      lockDuration: "PT5M",
      maxDeliveryCount: 20,
      defaultMessageTtl: "P2D",
      autoDeleteOnIdle: "PT1H",
      deadLetteringOnFilterEvaluationExceptions: false,
      deadLetteringOnMessageExpiration: true,
      enableBatchedOperations: false,
      requiresSession: true,
      userMetadata: "test metadata",
      status: "ReceiveDisabled" as EntityStatus
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
      userMetadata: "test metadata",
      messageCountDetails: undefined,
      entityAvailabilityStatus: "Available",
      status: "ReceiveDisabled",

      subscriptionName: managementSubscription1,
      topicName: managementTopic1
    }
  }
].forEach((testCase) => {
  describe(`createSubscription() using different variations to the input parameter "subscriptionOptions" #RunInBrowser`, function(): void {
    beforeEach(async () => {
      await createEntity(EntityType.TOPIC, managementTopic1);
    });

    afterEach(async () => {
      await deleteEntity(EntityType.TOPIC, managementTopic1);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      const response = await createEntity(
        EntityType.SUBSCRIPTION,
        managementSubscription1,
        managementTopic1,
        undefined,
        true,
        undefined,
        undefined,
        testCase.input
      );

      should.equal(
        response.subscriptionName,
        managementSubscription1,
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

[
  {
    testCaseTitle: "pass in entity name for forwardTo and forwardDeadLetteredMessagesTo",
    input: {
      forwardDeadLetteredMessagesTo: managementQueue1,
      forwardTo: managementQueue1
    },
    output: {
      lockDuration: "PT1M",
      maxDeliveryCount: 10,
      defaultMessageTtl: "P10675199DT2H48M5.4775807S",
      deadLetteringOnFilterEvaluationExceptions: true,
      deadLetteringOnMessageExpiration: false,
      enableBatchedOperations: true,
      requiresSession: false,

      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementQueue1}`,
      forwardTo: `${endpointWithProtocol}${managementQueue1}`,
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",

      defaultRuleDescription: undefined,

      messageCount: 0,
      enablePartitioning: undefined,
      maxSizeInMegabytes: undefined,
      sizeInBytes: undefined,

      userMetadata: undefined,
      messageCountDetails: undefined,
      entityAvailabilityStatus: "Available",
      status: "Active",

      subscriptionName: managementSubscription1,
      topicName: managementTopic1
    }
  },
  {
    testCaseTitle: "pass in absolute URI for forwardTo and forwardDeadLetteredMessagesTo",
    input: {
      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementQueue1}`.toUpperCase(),
      forwardTo: `${endpointWithProtocol}${managementQueue1}`.toUpperCase()
    },
    output: {
      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementQueue1.toUpperCase()}`,
      forwardTo: `${endpointWithProtocol}${managementQueue1.toUpperCase()}`
    }
  }
].forEach((testCase) => {
  describe(`createSubscription() using different variations to message forwarding related parameters in "subscriptionOptions" #RunInBrowser`, function(): void {
    beforeEach(async () => {
      await recreateQueue(managementQueue1);
      await recreateTopic(managementTopic1);
    });

    afterEach(async () => {
      await deleteEntity(EntityType.TOPIC, managementTopic1);
      await deleteEntity(EntityType.QUEUE, managementQueue1);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      const response = await createEntity(
        EntityType.SUBSCRIPTION,
        managementSubscription1,
        managementTopic1,
        undefined,
        true,
        undefined,
        undefined,
        testCase.input
      );

      should.equal(
        response.subscriptionName,
        managementSubscription1,
        "Subscription name mismatch"
      );
      should.equal(response.forwardTo, testCase.output.forwardTo, "forwardTo value mismatch");
      should.equal(
        response.forwardDeadLetteredMessagesTo,
        testCase.output.forwardDeadLetteredMessagesTo,
        "forwardDeadLetteredMessagesTo value mismatch"
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
      queueName: managementQueue1,
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
    testCaseTitle: "all properties except forwardTo, forwardDeadLetteredMessagesTo",
    input: {
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
      enablePartitioning: true,
      userMetadata: "test metadata",
      status: "ReceiveDisabled" as EntityStatus
    },
    output: {
      duplicateDetectionHistoryTimeWindow: "PT1M",
      lockDuration: "PT45S",
      messageCount: 0,
      sizeInBytes: 0,
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

      enablePartitioning: true,
      maxSizeInMegabytes: 16384,
      supportOrdering: false,

      forwardDeadLetteredMessagesTo: undefined,
      forwardTo: undefined,
      userMetadata: "test metadata",

      messageCountDetails: undefined,
      enableExpress: false,
      entityAvailabilityStatus: "Available",
      isAnonymousAccessible: false,
      status: "ReceiveDisabled",
      queueName: managementQueue1
    }
  }
].forEach((testCase) => {
  describe(`createQueue() using different variations to the input parameter "queueOptions" #RunInBrowser`, function(): void {
    afterEach(async () => {
      await deleteEntity(EntityType.QUEUE, managementQueue1);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      const response = await createEntity(
        EntityType.QUEUE,
        managementQueue1,
        undefined,
        undefined,
        true,
        testCase.input
      );

      should.equal(response.queueName, managementQueue1, "Queue name mismatch");

      assert.deepEqualExcluding(response, testCase.output, [
        "_response",
        "createdOn",
        "updatedOn",
        "accessedOn"
      ]);
    });
  });
});

[
  {
    testCaseTitle: "pass in entity name for forwardTo and forwardDeadLetteredMessagesTo",
    input: {
      forwardDeadLetteredMessagesTo: managementTopic1,
      forwardTo: managementTopic1
    },
    output: {
      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementTopic1}`,
      forwardTo: `${endpointWithProtocol}${managementTopic1}`
    }
  },
  {
    testCaseTitle: "pass in absolute URI for forwardTo and forwardDeadLetteredMessagesTo",
    input: {
      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementTopic1}`,
      forwardTo: `${endpointWithProtocol}${managementTopic1}`
    },
    output: {
      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementTopic1}`,
      forwardTo: `${endpointWithProtocol}${managementTopic1}`
    }
  }
].forEach((testCase) => {
  describe(`createQueue() using different variations to message forwarding related parameters in "queueOptions" #RunInBrowser`, function(): void {
    beforeEach(async () => {
      await createEntity(EntityType.TOPIC, managementTopic1);
    });

    afterEach(async () => {
      await deleteEntity(EntityType.QUEUE, managementQueue1);
      await deleteEntity(EntityType.TOPIC, managementTopic1);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      const response = await createEntity(
        EntityType.QUEUE,
        managementQueue1,
        undefined,
        undefined,
        true,
        testCase.input
      );

      should.equal(response.forwardTo, testCase.output.forwardTo, "forwardTo value mismatch");
      should.equal(
        response.forwardDeadLetteredMessagesTo,
        testCase.output.forwardDeadLetteredMessagesTo,
        "forwardDeadLetteredMessagesTo value mismatch"
      );
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

      ruleName: managementRule1,
      subscriptionName: managementSubscription1,
      topicName: managementTopic1
    }
  },
  {
    testCaseTitle: "Sql Filter rule options",
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

      ruleName: managementRule1,
      subscriptionName: managementSubscription1,
      topicName: managementTopic1
    }
  },
  {
    testCaseTitle: "Correlation Filter rule options",
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

      ruleName: managementRule1,
      subscriptionName: managementSubscription1,
      topicName: managementTopic1
    }
  }
].forEach((testCase) => {
  describe(`createRule() using different variations to the input parameter "ruleOptions" #RunInBrowser`, function(): void {
    beforeEach(async () => {
      await recreateTopic(managementTopic1);
      await recreateSubscription(managementTopic1, managementSubscription1);
    });
    afterEach(async () => {
      await deleteEntity(EntityType.TOPIC, managementTopic1);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      const response = await createEntity(
        EntityType.RULE,
        managementRule1,
        managementTopic1,
        managementSubscription1,
        true,
        undefined,
        undefined,
        undefined,
        testCase.input
      );

      should.equal(response.ruleName, managementRule1, "Rule name mismatch");
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
    testCaseTitle: "all properties except forwardTo, forwardDeadLetteredMessagesTo",
    input: {
      lockDuration: "PT50S",
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
      userMetadata: "test metadata",
      status: "ReceiveDisabled" as EntityStatus
    },
    output: {
      duplicateDetectionHistoryTimeWindow: "PT2M",
      lockDuration: "PT50S",
      messageCount: undefined,
      sizeInBytes: undefined,
      defaultMessageTtl: "P1D",
      deadLetteringOnMessageExpiration: true,
      enableBatchedOperations: false,

      requiresDuplicateDetection: true,
      requiresSession: true,
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

      maxDeliveryCount: 5,
      maxSizeInMegabytes: 16384,

      autoDeleteOnIdle: "PT2H",
      forwardDeadLetteredMessagesTo: undefined,
      forwardTo: undefined,
      userMetadata: "test metadata",

      messageCountDetails: undefined,

      enableExpress: undefined,
      entityAvailabilityStatus: undefined,
      isAnonymousAccessible: undefined,
      supportOrdering: undefined,
      status: "ReceiveDisabled",
      enablePartitioning: true,
      queueName: managementQueue1
    }
  }
].forEach((testCase) => {
  describe(`updateQueue() using different variations to the input parameter "queueOptions" #RunInBrowser`, function(): void {
    beforeEach(async () => {
      await recreateQueue(managementQueue1, {
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
      });
    });

    afterEach(async () => {
      await deleteEntity(EntityType.QUEUE, managementQueue1);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      try {
        const response = await updateEntity(
          EntityType.QUEUE,
          managementQueue1,
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

[
  {
    testCaseTitle: "pass in entity name for forwardTo and forwardDeadLetteredMessagesTo",
    input: {
      forwardDeadLetteredMessagesTo: managementTopic1,
      forwardTo: managementTopic1
    },
    output: {
      duplicateDetectionHistoryTimeWindow: "PT1M",
      lockDuration: "PT45S",
      defaultMessageTtl: "P2D",
      deadLetteringOnMessageExpiration: true,
      enableBatchedOperations: false,

      requiresDuplicateDetection: true,
      requiresSession: true,
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

      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementTopic1}`,
      forwardTo: `${endpointWithProtocol}${managementTopic1}`,
      autoDeleteOnIdle: "PT1H",
      maxDeliveryCount: 8,
      maxSizeInMegabytes: 16384,

      messageCount: undefined,
      sizeInBytes: undefined,
      status: "Active",

      userMetadata: undefined,

      messageCountDetails: undefined,

      enableExpress: undefined,
      entityAvailabilityStatus: undefined,
      isAnonymousAccessible: undefined,
      supportOrdering: undefined,
      enablePartitioning: true,
      queueName: managementQueue1
    }
  },
  {
    testCaseTitle: "pass in absolute URI for forwardTo and forwardDeadLetteredMessagesTo",
    input: {
      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementTopic1}`,
      forwardTo: `${endpointWithProtocol}${managementTopic1}`
    },
    output: {
      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementTopic1}`,
      forwardTo: `${endpointWithProtocol}${managementTopic1}`
    }
  }
].forEach((testCase) => {
  describe(`updateQueue() using different variations to message forwarding related parameters in "queueOptions" #RunInBrowser`, function(): void {
    beforeEach(async () => {
      await recreateTopic(managementTopic1);
      await recreateQueue(managementQueue1);
    });
    afterEach(async () => {
      await deleteEntity(EntityType.QUEUE, managementQueue1);
      await deleteEntity(EntityType.QUEUE, managementTopic1);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      try {
        const response = await updateEntity(
          EntityType.QUEUE,
          managementQueue1,
          undefined,
          undefined,
          true,
          testCase.input
        );

        should.equal(response.forwardTo, testCase.output.forwardTo, "forwardTo value mismatch");
        should.equal(
          response.forwardDeadLetteredMessagesTo,
          testCase.output.forwardDeadLetteredMessagesTo,
          "forwardDeadLetteredMessagesTo value mismatch"
        );
      } catch (err) {
        checkForValidErrorScenario(err, testCase.output);
      }
    });
  });
});

// Topic tests
[
  {
    testCaseTitle: "Undefined topic options",
    input: undefined,
    output: {
      testErrorMessage: `Parameter "topicOptions" must be an object of type "TopicOptions" and cannot be undefined or null.`
    }
  },
  {
    topicName: managementTopic1,
    testCaseTitle: "all properties",
    input: {
      status: "SendDisabled" as EntityStatus,
      userMetadata: "test metadata",
      requiresDuplicateDetection: false,
      defaultMessageTtl: "P1D",
      duplicateDetectionHistoryTimeWindow: "PT2M",
      autoDeleteOnIdle: "PT2H",
      supportOrdering: true,
      maxSizeInMegabytes: 3072
    },
    output: {
      maxDeliveryCount: undefined,
      subscriptionCount: undefined,
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
      authorizationRules: undefined,
      isExpress: undefined,
      enableSubscriptionPartitioning: undefined,
      filteringMessagesBeforePublishing: undefined,
      enableExpress: undefined,
      entityAvailabilityStatus: undefined,
      isAnonymousAccessible: undefined,
      status: "SendDisabled",
      userMetadata: "test metadata",
      messageCountDetails: undefined,
      topicName: managementTopic1
    }
  }
].forEach((testCase) => {
  describe(`updateTopic() using different variations to the input parameter "topicOptions" #RunInBrowser`, function(): void {
    beforeEach(async () => {
      await recreateTopic(managementTopic1);
    });
    afterEach(async () => {
      await deleteEntity(EntityType.TOPIC, managementTopic1);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      try {
        const response = await updateEntity(
          EntityType.TOPIC,
          managementTopic1,
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
    testCaseTitle: "Undefined subscription options",
    input: undefined,
    output: {
      testErrorMessage: `Parameter "subscriptionOptions" must be an object of type "SubscriptionOptions" and cannot be undefined or null.`
    }
  },
  {
    testCaseTitle: "all properties except forwardTo, forwardDeadLetteredMessagesTo",
    input: {
      lockDuration: "PT3M",
      maxDeliveryCount: 10,
      defaultMessageTtl: "P1D",
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      deadLetteringOnFilterEvaluationExceptions: true,
      deadLetteringOnMessageExpiration: false,
      enableBatchedOperations: true,
      requiresSession: false,
      userMetadata: "test metadata",
      status: "ReceiveDisabled" as EntityStatus
    },
    output: {
      lockDuration: "PT3M",
      maxDeliveryCount: 10,
      defaultMessageTtl: "P1D",
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      deadLetteringOnFilterEvaluationExceptions: true,
      deadLetteringOnMessageExpiration: false,
      enableBatchedOperations: true,

      forwardDeadLetteredMessagesTo: undefined,
      forwardTo: undefined,
      defaultRuleDescription: undefined,

      messageCount: 0,
      maxSizeInMegabytes: undefined,
      sizeInBytes: undefined,

      requiresSession: false,
      enablePartitioning: undefined,

      userMetadata: "test metadata",
      messageCountDetails: undefined,
      entityAvailabilityStatus: "Available",
      status: "ReceiveDisabled",

      subscriptionName: managementSubscription1,
      topicName: managementTopic1
    }
  }
].forEach((testCase) => {
  describe(`updateSubscription() using different variations to the input parameter "subscriptionOptions" #RunInBrowser`, function(): void {
    beforeEach(async () => {
      await recreateQueue(managementQueue1);
      await recreateTopic(managementTopic1);
      await recreateSubscription(managementTopic1, managementSubscription1);
    });

    afterEach(async () => {
      await deleteEntity(EntityType.TOPIC, managementTopic1);
      await deleteEntity(EntityType.QUEUE, managementQueue1);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      try {
        const response = await updateEntity(
          EntityType.SUBSCRIPTION,
          managementSubscription1,
          managementTopic1,
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

[
  {
    testCaseTitle: "pass in entity name for forwardTo and forwardDeadLetteredMessagesTo",
    input: {
      forwardDeadLetteredMessagesTo: managementQueue1,
      forwardTo: managementQueue1
    },
    output: {
      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementQueue1}`,
      forwardTo: `${endpointWithProtocol}${managementQueue1}`
    }
  },
  {
    testCaseTitle: "pass in absolute URI for forwardTo and forwardDeadLetteredMessagesTo",
    input: {
      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementQueue1}`,
      forwardTo: `${endpointWithProtocol}${managementQueue1}`
    },
    output: {
      forwardDeadLetteredMessagesTo: `${endpointWithProtocol}${managementQueue1}`,
      forwardTo: `${endpointWithProtocol}${managementQueue1}`
    }
  }
].forEach((testCase) => {
  describe(`updateSubscription() using different variations to message forwarding related parameters in "subscriptionOptions" #RunInBrowser`, function(): void {
    beforeEach(async () => {
      await recreateQueue(managementQueue1);
      await recreateTopic(managementTopic1);
      await recreateSubscription(managementTopic1, managementSubscription1);
    });

    afterEach(async () => {
      await deleteEntity(EntityType.TOPIC, managementTopic1);
      await deleteEntity(EntityType.QUEUE, managementQueue1);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      try {
        const response = await updateEntity(
          EntityType.SUBSCRIPTION,
          managementSubscription1,
          managementTopic1,
          undefined,
          true,
          undefined,
          undefined,
          testCase.input
        );

        should.equal(response.forwardTo, testCase.output.forwardTo, "forwardTo value mismatch");
        should.equal(
          response.forwardDeadLetteredMessagesTo,
          testCase.output.forwardDeadLetteredMessagesTo,
          "forwardDeadLetteredMessagesTo value mismatch"
        );
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
    input: undefined,
    output: {
      testErrorMessage: `Parameter "ruleOptions" must be an object of type "RuleOptions" and cannot be undefined or null.`
    }
  },
  {
    testCaseTitle: "Sql Filter rule options",
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

      ruleName: managementRule1,
      subscriptionName: managementSubscription1,
      topicName: managementTopic1
    }
  },
  {
    testCaseTitle: "Correlation Filter rule options",
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

      ruleName: managementRule1,
      subscriptionName: managementSubscription1,
      topicName: managementTopic1
    }
  }
].forEach((testCase) => {
  describe(`updateRule() using different variations to the input parameter "ruleOptions" #RunInBrowser`, function(): void {
    beforeEach(async () => {
      await recreateTopic(managementTopic1);
      await recreateSubscription(managementTopic1, managementSubscription1);
      await createEntity(
        EntityType.RULE,
        managementRule1,
        managementTopic1,
        managementSubscription1
      );
    });

    afterEach(async () => {
      await deleteEntity(EntityType.TOPIC, managementTopic1);
    });

    it(`${testCase.testCaseTitle}`, async () => {
      try {
        const response = await updateEntity(
          EntityType.RULE,
          managementRule1,
          managementTopic1,
          managementSubscription1,
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
      const ruleResponse = await serviceBusAtomManagementClient.getRuleDetails(
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
