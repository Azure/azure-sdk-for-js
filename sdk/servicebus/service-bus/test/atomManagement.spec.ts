// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode, parseConnectionString } from "@azure/core-amqp";
import { PageSettings } from "@azure/core-paging";
import { DefaultAzureCredential } from "@azure/identity";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";
import * as dotenv from "dotenv";
import { QueueProperties } from "../src/serializers/queueResourceSerializer";
import { RuleProperties } from "../src/serializers/ruleResourceSerializer";
import { SubscriptionProperties } from "../src/serializers/subscriptionResourceSerializer";
import { TopicProperties } from "../src/serializers/topicResourceSerializer";
import { ServiceBusManagementClient } from "../src/serviceBusAtomManagementClient";
import { EntityStatus } from "../src/util/utils";
import { EnvVarNames, getEnvVars } from "./utils/envVarUtils";
import { recreateQueue, recreateSubscription, recreateTopic } from "./utils/managementUtils";
import { EntityNames } from "./utils/testUtils";

chai.use(chaiAsPromised);
chai.use(chaiExclude);
const should = chai.should();
const assert = chai.assert;

dotenv.config();

const env = getEnvVars();

const serviceBusAtomManagementClient: ServiceBusManagementClient = new ServiceBusManagementClient(
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

describe("Atom management - Namespace", function(): void {
  it("Get namespace properties", async () => {
    const namespaceProperties = await serviceBusAtomManagementClient.getNamespaceProperties();
    assert.deepEqualExcluding(
      namespaceProperties,
      { messagingSku: "Standard", namespaceType: "Messaging", messagingUnits: undefined } as any,
      ["_response", "createdAt", "updatedAt", "name"]
    );
  });
});

describe("Listing methods - PagedAsyncIterableIterator", function(): void {
  const baseName = "random";
  const queueNames: string[] = [];
  const topicNames: string[] = [];
  const subscriptionNames: string[] = [];
  const ruleNames: string[] = [];
  const numberOfEntities = 5;

  before(async () => {
    await recreateTopic(managementTopic1);
    await recreateSubscription(managementTopic1, managementSubscription1);
    for (let i = 0; i < numberOfEntities; i++) {
      queueNames.push(
        (await serviceBusAtomManagementClient.createQueue(baseName + "_queue_" + i)).name
      );
      topicNames.push(
        (await serviceBusAtomManagementClient.createTopic(baseName + "_topic_" + i)).name
      );
      subscriptionNames.push(
        (
          await serviceBusAtomManagementClient.createSubscription(
            managementTopic1,
            baseName + "_subscription_" + i
          )
        ).subscriptionName
      );
      ruleNames.push(
        (
          await serviceBusAtomManagementClient.createRule(
            managementTopic1,
            managementSubscription1,
            { name: baseName + "_rule_" + i }
          )
        ).name
      );
    }
  });

  after(async () => {
    for (let i = 0; i < numberOfEntities; i++) {
      await serviceBusAtomManagementClient.deleteQueue(baseName + "_queue_" + i);
      await serviceBusAtomManagementClient.deleteTopic(baseName + "_topic_" + i);
    }
    await serviceBusAtomManagementClient.deleteTopic(managementTopic1);
  });

  function verifyEntities(methodName: string, receivedNames: string[]) {
    let createdNames: string[];
    if (methodName.includes("Queue")) {
      createdNames = queueNames;
    } else if (methodName.includes("Topic")) {
      createdNames = topicNames;
    } else if (methodName.includes("Subscription")) {
      createdNames = subscriptionNames;
    } else {
      createdNames = ruleNames;
    }
    const numberOfReceived = receivedNames.length;
    createdNames.forEach((createdName) => {
      receivedNames = receivedNames.filter((receivedName) => createdName !== receivedName);
    });
    should.equal(
      numberOfReceived,
      receivedNames.length + createdNames.length,
      "Unexpected number of entities received"
    );
  }

  [
    "listQueues",
    "listQueuesRuntimeProperties",
    "listTopics",
    "listTopicsRuntimeProperties",
    "listSubscriptions",
    "listSubscriptionsRuntimeProperties",
    "listRules"
  ].forEach((methodName) => {
    describe(`${methodName}`, () => {
      function getIter() {
        let iterator;
        if (methodName.includes("Subscription")) {
          iterator = (serviceBusAtomManagementClient as any)[methodName](managementTopic1);
        } else if (methodName.includes("Rule")) {
          iterator = (serviceBusAtomManagementClient as any)[methodName](
            managementTopic1,
            managementSubscription1
          );
        } else if (methodName.includes("Queue") || methodName.includes("Topic")) {
          iterator = (serviceBusAtomManagementClient as any)[methodName]();
        } else {
          throw new Error("Invalid methodName");
        }
        return iterator;
      }

      it("Verify PagedAsyncIterableIterator", async () => {
        const receivedEntities = [];
        let iter = getIter();
        for await (const entity of iter) {
          receivedEntities.push(
            methodName.includes("Subscription") ? entity.subscriptionName : entity.name
          );
        }
        verifyEntities(methodName, receivedEntities);
      });

      it("Verify PagedAsyncIterableIterator(byPage())", async () => {
        const receivedEntities = [];
        let iter = getIter().byPage({
          maxPageSize: 2
        });
        for await (const response of iter) {
          for (const entity of response) {
            receivedEntities.push(
              methodName.includes("Subscription") ? entity.subscriptionName : entity.name
            );
          }
        }
        verifyEntities(methodName, receivedEntities);
      });

      it("Verify PagedAsyncIterableIterator(byPage() - continuationToken)", async () => {
        const receivedEntities = [];
        let iterator = getIter().byPage({ maxPageSize: 2 });
        let response = await iterator.next();
        // Prints 2 entity names
        if (!response.done) {
          for (const entity of response.value) {
            receivedEntities.push(
              methodName.includes("Subscription") ? entity.subscriptionName : entity.name
            );
          }
        }

        // Gets next marker
        let marker = response.value.continuationToken;
        // Passing next marker as continuationToken
        iterator = getIter().byPage({
          continuationToken: marker,
          maxPageSize: 5
        });
        response = await iterator.next();
        // Gets up to 5 entity names
        if (!response.done) {
          for (const entity of response.value) {
            receivedEntities.push(
              methodName.includes("Subscription") ? entity.subscriptionName : entity.name
            );
          }
        }
        marker = response.value.continuationToken;

        // In case the namespace has too many entities and the newly created entities were not recovered
        if (marker) {
          for await (const response of getIter().byPage({
            continuationToken: marker
          })) {
            for (const entity of response) {
              receivedEntities.push(
                methodName.includes("Subscription") ? entity.subscriptionName : entity.name
              );
            }
          }
        }
        verifyEntities(methodName, receivedEntities);
      });

      [2, "-1", [], null].forEach((token) => {
        it(`Validate continuationToken ${token} - PagedAsyncIterableIterator(byPage())`, async () => {
          const settings: PageSettings = { continuationToken: token as string };
          let errorWasThrown = false;
          try {
            getIter().byPage(settings);
          } catch (error) {
            errorWasThrown = true;
            should.equal(
              error.message,
              `Invalid continuationToken ${token} provided`,
              "Unexpected error message"
            );
          }
          should.equal(errorWasThrown, true, "Error was not thrown");
        });
      });
    });
  });
});

describe("Atom management - Authentication", function(): void {
  if (isNode) {
    it("Token credential - DefaultAzureCredential from `@azure/identity`", async () => {
      const endpoint = (parseConnectionString(env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]) as any)
        .Endpoint;
      const host = endpoint.match(".*://([^/]*)")[1];

      const serviceBusManagementClient = new ServiceBusManagementClient(
        host,
        new DefaultAzureCredential()
      );

      should.equal(
        (await serviceBusManagementClient.createQueue(managementQueue1)).name,
        managementQueue1,
        "Unexpected queue name in the createQueue response"
      );
      const createQueue2Response = await serviceBusManagementClient.createQueue({
        name: managementQueue2,
        forwardTo: managementQueue1
      });
      should.equal(
        createQueue2Response.name,
        managementQueue2,
        "Unexpected queue name in the createQueue response"
      );
      should.equal(
        createQueue2Response.forwardTo,
        endpoint + managementQueue1,
        "Unexpected name in the `forwardTo` field of createQueue response"
      );
      const getQueueResponse = await serviceBusManagementClient.getQueue(managementQueue1);
      should.equal(
        getQueueResponse.name,
        managementQueue1,
        "Unexpected queue name in the getQueue response"
      );
      should.equal(
        (await serviceBusManagementClient.updateQueue(getQueueResponse)).name,
        managementQueue1,
        "Unexpected queue name in the updateQueue response"
      );
      should.equal(
        (await serviceBusManagementClient.getQueueRuntimeProperties(managementQueue1)).name,
        managementQueue1,
        "Unexpected queue name in the getQueueRuntimeProperties response"
      );
      should.equal(
        (await serviceBusManagementClient.getNamespaceProperties()).name,
        host.match("(.*).servicebus.windows.net")[1],
        "Unexpected namespace name in the getNamespaceProperties response"
      );
      await serviceBusManagementClient.deleteQueue(managementQueue1);
      await serviceBusManagementClient.deleteQueue(managementQueue2);
    });
  }
});

