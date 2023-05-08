// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Chai is the Azure SDK Team's preferred assertion library, and it is included
// as part of our template project.
import {
  ContainerRegistryClient,
  KnownContainerRegistryAudience,
  isOciImageManifest,
} from "../../src";
import { assert } from "chai";
import { calculateDigest } from "../../src/utils/digest";
import { Readable } from "stream";
import { parseWWWAuthenticate } from "../../src/utils/wwwAuthenticateParser";
import { expect } from "@azure/test-utils";

describe("ContainerRegistryClient functional test", async function () {
  ["", null, undefined].forEach((value) => {
    it("constructor should throw for invalid endpoint", () => {
      assert.throws(() => {
        new ContainerRegistryClient(value as any);
      }, "invalid endpoint");
    });
  });

  ["", null, undefined].forEach((value) => {
    it("deleteRepository should throw for invalid repository name", async function () {
      const client = new ContainerRegistryClient("https://endpoint", {
        audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
      });
      try {
        await client.deleteRepository(value as any);
        assert.fail("should have thrown already");
      } catch (e: any) {
        assert.equal((e as Error).message, "invalid repositoryName");
      }
    });
  });

  ["", null, undefined].forEach((value) => {
    it("getRepository should throw for invalid endpoint", () => {
      const client = new ContainerRegistryClient("https://endpoint", {
        audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
      });
      assert.throws(() => {
        client.getRepository(value as any);
      }, "invalid repositoryName");
    });
  });

  ["", null, undefined].forEach((value) => {
    it("getArtifact should throw for invalid repository name", () => {
      const client = new ContainerRegistryClient("https://endpoint", {
        audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
      });
      assert.throws(() => {
        client.getArtifact(value as any, "digest");
      }, "invalid repositoryName");
    });

    it("getArtifact should throw for invalid tagOrDigest", () => {
      const client = new ContainerRegistryClient("https://endpoint", {
        audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
      });
      assert.throws(() => {
        client.getArtifact("repositoryName", value as any);
      }, "invalid tagOrDigest");
    });
  });
});

describe("ContainerRepository functional test", async function () {
  const client = new ContainerRegistryClient("https://endpoint", {
    audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
  });
  const repository = client.getRepository("repositoryName");
  ["", null, undefined].forEach((value) => {
    it("getArtifact should throw for invalid tagOrDigest", () => {
      assert.throws(() => {
        repository.getArtifact(value as any);
      }, "invalid tagOrDigest");
    });
  });
});

describe("RegistryArtifact functional test", async function () {
  const client = new ContainerRegistryClient("https://endpoint", {
    audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud,
  });
  const artifact = client.getArtifact("repositoryName", "digest");
  ["", null, undefined].forEach((value) => {
    it("deleteTag should throw for invalid tag", async function () {
      try {
        await artifact.deleteTag(value as any);
        assert.fail("should have thrown already");
      } catch (e: any) {
        assert.equal((e as Error).message, "invalid tag");
      }
    });

    it("getTagProperties should throw for invalid tag", async function () {
      try {
        await artifact.getTagProperties(value as any);
        assert.fail("should have thrown already");
      } catch (e: any) {
        assert.equal((e as Error).message, "invalid tag");
      }
    });

    it("updateTagProperties should throw for invalid tag", async function () {
      try {
        await artifact.updateTagProperties(value as any, {});
        assert.fail("should have thrown already");
      } catch (e: any) {
        assert.equal((e as Error).message, "invalid tag");
      }
    });
  });
});

describe("digest calculation helper", () => {
  it("should calculate the digest correctly from a buffer", async () => {
    const buf = Buffer.from("Hello world!", "utf8");
    const expectedChecksum = "c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7df31ad9e51a";

    assert.equal(await calculateDigest(buf), `sha256:${expectedChecksum}`);
  });

  it("should calculate the digest correctly from a stream", async () => {
    const buf = Buffer.from("Hello world!", "utf8");
    const stream = Readable.from(buf);
    const expectedChecksum = "c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7df31ad9e51a";

    assert.equal(await calculateDigest(stream), `sha256:${expectedChecksum}`);
  });
});

describe("WWW-Authenticate parser", () => {
  it("should extract properties correctly", () => {
    const token = `Bearer authorization="some_authorization", resource="https://some.url"`;
    expect(parseWWWAuthenticate(token)).to.deep.equal({
      authorization: "some_authorization",
      resource: "https://some.url",
    });
  });

  it("should extract properties correctly when a property value contains a comma", () => {
    const token = `Bearer realm="https://dummy.azurecr.io/oauth2/token",service="dummy.azurecr.io",scope="repository:dummyrepo:pull,push"`;
    expect(parseWWWAuthenticate(token)).to.deep.equal({
      realm: "https://dummy.azurecr.io/oauth2/token",
      service: "dummy.azurecr.io",
      scope: "repository:dummyrepo:pull,push",
    });
  });
});

describe("isOciImageManifest", function () {
  it("should return true for OCI image manifest", function () {
    const ociManifest = {
      schemaVersion: 2,
      mediaType: "application/vnd.oci.image.manifest.v1+json",
      config: {
        mediaType: "application/vnd.oci.image.config.v1+json",
        digest: "sha256:d25b42d3dbad5361ed2d909624d899e7254a822c9a632b582ebd3a44f9b0dbc8",
        size: 171,
      },
      layers: [
        {
          mediaType: "application/vnd.oci.image.layer.v1.tar",
          digest: "sha256:654b93f61054e4ce90ed203bb8d556a6200d5f906cf3eca0620738d6dc18cbed",
          size: 28,
          annotations: {
            "org.opencontainers.image.title": "artifact.txt",
          },
        },
      ],
    };

    assert.isTrue(isOciImageManifest(ociManifest));
  });

  it("should return true for OCI image manifest without mediaType", function () {
    const ociManifest = {
      schemaVersion: 2,
      config: {
        mediaType: "application/vnd.oci.image.config.v1+json",
        digest: "sha256:d25b42d3dbad5361ed2d909624d899e7254a822c9a632b582ebd3a44f9b0dbc8",
        size: 171,
      },
      layers: [
        {
          mediaType: "application/vnd.oci.image.layer.v1.tar",
          digest: "sha256:654b93f61054e4ce90ed203bb8d556a6200d5f906cf3eca0620738d6dc18cbed",
          size: 28,
          annotations: {
            "org.opencontainers.image.title": "artifact.txt",
          },
        },
      ],
    };

    assert.isTrue(isOciImageManifest(ociManifest));
  });

  it("should return false for Docker image manifest v2 schema 2", function () {
    const dockerManifest = {
      schemaVersion: 2,
      mediaType: "application/vnd.docker.distribution.manifest.v2+json",
      manifests: [
        {
          mediaType: "application/vnd.docker.distribution.manifest.v2+json",
          digest: "sha256:e692418e4cbaf90ca69d05a66403747baa33ee08806650b51fab815ad7fc331f",
          size: 7143,
          platform: {
            architecture: "ppc64le",
            os: "linux",
          },
        },
        {
          mediaType: "application/vnd.docker.distribution.manifest.v2+json",
          digest: "sha256:5b0bcabd1ed22e9fb1310cf6c2dec7cdef19f0ad69efa1f392e94a4333501270",
          size: 7682,
          platform: {
            architecture: "amd64",
            os: "linux",
            features: ["sse4"],
          },
        },
      ],
    };

    assert.isFalse(isOciImageManifest(dockerManifest));
  });
});
