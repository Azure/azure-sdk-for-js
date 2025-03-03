// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_DefaultAzureCredential", async () => {
    // Enter your storage account name
    const account = "<account>";
    const defaultAzureCredential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      defaultAzureCredential,
    );
  });

  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connStr = "<connection string>";
    // @ts-preserve-whitespace
    const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
  });

  it("ReadmeSampleCreateClient_StorageSharedKeyCredential", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    // @ts-preserve-whitespace
    // Use StorageSharedKeyCredential with storage account and account key
    // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential,
    );
  });

  it("ReadmeSampleCreateClient_SASToken", async () => {
    const account = "<account name>";
    const sas = "<service Shared Access Signature Token>";
    // @ts-preserve-whitespace
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

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
