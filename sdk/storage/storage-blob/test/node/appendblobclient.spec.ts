import * as dotenv from "dotenv";
import { AppendBlobClient, newPipeline, SharedKeyCredential, ContainerClient } from "../../src";
import { getBSU, getConnectionStringFromEnvironment } from "../utils";
import { TokenCredential } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { record } from "../utils/recorder";
dotenv.config({ path: "../.env" });

describe("AppendBlobClient Node.js only", () => {
  const blobServiceClient = getBSU();
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let appendBlobClient: AppendBlobClient;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    appendBlobClient = containerClient.getAppendBlobClient(blobName);
  });

  afterEach(async function() {
    await containerClient.delete();
    recorder.stop();
  });

  it("can be created with a url and a credential", async () => {
    const factories = (appendBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new AppendBlobClient(appendBlobClient.url, credential);

    await newClient.create();
    await newClient.download();
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (appendBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new AppendBlobClient(appendBlobClient.url, credential, {
      telemetry: { value: "test/1.0" }
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
    const credential = factories[factories.length - 1] as SharedKeyCredential;
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
});
