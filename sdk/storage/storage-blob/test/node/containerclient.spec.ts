// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  configureBlobStorageClient,
  SimpleTokenCredential,
  getBSU,
  getConnectionStringFromEnvironment,
  getUniqueName,
  createAndStartRecorder,
} from "../utils/index.js";
import type { PublicAccessType } from "../../src/index.js";
import { getBlobServiceAccountAudience } from "../../src/index.js";
import { StorageSharedKeyCredential } from "@azure/storage-common";
import type { BlobServiceClient, BlobItem } from "../../src/index.js";
import {
  ContainerClient,
  newPipeline,
  ContainerSASPermissions,
  StorageResponseFormat,
} from "../../src/index.js";
import type { TokenCredential } from "@azure/core-auth";
import { assertClientUsesTokenCredential } from "../utils/assert.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type {
  Pipeline,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { Readable } from "node:stream";

describe("ContainerClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async (ctx) => {
    recorder = await createAndStartRecorder(ctx);

    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("Default audience should work", async () => {
    const containerClientWithOAuthToken = new ContainerClient(
      containerClient.url,
      createTestCredential(),
    );
    configureBlobStorageClient(recorder, containerClientWithOAuthToken);
    const exists = await containerClientWithOAuthToken.exists();
    assert.strictEqual(exists, true);
  });

  it("Customized audience should work", async () => {
    const containerClientWithOAuthToken = new ContainerClient(
      containerClient.url,
      createTestCredential(),
      {
        audience: [getBlobServiceAccountAudience(blobServiceClient.accountName)],
      },
    );
    configureBlobStorageClient(recorder, containerClientWithOAuthToken);
    const exists = await containerClientWithOAuthToken.exists();
    assert.strictEqual(exists, true);
  });

  it("Bearer token challenge should work", async () => {
    // Validate that bad audience should fail first.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const containerClientWithPlainOAuthToken = new ContainerClient(
      containerClient.url,
      new SimpleTokenCredential(authToken!.token),
    );
    configureBlobStorageClient(recorder, containerClientWithPlainOAuthToken);

    try {
      await containerClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }
    const containerClientWithOAuthToken = new ContainerClient(
      containerClient.url,
      createTestCredential(),
      {
        audience: ["https://badaudience.blob.core.windows.net/.default"],
      },
    );
    configureBlobStorageClient(recorder, containerClientWithOAuthToken);
    await containerClientWithOAuthToken.getProperties();
  });

  it("getAccessPolicy", async () => {
    const result = await containerClient.getAccessPolicy();
    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.clientRequestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("setAccessPolicy", async () => {
    const access: PublicAccessType = "blob";
    const containerAcl = [
      {
        accessPolicy: {
          expiresOn: new Date("2018-12-31T11:22:33.4567890Z"),
          permissions: ContainerSASPermissions.parse("rwd").toString(),
          startsOn: new Date("2017-12-31T11:22:33.4567890Z"),
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=",
      },
    ];

    await containerClient.setAccessPolicy(access, containerAcl);
    const result = await containerClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, containerAcl);
    assert.deepEqual(result.blobPublicAccess, access);
  });

  it("setAccessPolicy with OAuth", async () => {
    const containerClientWithOAuthToken = new ContainerClient(
      containerClient.url,
      createTestCredential(),
    );
    configureBlobStorageClient(recorder, containerClientWithOAuthToken);
    const exists = await containerClientWithOAuthToken.exists();
    assert.strictEqual(exists, true);

    const containerAcl = [
      {
        accessPolicy: {
          expiresOn: new Date("2018-12-31T11:22:33.4567890Z"),
          permissions: ContainerSASPermissions.parse("rwd").toString(),
          startsOn: new Date("2017-12-31T11:22:33.4567890Z"),
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=",
      },
    ];

    await containerClientWithOAuthToken.setAccessPolicy(undefined, containerAcl);
    const result = await containerClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, containerAcl);
  });

  it("setAccessPolicy should work when permissions, expiry and start undefined", async () => {
    const access: PublicAccessType = "blob";
    const containerAcl = [
      {
        accessPolicy: {
          permissions: ContainerSASPermissions.parse("rwd").toString(),
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=",
      },
    ];

    await containerClient.setAccessPolicy(access, containerAcl);
    const result = await containerClient.getAccessPolicy();
    assert.deepEqual(result.signedIdentifiers, containerAcl);
    assert.deepEqual(result.blobPublicAccess, access);

    const containerAclEmpty = [
      {
        accessPolicy: {},
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=",
      },
    ];

    await containerClient.setAccessPolicy(access, containerAclEmpty);
    const resultEmpty = await containerClient.getAccessPolicy();
    assert.deepEqual(resultEmpty.signedIdentifiers[0].accessPolicy, undefined);
    assert.deepEqual(resultEmpty.blobPublicAccess, access);
  });

  it("can be created with a url and a credential", async () => {
    const credential = (containerClient as any).credential as StorageSharedKeyCredential;
    const newClient = new ContainerClient(containerClient.url, credential);
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.blobPublicAccess);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const credential = (containerClient as any).credential as StorageSharedKeyCredential;
    const newClient = new ContainerClient(containerClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.blobPublicAccess);
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = new ContainerClient(containerClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async () => {
    const credential = (containerClient as any).credential as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new ContainerClient(containerClient.url, pipeline);
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.blobPublicAccess);
  });

  it("can be created with a connection string", async () => {
    const newClient = new ContainerClient(getConnectionStringFromEnvironment(), containerName);
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.blobPublicAccess);
  });

  it("can be created with a connection string and a container name and an option bag", async () => {
    const newClient = new ContainerClient(getConnectionStringFromEnvironment(), containerName, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.blobPublicAccess);
  });
});

