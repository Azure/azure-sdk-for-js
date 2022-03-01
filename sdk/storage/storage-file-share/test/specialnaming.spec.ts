// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ShareClient, ShareDirectoryClient, ShareFileClient } from "../src";
import { getBSU, recorderEnvSetup } from "./utils/index";
import { assert } from "chai";
import { appendToURLPath } from "../src/utils/utils.common";
import { record, Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("Special Naming Tests", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let directoryName: string;
  let directoryClient: ShareDirectoryClient;

  let recorder: Recorder;

  before(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();

    shareName = recorder.getUniqueName("1share-with-dash");
    shareClient = serviceClient.getShareClient(shareName);

    directoryName = recorder.getUniqueName("dir");
    directoryClient = shareClient.getDirectoryClient(directoryName);

    await shareClient.create();
    await directoryClient.create();

    await recorder.stop();
  });

  after(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    await shareClient.delete();
    await recorder.stop();
  });

  beforeEach(function (this: Context) {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should work with special container and file names with spaces", async () => {
    const fileName: string = recorder.getUniqueName("file empty");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names with spaces in URL string", async () => {
    const fileName: string = recorder.getUniqueName("file empty");
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names uppercase", async () => {
    const fileName: string = recorder.getUniqueName("Upper file empty another");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names uppercase in URL string", async () => {
    const fileName: string = recorder.getUniqueName("Upper file empty another");
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file names Chinese characters", async () => {
    const fileName: string = recorder.getUniqueName("Upper file empty another 汉字");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file names Chinese characters in URL string", async () => {
    const fileName: string = recorder.getUniqueName("Upper file empty another 汉字");
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name characters", async () => {
    const fileName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient
        .listFilesAndDirectories({
          // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
          prefix: fileName.replace(/\\/g, "/"),
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name characters in URL string", async () => {
    const fileName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const fileClient = new ShareFileClient(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XXXClient object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(directoryClient.url, fileName.replace(/%/g, "%25").replace(/\?/g, "%3F")),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient
        .listFilesAndDirectories({
          // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
          prefix: fileName.replace(/\\/g, "/"),
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special directory name characters", async () => {
    const directoryNameSpecialChar: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const specialDirectoryClient = shareClient.getDirectoryClient(directoryNameSpecialChar);
    const rootDirectoryClient = shareClient.getDirectoryClient("");

    await specialDirectoryClient.create();
    await specialDirectoryClient.getProperties();

    const response = (
      await rootDirectoryClient
        .listFilesAndDirectories({
          // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
          prefix: directoryNameSpecialChar.replace(/\\/g, "/"),
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.directoryItems.length, 0);
  });

  it("Should work with special directory name characters in URL string", async () => {
    const directoryNameSpecialChar: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const specialDirectoryClient = new ShareDirectoryClient(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XXXClient object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(
        shareClient.url,
        directoryNameSpecialChar.replace(/%/g, "%25").replace(/\?/g, "%3F")
      ),
      (shareClient as any).pipeline
    );

    await specialDirectoryClient.create();
    await specialDirectoryClient.getProperties();

    const rootDirectoryClient = shareClient.getDirectoryClient("");

    const response = (
      await rootDirectoryClient
        .listFilesAndDirectories({
          // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
          prefix: directoryNameSpecialChar.replace(/\\/g, "/"),
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.directoryItems.length, 0);
  });

  it("Should work with special file name Russian URI encoded", async () => {
    const fileName: string = recorder.getUniqueName("ру́сский язы́к");
    const blobNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = directoryClient.getFileClient(blobNameEncoded);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient
        .listFilesAndDirectories({
          prefix: blobNameEncoded,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Russian", async () => {
    const fileName: string = recorder.getUniqueName("ру́сский язы́к");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient
        .listFilesAndDirectories({
          prefix: fileName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Russian in URL string", async () => {
    const fileName: string = recorder.getUniqueName("ру́сский язы́к");
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient
        .listFilesAndDirectories({
          prefix: fileName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Arabic URI encoded", async () => {
    const fileName: string = recorder.getUniqueName("عربي/عربى");
    const blobNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = directoryClient.getFileClient(blobNameEncoded);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient
        .listFilesAndDirectories({
          prefix: blobNameEncoded,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Arabic", async () => {
    const fileName: string = recorder.getUniqueName("عربيعربى");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient
        .listFilesAndDirectories({
          prefix: fileName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Arabic in URL string", async () => {
    const fileName: string = recorder.getUniqueName("عربيعربى");
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient
        .listFilesAndDirectories({
          prefix: fileName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Japanese URI encoded", async () => {
    const fileName: string = recorder.getUniqueName("にっぽんごにほんご");
    const blobNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = directoryClient.getFileClient(blobNameEncoded);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient
        .listFilesAndDirectories({
          prefix: blobNameEncoded,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Japanese", async () => {
    const fileName: string = recorder.getUniqueName("にっぽんごにほんご");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient
        .listFilesAndDirectories({
          prefix: fileName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Japanese in URL string", async () => {
    const fileName: string = recorder.getUniqueName("にっぽんごにほんご");
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient
        .listFilesAndDirectories({
          prefix: fileName,
        })
        .byPage()
        .next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });
});
