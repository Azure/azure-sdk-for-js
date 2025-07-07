// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";

import type { DataLakeFileSystemClient } from "../src/index.js";
import { DataLakeFileClient, StorageChecksumAlgorithm } from "../src/index.js";
import {
  bodyToString,
  getDataLakeServiceClient,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
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
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const serviceClient = getDataLakeServiceClient(recorder, {
      uploadContentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
      downloadContentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
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

  it("append without options", async function () {
    await fileClient.create();
    const appendResult = await fileClient.append(content, 0, content.length);
    assert.deepStrictEqual(appendResult.structuredBodyType, "XSM/1.0; properties=CRC64");
    await fileClient.flush(content.length);

    const result = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    assert.deepStrictEqual(result.structuredBodyType, "XSM/1.0; properties=crc64");
  });
});
