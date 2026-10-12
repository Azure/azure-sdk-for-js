// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  SimpleTokenCredential,
  configureStorageClient,
  getAccountName,
  getBSU,
  getGenericBSU,
  getUniqueName,
  createAndStartRecorder,
} from "../utils/index.js";
import type {
  DirectoryItem,
  FileItem,
  StorageSharedKeyCredential,
  ShareClient,
  ShareServiceClient,
} from "../../src/index.js";
import {
  newPipeline,
  ShareDirectoryClient,
  getFileServiceAccountAudience,
  parseOctalFileMode,
} from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("DirectoryClient Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await createAndStartRecorder(ctx);
    const serviceClient = getBSU(recorder);
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.variable("dir", getUniqueName("dir"));
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();
  });

  afterEach(async () => {
    await dirClient.delete();
    await shareClient.delete();
    await recorder.stop();
  });

  it("Default audience should work", async () => {
    const dirClientWithOAuthToken = new ShareDirectoryClient(
      dirClient.url,
      createTestCredential(),
      { fileRequestIntent: "backup" },
    );
    configureStorageClient(recorder, dirClientWithOAuthToken);

    const exist = await dirClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Customized audience should work", async () => {
    const dirClientWithOAuthToken = new ShareDirectoryClient(
      dirClient.url,
      createTestCredential(),
      {
        audience: getFileServiceAccountAudience(getAccountName()),
        fileRequestIntent: "backup",
      },
    );
    configureStorageClient(recorder, dirClientWithOAuthToken);

    const exist = await dirClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Bad audience should work", async () => {
    const token = await createTestCredential().getToken(
      "https://badaudience.file.core.windows.net/.default",
    );
    const dirClientWithSimpleOAuthToken = new ShareDirectoryClient(
      dirClient.url,
      new SimpleTokenCredential(token!.token, new Date(token!.expiresOnTimestamp)),
      {
        fileRequestIntent: "backup",
      },
    );
    configureStorageClient(recorder, dirClientWithSimpleOAuthToken);

    try {
      await dirClientWithSimpleOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const dirClientWithOAuthToken = new ShareDirectoryClient(
      dirClient.url,
      createTestCredential(),
      {
        audience: "https://badaudience.file.core.windows.net/.default",
        fileRequestIntent: "backup",
      },
    );
    configureStorageClient(recorder, dirClientWithOAuthToken);

    const exist = await dirClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("can be created with a url and a credential", async () => {
    const credential = dirClient["credential"] as StorageSharedKeyCredential;
    const newClient = new ShareDirectoryClient(dirClient.url, credential);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const credential = dirClient["credential"] as StorageSharedKeyCredential;
    const newClient = new ShareDirectoryClient(dirClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    const credential = dirClient["credential"] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new ShareDirectoryClient(dirClient.url, pipeline);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });
});

describe("DirectoryClient Node.js only - list with includeAll", () => {
  let recorder: Recorder;
  let serviceClient: ShareServiceClient;
  let shareClient: ShareClient | undefined;

  async function listWithIncludeAll(
    dirClient: ShareDirectoryClient,
  ): Promise<{ files: FileItem[]; directories: DirectoryItem[] }> {
    const files: FileItem[] = [];
    const directories: DirectoryItem[] = [];
    for await (const item of dirClient.listFilesAndDirectories({ includeAll: true })) {
      if (item.kind === "file") {
        files.push(item);
      } else {
        directories.push(item);
      }
    }
    return { files, directories };
  }

  beforeEach(async (ctx) => {
    shareClient = undefined;
    recorder = await createAndStartRecorder(ctx);
    try {
      serviceClient = getGenericBSU(recorder, "PREMIUM_FILE_");
    } catch (error) {
      console.log(error);
      ctx.skip();
    }
  });

  afterEach(async () => {
    if (shareClient) {
      await shareClient.delete();
    }
    await recorder.stop();
  });

  it("lists NFS files, links and directories", async () => {
    shareClient = serviceClient.getShareClient(recorder.variable("share", getUniqueName("share")));
    await shareClient.create({ protocols: { nfsEnabled: true } });
    const dirName = recorder.variable("dir", getUniqueName("dir"));
    const dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    const content = "Hello World";
    const fileMode = parseOctalFileMode("0644");
    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileClient = dirClient.getFileClient(fileName);
    const createResponse = await fileClient.create(content.length, {
      posixProperties: { owner: "1000", group: "1001", fileMode },
    });
    await fileClient.uploadRange(content, 0, content.length);

    const hardLinkName = recorder.variable("hardlink", getUniqueName("hardlink"));
    await dirClient.getFileClient(hardLinkName).createHardLink(`${dirName}/${fileName}`);

    const subDirName = recorder.variable("subdir", getUniqueName("subdir"));
    await dirClient.getDirectoryClient(subDirName).create();

    // The service returns "&" XML-escaped; the link text must read back unchanged.
    const linkText = "/mnt/target dir/a&b.txt";
    const symLinkName = recorder.variable("symlink", getUniqueName("symlink"));
    await dirClient.getFileClient(symLinkName).createSymbolicLink(linkText);

    const { files, directories } = await listWithIncludeAll(dirClient);

    assert.sameMembers(
      files.map((item) => item.name),
      [fileName, hardLinkName, symLinkName],
    );
    assert.sameMembers(
      directories.map((item) => item.name),
      [subDirName],
    );

    const file = files.find((item) => item.name === fileName)!;
    const hardLink = files.find((item) => item.name === hardLinkName)!;
    for (const item of [file, hardLink]) {
      assert.strictEqual(item.fileType, "Regular");
      assert.strictEqual(item.linkCount, 2);
      assert.strictEqual(item.fileId, createResponse.fileId);
      assert.strictEqual(item.properties.owner, "1000");
      assert.strictEqual(item.properties.group, "1001");
      assert.deepEqual(item.properties.fileMode, fileMode);
      assert.strictEqual(item.properties.contentLength, content.length);
    }

    const symLink = files.find((item) => item.name === symLinkName)!;
    assert.strictEqual(symLink.fileType, "SymLink");
    assert.strictEqual(symLink.linkText, linkText);
    assert.strictEqual(symLink.linkCount, 1);
    assert.strictEqual(symLink.properties.contentLength, linkText.length);

    // A directory created without NFS properties gets the service defaults.
    const subDir = directories[0];
    assert.strictEqual(subDir.fileType, "Directory");
    assert.strictEqual(subDir.linkCount, 2);
    assert.strictEqual(subDir.properties?.owner, "0");
    assert.strictEqual(subDir.properties?.group, "0");
    assert.deepEqual(subDir.properties?.fileMode, parseOctalFileMode("0755"));
  });

  it("lists SMB files and directories", async () => {
    shareClient = serviceClient.getShareClient(recorder.variable("share", getUniqueName("share")));
    await shareClient.create();
    const dirClient = shareClient.getDirectoryClient(
      recorder.variable("dir", getUniqueName("dir")),
    );
    await dirClient.create();

    const fileName = recorder.variable("file", getUniqueName("file"));
    await dirClient.getFileClient(fileName).create(0);
    const subDirName = recorder.variable("subdir", getUniqueName("subdir"));
    await dirClient.getDirectoryClient(subDirName).create();

    const { files, directories } = await listWithIncludeAll(dirClient);

    assert.sameMembers(
      files.map((item) => item.name),
      [fileName],
    );
    assert.sameMembers(
      directories.map((item) => item.name),
      [subDirName],
    );

    const [file] = files;
    const [subDir] = directories;
    assert.strictEqual(file.fileType, "Regular");
    assert.strictEqual(subDir.fileType, "Directory");
    assert.isUndefined(file.linkText);
    for (const item of [file, subDir]) {
      assert.isDefined(item.attributes);
      assert.isDefined(item.permissionKey);
      assert.isDefined(item.properties?.etag);
      assert.instanceOf(item.properties?.lastWriteTime, Date);
      assert.isUndefined(item.linkCount);
      assert.isUndefined(item.properties?.owner);
      assert.isUndefined(item.properties?.group);
      assert.isUndefined(item.properties?.fileMode);
    }
  });
});
