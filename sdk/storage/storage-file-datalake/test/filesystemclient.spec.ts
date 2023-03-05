// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SpanGraph, setTracer, getYieldedValue } from "@azure/test-utils";
import { isLiveMode, record, Recorder } from "@azure-tools/test-recorder";
import { setSpan, context } from "@azure/core-tracing";
import { assert } from "chai";

import {
  DataLakeFileSystemClient,
  FileSystemListPathsResponse,
  DataLakeServiceClient,
  FileSystemListDeletedPathsResponse,
  DataLakeFileClient,
  DataLakeDirectoryClient,
} from "../src";
import {
  getDataLakeServiceClient,
  getEncryptionScope,
  getGenericDataLakeServiceClient,
  recorderEnvSetup,
} from "./utils";
import { Context } from "mocha";

describe("DataLakeFileSystemClient", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
  });

  afterEach(async function () {
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
    const tracer = setTracer();
    const rootSpan = tracer.startSpan("root");

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    await fileSystemClient.setMetadata(metadata, {
      tracingOptions: {
        tracingContext: setSpan(context.active(), rootSpan),
      },
    });
    rootSpan.end();

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children: [
            {
              name: "Azure.Storage.DataLake.DataLakeFileSystemClient-setMetadata",
              children: [
                {
                  name: "Azure.Storage.Blob.ContainerClient-setMetadata",
                  children: [
                    {
                      name: "HTTP PUT",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.spanContext().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  });

  it("getProperties", async () => {
    const result = await fileSystemClient.getProperties();
    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(!result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
    assert.ok(!result.publicAccess);
    assert.ok(result.clientRequestId); // As default pipeline involves UniqueRequestIDPolicy
  });

  it("create with default parameters", (done) => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("create with all parameters configured", async () => {
    const cClient = serviceClient.getFileSystemClient(recorder.getUniqueName(fileSystemName));
    const metadata = { key: "value" };
    const access = "filesystem";
    await cClient.create({ metadata, access });
    const result = await cClient.getProperties();
    assert.deepEqual(result.publicAccess, access);
    assert.deepEqual(result.metadata, metadata);
  });

  it("create with encryption scope", async function (this: Context) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }

    const cClient = serviceClient.getFileSystemClient(recorder.getUniqueName(fileSystemName));
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

  it("create with encryption scope - preventEncryptionScopeOverride : false", async function (this: Context) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }

    const cClient = serviceClient.getFileSystemClient(recorder.getUniqueName(fileSystemName));
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
    const cClient = serviceClient.getFileSystemClient(recorder.getUniqueName(fileSystemName));
    const metadata = { key: "value" };
    const access = "filesystem";
    const createRes = await cClient.createIfNotExists({ metadata, access });
    assert.ok(createRes.succeeded);
    assert.ok(createRes.etag);

    const createRes2 = await cClient.createIfNotExists({ metadata, access });
    assert.ok(!createRes2.succeeded);

    await cClient.deleteIfExists();
  });

  it("deleteIfExists", async () => {
    const cClient = serviceClient.getFileSystemClient(recorder.getUniqueName(fileSystemName));
    const res = await cClient.deleteIfExists();
    assert.ok(!res.succeeded);

    await cClient.create();
    const res2 = await cClient.deleteIfExists();
    assert.ok(res2.succeeded);
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("listPaths with default parameters", async () => {
    const recordedNow = recorder.newDate("now"); // Flaky workaround for the recording to work.

    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file${i}`));
      await fileClient.create();
      fileClients.push(fileClient);
    }

    const result = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;

    assert.deepStrictEqual(result.continuation, undefined);
    assert.deepStrictEqual(result.pathItems!.length, fileClients.length);
    assert.ok(fileClients[0].url.indexOf(result.pathItems![0].name!));

    // The path is created just now, createdOn should be around but may not be the same to current time.
    assert.equal(result.pathItems![0].createdOn?.getUTCFullYear(), recordedNow.getUTCFullYear());
    assert.equal(result.pathItems![0].createdOn?.getUTCMonth(), recordedNow.getUTCMonth());
    assert.equal(result.pathItems![0].createdOn?.getUTCDate(), recordedNow.getUTCDate());
    assert.equal(result.pathItems![0].createdOn?.getUTCHours(), recordedNow.getUTCHours());

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it("listPaths - Encryption Scope", async function (this: Context) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }

    const cClient = serviceClient.getFileSystemClient(recorder.getUniqueName(fileSystemName));
    await cClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });

    const fileClient = cClient.getFileClient(recorder.getUniqueName(`file`));
    await fileClient.create();

    const dirClient = cClient.getFileClient(recorder.getUniqueName(`dir`));
    await dirClient.create();

    const result = (await cClient.listPaths().byPage().next()).value as FileSystemListPathsResponse;

    assert.equal(result.pathItems!.length, 2);
    assert.equal(result.pathItems![0].encryptionScope, encryptionScopeName);
    assert.equal(result.pathItems![1].encryptionScope, encryptionScopeName);

    await fileClient.delete();
    await dirClient.delete();
  });

  it("listPaths - Encryption context", async function (this: Context) {
    const encryptionContext = "EncryptionContext";

    const cClient = serviceClient.getFileSystemClient(recorder.getUniqueName(fileSystemName));
    await cClient.create();

    const fileClient = cClient.getFileClient(recorder.getUniqueName(`file`));
    await fileClient.create({ encryptionContext: encryptionContext });

    const dirClient = cClient.getFileClient(recorder.getUniqueName(`dir`));
    await dirClient.create({ encryptionContext: encryptionContext });

    const result = (await cClient.listPaths().byPage().next()).value as FileSystemListPathsResponse;

    assert.equal(result.pathItems!.length, 2);
    assert.equal(result.pathItems![0].encryptionContext, encryptionContext);
    assert.equal(result.pathItems![1].encryptionContext, encryptionContext);

    await fileClient.delete();
    await dirClient.delete();
  });

  it("listPaths - PagedAsyncIterableIterator with Encryption Scope", async function (this: Context) {
    let encryptionScopeName;
    try {
      encryptionScopeName = getEncryptionScope();
    } catch {
      this.skip();
    }

    const cClient = serviceClient.getFileSystemClient(recorder.getUniqueName(fileSystemName));
    await cClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope: encryptionScopeName,
        preventEncryptionScopeOverride: true,
      },
    });

    const fileClient = cClient.getFileClient(recorder.getUniqueName(`file`));
    await fileClient.create();
    const dirClient = cClient.getFileClient(recorder.getUniqueName(`dir`));
    await dirClient.create();

    for await (const listedFile of cClient.listPaths()) {
      assert.equal(listedFile.encryptionScope, encryptionScopeName);
    }

    await fileClient.delete();
    await dirClient.delete();
  });

  it("listPaths - ExpiryTime, NeverExpire", async () => {
    const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file`));
    await fileClient.create();
    await fileClient.setExpiry("NeverExpire");
    const result = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;

    assert.equal(result.pathItems![0].expiresOn, undefined);
    await fileClient.delete();
  });

  it("listPaths - ExpiryTime, Absolute", async () => {
    const now = new Date();
    const recordedNow = recorder.newDate("now"); // Flaky workaround for the recording to work.
    const delta = 30 * 1000;
    const expiresOn = new Date(now.getTime() + delta);
    const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file`));

    const content = "Hello, World";
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
    await fileClient.setExpiry("Absolute", { expiresOn });

    const result = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;

    const recordedExpiresOn = new Date(recordedNow.getTime() + delta);
    recordedExpiresOn.setMilliseconds(0); // milliseconds dropped
    assert.equal(result.pathItems![0].expiresOn?.getTime(), recordedExpiresOn.getTime());
    await fileClient.delete();
  });

  it("listPaths - ExpiryTime, RelativeToNow", async () => {
    const delta = 30 * 1000;
    const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file`));

    const content = "Hello, World";
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
    await fileClient.setExpiry("RelativeToNow", { timeToExpireInMs: delta });

    const result = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;

    assert.ok(result.pathItems![0].expiresOn);
    await fileClient.delete();
  });

  it("listPaths - ExpiryTime, RelativeToCreation", async () => {
    const delta = 1000 * 3600 + 0.12;
    const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file`));

    const content = "Hello, World";
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
    await fileClient.setExpiry("RelativeToCreation", { timeToExpireInMs: delta });

    const result = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;
    assert.equal(
      result.pathItems![0].expiresOn?.getTime(),
      result.pathItems![0].createdOn!.getTime() + Math.round(delta)
    );
    await fileClient.delete();
  });

  it("listPaths with default parameters - null path shouldn't throw error", async () => {
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file${i}`));

      await fileClient.create();
      fileClients.push(fileClient);
    }

    const result = (await fileSystemClient.listPaths({ path: "" }).byPage().next()).value;
    assert.deepStrictEqual(result.continuation, undefined);
    assert.deepStrictEqual(result.pathItems!.length, fileClients.length);
    assert.ok(fileClients[0].url.indexOf(result.pathItems![0].name));

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
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

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
    assert.ok(fileClients[0].url.indexOf(result.pathItems![0].name!));

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
    assert.ok(fileClients[0].url.indexOf(result2.pathItems![0].name));

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
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

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
      assert.ok(fileClients[i].url.indexOf(file.name!));
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
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

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
    assert.ok(fileClients[0].url.indexOf(path.name!));

    path = getYieldedValue(await iterator.next());
    assert.ok(fileClients[1].url.indexOf(path.name!));

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
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

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
        assert.ok(fileClients[i].url.indexOf(file.name!));
        i++;
      }
    }

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

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
      assert.ok(fileClients[i].url.indexOf(file.name));
      i++;
    }
    // Gets next marker
    const marker = response.continuationToken;
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
      assert.ok(fileClients[i].url.indexOf(file.name));
      i++;
    }

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it("verify fileSystemName passed to the client", async () => {
    const accountName = "myaccount";
    const newClient = new DataLakeFileSystemClient(
      `https://${accountName}.dfs.core.windows.net/` + fileSystemName
    );
    assert.equal(
      newClient.name,
      fileSystemName,
      "File system name is not the same as the one provided."
    );
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided."
    );
  });

  it("exists returns true on an existing file system", async () => {
    const result = await fileSystemClient.exists();
    assert.ok(result, "exists() should return true for an existing file system");
  });

  it("exists returns false on non-existing file system", async () => {
    const newFileSystemClient = serviceClient.getFileSystemClient(
      recorder.getUniqueName("newfilesystem")
    );
    const result = await newFileSystemClient.exists();
    assert.ok(result === false, "exists() should returns false on non-existing file system");
  });
});

