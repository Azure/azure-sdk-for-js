// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uploads an image to the repository.
 * @azsdk-weight 3
 */

import { ContainerRegistryBlobClient, OciImageManifest } from "@azure/container-registry";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();

async function main() {
  // endpoint should be in the form of "https://myregistryname.azurecr.io"
  // where "myregistryname" is the actual name of your registry
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  const repository = process.env.CONTAINER_REGISTRY_REPOSITORY || "library/hello-world";
  const client = new ContainerRegistryBlobClient(
    endpoint,
    repository,
    new DefaultAzureCredential()
  );

  const config = Buffer.from("Sample config");
  const uploadConfigResult = await client.uploadBlob(Readable.from(config));

  const layer = Buffer.from("Sample layer");
  const uploadLayerResult = await client.uploadBlob(Readable.from(layer));

  const manifest: OciImageManifest = {
    schemaVersion: 2,
    config: {
      digest: uploadConfigResult.digest,
      sizeInBytes: config.byteLength,
      mediaType: "application/vnd.oci.image.config.v1+json",
    },
    layers: [
      {
        digest: uploadLayerResult.digest,
        sizeInBytes: layer.byteLength,
        mediaType: "application/vnd.oci.image.layer.v1.tar",
      },
    ],
  };

  await client.uploadManifest(manifest, { tag: "demo" });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
