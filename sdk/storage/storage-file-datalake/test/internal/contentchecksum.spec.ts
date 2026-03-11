// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";

import type { DataLakeFileSystemClient } from "../../src/index.js";
import { DataLakeFileClient } from "../../src/index.js";
import type { DataLakeClientOptions } from "../../src/models.js";
import { createDataLakeServiceClient } from "../utils/clients.js";
import { getUniqueName } from "../utils/testHelpers.js";
import { bodyToString } from "../utils/node/testHelpers.js";
import { isLiveMode } from "../utils/injectables.js";
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
    const serviceClient = await createDataLakeServiceClient("TokenCredential", {
      recorder,
      options: {
        uploadContentChecksumAlgorithm: "StorageCrc64",
        downloadContentChecksumAlgorithm: "StorageCrc64",
      } as DataLakeClientOptions,
    });
    fileSystemName = getUniqueName("filesystem", { recorder });
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    fileName = getUniqueName("file", { recorder });
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
