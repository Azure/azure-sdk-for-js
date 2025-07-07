// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import {
  base64encode,
  bodyToString,
  getBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils/index.js";
import type { ContainerClient, BlobClient } from "../src/index.js";
import { StorageChecksumAlgorithm } from "../src/models.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("ContentChecksumValidation with client config - CRC64", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        uriSanitizers,
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-copy-source", "x-ms-encryption-key"] },
      },
      ["playback", "record"],
    );
    const blobServiceClient = getBSU(recorder, {
      uploadContentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
      downloadContentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
    });

    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
    blobClient = containerClient.getBlobClient(blobName);
  });

  afterEach(async () => {
    if (containerClient) {
      await containerClient.delete();
    }
    await recorder.stop();
  });

  it("stageBlock without options", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    const stageResult = await blockBlobClient.stageBlock(base64encode("1"), body, body.length);
    assert.deepEqual(stageResult.structuredBodyType, "XSM/1.0; properties=crc64");
    const listResponse = await blockBlobClient.getBlockList("uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 1);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, body.length);
  });

  it("stageBlock with customized MD5", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    try {
      await blockBlobClient.stageBlock(base64encode("1"), body, body.length, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentMD5: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Md5Mismatch");
    }
  });

  it("stageBlock with customized CRC64", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    try {
      await blockBlobClient.stageBlock(base64encode("1"), body, body.length, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentCrc64: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Crc64Mismatch");
    }
  });

  it("stageBlock with auto StorageChecksumAlgorithm", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    const stageResult = await blockBlobClient.stageBlock(base64encode("1"), body, body.length, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    // request should succeed without checksum validation
    assert.deepEqual(stageResult.structuredBodyType, undefined);
    await blockBlobClient.commitBlockList([base64encode("1")]);
    const result = await blockBlobClient.download();
    assert.deepEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.equal(await bodyToString(result, body.length), body);
  });

  it("appendBlock without options", async function () {
    const body = "HelloWorld";
    const appendBlobClient = blobClient.getAppendBlobClient();
    await appendBlobClient.create();
    const result = await appendBlobClient.appendBlock(body, body.length);
    assert.deepEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");
  });

  it("appendBlock with customized MD5", async function () {
    const body = "HelloWorld";
    const appendBlobClient = blobClient.getAppendBlobClient();
    await appendBlobClient.create();
    try {
      await appendBlobClient.appendBlock(body, body.length, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentMD5: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Md5Mismatch");
    }
  });

  it("appendBlock with customized CRC64", async function () {
    const body = "HelloWorld";
    const appendBlobClient = blobClient.getAppendBlobClient();
    await appendBlobClient.create();
    try {
      await appendBlobClient.appendBlock(body, body.length, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentCrc64: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Crc64Mismatch");
    }
  });

  it("appendBlock with auto StorageChecksumAlgorithm", async function () {
    const body = "HelloWorld";
    const appendBlobClient = blobClient.getAppendBlobClient();
    await appendBlobClient.create();
    const result = await appendBlobClient.appendBlock(body, body.length, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    // request should succeed without checksum validation
    assert.deepEqual(result.structuredBodyType, undefined);
  });

  it("uploadPages without options", async function () {
    const pageBlobClient = blobClient.getPageBlobClient();
    await pageBlobClient.create(1024);
    const result = await pageBlobClient.uploadPages("a".repeat(512), 0, 512);
    assert.deepEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");

    const result2 = await pageBlobClient.uploadPages("b".repeat(512), 512, 512);
    assert.deepEqual(result2.structuredBodyType, "XSM/1.0; properties=crc64");

    const page1 = await pageBlobClient.download(0, 512);
    const page2 = await pageBlobClient.download(0, 512);
    assert.deepEqual(page1.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.deepEqual(page2.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("uploadPages with customized MD5", async function () {
    const pageBlobClient = blobClient.getPageBlobClient();
    await pageBlobClient.create(1024);
    try {
      await pageBlobClient.uploadPages("a".repeat(512), 0, 512, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentMD5: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Md5Mismatch");
    }
  });

  it("uploadPages with customized CRC64", async function () {
    const pageBlobClient = blobClient.getPageBlobClient();
    await pageBlobClient.create(1024);
    try {
      await pageBlobClient.uploadPages("a".repeat(512), 0, 512, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentCrc64: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Crc64Mismatch");
    }
  });

  it("uploadPages with auto StorageChecksumAlgorithm", async function () {
    const pageBlobClient = blobClient.getPageBlobClient();
    await pageBlobClient.create(1024);
    const result = await pageBlobClient.uploadPages("a".repeat(512), 0, 512, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    assert.deepEqual(result.structuredBodyType, undefined);

    const result2 = await pageBlobClient.uploadPages("b".repeat(512), 512, 512, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    assert.deepEqual(result2.structuredBodyType, undefined);

    const page1 = await pageBlobClient.download(0, 512, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    const page2 = await pageBlobClient.download(0, 512, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    assert.deepEqual(page1.structuredBodyType, undefined);
    assert.deepEqual(page2.structuredBodyType, undefined);
    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("upload without options", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadResult = await blockBlobClient.upload(body, body.length);
    assert.deepEqual(uploadResult.structuredBodyType, "XSM/1.0; properties=crc64");

    const result = await blobClient.download();
    assert.deepEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.equal(await bodyToString(result, body.length), body);
  });

  it("upload with auto StorageChecksumAlgorithm", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadResult = await blockBlobClient.upload(body, body.length, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    assert.deepEqual(uploadResult.structuredBodyType, "XSM/1.0; properties=crc64");

    const result = await blobClient.download();
    assert.deepEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.equal(await bodyToString(result, body.length), body);
  });
});

describe("ContentChecksumValidation with client config - None", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        uriSanitizers,
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-copy-source", "x-ms-encryption-key"] },
      },
      ["playback", "record"],
    );
    const blobServiceClient = getBSU(recorder);

    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
    blobClient = containerClient.getBlobClient(blobName);
  });

  afterEach(async () => {
    if (containerClient) {
      await containerClient.delete();
    }
    await recorder.stop();
  });

  it("stageBlock without options", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    const stageResult = await blockBlobClient.stageBlock(base64encode("1"), body, body.length);
    assert.deepEqual(stageResult.structuredBodyType, undefined);
    const listResponse = await blockBlobClient.getBlockList("uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 1);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, body.length);
  });

  it("stageBlock with customized MD5", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    try {
      await blockBlobClient.stageBlock(base64encode("1"), body, body.length, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentMD5: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Md5Mismatch");
    }
  });

  it("stageBlock with customized CRC64", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    try {
      await blockBlobClient.stageBlock(base64encode("1"), body, body.length, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentCrc64: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Crc64Mismatch");
    }
  });

  it("stageBlock with CRC64", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    const stageResult = await blockBlobClient.stageBlock(base64encode("1"), body, body.length, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
    });
    assert.deepEqual(stageResult.structuredBodyType, "XSM/1.0; properties=crc64");
    await blockBlobClient.commitBlockList([base64encode("1")]);
    const result = await blockBlobClient.download();
    assert.deepEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.equal(await bodyToString(result, body.length), body);
  });

  it("appendBlock without options", async function () {
    const body = "HelloWorld";
    const appendBlobClient = blobClient.getAppendBlobClient();
    await appendBlobClient.create();
    const result = await appendBlobClient.appendBlock(body, body.length);
    assert.deepEqual(result.structuredBodyType, undefined);
  });

  it("appendBlock with customized MD5", async function () {
    const body = "HelloWorld";
    const appendBlobClient = blobClient.getAppendBlobClient();
    await appendBlobClient.create();
    try {
      await appendBlobClient.appendBlock(body, body.length, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentMD5: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Md5Mismatch");
    }
  });

  it("appendBlock with customized CRC64", async function () {
    const body = "HelloWorld";
    const appendBlobClient = blobClient.getAppendBlobClient();
    await appendBlobClient.create();
    try {
      await appendBlobClient.appendBlock(body, body.length, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentCrc64: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Crc64Mismatch");
    }
  });

  it("appendBlock with CRC64", async function () {
    const body = "HelloWorld";
    const appendBlobClient = blobClient.getAppendBlobClient();
    await appendBlobClient.create();
    const result = await appendBlobClient.appendBlock(body, body.length, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
    });
    // request should succeed without checksum validation
    assert.deepEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");
  });

  it("uploadPages without options", async function () {
    const pageBlobClient = blobClient.getPageBlobClient();
    await pageBlobClient.create(1024);
    const result = await pageBlobClient.uploadPages("a".repeat(512), 0, 512);
    assert.deepEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");

    const result2 = await pageBlobClient.uploadPages("b".repeat(512), 512, 512);
    assert.deepEqual(result2.structuredBodyType, "XSM/1.0; properties=crc64");

    const page1 = await pageBlobClient.download(0, 512);
    const page2 = await pageBlobClient.download(0, 512);
    assert.deepEqual(page1.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.deepEqual(page2.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("uploadPages with customized MD5", async function () {
    const pageBlobClient = blobClient.getPageBlobClient();
    await pageBlobClient.create(1024);
    try {
      await pageBlobClient.uploadPages("a".repeat(512), 0, 512, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentMD5: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Md5Mismatch");
    }
  });

  it("uploadPages with customized CRC64", async function () {
    const pageBlobClient = blobClient.getPageBlobClient();
    await pageBlobClient.create(1024);
    try {
      await pageBlobClient.uploadPages("a".repeat(512), 0, 512, {
        contentChecksumAlgorithm: StorageChecksumAlgorithm.Customized,
        transactionalContentCrc64: new Uint8Array([
          0xce, 0x2c, 0x8a, 0xed, 0x9c, 0x2f, 0xa0, 0xcf, 0xbe, 0xd5, 0x6c, 0xbd, 0xa4, 0xd8, 0xbf,
          0x07,
        ]),
      });
    } catch (ex) {
      assert.deepEqual((ex as any).code, "Crc64Mismatch");
    }
  });

  it("uploadPages with auto StorageChecksumAlgorithm", async function () {
    const pageBlobClient = blobClient.getPageBlobClient();
    await pageBlobClient.create(1024);
    const result = await pageBlobClient.uploadPages("a".repeat(512), 0, 512, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    assert.deepEqual(result.structuredBodyType, undefined);

    const result2 = await pageBlobClient.uploadPages("b".repeat(512), 512, 512, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    assert.deepEqual(result2.structuredBodyType, undefined);

    const page1 = await pageBlobClient.download(0, 512, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    const page2 = await pageBlobClient.download(0, 512, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    assert.deepEqual(page1.structuredBodyType, undefined);
    assert.deepEqual(page2.structuredBodyType, undefined);
    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("upload without options", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadResult = await blockBlobClient.upload(body, body.length);
    assert.deepEqual(uploadResult.structuredBodyType, "XSM/1.0; properties=crc64");

    const result = await blobClient.download();
    assert.deepEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.equal(await bodyToString(result, body.length), body);
  });

  it("upload with auto StorageChecksumAlgorithm", async function () {
    const body = "HelloWorld";
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadResult = await blockBlobClient.upload(body, body.length, {
      contentChecksumAlgorithm: StorageChecksumAlgorithm.Auto,
    });
    assert.deepEqual(uploadResult.structuredBodyType, "XSM/1.0; properties=crc64");

    const result = await blobClient.download();
    assert.deepEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");
    assert.equal(await bodyToString(result, body.length), body);
  });
});
