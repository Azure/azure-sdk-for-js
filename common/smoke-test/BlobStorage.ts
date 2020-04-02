// ------------------------------------
// Copyright(c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

const uuidv1 = require("uuid/v1");

export class BlobStorage {
  private static ContainerClient: ContainerClient;
  private static blobName: string;

  static async Run() {
    console.log(BlobStorage.dedent`
        ------------------------
        Storage - Blobs
        ------------------------
        1) Upload Blob
        2) Delete Blob (Clean up the resource)
        `);

    const storageConnectionString =
      process.env["AZURE_STORAGE_CONNECTION_STRING"] ||
      "<YourStorageAccountCONNECTIONSTRING>";

    const containerName = "mycontainer";
    BlobStorage.blobName = `JSNewBlob-${uuidv1()}.txt`;

    const serviceClient = BlobServiceClient.fromConnectionString(
      storageConnectionString
    );

    BlobStorage.ContainerClient = serviceClient.getContainerClient(
      containerName
    );

    //Ensure that the blob does not already existis
    try {
      await BlobStorage.CleanUp();
    } catch {}

    await BlobStorage.UploadBlob();
    await BlobStorage.CleanUp();
  }

  private static async UploadBlob() {
    //This will upload a new blob in an existing container.
    //If the container does not exist, it will create a new one.
    //If the blob already exists in the container, this will override it.
    console.log("Uploading blob...");
    const content = "This is the content for the sample blob";

    const blobClient = BlobStorage.ContainerClient.getBlobClient(
      BlobStorage.blobName
    );
    const blockBlobClient = blobClient.getBlockBlobClient();

    await blockBlobClient.upload(content, content.length);
    console.log("\tdone");
  }

  private static async CleanUp() {
    console.log("Deleting container and blobs (Cleaning up the resource)...");
    const blobClient = BlobStorage.ContainerClient.getBlobClient(
      BlobStorage.blobName
    );
    await blobClient.delete();
    console.log("\tdone");
  }

  private static dedent(str: ReadonlyArray<string>) {
    return str[0].replace(/^\ */gm, "");
  }
}
