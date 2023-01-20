// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uploads and downloads a blob to and from the repository.
 */

import {
  ContainerRegistryBlobClient,
  KnownContainerRegistryAudience,
} from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();

const BLOB_CONTENT = Buffer.from("Hello world!");

async function main() {
  // endpoint should be in the form of "https://myregistryname.azurecr.io"
  // where "myregistryname" is the actual name of your registry
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  const repository = process.env.CONTAINER_REGISTRY_REPOSITORY || "library/hello-world";
  const client = new ContainerRegistryBlobClient(
    endpoint,
    repository,
    new DefaultAzureCredential(),
    {
      audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
    }
  );

  // uploadBlob takes in a "resettable stream": a factory function that returns a new stream each time.
  // It can also take in a plain ReadableStream, but this will cause the entire stream to be loaded
  // into memory for the computation of the digest. Passing a factory function removes this limitation.
  const uploadResult = await client.uploadBlob(() => Readable.from(BLOB_CONTENT));

  // Calling downloadBlob on the uploaded blob (identified by the digest) gives a readable stream containing the blob's content.
  const downloadResult = await client.downloadBlob(uploadResult.digest);

  // The downloaded content can be piped to another stream, e.g. one created using fs.createWriteStream to download to a file.
  // In this example, we pipe the content to the standard output stream.
  downloadResult.content.pipe(process.stdout);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
