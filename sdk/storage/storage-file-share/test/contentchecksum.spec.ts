// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type {
  ShareClient,
} from "../src/index.js";
import { ShareFileClient } from "../src/index.js";
import { FileSystemAttributes } from "../src/FileSystemAttributes.js";
import {
  bodyToString,
  // compareBodyWithUint8Array,
  getBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils/index.js";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import { StorageChecksumAlgorithm } from "../src/models.js";

expect.extend({ toSupportTracing });

describe("ContentChecksumValidation with client config - CRC64", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let fileName: string;
  let fileClient: ShareFileClient;
  let recorder: Recorder;

  const fullFileAttributes = new FileSystemAttributes();
  fullFileAttributes.readonly = true;
  fullFileAttributes.hidden = true;
  fullFileAttributes.system = true;
  fullFileAttributes.archive = true;
  fullFileAttributes.temporary = true;
  fullFileAttributes.offline = true;
  fullFileAttributes.notContentIndexed = true;
  fullFileAttributes.noScrubData = true;

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

  it.only("uploadRange", async () => {
    await fileClient.create(10);
    const uploadResult1 = await fileClient.uploadRange("Hello", 0, 5);
    const uploadResult2 = await fileClient.uploadRange("World", 5, 5);
    assert.deepEqual(uploadResult1.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.deepEqual(uploadResult2.structuredBodyType, "XSM/1.0; properties=crc64");
    const response = await fileClient.download(0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
    assert.deepEqual(response.structuredBodyType, "XSM/1.0; properties=crc64");
  });
});