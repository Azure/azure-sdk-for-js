// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageSharedKeyCredential } from "@azure/storage-common";
import type { ContainerClient, BlobServiceClient } from "../../src/index.js";
import {
  AppendBlobClient,
  newPipeline,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol,
} from "../../src/index.js";
import {
  getBSU,
  getConnectionStringFromEnvironment,
  bodyToString,
  recorderEnvSetup,
  getTokenBSUWithDefaultCredential,
  getStorageAccessTokenWithDefaultCredential,
  getUniqueName,
  configureBlobStorageClient,
  SimpleTokenCredential,
  parseJwt,
} from "../utils/index.js";
import type { TokenCredential } from "@azure/core-auth";
import { assertClientUsesTokenCredential } from "../utils/assert.js";
import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
import { Test_CPK_INFO } from "../utils/fakeTestSecrets.js";
import { getBlobServiceAccountAudience } from "../../src/models.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { SERVICE_VERSION } from "../../src/utils/constants.js";

describe("AppendBlobClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let appendBlobClient: AppendBlobClient;

  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: [
            "x-ms-copy-source",
            "x-ms-copy-source-authorization",
            "x-ms-encryption-key",
          ],
        },
      },
      ["playback", "record"],
    );
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
    appendBlobClient = containerClient.getAppendBlobClient(blobName);
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("can be created with a url and a credential", async () => {
    const credential = (appendBlobClient as any).credential as StorageSharedKeyCredential;
    const newClient = new AppendBlobClient(appendBlobClient.url, credential);
    configureBlobStorageClient(recorder, newClient);

    await newClient.create();
    await newClient.download();
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const credential = (appendBlobClient as any).credential as StorageSharedKeyCredential;
    const newClient = new AppendBlobClient(appendBlobClient.url, credential, {
      userAgentOptions: { userAgentPrefix: "test/1.0" },
    });
    configureBlobStorageClient(recorder, newClient);

    await newClient.create();
    await newClient.download();
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = new AppendBlobClient(appendBlobClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("Default audience should work", async () => {
    await appendBlobClient.create();
    const appendBlobClientWithOAuthToken = new AppendBlobClient(
      appendBlobClient.url,
      createTestCredential(),
    );
    configureBlobStorageClient(recorder, appendBlobClientWithOAuthToken);
    const exist = await appendBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Customized audience should work", async () => {
    await appendBlobClient.create();
    const appendBlobClientWithOAuthToken = new AppendBlobClient(
      appendBlobClient.url,
      createTestCredential(),
      {
        audience: [getBlobServiceAccountAudience(blobServiceClient.accountName)],
      },
    );
    configureBlobStorageClient(recorder, appendBlobClientWithOAuthToken);
    const exist = await appendBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Bearer token challenge should work", async () => {
    await appendBlobClient.create();

    // To validate that bad audience should fail.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const appendBlobClientWithPlainOAuthToken = new AppendBlobClient(
      appendBlobClient.url,
      new SimpleTokenCredential(authToken!.token),
    );
    configureBlobStorageClient(recorder, appendBlobClientWithPlainOAuthToken);

    try {
      await appendBlobClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }
    const appendBlobClientWithOAuthToken = new AppendBlobClient(
      appendBlobClient.url,
      createTestCredential(),
      {
        audience: ["https://badaudience.blob.core.windows.net/.default"],
      },
    );
    configureBlobStorageClient(recorder, appendBlobClientWithOAuthToken);
    const exist = await appendBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("can be created with a url and a pipeline", async () => {
    const credential = (appendBlobClient as any).credential as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new AppendBlobClient(appendBlobClient.url, pipeline);
    configureBlobStorageClient(recorder, newClient);

    await newClient.create();
    await newClient.download();
  });

  it("can be created with a connection string", async () => {
    const newClient = new AppendBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName,
    );
    configureBlobStorageClient(recorder, newClient);

    await newClient.create();
    await newClient.download();
  });

  it("can be created with a connection string and an option bag", async () => {
    const newClient = new AppendBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName,
      {
        retryOptions: {
          maxTries: 5,
        },
      },
    );
    configureBlobStorageClient(recorder, newClient);

    await newClient.create();
    await newClient.download();
  });

  it("appendBlockFromURL", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    // Get a SAS for blobURL

    const expiryTime = new Date(recorder.variable("expiry", new Date().toISOString()));
    expiryTime.setDate(expiryTime.getDate() + 1);

    const credential = (blockBlobClient as any).credential as StorageSharedKeyCredential;

    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r"),
      },
      credential,
    );

    await appendBlobClient.appendBlock(content, content.length);
    await appendBlobClient.appendBlockFromURL(`${blockBlobClient.url}?${sas}`, 0, content.length);

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length * 2), content + content);
    assert.equal(downloadResponse.contentLength!, content.length * 2);
  });

  it("appendBlockFromURL - source SAS and destination bearer token", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    // Get a SAS for blobURL
    const expiryTime = new Date(recorder.variable("expiry", new Date().toISOString()));
    expiryTime.setDate(expiryTime.getDate() + 1);

    const credential = (blockBlobClient as any).credential as StorageSharedKeyCredential;

    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r"),
      },
      credential,
    );

    const tokenBlobServiceClient = getTokenBSUWithDefaultCredential(recorder);
    const tokenAppendBlobClient = tokenBlobServiceClient
      .getContainerClient(containerName)
      .getAppendBlobClient(blobName);

    await tokenAppendBlobClient.appendBlockFromURL(
      `${blockBlobClient.url}?${sas}`,
      0,
      content.length,
    );

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });

  it("appendBlockFromURL - source bear token and destination account key", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    const accessToken = await getStorageAccessTokenWithDefaultCredential();

    // const tokenBlobServiceClient = getTokenBSUWithDefaultCredential(recorder);
    // const tokenAppendBlobClient = tokenBlobServiceClient.getContainerClient(containerName).getAppendBlobClient(blobName);
    await appendBlobClient.appendBlockFromURL(blockBlobClient.url, 0, content.length, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken!.token,
      },
    });

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });

  it("appendBlockFromURL - source delegation sas with bear token and destination account key", async (ctx) => {
    if (!isLiveMode()) {
      // The token is sanitized in recording, we cannot get the object id from it.
      ctx.skip();
    }

    let blobServiceClientWithToken: BlobServiceClient;
    try {
      blobServiceClientWithToken = getTokenBSUWithDefaultCredential(recorder);
    } catch {
      // Requires bearer token for this case which cannot be generated in the runtime
      // Make sure this case passed in sanity test
      ctx.skip();
    }

    const credential = createTestCredential();
    const token = (await credential.getToken("https://storage.azure.com/.default"))?.token;
    const jwtObj = parseJwt(token!);

    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() - 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const userDelegationKey = await blobServiceClientWithToken!.getUserDelegationKey(now, tmr);

    const sharedKeyCredential = containerClient.credential as StorageSharedKeyCredential;

    const accountName = sharedKeyCredential.accountName;
    await appendBlobClient.create();

    const content = "Hello World!";
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    const delegationSAS = generateBlobSASQueryParameters(
      {
        containerName: containerClient.containerName,
        blobName: blockBlobName,
        expiresOn: tmr,
        permissions: BlobSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: SERVICE_VERSION,
        delegatedUserObjectId: jwtObj.oid,
      },
      userDelegationKey,
      accountName,
    );

    await appendBlobClient.appendBlockFromURL(
      `${blockBlobClient.url}?${delegationSAS}`,
      0,
      content.length,
      {
        sourceAuthorization: {
          scheme: "Bearer",
          value: token!,
        },
      },
    );

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });

  it("appendBlockFromURL - destination bearer token", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    const tokenBlobServiceClient = getTokenBSUWithDefaultCredential(recorder);
    const tokenAppendBlobClient = tokenBlobServiceClient
      .getContainerClient(containerName)
      .getAppendBlobClient(blobName);
    await tokenAppendBlobClient.appendBlockFromURL(blockBlobClient.url, 0, content.length);

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });

  it("appendBlockFromURL - should fail with source error message", async function () {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const newBlobClient = containerClient.getAppendBlobClient(
      recorder.variable("copiedblob", getUniqueName("copiedblob")),
    );
    await newBlobClient.create();

    const sourceUrl = await appendBlobClient.generateSasUrl({
      permissions: BlobSASPermissions.parse("d"),
      expiresOn: tmr,
    });

    try {
      await newBlobClient.appendBlockFromURL(sourceUrl, 0, 512);
    } catch (err) {
      assert.deepEqual((err as any).details.errorCode, "CannotVerifyCopySource");
      assert.equal((err as any).details.copySourceStatusCode, 403);
      assert.deepEqual((err as any).details.copySourceErrorCode, "AuthorizationPermissionMismatch");
      assert.deepEqual(
        (err as any).details.copySourceErrorMessage,
        "This request is not authorized to perform this operation using this permission.",
      );
    }
  });

  it("conditional tags for appendBlockFromURL's destination blob", async () => {
    const newBlobClient = containerClient.getAppendBlobClient(
      recorder.variable("copiedblob", getUniqueName("copiedblob")),
    );
    const tags2 = {
      tag: "val",
    };
    await newBlobClient.create({ tags: tags2 });

    const content = "Hello World!";
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);
    // Get a SAS for blobURL
    const credential = (blockBlobClient as any).credential as StorageSharedKeyCredential;
    const expiryTime = new Date(recorder.variable("expiry", new Date().toISOString()));
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r"),
      },
      credential,
    );

    let exceptionCaught = false;
    try {
      await newBlobClient.appendBlockFromURL(`${blockBlobClient.url}?${sas}`, 0, content.length, {
        conditions: { tagConditions: "tag1 = 'val2'" },
      });
    } catch (err: any) {
      assert.equal(err.details?.errorCode, "ConditionNotMet");
      exceptionCaught = true;
    }
    assert.isDefined(exceptionCaught);

    await newBlobClient.appendBlockFromURL(`${blockBlobClient.url}?${sas}`, 0, content.length, {
      conditions: { tagConditions: "tag = 'val'" },
    });
  });

  it("create, appendBlock, appendBlockFromURL and download with CPK", async () => {
    const cResp = await appendBlobClient.create({
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.equal(cResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const content = "Hello World!";
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blobClient.upload(content, content.length);

    // Get a SAS for blobURL
    const credential = (blobClient as any).credential as StorageSharedKeyCredential;
    const expiryTime = new Date(recorder.variable("expiry", new Date().toISOString()));
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r"),
      },
      credential,
    );

    const aResp = await appendBlobClient.appendBlock(content, content.length, {
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.equal(aResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const aResp2 = await appendBlobClient.appendBlockFromURL(
      `${blobClient.url}?${sas}`,
      0,
      content.length,
      { customerProvidedKey: Test_CPK_INFO },
    );
    assert.equal(aResp2.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const downloadResponse = await appendBlobClient.download(0, undefined, {
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.equal(await bodyToString(downloadResponse, content.length * 2), content + content);
    assert.equal(downloadResponse.contentLength!, content.length * 2);
  });

  it(
    "appendBlock - append large block",
    { timeout: timeoutForLargeFileUploadingTest },
    async (ctx) => {
      if (!isLiveMode()) {
        // Recorder file larger than github limitation
        ctx.skip();
      }
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
