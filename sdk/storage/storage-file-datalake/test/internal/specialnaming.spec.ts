// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type { DataLakeFileSystemClient } from "@azure/storage-file-datalake";
import { DataLakeFileClient } from "@azure/storage-file-datalake";
import { appendToURLPath } from "$internal/utils/utils.common.js";
import { createDataLakeServiceClient } from "../utils/clients.js";
import { getUniqueName } from "../utils/testHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Special Naming Tests", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createDataLakeServiceClient("TokenCredential", { recorder });
    fileSystemName = getUniqueName("1container-with-dash", { recorder });
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
  });

  afterEach(async () => {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("Should work with special container and blob names with spaces", async () => {
    const fileName: string = getUniqueName("blob empty", { recorder });
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    const response = (await fileSystemClient.listPaths().byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special container and blob names with spaces in URL string", async () => {
    const fileName: string = getUniqueName("blob empty", { recorder });
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
    const fileName: string = getUniqueName("Upper blob empty another", { recorder });
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special container and blob names uppercase in URL string", async () => {
    const fileName: string = getUniqueName("Upper blob empty another", { recorder });
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
    const fileName: string = getUniqueName("Upper blob empty another 汉字", { recorder });
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob names Chinese characters in URL string", async () => {
    const fileName: string = getUniqueName("Upper blob empty another 汉字", { recorder });
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
    const fileName: string = getUniqueName(specialName, { recorder });
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name characters in URL string", async () => {
    const specialName = "汉字. special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'";
    const fileName: string = getUniqueName(specialName, { recorder });
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
    const fileName: string = getUniqueName("ру́сский язы́к", { recorder });
    const fileNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = fileSystemClient.getFileClient(fileNameEncoded);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileNameEncoded);
  });

  it("Should work with special blob name Russian", async () => {
    const fileName: string = getUniqueName("ру́сский язы́к", { recorder });
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Russian in URL string", async () => {
    const fileName: string = getUniqueName("ру́сский язы́к", { recorder });
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
    const fileName: string = getUniqueName("عربيعربى", { recorder });
    const fileNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = fileSystemClient.getFileClient(fileNameEncoded);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileNameEncoded);
  });

  it("Should work with special blob name Arabic", async () => {
    const fileName: string = getUniqueName("عربيعربى", { recorder });
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Arabic in URL string", async () => {
    const fileName: string = getUniqueName("عربيعربى", { recorder });
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
    const fileName: string = getUniqueName("にっぽんごにほんご", { recorder });
    const fileNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = fileSystemClient.getFileClient(fileNameEncoded);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileNameEncoded);
  });

  it("Should work with special blob name Japanese", async () => {
    const fileName: string = getUniqueName("にっぽんごにほんご", { recorder });
    const fileClient = fileSystemClient.getFileClient(fileName);

    await fileClient.create();
    await fileClient.getProperties();
    const response = (await fileSystemClient.listPaths({}).byPage().next()).value;

    assert.deepStrictEqual(response.pathItems.length, 1);
    assert.deepStrictEqual(response.pathItems[0].name, fileName);
  });

  it("Should work with special blob name Japanese in URL string", async () => {
    const fileName: string = getUniqueName("にっぽんごにほんご", { recorder });
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
