// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type { ShareClient } from "../src/index.js";
import { ShareFileClient } from "../src/index.js";
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
    const serviceClient = getBSU(recorder, {
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

  it.only("uploadRange - ContentMd5", async () => {
    await fileClient.create(10);

    try {
      await fileClient.uploadRange("Hello", 0, 5, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        contentMD5: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (err) {
      assert.deepEqual((err as any).code, "Md5Mismatch");
    }
  });

  it.only("uploadRange - auto StorageChecksumAlgorithm", async () => {
    await fileClient.create(10);
    const uploadResult1 = await fileClient.uploadRange("Hello", 0, 5, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    const uploadResult2 = await fileClient.uploadRange("World", 5, 5, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    assert.deepEqual(uploadResult1.structuredBodyType, undefined);
    assert.deepEqual(uploadResult2.structuredBodyType, undefined);
    const response = await fileClient.download(0, 8, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
    assert.deepEqual(response.structuredBodyType, undefined);
  });
});

describe("ContentChecksumValidation with client config - None", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let fileName: string;
  let fileClient: ShareFileClient;
  let recorder: Recorder;

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
    const serviceClient = getBSU(recorder);
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
    const uploadResult1 = await fileClient.uploadRange("Hello", 0, 5, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
    });
    const uploadResult2 = await fileClient.uploadRange("World", 5, 5, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
    });
    assert.deepEqual(uploadResult1.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.deepEqual(uploadResult2.structuredBodyType, "XSM/1.0; properties=crc64");
    const response = await fileClient.download(0, 8, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
    });
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
    assert.deepEqual(response.structuredBodyType, "XSM/1.0; properties=crc64");
  });

  it.only("uploadRange", async () => {
    await fileClient.create(10);
    const uploadResult1 = await fileClient.uploadRange("Hello", 0, 5);
    const uploadResult2 = await fileClient.uploadRange("World", 5, 5);
    assert.deepEqual(uploadResult1.structuredBodyType, undefined);
    assert.deepEqual(uploadResult2.structuredBodyType, undefined);
    const response = await fileClient.download(0, 8);
    assert.deepStrictEqual(await bodyToString(response, 8), "HelloWor");
    assert.deepEqual(response.structuredBodyType, undefined);
  });
});
