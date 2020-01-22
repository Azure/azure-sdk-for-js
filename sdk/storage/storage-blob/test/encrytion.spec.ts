import * as assert from "assert";
import * as dotenv from "dotenv";
import {
  getBSU,
  recorderEnvSetup,
} from "./utils";
import { record } from "@azure/test-utils-recorder";
import {
  BlobServiceClient,
  BlobClient,
  BlockBlobClient,
  ContainerClient
} from "../src";
import { Test_CPK_INFO } from "./utils/constants";
dotenv.config({ path: "../.env" });

describe.only("Encryption Scope", function () {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";
  const accountEncryptionKey = "$account-encryption-key";
  const encryptionScopeName1 = process.env["ENCRYPTION_SCOPE_1"];
  const encryptionScopeName2 = process.env["ENCRYPTION_SCOPE_2"];

  let recorder: any;

  before(function () {
    if (!encryptionScopeName1 || !encryptionScopeName2) {
      this.skip();
    }
  });

  beforeEach(async function () {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async function () {
    await containerClient.delete();
    recorder.stop();
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
      cpkScopeInfo: { encryptionScope: encryptionScopeName1 }
    });
  });

  it("create container preventEncryptionScopeOverride", async () => {
    await containerClient.create({ containerCpkScopeInfo: { defaultEncryptionScope: encryptionScopeName1, preventEncryptionScopeOverride: true } });

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

    try {
      await blockBlobClient.upload(content, content.length, {
        cpkScopeInfo: { encryptionScope: encryptionScopeName2 }
      });
      assert.fail("Blob update overriding encryption scope should fail.");
    } catch (err) {
      assert.equal(err.details.errorCode, "RequestForbiddenByContainerEncryptionPolicy");
    }
  });

  it.skip("specify CPK together with CPK-N should fail", async () => {
    await containerClient.create();
    try {
      await blockBlobClient.upload(content, content.length, {
        customerProvidedKey: Test_CPK_INFO,
        cpkScopeInfo: { encryptionScope: encryptionScopeName1 }
      });
      assert.fail("Should fail.");
    } catch (err) {
    }
  });

  it("setMetadata, getProperties and createSnapshot with CPK-N", async () => {
    await containerClient.create();
    await blockBlobClient.upload(content, content.length, {
      cpkScopeInfo: { encryptionScope: encryptionScopeName1 }
    });

    // update with same encryption scope should succeed
    const metadata = { a: "a", b: "b" };
    const smResp = await blobClient.setMetadata(metadata, {
      cpkScopeInfo: { encryptionScope: encryptionScopeName1 }
    });
    assert.strictEqual(smResp.encryptionScope, encryptionScopeName1);

    // read transparently
    const gpResp = await blobClient.getProperties();
    assert.strictEqual(gpResp.encryptionScope, encryptionScopeName1);

    // update with an unmatching encryption scope should fail
    try {
      const csResp = await blobClient.createSnapshot({
        cpkScopeInfo: { encryptionScope: encryptionScopeName2 }
      });
      assert.fail("Create snapshot with unmatching encryption scope should fail.")
    } catch (err) {
      assert.strictEqual(err.details.errorCode, "BlobCustomerSpecifiedEncryptionMismatch");
    }
  });
})