describe("DataLakeFileSystemClient with soft delete", () => {
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);

    if (isLiveMode()) {
      // Turn on this case when the Container Rename feature is ready in the service side.
      this.skip();
    }

    try {
      serviceClient = getGenericDataLakeServiceClient("DFS_SOFT_DELETE_");
    } catch (err: any) {
      this.skip();
    }

    fileSystemClient = serviceClient.getFileSystemClient(recorder.getUniqueName(`filesystem`));
    await fileSystemClient.createIfNotExists();
  });

  afterEach(async function () {
    if (fileSystemClient !== undefined) {
      await fileSystemClient.deleteIfExists();
    }
    await recorder.stop();
  });

  it("listDeletedPaths with default parameters", async () => {
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file${i}`));
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
    assert.ok(fileClients[0].url.indexOf(result.pathItems![0].name));

    for (const pathItem of result.pathItems!) {
      assert.ok(pathItem.deletedOn);
      assert.ok(pathItem.deletionId);
      assert.ok(pathItem.remainingRetentionDays);
    }
  });

  it("listDeletedPaths and listPaths with recreating file after deletion", async () => {
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file${i}`));
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
    assert.ok(fileClients[0].url.indexOf(result.pathItems![0].name));

    for (const pathItem of result.pathItems!) {
      assert.ok(pathItem.deletedOn);
      assert.ok(pathItem.deletionId);
      assert.ok(pathItem.remainingRetentionDays);
    }

    const listPathResult = (await fileSystemClient.listPaths().byPage().next())
      .value as FileSystemListPathsResponse;

    assert.deepStrictEqual(listPathResult.continuation, undefined);
    assert.deepStrictEqual(listPathResult.pathItems!.length, fileClients.length);
    assert.ok(fileClients[0].url.indexOf(listPathResult.pathItems![0].name!));
  });

  it("listDeletedPaths with recreating and deletion again", async () => {
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file${i}`));
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
    assert.ok(fileClients[0].url.indexOf(result.pathItems![0].name));

    for (const pathItem of result.pathItems!) {
      assert.ok(pathItem.deletedOn);
      assert.ok(pathItem.deletionId);
      assert.ok(pathItem.remainingRetentionDays);
    }
  });

  it("listDeletedPaths with default parameters - empty path shouldn't throw error", async () => {
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file${i}`));

      await fileClient.create();
      fileClients.push(fileClient);
    }

    for (const file of fileClients) {
      await file.delete();
    }

    const result = (await fileSystemClient.listDeletedPaths({ prefix: "" }).byPage().next()).value;

    assert.deepStrictEqual(result.continuation, undefined);
    assert.deepStrictEqual(result.pathItems!.length, fileClients.length);
    assert.ok(fileClients[0].url.indexOf(result.pathItems![0].name));

    for (const pathItem of result.pathItems!) {
      assert.ok(pathItem.deletedOn);
      assert.ok(pathItem.deletionId);
      assert.ok(pathItem.remainingRetentionDays);
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
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

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
    assert.ok(fileClients[0].url.indexOf(result.pathItems![0].name));
    for (const pathItem of result.pathItems!) {
      assert.ok(pathItem.deletedOn);
      assert.ok(pathItem.deletionId);
      assert.ok(pathItem.remainingRetentionDays);
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
    assert.ok(fileClients[0].url.indexOf(result2.pathItems![0].name));
  });

  it("Verify PagedAsyncIterableIterator for listDeletedPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

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
      assert.ok(fileClients[i].url.indexOf(file.name));
      assert.ok(file.deletedOn);
      assert.ok(file.deletionId);
      assert.ok(file.remainingRetentionDays);
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
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

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
    assert.ok(fileClients[0].url.indexOf(path.name));
    assert.ok(path.deletedOn);
    assert.ok(path.deletionId);
    assert.ok(path.remainingRetentionDays);

    path = getYieldedValue(await iterator.next());
    assert.ok(fileClients[1].url.indexOf(path.name));
    assert.ok(path.deletedOn);
    assert.ok(path.deletionId);
    assert.ok(path.remainingRetentionDays);
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for listDeletedPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

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
        assert.ok(fileClients[i].url.indexOf(file.name));
        assert.ok(file.deletedOn);
        assert.ok(file.deletionId);
        assert.ok(file.remainingRetentionDays);
        i++;
      }
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listDeletedPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

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
      assert.ok(fileClients[i].url.indexOf(file.name));
      assert.ok(file.deletedOn);
      assert.ok(file.deletionId);
      assert.ok(file.remainingRetentionDays);
      i++;
    }
    // Gets next marker
    const marker = response.continuationToken;
    // Passing next marker as continuationToken
    iter = fileSystemClient
      .listDeletedPaths({
        prefix: "",
      })
      .byPage({ continuationToken: marker, maxPageSize: 2 });
    response = (await iter.next()).value;
    // Gets 2 blobs
    for (const file of response.pathItems) {
      assert.ok(fileClients[i].url.indexOf(file.name));
      assert.ok(file.deletedOn);
      assert.ok(file.deletionId);
      assert.ok(file.remainingRetentionDays);
      i++;
    }
  });

  it("Undelete file and directory", async () => {
    const fileName = recorder.getUniqueName(`file`);
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    const fileDeleteResponse = await fileClient.delete();
    assert.ok(fileDeleteResponse.deletionId);

    const fileundeleteResponse = await fileSystemClient.undeletePath(
      fileName,
      fileDeleteResponse.deletionId ?? ""
    );

    assert.ok(fileundeleteResponse.pathClient instanceof DataLakeFileClient);

    assert.ok(await fileundeleteResponse.pathClient.exists());
    await fileundeleteResponse.pathClient.delete();

    const directoryName = recorder.getUniqueName(`directory`);
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();
    const directoryDeleteResponse = await directoryClient.delete();
    assert.ok(directoryDeleteResponse.deletionId);

    const directoryUndeleteResponse = await fileSystemClient.undeletePath(
      directoryName,
      directoryDeleteResponse.deletionId ?? ""
    );

    assert.ok(directoryUndeleteResponse.pathClient instanceof DataLakeDirectoryClient);

    assert.ok(await directoryUndeleteResponse.pathClient.exists());
    await directoryUndeleteResponse.pathClient.delete();
  });

  it("Undelete file and directory - with directory dots", async () => {
    const fileBaseName = recorder.getUniqueName(`file`);
    const fileClient = fileSystemClient.getFileClient(fileBaseName);
    await fileClient.create();
    const fileDeleteResponse = await fileClient.delete();
    assert.ok(fileDeleteResponse.deletionId);

    const fileNameWithDirDots = "./adir/.././anotherdir/./../" + fileBaseName;

    const fileundeleteResponse = await fileSystemClient.undeletePath(
      fileNameWithDirDots,
      fileDeleteResponse.deletionId ?? ""
    );

    assert.ok(fileundeleteResponse.pathClient instanceof DataLakeFileClient);

    assert.ok(await fileundeleteResponse.pathClient.exists());
    await fileundeleteResponse.pathClient.delete();

    const directoryBaseName = recorder.getUniqueName(`directory`);
    const directoryClient = fileSystemClient.getDirectoryClient(directoryBaseName);
    await directoryClient.create();
    const directoryDeleteResponse = await directoryClient.delete();
    assert.ok(directoryDeleteResponse.deletionId);

    const directoryNameWithDirDots = "./adir/.././anotherdir/./../" + directoryBaseName;
    const directoryUndeleteResponse = await fileSystemClient.undeletePath(
      directoryNameWithDirDots,
      directoryDeleteResponse.deletionId ?? ""
    );

    assert.ok(directoryUndeleteResponse.pathClient instanceof DataLakeDirectoryClient);

    assert.ok(await directoryUndeleteResponse.pathClient.exists());
    await directoryUndeleteResponse.pathClient.delete();
  });

  it("Undelete file and directory - recreate and delete path and undelete the path with first deletionid", async () => {
    const fileName = recorder.getUniqueName(`file`);
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    const fileDeleteResponse = await fileClient.delete();
    assert.ok(fileDeleteResponse.deletionId);
    const firstDeletionId = fileDeleteResponse.deletionId;

    await fileClient.create();
    await fileClient.delete();

    const fileundeleteResponse = await fileSystemClient.undeletePath(
      fileName,
      firstDeletionId ?? ""
    );

    assert.ok(fileundeleteResponse.pathClient instanceof DataLakeFileClient);

    assert.ok(await fileundeleteResponse.pathClient.exists());
    await fileundeleteResponse.pathClient.delete();
  });

  it("Undelete file and directory - recreate and delete path and undelete the path twice", async () => {
    const fileName = recorder.getUniqueName(`file`);
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    const firstDeleteResponse = await fileClient.delete();
    assert.ok(firstDeleteResponse.deletionId);

    await fileClient.create();
    const secondDeleteResponse = await fileClient.delete();
    assert.ok(secondDeleteResponse.deletionId);

    const fileundeleteResponse = await fileSystemClient.undeletePath(
      fileName,
      secondDeleteResponse.deletionId ?? ""
    );

    assert.ok(fileundeleteResponse.pathClient instanceof DataLakeFileClient);

    assert.ok(await fileundeleteResponse.pathClient.exists());
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
    const fileName = recorder.getUniqueName(`file`);
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    const fileDeleteResponse = await fileClient.deleteIfExists();
    assert.ok(fileDeleteResponse.deletionId);

    const fileundeleteResponse = await fileSystemClient.undeletePath(
      fileName,
      fileDeleteResponse.deletionId ?? ""
    );

    assert.ok(fileundeleteResponse.pathClient instanceof DataLakeFileClient);

    assert.ok(await fileundeleteResponse.pathClient.exists());

    const directoryName = recorder.getUniqueName(`directory`);
    const directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();
    const directoryDeleteResponse = await directoryClient.deleteIfExists();
    assert.ok(directoryDeleteResponse.deletionId);

    const directoryUndeleteResponse = await fileSystemClient.undeletePath(
      directoryName,
      directoryDeleteResponse.deletionId ?? ""
    );

    assert.ok(directoryUndeleteResponse.pathClient instanceof DataLakeDirectoryClient);

    assert.ok(await directoryUndeleteResponse.pathClient.exists());
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
      assert.ok(fileDeleteResponse.deletionId);

      const fileundeleteResponse = await fileSystemClient.undeletePath(
        fileName,
        fileDeleteResponse.deletionId ?? ""
      );

      assert.ok(fileundeleteResponse.pathClient instanceof DataLakeFileClient);
      assert.ok(await fileundeleteResponse.pathClient.exists());
    }
  });
});
