import * as assert from "assert";

import * as dotenv from "dotenv";
import { BlobServiceClient, newPipeline, StorageSharedKeyCredential } from "../../src";
import { getBSU, getConnectionStringFromEnvironment, setupEnvironment } from "../utils";
import { record } from "@azure/test-utils-recorder";
dotenv.config({ path: "../.env" });

describe("BlobServiceClient Node.js only", () => {
  setupEnvironment();
  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
  });

  afterEach(async function() {
    recorder.stop();
  });

  it("can be created with a url and a credential", async () => {
    const serviceClient = getBSU();
    const factories = (serviceClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new BlobServiceClient(serviceClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const serviceClient = getBSU();
    const factories = (serviceClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new BlobServiceClient(serviceClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a pipeline", async () => {
    const serviceClient = getBSU();
    const factories = (serviceClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new BlobServiceClient(serviceClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created from a connection string", async () => {
    const newClient = BlobServiceClient.fromConnectionString(getConnectionStringFromEnvironment());

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("can be created from a connection string and an option bag", async () => {
    const newClient = BlobServiceClient.fromConnectionString(getConnectionStringFromEnvironment(), {
      retryOptions: {
        maxTries: 5
      }
    });

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });
});
