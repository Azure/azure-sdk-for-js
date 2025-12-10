// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type { DataLakeFileClient, DataLakeFileSystemClient } from "../../src/index.js";
import {
  getDataLakeServiceClient,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils/index.js";
import { getBrowserFile, arrayBufferEqual } from "../utils/index-browser.mjs";
import { MB } from "../../src/utils/constants.js";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";

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

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const serviceClient = getDataLakeServiceClient(recorder);
    fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = fileSystemClient.getFileClient(fileName);
  });

  afterEach(async () => {
    if (fileSystemClient) {
      await fileSystemClient.delete();
    }
    await recorder.stop();
  });

  beforeAll(async () => {
    tempFileLarge = getBrowserFile("browserfilesmall", tempFileLargeLength);
    tempFileSmall = getBrowserFile("browserfilelarge", tempFileSmallLength);
  });

  it("upload should succeed with a single upload", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }
    await fileClient.upload(tempFileSmall);

    const readResponse = await fileClient.read();
    const readString = await (await readResponse.contentAsBlob!).text();
    const uploadedString = await tempFileSmall.text();
    assert.equal(uploadedString, readString);
  });

  it("upload should work for large data", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }
    await fileClient.upload(tempFileLarge);
    const readResponse = await fileClient.read();

    const readBuf = await (await readResponse.contentAsBlob!).arrayBuffer();
    const localBuf = await tempFileLarge.arrayBuffer();
    assert.isTrue(arrayBufferEqual(readBuf, localBuf));
  });

  it("upload can abort", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const aborter = AbortSignal.timeout(1);
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

  it("upload can update progress with single-shot upload", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }
    let eventTriggered = false;
    const aborter = new AbortController();

    try {
      await fileClient.upload(tempFileSmall, {
        abortSignal: aborter.signal,
        maxConcurrency: 20,
        onProgress: (ev) => {
          assert.isDefined(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
      });
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
    assert.isDefined(eventTriggered);
  });

  it("upload can update progress with parallel upload", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }
    let eventTriggered = false;
    const aborter = new AbortController();

    try {
      await fileClient.upload(tempFileLarge, {
        abortSignal: aborter.signal,
        maxConcurrency: 20,
        onProgress: (ev) => {
          assert.isDefined(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
        singleUploadThreshold: 8 * MB,
      });
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
    assert.isDefined(eventTriggered);
  });

  it("upload empty data should succeed", async () => {
    const tempFileEmpty = getBrowserFile(
      recorder.variable("browserfileempty", getUniqueName("browserfileempty")),
      0,
    );
    await fileClient.upload(tempFileEmpty);
    const response = await fileClient.read();
    const bodyString = await (await response.contentAsBlob!).text();
    assert.deepStrictEqual(bodyString, "");
  });

  it("upload should work with Blob, ArrayBuffer and ArrayBufferView", async () => {
    async function assertSameBlob(actualBlob: Blob | undefined, expectedBlob: Blob): Promise<void> {
      if (!actualBlob) {
        throw new Error("actualBlob is undefined");
      }
      assert.equal(actualBlob.size, expectedBlob.size);
      const actualData = new Uint8Array(await actualBlob.arrayBuffer());
      const expectedData = new Uint8Array(await expectedBlob.arrayBuffer());

      const actualValues = Array.from(actualData.values());
      const expectedValues = Array.from(expectedData.values());

      assert.deepStrictEqual(actualValues, expectedValues);
      assert.isTrue(arrayBufferEqual(actualData.buffer, expectedData.buffer));
    }

    const byteLength = 10;
    const arrayBuf = new ArrayBuffer(byteLength);
    const uint8Array = new Uint8Array(arrayBuf);
    for (let i = 0; i < byteLength; i++) {
      uint8Array[i] = i;
    }

    const blob = new Blob([arrayBuf]);
    await fileClient.upload(blob);
    const downloadedBlob = await (await fileClient.read()).contentAsBlob!;
    assert.isTrue(arrayBufferEqual(await downloadedBlob.arrayBuffer(), await blob.arrayBuffer()));

    await fileClient.upload(arrayBuf);
    const downloadedBlob1 = await (await fileClient.read()).contentAsBlob!;
    assert.isTrue(arrayBufferEqual(await downloadedBlob1.arrayBuffer(), await blob.arrayBuffer()));

    const uint8ArrayPartial = new Uint8Array(arrayBuf, 1, 3);
    await fileClient.upload(uint8ArrayPartial);
    const downloadedBlob2 = await (await fileClient.read()).contentAsBlob!;
    await assertSameBlob(
      downloadedBlob2,
      new Blob([uint8ArrayPartial], { type: "application/octet-stream" }),
    );

    const uint16Array = new Uint16Array(arrayBuf, 4, 2);
    await fileClient.upload(uint16Array);
    const downloadedBlob3 = await (await fileClient.read()).contentAsBlob!;
    await assertSameBlob(
      downloadedBlob3,
      new Blob([uint16Array], { type: "application/octet-stream" }),
    );
  });
});
