// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ShareClient } from "../../../src/index.js";
import { ShareDirectoryClient, ShareFileClient } from "../../../src/index.js";
import { appendToURLPath } from "../../../src/utils/utils.common.js";
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createShareServiceClient } from "../../utils/node/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { getAccountKey } from "../../utils/injectables.js";

describe.runIf(getAccountKey())("Special Naming Tests", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let directoryName: string;
  let directoryClient: ShareDirectoryClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("SharedKeyCredential", { recorder });
    assert.isDefined(serviceClient);

    shareName = getUniqueName("1share-with-dash", { recorder });
    shareClient = serviceClient.getShareClient(shareName);

    directoryName = getUniqueName("dir", { recorder });
    directoryClient = shareClient.getDirectoryClient(directoryName);

    await shareClient.create();
    await directoryClient.create();
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("Should work with special container and file names with spaces", async () => {
    const fileName = getUniqueName("file empty", { recorder });
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names with spaces in URL string", async () => {
    const fileName = getUniqueName("file empty", { recorder });
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline,
    );

    await fileClient.create(10);

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names uppercase", async () => {
    const fileName = getUniqueName("Upper file empty another", { recorder });
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names uppercase in URL string", async () => {
    const fileName = getUniqueName("Upper file empty another", { recorder });
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline,
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file names Chinese characters", async () => {
    const fileName = getUniqueName("Upper file empty another 汉字", { recorder });
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file names Chinese characters in URL string", async () => {
    const fileName = getUniqueName("Upper file empty another 汉字", { recorder });
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline,
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (
      await directoryClient.listFilesAndDirectories({ prefix: fileName }).byPage().next()
    ).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name characters", async () => {
    const specialName = "汉字. special ~!@#$%^&()_+`1234567890-={}[];','";
    const fileName = getUniqueName(specialName, { recorder });
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
    const specialName = "汉字. special ~!@#$%^&()_+`1234567890-={}[];','";
    const fileName = getUniqueName(specialName, { recorder });
    const fileClient = new ShareFileClient(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XXXClient object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(directoryClient.url, fileName.replace(/%/g, "%25").replace(/\?/g, "%3F")),
      (directoryClient as any).pipeline,
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
    const specialName = "汉字. special ~!@#$%^&()_+`1234567890-={}[];','";
    const directoryNameSpecialChar = getUniqueName(specialName, { recorder });
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
    const specialName = "汉字. special ~!@#$%^&()_+`1234567890-={}[];','";
    const directoryNameSpecialChar = getUniqueName(specialName, { recorder });
    const specialDirectoryClient = new ShareDirectoryClient(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XXXClient object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(
        shareClient.url,
        directoryNameSpecialChar.replace(/%/g, "%25").replace(/\?/g, "%3F"),
      ),
      (shareClient as any).pipeline,
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
    const fileName = getUniqueName("ру́сский язы́к", { recorder });
    const blobNameEncoded = encodeURIComponent(fileName);
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
    const fileName = getUniqueName("ру́сский язы́к", { recorder });
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
    const fileName = getUniqueName("ру́сский язы́к", { recorder });
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline,
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
    const fileName = getUniqueName("عربي/عربى", { recorder });
    const blobNameEncoded = encodeURIComponent(fileName);
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
    const fileName = getUniqueName("عربيعربى", { recorder });
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
    const fileName = getUniqueName("عربيعربى", { recorder });
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline,
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
    const fileName = getUniqueName("にっぽんごにほんご", { recorder });
    const blobNameEncoded = encodeURIComponent(fileName);
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
    const fileName = getUniqueName("にっぽんごにほんご", { recorder });
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
    const fileName = getUniqueName("にっぽんごにほんご", { recorder });
    const fileClient = new ShareFileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline,
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
