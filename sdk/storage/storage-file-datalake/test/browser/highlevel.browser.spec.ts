import { record } from "@azure/test-utils-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";
import { DataLakeFileClient, DataLakeFileSystemClient } from "../../src";
import { getDataLakeServiceClient, recorderEnvSetup } from "../utils";
import {
  blobToString,
  bodyToString,
  getBrowserFile,
  isIE,
  blobToArrayBuffer,
  arrayBufferEqual
} from "../utils/index.browser";
import { MB } from "../../src/utils/constants";
import { AbortController } from "@azure/abort-controller";

dotenv.config();

describe("Highlevel browser only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  let tempFileLarge: File;
  const tempFileLargeLength: number = 257 * MB - 1;
  let tempFileSmall: File;
  const tempFileSmallLength: number = 1 * MB - 1;
  let recorder: any;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    fileName = recorder.getUniqueName("file");
    fileClient = fileSystemClient.getFileClient(fileName);
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await fileSystemClient.delete();
      await recorder.stop();
    }
  });

  before(async function() {
    recorder = record(this, recorderEnvSetup);
    tempFileLarge = getBrowserFile(recorder.getUniqueName("browserfilesmall"), tempFileLargeLength);
    tempFileSmall = getBrowserFile(recorder.getUniqueName("browserfilelarge"), tempFileSmallLength);
    await recorder.stop();
  });

  after(async () => {});

  it("upload should succeed with a single upload", async () => {
    recorder.skip("browser", "Temp file - recorder doesn't support saving the file");
    await fileClient.upload(tempFileSmall);

    const readResponse = await fileClient.read();
    const readString = await bodyToString(readResponse);
    const uploadedString = await blobToString(tempFileSmall);
    assert.equal(uploadedString, readString);
  });

  it("upload should work for large data", async function() {
    recorder.skip("browser", "Temp file - recorder doesn't support saving the file");
    if (isIE()) {
      assert.ok(
        true,
        "Skip this case in IE11 which doesn't have enough memory for downloading validation"
      );
      this.skip();
    }
    await fileClient.upload(tempFileLarge);
    const readResponse = await fileClient.read();

    const readBuf = await blobToArrayBuffer(await readResponse.contentAsBlob!);
    const localBuf = await blobToArrayBuffer(tempFileLarge);
    assert.ok(arrayBufferEqual(readBuf, localBuf));
  });

  it("upload can abort", async () => {
    recorder.skip("browser", "Temp file - recorder doesn't support saving the file");
    const aborter = AbortController.timeout(1);
    try {
      await fileClient.upload(tempFileLarge, {
        abortSignal: aborter,
        singleUploadThreshold: 8 * MB
      });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("upload can update progress with single-shot upload", async () => {
    recorder.skip(
      "browser",
      "Abort - Recorder does not record a request if it's aborted in a 'progress' callback"
    );
    let eventTriggered = false;
    const aborter = new AbortController();

    try {
      await fileClient.upload(tempFileSmall, {
        abortSignal: aborter.signal,
        maxConcurrency: 20,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
    assert.ok(eventTriggered);
  });

  it("upload can update progress with parallel upload", async () => {
    recorder.skip(
      "browser",
      "Abort - Recorder does not record a request if it's aborted in a 'progress' callback"
    );
    let eventTriggered = false;
    const aborter = new AbortController();

    try {
      await fileClient.upload(tempFileLarge, {
        abortSignal: aborter.signal,
        maxConcurrency: 20,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
        singleUploadThreshold: 8 * MB
      });
    } catch (err) {
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
    assert.ok(eventTriggered);
  });

  it("upload empty data should succeed", async () => {
    const tempFileEmpty = getBrowserFile(recorder.getUniqueName("browserfileempty"), 0);
    await fileClient.upload(tempFileEmpty);
    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "");
  });
});
