// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

import { DataLakeFileClient, DataLakeFileSystemClient } from "../src";
import { appendToURLPath } from "../src/utils/utils.common";
import { getDataLakeServiceClient, getUniqueName, recorderEnvSetup, uriSanitizers } from "./utils";

describe("Special Naming Tests", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const serviceClient = getDataLakeServiceClient(recorder);
    fileSystemName = recorder.variable(
      "1container-with-dash",
      getUniqueName("1container-with-dash"),
    );
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
  });

  afterEach(async function () {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("Should work with special container and blob names with spaces", async () => {
    const fileName: string = recorder.variable("blob empty", getUniqueName("blob empty"));
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    const response = (await fileSystemClient.listPaths().byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special container and blob names with spaces in URL string", async () => {
    const fileName: string = recorder.variable("blob empty", getUniqueName("blob empty"));
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline,
    );

    await fileClient.create();
    const response = (await fileSystemClient.listPaths().byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special container and blob names uppercase", async () => {
    const fileName: string = recorder.variable(
      "Upper blob empty another",
      getUniqueName("Upper blob empty another"),
    );
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special container and blob names uppercase in URL string", async () => {
    const fileName: string = recorder.variable(
      "Upper blob empty another",
      getUniqueName("Upper blob empty another"),
    );
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline,
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob names Chinese characters", async () => {
    const fileName: string = recorder.variable(
      "Upper blob empty another 汉字",
      getUniqueName("Upper blob empty another 汉字"),
    );
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob names Chinese characters in URL string", async () => {
    const fileName: string = recorder.variable(
      "Upper blob empty another 汉字",
      getUniqueName("Upper blob empty another 汉字"),
    );
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline,
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name characters", async () => {
    const specialName = "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'";
    const fileName: string = recorder.variable("specialName", getUniqueName(specialName));
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name characters in URL string", async () => {
    const specialName = "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'";
    const fileName: string = recorder.variable("specialName", getUniqueName(specialName));
    const fileClient = new DataLakeFileClient(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XxxClient object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(fileSystemClient.url, fileName.replace(/%/g, "%25").replace(/\?/g, "%3F")),
      (fileSystemClient as any).pipeline,
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (
      await fileSystemClient
        .listPaths({
          // NOTICE: Azure Storage Server will replace "\" with "/" in the blob names
          // .replace(/\\/g, "/")
        })
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Russian URI encoded", async () => {
    const fileName: string = recorder.variable("ру́сский язы́к", getUniqueName("ру́сский язы́к"));
    const fileNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = fileSystemClient.getFileClient(fileNameEncoded);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileNameEncoded);
  });

  it("Should work with special blob name Russian", async () => {
    const fileName: string = recorder.variable("ру́сский язы́к", getUniqueName("ру́сский язы́к"));
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Russian in URL string", async () => {
    const fileName: string = recorder.variable("ру́сский язы́к", getUniqueName("ру́сский язы́к"));
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline,
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Arabic URI encoded", async () => {
    const fileName: string = recorder.variable("عربيعربى", getUniqueName("عربيعربى"));
    const fileNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = fileSystemClient.getFileClient(fileNameEncoded);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileNameEncoded);
  });

  it("Should work with special blob name Arabic", async () => {
    const fileName: string = recorder.variable("عربيعربى", getUniqueName("عربيعربى"));
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Arabic in URL string", async () => {
    const fileName: string = recorder.variable("عربيعربى", getUniqueName("عربيعربى"));
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline,
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Japanese URI encoded", async () => {
    const fileName: string = recorder.variable(
      "にっぽんごにほんご",
      getUniqueName("にっぽんごにほんご"),
    );
    const fileNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = fileSystemClient.getFileClient(fileNameEncoded);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileNameEncoded);
  });

  it("Should work with special blob name Japanese", async () => {
    const fileName: string = recorder.variable(
      "にっぽんごにほんご",
      getUniqueName("にっぽんごにほんご"),
    );
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Japanese in URL string", async () => {
    const fileName: string = recorder.variable(
      "にっぽんごにほんご",
      getUniqueName("にっぽんごにほんご"),
    );
    const fileClient = new DataLakeFileClient(
      appendToURLPath(fileSystemClient.url, fileName),
      (fileSystemClient as any).pipeline,
    );

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });
});
