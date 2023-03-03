// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { record, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { DataLakeFileClient, DataLakeFileSystemClient } from "../../src";
import { getDataLakeServiceClient, recorderEnvSetup } from "../utils";
import {
  blobToString,
  bodyToString,
  getBrowserFile,
  blobToArrayBuffer,
  arrayBufferEqual,
} from "../utils/index.browser";
import { MB } from "../../src/utils/constants";
import { AbortController } from "@azure/abort-controller";
import { Context } from "mocha";

describe("Highlevel browser only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  let tempFileLarge: File;
  const tempFileLargeLength: number = 257 * MB - 1;
  let tempFileSmall: File;
  const tempFileSmallLength: number = 1 * MB - 1;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    fileName = recorder.getUniqueName("file");
    fileClient = fileSystemClient.getFileClient(fileName);
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await fileSystemClient.delete();
      await recorder.stop();
    }
  });

  before(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    tempFileLarge = getBrowserFile(recorder.getUniqueName("browserfilesmall"), tempFileLargeLength);
    tempFileSmall = getBrowserFile(recorder.getUniqueName("browserfilelarge"), tempFileSmallLength);
    await recorder.stop();
  });

  it("upload should succeed with a single upload", async () => {
    recorder.skip("browser", "Temp file - recorder doesn't support saving the file");
    await fileClient.upload(tempFileSmall);

    const readResponse = await fileClient.read();
    const readString = await bodyToString(readResponse);
    const uploadedString = await blobToString(tempFileSmall);
    assert.equal(uploadedString, readString);
  });

  it("upload should work for large data", async function () {
    recorder.skip("browser", "Temp file - recorder doesn't support saving the file");
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
        singleUploadThreshold: 8 * MB,
      });
      assert.fail();
    } catch (err: any) {
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
        },
      });
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
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
        singleUploadThreshold: 8 * MB,
      });
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
    assert.ok(eventTriggered);
  });

  it("upload empty data should succeed", async () => {
    const tempFileEmpty = getBrowserFile(recorder.getUniqueName("browserfileempty"), 0);
    await fileClient.upload(tempFileEmpty);
    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "");
  });

  it("upload should work with Blob, ArrayBuffer and ArrayBufferView", async () => {
    const byteLength = 10;
    const arrayBuf = new ArrayBuffer(byteLength);
    const uint8Array = new Uint8Array(arrayBuf);
    for (let i = 0; i < byteLength; i++) {
      uint8Array[i] = i;
    }

    const blob = new Blob([arrayBuf]);
    await fileClient.upload(blob);
    const downloadedBlob = await (await fileClient.read()).contentAsBlob!;
    assert.ok(arrayBufferEqual(await downloadedBlob.arrayBuffer(), await blob.arrayBuffer()));

    await fileClient.upload(arrayBuf);
    const downloadedBlob1 = await (await fileClient.read()).contentAsBlob!;
    assert.ok(arrayBufferEqual(await downloadedBlob1.arrayBuffer(), await blob.arrayBuffer()));

    const uint8ArrayPartial = new Uint8Array(arrayBuf, 1, 3);
    await fileClient.upload(uint8ArrayPartial);
    const downloadedBlob2 = await (await fileClient.read()).contentAsBlob!;
    assert.ok(arrayBufferEqual(await downloadedBlob2.arrayBuffer(), uint8ArrayPartial));

    const uint16Array = new Uint16Array(arrayBuf, 4, 2);
    await fileClient.upload(uint16Array);
    const downloadedBlob3 = await (await fileClient.read()).contentAsBlob!;
    assert.ok(
      arrayBufferEqual(
        await downloadedBlob3.arrayBuffer(),
        new Uint8Array(uint16Array.buffer, uint16Array.byteOffset, uint16Array.byteLength)
      )
    );
  });
});
