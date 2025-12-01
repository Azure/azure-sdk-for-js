// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getYieldedValue } from "@azure-tools/test-utils-vitest";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type {
  FileSystemListPathsResponse,
  DataLakeServiceClient,
  FileSystemListDeletedPathsResponse,
} from "../src/index.js";
import {
  DataLakeFileSystemClient,
  DataLakeFileClient,
  DataLakeDirectoryClient,
} from "../src/index.js";
import {
  getDataLakeServiceClient,
  getEncryptionScope,
  getGenericDataLakeServiceClient,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils/index.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import type { OperationOptions } from "@azure/core-client";
import {
  Pipeline,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

expect.extend({ toSupportTracing });

describe("DataLakeFileSystemClient", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    serviceClient = getDataLakeServiceClient(recorder);
    fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
  });

  afterEach(async () => {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    await fileSystemClient.setMetadata(metadata);

    const result = await fileSystemClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("setMetadata with tracing", async () => {
    await expect(async (options: OperationOptions) => {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb",
      };
      await fileSystemClient.setMetadata(metadata, options);
    }).toSupportTracing(["DataLakeFileSystemClient-setMetadata"]);
  });

  it("getProperties", async () => {
    const result = await fileSystemClient.getProperties();
    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.publicAccess);
    assert.isDefined(result.clientRequestId); // As default pipeline involves UniqueRequestIDPolicy
  });

  it("create with default parameters", () => {
    // create() with default parameters has been tested in beforeEach
  });

  it("create with all parameters configured", async () => {
    const cClient = serviceClient.getFileSystemClient(
      recorder.variable(fileSystemName, getUniqueName(fileSystemName)),
    );
    const metadata = { key: "value" };
    const access = "filesystem";
    await cClient.create({ metadata, access });
    const result = await cClient.getProperties();
    assert.deepEqual(result.publicAccess, access);
    assert.deepEqual(result.metadata, metadata);
  });

  it("create with encryption scope", async function (ctx) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      ctx.skip();
    }

    const cClient = serviceClient.getFileSystemClient(
      recorder.variable(fileSystemName, getUniqueName(fileSystemName)),
    );
    await cClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });
    const result = await cClient.getProperties();
    assert.equal(result.defaultEncryptionScope, encryptionScopeName);
    await cClient.delete();
  });

  it("create with encryption scope - preventEncryptionScopeOverride : false", async function (ctx) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      ctx.skip();
    }

    const cClient = serviceClient.getFileSystemClient(
      recorder.variable(fileSystemName, getUniqueName(fileSystemName)),
    );
    await cClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: false,
      },
    });
    const result = await cClient.getProperties();
    assert.equal(result.defaultEncryptionScope, encryptionScopeName);
    await cClient.delete();
  });

  it("createIfNotExists", async () => {
    const cClient = serviceClient.getFileSystemClient(
      recorder.variable(fileSystemName, getUniqueName(fileSystemName)),
    );
    const metadata = { key: "value" };
    const access = "filesystem";
    const createRes = await cClient.createIfNotExists({ metadata, access });
    assert.isTrue(createRes.succeeded);
    assert.isDefined(createRes.etag);

    const createRes2 = await cClient.createIfNotExists({ metadata, access });
    assert.isFalse(createRes2.succeeded);

    await cClient.deleteIfExists();
  });

  it("deleteIfExists", async () => {
    const cClient = serviceClient.getFileSystemClient(
      recorder.variable(fileSystemName, getUniqueName(fileSystemName)),
    );
    const res = await cClient.deleteIfExists();
    assert.isFalse(res.succeeded);

    await cClient.create();
    const res2 = await cClient.deleteIfExists();
    assert.isTrue(res2.succeeded);
  });

  it("delete", () => {
    // delete() with default parameters has been tested in afterEach
  });

  it("listPaths with default parameters", async () => {
    const recordedNow = new Date(recorder.variable("now", new Date().toISOString())); // Flaky workaround for the recording to work.

    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`file${i}`, getUniqueName(`file${i}`)),
      );
      await fileClient.create();
      fileClients.push(fileClient);
    }

    const result = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;

    assert.deepStrictEqual(result.continuation, undefined);
    assert.deepStrictEqual(result.pathItems!.length, fileClients.length);
    assert.notStrictEqual(fileClients[0].url.indexOf(result.pathItems![0].name!), -1);

    // The path is created just now, createdOn should be around but may not be the same to current time.
    assert.equal(result.pathItems![0].createdOn?.getUTCFullYear(), recordedNow.getUTCFullYear());
    assert.equal(result.pathItems![0].createdOn?.getUTCMonth(), recordedNow.getUTCMonth());
    assert.equal(result.pathItems![0].createdOn?.getUTCDate(), recordedNow.getUTCDate());
    assert.equal(result.pathItems![0].createdOn?.getUTCHours(), recordedNow.getUTCHours());

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it("listPaths with startFrom", async () => {
    const fileClients = [];
    const dirBase = recorder.variable(`dir`, getUniqueName(`dir`));
    const fileBase = recorder.variable(`file`, getUniqueName(`file`));

    const dirName0 = dirBase + "0";
    const dir0 = fileSystemClient.getDirectoryClient(dirName0);
    await dir0.create();

    let startFrom = "";
    const expectedNames = [];

    for (let i = 0; i < 3; i++) {
      const fileClient = dir0.getFileClient(fileBase + i);
      if (i === 1) {
        startFrom = fileClient.name;
      }

      if (i >= 1) {
        expectedNames.push(fileClient.name);
      }
      await fileClient.create();
      fileClients.push(fileClient);
    }

    const dirName1 = dirBase + "1";
    const dir1 = fileSystemClient.getDirectoryClient(dirName1);
    await dir1.create();
    expectedNames.push(dirName1);

    for (let i = 0; i < 3; i++) {
      const fileClient = dir1.getFileClient(fileBase + i);
      await fileClient.create();
      fileClients.push(fileClient);
      expectedNames.push(fileClient.name);
    }

    const result = (
      await fileSystemClient
        .listPaths({
          startFrom: dirName0,
        })
        .byPage()
        .next()
    ).value as FileSystemListPathsResponse;

    assert.deepStrictEqual(result.continuation, undefined);
    assert.deepStrictEqual(result.pathItems!.length, 2);
    assert.deepStrictEqual(result.pathItems![0].name!, dirName0);

    const result1 = (
      await fileSystemClient
        .listPaths({
          startFrom: startFrom,
          recursive: true,
        })
        .byPage()
        .next()
    ).value as FileSystemListPathsResponse;
    assert.deepStrictEqual(result1.continuation, undefined);
    assert.deepStrictEqual(result1.pathItems!.length, 6);
    const paths = [];

    for (const path of result1.pathItems!) {
      paths.push(path.name);
    }
    assert.deepStrictEqual(paths, expectedNames);

    for (const file of fileClients) {
      await file.delete();
    }

    await dir0.delete();
    await dir1.delete();
  });

  it("listPaths - Encryption Scope", async function (ctx) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      ctx.skip();
    }

    const cClient = serviceClient.getFileSystemClient(
      recorder.variable(fileSystemName, getUniqueName(fileSystemName)),
    );
    await cClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });

    const fileClient = cClient.getFileClient(recorder.variable(`file`, getUniqueName(`file`)));
    await fileClient.create();

    const dirClient = cClient.getFileClient(recorder.variable(`dir`, getUniqueName(`dir`)));
    await dirClient.create();

    const result = (await cClient.listPaths().byPage().next()).value as FileSystemListPathsResponse;

    assert.equal(result.pathItems!.length, 2);
    assert.equal(result.pathItems![0].encryptionScope, encryptionScopeName);
    assert.equal(result.pathItems![1].encryptionScope, encryptionScopeName);

    await fileClient.delete();
    await dirClient.delete();
  });

  it("listPaths - Encryption context", async () => {
    const encryptionContext = "EncryptionContext";

    const cClient = serviceClient.getFileSystemClient(
      recorder.variable(fileSystemName, getUniqueName(fileSystemName)),
    );
    await cClient.create();

    const fileClient = cClient.getFileClient(recorder.variable(`file`, getUniqueName(`file`)));
    await fileClient.create({ encryptionContext: encryptionContext });

    const dirClient = cClient.getFileClient(recorder.variable(`dir`, getUniqueName(`dir`)));
    await dirClient.create({ encryptionContext: encryptionContext });

    const result = (await cClient.listPaths().byPage().next()).value as FileSystemListPathsResponse;

    assert.equal(result.pathItems!.length, 2);
    assert.equal(result.pathItems![0].encryptionContext, encryptionContext);
    assert.equal(result.pathItems![1].encryptionContext, encryptionContext);

    await fileClient.delete();
    await dirClient.delete();
  });

  it("listPaths - PagedAsyncIterableIterator with Encryption Scope", async function (ctx) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      ctx.skip();
    }

    const cClient = serviceClient.getFileSystemClient(
      recorder.variable(fileSystemName, getUniqueName(fileSystemName)),
    );
    await cClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });

    const fileClient = cClient.getFileClient(recorder.variable(`file`, getUniqueName(`file`)));
    await fileClient.create();
    const dirClient = cClient.getFileClient(recorder.variable(`dir`, getUniqueName(`dir`)));
    await dirClient.create();

    for await (const listedFile of cClient.listPaths()) {
      assert.equal(listedFile.encryptionScope, encryptionScopeName);
    }

    await fileClient.delete();
    await dirClient.delete();
  });

  it("listPaths - ExpiryTime, NeverExpire", async () => {
    const fileClient = fileSystemClient.getFileClient(
      recorder.variable(`file`, getUniqueName(`file`)),
    );
    await fileClient.create();
    await fileClient.setExpiry("NeverExpire");
    const result = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;

    assert.equal(result.pathItems![0].expiresOn, undefined);
    await fileClient.delete();
  });

  it("listPaths - ExpiryTime, Absolute", async () => {
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    const delta = 30 * 1000;
    const expiresOn = new Date(now.getTime() + delta);
    const fileClient = fileSystemClient.getFileClient(
      recorder.variable(`file`, getUniqueName(`file`)),
    );

    const content = "Hello, World";
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
    vi.useFakeTimers();
    vi.setSystemTime(now);
    let setExpiryPromise: Promise<unknown>;
    try {
      setExpiryPromise = fileClient.setExpiry("Absolute", { expiresOn });
    } finally {
      vi.useRealTimers();
    }
    await setExpiryPromise;

    const result = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;

    const recordedExpiresOn = new Date(expiresOn.getTime());
    recordedExpiresOn.setMilliseconds(0); // milliseconds dropped
    assert.equal(result.pathItems![0].expiresOn?.getTime(), recordedExpiresOn.getTime());
    await fileClient.delete();
  });

  it("listPaths - ExpiryTime, RelativeToNow", async () => {
    const delta = 30 * 1000;
    const fileClient = fileSystemClient.getFileClient(
      recorder.variable(`file`, getUniqueName(`file`)),
    );

    const content = "Hello, World";
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
    await fileClient.setExpiry("RelativeToNow", { timeToExpireInMs: delta });

    const result = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;

    assert.isDefined(result.pathItems![0].expiresOn);
    await fileClient.delete();
  });

  it("listPaths - ExpiryTime, RelativeToCreation", async () => {
    const delta = 1000 * 3600 + 0.12;
    const fileClient = fileSystemClient.getFileClient(
      recorder.variable(`file`, getUniqueName(`file`)),
    );

    const content = "Hello, World";
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
    await fileClient.setExpiry("RelativeToCreation", { timeToExpireInMs: delta });

    const result = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;
    assert.equal(
      result.pathItems![0].expiresOn?.getTime(),
      result.pathItems![0].createdOn!.getTime() + Math.round(delta),
    );
    await fileClient.delete();
  });

  it("listPaths with default parameters - null path shouldn't throw error", async () => {
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`file${i}`, getUniqueName(`file${i}`)),
      );

      await fileClient.create();
      fileClients.push(fileClient);
    }

    const result = (await fileSystemClient.listPaths({ path: "" }).byPage().next()).value;
    assert.deepStrictEqual(result.continuation, undefined);
    assert.deepStrictEqual(result.pathItems!.length, fileClients.length);
    assert.notStrictEqual(fileClients[0].url.indexOf(result.pathItems![0].name), -1);

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it("listPaths with all parameters configured", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 2; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`${prefix}${i}`, getUniqueName(`${prefix}${i}`)),
      );

      await fileClient.create({
        metadata: metadata,
      });
      fileClients.push(fileClient);
    }

    const result = (
      await fileSystemClient
        .listPaths({
          userPrincipalName: true,
          recursive: true,
          path: "",
        })
        .byPage({ maxPageSize: 1 })
        .next()
    ).value as FileSystemListPathsResponse;

    assert.deepStrictEqual(result.pathItems!.length, 1);
    assert.notStrictEqual(fileClients[0].url.indexOf(result.pathItems![0].name!), -1);

    const result2 = (
      await fileSystemClient
        .listPaths({
          userPrincipalName: true,
          recursive: true,
          path: "",
        })
        .byPage({ continuationToken: result.continuation, maxPageSize: 2 })
        .next()
    ).value;

    assert.deepStrictEqual(result2.pathItems!.length, 1);
    assert.notStrictEqual(fileClients[1].url.indexOf(result2.pathItems![0].name), -1);

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator for listPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`${prefix}${i}`, getUniqueName(`${prefix}${i}`)),
      );

      await fileClient.create({
        metadata,
      });
      fileClients.push(fileClient);
    }

    let i = 0;
    for await (const file of fileSystemClient.listPaths({
      userPrincipalName: true,
      recursive: true,
      path: "",
    })) {
      assert.notStrictEqual(fileClients[i].url.indexOf(file.name!), -1);
      i++;
    }

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(generator .next() syntax) for listPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 2; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`${prefix}${i}`, getUniqueName(`${prefix}${i}`)),
      );

      await fileClient.create({
        metadata,
      });
      fileClients.push(fileClient);
    }

    const iterator = fileSystemClient.listPaths({
      userPrincipalName: true,
      recursive: true,
      path: "",
    });

    let path = getYieldedValue(await iterator.next());
    assert.notStrictEqual(fileClients[0].url.indexOf(path.name!), -1);

    path = getYieldedValue(await iterator.next());
    assert.notStrictEqual(fileClients[1].url.indexOf(path.name!), -1);

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for listPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`${prefix}${i}`, getUniqueName(`${prefix}${i}`)),
      );

      await fileClient.create({
        metadata,
      });
      fileClients.push(fileClient);
    }

    let i = 0;
    for await (const response of fileSystemClient
      .listPaths({
        userPrincipalName: true,
        recursive: true,
        path: "",
      })
      .byPage({ maxPageSize: 2 })) {
      for (const file of response.pathItems || []) {
        assert.notStrictEqual(fileClients[i].url.indexOf(file.name!), -1);
        i++;
      }
    }

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it.skip("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`${prefix}${i}`, getUniqueName(`${prefix}${i}`)),
      );

      await fileClient.create({
        metadata,
      });
      fileClients.push(fileClient);
    }

    let i = 0;
    let iter = fileSystemClient
      .listPaths({
        userPrincipalName: true,
        recursive: true,
        path: "",
      })
      .byPage({ maxPageSize: 2 });
    let response = (await iter.next()).value;
    for (const file of response.pathItems) {
      assert.notStrictEqual(fileClients[i].url.indexOf(file.name), -1);
      i++;
    }
    // Gets next marker
    const marker = response.continuation;
    // Passing next marker as continuationToken
    iter = fileSystemClient
      .listPaths({
        userPrincipalName: true,
        recursive: true,
        path: "",
      })
      .byPage({ continuationToken: marker, maxPageSize: 2 });
    response = (await iter.next()).value;
    // Gets 2 blobs
    for (const file of response.pathItems) {
      assert.notStrictEqual(fileClients[i].url.indexOf(file.name), -1);
      i++;
    }

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it("verify fileSystemName passed to the client", async () => {
    const accountName = "myaccount";
    const newClient = new DataLakeFileSystemClient(
      `https://${accountName}.dfs.core.windows.net/` + fileSystemName,
    );
    assert.equal(
      newClient.name,
      fileSystemName,
      "File system name is not the same as the one provided.",
    );
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided.",
    );
  });

  it("exists returns true on an existing file system", async () => {
    const result = await fileSystemClient.exists();
    assert.isTrue(result, "exists() should return true for an existing file system");
  });

  it("exists returns false on non-existing file system", async () => {
    const newFileSystemClient = serviceClient.getFileSystemClient(
      recorder.variable("newfilesystem", getUniqueName("newfilesystem")),
    );
    const result = await newFileSystemClient.exists();
    assert.strictEqual(result, false, "exists() should returns false on non-existing file system");
  });
});

