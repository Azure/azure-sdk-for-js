import { setTracer, SpanGraph, TestTracer } from "@azure/core-tracing";
import { record, Recorder } from "@azure/test-utils-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";

import {
  DataLakeFileSystemClient,
  FileSystemListPathsResponse,
  DataLakeServiceClient
} from "../src";
import { getDataLakeServiceClient, recorderEnvSetup } from "./utils";
import { URLBuilder } from "@azure/core-http";

dotenv.config();

describe("DataLakeFileSystemClient", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
  });

  afterEach(async function() {
    await fileSystemClient.delete();
    recorder.stop();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await fileSystemClient.setMetadata(metadata);

    const result = await fileSystemClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("setMetadata with tracing", async () => {
    const tracer = new TestTracer();
    setTracer(tracer);
    const rootSpan = tracer.startSpan("root");

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await fileSystemClient.setMetadata(metadata, {
      tracingOptions: { spanOptions: { parent: rootSpan.context() } }
    });
    rootSpan.end();

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const urlPath = URLBuilder.parse(fileSystemClient.url).getPath() || "";
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
                      name: urlPath,
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
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

  it("createIfNotExists", async () => {
    const cClient = serviceClient.getFileSystemClient(recorder.getUniqueName(fileSystemName));
    const metadata = { key: "value" };
    const access = "filesystem";
    const createRes = await cClient.createIfNotExists({ metadata, access });
    assert.ok(createRes.succeeded);
    assert.ok(createRes.etag);

    const createRes2 = await cClient.createIfNotExists({ metadata, access });
    assert.ok(!createRes2.succeeded);

    await cClient.delete();
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
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file${i}`));
      await fileClient.create();
      fileClients.push(fileClient);
    }

    const result = (
      await fileSystemClient
        .listPaths()
        .byPage()
        .next()
    ).value as FileSystemListPathsResponse;

    assert.deepStrictEqual(result.continuation, undefined);
    assert.deepStrictEqual(result.pathItems!.length, fileClients.length);
    assert.ok(fileClients[0].url.indexOf(result.pathItems![0].name!));

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it("listPaths with default parameters - null path shouldn't throw error", async () => {
    const fileClients = [];
    for (let i = 0; i < 3; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`file${i}`));

      await fileClient.create();
      fileClients.push(fileClient);
    }

    const result = (
      await fileSystemClient
        .listPaths({ path: "" })
        .byPage()
        .next()
    ).value;
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
      keyb: "c"
    };
    for (let i = 0; i < 2; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

      await fileClient.create({
        metadata: metadata
      });
      fileClients.push(fileClient);
    }

    const result = (
      await fileSystemClient
        .listPaths({
          userPrincipalName: true,
          recursive: true,
          path: ""
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
          path: ""
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
      keyb: "c"
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

      await fileClient.create({
        metadata
      });
      fileClients.push(fileClient);
    }

    let i = 0;
    for await (const file of fileSystemClient.listPaths({
      userPrincipalName: true,
      recursive: true,
      path: ""
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
      keyb: "c"
    };
    for (let i = 0; i < 2; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

      await fileClient.create({
        metadata
      });
      fileClients.push(fileClient);
    }

    const iterator = fileSystemClient.listPaths({
      userPrincipalName: true,
      recursive: true,
      path: ""
    });

    let path = await iterator.next();
    assert.ok(fileClients[0].url.indexOf(path.value.name!));

    path = await iterator.next();
    assert.ok(fileClients[1].url.indexOf(path.value.name!));

    for (const file of fileClients) {
      await file.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for listPaths", async () => {
    const fileClients = [];
    const prefix = "file";
    const metadata = {
      keya: "a",
      keyb: "c"
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

      await fileClient.create({
        metadata
      });
      fileClients.push(fileClient);
    }

    let i = 0;
    for await (const response of fileSystemClient
      .listPaths({
        userPrincipalName: true,
        recursive: true,
        path: ""
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
      keyb: "c"
    };
    for (let i = 0; i < 4; i++) {
      const fileClient = fileSystemClient.getFileClient(recorder.getUniqueName(`${prefix}${i}`));

      await fileClient.create({
        metadata
      });
      fileClients.push(fileClient);
    }

    let i = 0;
    let iter = fileSystemClient
      .listPaths({
        userPrincipalName: true,
        recursive: true,
        path: ""
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
        path: ""
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
