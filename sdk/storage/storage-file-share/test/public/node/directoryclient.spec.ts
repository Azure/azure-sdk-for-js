// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ShareClient } from "@azure/storage-file-share";
import {
  newPipeline,
  type ShareDirectoryClient,
  getFileServiceAccountAudience,
} from "@azure/storage-file-share";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import {
  createShareServiceClient,
  createShareDirectoryClient,
  getSharedKeyCredential,
} from "../../utils/node/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { getAccountKey, getAccountName } from "../../utils/injectables.js";
import { SimpleTokenCredential } from "../../utils/simpleToken.js";

describe("DirectoryClient Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("TokenCredential", { recorder });
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = getUniqueName("dir", { recorder });
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();
  });

  afterEach(async () => {
    await dirClient.delete();
    await shareClient.delete();
    await recorder.stop();
  });

  it("Default audience should work", async () => {
    const dirClientWithOAuthToken = await createShareDirectoryClient("TokenCredential", {
      shareName,
      directoryName: dirName,
      recorder,
      options: { fileRequestIntent: "backup" },
    });

    const exist = await dirClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Customized audience should work", async () => {
    const dirClientWithOAuthToken = await createShareDirectoryClient("TokenCredential", {
      shareName,
      directoryName: dirName,
      recorder,
      options: {
        audience: getFileServiceAccountAudience(getAccountName()),
        fileRequestIntent: "backup",
      },
    });

    const exist = await dirClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Bad audience should work", async () => {
    const token = await createTestCredential().getToken(
      "https://badaudience.file.core.windows.net/.default",
    );
    const dirClientWithSimpleOAuthToken = await createShareDirectoryClient("Custom", {
      shareName,
      directoryName: dirName,
      recorder,
      credential: new SimpleTokenCredential(token!.token, new Date(token!.expiresOnTimestamp)),
      options: {
        fileRequestIntent: "backup",
      },
    });

    try {
      await dirClientWithSimpleOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const dirClientWithOAuthToken = await createShareDirectoryClient("TokenCredential", {
      shareName,
      directoryName: dirName,
      recorder,
      options: {
        audience: "https://badaudience.file.core.windows.net/.default",
        fileRequestIntent: "backup",
      },
    });

    const exist = await dirClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it.runIf(getAccountKey())("can be created with a url and a credential", async () => {
    const newClient = await createShareDirectoryClient("SharedKeyCredential", {
      shareName,
      directoryName: dirName,
      recorder,
    });
    assert.isDefined(newClient);

    const result = await newClient!.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it.runIf(getAccountKey())(
    "can be created with a url and a credential and an option bag",
    async () => {
      const newClient = await createShareDirectoryClient("SharedKeyCredential", {
        shareName,
        directoryName: dirName,
        recorder,
        options: {
          retryOptions: {
            maxTries: 5,
          },
        },
      });
      assert.isDefined(newClient);

      const result = await newClient.getProperties();

      assert.isAbove(result.etag!.length, 0);
      assert.isDefined(result.lastModified);
      assert.isDefined(result.requestId);
      assert.isDefined(result.version);
      assert.isDefined(result.date);
    },
  );

  it.runIf(getAccountKey())("can be created with a url and a pipeline", async () => {
    const credential = getSharedKeyCredential();
    assert.isDefined(credential);

    const pipeline = newPipeline(credential!);
    const newClient = await createShareDirectoryClient("Pipeline", {
      shareName,
      directoryName: dirName,
      recorder,
      pipeline,
    });

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });
});
