import * as assert from "assert";
import * as dotenv from "dotenv";

import { generateBlobSASQueryParameters } from "../../src";
import { Aborter } from "../../src/Aborter";
import { AppendBlobURL } from "../../src/AppendBlobURL";
import { BlobSASPermissions } from "../../src/BlobSASPermissions";
import { BlockBlobURL } from "../../src/BlockBlobURL";
import { ContainerURL } from "../../src/ContainerURL";
import { SharedKeyCredential } from "../../src/credentials/SharedKeyCredential";
import { bodyToString, getBSU } from "../utils";
import { record } from "../utils/recorder";
import { Test_CPK_INFO } from '../utils/constants';

dotenv.config({ path: "../.env" });

describe("AppendBlobURL", () => {
  const serviceURL = getBSU();
  let containerName: string;
  let containerURL: ContainerURL;
  let blobName: string;
  let appendBlobURL: AppendBlobURL;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.none);
    blobName = recorder.getUniqueName("blob");
    appendBlobURL = AppendBlobURL.fromContainerURL(containerURL, blobName);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.none);
    recorder.stop();
  });

  it("appendBlockFromURL", async () => {
    await appendBlobURL.create(Aborter.none);

    const content = "Hello World!";
    const blockBlobName = recorder.getUniqueName("blockblob");
    const blobURL = BlockBlobURL.fromContainerURL(containerURL, blockBlobName);
    await blobURL.upload(Aborter.none, content, content.length);

    // Get a SAS for blobURL
    const expiryTime = recorder.newDate();
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r").toString()
      },
      blobURL.pipeline.factories[blobURL.pipeline.factories.length - 1] as SharedKeyCredential
    );

    await appendBlobURL.appendBlock(Aborter.none, content, content.length);
    await appendBlobURL.appendBlockFromURL(
      Aborter.none,
      `${blobURL.url}?${sas}`,
      0,
      content.length
    );

    const downloadResponse = await appendBlobURL.download(Aborter.none, 0);
    assert.equal(await bodyToString(downloadResponse, content.length * 2), content + content);
    assert.equal(downloadResponse.contentLength!, content.length * 2);
  });

  it("create, appendBlock, appendBlockFromURL and download with CPK", async () => {
    const cResp = await appendBlobURL.create(Aborter.none, {customerProvidedKey: Test_CPK_INFO});
    assert.equal(cResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const content = "Hello World!";
    const blockBlobName = recorder.getUniqueName("blockblob");
    const blobURL = BlockBlobURL.fromContainerURL(containerURL, blockBlobName);
    await blobURL.upload(Aborter.none, content, content.length);

    // Get a SAS for blobURL
    const expiryTime = recorder.newDate();
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r").toString()
      },
      blobURL.pipeline.factories[blobURL.pipeline.factories.length - 1] as SharedKeyCredential
    );

    const aResp = await appendBlobURL.appendBlock(Aborter.none, content, content.length, {customerProvidedKey: Test_CPK_INFO});
    assert.equal(aResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const aResp2 = await appendBlobURL.appendBlockFromURL(
      Aborter.none,
      `${blobURL.url}?${sas}`,
      0,
      content.length,
      {customerProvidedKey: Test_CPK_INFO}
    );
    assert.equal(aResp2.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const downloadResponse = await appendBlobURL.download(Aborter.none, 0, undefined, {customerProvidedKey: Test_CPK_INFO});
    assert.equal(await bodyToString(downloadResponse, content.length * 2), content + content);
    assert.equal(downloadResponse.contentLength!, content.length * 2);
  });
});
