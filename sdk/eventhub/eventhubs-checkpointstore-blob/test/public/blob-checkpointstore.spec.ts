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
import { BlobCheckpointStore } from "../src";
import { ContainerClient, RestError } from "@azure/storage-blob";
import { PartitionOwnership, Checkpoint, EventHubConsumerClient } from "@azure/event-hubs";
import { Guid } from "guid-typescript";
import { parseIntOrThrow } from "../src/blobCheckpointStore";
import { fail } from "assert";
const env = getEnvVars();

describe("Blob Checkpoint Store", function(): void {
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
    const checkpointStore = new BlobCheckpointStore(containerClient);
    const listOwnership = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    should.equal(listOwnership.length, 0);
  });

  // these errors happen when we have multiple consumers starting up
  // at the same time and load balancing amongst themselves. This is a
  // normal thing and shouldn't be reported to the user.
  it("claimOwnership ignores errors about etags", async () => {
    const checkpointStore = new BlobCheckpointStore(containerClient);

    const originalClaimedOwnerships = await checkpointStore.claimOwnership([
      {
        partitionId: "0",
        consumerGroup: EventHubConsumerClient.defaultConsumerGroupName,
        fullyQualifiedNamespace: "fqdn",
        eventHubName: "ehname",
        ownerId: "me"
      }
    ]);

    const originalETag = originalClaimedOwnerships[0] && originalClaimedOwnerships[0].etag;

    const newClaimedOwnerships = await checkpointStore.claimOwnership(originalClaimedOwnerships);
    newClaimedOwnerships.length.should.equal(1);

    newClaimedOwnerships[0]!.etag!.should.not.equal(originalETag);

    // we've now invalidated the previous ownership's etag so using the old etag will
    // fail.
    const shouldNotThrowButNothingWillClaim = await checkpointStore.claimOwnership([
      {
        partitionId: "0",
        consumerGroup: EventHubConsumerClient.defaultConsumerGroupName,
        fullyQualifiedNamespace: "fqdn",
        eventHubName: "ehname",
        ownerId: "me",
        etag: originalETag
      }
    ]);

    shouldNotThrowButNothingWillClaim.length.should.equal(0);
  });

  it("claimOwnership will throw if the error is NOT an outdated etag", async () => {
    const checkpointStore = new BlobCheckpointStore(containerClient);

    // now let's induce a bad failure (removing the container)
    await containerClient.delete();

    try {
      await checkpointStore.claimOwnership([
        {
          partitionId: "0",
          consumerGroup: EventHubConsumerClient.defaultConsumerGroupName,
          fullyQualifiedNamespace: "fqdn",
          eventHubName: "ehname",
          ownerId: "me"
        }
      ]);
      fail("Should have thrown an error - this isn't a normal claim collision issue");
    } catch (err) {
      (err instanceof RestError).should.be.ok;
      // 404 because the container is missing (since we deleted it up above)
      (err as RestError).statusCode!.should.equal(404);
    }
  });

  it("claimOwnership call should succeed, if it has been called for the first time", async function(): Promise<
    void
  > {
    const checkpointStore = new BlobCheckpointStore(containerClient);
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

    const partitionOwnershipArray = await checkpointStore.claimOwnership([partitionOwnership]);
    should.equal(partitionOwnershipArray.length, 1);

    const ownershipList = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );

    ownershipList.length.should.equal(1);
    ownershipList[0].ownerId.should.equal("Id1");
    ownershipList[0].partitionId.should.equal("0");
    ownershipList[0].consumerGroup.should.equal("testConsumerGroup");
    ownershipList[0].fullyQualifiedNamespace.should.equal("testNamespace.servicebus.windows.net");
    ownershipList[0].eventHubName.should.equal("testEventHub");
    ownershipList[0].lastModifiedTimeInMs!.should.not.undefined;
    ownershipList[0].etag!.should.not.undefined;

    debug(
      `LastModifiedTime: ${ownershipList[0].lastModifiedTimeInMs!}, ETag: ${ownershipList[0].etag}`
    );
  });

  it("After multiple claimOwnership calls for a single partition, listOwnership should return an array with a single PartitionOwnership for that partition.", async function(): Promise<
    void
  > {
    const checkpointStore = new BlobCheckpointStore(containerClient);
    const listOwnership = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    should.equal(listOwnership.length, 0);

    const partitionOwnership: PartitionOwnership = {
      ownerId: "Id1",
      partitionId: "0",
      consumerGroup: "testConsumerGroup",
      fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
      eventHubName: "testEventHub"
    };

    await checkpointStore.claimOwnership([partitionOwnership]);
    await checkpointStore.claimOwnership([partitionOwnership]);
    await checkpointStore.claimOwnership([partitionOwnership]);

    const ownershipList = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    ownershipList.length.should.equal(1);
    ownershipList[0].ownerId.should.equal("Id1");
    ownershipList[0].partitionId.should.equal("0");
    ownershipList[0].fullyQualifiedNamespace.should.equal("testNamespace.servicebus.windows.net");
    ownershipList[0].consumerGroup.should.equal("testConsumerGroup");
    ownershipList[0].eventHubName.should.equal("testEventHub");
    ownershipList[0].lastModifiedTimeInMs!.should.not.undefined;
    ownershipList[0].etag!.should.not.undefined;
    debug(
      `LastModifiedTime: ${ownershipList[0].lastModifiedTimeInMs!}, ETag: ${ownershipList[0].etag}`
    );
  });

  it("After multiple claimOwnership calls for multiple partition, listOwnership should return an array with a single PartitionOwnership for each partition.", async function(): Promise<
    void
  > {
    const checkpointStore = new BlobCheckpointStore(containerClient);
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
    ownershipList.length.should.equal(3);

    ownershipList[0].partitionId.should.equal("0");
    ownershipList[0].ownerId.should.equal("Id1");
    ownershipList[0].consumerGroup.should.equal("testConsumerGroup");
    ownershipList[0].fullyQualifiedNamespace.should.equal("testNamespace.servicebus.windows.net");
    ownershipList[0].eventHubName.should.equal("testEventHub");
    ownershipList[0].lastModifiedTimeInMs!.should.not.undefined;
    ownershipList[0].etag!.should.not.undefined;

    ownershipList[1].partitionId.should.equal("1");
    ownershipList[1].lastModifiedTimeInMs!.should.not.undefined;
    ownershipList[1].etag!.should.not.undefined;

    ownershipList[2].partitionId.should.equal("2");
    ownershipList[2].lastModifiedTimeInMs!.should.not.undefined;
    ownershipList[2].etag!.should.not.undefined;
  });

  describe("updateCheckpoint()", () => {
    it("updates checkpoints successfully", async () => {
      const checkpointStore = new BlobCheckpointStore(containerClient);

      const eventHubProperties = {
        fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
        eventHubName: "testEventHub",
        consumerGroup: "testConsumerGroup"
      };

      for (let i = 0; i < 3; ++i) {
        const checkpoint: Checkpoint = {
          ...eventHubProperties,
          partitionId: i.toString(),
          sequenceNumber: 100 + i,
          offset: 1023 + i
        };

        await checkpointStore.updateCheckpoint(checkpoint);
      }

      let checkpoints = await checkpointStore.listCheckpoints(
        eventHubProperties.fullyQualifiedNamespace,
        eventHubProperties.eventHubName,
        eventHubProperties.consumerGroup
      );

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

    it("creates a checkpoint where one doesn't already exist", async () => {
      const checkpointStore = new BlobCheckpointStore(containerClient);
      const eventHubProperties = {
        fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
        eventHubName: "testEventHub",
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
    });

    it("forwards errors", async () => {
      const checkpointStore = new BlobCheckpointStore(containerClient);
      const eventHubProperties = {
        fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
        eventHubName: "testEventHub",
        consumerGroup: "testConsumerGroup"
      };

      // now let's induce a bad failure (removing the container)
      await containerClient.delete();

      // Create the checkpoint to add.
      const checkpoint: Checkpoint = {
        consumerGroup: eventHubProperties.consumerGroup,
        eventHubName: eventHubProperties.eventHubName,
        fullyQualifiedNamespace: eventHubProperties.fullyQualifiedNamespace,
        offset: 0,
        partitionId: "0",
        sequenceNumber: 1
      };

      try {
        await checkpointStore.updateCheckpoint(checkpoint);
        throw new Error("Test failure");
      } catch (err) {
        err.message.should.not.equal("Test failure");
      }
    });
  });

  it("Claiming ownership with an empty owner id should be fine (ie, unclaiming)", async function(): Promise<
    void
  > {
    const checkpointStore = new BlobCheckpointStore(containerClient);
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

    const partitionOwnershipArray = await checkpointStore.claimOwnership([partitionOwnership]);
    should.equal(partitionOwnershipArray.length, 1);
    const ownershipList = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    ownershipList.length.should.equal(1);

    // and "unowning" a partition is possible to with an empty ownerId
    ownershipList[0].ownerId = "";

    let ownershipsAfterUnclaiming = await checkpointStore.claimOwnership([ownershipList[0]]);
    ownershipsAfterUnclaiming.length.should.equal(1);

    ownershipsAfterUnclaiming[0].ownerId.should.equal("");
  });

  it("ownership: attempt to retrieve incorrectly formatted blobs", async () => {
    const checkpointStore = new BlobCheckpointStore(containerClient);

    const commonData = {
      consumerGroup: "test",
      eventHubName: "test",
      fullyQualifiedNamespace: "test",
      ownerId: "test"
    };

    await checkpointStore.claimOwnership([
      {
        ...commonData,
        partitionId: "100"
      }
    ]);

    // muck with the metadata in an incompatible way
    const ownershipBlobPath = "test/test/test/ownership/100";
    const blobClient = containerClient.getBlobClient(ownershipBlobPath);
    await blobClient.setMetadata({});

    const listOwnershipPromise = checkpointStore.listOwnership(
      commonData.fullyQualifiedNamespace,
      commonData.eventHubName,
      commonData.consumerGroup
    );

    await listOwnershipPromise.should.be.rejectedWith(
      `Missing ownerid in metadata for blob test/test/test/ownership/100`
    );
  });

  it("checkpoint: attempt to retrieve incorrectly formatted blobs", async () => {
    const checkpointStore = new BlobCheckpointStore(containerClient);

    const commonData = {
      consumerGroup: "test",
      eventHubName: "test",
      fullyQualifiedNamespace: "test",
      ownerId: "test"
    };

    await checkpointStore.updateCheckpoint({
      ...commonData,
      partitionId: "100",
      sequenceNumber: 0,
      offset: 0
    });

    // muck with the metadata in an incompatible way
    const checkpointBlobPath = "test/test/test/checkpoint/100";
    const blobClient = containerClient.getBlobClient(checkpointBlobPath);
    await blobClient.setMetadata({});

    const listCheckpointsPromise = checkpointStore.listCheckpoints(
      commonData.fullyQualifiedNamespace,
      commonData.eventHubName,
      commonData.consumerGroup
    );

    await listCheckpointsPromise.should.be.rejectedWith(
      `Missing metadata property 'offset' on blob 'test/test/test/checkpoint/100`
    );
  });

  it("zero is a perfectly valid value to checkpoint with", async () => {
    const checkpointStore = new BlobCheckpointStore(containerClient);

    const commonData = {
      consumerGroup: "test",
      eventHubName: "test",
      fullyQualifiedNamespace: "test",
      ownerId: "test",
      partitionId: "0"
    };

    await checkpointStore.updateCheckpoint({
      ...commonData,
      offset: 0,
      sequenceNumber: 0
    });

    const checkpoints = await checkpointStore.listCheckpoints(
      commonData.fullyQualifiedNamespace,
      commonData.eventHubName,
      commonData.consumerGroup
    );

    checkpoints.length.should.equal(1);
    checkpoints[0].sequenceNumber.should.equal(0);
    checkpoints[0].offset.should.equal(0);
    checkpoints[0].partitionId.should.equal("0");
  });

  it("blob prefix is always lowercased for case-insensitive fields", () => {
    chai.assert.equal(
      "namespace/eventhubname/consumergroupname/ownership/",
      BlobCheckpointStore["getBlobPrefix"]({
        type: "ownership",
        fullyQualifiedNamespace: "nAmESpAce",
        eventHubName: "eVentHubNamE",
        consumerGroup: "cOnsuMerGrouPNaMe"
        // partition ID is optional
      })
    );

    chai.assert.equal(
      "namespace/eventhubname/consumergroupname/checkpoint/0",
      BlobCheckpointStore["getBlobPrefix"]({
        type: "checkpoint",
        fullyQualifiedNamespace: "nAmESpAce",
        eventHubName: "eVentHubNamE",
        consumerGroup: "cOnsuMerGrouPNaMe",
        partitionId: "0"
      })
    );
  });

  it("parseIntOrThrow", () => {
    parseIntOrThrow("blobname", "fieldname", "1").should.equal(1);

    should.throw(
      () => parseIntOrThrow("blobname", "fieldname", ""),
      "Failed to parse metadata property 'fieldname' on blob 'blobname' as a number"
    );
    should.throw(
      () => parseIntOrThrow("blobname", "fieldname", "hello"),
      "Failed to parse metadata property 'fieldname' on blob 'blobname' as a number"
    );

    should.throw(
      () => parseIntOrThrow("blobname", "fieldname", undefined),
      "Missing metadata property 'fieldname' on blob 'blobname'"
    );
  });
}).timeout(90000);
