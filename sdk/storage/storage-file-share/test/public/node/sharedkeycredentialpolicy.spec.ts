// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type { ShareClient } from "../../../src/index.js";
import { describe, it, beforeEach, afterEach } from "vitest";
import { createShareServiceClient } from "../../utils/node/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";

describe("StorageSharedKeyCredentialPolicy Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("TokenCredential", { recorder });
    shareName = getUniqueName("1share-with-dash", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("StorageSharedKeyCredentialPolicy should work with special share and file names with spaces", async () => {
    const dirName = getUniqueName("dir empty", { recorder });
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName = getUniqueName("file empty", { recorder });
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(0);
  });

  it("StorageSharedKeyCredentialPolicy should work with special share and file names uppercase", async () => {
    const dirName = getUniqueName("Dir empty", { recorder });
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName = getUniqueName("Upper_another", { recorder });
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(0);
  });
});
