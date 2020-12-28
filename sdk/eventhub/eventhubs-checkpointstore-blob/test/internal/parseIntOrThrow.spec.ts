// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { parseIntOrThrow } from "../../src/blobCheckpointStore";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { ContainerClient } from "@azure/storage-blob";
import { Guid } from "guid-typescript";
import { BlobCheckpointStore } from "../../src";
import { EventHubConsumerClient } from "@azure/event-hubs";
import chai from "chai";
const should = chai.should();
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
