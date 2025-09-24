// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeEach, afterEach, assert } from "vitest";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import {
  type AppendBlobClient,
  BlobSASPermissions,
  type BlobServiceClient,
  type ContainerClient,
} from "@azure/storage-blob";
import { getUniqueName } from "../utils/utils.js";
import { createBlobServiceClient, createAppendBlobClient } from "./utils/clients.js";
import {
  getAccountKey,
  getAccountSas,
  getCustomerProvidedKey,
  getStorageConnectionString,
} from "../../utils/injectables.js";
import { bodyToString } from "./utils/utils.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { STORAGE_SCOPE } from "../utils/constants.js";
import { isRestError } from "@azure/core-rest-pipeline";

describe("AppendBlobClient (node)", () => {
  const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;
  const customerProvidedKey = getCustomerProvidedKey();
  let recorder: Recorder;
  let containerName: string;
  let blobName: string;
  let containerClient: ContainerClient;
  let appendBlobClient: AppendBlobClient;
  let blobServiceClient: BlobServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob", { recorder });
    appendBlobClient = containerClient.getAppendBlobClient(blobName);
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it.runIf(getStorageConnectionString())("can be created with a connection string", async () => {
    const client = await createAppendBlobClient("AccountConnectionString", {
      containerName,
      blobName,
      recorder,
    });
    if (!client) assert.fail("client should not be undefined");
    await client.create();
    await client.download(0);
  });

  it.runIf(getStorageConnectionString())(
    "can be created with a connection string and an option bag",
    async () => {
      const client = await createAppendBlobClient("AccountConnectionString", {
        containerName,
        blobName,
        recorder,
        options: {
          retryOptions: {
            maxTries: 5,
          },
        },
      });
      if (!client) assert.fail("client should not be undefined");
      await client.create();
      await client.download(0);
    },
  );

  it.runIf(getStorageConnectionString())(
    "throws error if constructor blobName parameter is empty",
    async () => {
      try {
        await createAppendBlobClient("AccountConnectionString", {
          blobName: "",
          containerName: "containerName",
          recorder,
        });
        assert.fail("Expecting an thrown error but didn't get one.");
      } catch (error: any) {
        assert.equal(
          error.message,
          "Expecting non-empty strings for containerName and blobName parameters",
          "Error message is different than expected.",
        );
      }
    },
  );

  it.runIf(getAccountKey())("can be created with a url and a credential", async () => {
    const newClient = await createAppendBlobClient("AccountKey", {
      containerName,
      blobName,
      recorder,
    });
    if (!newClient) assert.fail("client should not be undefined");

    await newClient.create();
    await newClient.download();
  });

  it.runIf(getAccountKey())(
    "can be created with a url and a credential and an option bag",
    async () => {
      const newClient = await createAppendBlobClient("AccountKey", {
        containerName,
        blobName,
        recorder,
        options: {
          userAgentOptions: { userAgentPrefix: "TestUserAgentPrefix" },
        },
      });
      if (!newClient) assert.fail("client should not be undefined");

      await newClient.create();
      await newClient.download();
    },
  );

  it.runIf(getAccountSas())(
    "appendBlockFromURL - source SAS and destination bearer token",
    async () => {
      await appendBlobClient.create();

      const content = "Hello World!";
      const blockBlobName = getUniqueName("blockblob", { recorder });
      const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
      await blockBlobClient.upload(content, content.length);

      const tokenBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
      const tokenAppendBlobClient = tokenBlobServiceClient
        .getContainerClient(containerName)
        .getAppendBlobClient(blobName);

      await tokenAppendBlobClient.appendBlockFromURL(
        `${blockBlobClient.url}?${getAccountSas()}`,
        0,
        content.length,
      );

      const downloadResponse = await appendBlobClient.download(0);
      assert.equal(await bodyToString(downloadResponse, content.length), content);
      assert.equal(downloadResponse.contentLength!, content.length);
    },
  );

  it("appendBlockFromURL - source bear token and destination account key", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    const blockBlobName = getUniqueName("blockblob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    const accessToken = await createTestCredential().getToken([STORAGE_SCOPE]);

    assert.isNotNull(accessToken);

    await appendBlobClient.appendBlockFromURL(blockBlobClient.url, 0, content.length, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken.token,
      },
    });

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });

  it.runIf(getAccountKey())(
    "appendBlockFromURL - should fail with source error message",
    async function () {
      const keyClient = await createAppendBlobClient("AccountKey", {
        recorder,
        containerName,
        blobName,
      });
      if (!keyClient) assert.fail("client should not be undefined");
      await keyClient.create();
      const tmr = new Date(new Date().toISOString());
      tmr.setDate(tmr.getDate() + 1);

      const newBlobClient = containerClient.getAppendBlobClient(
        getUniqueName("copiedblob", { recorder }),
      );
      await newBlobClient.create();

      const sourceUrl = await keyClient.generateSasUrl({
        permissions: BlobSASPermissions.parse("d"),
        expiresOn: tmr,
      });

      try {
        await newBlobClient.appendBlockFromURL(sourceUrl, 0, 512);
      } catch (err: any) {
        if (!isRestError(err)) {
          throw err;
        }
        assert.equal(err.code, "CannotVerifyCopySource");
      }
    },
  );

  it.runIf(getAccountSas())(
    "conditional tags for appendBlockFromURL's destination blob",
    async () => {
      const newBlobClient = containerClient.getAppendBlobClient(
        getUniqueName("copiedblob", { recorder }),
      );
      const tags2 = {
        tag: "val",
      };
      await newBlobClient.create({ tags: tags2 });

      const content = "Hello World!";
      const blockBlobName = getUniqueName("blockblob", { recorder });
      const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
      await blockBlobClient.upload(content, content.length);

      let exceptionCaught = false;
      const sasForTest = getAccountSas()!;
      try {
        await newBlobClient.appendBlockFromURL(
          `${blockBlobClient.url}?${sasForTest}`,
          0,
          content.length,
          {
            conditions: { tagConditions: "tag1 = 'val2'" },
          },
        );
      } catch (err: any) {
        exceptionCaught = err.details?.errorCode === "ConditionNotMet";
      }
      assert.ok(exceptionCaught);

      await newBlobClient.appendBlockFromURL(
        `${blockBlobClient.url}?${sasForTest}`,
        0,
        content.length,
        {
          conditions: { tagConditions: "tag = 'val'" },
        },
      );
    },
  );

  it.runIf(getAccountSas())(
    "create, appendBlock, appendBlockFromURL and download with CPK",
    async () => {
      const cResp = await appendBlobClient.create({
        customerProvidedKey,
      });
      assert.equal(cResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

      const content = "Hello World!";
      const blockBlobName = getUniqueName("blockblob", { recorder });
      const blobClient = containerClient.getBlockBlobClient(blockBlobName);
      await blobClient.upload(content, content.length);

      const aResp = await appendBlobClient.appendBlock(content, content.length, {
        customerProvidedKey,
      });
      assert.equal(aResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

      const sasForCpk = getAccountSas()!;
      const aResp2 = await appendBlobClient.appendBlockFromURL(
        `${blobClient.url}?${sasForCpk}`,
        0,
        content.length,
        { customerProvidedKey },
      );
      assert.equal(aResp2.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

      const downloadResponse = await appendBlobClient.download(0, undefined, {
        customerProvidedKey,
      });
      assert.equal(await bodyToString(downloadResponse, content.length * 2), content + content);
      assert.equal(downloadResponse.contentLength!, content.length * 2);
    },
  );

  it.runIf(isLiveMode())(
    "appendBlock - append large block",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      await appendBlobClient.create();

      const largeBlockSize = 100 * 1024 * 1024;
      const content = new Uint8Array(largeBlockSize);
      for (let i = 0; i < largeBlockSize; i = i + 1000) {
        content[i] = i;
      }
      await appendBlobClient.appendBlock(content, content.length);

      const downloadResponse = await appendBlobClient.downloadToBuffer(0);
      const expected = Buffer.from(content.buffer, content.byteOffset, content.byteLength);

      assert.deepStrictEqual(downloadResponse, expected);
      assert.equal(downloadResponse.length, content.length);
    },
  );
});
