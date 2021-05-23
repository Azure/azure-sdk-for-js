// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import * as dotenv from "dotenv";
import { ContainerRegistryClient, ContainerRepository } from "../../src";
import { env, record, Recorder } from "@azure/test-utils-recorder";
import { RestError } from "@azure/core-rest-pipeline";
import { isNode } from "@azure/core-util";
import { createRegistryClient, recorderEnvSetup } from "./utils";

if (isNode) {
  dotenv.config();
}

describe("Repository and artifact tests", function() {
  // Declare the client and recorder instances.  We will set them using the
  // beforeEach hook.
  let registryClient: ContainerRegistryClient;
  let repository: ContainerRepository;
  let recorder: Recorder;
  const repositoryName = "library/hello-world";
  // NOTE: use of "function" and not ES6 arrow-style functions with the
  // beforeEach hook is IMPORTANT due to the use of `this` in the function
  // body.
  beforeEach(async function(this: Context) {
    // The recorder has some convenience methods, and we need to store a
    // reference to it so that we can `stop()` the recorder later in the
    // `afterEach` hook.
    recorder = record(this, recorderEnvSetup);

    registryClient = createRegistryClient(env.CONTAINER_REGISTRY_ENDPOINT);
    repository = registryClient.getRepository(repositoryName);
  });

  // After each test, we need to stop the recording.
  afterEach(async function() {
    await recorder.stop();
  });

  it("should list registry manifests", async () => {
    const iter = repository.listManifests();
    const first = await iter.next();
    assert.ok(first.value, "Expecting a valid manifest");
  });

  let artifactDigest: string;
  it("should list registry manifests by pages", async () => {
    const iterator = repository.listManifests().byPage({ maxPageSize: 1 });
    let result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one artifact in first page");
    if (!result.done) {
      assert.ok(result.value[0].digest!, "Expecting valid digest for the artifact");
      artifactDigest = result.value[0].digest!;
    }
    result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one artifact in second page");
  });

  it("should list tags", async () => {
    const artifact = repository.getArtifact(artifactDigest);
    const iter = artifact.listTags();
    const first = await iter.next();
    assert.ok(first.value, "Expecting a valid tag");
  });

  it("should list tags by pages", async () => {
    const artifact = repository.getArtifact(artifactDigest);
    const iterator = artifact.listTags().byPage({ maxPageSize: 1 });
    let result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one tag in first page");
    result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one tag in second page");
  });

  it("sets manifest properties", async () => {
    const artifact = repository.getArtifact(artifactDigest);
    const artifactProperties = await artifact.getManifestProperties();
    assert.ok(
      artifactProperties.writeableProperties,
      "Expect valid artifactProperties.writeableProperties"
    );
    const original = artifactProperties.writeableProperties!;

    try {
      const updated = await artifact.setManifestProperties({
        canDelete: false,
        canList: false,
        canRead: false,
        canWrite: false
      });

      assert.deepStrictEqual(updated.writeableProperties, {
        canDelete: false,
        canList: false,
        canRead: false,
        canWrite: false
      });
    } finally {
      await artifact.setManifestProperties(original);
    }
  });

  it("sets repository properties", async () => {
    const repositoryProperties = await repository.getProperties();
    const original = repositoryProperties.writeableProperties!;
    try {
      const updated = await repository.setProperties({
        canDelete: false,
        canList: false,
        canRead: false,
        canWrite: false
      });

      assert.deepStrictEqual(updated.writeableProperties, {
        canDelete: false,
        canList: false,
        canRead: false,
        canWrite: false
      });
    } finally {
      await repository.setProperties(original);
    }
  });

  it("should retrive tag properties", async () => {
    const artifact = repository.getArtifact(artifactDigest);
    const properties = await artifact.getTagProperties("test1");
    assert.equal(properties.name, "test1");
  });

  it("should retrive registry artifact properties for a tag", async () => {
    const artifact = repository.getArtifact("test1");
    const properties = await artifact.getManifestProperties();
    assert.ok(properties.createdOn, "Expecting valid createdOn property for the artifact");
    assert.ok(properties.manifests?.length, "Expecting valid registry artifacts");
    assert.ok(properties.manifests![0].architecture, "Expecting valid architecture");
  });

  it("should retrive registry artifact properties for a digest", async () => {
    const artifact = repository.getArtifact(artifactDigest);
    const properties = await artifact.getManifestProperties();
    assert.ok(properties.createdOn, "Expecting valid createdOn property for the artifact");
  });

  it("sets tag properties", async () => {
    const tag = "test1";
    const artifact = repository.getArtifact(tag);
    const tagProperties = await artifact.getTagProperties(tag);
    const original = tagProperties.writeableProperties!;

    try {
      const updated = await artifact.setTagProperties(tag, {
        canDelete: false,
        canList: false,
        canRead: false,
        canWrite: false
      });

      assert.deepStrictEqual(updated.writeableProperties, {
        canDelete: false,
        canList: false,
        canRead: false,
        canWrite: false
      });
    } finally {
      await artifact.setTagProperties(tag, original);
    }
  });

  it("deletes a given tag", async () => {
    const artifact = repository.getArtifact(artifactDigest);
    await artifact.deleteTag("test-delete");
    try {
      await artifact.getTagProperties("test-delete");
      assert.fail("Expecting an error but didn't get one.");
    } catch (err) {
      assert.isTrue((err as RestError).message.includes("TAG_UNKNOWN"));
    }
  });
});
