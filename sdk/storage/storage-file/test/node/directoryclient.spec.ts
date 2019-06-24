import * as assert from "assert";
import { getBSU, getUniqueName } from "../utils";
import * as dotenv from "dotenv";
import { DirectoryClient, newPipeline, SharedKeyCredential } from "../../src";
dotenv.config({ path: "../.env" });

describe("DirectoryClient Node.js only", () => {
  const serviceClient = getBSU();
  let shareName = getUniqueName("share");
  let shareClient = serviceClient.getShareClient(shareName);
  let dirName = getUniqueName("dir");
  let dirClient = shareClient.getDirectoryClient(dirName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = getUniqueName("dir");
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();
  });

  afterEach(async () => {
    await dirClient.delete();
    await shareClient.delete();
  });

  it("can be created with a url and a credential", async () => {
    const factories = (dirClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new DirectoryClient(dirClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (dirClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new DirectoryClient(dirClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    const result = await newClient.getProperties();

    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (dirClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new DirectoryClient(dirClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });
});
