// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import {
  BlobBatch,
  BlobSASPermissions,
  BlobServiceClient,
  ContainerSASPermissions,
  generateBlobSASQueryParameters,
  SASProtocol,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_DefaultAzureCredential", async () => {
    // Enter your storage account name
    const account = "<account>";
    const defaultAzureCredential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // @ts-ignore
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      defaultAzureCredential,
    );
  });

  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connStr = "<connection string>";
    // @ts-preserve-whitespace
    // @ts-ignore
    const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
  });

  it("ReadmeSampleCreateClient_StorageSharedKeyCredential", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    // Use StorageSharedKeyCredential with storage account and account key
    // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    // @ts-ignore
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential,
    );
  });

  it("ReadmeSampleCreateClient_SASToken", async () => {
    const account = "<account name>";
    const sas = "<service Shared Access Signature Token>";
    // @ts-preserve-whitespace
    // @ts-ignore
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net?${sas}`,
    );
  });

  it("ReadmeSampleCreateContainer", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    // Create a container
    const containerName = `newcontainer${new Date().getTime()}`;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();
    console.log(
      `Create container ${containerName} successfully`,
      createContainerResponse.requestId,
    );
  });

  it("ReadmeSampleListContainers", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    let i = 1;
    const containers = blobServiceClient.listContainers();
    for await (const container of containers) {
      console.log(`Container ${i++}: ${container.name}`);
    }
  });

  it("ReadmeSampleListContainers_WithoutForAwait", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    let i = 1;
    const iter = blobServiceClient.listContainers();
    let { value, done } = await iter.next();
    while (!done) {
      console.log(`Container ${i++}: ${value.name}`);
      ({ value, done } = await iter.next());
    }
  });

  it("ReadmeSampleListContainers_ByPage", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    let i = 1;
    for await (const page of blobServiceClient.listContainers().byPage({ maxPageSize: 20 })) {
      for (const container of page.containerItems) {
        console.log(`Container ${i++}: ${container.name}`);
      }
    }
  });

  it("ReadmeSampleCreateBlob", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // @ts-preserve-whitespace
    const content = "Hello world!";
    const blobName = `newblob ${+new Date()}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(
      `Upload block blob ${blobName} successfully with request ID: ${uploadBlobResponse.requestId}`,
    );
  });

  it("ReadmeSampleListBlobs", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // @ts-preserve-whitespace
    let i = 1;
    const blobs = containerClient.listBlobsFlat();
    for await (const blob of blobs) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
  });

  it("ReadmeSampleListBlobs_Multiple", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // @ts-preserve-whitespace
    // Example using `for await` syntax
    let i = 1;
    const blobs = containerClient.listBlobsFlat();
    for await (const blob of blobs) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
    // @ts-preserve-whitespace
    // Example using `iter.next()` syntax
    i = 1;
    const iter = containerClient.listBlobsFlat();
    let { value, done } = await iter.next();
    while (!done) {
      console.log(`Blob ${i++}: ${value.name}`);
      ({ value, done } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Example using `byPage()` syntax
    i = 1;
    for await (const page of containerClient.listBlobsFlat().byPage({ maxPageSize: 20 })) {
      for (const blob of page.segment.blobItems) {
        console.log(`Blob ${i++}: ${blob.name}`);
      }
    }
    // @ts-preserve-whitespace
    // Example using paging with a marker
    i = 1;
    let iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // Prints 2 blob names
    if (response.segment.blobItems) {
      for (const blob of response.segment.blobItems) {
        console.log(`Blob ${i++}: ${blob.name}`);
      }
    }
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    iterator = containerClient
      .listBlobsFlat()
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // Prints 10 blob names
    if (response.segment.blobItems) {
      for (const blob of response.segment.blobItems) {
        console.log(`Blob ${i++}: ${blob.name}`);
      }
    }
  });

  it("ReadmeSampleListBlobsByHierarchy", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // @ts-preserve-whitespace
    // Example using `for await` syntax
    let i = 1;
    const blobs = containerClient.listBlobsByHierarchy("/");
    for await (const blob of blobs) {
      if (blob.kind === "prefix") {
        console.log(`\tBlobPrefix: ${blob.name}`);
      } else {
        console.log(`\tBlobItem: name - ${blob.name}`);
      }
    }
    // @ts-preserve-whitespace
    // Example using `iter.next()` syntax
    i = 1;
    const iter = containerClient.listBlobsByHierarchy("/");
    let { value, done } = await iter.next();
    while (!done) {
      if (value.kind === "prefix") {
        console.log(`\tBlobPrefix: ${value.name}`);
      } else {
        console.log(`\tBlobItem: name - ${value.name}`);
      }
      ({ value, done } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Example using `byPage()` syntax
    i = 1;
    for await (const page of containerClient
      .listBlobsByHierarchy("/")
      .byPage({ maxPageSize: 20 })) {
      const segment = page.segment;
      if (segment.blobPrefixes) {
        for (const prefix of segment.blobPrefixes) {
          console.log(`\tBlobPrefix: ${prefix.name}`);
        }
      }
      for (const blob of page.segment.blobItems) {
        console.log(`\tBlobItem: name - ${blob.name}`);
      }
    }
    // @ts-preserve-whitespace
    // Example using paging with a marker
    i = 1;
    let iterator = containerClient.listBlobsByHierarchy("/").byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // Prints 2 blob names
    if (response.blobPrefixes) {
      for (const prefix of response.blobPrefixes) {
        console.log(`\tBlobPrefix: ${prefix.name}`);
      }
    }
    if (response.segment.blobItems) {
      for (const blob of response.segment.blobItems) {
        console.log(`\tBlobItem: name - ${blob.name}`);
      }
    }
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    iterator = containerClient
      .listBlobsByHierarchy("/")
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // Prints 10 blob names
    if (response.blobPrefixes) {
      for (const prefix of response.blobPrefixes) {
        console.log(`\tBlobPrefix: ${prefix.name}`);
      }
    }
    if (response.segment.blobItems) {
      for (const blob of response.segment.blobItems) {
        console.log(`Blob ${i++}: ${blob.name}`);
      }
    }
  });

  it("ReadmeSampleFindBlobsByTags", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // @ts-preserve-whitespace
    // Example using `for await` syntax
    let i = 1;
    for await (const blob of containerClient.findBlobsByTags("tagkey='tagvalue'")) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
    // @ts-preserve-whitespace
    // Example using `iter.next()` syntax
    i = 1;
    const iter = containerClient.findBlobsByTags("tagkey='tagvalue'");
    let { value, done } = await iter.next();
    while (!done) {
      console.log(`Blob ${i++}: ${value.name}`);
      ({ value, done } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Example using `byPage()` syntax
    i = 1;
    for await (const page of containerClient
      .findBlobsByTags("tagkey='tagvalue'")
      .byPage({ maxPageSize: 20 })) {
      for (const blob of page.blobs) {
        console.log(`Blob ${i++}: ${blob.name}`);
      }
    }
    // @ts-preserve-whitespace
    // Example using paging with a marker
    i = 1;
    let iterator = containerClient.findBlobsByTags("tagkey='tagvalue'").byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // Prints 2 blob names
    if (response.blobs) {
      for (const blob of response.blobs) {
        console.log(`Blob ${i++}: ${blob.name}`);
      }
    }
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    iterator = containerClient
      .findBlobsByTags("tagkey='tagvalue'")
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // Prints 10 blob names
    if (response.blobs) {
      for (const blob of response.blobs) {
        console.log(`Blob ${i++}: ${blob.name}`);
      }
    }
  });

  it("ReadmeSampleDownloadBlob_Node", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const blobName = "<blob name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    // @ts-preserve-whitespace
    // Get blob content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    const downloadBlockBlobResponse = await blobClient.download();
    if (downloadBlockBlobResponse.readableStreamBody) {
      const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);
      console.log(`Downloaded blob content: ${downloaded}`);
    }
    // @ts-preserve-whitespace
    async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
      const result = await new Promise<Buffer<ArrayBuffer>>((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on("data", (data) => {
          chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
        });
        stream.on("end", () => {
          resolve(Buffer.concat(chunks));
        });
        stream.on("error", reject);
      });
      return result.toString();
    }
  });

  it("ReadmeSampleDownloadBlob_Browser", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const blobName = "<blob name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    // @ts-preserve-whitespace
    // Get blob content from position 0 to the end
    // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
    const downloadBlockBlobResponse = await blobClient.download();
    const blobBody = await downloadBlockBlobResponse.blobBody;
    if (blobBody) {
      const downloaded = await blobBody.text();
      console.log(`Downloaded blob content: ${downloaded}`);
    }
  });

  it("BlobBatchClientSubmitBatch", async () => {
    const account = "<account>";
    const credential = new DefaultAzureCredential();
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobBatchClient = containerClient.getBlobBatchClient();
    // @ts-preserve-whitespace
    const batchRequest = new BlobBatch();
    await batchRequest.deleteBlob("<blob-url-1>", credential);
    await batchRequest.deleteBlob("<blob-url-2>", credential, {
      deleteSnapshots: "include",
    });
    const batchResp = await blobBatchClient.submitBatch(batchRequest);
    console.log(batchResp.subResponsesSucceededCount);
  });

  it("BlobBatchClientSubmitBatchWithLease", async () => {
    const account = "<account>";
    const credential = new DefaultAzureCredential();
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      credential,
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobBatchClient = containerClient.getBlobBatchClient();
    const blobClient = containerClient.getBlobClient("<blob name>");
    // @ts-preserve-whitespace
    const batchRequest = new BlobBatch();
    await batchRequest.setBlobAccessTier(blobClient, "Cool");
    await batchRequest.setBlobAccessTier(blobClient, "Cool", {
      conditions: { leaseId: "<lease-id>" },
    });
    const batchResp = await blobBatchClient.submitBatch(batchRequest);
    console.log(batchResp.subResponsesSucceededCount);
  });

  it("BlobServiceClientGetContainerClient", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    // @ts-ignore
    const containerClient = blobServiceClient.getContainerClient("<container name>");
  });

  it("BlobServiceClientFindBlobsByTags", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    // Use for await to iterate the blobs
    let i = 1;
    for await (const blob of blobServiceClient.findBlobsByTags("tagkey='tagvalue'")) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
    // @ts-preserve-whitespace
    // Use iter.next() to iterate the blobs
    i = 1;
    const iter = blobServiceClient.findBlobsByTags("tagkey='tagvalue'");
    let { value, done } = await iter.next();
    while (!done) {
      console.log(`Blob ${i++}: ${value.name}`);
      ({ value, done } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Use byPage() to iterate the blobs
    i = 1;
    for await (const page of blobServiceClient
      .findBlobsByTags("tagkey='tagvalue'")
      .byPage({ maxPageSize: 20 })) {
      for (const blob of page.blobs) {
        console.log(`Blob ${i++}: ${blob.name}`);
      }
    }
    // @ts-preserve-whitespace
    // Use paging with a marker
    i = 1;
    let iterator = blobServiceClient
      .findBlobsByTags("tagkey='tagvalue'")
      .byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // Prints 2 blob names
    if (response.blobs) {
      for (const blob of response.blobs) {
        console.log(`Blob ${i++}: ${blob.name}`);
      }
    }
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    iterator = blobServiceClient
      .findBlobsByTags("tagkey='tagvalue'")
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // @ts-preserve-whitespace
    // Prints blob names
    if (response.blobs) {
      for (const blob of response.blobs) {
        console.log(`Blob ${i++}: ${blob.name}`);
      }
    }
  });

  it("BlobServiceClientListContainers", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    // Use for await to iterate the containers
    let i = 1;
    for await (const container of blobServiceClient.listContainers()) {
      console.log(`Container ${i++}: ${container.name}`);
    }
    // @ts-preserve-whitespace
    // Use iter.next() to iterate the containers
    i = 1;
    const iter = blobServiceClient.listContainers();
    let { value, done } = await iter.next();
    while (!done) {
      console.log(`Container ${i++}: ${value.name}`);
      ({ value, done } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Use byPage() to iterate the containers
    i = 1;
    for await (const page of blobServiceClient.listContainers().byPage({ maxPageSize: 20 })) {
      for (const container of page.containerItems) {
        console.log(`Container ${i++}: ${container.name}`);
      }
    }
    // @ts-preserve-whitespace
    // Use paging with a marker
    i = 1;
    let iterator = blobServiceClient.listContainers().byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // @ts-preserve-whitespace
    // Prints 2 container names
    if (response.containerItems) {
      for (const container of response.containerItems) {
        console.log(`Container ${i++}: ${container.name}`);
      }
    }
    // @ts-preserve-whitespace
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    iterator = blobServiceClient
      .listContainers()
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // @ts-preserve-whitespace
    // Prints 10 container names
    if (response.containerItems) {
      for (const container of response.containerItems) {
        console.log(`Container ${i++}: ${container.name}`);
      }
    }
  });

  it("ClientsBeginCopyFromURL", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const blobName = "<blob name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    // @ts-preserve-whitespace
    // Example using automatic polling
    const automaticCopyPoller = await blobClient.beginCopyFromURL("url");
    // @ts-ignore
    const automaticResult = await automaticCopyPoller.pollUntilDone();
    // @ts-preserve-whitespace
    // Example using manual polling
    const manualCopyPoller = await blobClient.beginCopyFromURL("url");
    while (!manualCopyPoller.isDone()) {
      await manualCopyPoller.poll();
    }
    // @ts-ignore
    const manualResult = manualCopyPoller.getResult();
    // @ts-preserve-whitespace
    // Example using progress updates
    const progressUpdatesCopyPoller = await blobClient.beginCopyFromURL("url", {
      onProgress(state) {
        console.log(`Progress: ${state.copyProgress}`);
      },
    });
    // @ts-ignore
    const progressUpdatesResult = await progressUpdatesCopyPoller.pollUntilDone();
    // @ts-preserve-whitespace
    // Example using a changing polling interval (default 15 seconds)
    const pollingIntervalCopyPoller = await blobClient.beginCopyFromURL("url", {
      intervalInMs: 1000, // poll blob every 1 second for copy progress
    });
    // @ts-ignore
    const pollingIntervalResult = await pollingIntervalCopyPoller.pollUntilDone();
    // @ts-preserve-whitespace
    // Example using copy cancellation:
    const cancelCopyPoller = await blobClient.beginCopyFromURL("url");
    // cancel operation after starting it.
    try {
      await cancelCopyPoller.cancelOperation();
      // calls to get the result now throw PollerCancelledError
      cancelCopyPoller.getResult();
    } catch (err: any) {
      if (err.name === "PollerCancelledError") {
        console.log("The copy was cancelled.");
      }
    }
  });

  it("ClientsCreateAppendBlob", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const blobName = "<blob name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // @ts-preserve-whitespace
    const appendBlobClient = containerClient.getAppendBlobClient(blobName);
    await appendBlobClient.create();
  });

  it("ClientsUpload", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const blobName = "<blob name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // @ts-preserve-whitespace
    const content = "Hello world!";
    // @ts-ignore
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  });

  it("ClientsAppendBlock", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const blobName = "<blob name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // @ts-preserve-whitespace
    const content = "Hello World!";
    // @ts-preserve-whitespace
    // Create a new append blob and append data to the blob.
    const newAppendBlobClient = containerClient.getAppendBlobClient(blobName);
    await newAppendBlobClient.create();
    await newAppendBlobClient.appendBlock(content, content.length);
    // @ts-preserve-whitespace
    // Append data to an existing append blob.
    const existingAppendBlobClient = containerClient.getAppendBlobClient(blobName);
    await existingAppendBlobClient.appendBlock(content, content.length);
  });

  it("ClientsQuery", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const blobName = "<blob name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // @ts-preserve-whitespace
    // Query and convert a blob to a string
    const queryBlockBlobResponse = await blockBlobClient.query("select from BlobStorage");
    if (queryBlockBlobResponse.readableStreamBody) {
      const downloadedBuffer = await streamToBuffer(queryBlockBlobResponse.readableStreamBody);
      const downloaded = downloadedBuffer.toString();
      console.log(`Query blob content: ${downloaded}`);
    }
    // @ts-preserve-whitespace
    async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        readableStream.on("data", (data) => {
          chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
          resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
      });
    }
  });

  it("ClientsListPageBlobs", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const blobName = "<blob name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const pageBlobClient = containerClient.getPageBlobClient(blobName);
    // @ts-preserve-whitespace
    // Example using `for await` syntax
    let i = 1;
    for await (const pageRange of pageBlobClient.listPageRanges()) {
      console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
    }
    // @ts-preserve-whitespace
    // Example using `iter.next()` syntax
    i = 1;
    const iter = pageBlobClient.listPageRanges();
    let { value, done } = await iter.next();
    while (!done) {
      console.log(`Page range ${i++}: ${value.start} - ${value.end}`);
      ({ value, done } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Example using `byPage()` syntax
    i = 1;
    for await (const page of pageBlobClient.listPageRanges().byPage({ maxPageSize: 20 })) {
      for (const pageRange of page.pageRange || []) {
        console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
      }
    }
    // @ts-preserve-whitespace
    // Example using paging with a marker
    i = 1;
    let iterator = pageBlobClient.listPageRanges().byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // Prints 2 page ranges
    if (response.pageRange) {
      for (const pageRange of response.pageRange) {
        console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
      }
    }
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    iterator = pageBlobClient
      .listPageRanges()
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // Prints 10 page ranges
    if (response.pageRange) {
      for (const pageRange of response.pageRange) {
        console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
      }
    }
  });

  it("ClientsListPageBlobsDiff", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const blobName = "<blob name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const pageBlobClient = containerClient.getPageBlobClient(blobName);
    // @ts-preserve-whitespace
    const offset = 0;
    const count = 1024;
    const previousSnapshot = "<previous snapshot>";
    // Example using `for await` syntax
    let i = 1;
    for await (const pageRange of pageBlobClient.listPageRangesDiff(
      offset,
      count,
      previousSnapshot,
    )) {
      console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
    }
    // @ts-preserve-whitespace
    // Example using `iter.next()` syntax
    i = 1;
    const iter = pageBlobClient.listPageRangesDiff(offset, count, previousSnapshot);
    let { value, done } = await iter.next();
    while (!done) {
      console.log(`Page range ${i++}: ${value.start} - ${value.end}`);
      ({ value, done } = await iter.next());
    }
    // @ts-preserve-whitespace
    // Example using `byPage()` syntax
    i = 1;
    for await (const page of pageBlobClient
      .listPageRangesDiff(offset, count, previousSnapshot)
      .byPage({ maxPageSize: 20 })) {
      for (const pageRange of page.pageRange || []) {
        console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
      }
    }
    // @ts-preserve-whitespace
    // Example using paging with a marker
    i = 1;
    let iterator = pageBlobClient
      .listPageRangesDiff(offset, count, previousSnapshot)
      .byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // Prints 2 page ranges
    if (response.pageRange) {
      for (const pageRange of response.pageRange) {
        console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
      }
    }
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    iterator = pageBlobClient
      .listPageRangesDiff(offset, count, previousSnapshot)
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // Prints 10 page ranges
    if (response.pageRange) {
      for (const pageRange of response.pageRange) {
        console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
      }
    }
  });

  it("ContainerClientCreate", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();
    console.log("Container was created successfully", createContainerResponse.requestId);
  });

  it("GenerateBlobSASQueryParameters", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const containerName = "<container name>";
    // @ts-preserve-whitespace
    // Generate service level SAS for a container
    // @ts-ignore
    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName, // Required
        permissions: ContainerSASPermissions.parse("racwdl"), // Required
        startsOn: new Date(), // Optional
        expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // Required. Date type
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
        protocol: SASProtocol.HttpsAndHttp, // Optional
        version: "2016-05-31", // Optional
      },
      sharedKeyCredential,
    ).toString();
  });

  it("GenerateBlobSASQueryParametersWithIdentifier", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential,
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // @ts-preserve-whitespace
    // Generate service level SAS for a container with identifier
    // startsOn & permissions are optional when identifier is provided
    const identifier = "unique-id";
    await containerClient.setAccessPolicy(undefined, [
      {
        accessPolicy: {
          expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // Date type
          permissions: ContainerSASPermissions.parse("racwdl").toString(),
          startsOn: new Date(), // Date type
        },
        id: identifier,
      },
    ]);
    // @ts-preserve-whitespace
    // @ts-ignore
    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName, // Required
        identifier, // Required
      },
      sharedKeyCredential,
    ).toString();
  });

  it("GenerateBlobSASQueryParametersWithBlobName", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const blobName = "<blob name>";
    // @ts-preserve-whitespace
    // Generate service level SAS for a blob
    // @ts-ignore
    const blobSAS = generateBlobSASQueryParameters(
      {
        containerName, // Required
        blobName, // Required
        permissions: BlobSASPermissions.parse("racwd"), // Required
        startsOn: new Date(), // Optional
        expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // Required. Date type
        cacheControl: "cache-control-override", // Optional
        contentDisposition: "content-disposition-override", // Optional
        contentEncoding: "content-encoding-override", // Optional
        contentLanguage: "content-language-override", // Optional
        contentType: "content-type-override", // Optional
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
        protocol: SASProtocol.HttpsAndHttp, // Optional
        version: "2016-05-31", // Optional
      },
      sharedKeyCredential,
    ).toString();
  });

  it("GenerateBlobSASQueryParametersWithUserDelegationKey", async () => {
    const account = "<account>";
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const containerName = "<container name>";
    const accountName = "<account name>";
    const startsOn = new Date();
    const expiresOn = new Date(new Date().valueOf() + 86400 * 1000);
    // @ts-preserve-whitespace
    // Generate user delegation SAS for a container
    const userDelegationKey = await blobServiceClient.getUserDelegationKey(startsOn, expiresOn);
    // @ts-ignore
    const containerSAS = generateBlobSASQueryParameters(
      {
        containerName, // Required
        permissions: ContainerSASPermissions.parse("racwdl"), // Required
        startsOn, // Optional. Date type
        expiresOn, // Required. Date type
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
        protocol: SASProtocol.HttpsAndHttp, // Optional
        version: "2018-11-09", // Must greater than or equal to 2018-11-09 to generate user delegation SAS
      },
      userDelegationKey, // UserDelegationKey
      accountName, // Required
    ).toString();
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
