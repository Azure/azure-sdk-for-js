// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import debugModule from "debug";
const debug = debugModule("azure:event-hubs:partitionPump");
import { addToOffset } from "../util/testUtils.js";
import { BlobCheckpointStore } from "../../src/index.js";
import { ContainerClient } from "@azure/storage-blob";
import { PartitionOwnership, Checkpoint, EventHubConsumerClient } from "@azure/event-hubs";
import { parseIntOrThrow } from "../../src/blobCheckpointStore.js";
import { describe, it, beforeEach, afterEach } from "vitest";
import { assert, expect, should } from "../util/chai.js";
import { createContainer } from "../util/clients.js";
import { isRestError } from "@azure/core-rest-pipeline";

async function expectAbortError(promise: Promise<unknown>): Promise<void> {
  await expect(promise).to.be.rejected.then((err) => {
    expect(err).to.have.property("name").and.equal("AbortError");
    return err;
  });
}

describe("Blob Checkpoint Store", function () {
  let containerClient: ContainerClient;

  beforeEach(async function () {
    containerClient = createContainer().container;
    await containerClient.create();
  });

  afterEach(async function () {
    await containerClient.delete();
  });

  describe("listOwnership", function () {
    it("supports cancellation via abortSignal", async function () {
      const checkpointStore = new BlobCheckpointStore(containerClient);

      // Create an abort controller and abort it after blocking code is ran.
      const abortController = new AbortController();
      setTimeout(() => abortController.abort(), 0);
      const signal = abortController.signal;
      await expectAbortError(
        checkpointStore.listOwnership(
          "testNamespace.servicebus.windows.net",
          "testEventHub",
          "testConsumerGroup",
          {
            abortSignal: signal,
          },
        ),
      );
    });

    it("supports cancellation via abortSignal (pre-cancelled)", async function () {
      const checkpointStore = new BlobCheckpointStore(containerClient);

      // Create an abort controller and immediately abort it.
      const abortController = new AbortController();
      abortController.abort();
      const signal = abortController.signal;

      await expectAbortError(
        checkpointStore.listOwnership(
          "testNamespace.servicebus.windows.net",
          "testEventHub",
          "testConsumerGroup",
          {
            abortSignal: signal,
          },
        ),
      );
    });
  });

  it("listOwnership should return an empty array", async function () {
    const checkpointStore = new BlobCheckpointStore(containerClient);
    const listOwnership = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup",
    );
    should.equal(listOwnership.length, 0);
  });

  describe("claimOwnership", function () {
    it("supports cancellation via abortSignal", async function () {
      const checkpointStore = new BlobCheckpointStore(containerClient);

      // Create an abort controller and abort it after blocking code is ran.
      const abortController = new AbortController();
      setTimeout(() => abortController.abort(), 0);
      const signal = abortController.signal;
      await expectAbortError(
        checkpointStore.claimOwnership(
          [
            {
              partitionId: "0",
              consumerGroup: EventHubConsumerClient.defaultConsumerGroupName,
              fullyQualifiedNamespace: "fqdn",
              eventHubName: "ehname",
              ownerId: "me",
            },
          ],
          {
            abortSignal: signal,
          },
        ),
      );
    });

    it("supports cancellation via abortSignal (pre-cancelled)", async function () {
      const checkpointStore = new BlobCheckpointStore(containerClient);

      // Create an abort controller and immediately abort it.
      const abortController = new AbortController();
      abortController.abort();
      const signal = abortController.signal;
      await expectAbortError(
        checkpointStore.claimOwnership(
          [
            {
              partitionId: "0",
              consumerGroup: EventHubConsumerClient.defaultConsumerGroupName,
              fullyQualifiedNamespace: "fqdn",
              eventHubName: "ehname",
              ownerId: "me",
            },
          ],
          {
            abortSignal: signal,
          },
        ),
      );
    });
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
        ownerId: "me",
      },
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
        etag: originalETag,
      },
    ]);

    shouldNotThrowButNothingWillClaim.length.should.equal(0);
  });

  it("claimOwnership will throw if the error is NOT an outdated etag", async () => {
    const checkpointStore = new BlobCheckpointStore(containerClient);

    // now let's induce a bad failure (removing the container)
    await containerClient.delete();
    await expect(
      checkpointStore.claimOwnership([
        {
          partitionId: "0",
          consumerGroup: EventHubConsumerClient.defaultConsumerGroupName,
          fullyQualifiedNamespace: "fqdn",
          eventHubName: "ehname",
          ownerId: "me",
        },
      ]),
    ).to.be.rejected.then((err) => {
      if (!isRestError(err)) {
        assert.fail("Error is not a RestError");
      }
      // 404 because the container is missing (since we deleted it up above)
      err.statusCode!.should.equal(404);
      return err;
    });
  });

  it("claimOwnership call should succeed, if it has been called for the first time", async function () {
    const checkpointStore = new BlobCheckpointStore(containerClient);
    const listOwnership = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup",
    );
    should.equal(listOwnership.length, 0);

    const partitionOwnership: PartitionOwnership = {
      ownerId: "Id1",
      partitionId: "0",
      fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
      consumerGroup: "testConsumerGroup",
      eventHubName: "testEventHub",
    };

    const partitionOwnershipArray = await checkpointStore.claimOwnership([partitionOwnership]);
    should.equal(partitionOwnershipArray.length, 1);

    const ownershipList = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup",
    );

    should.equal(ownershipList.length, 1, "Unexpected number of ownerships in list.");
    should.equal(ownershipList[0].ownerId, "Id1", "The 1st ownership item has the wrong ownerId.");
    should.equal(
      ownershipList[0].consumerGroup,
      "testConsumerGroup",
      "The 1st ownership item has the wrong consumerGroup.",
    );
    should.equal(
      ownershipList[0].fullyQualifiedNamespace,
      "testNamespace.servicebus.windows.net",
      "The 1st fullyQualifiedNamespace item has the wrong fullyQualifiedNamespace.",
    );
    should.equal(
      ownershipList[0].eventHubName,
      "testEventHub",
      "The 1st ownership item has the wrong eventHubName.",
    );
    should.equal(
      ownershipList[0].partitionId,
      "0",
      "The 1st ownership item has the wrong partitionId.",
    );
    should.exist(ownershipList[0].lastModifiedTimeInMs, "lastModifiedTimeInMs should exist.");
    should.exist(ownershipList[0].etag, "etag should exist.");

    debug(
      `LastModifiedTime: ${ownershipList[0].lastModifiedTimeInMs!}, ETag: ${ownershipList[0].etag}`,
    );
  });

  it("After multiple claimOwnership calls for a single partition, listOwnership should return an array with a single PartitionOwnership for that partition.", async function () {
    const checkpointStore = new BlobCheckpointStore(containerClient);
    const listOwnership = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup",
    );
    should.equal(listOwnership.length, 0);

    const partitionOwnership: PartitionOwnership = {
      ownerId: "Id1",
      partitionId: "0",
      consumerGroup: "testConsumerGroup",
      fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
      eventHubName: "testEventHub",
    };

    await checkpointStore.claimOwnership([partitionOwnership]);
    await checkpointStore.claimOwnership([partitionOwnership]);
    await checkpointStore.claimOwnership([partitionOwnership]);

    const ownershipList = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup",
    );

    should.equal(ownershipList.length, 1, "Unexpected number of ownerships in list.");
    should.equal(ownershipList[0].ownerId, "Id1", "The 1st ownership item has the wrong ownerId.");
    should.equal(
      ownershipList[0].consumerGroup,
      "testConsumerGroup",
      "The 1st ownership item has the wrong consumerGroup.",
    );
    should.equal(
      ownershipList[0].fullyQualifiedNamespace,
      "testNamespace.servicebus.windows.net",
      "The 1st fullyQualifiedNamespace item has the wrong fullyQualifiedNamespace.",
    );
    should.equal(
      ownershipList[0].eventHubName,
      "testEventHub",
      "The 1st ownership item has the wrong eventHubName.",
    );
    should.equal(
      ownershipList[0].partitionId,
      "0",
      "The 1st ownership item has the wrong partitionId.",
    );
    should.exist(ownershipList[0].lastModifiedTimeInMs, "lastModifiedTimeInMs should exist.");
    should.exist(ownershipList[0].etag, "etag should exist.");
    debug(
      `LastModifiedTime: ${ownershipList[0].lastModifiedTimeInMs!}, ETag: ${ownershipList[0].etag}`,
    );
  });

  it("After multiple claimOwnership calls for multiple partition, listOwnership should return an array with a single PartitionOwnership for each partition.", async function () {
    const checkpointStore = new BlobCheckpointStore(containerClient);
    const listOwnership = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup",
    );
    should.equal(listOwnership.length, 0);

    const partitionOwnershipArray: PartitionOwnership[] = [];

    for (let index = 0; index < 3; index++) {
      const partitionOwnership: PartitionOwnership = {
        ownerId: "Id1",
        partitionId: `${index}`,
        fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
        consumerGroup: "testConsumerGroup",
        eventHubName: "testEventHub",
      };
      partitionOwnershipArray.push(partitionOwnership);
    }

    await checkpointStore.claimOwnership([partitionOwnershipArray[0]]);
    await checkpointStore.claimOwnership([partitionOwnershipArray[1]]);
    await checkpointStore.claimOwnership([partitionOwnershipArray[2]]);

    const ownershipList = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup",
    );

    should.equal(ownershipList.length, 3, "Unexpected number of ownerships in list.");

    should.equal(ownershipList[0].ownerId, "Id1", "The 1st ownership item has the wrong ownerId.");
    should.equal(
      ownershipList[0].consumerGroup,
      "testConsumerGroup",
      "The 1st ownership item has the wrong consumerGroup.",
    );
    should.equal(
      ownershipList[0].fullyQualifiedNamespace,
      "testNamespace.servicebus.windows.net",
      "The 1st fullyQualifiedNamespace item has the wrong fullyQualifiedNamespace.",
    );
    should.equal(
      ownershipList[0].eventHubName,
      "testEventHub",
      "The 1st ownership item has the wrong eventHubName.",
    );
    should.equal(
      ownershipList[0].partitionId,
      "0",
      "The 1st ownership item has the wrong partitionId.",
    );
    should.exist(ownershipList[0].lastModifiedTimeInMs, "lastModifiedTimeInMs should exist.");
    should.exist(ownershipList[0].etag, "etag should exist.");

    should.equal(
      ownershipList[1].partitionId,
      "1",
      "The 2nd ownership item has the wrong partitionId.",
    );
    should.exist(ownershipList[1].lastModifiedTimeInMs, "lastModifiedTimeInMs should exist.");
    should.exist(ownershipList[1].etag, "etag should exist.");

    should.equal(
      ownershipList[2].partitionId,
      "2",
      "The 3rd ownership item has the wrong partitionId.",
    );
    should.exist(ownershipList[2].lastModifiedTimeInMs, "lastModifiedTimeInMs should exist.");
    should.exist(ownershipList[2].etag, "etag should exist.");
  });

  describe("listCheckpoints", function () {
    it("supports cancellation via abortSignal", async function () {
      const checkpointStore = new BlobCheckpointStore(containerClient);

      // Create an abort controller and abort it after blocking code is ran.
      const abortController = new AbortController();
      setTimeout(() => abortController.abort(), 0);
      const signal = abortController.signal;
      await expectAbortError(
        checkpointStore.listCheckpoints(
          "testNamespace.servicebus.windows.net",
          "testEventHub",
          "testConsumerGroup",
          {
            abortSignal: signal,
          },
        ),
      );
    });

    it("supports cancellation via abortSignal (pre-cancelled)", async function () {
      const checkpointStore = new BlobCheckpointStore(containerClient);

      // Create an abort controller and immediately abort it.
      const abortController = new AbortController();
      abortController.abort();
      const signal = abortController.signal;
      await expectAbortError(
        checkpointStore.listCheckpoints(
          "testNamespace.servicebus.windows.net",
          "testEventHub",
          "testConsumerGroup",
          {
            abortSignal: signal,
          },
        ),
      );
    });
  });

  describe("updateCheckpoint()", () => {
    it("updates checkpoints successfully", async () => {
      const checkpointStore = new BlobCheckpointStore(containerClient);

      const eventHubProperties = {
        fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
        eventHubName: "testEventHub",
        consumerGroup: "testConsumerGroup",
      };

      for (let i = 0; i < 3; ++i) {
        const checkpoint: Checkpoint = {
          ...eventHubProperties,
          partitionId: i.toString(),
          sequenceNumber: 100 + i,
          offset: `${1023 + i}`,
        };

        await checkpointStore.updateCheckpoint(checkpoint);
      }

      let checkpoints = await checkpointStore.listCheckpoints(
        eventHubProperties.fullyQualifiedNamespace,
        eventHubProperties.eventHubName,
        eventHubProperties.consumerGroup,
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
        checkpoint.offset!.should.equal(`${1023 + i}`);

        // now update it
        checkpoint.offset = addToOffset(checkpoint.offset, 1);
        checkpoint.sequenceNumber++;

        await checkpointStore.updateCheckpoint(checkpoint);
      }

      checkpoints = await checkpointStore.listCheckpoints(
        eventHubProperties.fullyQualifiedNamespace,
        eventHubProperties.eventHubName,
        eventHubProperties.consumerGroup,
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
        checkpoint.offset!.should.equal(`${1023 + i + 1}`);
      }
    });

    it("creates a checkpoint where one doesn't already exist", async () => {
      const checkpointStore = new BlobCheckpointStore(containerClient);
      const eventHubProperties = {
        fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
        eventHubName: "testEventHub",
        consumerGroup: "testConsumerGroup",
      };

      // Ensure that there aren't any checkpoints.
      let checkpoints = await checkpointStore.listCheckpoints(
        eventHubProperties.fullyQualifiedNamespace,
        eventHubProperties.eventHubName,
        eventHubProperties.consumerGroup,
      );

      checkpoints.length.should.equal(0);

      // Create the checkpoint to add.
      const checkpoint: Checkpoint = {
        consumerGroup: eventHubProperties.consumerGroup,
        eventHubName: eventHubProperties.eventHubName,
        fullyQualifiedNamespace: eventHubProperties.fullyQualifiedNamespace,
        offset: "0",
        partitionId: "0",
        sequenceNumber: 1,
      };

      await checkpointStore.updateCheckpoint(checkpoint);

      // Ensure that there is a checkpoint.
      checkpoints = await checkpointStore.listCheckpoints(
        eventHubProperties.fullyQualifiedNamespace,
        eventHubProperties.eventHubName,
        eventHubProperties.consumerGroup,
      );

      checkpoints.length.should.equal(1);
    });

    it("forwards errors", async () => {
      const checkpointStore = new BlobCheckpointStore(containerClient);
      const eventHubProperties = {
        fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
        eventHubName: "testEventHub",
        consumerGroup: "testConsumerGroup",
      };

      // now let's induce a bad failure (removing the container)
      await containerClient.delete();

      // Create the checkpoint to add.
      const checkpoint: Checkpoint = {
        consumerGroup: eventHubProperties.consumerGroup,
        eventHubName: eventHubProperties.eventHubName,
        fullyQualifiedNamespace: eventHubProperties.fullyQualifiedNamespace,
        offset: "0",
        partitionId: "0",
        sequenceNumber: 1,
      };
      await expect(checkpointStore.updateCheckpoint(checkpoint)).to.be.rejected.then((err) => {
        if (!isRestError(err)) {
          assert.fail("Error is not a RestError");
        }
        err.statusCode!.should.equal(404);
        return err;
      });
    });

    it("supports cancellation via abortSignal", async function () {
      const checkpointStore = new BlobCheckpointStore(containerClient);

      // Create an abort controller and abort it after blocking code is ran.
      const abortController = new AbortController();
      setTimeout(() => abortController.abort(), 0);
      const signal = abortController.signal;

      // Create the checkpoint to add.
      const checkpoint: Checkpoint = {
        consumerGroup: "testNamespace.servicebus.windows.net",
        eventHubName: "testEventHub",
        fullyQualifiedNamespace: "testConsumerGroup",
        offset: "0",
        partitionId: "0",
        sequenceNumber: 1,
      };
      await expectAbortError(checkpointStore.updateCheckpoint(checkpoint, { abortSignal: signal }));
    });

    it("supports cancellation via abortSignal (pre-cancelled)", async function () {
      const checkpointStore = new BlobCheckpointStore(containerClient);

      // Create an abort controller and immediately abort it.
      const abortController = new AbortController();
      abortController.abort();
      const signal = abortController.signal;

      // Create the checkpoint to add.
      const checkpoint: Checkpoint = {
        consumerGroup: "testNamespace.servicebus.windows.net",
        eventHubName: "testEventHub",
        fullyQualifiedNamespace: "testConsumerGroup",
        offset: "0",
        partitionId: "0",
        sequenceNumber: 1,
      };

      await expectAbortError(checkpointStore.updateCheckpoint(checkpoint, { abortSignal: signal }));
    });
  });

  it("Claiming ownership with an empty owner id should be fine (ie, unclaiming)", async function () {
    const checkpointStore = new BlobCheckpointStore(containerClient);
    const listOwnership = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup",
    );
    should.equal(listOwnership.length, 0);

    const partitionOwnership: PartitionOwnership = {
      ownerId: "Id1",
      partitionId: "0",
      fullyQualifiedNamespace: "testNamespace.servicebus.windows.net",
      consumerGroup: "testConsumerGroup",
      eventHubName: "testEventHub",
    };

    const partitionOwnershipArray = await checkpointStore.claimOwnership([partitionOwnership]);
    should.equal(partitionOwnershipArray.length, 1);
    const ownershipList = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup",
    );
    ownershipList.length.should.equal(1);

    // and "unowning" a partition is possible to with an empty ownerId
    ownershipList[0].ownerId = "";

    const ownershipsAfterUnclaiming = await checkpointStore.claimOwnership([ownershipList[0]]);
    ownershipsAfterUnclaiming.length.should.equal(1);

    ownershipsAfterUnclaiming[0].ownerId.should.equal("");
  });

  it("ownership: attempt to retrieve incorrectly formatted blobs", async () => {
    const checkpointStore = new BlobCheckpointStore(containerClient);

    const commonData = {
      consumerGroup: "test",
      eventHubName: "test",
      fullyQualifiedNamespace: "test",
      ownerId: "test",
    };

    await checkpointStore.claimOwnership([
      {
        ...commonData,
        partitionId: "100",
      },
    ]);

    // muck with the metadata in an incompatible way
    const ownershipBlobPath = "test/test/test/ownership/100";
    const blobClient = containerClient.getBlobClient(ownershipBlobPath);
    await blobClient.setMetadata({});

    const listOwnershipPromise = checkpointStore.listOwnership(
      commonData.fullyQualifiedNamespace,
      commonData.eventHubName,
      commonData.consumerGroup,
    );

    await listOwnershipPromise.should.be.rejectedWith(
      `Missing ownerid in metadata for blob test/test/test/ownership/100`,
    );
  });

  it("checkpoint: attempt to retrieve incorrectly formatted blobs", async () => {
    const checkpointStore = new BlobCheckpointStore(containerClient);

    const commonData = {
      consumerGroup: "test",
      eventHubName: "test",
      fullyQualifiedNamespace: "test",
      ownerId: "test",
    };

    await checkpointStore.updateCheckpoint({
      ...commonData,
      partitionId: "100",
      sequenceNumber: 0,
      offset: "0",
    });

    // muck with the metadata in an incompatible way
    const checkpointBlobPath = "test/test/test/checkpoint/100";
    const blobClient = containerClient.getBlobClient(checkpointBlobPath);
    await blobClient.setMetadata({});

    await expect(
      checkpointStore.listCheckpoints(
        commonData.fullyQualifiedNamespace,
        commonData.eventHubName,
        commonData.consumerGroup,
      ),
    ).to.be.rejected.then((err) => {
      expect(err.message).to.equal(
        `Missing metadata property 'offset' on blob '${checkpointBlobPath}'`,
      );
      return err;
    });
  });

  it("zero is a perfectly valid value to checkpoint with", async () => {
    const checkpointStore = new BlobCheckpointStore(containerClient);

    const commonData = {
      consumerGroup: "test",
      eventHubName: "test",
      fullyQualifiedNamespace: "test",
      ownerId: "test",
      partitionId: "0",
    };

    await checkpointStore.updateCheckpoint({
      ...commonData,
      offset: "0",
      sequenceNumber: 0,
    });

    const checkpoints = await checkpointStore.listCheckpoints(
      commonData.fullyQualifiedNamespace,
      commonData.eventHubName,
      commonData.consumerGroup,
    );

    checkpoints.length.should.equal(1);
    checkpoints[0].sequenceNumber.should.equal(0);
    checkpoints[0].offset.should.equal("0");
    checkpoints[0].partitionId.should.equal("0");
  });

  it("blob prefix is always lowercased for case-insensitive fields", () => {
    assert.equal(
      "namespace/eventhubname/consumergroupname/ownership/",
      BlobCheckpointStore["getBlobPrefix"]({
        type: "ownership",
        fullyQualifiedNamespace: "nAmESpAce",
        eventHubName: "eVentHubNamE",
        consumerGroup: "cOnsuMerGrouPNaMe",
        // partition ID is optional
      }),
    );

    assert.equal(
      "namespace/eventhubname/consumergroupname/checkpoint/0",
      BlobCheckpointStore["getBlobPrefix"]({
        type: "checkpoint",
        fullyQualifiedNamespace: "nAmESpAce",
        eventHubName: "eVentHubNamE",
        consumerGroup: "cOnsuMerGrouPNaMe",
        partitionId: "0",
      }),
    );
  });

  it("parseIntOrThrow", () => {
    parseIntOrThrow("blobname", "fieldname", "1").should.equal(1);

    should.throw(
      () => parseIntOrThrow("blobname", "fieldname", ""),
      "Failed to parse metadata property 'fieldname' on blob 'blobname' as a number",
    );
    should.throw(
      () => parseIntOrThrow("blobname", "fieldname", "hello"),
      "Failed to parse metadata property 'fieldname' on blob 'blobname' as a number",
    );

    should.throw(
      () => parseIntOrThrow("blobname", "fieldname", undefined),
      "Missing metadata property 'fieldname' on blob 'blobname'",
    );
  });
});