describe("DataLakeFileSystemClient with soft delete", () => {
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;

  beforeEach(async (ctx) => {
    if (isLiveMode()) {
      // Turn on this case when the Container Rename feature is ready in the service side.
      ctx.skip();
    }

    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);

    try {
      serviceClient = getGenericDataLakeServiceClient(recorder, "DFS_SOFT_DELETE_");
    } catch (err: any) {
      ctx.skip();
    }

    fileSystemClient = serviceClient.getFileSystemClient(
      recorder.variable(`filesystem`, getUniqueName(`filesystem`)),
    );
    await fileSystemClient.createIfNotExists();
  });

  afterEach(async () => {
    if (fileSystemClient) {
      await fileSystemClient.deleteIfExists();
    }
    if (recorder) {
      await recorder.stop();
    }
  });

  it("listDeletedPaths with default parameters", async () => {
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`file${i}`, getUniqueName(`file${i}`)),
      );
      await fileClient.create();
      fileClients.push(fileClient);
    }

    for (const file of fileClients) {
      await file.delete();
    }

    const result = (await fileSystemClient.listDeletedPaths().byPage().next())
      .value as FileSystemListDeletedPathsResponse;

    assert.deepStrictEqual(result.continuation, undefined);
    assert.deepStrictEqual(result.pathItems!.length, fileClients.length);
    assert.notStrictEqual(fileClients[0].url.indexOf(result.pathItems![0].name), -1);

    for (const pathItem of result.pathItems!) {
      assert.isDefined(pathItem.deletedOn);
      assert.isDefined(pathItem.deletionId);
      assert.isDefined(pathItem.remainingRetentionDays);
    }
  });

  it("listDeletedPaths and listPaths with recreating file after deletion", async () => {
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`file${i}`, getUniqueName(`file${i}`)),
      );
      await fileClient.create();
      fileClients.push(fileClient);
    }

    for (const file of fileClients) {
      await file.delete();
      await file.create();
    }

    const result = (await fileSystemClient.listDeletedPaths().byPage().next())
      .value as FileSystemListDeletedPathsResponse;

    assert.deepStrictEqual(result.continuation, undefined);
    assert.deepStrictEqual(result.pathItems!.length, fileClients.length);
    assert.notStrictEqual(fileClients[0].url.indexOf(result.pathItems![0].name), -1);

    for (const pathItem of result.pathItems!) {
      assert.isDefined(pathItem.deletedOn);
      assert.isDefined(pathItem.deletionId);
      assert.isDefined(pathItem.remainingRetentionDays);
    }

    const listPathResult = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;

    assert.deepStrictEqual(listPathResult.continuation, undefined);
    assert.deepStrictEqual(listPathResult.pathItems!.length, fileClients.length);
    assert.notStrictEqual(fileClients[0].url.indexOf(listPathResult.pathItems![0].name!), -1);
  });

  it("listDeletedPaths with recreating and deletion again", async () => {
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`file${i}`, getUniqueName(`file${i}`)),
      );
      await fileClient.create();
      fileClients.push(fileClient);
    }

    for (const file of fileClients) {
      await file.delete();
      await file.create();
      await file.delete();
    }

    const result = (await fileSystemClient.listDeletedPaths().byPage().next())
      .value as FileSystemListDeletedPathsResponse;

    assert.deepStrictEqual(result.continuation, undefined);
    assert.deepStrictEqual(result.pathItems!.length, 2 * fileClients.length);
    assert.notStrictEqual(fileClients[0].url.indexOf(result.pathItems![0].name), -1);

    for (const pathItem of result.pathItems!) {
      assert.isDefined(pathItem.deletedOn);
      assert.isDefined(pathItem.deletionId);
      assert.isDefined(pathItem.remainingRetentionDays);
    }
  });

  it("listDeletedPaths with default parameters - empty path shouldn't throw error", async () => {
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`file${i}`, getUniqueName(`file${i}`)),
      );

      await fileClient.create();
      fileClients.push(fileClient);
    }

    for (const file of fileClients) {
      await file.delete();
    }

    const result = (await fileSystemClient.listDeletedPaths({ prefix: "" }).byPage().next()).value;

    assert.deepStrictEqual(result.continuation, undefined);
    assert.deepStrictEqual(result.pathItems!.length, fileClients.length);
    assert.notStrictEqual(fileClients[0].url.indexOf(result.pathItems![0].name), -1);

    for (const pathItem of result.pathItems!) {
      assert.isDefined(pathItem.deletedOn);
      assert.isDefined(pathItem.deletionId);
      assert.isDefined(pathItem.remainingRetentionDays);
    }
  });

  it("listDeletedPaths with all parameters configured and byPage with continuationToken", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 2; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`${prefix}${i}`, getUniqueName(`${prefix}${i}`)),
      );

      await fileClient.create({
        metadata: metadata,
      });
      fileClients.push(fileClient);
    }

    for (const file of fileClients) {
      await file.delete();
    }

    const result = (
      await fileSystemClient
        .listDeletedPaths({
          prefix: "",
        })
        .byPage({ maxPageSize: 1 })
        .next()
    ).value as FileSystemListDeletedPathsResponse;

    assert.deepStrictEqual(result.pathItems!.length, 1);
    assert.notStrictEqual(fileClients[0].url.indexOf(result.pathItems![0].name), -1);
    for (const pathItem of result.pathItems!) {
      assert.isDefined(pathItem.deletedOn);
      assert.isDefined(pathItem.deletionId);
      assert.isDefined(pathItem.remainingRetentionDays);
    }

    const result2 = (
      await fileSystemClient
        .listDeletedPaths({
          prefix: "",
        })
        .byPage({ continuationToken: result.continuation, maxPageSize: 2 })
        .next()
    ).value;

    assert.deepStrictEqual(result2.pathItems!.length, 1);
    assert.notStrictEqual(fileClients[1].url.indexOf(result2.pathItems![0].name), -1);
  });

  it("Verify PagedAsyncIterableIterator for listDeletedPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`${prefix}${i}`, getUniqueName(`${prefix}${i}`)),
      );

      await fileClient.create({
        metadata,
      });
      fileClients.push(fileClient);
    }

    for (const file of fileClients) {
      await file.delete();
    }

    let i = 0;
    for await (const file of fileSystemClient.listDeletedPaths({
      prefix: "",
    })) {
      assert.notStrictEqual(fileClients[i].url.indexOf(file.name), -1);
      assert.isDefined(file.deletedOn);
      assert.isDefined(file.deletionId);
      assert.isDefined(file.remainingRetentionDays);
      i++;
    }
  });

  it("Verify PagedAsyncIterableIterator(generator .next() syntax) for listDeletedPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 2; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`${prefix}${i}`, getUniqueName(`${prefix}${i}`)),
      );

      await fileClient.create({
        metadata,
      });
      fileClients.push(fileClient);
    }

    for (const file of fileClients) {
      await file.delete();
    }

    const iterator = fileSystemClient.listDeletedPaths({
      prefix: "",
    });

    let path = getYieldedValue(await iterator.next());
    assert.notStrictEqual(fileClients[0].url.indexOf(path.name), -1);
    assert.isDefined(path.deletedOn);
    assert.isDefined(path.deletionId);
    assert.isDefined(path.remainingRetentionDays);

    path = getYieldedValue(await iterator.next());
    assert.notStrictEqual(fileClients[1].url.indexOf(path.name), -1);
    assert.isDefined(path.deletedOn);
    assert.isDefined(path.deletionId);
    assert.isDefined(path.remainingRetentionDays);
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for listDeletedPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`${prefix}${i}`, getUniqueName(`${prefix}${i}`)),
      );

      await fileClient.create({
        metadata,
      });
      fileClients.push(fileClient);
    }

    for (const file of fileClients) {
      await file.delete();
    }

    let i = 0;
    for await (const response of fileSystemClient
      .listDeletedPaths({
        prefix: "",
      })
      .byPage({ maxPageSize: 2 })) {
      for (const file of response.pathItems || []) {
        assert.notStrictEqual(fileClients[i].url.indexOf(file.name), -1);
        assert.isDefined(file.deletedOn);
        assert.isDefined(file.deletionId);
        assert.isDefined(file.remainingRetentionDays);
        i++;
      }
    }
  });

  it.skip("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listDeletedPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(
        recorder.variable(`${prefix}${i}`, getUniqueName(`${prefix}${i}`)),
      );

      await fileClient.create({
        metadata,
      });
      fileClients.push(fileClient);
    }

    for (const file of fileClients) {
      await file.delete();
    }

    let i = 0;
    let iter = fileSystemClient
      .listDeletedPaths({
        prefix: "",
      })
      .byPage({ maxPageSize: 2 });
    let response = (await iter.next()).value;
    for (const file of response.pathItems) {
      assert.notStrictEqual(fileClients[i].url.indexOf(file.name), -1);
      assert.isDefined(file.deletedOn);
      assert.isDefined(file.deletionId);
      assert.isDefined(file.remainingRetentionDays);
      i++;
    }
    // Gets next marker
    const marker = response.continuation;
    // Passing next marker as continuationToken
    iter = fileSystemClient
      .listDeletedPaths({
        prefix: "",
      })
      .byPage({ continuationToken: marker, maxPageSize: 2 });
    response = (await iter.next()).value;
    // Gets 2 blobs
    for (const file of response.pathItems) {
      assert.notStrictEqual(fileClients[i].url.indexOf(file.name), -1);
      assert.isDefined(file.deletedOn);
      assert.isDefined(file.deletionId);
      assert.isDefined(file.remainingRetentionDays);
      i++;
    }
  });

  it("Undelete file and directory", async () => {
    const fileName = recorder.variable(`file`, getUniqueName(`file`));
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    const fileDeleteResponse = await fileClient.delete();
    assert.isDefined(fileDeleteResponse.deletionId);

    const fileundeleteResponse = await fileSystemClient.undeletePath(
      fileName,
      fileDeleteResponse.deletionId ?? "",
    );

    assert.instanceOf(fileundeleteResponse.pathClient, DataLakeFileClient);

    assert.isTrue(await fileundeleteResponse.pathClient.exists());
    await fileundeleteResponse.pathClient.delete();

    const directoryName = recorder.variable(`directory`, getUniqueName(`directory`));
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();
    const directoryDeleteResponse = await directoryClient.delete();
    assert.isDefined(directoryDeleteResponse.deletionId);

    const directoryUndeleteResponse = await fileSystemClient.undeletePath(
      directoryName,
      directoryDeleteResponse.deletionId ?? "",
    );

    assert.instanceOf(directoryUndeleteResponse.pathClient, DataLakeDirectoryClient);

    assert.isTrue(await directoryUndeleteResponse.pathClient.exists());
    await directoryUndeleteResponse.pathClient.delete();
  });

  it("Undelete file and directory - with directory dots", async () => {
    const fileBaseName = recorder.variable("file", getUniqueName(`file`));
    const fileClient = fileSystemClient.getFileClient(fileBaseName);
    await fileClient.create();
    const fileDeleteResponse = await fileClient.delete();
    assert.isDefined(fileDeleteResponse.deletionId);

    const fileNameWithDirDots = "./adir/.././anotherdir/./../" + fileBaseName;

    const fileundeleteResponse = await fileSystemClient.undeletePath(
      fileNameWithDirDots,
      fileDeleteResponse.deletionId ?? "",
    );

    assert.instanceOf(fileundeleteResponse.pathClient, DataLakeFileClient);

    assert.isTrue(await fileundeleteResponse.pathClient.exists());
    await fileundeleteResponse.pathClient.delete();

    const directoryBaseName = recorder.variable("directory", getUniqueName(`directory`));
    const directoryClient = fileSystemClient.getDirectoryClient(directoryBaseName);
    await directoryClient.create();
    const directoryDeleteResponse = await directoryClient.delete();
    assert.isDefined(directoryDeleteResponse.deletionId);

    const directoryNameWithDirDots = "./adir/.././anotherdir/./../" + directoryBaseName;
    const directoryUndeleteResponse = await fileSystemClient.undeletePath(
      directoryNameWithDirDots,
      directoryDeleteResponse.deletionId ?? "",
    );

    assert.instanceOf(directoryUndeleteResponse.pathClient, DataLakeDirectoryClient);

    assert.isTrue(await directoryUndeleteResponse.pathClient.exists());
    await directoryUndeleteResponse.pathClient.delete();
  });

  it("Undelete file and directory - recreate and delete path and undelete the path with first deletionid", async () => {
    const fileName = recorder.variable(`file`, getUniqueName(`file`));
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    const fileDeleteResponse = await fileClient.delete();
    assert.isDefined(fileDeleteResponse.deletionId);
    const firstDeletionId = fileDeleteResponse.deletionId;

    await fileClient.create();
    await fileClient.delete();

    const fileundeleteResponse = await fileSystemClient.undeletePath(
      fileName,
      firstDeletionId ?? "",
    );

    assert.instanceOf(fileundeleteResponse.pathClient, DataLakeFileClient);

    assert.isTrue(await fileundeleteResponse.pathClient.exists());
    await fileundeleteResponse.pathClient.delete();
  });

  it("Undelete file and directory - recreate and delete path and undelete the path twice", async () => {
    const fileName = recorder.variable(`file`, getUniqueName(`file`));
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    const firstDeleteResponse = await fileClient.delete();
    assert.isDefined(firstDeleteResponse.deletionId);

    await fileClient.create();
    const secondDeleteResponse = await fileClient.delete();
    assert.isDefined(secondDeleteResponse.deletionId);

    const fileundeleteResponse = await fileSystemClient.undeletePath(
      fileName,
      secondDeleteResponse.deletionId ?? "",
    );

    assert.instanceOf(fileundeleteResponse.pathClient, DataLakeFileClient);

    assert.isTrue(await fileundeleteResponse.pathClient.exists());
    await fileundeleteResponse.pathClient.delete();

    try {
      await fileSystemClient.undeletePath(fileName, firstDeleteResponse.deletionId ?? "");
      assert.fail("Second undeletion should fail");
    } catch (err: any) {
      /* empty */
      // The test case here expects an expection, so the exception should not fail the case.
    }
  });

  it("Undelete file and directory with deleteIfExists", async () => {
    const fileName = recorder.variable(`file`, getUniqueName(`file`));
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    const fileDeleteResponse = await fileClient.deleteIfExists();
    assert.isDefined(fileDeleteResponse.deletionId);

    const fileundeleteResponse = await fileSystemClient.undeletePath(
      fileName,
      fileDeleteResponse.deletionId ?? "",
    );

    assert.instanceOf(fileundeleteResponse.pathClient, DataLakeFileClient);

    assert.isTrue(await fileundeleteResponse.pathClient.exists());

    const directoryName = recorder.variable(`directory`, getUniqueName(`directory`));
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();
    const directoryDeleteResponse = await directoryClient.deleteIfExists();
    assert.isDefined(directoryDeleteResponse.deletionId);

    const directoryUndeleteResponse = await fileSystemClient.undeletePath(
      directoryName,
      directoryDeleteResponse.deletionId ?? "",
    );

    assert.instanceOf(directoryUndeleteResponse.pathClient, DataLakeDirectoryClient);

    assert.isTrue(await directoryUndeleteResponse.pathClient.exists());
  });

  it("Undelete file and directory special char", async () => {
    const fileNames = [
      "!'();[]@&%=+$,#äÄöÖüÜß;",
      "%21%27%28%29%3B%5B%5D%40%26%25%3D%2B%24%2C%23äÄöÖüÜß%3B",
      " a file or directory ",
    ];

    for (const fileName of fileNames) {
      const fileClient = fileSystemClient.getFileClient(fileName);
      await fileClient.create();
      const fileDeleteResponse = await fileClient.delete();
      assert.isDefined(fileDeleteResponse.deletionId);

      const fileundeleteResponse = await fileSystemClient.undeletePath(
        fileName,
        fileDeleteResponse.deletionId ?? "",
      );

      assert.instanceOf(fileundeleteResponse.pathClient, DataLakeFileClient);
      assert.isTrue(await fileundeleteResponse.pathClient.exists());
    }
  });
});

describe("Version error test", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    serviceClient = getDataLakeServiceClient(recorder);
    fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  function XMSVersioninjectorPolicy(version: string): PipelinePolicy {
    return {
      name: "XMSVersioninjectorPolicy",
      async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
        request.headers.set("x-ms-version", version);
        return next(request);
      },
    };
  }

  it("Invalid service version", async () => {
    const injector = XMSVersioninjectorPolicy(`3025-01-01`);

    const pipeline: Pipeline = fileSystemClient["storageClientContext"].pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });
    try {
      await fileSystemClient.create();
    } catch (err) {
      assert.isTrue(
        (err as any).message.startsWith(
          "The provided service version is not enabled on this storage account. Please see",
        ),
      );
    }
  });
});
