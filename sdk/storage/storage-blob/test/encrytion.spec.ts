import * as assert from "assert";
import * as dotenv from "dotenv";
import { getBSU, recorderEnvSetup } from "./utils";
import { record, isPlaybackMode } from "@azure/test-utils-recorder";
import { BlobServiceClient, BlobClient, BlockBlobClient, ContainerClient } from "../src";
import { Test_CPK_INFO } from "./utils/constants";
import { isNode } from "@azure/core-http";
dotenv.config();

describe("Encryption Scope", function() {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";
  const accountEncryptionKey = "$account-encryption-key";

  const encryptionScopeEnvVar1 = "ENCRYPTION_SCOPE_1";
  const encryptionScopeEnvVar2 = "ENCRYPTION_SCOPE_2";
  let encryptionScopeName1: string | undefined;
  let encryptionScopeName2: string | undefined;
  let recorder: any;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);

    if (isNode) {
      encryptionScopeName1 = process.env[encryptionScopeEnvVar1];
      encryptionScopeName2 = process.env[encryptionScopeEnvVar2];
    } else {
      encryptionScopeName1 = (window as any).__env__[encryptionScopeEnvVar1];
      encryptionScopeName2 = (window as any).__env__[encryptionScopeEnvVar2];
    }

    if ((!encryptionScopeName1 || !encryptionScopeName2) && !isPlaybackMode()) {
      this.skip();
    }

    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async function() {
    if (containerClient) {
      await containerClient.delete();
    }
    await recorder.stop();
  });

  it("create container", async () => {
    await containerClient.create();
    let containerChecked = false;
    for await (const container of blobServiceClient.listContainers({
      includeMetadata: true
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
      encryptionScope: encryptionScopeName1
    });
  });

  it("create container preventEncryptionScopeOverride", async () => {
    await containerClient.create({
      containerEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName1,
        preventEncryptionScopeOverride: true
      }
    });

    let containerChecked = false;
    for await (const container of blobServiceClient.listContainers({
      includeMetadata: true
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
        encryptionScope: encryptionScopeName2
      });
    } catch (err) {
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
        customerProvidedKey: Test_CPK_INFO,
        encryptionScope: encryptionScopeName1
      });
    } catch (err) {
      operationFailed = true;
    }
    assert.ok(operationFailed, "Providing both CPK and CPK-N should fail.");
  });

  it("setMetadata, getProperties and createSnapshot with CPK-N", async () => {
    await containerClient.create();
    await blockBlobClient.upload(content, content.length, {
      encryptionScope: encryptionScopeName1
    });

    // update with same encryption scope should succeed
    const metadata = { a: "a", b: "b" };
    const smResp = await blobClient.setMetadata(metadata, {
      encryptionScope: encryptionScopeName1
    });
    assert.strictEqual(smResp.encryptionScope, encryptionScopeName1);

    // read transparently
    const gpResp = await blobClient.getProperties();
    assert.strictEqual(gpResp.encryptionScope, encryptionScopeName1);

    // update with an unmatching encryption scope should fail
    let operationFailed = false;
    try {
      await blobClient.createSnapshot({
        encryptionScope: encryptionScopeName2
      });
    } catch (err) {
      operationFailed = true;
      assert.strictEqual(err.details.errorCode, "BlobCustomerSpecifiedEncryptionMismatch");
    }
    assert.ok(operationFailed, "Create snapshot with unmatching encryption scope should fail.");
  });
});
