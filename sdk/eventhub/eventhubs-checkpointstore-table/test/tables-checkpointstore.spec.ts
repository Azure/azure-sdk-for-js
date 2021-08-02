// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import chai from "chai";
import * as dotenv from "dotenv";
const should = chai.should();
import { TableCheckpointStore } from "../src";
import { Checkpoint } from "@azure/event-hubs";


import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { TableServiceClient, AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
import { CustomCheckpoint, CustomPartition } from "../src/tableCheckpointStore";

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
  let table_name: string;

  describe("Runs tests on table with no entities", function() {
    table_name = `table${new Date().getTime()}`;
    beforeEach("creating table", async () => {
      
      await serviceClient.createTable(table_name);
    });

    const client = new TableClient(
      `https://${service.storageAccountName}.table.core.windows.net`,
      table_name,
      credential
    );

    afterEach(async () => {
      await serviceClient.deleteTable(table_name);
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
  });

  describe("Runs tests on a populated table", function() {
    beforeEach("creating table", async () => {
      table_name = `table${new Date().getTime()}`;
      client = new TableClient(
        `https://${service.storageAccountName}.table.core.windows.net`,
        table_name,
        credential
      );
      await serviceClient.createTable(table_name);
      const namespaceArray = [
        "red.servicebus.windows.net",
        "blue.servicebus.windows.net",
        "green.servicebus.windows.net"
      ];
      const eventHubArray = ["redHub", "blueHub", "greenHub"];
      /*Checkpoint*/
      const checkpoint_entity: CustomCheckpoint = {
        partitionKey: "0",
        rowKey: "0",
        consumerGroup: "$default",
        fullyQualifiedNamespace: "",
        eventHubName: "",
        sequenceNumber: 0,
        offset: 0,
        partitionId: "0"
      };
      for (let i = 0; i < 3; ++i) {
        checkpoint_entity.fullyQualifiedNamespace = namespaceArray[i];
        checkpoint_entity.eventHubName = eventHubArray[i];
        checkpoint_entity.sequenceNumber = 100 + i;
        checkpoint_entity.partitionId = i.toString();
        checkpoint_entity.rowKey = checkpoint_entity.partitionId;
        checkpoint_entity.partitionKey =
          checkpoint_entity.eventHubName +
          " " +
          checkpoint_entity.fullyQualifiedNamespace +
          " " +
          checkpoint_entity.consumerGroup +
          " " +
          "Checkpoint";
        checkpoint_entity.offset = 1023 + i;
        await client.createEntity(checkpoint_entity);
      }

      /*Ownership*/
      const ownership_entity: CustomPartition = {
        partitionKey: "",
        rowKey: "",
        consumerGroup: "$default",
        fullyQualifiedNamespace: "",
        eventHubName: "",
        partitionId: "",
        ownerId: "",
        lastModifiedTimeInMs: 0
      };

      for (let i = 0; i < 3; ++i) {
        ownership_entity.fullyQualifiedNamespace = namespaceArray[i];
        ownership_entity.eventHubName = eventHubArray[i];
        ownership_entity.partitionId = i.toString();
        ownership_entity.rowKey = ownership_entity.partitionId;
        ownership_entity.partitionKey =
          ownership_entity.eventHubName +
          " " +
          ownership_entity.fullyQualifiedNamespace +
          " " +
          ownership_entity.consumerGroup +
          " " +
          "Ownership";
        ownership_entity.ownerId = "Id" + i;
        

        await client.createEntity(ownership_entity);
      }
    });

    afterEach(async () => {
      await serviceClient.deleteTable(table_name);
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

          for (let i = 0; i < 3; ++i) {
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
          for (let i = 0; i < 3; ++i) {
            const checkpoint = checkpoints[i];

            checkpoint.partitionId.should.equal(i.toString());
            checkpoint.fullyQualifiedNamespace.should.equal("testNamespace.servicebus.windows.net");
            checkpoint.consumerGroup.should.equal("testConsumerGroup");
            checkpoint.eventHubName.should.equal("testEventHub");
            checkpoint.sequenceNumber!.should.equal(100 + i + 1);
            checkpoint.offset!.should.equal(1023 + i + 1);
          }
        });
      });
    });
  });
});
