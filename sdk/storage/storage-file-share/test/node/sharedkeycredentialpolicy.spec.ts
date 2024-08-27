// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context } from "mocha";

import { Recorder } from "@azure-tools/test-recorder";

import { ShareClient } from "../../src";
import { getBSU, getUniqueName, recorderEnvSetup, uriSanitizers } from "../utils";

describe("StorageSharedKeyCredentialPolicy Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const serviceClient = getBSU(recorder);
    shareName = recorder.variable("1share-with-dash", getUniqueName("1share-with-dash"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async function (this: Context) {
    await shareClient.delete();
    await recorder.stop();
  });

  it("StorageSharedKeyCredentialPolicy should work with special share and file names with spaces", async () => {
    const dirName = recorder.variable("dir empty", getUniqueName("dir empty"));
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName: string = recorder.variable("file empty", getUniqueName("file empty"));
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(0);
  });

  it("StorageSharedKeyCredentialPolicy should work with special share and file names uppercase", async () => {
    const dirName = recorder.variable("Dir empty", getUniqueName("Dir empty"));
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const fileName: string = recorder.variable("Upper_another", getUniqueName("Upper_another"));
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(0);
  });
});
