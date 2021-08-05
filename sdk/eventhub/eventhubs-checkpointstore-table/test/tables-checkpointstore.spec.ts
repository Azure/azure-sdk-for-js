// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import chai from "chai";
import * as dotenv from "dotenv";
const should = chai.should();
import { TableCheckpointStore } from "../src";
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:partitionPump");
import { Checkpoint, PartitionOwnership } from "@azure/event-hubs";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { TableServiceClient, AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
import { CheckpointEntity, PartitionOwnershipEntity } from "../src/tableCheckpointStore";

const env = getEnvVars();
dotenv.config();

/* test to show that test framework is set up well */
describe("TableCheckpointStore", () => {
  it("is exported from the package", () => {
    should.exist(TableCheckpointStore, "Expected TableCheckpointStore to be exported.");
  });
});

const service = {
  storageConnectionString: env[EnvVarKeys.STORAGE_CONNECTION_STRING],
  storageAccountName: env[EnvVarKeys.STORAGE_ACCOUNT_NAME],
  storageAccountKey: env[EnvVarKeys.STORAGE_ACCOUNT_KEY],
  tableName: env[EnvVarKeys.TABLENAME]
};

const credential = new AzureNamedKeyCredential(
  service.storageAccountName,
  service.storageAccountKey
);
const serviceClient = new TableServiceClient(
  `https://${service.storageAccountName}.table.core.windows.net`,
  credential
);

describe("TableCheckpointStore", function(): void {
  let client: TableClient;
  let tableName: string;

  describe("Runs tests on table with no entities", function() {
    tableName = `table${new Date().getTime()}`;
    beforeEach("creating table", async () => {
      await serviceClient.createTable(tableName);
    });

    client = new TableClient(
      `https://${service.storageAccountName}.table.core.windows.net`,
      tableName,
      credential
    );

    afterEach(async () => {
      await serviceClient.deleteTable(tableName);
    });

    describe("listOwnership", function() {
      it("listOwnership should return an empty array", async function(): Promise<void> {
        const checkpointStore = new TableCheckpointStore(client);
        const listOwnership = await checkpointStore.listOwnership(
          "test.servicebus.windows.net",
          "testHub",
          "testConsumerGroup"
        );
        should.equal(listOwnership.length, 0);
      });
    });

    describe("Runs tests on a populated table", function() {
      beforeEach("creating table", async () => {
        tableName = `table${new Date().getTime()}`;
        client = new TableClient(
          `https://${service.storageAccountName}.table.core.windows.net`,
          tableName,
          credential
        );
        await serviceClient.createTable(tableName);
        const namespaceArray = [
          "red.servicebus.windows.net",
          "blue.servicebus.windows.net",
          "green.servicebus.windows.net"
        ];
        const eventHubArray = ["redHub", "blueHub", "greenHub"];
        const consumerConst = "$default";
        /* Checkpoint */
        for (let i = 0; i < 3; ++i) {
          const checkpoint_entity: CheckpointEntity = {
            partitionKey: `${namespaceArray[i]} ${eventHubArray[i]} ${consumerConst} Checkpoint`,
            rowKey: i.toString(),
            sequencenumber: (100 + i).toString(),
            offset: (1023 + i).toString()
          };
          await client.createEntity(checkpoint_entity);
        }

        /* Ownership */
        for (let i = 0; i < 3; ++i) {
          const ownership_entity: PartitionOwnershipEntity = {
            partitionKey: `${namespaceArray[i]} ${eventHubArray[i]} ${consumerConst} Ownership`,
            rowKey: i.toString(),
            ownerid: "Id" + i
          };
          await client.createEntity(ownership_entity);
        }
      });

      afterEach(async () => {
        await serviceClient.deleteTable(tableName);
      });

      describe("listOwnership", function() {
        it("listOwnership should print an array of ownerships", async function() {
          const checkpointStore = new TableCheckpointStore(client);
          const listOwnership = await checkpointStore.listOwnership(
            "blue.servicebus.windows.net",
            "blueHub",
            "$default"
          );
          console.log(listOwnership);
        });

        describe("listCheckpoints", function() {
          it("listCheckpoints should print out an array of checkpoints", async function() {
            const checkpointStore = new TableCheckpointStore(client);
            const listCheckpoint = await checkpointStore.listCheckpoints(
              "green.servicebus.windows.net",
              "greenHub",
              "$default"
            );
            console.log(listCheckpoint);
          });
        });

        describe("claimOwnership", function() {
          // these errors happen when we have multiple consumers starting up
          // at the same time and load balancing amongst themselves. This is a
          // normal thing and shouldn't be reported to the user.

          it("claimOwnership ignores errors about etags", async () => {
            const checkpointStore = new TableCheckpointStore(client);
            const listOwnership = await checkpointStore.listOwnership(
              "blue.servicebus.windows.net",
              "blueHub",
              "$default"
            );

            const originalClaimedOwnerships = await checkpointStore.claimOwnership([
              listOwnership[0]
            ]);

            const originalETag = originalClaimedOwnerships[0].etag;

            console.log(originalClaimedOwnerships);
            console.log(listOwnership[0]);

            const newClaimedOwnerships = await checkpointStore.claimOwnership(
              originalClaimedOwnerships
            );
            console.log(newClaimedOwnerships);
            newClaimedOwnerships.length.should.equal(1);

            newClaimedOwnerships.length.should.equal(1);
            newClaimedOwnerships[0]!.etag!.should.not.equal(originalETag);

            // we've now invalidated the previous ownership's etag so using the old etag will fail

            const shouldNotThrowButNothingWillClaim = await checkpointStore.claimOwnership([
              {
                partitionId: "1",
                consumerGroup: "$default",
                fullyQualifiedNamespace: "blue.servicebus.windows.net",
                eventHubName: "blueHub",
                ownerId: "Id" + 0,
                etag: originalETag
              }
            ]);

            shouldNotThrowButNothingWillClaim.length.should.equal(0);
          });
          it("claimOwnership call should succeed, if it has been called for the first time", async function(): Promise<
            void
          > {
            const checkpointStore = new TableCheckpointStore(client);
            const listOwnership = await checkpointStore.listOwnership(
              "testNamespace.servicebus.windows.net",
              "testEventHub",
              "testConsumerGroup"
            );
            should.equal(listOwnership.length, 0);

            const partitionOwnership: PartitionOwnership = {
              ownerId: "Id1",
              partitionId: "0",
              fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
              consumerGroup: "testConsumerGroup",
              eventHubName: "testEventHub"
            };
            const partitionOwnershipArray = await checkpointStore.claimOwnership([
              partitionOwnership
            ]);
            should.equal(partitionOwnershipArray.length, 1);

            const ownershipList = await checkpointStore.listOwnership(
              "testNamespace.servicebus.windows.net",
              "testEventHub",
              "testConsumerGroup"
            );

            should.equal(ownershipList.length, 1, "Unexpected number of ownerships in list.");
            should.equal(
              ownershipList[0].ownerId,
              "Id1",
              "The 1st ownership item has the wrong ownerId."
            );
            should.equal(
              ownershipList[0].consumerGroup,
              "testConsumerGroup",
              "The 1st ownership item has the wrong consumerGroup."
            );
            should.equal(
              ownershipList[0].fullyQualifiedNamespace,
              "testNamespace.servicebus.windows.net",
              "The 1st fullyQualifiedNamespace item has the wrong fullyQualifiedNamespace."
            );
            should.equal(
              ownershipList[0].eventHubName,
              "testEventHub",
              "The 1st ownership item has the wrong eventHubName."
            );
            should.equal(
              ownershipList[0].partitionId,
              "0",
              "The 1st ownership item has the wrong partitionId."
            );
            should.exist(
              ownershipList[0].lastModifiedTimeInMs,
              "lastModifiedTimeInMs should exist."
            );
            should.exist(ownershipList[0].etag, "etag should exist.");
            debug(
              `LastModifiedTime: ${ownershipList[0].lastModifiedTimeInMs!}, ETag: ${
                ownershipList[0].etag
              }`
            );
          });
          it("After multiple claimOwnership calls for a single partition, listOwnership should return an array with a single PartitionOwnership for that partition.", async function(): Promise<
            void
          > {
            const checkpointStore = new TableCheckpointStore(client);
            const listOwnership = await checkpointStore.listOwnership(
              "testNamespace.servicebus.windows.net",
              "testEventHub",
              "testConsumerGroup"
            );
            should.equal(listOwnership.length, 0);
            const partitionOwnershipArray: PartitionOwnership[] = [];

            for (let index = 0; index < 3; index++) {
              const partitionOwnership: PartitionOwnership = {
                ownerId: "Id1",
                partitionId: `${index}`,
                fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
                consumerGroup: "testConsumerGroup",
                eventHubName: "testEventHub"
              };
              partitionOwnershipArray.push(partitionOwnership);
            }

            await checkpointStore.claimOwnership([partitionOwnershipArray[0]]);
            await checkpointStore.claimOwnership([partitionOwnershipArray[1]]);
            await checkpointStore.claimOwnership([partitionOwnershipArray[2]]);
            const ownershipList = await checkpointStore.listOwnership(
              "testNamespace.servicebus.windows.net",
              "testEventHub",
              "testConsumerGroup"
            );
            should.equal(ownershipList.length, 3, "Unexpected number of ownerships in list.");
            should.equal(
              ownershipList[0].ownerId,
              "Id1",
              "The 1st ownership item has the wrong ownerId."
            );
            should.equal(
              ownershipList[0].consumerGroup,
              "testConsumerGroup",
              "The 1st ownership item has the wrong consumerGroup."
            );
            should.equal(
              ownershipList[0].fullyQualifiedNamespace,
              "testNamespace.servicebus.windows.net",
              "The 1st fullyQualifiedNamespace item has the wrong fullyQualifiedNamespace."
            );

            should.equal(
              ownershipList[0].eventHubName,
              "testEventHub",
              "The 1st ownership item has the wrong eventHubName."
            );
            should.equal(
              ownershipList[0].partitionId,
              "0",
              "The 1st ownership item has the wrong partitionId."
            );
            should.exist(
              ownershipList[0].lastModifiedTimeInMs,
              "lastModifiedTimeInMs should exist."
            );
            should.exist(ownershipList[0].etag, "etag should exist.");
            debug(
              `LastModifiedTime: ${ownershipList[0].lastModifiedTimeInMs!}, ETag: ${
                ownershipList[0].etag
              }`
            );
          });

          it("After multiple claimOwnership calls for multiple partition, listOwnership should return an array with a single PartitionOwnership for each partition.", async function(): Promise<
            void
          > {
            const checkpointStore = new TableCheckpointStore(client);
            const listOwnership = await checkpointStore.listOwnership(
              "testNamespace.servicebus.windows.net",
              "testEventHub",
              "testConsumerGroup"
            );
            should.equal(listOwnership.length, 0);

            const partitionOwnershipArray: PartitionOwnership[] = [];

            for (let index = 0; index < 3; index++) {
              const partitionOwnership: PartitionOwnership = {
                ownerId: "Id1",
                partitionId: `${index}`,
                fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
                consumerGroup: "testConsumerGroup",
                eventHubName: "testEventHub"
              };
              partitionOwnershipArray.push(partitionOwnership);
            }
            await checkpointStore.claimOwnership([partitionOwnershipArray[0]]);
            await checkpointStore.claimOwnership([partitionOwnershipArray[1]]);
            await checkpointStore.claimOwnership([partitionOwnershipArray[2]]);

            const ownershipList = await checkpointStore.listOwnership(
              "testNamespace.servicebus.windows.net",
              "testEventHub",
              "testConsumerGroup"
            );

            should.equal(ownershipList.length, 3, "Unexpected number of ownerships in list.");
            should.equal(
              ownershipList[0].ownerId,
              "Id1",
              "The 1st ownership item has the wrong ownerId."
            );
            should.equal(
              ownershipList[0].consumerGroup,
              "testConsumerGroup",
              "The 1st ownership item has the wrong consumerGroup."
            );

            should.equal(
              ownershipList[0].fullyQualifiedNamespace,
              "testNamespace.servicebus.windows.net",
              "The 1st fullyQualifiedNamespace item has the wrong fullyQualifiedNamespace."
            );
            should.equal(
              ownershipList[0].eventHubName,
              "testEventHub",
              "The 1st ownership item has the wrong eventHubName."
            );
            should.equal(
              ownershipList[0].eventHubName,
              "testEventHub",
              "The 1st ownership item has the wrong eventHubName."
            );
            should.equal(
              ownershipList[0].partitionId,
              "0",
              "The 1st ownership item has the wrong partitionId."
            );
            should.exist(
              ownershipList[0].lastModifiedTimeInMs,
              "lastModifiedTimeInMs should exist."
            );
            should.exist(ownershipList[0].etag, "etag should exist.");

            should.equal(
              ownershipList[1].partitionId,
              "1",
              "The 2nd ownership item has the wrong partitionId."
            );
            should.exist(
              ownershipList[1].lastModifiedTimeInMs,
              "lastModifiedTimeInMs should exist."
            );
            should.exist(ownershipList[1].etag, "etag should exist.");

            should.equal(
              ownershipList[2].partitionId,
              "2",
              "The 3rd ownership item has the wrong partitionId."
            );
            should.exist(
              ownershipList[2].lastModifiedTimeInMs,
              "lastModifiedTimeInMs should exist."
            );
            should.exist(ownershipList[2].etag, "etag should exist.");
          });
        });
      });

      describe("updateCheckpoint", function() {
        it("updates checkpoints successfully", async () => {
          const checkpointStore = new TableCheckpointStore(client);
          const eventHubProperties = {
            fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
            eventHubName: "testEventHub",
            consumerGroup: "testConsumerGroup"
          };
          let i = 0;
          while (i < 3) {
            const checkpoint: Checkpoint = {
              ...eventHubProperties,
              partitionId: i.toString(),
              sequenceNumber: 100 + i,
              offset: 1023 + i
            };
            await checkpointStore.updateCheckpoint(checkpoint);
            i++;
          }

          let checkpoints = await checkpointStore.listCheckpoints(
            eventHubProperties.fullyQualifiedNamespace,
            eventHubProperties.eventHubName,
            eventHubProperties.consumerGroup
          );
          console.log(checkpoints);
          checkpoints.length.should.equal(3);
          checkpoints.sort((a, b) => a.partitionId.localeCompare(b.partitionId));

          for (i = 0; i < 3; ++i) {
            const checkpoint = checkpoints[i];

            checkpoint.partitionId.should.equal(i.toString());
            checkpoint.fullyQualifiedNamespace.should.equal("testNamespace.servicebus.windows.net");
            checkpoint.consumerGroup.should.equal("testConsumerGroup");
            checkpoint.eventHubName.should.equal("testEventHub");
            checkpoint.sequenceNumber!.should.equal(100 + i);
            checkpoint.offset!.should.equal(1023 + i);

            // now update it
            checkpoint.offset++;
            checkpoint.sequenceNumber++;

            await checkpointStore.updateCheckpoint(checkpoint);
          }
          checkpoints = await checkpointStore.listCheckpoints(
            eventHubProperties.fullyQualifiedNamespace,
            eventHubProperties.eventHubName,
            eventHubProperties.consumerGroup
          );
          console.log(checkpoints);
          checkpoints.length.should.equal(3);
          checkpoints.sort((a, b) => a.partitionId.localeCompare(b.partitionId));
          for (i = 0; i < 3; ++i) {
            const checkpoint = checkpoints[i];

            checkpoint.partitionId.should.equal(i.toString());
            checkpoint.fullyQualifiedNamespace.should.equal("testNamespace.servicebus.windows.net");
            checkpoint.consumerGroup.should.equal("testConsumerGroup");
            checkpoint.eventHubName.should.equal("testEventHub");
            checkpoint.sequenceNumber!.should.equal(100 + i + 1);
            checkpoint.offset!.should.equal(1023 + i + 1);
          }
        });

        it("creates a checkpoint where one doesn't already exist", async () => {
          const checkpointStore = new TableCheckpointStore(client);
          const eventHubProperties = {
            fullyQualifiedNamespace: "pink.servicebus.windows.net",
            eventHubName: "pinkHub",
            consumerGroup: "testConsumerGroup"
          };
          // Ensure that there aren't any checkpoints.
          let checkpoints = await checkpointStore.listCheckpoints(
            eventHubProperties.fullyQualifiedNamespace,
            eventHubProperties.eventHubName,
            eventHubProperties.consumerGroup
          );
          checkpoints.length.should.equal(0);
          // Create the checkpoint to add.
          const checkpoint: Checkpoint = {
            consumerGroup: eventHubProperties.consumerGroup,
            eventHubName: eventHubProperties.eventHubName,
            fullyQualifiedNamespace: eventHubProperties.fullyQualifiedNamespace,
            offset: 0,
            partitionId: "0",
            sequenceNumber: 1
          };

          await checkpointStore.updateCheckpoint(checkpoint);
          // Ensure that there is a checkpoint.
          checkpoints = await checkpointStore.listCheckpoints(
            eventHubProperties.fullyQualifiedNamespace,
            eventHubProperties.eventHubName,
            eventHubProperties.consumerGroup
          );

          checkpoints.length.should.equal(1);
          console.log(checkpoints);
        });
      });
    });
  });
});
