// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type {
  BlobServiceClient,
  BlobClient,
  BlockBlobClient,
  ContainerClient,
} from "@azure/storage-blob";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient } from "./utils/clients.js";
import { getUniqueName } from "./utils/utils.js";
import {
  getCustomerProvidedKey,
  getEncryptionScope1,
  getEncryptionScope2,
} from "../utils/injectables.js";
import { isRestError } from "@azure/core-rest-pipeline";

describe("Encryption Scope", function () {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";
  const accountEncryptionKey = "$account-encryption-key";
  let recorder: Recorder;
  const encryptionScopeName1 = getEncryptionScope1();
  const encryptionScopeName2 = getEncryptionScope2();
  const customerProvidedKey = getCustomerProvidedKey();

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    blobName = getUniqueName("blob", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("create container", async () => {
    await containerClient.create();
    let containerChecked = false;
    for await (const container of blobServiceClient.listContainers({
      includeMetadata: true,
    })) {
      if (container.name === containerName) {
        assert.strictEqual(container.properties.defaultEncryptionScope, accountEncryptionKey);
        assert.ok(!container.properties.preventEncryptionScopeOverride);
        containerChecked = true;
        break;
      }
    }
    assert.ok(containerChecked);

    await blockBlobClient.upload(content, content.length, {
      encryptionScope: encryptionScopeName1,
    });
  });

  it("create container preventEncryptionScopeOverride", async () => {
    await containerClient.create({
      containerEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName1,
        preventEncryptionScopeOverride: true,
      },
    });

    let containerChecked = false;
    for await (const container of blobServiceClient.listContainers({
      includeMetadata: true,
    })) {
      if (container.name === containerName) {
        assert.strictEqual(container.properties.defaultEncryptionScope, encryptionScopeName1);
        assert.ok(container.properties.preventEncryptionScopeOverride);
        containerChecked = true;
        break;
      }
    }
    assert.ok(containerChecked);

    let operationFailed = false;
    try {
      await blockBlobClient.upload(content, content.length, {
        encryptionScope: encryptionScopeName2,
      });
    } catch (err: any) {
      operationFailed = true;
      assert.equal(err.details.errorCode, "RequestForbiddenByContainerEncryptionPolicy");
    }
    assert.ok(operationFailed, "Blob update overriding encryption scope should fail.");
  });

  it.skip("specify CPK together with CPK-N should fail", async () => {
    await containerClient.create();
    let operationFailed = false;
    try {
      await blockBlobClient.upload(content, content.length, {
        customerProvidedKey,
        encryptionScope: encryptionScopeName1,
      });
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      operationFailed = true;
    }
    assert.ok(operationFailed, "Providing both CPK and CPK-N should fail.");
  });

  it("setMetadata, getProperties and createSnapshot with CPK-N", async () => {
    await containerClient.create();
    await blockBlobClient.upload(content, content.length, {
      encryptionScope: encryptionScopeName1,
    });

    // update with same encryption scope should succeed
    const metadata = { a: "a", b: "b" };
    const smResp = await blobClient.setMetadata(metadata, {
      encryptionScope: encryptionScopeName1,
    });
    assert.strictEqual(smResp.encryptionScope, encryptionScopeName1);

    // read transparently
    const gpResp = await blobClient.getProperties();
    assert.strictEqual(gpResp.encryptionScope, encryptionScopeName1);

    // update with an unmatching encryption scope should fail
    let operationFailed = false;
    try {
      await blobClient.createSnapshot({
        encryptionScope: encryptionScopeName2,
      });
    } catch (err: any) {
      operationFailed = true;
      assert.strictEqual(err.details.errorCode, "BlobCustomerSpecifiedEncryptionMismatch");
    }
    assert.ok(operationFailed, "Create snapshot with unmatching encryption scope should fail.");
  });
});