describe("ContainerClient List Blobs XML fallback (Apache Arrow request)", () => {
  // Exercise the Arrow list operations' XML fallback (used for non-Arrow accounts) by
  // short-circuiting the pipeline with a synthetic application/xml response.
  function containerClientReturningXml(xml: string): ContainerClient {
    const account = "fakeaccount";
    const credential = new StorageSharedKeyCredential(
      account,
      Buffer.from("fake-shared-key").toString("base64"),
    );
    const client = new ContainerClient(
      `https://${account}.blob.core.windows.net/fakecontainer`,
      credential,
    );
    const injector: PipelinePolicy = {
      name: "xmlResponseInjector",
      async sendRequest(request: PipelineRequest, _next: SendRequest): Promise<PipelineResponse> {
        return {
          request,
          status: 200,
          headers: createHttpHeaders({ "content-type": "application/xml" }),
          readableStreamBody: Readable.from([
            Buffer.from(xml, "utf-8"),
          ]) as unknown as NodeJS.ReadableStream,
        };
      },
    };
    const pipeline: Pipeline = (client as any).storageClientContext.client.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });
    return client;
  }

  const flatXml =
    `<?xml version="1.0" encoding="utf-8"?>` +
    `<EnumerationResults ServiceEndpoint="https://fakeaccount.blob.core.windows.net/" ContainerName="fakecontainer">` +
    `<Blobs>` +
    `<Blob><Name>blobA</Name><Properties>` +
    `<Last-Modified>Thu, 19 Oct 2023 03:01:29 GMT</Last-Modified><Etag>0x8DBD04FB1106DA9</Etag>` +
    `<Content-Length>1024</Content-Length><Content-Type>text/plain</Content-Type><BlobType>BlockBlob</BlobType>` +
    `</Properties></Blob>` +
    `<Blob><Name>blobB</Name><Properties>` +
    `<Last-Modified>Thu, 19 Oct 2023 03:01:29 GMT</Last-Modified><Etag>0x8DBD04FB1106DAA</Etag>` +
    `<Content-Length>2048</Content-Length><Content-Type>application/octet-stream</Content-Type><BlobType>BlockBlob</BlobType>` +
    `</Properties></Blob>` +
    `</Blobs><NextMarker /></EnumerationResults>`;

  it("listBlobsFlat parses and projects an XML fallback page", async () => {
    const client = containerClientReturningXml(flatXml);
    const items: BlobItem[] = [];
    for await (const item of client.listBlobsFlat({
      responseFormat: StorageResponseFormat.Arrow,
    })) {
      items.push(item);
    }
    assert.equal(items.length, 2);
    assert.equal(items[0].name, "blobA");
    assert.equal(items[0].properties.contentLength, 1024);
    assert.equal(items[0].properties.contentType, "text/plain");
    assert.equal(items[0].properties.blobType, "BlockBlob");
    assert.equal(items[1].name, "blobB");
    assert.equal(items[1].properties.contentLength, 2048);
  });

  it("listBlobsFlat XML fallback preserves the decoded response body text", async () => {
    const client = containerClientReturningXml(flatXml);
    for await (const page of client
      .listBlobsFlat({ responseFormat: StorageResponseFormat.Arrow })
      .byPage()) {
      assert.include(page._response.bodyAsText ?? "", "<Name>blobA</Name>");
    }
  });

  const hierarchyXml =
    `<?xml version="1.0" encoding="utf-8"?>` +
    `<EnumerationResults ServiceEndpoint="https://fakeaccount.blob.core.windows.net/" ContainerName="fakecontainer">` +
    `<Delimiter>/</Delimiter><Blobs>` +
    `<Blob><Name>rootblob</Name><Properties>` +
    `<Last-Modified>Thu, 19 Oct 2023 03:01:29 GMT</Last-Modified><Etag>0x8DBD04FB1106DA9</Etag>` +
    `<Content-Length>10</Content-Length><Content-Type>text/plain</Content-Type><BlobType>BlockBlob</BlobType>` +
    `</Properties></Blob>` +
    `<BlobPrefix><Name>folder1/</Name></BlobPrefix>` +
    `</Blobs><NextMarker /></EnumerationResults>`;

  it("listBlobsByHierarchy parses and projects an XML fallback page with prefixes", async () => {
    const client = containerClientReturningXml(hierarchyXml);
    const blobs: string[] = [];
    const prefixes: string[] = [];
    for await (const item of client.listBlobsByHierarchy("/", {
      responseFormat: StorageResponseFormat.Arrow,
    })) {
      if (item.kind === "prefix") {
        prefixes.push(item.name);
      } else {
        blobs.push(item.name);
      }
    }
    assert.deepEqual(blobs, ["rootblob"]);
    assert.deepEqual(prefixes, ["folder1/"]);
  });
});
