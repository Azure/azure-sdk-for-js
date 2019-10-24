import { FileClient } from "../src/FileClient";
import { getBSU } from "./utils/index";
import * as assert from "assert";
import { appendToURLPath } from "../src/utils/utils.common";
import { DirectoryClient } from "../src/DirectoryClient";
import { record } from "./utils/recorder";
import * as dotenv from "dotenv";
import { ShareClient } from "../src";
dotenv.config({ path: "../.env" });

describe("Special Naming Tests", () => {
  const serviceClient = getBSU();
  let shareName: string;
  let shareClient: ShareClient;
  let directoryName: string;
  let directoryClient: DirectoryClient;

  let recorder: any;

  before(async function() {
    recorder = record(this);

    shareName = recorder.getUniqueName("1share-with-dash");
    shareClient = serviceClient.getShareClient(shareName);

    directoryName = recorder.getUniqueName("dir");
    directoryClient = shareClient.getDirectoryClient(directoryName);

    await shareClient.create();
    await directoryClient.create();

    recorder.stop();
  });

  after(async function() {
    recorder = record(this);
    await shareClient.delete();
    recorder.stop();
  });

  beforeEach(function() {
    recorder = record(this);
  });

  afterEach(function() {
    recorder.stop();
  });

  it("Should work with special container and file names with spaces", async () => {
    const fileName: string = recorder.getUniqueName("file empty");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);

    const response = (await directoryClient
      .listFilesAndDirectories({ prefix: fileName })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names with spaces in URL string", async () => {
    const fileName: string = recorder.getUniqueName("file empty");
    const fileClient = new FileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);

    const response = (await directoryClient
      .listFilesAndDirectories({ prefix: fileName })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names uppercase", async () => {
    const fileName: string = recorder.getUniqueName("Upper file empty another");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({ prefix: fileName })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special container and file names uppercase in URL string", async () => {
    const fileName: string = recorder.getUniqueName("Upper file empty another");
    const fileClient = new FileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({ prefix: fileName })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file names Chinese characters", async () => {
    const fileName: string = recorder.getUniqueName("Upper file empty another 汉字");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({ prefix: fileName })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file names Chinese characters in URL string", async () => {
    const fileName: string = recorder.getUniqueName("Upper file empty another 汉字");
    const fileClient = new FileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({ prefix: fileName })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name characters", async () => {
    const fileName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({
        // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
        prefix: fileName.replace(/\\/g, "/")
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name characters in URL string", async () => {
    const fileName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const fileClient = new FileClient(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XXXClient object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(directoryClient.url, fileName.replace(/%/g, "%25").replace(/\?/g, "%3F")),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({
        // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
        prefix: fileName.replace(/\\/g, "/")
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special directory name characters", async () => {
    const directoryName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const specialDirectoryClient = shareClient.getDirectoryClient(directoryName);
    const rootDirectoryClient = shareClient.getDirectoryClient("");

    await specialDirectoryClient.create();
    await specialDirectoryClient.getProperties();

    const response = (await rootDirectoryClient
      .listFilesAndDirectories({
        // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
        prefix: directoryName.replace(/\\/g, "/")
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.directoryItems.length, 0);
  });

  it("Should work with special directory name characters in URL string", async () => {
    const directoryName: string = recorder.getUniqueName(
      "汉字. special ~!@#$%^&()_+`1234567890-={}[];','"
    );
    const specialDirectoryClient = new DirectoryClient(
      // There are 2 special cases for a URL string:
      // Escape "%" when creating XXXClient object with URL strings
      // Escape "?" otherwise string after "?" will be treated as URL parameters
      appendToURLPath(shareClient.url, directoryName.replace(/%/g, "%25").replace(/\?/g, "%3F")),
      (shareClient as any).pipeline
    );

    await specialDirectoryClient.create();
    await specialDirectoryClient.getProperties();

    const rootDirectoryClient = shareClient.getDirectoryClient("");

    const response = (await rootDirectoryClient
      .listFilesAndDirectories({
        // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
        prefix: directoryName.replace(/\\/g, "/")
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.directoryItems.length, 0);
  });

  it("Should work with special file name Russian URI encoded", async () => {
    const fileName: string = recorder.getUniqueName("ру́сский язы́к");
    const blobNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = directoryClient.getFileClient(blobNameEncoded);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({
        prefix: blobNameEncoded
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Russian", async () => {
    const fileName: string = recorder.getUniqueName("ру́сский язы́к");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({
        prefix: fileName
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Russian in URL string", async () => {
    const fileName: string = recorder.getUniqueName("ру́сский язы́к");
    const fileClient = new FileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({
        prefix: fileName
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Arabic URI encoded", async () => {
    const fileName: string = recorder.getUniqueName("عربي/عربى");
    const blobNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = directoryClient.getFileClient(blobNameEncoded);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({
        prefix: blobNameEncoded
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Arabic", async () => {
    const fileName: string = recorder.getUniqueName("عربيعربى");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({
        prefix: fileName
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Arabic in URL string", async () => {
    const fileName: string = recorder.getUniqueName("عربيعربى");
    const fileClient = new FileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({
        prefix: fileName
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Japanese URI encoded", async () => {
    const fileName: string = recorder.getUniqueName("にっぽんごにほんご");
    const blobNameEncoded: string = encodeURIComponent(fileName);
    const fileClient = directoryClient.getFileClient(blobNameEncoded);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({
        prefix: blobNameEncoded
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Japanese", async () => {
    const fileName: string = recorder.getUniqueName("にっぽんごにほんご");
    const fileClient = directoryClient.getFileClient(fileName);

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({
        prefix: fileName
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });

  it("Should work with special file name Japanese in URL string", async () => {
    const fileName: string = recorder.getUniqueName("にっぽんごにほんご");
    const fileClient = new FileClient(
      appendToURLPath(directoryClient.url, fileName),
      (directoryClient as any).pipeline
    );

    await fileClient.create(10);
    await fileClient.getProperties();

    const response = (await directoryClient
      .listFilesAndDirectories({
        prefix: fileName
      })
      .byPage()
      .next()).value;

    assert.notDeepEqual(response.segment.fileItems.length, 0);
  });
});
