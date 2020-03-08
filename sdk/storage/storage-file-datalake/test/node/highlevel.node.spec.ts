import { record } from "@azure/test-utils-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { DataLakeFileClient, DataLakeFileSystemClient } from "../../src";
import { bodyToString, createRandomLocalFile, getDataLakeServiceClient, recorderEnvSetup } from "../utils";
import { MB } from "../../src/utils/constants";
import { readStreamToLocalFileWithLogs } from "../../test/utils/testutils.node";
const { Readable } = require('stream')
import { AbortController } from "@azure/abort-controller";
dotenv.config({ path: "../.env" });

import { setLogLevel } from "@azure/logger";
setLogLevel("info");

describe("Highlevel Node.js only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  let tempFileSmall: string;
  let tempFileSmallLength: number;
  let tempFileLarge: string;
  let tempFileLargeLength: number;
  const tempFolderPath = "temp";
  const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;
  const content = "Hello World";

  let recorder: any;

  beforeEach(async function () {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    fileName = recorder.getUniqueName("file");
    fileClient = fileSystemClient.getFileClient(fileName);
  });

  afterEach(async function () {
    await fileSystemClient.delete();
    recorder.stop();
  });

  before(async function () {
    recorder = record(this, recorderEnvSetup);
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    tempFileLarge = await createRandomLocalFile(tempFolderPath, 257, MB);
    tempFileLargeLength = 257 * MB;
    tempFileSmall = await createRandomLocalFile(tempFolderPath, 15, MB);
    tempFileSmallLength = 15 * MB;

    console.log(tempFileLargeLength, tempFileSmallLength);
    recorder.stop();
  });

  after(async function () {
    recorder = record(this, recorderEnvSetup);
    fs.unlinkSync(tempFileLarge);
    fs.unlinkSync(tempFileSmall);
    recorder.stop();
  });

  it("upload should work for large data", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    await fileClient.upload(uploadedBuffer);

    const readResponse = await fileClient.read();
    const readFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(readResponse.readableStreamBody!, readFile);
    const readBuffer = await fs.readFileSync(readFile);
    assert.ok(uploadedBuffer.equals(readBuffer));

    fs.unlinkSync(readFile);
  }).timeout(timeoutForLargeFileUploadingTest);

  it("upload should work for small data", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    await fileClient.upload(uploadedBuffer);

    const readResponse = await fileClient.read();
    const readFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(readResponse.readableStreamBody!, readFile);
    const readBuffer = await fs.readFileSync(readFile);
    assert.ok(uploadedBuffer.equals(readBuffer));

    fs.unlinkSync(readFile);
  });

  it("upload should abort for single-shot upload", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const aborter = AbortController.timeout(1);
    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    try {
      await fileClient.upload(uploadedBuffer, {
        abortSignal: aborter,
        maxConcurrency: 20,
        chunkSize: 16 * MB
      });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  it.only("upload should abort for parallel upload", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const aborter = AbortController.timeout(1000);
    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    try {
      await fileClient.upload(uploadedBuffer, {
        abortSignal: aborter,
        maxConcurrency: 20,
        chunkSize: 8 * MB
      });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("upload should update progress with single-shot upload", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    let eventTriggered = false;
    const aborter = new AbortController();

    try {
      await fileClient.uploadFile(tempFileLarge, {
        abortSignal: aborter.signal,
        maxConcurrency: 20,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
        chunkSize: 4 * 1024 * 1024
      });
    } catch (err) {
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
    assert.ok(eventTriggered);
  });

  it("upload should work with small chunk of data", async () => {
    await fileClient.upload(Buffer.from(content));
    const readResponse = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(readResponse), content);
  });

  it("upload empty data should succeed", async () => {
    await fileClient.upload(Buffer.alloc(0));
    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "");
  })

  it("uploadStream should work", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileSmall);
    await fileClient.uploadStream(rs);

    const readResponse = await fileClient.read();
    const readFilePath = path.join(tempFolderPath, recorder.getUniqueName("readFile"));
    await readStreamToLocalFileWithLogs(readResponse.readableStreamBody!, readFilePath);

    const readBuffer = fs.readFileSync(readFilePath);
    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    assert.ok(uploadedBuffer.equals(readBuffer));

    fs.unlinkSync(readFilePath);
  });

  it("uploadStream with empty data should succeed", async () => {
    const readable = new Readable();
    readable.push(null);

    // create and flush
    await fileClient.uploadStream(readable);
    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "");
  })

  it("uploadFile should work", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await fileClient.uploadFile(tempFileSmall);

    const readResponse = await fileClient.read();
    const readFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(readResponse.readableStreamBody!, readFile);
    const readBuffer = await fs.readFileSync(readFile);

    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    assert.ok(uploadedBuffer.equals(readBuffer));

    fs.unlinkSync(readFile);
  });

  it("readToBuffer should work - without passing the buffer", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");

    const rs = fs.createReadStream(tempFileSmall);
    await fileClient.uploadStream(rs);

    const buf = await fileClient.readToBuffer(undefined, 0);
    const localFileContent = fs.readFileSync(tempFileSmall);
    assert.ok(localFileContent.equals(buf));
  })

  it("readToFile should work", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");

    const readFilePath = recorder.getUniqueName("readFilePath");
    const rs = fs.createReadStream(tempFileSmall);
    await fileClient.uploadStream(rs);

    const readResponse = await fileClient.readToFile(readFilePath);
    assert.ok(
      readResponse.contentLength === tempFileSmallLength,
      "readResponse.contentLength doesn't match tempFileSmallLength"
    );
    assert.equal(
      readResponse.readableStreamBody,
      undefined,
      "Expecting readResponse.readableStreamBody to be undefined."
    );

    const localFileContent = fs.readFileSync(tempFileSmall);
    const readFileContent = fs.readFileSync(readFilePath);
    assert.ok(localFileContent.equals(readFileContent));

    fs.unlinkSync(readFilePath);
  }).timeout(timeoutForLargeFileUploadingTest);
});
