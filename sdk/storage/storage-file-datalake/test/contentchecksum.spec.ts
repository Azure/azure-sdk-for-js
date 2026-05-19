// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";

import type { DataLakeFileSystemClient } from "../src/index.js";
import { DataLakeFileClient } from "../src/index.js";
import {
  bodyToString,
  createAndStartRecorder,
  getDataLakeServiceClient,
  getUniqueName,
} from "./utils/index.js";
import { describe, it, expect, assert, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";

expect.extend({ toSupportTracing });

describe("ContentChecksumValidation with client config - CRC64", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  const content = "Hello World";

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await createAndStartRecorder(ctx);
    const serviceClient = getDataLakeServiceClient(recorder, {
      uploadContentChecksumAlgorithm: "StorageCrc64",
      downloadContentChecksumAlgorithm: "StorageCrc64",
    });
    fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = fileSystemClient.getFileClient(fileName);
  });

  afterEach(async () => {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("append without options", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }
    await fileClient.create();
    const appendResult = await fileClient.append(content, 0, content.length);
    assert.deepStrictEqual(appendResult.structuredBodyType, "XSM/1.0; properties=crc64");
    await fileClient.flush(content.length);

    const result = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    assert.deepStrictEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");
  });
});
