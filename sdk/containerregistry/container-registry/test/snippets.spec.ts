// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ContainerRegistryClient,
  ContainerRegistryContentClient,
  KnownContainerRegistryAudience,
  KnownManifestMediaType,
  OciImageManifest,
} from "@azure/container-registry";
import { AzureAuthorityHosts, DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { createWriteStream, writeFileSync } from "node:fs";
import { isRestError } from "@azure/core-rest-pipeline";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    // Create a ContainerRegistryClient that will authenticate through Active Directory
    const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential(), {
      audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
    });
  });

  it("ReadmeSampleCreateClient_Anonymous", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    // Create a new ContainerRegistryClient for anonymous access
    const client = new ContainerRegistryClient(endpoint, {
      audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
    });
  });

  it("ReadmeSampleCreateClient_NationalCloud", async () => {
    const endpoint = "https://myregistryname.azurecr.cn";
    // Create a ContainerRegistryClient that will authenticate through AAD in the China national cloud
    const client = new ContainerRegistryClient(
      endpoint,
      new DefaultAzureCredential({ authorityHost: AzureAuthorityHosts.AzureChina }),
      {
        audience: KnownContainerRegistryAudience.AzureResourceManagerChina,
      },
    );
  });

  it("SampleReadmeListRepositories", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential(), {
      audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
    });
    // @ts-preserve-whitespace
    const iterator = client.listRepositoryNames();
    for await (const repository of iterator) {
      console.log(`  repository: ${repository}`);
    }
  });

  it("SampleReadmeListTagsAnonymous", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    // Create a new ContainerRegistryClient for anonymous access
    const client = new ContainerRegistryClient(endpoint, {
      audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
    });
    // @ts-preserve-whitespace
    // Obtain a RegistryArtifact object to get access to image operations
    const image = client.getArtifact("library/hello-world", "latest");
    // @ts-preserve-whitespace
    // List the set of tags on the hello_world image tagged as "latest"
    const tagIterator = image.listTagProperties();
    // @ts-preserve-whitespace
    // Iterate through the image's tags, listing the tagged alias for the image
    console.log(`${image.fullyQualifiedReference}  has the following aliases:`);
    for await (const tag of tagIterator) {
      console.log(`  ${tag.registryLoginServer}/${tag.repositoryName}:${tag.name}`);
    }
  });

  it("SampleReadmeSetArtifactProperties", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential(), {
      audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
    });
    // @ts-preserve-whitespace
    const image = client.getArtifact("library/hello-world", "v1");
    // @ts-preserve-whitespace
    // Set permissions on the image's "latest" tag
    await image.updateTagProperties("latest", { canWrite: false, canDelete: false });
  });

  it("SampleReadmeDeleteImages", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential(), {
      audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
    });
    // @ts-preserve-whitespace
    // Iterate through repositories
    const repositoryNames = client.listRepositoryNames();
    for await (const repositoryName of repositoryNames) {
      const repository = client.getRepository(repositoryName);
      // Obtain the images ordered from newest to oldest by passing the `order` option
      const imageManifests = repository.listManifestProperties({
        order: "LastUpdatedOnDescending",
      });
      const imagesToKeep = 3;
      let imageCount = 0;
      // Delete images older than the first three.
      for await (const manifest of imageManifests) {
        imageCount++;
        if (imageCount > imagesToKeep) {
          const image = repository.getArtifact(manifest.digest);
          console.log(`Deleting image with digest ${manifest.digest}`);
          console.log(`  Deleting the following tags from the image:`);
          for (const tagName of manifest.tags) {
            console.log(`    ${manifest.repositoryName}:${tagName}`);
            image.deleteTag(tagName);
          }
          await image.delete();
        }
      }
    }
  });

  it("SampleReadmeCreateContainerRegistryContentClient", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const repository = "library/hello-world";
    const client = new ContainerRegistryContentClient(
      endpoint,
      repository,
      new DefaultAzureCredential(),
    );
  });

  it("SampleReadmeUploadImages", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const repository = "library/hello-world";
    const client = new ContainerRegistryContentClient(
      endpoint,
      repository,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const config = Buffer.from("Sample config");
    const { digest: configDigest, sizeInBytes: configSize } = await client.uploadBlob(config);
    // @ts-preserve-whitespace
    const layer = Buffer.from("Sample layer");
    const { digest: layerDigest, sizeInBytes: layerSize } = await client.uploadBlob(layer);
    // @ts-preserve-whitespace
    const manifest = {
      schemaVersion: 2,
      config: {
        digest: configDigest,
        size: configSize,
        mediaType: "application/vnd.oci.image.config.v1+json",
      },
      layers: [
        {
          digest: layerDigest,
          size: layerSize,
          mediaType: "application/vnd.oci.image.layer.v1.tar",
        },
      ],
    };
    // @ts-preserve-whitespace
    await client.setManifest(manifest, { tag: "demo" });
  });

  it("SampleReadmeDownloadImages", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const repository = "library/hello-world";
    const client = new ContainerRegistryContentClient(
      endpoint,
      repository,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    // Download the manifest to obtain the list of files in the image based on the tag
    const result = await client.getManifest("demo");
    // @ts-preserve-whitespace
    if (result.mediaType !== KnownManifestMediaType.OciImageManifest) {
      throw new Error("Expected an OCI image manifest");
    }
    // @ts-preserve-whitespace
    const manifest = result.manifest as OciImageManifest;
    // @ts-preserve-whitespace
    // Manifests of all media types have a buffer containing their content; this can be written to a file.
    writeFileSync("manifest.json", result.content);
    // @ts-preserve-whitespace
    const configResult = await client.downloadBlob(manifest.config.digest);
    const configFile = createWriteStream("config.json");
    configResult.content.pipe(configFile);
    // @ts-preserve-whitespace
    const trimSha = (digest: string): string => {
      const index = digest.indexOf(":");
      return index === -1 ? digest : digest.substring(index);
    };
    // @ts-preserve-whitespace
    // Download and write out the layers
    for (const layer of manifest.layers) {
      const fileName = trimSha(layer.digest);
      const layerStream = createWriteStream(fileName);
      const downloadLayerResult = await client.downloadBlob(layer.digest);
      downloadLayerResult.content.pipe(layerStream);
    }
  });

  it("SampleReadmeDeleteManifest", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const repository = "library/hello-world";
    const client = new ContainerRegistryContentClient(
      endpoint,
      repository,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const downloadResult = await client.getManifest("latest");
    await client.deleteManifest(downloadResult.digest);
  });

  it("SampleReadmeDeleteBlob", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const repository = "library/hello-world";
    const client = new ContainerRegistryContentClient(
      endpoint,
      repository,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const downloadResult = await client.getManifest("latest");
    // @ts-preserve-whitespace
    if (downloadResult.mediaType !== KnownManifestMediaType.OciImageManifest) {
      throw new Error("Expected an OCI image manifest");
    }
    // @ts-preserve-whitespace
    for (const layer of (downloadResult.manifest as OciImageManifest).layers) {
      await client.deleteBlob(layer.digest);
    }
  });

  it("SampleReadmeErrorHandling", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const repository = "library/hello-world";
    const client = new ContainerRegistryContentClient(
      endpoint,
      repository,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const config = Buffer.from(`{"hello":"world"}`);

    try {
      const uploadResult = await client.uploadBlob(config);
      console.log(
        `Uploaded blob: digest - ${uploadResult.digest}, size - ${uploadResult.sizeInBytes}`,
      );
    } catch (e) {
      // isRestError is exported by @azure/core-rest-pipeline
      if (
        isRestError(e) &&
        e.statusCode === 404 &&
        (e.details as any).errors.some((error: any) => error.code === "BLOB_UPLOAD_INVALID")
      ) {
        // Retry upload
      } else {
        throw e;
      }
    }
  });

  it("ContainerRepositoryUpdateProperties", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const repositoryName = "library/hello-world";
    const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
    const repository = client.getRepository(repositoryName);
    // @ts-preserve-whitespace
    const updated = await repository.updateProperties({
      canDelete: false,
      canList: false,
      canRead: false,
      canWrite: false,
    });
  });

  it("ContainerRepositoryListManifestProperties", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const repositoryName = "library/hello-world";
    const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
    const repository = client.getRepository(repositoryName);
    // @ts-preserve-whitespace
    for await (const manifest of repository.listManifestProperties()) {
      console.log("manifest: ", manifest);
    }
  });

  it("RegistryArtifactUpdateManifestProperties", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const repositoryName = "library/hello-world";
    const artifactTagOrDigest = "latest";
    const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const artifact = client.getArtifact(repositoryName, artifactTagOrDigest);
    const updated = await artifact.updateManifestProperties({
      canDelete: false,
      canList: false,
      canRead: false,
      canWrite: false,
    });
  });

  it("RegistryArtifactUpdateTagProperties", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const repositoryName = "library/hello-world";
    const artifactTagOrDigest = "latest";
    const tag = "latest";
    const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const artifact = client.getArtifact(repositoryName, artifactTagOrDigest);
    const updated = await artifact.updateTagProperties(tag, {
      canDelete: false,
      canList: false,
      canRead: false,
      canWrite: false,
    });
  });

  it("RegistryArtifactListTagProperties", async () => {
    const endpoint = "https://myregistryname.azurecr.io";
    const repositoryName = "library/hello-world";
    const artifactTagOrDigest = "latest";
    const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const artifact = client.getArtifact(repositoryName, artifactTagOrDigest);
    for await (const tag of artifact.listTagProperties()) {
      console.log("tag: ", tag);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
