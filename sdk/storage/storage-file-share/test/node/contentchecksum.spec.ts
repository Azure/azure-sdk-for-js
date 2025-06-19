// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as buffer from "node:buffer";
import * as fs from "node:fs";
import * as path from "node:path";

import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type {
  ShareClient,
} from "../../src/index.js";
import { ShareFileClient } from "../../src/index.js";
import {
    createRandomLocalFile,
  // compareBodyWithUint8Array,
  getBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils/index.js";
import { describe, it, assert, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { StorageChecksumAlgorithm } from "../../src/models.js";
import { readStreamToLocalFileWithLogs } from "../utils/testutils.node.js";

// uploadData
// uploadFile
// downloadToBuffer
// downloadToFile
// uploadStream

describe("ContentChecksumValidation with client config - CRC64", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let fileName: string;
  let fileClient: ShareFileClient;
  let recorder: Recorder;
  let tempFileSmall: string;
  let tempFileLarge: string;
  const tempFolderPath = "temp";
  const timeoutForLargeFileUploadingTest = 30 * 60 * 1000;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-file-rename-source", "x-ms-copy-source"],
        },
        uriSanitizers,
      },
      ["record", "playback"],
    );
    const serviceClient = getBSU(recorder, 
        {
            uploadContentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
            downloadContentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
        });
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = shareClient.getDirectoryClient("").getFileClient(fileName);
  });

  afterEach(async () => {
    if (shareClient) {
      await shareClient.delete({ deleteSnapshots: "include" });
    }
    await recorder.stop();
  });

  beforeAll(async () => {
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    tempFileLarge = await createRandomLocalFile(tempFolderPath, 257, 1024 * 1024);
    tempFileSmall = await createRandomLocalFile(tempFolderPath, 15, 1024 * 1024);

  afterAll(async () => {
    fs.unlinkSync(tempFileLarge);
    fs.unlinkSync(tempFileSmall);
  });
  
  it(
      "uploadFile should success for large data",
      { timeout: timeoutForLargeFileUploadingTest },
      async (ctx) => {
        if (!isLiveMode()) {
          ctx.skip();
        }
        await fileClient.uploadFile(tempFileLarge, {
          concurrency: 20,
          rangeSize: 4 * 1024 * 1024,
        });    
        
        const downloadedFilePath = recorder.variable(
            "downloadedtofile.",
            getUniqueName("downloadedtofile."),
        );
  
        const downloadResponse = await fileClient.downloadToFile(downloadedFilePath, undefined, undefined, {
            contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto
        });
        assert.ok(
            downloadResponse.contentLength === tempFileLargeLength,
            "response.contentLength doesn't match tempFileSmallLength",
            );
        assert.equal(
            downloadResponse.readableStreamBody,
            undefined,
            "Expecting response.readableStreamBody to be undefined.",
            );
  
        const downloadedData = await fs.readFileSync(downloadedFilePath);
        const uploadedData = await fs.readFileSync(tempFileLarge);
  
        fs.unlinkSync(downloadedFilePath);
        assert.ok(downloadedData.equals(uploadedData));
      },
    );
  
    it.only("uploadFile should success for small data", async (ctx) => {
      if (!isLiveMode()) {
        ctx.skip();
      }
      await fileClient.uploadFile(tempFileSmall, {
        concurrency: 20,
        rangeSize: 4 * 1024 * 1024,
      });
  
      const downloadResponse = await fileClient.download(0);
      const downloadedFile = path.join(
        tempFolderPath,
        recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
      );
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

      const downloadedData = await fs.readFileSync(downloadedFile);
      const uploadedData = await fs.readFileSync(tempFileSmall);
  
      fs.unlinkSync(downloadedFile);
      assert.ok(downloadedData.equals(uploadedData));
    });
});