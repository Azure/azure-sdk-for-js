// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import chaiString from "chai-string";
chai.use(chaiString);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:partitionPump");
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { BlobPartitionManager } from "../src";
import { ContainerClient } from "@azure/storage-blob";
import { PartitionOwnership, Checkpoint } from "@azure/event-hubs";
import { Guid } from "guid-typescript";
const env = getEnvVars();

describe("Blob Partition Manager", function(): void {
  const service = {
    storageConnectionString: env[EnvVarKeys.STORAGE_CONNECTION_STRING]
  };
  let containerClient: ContainerClient;
  before("validate environment", async function(): Promise<void> {
    should.exist(
      env[EnvVarKeys.STORAGE_CONNECTION_STRING],
      "define STORAGE_CONNECTION_STRING in your environment before running integration tests."
    );
  });

  beforeEach(async () => {
    containerClient = new ContainerClient(
      service.storageConnectionString,
      `container-${Guid.create()}`
    );
    await containerClient.create();
  });

  afterEach(async () => {
    await containerClient.delete();
  });

  it("listOwnership should return an empty array", async function(): Promise<void> {
    const partitionManager = new BlobPartitionManager(containerClient);
    const listOwnership = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    should.equal(listOwnership.length, 0);
  });

  it("claimOwnership call should succeed, if it has been called for the first time", async function(): Promise<
    void
  > {
    const partitionManager = new BlobPartitionManager(containerClient);
    const listOwnership = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    should.equal(listOwnership.length, 0);

    const partitionOwnership: PartitionOwnership = {
      ownerId: "Id1",
      partitionId: "0",
      fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
      consumerGroupName: "testConsumerGroup",
      eventHubName: "testEventHub",
      ownerLevel: 0
    };

    const partitionOwnershipArray = await partitionManager.claimOwnership([partitionOwnership]);
    should.equal(partitionOwnershipArray.length, 1);
    const ownershipList = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    ownershipList.length.should.equal(1);
    ownershipList[0].ownerId.should.equal("Id1");
    ownershipList[0].partitionId.should.equal("0");
    ownershipList[0].consumerGroupName.should.equal("testConsumerGroup");
    ownershipList[0].fullyQualifiedNamespace.should.equal("testNamespace.servicebus.windows.net");
    ownershipList[0].eventHubName.should.equal("testEventHub");
    ownershipList[0].lastModifiedTimeInMS!.should.not.undefined;
    ownershipList[0].eTag!.should.not.undefined;
    debug(
      `LastModifiedTime: ${ownershipList[0].lastModifiedTimeInMS!}, ETag: ${ownershipList[0].eTag}`
    );
  });

  it("After multiple claimOwnership calls for a single partition, listOwnership should return an array with a single PartitionOwnership for that partition.", async function(): Promise<
    void
  > {
    const partitionManager = new BlobPartitionManager(containerClient);
    const listOwnership = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    should.equal(listOwnership.length, 0);

    const partitionOwnership: PartitionOwnership = {
      ownerId: "Id1",
      partitionId: "0",
      consumerGroupName: "testConsumerGroup",
      fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
      eventHubName: "testEventHub",
      ownerLevel: 0
    };

    await partitionManager.claimOwnership([partitionOwnership]);
    await partitionManager.claimOwnership([partitionOwnership]);
    await partitionManager.claimOwnership([partitionOwnership]);

    const ownershipList = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    ownershipList.length.should.equal(1);
    ownershipList[0].ownerId.should.equal("Id1");
    ownershipList[0].partitionId.should.equal("0");
    ownershipList[0].fullyQualifiedNamespace.should.equal("testNamespace.servicebus.windows.net");
    ownershipList[0].consumerGroupName.should.equal("testConsumerGroup");
    ownershipList[0].eventHubName.should.equal("testEventHub");
    ownershipList[0].lastModifiedTimeInMS!.should.not.undefined;
    ownershipList[0].eTag!.should.not.undefined;
    debug(
      `LastModifiedTime: ${ownershipList[0].lastModifiedTimeInMS!}, ETag: ${ownershipList[0].eTag}`
    );
  });

  it("After multiple claimOwnership calls for multiple partition, listOwnership should return an array with a single PartitionOwnership for each partition.", async function(): Promise<
    void
  > {
    const partitionManager = new BlobPartitionManager(containerClient);
    const listOwnership = await partitionManager.listOwnership(
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
        consumerGroupName: "testConsumerGroup",
        eventHubName: "testEventHub",
        ownerLevel: 0
      };
      partitionOwnershipArray.push(partitionOwnership);
    }

    await partitionManager.claimOwnership([partitionOwnershipArray[0]]);
    await partitionManager.claimOwnership([partitionOwnershipArray[1]]);
    await partitionManager.claimOwnership([partitionOwnershipArray[2]]);

    const ownershipList = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    ownershipList.length.should.equal(3);

    ownershipList[0].partitionId.should.equal("0");
    ownershipList[0].ownerId.should.equal("Id1");
    ownershipList[0].consumerGroupName.should.equal("testConsumerGroup");
    ownershipList[0].fullyQualifiedNamespace.should.equal("testNamespace.servicebus.windows.net");
    ownershipList[0].eventHubName.should.equal("testEventHub");
    ownershipList[0].lastModifiedTimeInMS!.should.not.undefined;
    ownershipList[0].eTag!.should.not.undefined;

    ownershipList[1].partitionId.should.equal("1");
    ownershipList[1].lastModifiedTimeInMS!.should.not.undefined;
    ownershipList[1].eTag!.should.not.undefined;

    ownershipList[2].partitionId.should.equal("2");
    ownershipList[2].lastModifiedTimeInMS!.should.not.undefined;
    ownershipList[2].eTag!.should.not.undefined;
  });

  it("updateCheckpoint on a partition with the correct ownerId should update the checkpoint.", async function(): Promise<
    void
  > {
    const partitionManager = new BlobPartitionManager(containerClient);
    const listOwnership = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    should.equal(listOwnership.length, 0);

    const partitionOwnership: PartitionOwnership = {
      ownerId: "Id1",
      partitionId: "0",
      fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
      consumerGroupName: "testConsumerGroup",
      eventHubName: "testEventHub",
      ownerLevel: 0
    };

    const partitionOwnershipArray = await partitionManager.claimOwnership([partitionOwnership]);
    should.equal(partitionOwnershipArray.length, 1);
    const ownershipList = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    ownershipList.length.should.equal(1);
    ownershipList[0].ownerId.should.equal("Id1");
    ownershipList[0].partitionId.should.equal("0");
    ownershipList[0].fullyQualifiedNamespace.should.equal("testNamespace.servicebus.windows.net");
    ownershipList[0].consumerGroupName.should.equal("testConsumerGroup");
    ownershipList[0].eventHubName.should.equal("testEventHub");
    ownershipList[0].lastModifiedTimeInMS!.should.not.undefined;
    ownershipList[0].eTag!.should.not.undefined;

    const checkpoint: Checkpoint = {
      fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
      eventHubName: "testEventHub",
      consumerGroupName: "testConsumerGroup",
      ownerId: "Id1",
      partitionId: "0",
      sequenceNumber: 100,
      offset: 1023,
      eTag: ownershipList[0].eTag!
    };

    await partitionManager.updateCheckpoint(checkpoint);
    const ownershipArray = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    ownershipArray.length.should.equal(1);
    ownershipArray[0].ownerId.should.equal("Id1");
    ownershipArray[0].partitionId.should.equal("0");
    ownershipArray[0].fullyQualifiedNamespace.should.equal("testNamespace.servicebus.windows.net");
    ownershipArray[0].consumerGroupName.should.equal("testConsumerGroup");
    ownershipArray[0].eventHubName.should.equal("testEventHub");
    ownershipArray[0].sequenceNumber!.should.equal(100);
    ownershipArray[0].offset!.should.equal(1023);
    ownershipArray[0].eTag!.should.not.undefined;
    ownershipArray[0].eTag!.should.not.equal(ownershipList[0].eTag!);
    ownershipArray[0].lastModifiedTimeInMS!.should.not.undefined;
  });

  it("updateCheckpoint on a partition with the incorrect ownerId should throw an error.", async function(): Promise<
    void
  > {
    const partitionManager = new BlobPartitionManager(containerClient);
    const listOwnership = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    should.equal(listOwnership.length, 0);

    const partitionOwnership: PartitionOwnership = {
      ownerId: "Id1",
      partitionId: "0",
      fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
      consumerGroupName: "testConsumerGroup",
      eventHubName: "testEventHub",
      ownerLevel: 0
    };

    const partitionOwnershipArray = await partitionManager.claimOwnership([partitionOwnership]);
    should.equal(partitionOwnershipArray.length, 1);
    const ownershipList = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    ownershipList.length.should.equal(1);

    const checkpoint: Checkpoint = {
      fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
      eventHubName: "testEventHub",
      consumerGroupName: "testConsumerGroup",
      ownerId: "Id2",
      partitionId: "0",
      sequenceNumber: 100,
      offset: 1023,
      eTag: ownershipList[0].eTag!
    };

    await partitionManager.updateCheckpoint(checkpoint).catch((err) => {
      debug("Error occurred while updating checkpoint", err);
      should.exist(err);
      err.message.should.match(/.*ownerId: \[Id2\] doesn\'t match with stored ownerId: \[Id1\].*/);
    });
  });

  it("updateCheckpoint on a partition that has not been claimed should throw an error.", async function(): Promise<
    void
  > {
    const partitionManager = new BlobPartitionManager(containerClient);
    const listOwnership = await partitionManager.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    should.equal(listOwnership.length, 0);

    const checkpoint: Checkpoint = {
      fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
      eventHubName: "testEventHub",
      consumerGroupName: "testConsumerGroup",
      ownerId: "Id2",
      partitionId: "0",
      sequenceNumber: 100,
      offset: 1023,
      eTag: "etag-123"
    };

    await partitionManager.updateCheckpoint(checkpoint).catch((err) => {
      debug("Error occurred while updating checkpoint", err);
      should.exist(err);
      err.message.should.match(/.*Error occurred while upating the checkpoint for partition*/);
    });
  });
  
  it("blob prefix is always lowercased for case-insensitive fields", () => {
    chai.assert.equal("namespace/eventhubname/consumergroupname/", BlobPartitionManager["getBlobPrefix"]({
      fullyQualifiedNamespace: "nAmESpAce",
      eventHubName: 'eVentHubNamE',
      consumerGroupName: 'cOnsuMerGrouPNaMe',      
      // partition ID is optional
    }));

    chai.assert.equal("namespace/eventhubname/consumergroupname/0", BlobPartitionManager["getBlobPrefix"]({
      fullyQualifiedNamespace: "nAmESpAce",
      eventHubName: 'eVentHubNamE',
      consumerGroupName: 'cOnsuMerGrouPNaMe',      
      partitionId: "0"
    }));
  });
}).timeout(90000);