[EntityType.QUEUE, EntityType.TOPIC, EntityType.SUBSCRIPTION, EntityType.RULE].forEach(
  (entityType) => {
    describe(`Atom management - List on "${entityType}" entities`, function(): void {
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
  describe(`Atom management - Get on "${testCase.entityType}" entities`, function(): void {
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
        response[testCase.entityType === EntityType.SUBSCRIPTION ? "subscriptionName" : "name"],
        testCase.alwaysBeExistingEntity,
        "Entity name mismatch"
      );
    });
  });
});

[
  {
    entityType: EntityType.QUEUE,
    alwaysBeExistingEntity: managementQueue1,
    output: {
      sizeInBytes: 0,
      totalMessageCount: 0,
      activeMessageCount: 0,
      deadLetterMessageCount: 0,
      scheduledMessageCount: 0,
      transferMessageCount: 0,
      transferDeadLetterMessageCount: 0,
      name: managementQueue1
    }
  },
  {
    entityType: EntityType.TOPIC,
    alwaysBeExistingEntity: managementTopic1,
    output: {
      sizeInBytes: 0,
      subscriptionCount: 0,
      scheduledMessageCount: 0,
      name: managementTopic1
    }
  },
  {
    entityType: EntityType.SUBSCRIPTION,
    alwaysBeExistingEntity: managementSubscription1,
    output: {
      totalMessageCount: 0,
      activeMessageCount: 0,
      deadLetterMessageCount: 0,
      transferMessageCount: 0,
      transferDeadLetterMessageCount: 0,
      topicName: managementTopic1,
      subscriptionName: managementSubscription1
    }
  }
].forEach((testCase) => {
  describe(`Atom management - Get runtime info on "${testCase.entityType}" entity`, function(): void {
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
          await deleteEntity(EntityType.TOPIC, managementTopic1);
          break;

        default:
          throw new Error("TestError: Unrecognized EntityType");
      }
    });

    it(`Gets runtime info for an existing ${testCase.entityType} entity(single) successfully`, async () => {
      const response = await getEntityRuntimeProperties(
        testCase.entityType,
        testCase.alwaysBeExistingEntity,
        managementTopic1
      );
      should.equal(
        response[testCase.entityType === EntityType.SUBSCRIPTION ? "subscriptionName" : "name"],
        testCase.alwaysBeExistingEntity,
        "Entity name mismatch"
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

[
  {
    entityType: EntityType.QUEUE,
    1: {
      alwaysBeExistingEntity: managementQueue1,
      output: {
        sizeInBytes: 0,
        totalMessageCount: 0,
        activeMessageCount: 0,
        deadLetterMessageCount: 0,
        scheduledMessageCount: 0,
        transferMessageCount: 0,
        transferDeadLetterMessageCount: 0,
        name: managementQueue1
      }
    },
    2: {
      alwaysBeExistingEntity: managementQueue2,
      output: {
        sizeInBytes: 0,
        totalMessageCount: 0,
        activeMessageCount: 0,
        deadLetterMessageCount: 0,
        scheduledMessageCount: 0,
        transferMessageCount: 0,
        transferDeadLetterMessageCount: 0,
        name: managementQueue2
      }
    }
  },
  {
    entityType: EntityType.TOPIC,
    1: {
      alwaysBeExistingEntity: managementTopic1,
      output: {
        sizeInBytes: 0,
        subscriptionCount: 0,
        scheduledMessageCount: 0,
        name: managementTopic1
      }
    },
    2: {
      alwaysBeExistingEntity: managementTopic2,
      output: {
        sizeInBytes: 0,
        subscriptionCount: 0,
        scheduledMessageCount: 0,
        name: managementTopic2
      }
    }
  },
  {
    entityType: EntityType.SUBSCRIPTION,
    1: {
      alwaysBeExistingEntity: managementSubscription1,
      output: {
        totalMessageCount: 0,
        activeMessageCount: 0,
        deadLetterMessageCount: 0,
        transferMessageCount: 0,
        transferDeadLetterMessageCount: 0,
        topicName: managementTopic1,
        subscriptionName: managementSubscription1
      }
    },
    2: {
      alwaysBeExistingEntity: managementSubscription2,
      output: {
        totalMessageCount: 0,
        activeMessageCount: 0,
        deadLetterMessageCount: 0,
        transferMessageCount: 0,
        transferDeadLetterMessageCount: 0,
        topicName: managementTopic1,
        subscriptionName: managementSubscription2
      }
    }
  }
].forEach((testCase) => {
  describe(`Atom management - Get runtime info on "${testCase.entityType}" entities`, function(): void {
    beforeEach(async () => {
      switch (testCase.entityType) {
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

        default:
          throw new Error("TestError: Unrecognized EntityType");
      }
    });

    afterEach(async () => {
      switch (testCase.entityType) {
        case EntityType.QUEUE:
          await deleteEntity(EntityType.QUEUE, managementQueue1);
          await deleteEntity(EntityType.QUEUE, managementQueue2);
          break;

        case EntityType.TOPIC:
          await deleteEntity(EntityType.TOPIC, managementTopic1);
          await deleteEntity(EntityType.TOPIC, managementTopic2);
          break;

        case EntityType.SUBSCRIPTION:
          await deleteEntity(EntityType.TOPIC, managementTopic1);
          break;

        default:
          throw new Error("TestError: Unrecognized EntityType");
      }
    });

    it(`Gets runtime info for existing ${testCase.entityType} entities(multiple) successfully`, async () => {
      const response = await getEntitiesRuntimeProperties(testCase.entityType, managementTopic1);
      const name = testCase.entityType === EntityType.SUBSCRIPTION ? "subscriptionName" : "name";
      const paramsToExclude = ["createdAt", "accessedAt", "updatedAt"];
      for (const info of response) {
        if (info[name] == testCase[1].alwaysBeExistingEntity) {
          assert.deepEqualExcluding(info, testCase[1].output, paramsToExclude);
        } else if (info[name] == testCase[2].alwaysBeExistingEntity) {
          assert.deepEqualExcluding(info, testCase[2].output, paramsToExclude);
        }
      }
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
  }
].forEach((testCase) => {
  describe(`Atom management - "${testCase.entityType}" exists`, function(): void {
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
          await deleteEntity(EntityType.TOPIC, managementTopic1);
          break;

        default:
          throw new Error("TestError: Unrecognized EntityType");
      }
    });

    it(`Returns true for an existing ${testCase.entityType} entity`, async () => {
      should.equal(
        await entityExists(testCase.entityType, testCase.alwaysBeExistingEntity, managementTopic1),
        true,
        "Returned `false` for an existing entity"
      );
    });

    it(`Returns false for a non-existing ${testCase.entityType} entity`, async () => {
      should.equal(
        await entityExists(testCase.entityType, "non-existing-entity-name", managementTopic1),
        false,
        "Returned `true` for a non-existing entity"
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
  describe(`Atom management - Update on "${testCase.entityType}" entities`, function(): void {
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
        response[testCase.entityType === EntityType.SUBSCRIPTION ? "subscriptionName" : "name"],
        testCase.alwaysBeExistingEntity,
        "Entity name mismatch"
      );
    });
  });
});

[EntityType.QUEUE, EntityType.TOPIC, EntityType.SUBSCRIPTION, EntityType.RULE].forEach(
  (entityType) => {
    describe(`Atom management - Delete on "${entityType}" entities`, function(): void {
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
  describe(`Atom management - Create on "${testCase.entityType}" entities`, function(): void {
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
    describe(`Atom management - CRUD on non-existent entities for type "${entityType}"`, function(): void {
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
          response[entityType === EntityType.SUBSCRIPTION ? "subscriptionName" : "name"],
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
      defaultMessageTtl: "P10675199DT2H48M5.4775807S",
      duplicateDetectionHistoryTimeWindow: "PT10M",
      enableBatchedOperations: true,
      enablePartitioning: false,
      maxSizeInMegabytes: 1024,
      userMetadata: undefined,
      requiresDuplicateDetection: false,
      status: "Active",
      supportOrdering: true,
      name: managementTopic1
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
      enablePartitioning: true,
      maxSizeInMegabytes: 16384,
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      authorizationRules: undefined,
      userMetadata: "test metadata",
      name: managementTopic1
    }
  }
].forEach((testCase) => {
  describe(`createTopic() using different variations to the input parameter "topicOptions"`, function(): void {
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

      should.equal(response.name, managementTopic1, "Topic name mismatch");
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
      deadLetteringOnMessageExpiration: false,
      deadLetteringOnFilterEvaluationExceptions: true,
      defaultMessageTtl: "P10675199DT2H48M5.4775807S",
      forwardDeadLetteredMessagesTo: undefined,
      enableBatchedOperations: true,
      forwardTo: undefined,
      userMetadata: undefined,
      lockDuration: "PT1M",
      maxDeliveryCount: 10,
      requiresSession: false,
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
      forwardTo: undefined,
      userMetadata: "test metadata",
      status: "ReceiveDisabled",

      subscriptionName: managementSubscription1,
      topicName: managementTopic1
    }
  }
].forEach((testCase) => {
  describe(`createSubscription() using different variations to the input parameter "subscriptionOptions"`, function(): void {
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
        "createdAt",
        "updatedAt",
        "accessedAt"
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
  describe(`createSubscription() using different variations to message forwarding related parameters in "subscriptionOptions"`, function(): void {
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
      deadLetteringOnMessageExpiration: false,
      defaultMessageTtl: "P10675199DT2H48M5.4775807S",
      duplicateDetectionHistoryTimeWindow: "PT10M",
      enableBatchedOperations: true,
      enablePartitioning: false,
      forwardDeadLetteredMessagesTo: undefined,
      lockDuration: "PT1M",
      maxDeliveryCount: 10,
      maxSizeInMegabytes: 1024,
      name: managementQueue1,
      requiresDuplicateDetection: false,
      requiresSession: false,
      status: "Active",
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
      forwardDeadLetteredMessagesTo: undefined,
      forwardTo: undefined,
      userMetadata: "test metadata",

      status: "ReceiveDisabled",
      name: managementQueue1
    }
  }
].forEach((testCase) => {
  describe(`createQueue() using different variations to the input parameter "queueOptions"`, function(): void {
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

      should.equal(response.name, managementQueue1, "Queue name mismatch");

      assert.deepEqualExcluding(response, testCase.output, [
        "_response",
        "createdAt",
        "updatedAt",
        "accessedAt"
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
  describe(`createQueue() using different variations to message forwarding related parameters in "queueOptions"`, function(): void {
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
      name: managementRule1
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
      name: managementRule1
    }
  },
  {
    testCaseTitle: "Correlation Filter rule options",
    input: {
      filter: {
        correlationId: "abcd",
        properties: {
          randomState: "WA",
          randomCountry: "US",
          randomCount: 25,
          randomBool: true
        }
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
        properties: {
          randomState: "WA",
          randomCountry: "US",
          randomCount: 25,
          randomBool: true
        }
      },
      action: {
        sqlExpression: "SET sys.label='GREEN'",
        requiresPreprocessing: false,
        sqlParameters: undefined,
        compatibilityLevel: 20
      },
      name: managementRule1
    }
  }
].forEach((testCase) => {
  describe(`createRule() using different variations to the input parameter "ruleOptions"`, function(): void {
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
      should.equal(response.name, managementRule1, "Rule name mismatch");
      assert.deepEqualExcluding(response, testCase.output, [
        "_response",
        "createdAt",
        "updatedAt",
        "accessedAt"
      ]);
    });
  });
});

// Queue tests
[
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
      status: "ReceiveDisabled",
      enablePartitioning: true,
      name: managementQueue1
    }
  }
].forEach((testCase) => {
  describe(`updateQueue() using different variations to the input parameter "queueOptions"`, function(): void {
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
          "createdAt",
          "updatedAt",
          "accessedAt"
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
      name: managementQueue1
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
  describe(`updateQueue() using different variations to message forwarding related parameters in "queueOptions"`, function(): void {
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
      requiresDuplicateDetection: false,
      defaultMessageTtl: "P1D",
      duplicateDetectionHistoryTimeWindow: "PT2M",
      autoDeleteOnIdle: "PT2H",
      supportOrdering: true,
      maxSizeInMegabytes: 3072,
      enableBatchedOperations: true,
      enablePartitioning: false,
      authorizationRules: undefined,
      status: "SendDisabled",
      userMetadata: "test metadata",
      name: managementTopic1
    }
  }
].forEach((testCase) => {
  describe(`updateTopic() using different variations to the input parameter "topicOptions"`, function(): void {
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
          "createdAt",
          "updatedAt",
          "accessedAt"
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
      requiresSession: false,
      userMetadata: "test metadata",
      status: "ReceiveDisabled",
      subscriptionName: managementSubscription1,
      topicName: managementTopic1
    }
  }
].forEach((testCase) => {
  describe(`updateSubscription() using different variations to the input parameter "subscriptionOptions"`, function(): void {
    beforeEach(async () => {
      await recreateTopic(managementTopic1);
      await recreateSubscription(managementTopic1, managementSubscription1);
    });

    afterEach(async () => {
      await deleteEntity(EntityType.TOPIC, managementTopic1);
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
          "createdAt",
          "updatedAt",
          "accessedAt"
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
  describe(`updateSubscription() using different variations to message forwarding related parameters in "subscriptionOptions"`, function(): void {
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

      name: managementRule1
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
        properties: undefined
      },
      action: {
        sqlExpression: "SET sys.label='RED'",
        requiresPreprocessing: false,
        sqlParameters: undefined,
        compatibilityLevel: 20
      },

      name: managementRule1
    }
  }
].forEach((testCase) => {
  describe(`updateRule() using different variations to the input parameter "ruleOptions"`, function(): void {
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
          "createdAt",
          "updatedAt",
          "accessedAt"
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
  queueOptions?: Omit<QueueProperties, "name">,
  topicOptions?: Omit<TopicProperties, "name">,
  subscriptionOptions?: Omit<SubscriptionProperties, "topicName" | "subscriptionName">,
  ruleOptions?: Omit<RuleProperties, "name">
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
      const queueResponse = await serviceBusAtomManagementClient.createQueue({
        name: entityPath,
        ...queueOptions
      });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.createTopic({
        name: entityPath,
        ...topicOptions
      });
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient.createSubscription({
        topicName: topicPath,
        subscriptionName: entityPath,
        ...subscriptionOptions
      });
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
        { name: entityPath, ...ruleOptions }
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

async function getEntityRuntimeProperties(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.getQueueRuntimeProperties(
        entityPath
      );
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.getTopicRuntimeProperties(
        entityPath
      );
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient.getSubscriptionRuntimeProperties(
        topicPath,
        entityPath
      );
      return subscriptionResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}

async function getEntitiesRuntimeProperties(
  testEntityType: EntityType,
  topicPath?: string
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient["getQueuesRuntimeProperties"]();
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient["getTopicsRuntimeProperties"]();
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient[
        "getSubscriptionsRuntimeProperties"
      ](topicPath);
      return subscriptionResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}

async function entityExists(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient.queueExists(entityPath);
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient.topicExists(entityPath);
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient.subscriptionExists(
        topicPath,
        entityPath
      );
      return subscriptionResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}

async function updateEntity(
  testEntityType: EntityType,
  entityPath: string,
  topicPath?: string,
  subscriptionPath?: string,
  overrideOptions?: boolean, // If this is false, then the default options will be populated as used for basic testing.
  queueOptions?: Omit<QueueProperties, "name">,
  topicOptions?: Omit<TopicProperties, "name">,
  subscriptionOptions?: Omit<SubscriptionProperties, "topicName" | "subscriptionName">,
  ruleOptions?: Omit<RuleProperties, "name">
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
      const getQueueResponse = await serviceBusAtomManagementClient.getQueue(entityPath);
      const queueResponse = await serviceBusAtomManagementClient.updateQueue({
        ...getQueueResponse,
        ...queueOptions
      });
      return queueResponse;
    case EntityType.TOPIC:
      const getTopicResponse = await serviceBusAtomManagementClient.getTopic(entityPath);
      const topicResponse = await serviceBusAtomManagementClient.updateTopic({
        ...getTopicResponse,
        ...topicOptions
      });
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const getSubscriptionResponse = await serviceBusAtomManagementClient.getSubscription(
        topicPath,
        entityPath
      );
      const subscriptionResponse = await serviceBusAtomManagementClient.updateSubscription({
        ...getSubscriptionResponse,
        ...subscriptionOptions
      });
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
        {
          name: entityPath,
          ...ruleOptions
        }
      );
      return ruleResponse;
  }
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
  maxCount?: number
): Promise<any> {
  switch (testEntityType) {
    case EntityType.QUEUE:
      const queueResponse = await serviceBusAtomManagementClient["getQueues"]({
        skip,
        maxCount
      });
      return queueResponse;
    case EntityType.TOPIC:
      const topicResponse = await serviceBusAtomManagementClient["getTopics"]({
        skip,
        maxCount
      });
      return topicResponse;
    case EntityType.SUBSCRIPTION:
      if (!topicPath) {
        throw new Error(
          "TestError: Topic path must be passed when invoking tests on subscriptions"
        );
      }
      const subscriptionResponse = await serviceBusAtomManagementClient[
        "getSubscriptions"
      ](topicPath, { skip, maxCount });
      return subscriptionResponse;
    case EntityType.RULE:
      if (!topicPath || !subscriptionPath) {
        throw new Error(
          "TestError: Topic path AND subscription path must be passed when invoking tests on rules"
        );
      }
      const ruleResponse = await serviceBusAtomManagementClient["getRules"](
        topicPath,
        subscriptionPath,
        { skip, maxCount }
      );
      return ruleResponse;
  }
  throw new Error("TestError: Unrecognized EntityType");
}
