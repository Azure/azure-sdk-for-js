// import { DataLakeFileClient } from "../src";
import { record, Recorder } from "@azure/test-utils-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";

import { DataLakeFileClient, DataLakeFileSystemClient } from "../src";
import { appendToURLPath } from "../src/utils/utils.common";
import { getDataLakeServiceClient, recorderEnvSetup } from "./utils";

// import { appendToURLPath } from "../src/utils/utils.common";
dotenv.config();

describe("Special Naming Tests", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("1container-with-dash");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
  });

  afterEach(async function() {
    await fileSystemClient.delete();
    await recorder.stop();
  });

  it("Should work with special container and blob names with spaces", async () => {
    const fileName: string = recorder.getUniqueName("blob empty");
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    const response = (
      await fileSystemClient
        .listPaths()
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special container and blob names with spaces in URL string", async () => {
    const fileName: string = recorder.getUniqueName("blob empty");
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline
    );

    await fileClient.create();
    const response = (
      await fileSystemClient
        .listPaths()
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special container and blob names uppercase", async () => {
    const fileName: string = recorder.getUniqueName("Upper blob empty another");
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special container and blob names uppercase in URL string", async () => {
    const fileName: string = recorder.getUniqueName("Upper blob empty another");
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob names Chinese characters", async () => {
    const fileName: string = recorder.getUniqueName("Upper blob empty another 汉字");
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob names Chinese characters in URL string", async () => {
    const fileName: string = recorder.getUniqueName("Upper blob empty another 汉字");
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name characters", async () => {
    const fileName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'"
    );
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name characters in URL string", async () => {
    const fileName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'"
    );
    const fileClient = new DataLakeFileClient(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XxxClient object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(fileSystemClient.url, fileName.replace(/%/g, "%25").replace(/\?/g, "%3F")),
      (fileSystemClient as any).pipeline
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({
          // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
          //.replace(/\\/g, "/")
        })
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Russian URI encoded", async () => {
    const fileName: string = recorder.getUniqueName("ру́сский язы́к");
    const fileNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = fileSystemClient.getFileClient(fileNameEncoded);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileNameEncoded);
  });

  it("Should work with special blob name Russian", async () => {
    const fileName: string = recorder.getUniqueName("ру́сский язы́к");
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Russian in URL string", async () => {
    const fileName: string = recorder.getUniqueName("ру́сский язы́к");
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Arabic URI encoded", async () => {
    const fileName: string = recorder.getUniqueName("عربيعربى");
    const fileNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = fileSystemClient.getFileClient(fileNameEncoded);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileNameEncoded);
  });

  it("Should work with special blob name Arabic", async () => {
    const fileName: string = recorder.getUniqueName("عربيعربى");
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Arabic in URL string", async () => {
    const fileName: string = recorder.getUniqueName("عربيعربى");
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Japanese URI encoded", async () => {
    const fileName: string = recorder.getUniqueName("にっぽんごにほんご");
    const fileNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = fileSystemClient.getFileClient(fileNameEncoded);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileNameEncoded);
  });

  it("Should work with special blob name Japanese", async () => {
    const fileName: string = recorder.getUniqueName("にっぽんごにほんご");
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Japanese in URL string", async () => {
    const fileName: string = recorder.getUniqueName("にっぽんごにほんご");
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({})
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });
});
