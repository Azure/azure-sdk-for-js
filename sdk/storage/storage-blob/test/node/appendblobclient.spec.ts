import * as assert from "assert";

import * as dotenv from "dotenv";
import {
  AppendBlobClient,
  newPipeline,
  StorageSharedKeyCredential,
  ContainerClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  BlobServiceClient
} from "../../src";
import {
  getBSU,
  getConnectionStringFromEnvironment,
  bodyToString,
  recorderEnvSetup
} from "../utils";
import { TokenCredential } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { record } from "@azure/test-utils-recorder";
import { Test_CPK_INFO } from "../utils/constants";
dotenv.config();

describe("AppendBlobClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let appendBlobClient: AppendBlobClient;

  let recorder: any;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    appendBlobClient = containerClient.getAppendBlobClient(blobName);
  });

  afterEach(async function() {
    await containerClient.delete();
    await recorder.stop();
  });

  it("can be created with a url and a credential", async () => {
    const factories = (appendBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new AppendBlobClient(appendBlobClient.url, credential);

    await newClient.create();
    await newClient.download();
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (appendBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new AppendBlobClient(appendBlobClient.url, credential, {
      userAgentOptions: { userAgentPrefix: "test/1.0" }
    });

    await newClient.create();
    await newClient.download();
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345
        })
    };
    const newClient = new AppendBlobClient(appendBlobClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (appendBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new AppendBlobClient(appendBlobClient.url, pipeline);

    await newClient.create();
    await newClient.download();
  });

  it("can be created with a connection string", async () => {
    const newClient = new AppendBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName
    );

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
          maxTries: 5
        }
      }
    );

    await newClient.create();
    await newClient.download();
  });

  it("appendBlockFromURL", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    const blockBlobName = recorder.getUniqueName("blockblob");
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    // Get a SAS for blobURL
    const expiryTime = recorder.newDate();
    expiryTime.setDate(expiryTime.getDate() + 1);

    const factories = (blockBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;

    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r")
      },
      credential
    );

    await appendBlobClient.appendBlock(content, content.length);
    await appendBlobClient.appendBlockFromURL(`${blockBlobClient.url}?${sas}`, 0, content.length);

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length * 2), content + content);
    assert.equal(downloadResponse.contentLength!, content.length * 2);
  });

  it("create, appendBlock, appendBlockFromURL and download with CPK", async () => {
    const cResp = await appendBlobClient.create({
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(cResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const content = "Hello World!";
    const blockBlobName = recorder.getUniqueName("blockblob");
    const blobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blobClient.upload(content, content.length);

    // Get a SAS for blobURL
    const factories = (blobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const expiryTime = recorder.newDate();
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r")
      },
      credential
    );

    const aResp = await appendBlobClient.appendBlock(content, content.length, {
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(aResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const aResp2 = await appendBlobClient.appendBlockFromURL(
      `${blobClient.url}?${sas}`,
      0,
      content.length,
      { customerProvidedKey: Test_CPK_INFO }
    );
    assert.equal(aResp2.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const downloadResponse = await appendBlobClient.download(0, undefined, {
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(await bodyToString(downloadResponse, content.length * 2), content + content);
    assert.equal(downloadResponse.contentLength!, content.length * 2);
  });
});
