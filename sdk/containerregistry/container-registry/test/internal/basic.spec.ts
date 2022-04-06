// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Chai is the Azure SDK Team's preferred assertion library, and it is included
// as part of our template project.
import { ContainerRegistryClient, KnownContainerRegistryAudience } from "../../src";
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
      } catch (e) {
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
      } catch (e) {
        assert.equal((e as Error).message, "invalid tag");
      }
    });

    it("getTagProperties should throw for invalid tag", async function () {
      try {
        await artifact.getTagProperties(value as any);
        assert.fail("should have thrown already");
      } catch (e) {
        assert.equal((e as Error).message, "invalid tag");
      }
    });

    it("updateTagProperties should throw for invalid tag", async function () {
      try {
        await artifact.updateTagProperties(value as any, {});
        assert.fail("should have thrown already");
      } catch (e) {
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
