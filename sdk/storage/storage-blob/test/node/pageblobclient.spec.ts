import * as assert from "assert";

import { getBSU, getUniqueName, getConnectionStringFromEnvironment, bodyToString } from "../utils";
import { newPipeline, PageBlobClient, SharedKeyCredential } from "../../src";
import { TokenCredential, delay } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";

describe("PageBlobClient Node.js only", () => {
  const blobServiceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = blobServiceClient.createContainerClient(containerName);
  let blobName: string = getUniqueName("blob");
  let blobClient = containerClient.createBlobClient(blobName);
  let pageBlobClient = blobClient.createPageBlobClient();

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = blobServiceClient.createContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob");
    blobClient = containerClient.createBlobClient(blobName);
    pageBlobClient = blobClient.createPageBlobClient();
  });

  afterEach(async () => {
    await containerClient.delete();
  });

  it("startCopyIncremental", async () => {
    await pageBlobClient.create(1024, {
      metadata: {
        sourcemeta: "val"
      }
    });
    await pageBlobClient.uploadPages("b".repeat(1024), 0, 1024);

    let snapshotResult = await pageBlobClient.createSnapshot();
    assert.ok(snapshotResult.snapshot);

    const destPageBlobClient = containerClient.createPageBlobClient(getUniqueName("page"));

    await containerClient.setAccessPolicy("container");

    await delay(5 * 1000);

    let copySource = pageBlobClient.withSnapshot(snapshotResult.snapshot!).url;
    let copyResponse = await destPageBlobClient.startCopyIncremental(copySource);

    async function waitForCopy(retries = 0) {
      if (retries >= 30) {
        throw new Error("Check copy status exceed max retries counts");
      }

      switch (copyResponse.copyStatus) {
        case "success":
          return;
        case "aborted":
          throw new Error("Copy unexcepted aborted.");
        case "pending":
          await delay(3000);
          copyResponse = await destPageBlobClient.getProperties();
          await waitForCopy(++retries);
          return;
        case "failed":
          throw new Error("Copy failed.");
        default:
          return;
      }
    }

    await waitForCopy();

    let listBlobResponse = (await containerClient
      .listBlobsFlat({
        include: ["copy", "snapshots"]
      })
      .byPage()
      .next()).value;

    assert.equal(listBlobResponse.segment.blobItems.length, 4);

    await pageBlobClient.uploadPages("c".repeat(1024), 0, 1024);
    snapshotResult = await pageBlobClient.createSnapshot();
    assert.ok(snapshotResult.snapshot);
    copySource = pageBlobClient.withSnapshot(snapshotResult.snapshot!).url;
    copyResponse = await destPageBlobClient.startCopyIncremental(copySource);

    await waitForCopy();

    listBlobResponse = (await containerClient
      .listBlobsFlat({
        include: ["copy", "snapshots"]
      })
      .byPage()
      .next()).value;

    assert.equal(listBlobResponse.segment.blobItems.length, 6);

    const pageBlobProperties = await destPageBlobClient.getProperties();
    assert.equal(pageBlobProperties.metadata!.sourcemeta, "val");
  });

  it("can be created with a url and a credential", async () => {
    const factories = (pageBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new PageBlobClient(pageBlobClient.url, credential);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (pageBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new PageBlobClient(pageBlobClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345
        })
    };
    const newClient = new PageBlobClient(pageBlobClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (pageBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new PageBlobClient(pageBlobClient.url, pipeline);

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("can be created with a connection string", async () => {
    const newClient = new PageBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName
    );

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("throws error if constructor containerName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new PageBlobClient(getConnectionStringFromEnvironment(), "", "blobName");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for containerName and blobName parameters",
        error.message,
        "Error message is different than expected."
      );
    }
  });

  it("throws error if constructor blobName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new PageBlobClient(getConnectionStringFromEnvironment(), "containerName", "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for containerName and blobName parameters",
        error.message,
        "Error message is different than expected."
      );
    }
  });
});
