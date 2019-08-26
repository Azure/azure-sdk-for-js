import * as assert from "assert";
import * as dotenv from "dotenv";

import { BlobSASPermissions, generateBlobSASQueryParameters, SharedKeyCredential } from "../../src";
import { Aborter } from "../../src/Aborter";
import { BlobURL } from "../../src/BlobURL";
import { BlockBlobURL } from "../../src/BlockBlobURL";
import { ContainerURL } from "../../src/ContainerURL";
import { getBSU } from "../utils";
import { record } from "../utils/recorder";

dotenv.config({ path: "../.env" });

describe("BlobURL", () => {
  const serviceURL = getBSU();
  let containerName: string;
  let containerURL: ContainerURL;
  let blobName: string;;
  let blobURL: BlobURL;
  let blockBlobURL: BlockBlobURL;
  const content = "Hello World";

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.none);
    blobName = recorder.getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
    await blockBlobURL.upload(Aborter.none, content, content.length);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.none);
    recorder.stop();
  });

  it("syncCopyFromURL", async () => {
    const newBlobURL = BlobURL.fromContainerURL(containerURL, recorder.getUniqueName("copiedblob"));

    // Different from startCopyFromURL, syncCopyFromURL requires sourceURL includes a valid SAS
    const expiryTime = recorder.newDate();
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters({
      expiryTime,
      permissions: BlobSASPermissions.parse("racwd").toString(),
      containerName,
      blobName,
    }, containerURL.pipeline.factories[containerURL.pipeline.factories.length - 1] as SharedKeyCredential);

    const copyURL = blobURL.url + "?" + sas;
    const result = await newBlobURL.syncCopyFromURL(Aborter.none, copyURL);

    const properties1 = await blobURL.getProperties(Aborter.none);
    const properties2 = await newBlobURL.getProperties(Aborter.none);
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
  });
});
