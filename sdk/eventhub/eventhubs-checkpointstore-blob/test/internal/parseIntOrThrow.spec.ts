// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { parseIntOrThrow } from "../../src/blobCheckpointStore";
import { EnvVarKeys, getEnvVars } from "../public/utils/testUtils";
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
