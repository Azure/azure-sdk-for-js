import * as assert from "assert";
import { Buffer } from "buffer";
import * as fs from "fs";
import * as path from "path";
import * as zlib from "zlib";
import { Duplex } from "stream";

import { record, Recorder } from "@azure/test-utils-recorder";

import {
  FileSASPermissions,
  generateFileSASQueryParameters,
  newPipeline,
  ShareClient,
  ShareDirectoryClient,
  ShareFileClient,
  StorageSharedKeyCredential
} from "../../src";
import { readStreamToLocalFileWithLogs } from "../../test/utils/testutils.node";
import { bodyToString, createRandomLocalFile, getBSU, recorderEnvSetup } from "../utils";

describe("FileClient Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let fileName: string;
  let fileClient: ShareFileClient;
  const content = "Hello World";
  const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.getUniqueName("dir");
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    fileName = recorder.getUniqueName("file");
    fileClient = dirClient.getFileClient(fileName);
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await shareClient.delete();
      await recorder.stop();
    }
  });

  it("uploadData - large Buffer as data", async () => {
    recorder.skip("node", "Temp File - recorder doesn't support saving the file");
    await fileClient.create(257 * 1024 * 1024 * 1024);
    const tempFolderPath = "temp";
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    const tempFileLarge = await createRandomLocalFile(tempFolderPath, 257, 1024 * 1024);
    await fileClient.uploadData(fs.readFileSync(tempFileLarge));

    const downloadResponse = await fileClient.download();
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileLarge);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  }).timeout(timeoutForLargeFileUploadingTest);

  it("upload with buffer and default parameters", async () => {
    const body: string = recorder.getUniqueName("randomstring");
    const bodyBuffer = Buffer.from(body);

    await fileClient.create(body.length);
    await fileClient.uploadRange(bodyBuffer, 0, body.length);
    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("uploadData with empty buffer", async () => {
    await fileClient.uploadData(Buffer.alloc(0));
    const response = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(response), "");
  });

  it("upload with Node.js stream", async () => {
    const body: string = recorder.getUniqueName("randomstring");

    await fileClient.create(body.length);
    await fileClient.uploadRange(
      () => {
        const duplexStream = new Duplex();
        duplexStream.push(body);
        duplexStream.push(null);
        return duplexStream;
      },
      0,
      body.length
    );
    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with Chinese string body and default parameters", async () => {
    const body: string = recorder.getUniqueName("randomstring你好");
    const bodyLength = Buffer.byteLength(body);

    await fileClient.create(bodyLength);
    await fileClient.uploadRange(body, 0, bodyLength);
    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, bodyLength), body);
  });

  it("can be created with a url and a credential", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b"
    };
    await fileClient.setMetadata(metadata);

    const factories = (fileClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new ShareFileClient(fileClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b"
    };
    await fileClient.setMetadata(metadata);

    const factories = (fileClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new ShareFileClient(fileClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b"
    };
    await fileClient.setMetadata(metadata);

    const factories = (fileClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new ShareFileClient(fileClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("uploadRangeFromURL", async () => {
    await fileClient.create(1024);

    const content = "a".repeat(512) + "b".repeat(512);
    await fileClient.uploadRange(content, 0, content.length);

    // Get a SAS for fileURL
    const factories = (fileClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const expiresOn = recorder.newDate("now");
    expiresOn.setDate(expiresOn.getDate() + 1);
    const sas = generateFileSASQueryParameters(
      {
        expiresOn,
        shareName,
        filePath: `${dirName}/${fileName}`,
        permissions: FileSASPermissions.parse("r")
      },
      credential
    );

    const fileName2 = recorder.getUniqueName("file2");
    const fileURL2 = dirClient.getFileClient(fileName2);

    await fileURL2.create(1024);

    await fileURL2.uploadRangeFromURL(`${fileClient.url}?${sas}`, 0, 0, 512);
    await fileURL2.uploadRangeFromURL(`${fileClient.url}?${sas}`, 512, 512, 512);

    const range1 = await fileURL2.download(0, 512);
    const range2 = await fileURL2.download(512, 512);

    assert.equal(await bodyToString(range1, 512), "a".repeat(512));
    assert.equal(await bodyToString(range2, 512), "b".repeat(512));
  });

  it("should not decompress during downloading", async () => {
    const body: string = "hello world body string!";
    const deflated = zlib.deflateSync(body);

    await fileClient.uploadData(deflated, {
      fileHttpHeaders: {
        fileContentEncoding: "deflate",
        fileContentType: "text/plain"
      }
    });

    const downloaded = await fileClient.downloadToBuffer();
    assert.deepStrictEqual(downloaded, deflated);
  });
});
