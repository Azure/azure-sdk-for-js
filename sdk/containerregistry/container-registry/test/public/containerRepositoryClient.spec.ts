// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import * as dotenv from "dotenv";
import { ContainerRegistryClient, ContainerRepositoryClient } from "../../src";
import { delay, record, Recorder, isPlaybackMode } from "@azure/test-utils-recorder";
import { RestError } from "@azure/core-rest-pipeline";
import { isNode } from "@azure/core-util";
import { importImage } from "./importImages";
import { createRegistryClient, createRepositoryClient, recorderEnvSetup } from "./utils";

if (isNode) {
  dotenv.config();
}

describe("ContainerRepositoryClient functional tests", function() {
  // Declare the client and recorder instances.  We will set them using the
  // beforeEach hook.
  let registryClient: ContainerRegistryClient;
  let repositoryClient: ContainerRepositoryClient;
  let recorder: Recorder;
  const repository = "library/hello-world";
  // NOTE: use of "function" and not ES6 arrow-style functions with the
  // beforeEach hook is IMPORTANT due to the use of `this` in the function
  // body.
  beforeEach(async function(this: Context) {
    // The recorder has some convenience methods, and we need to store a
    // reference to it so that we can `stop()` the recorder later in the
    // `afterEach` hook.
    recorder = record(this, recorderEnvSetup);

    registryClient = createRegistryClient();
    repositoryClient = createRepositoryClient(repository);

    // ensure we have repository in the registry with two tags
    const iter = registryClient.listRepositories();
    const next = await iter.next();
    if (!next.value) {
      await importImage(repository, ["test1", "test-delete"]);
    }
  });

  // After each test, we need to stop the recording.
  afterEach(async function() {
    await recorder.stop();
  });

  after(async function() {
    // clean up
    if (!isPlaybackMode()) {
      await registryClient.deleteRepository(repository);
    }
  });

  it("should list tags", async () => {
    const client = registryClient.getRepositoryClient(repository);
    const iter = client.listTags();
    const first = await iter.next();
    assert.ok(first.value, "Expecting a valid tag");
  });

  it("should list tags by pages", async () => {
    const iterator = repositoryClient.listTags().byPage({ maxPageSize: 1 });
    let result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one tag in first page");
    result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one tag in second page");
  });

  it("should list registry artifacts", async () => {
    const iter = repositoryClient.listRegistryArtifacts();
    const first = await iter.next();
    assert.ok(first.value, "Expecting a valid artifact");
  });

  let artifactDigest: string;
  it("should list registry artifacts by pages", async () => {
    const iterator = repositoryClient.listRegistryArtifacts().byPage({ maxPageSize: 1 });
    let result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one artifact in first page");
    if (!result.done) {
      assert.ok(result.value[0].digest!, "Expecting valid digest for the artifact");
      artifactDigest = result.value[0].digest!;
    }
    result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one artifact in second page");
  });

  it("should retrive tag properties", async () => {
    const properties = await repositoryClient.getTagProperties("test1");
    assert.equal(properties.name, "test1");
  });

  it("should retrive registry artifact properties for a tag", async () => {
    const properties = await repositoryClient.getRegistryArtifactProperties("test1");
    assert.ok(properties.createdOn, "Expecting valid createdOn property for the artifact");
    assert.ok(properties.registryArtifacts?.length, "Expecting valid registry artifacts");
    assert.ok(properties.registryArtifacts![0].cpuArchitecture, "Expecting valid cpuArchitecture");
  });

  it("should retrive registry artifact properties for a digest", async () => {
    const properties = await repositoryClient.getRegistryArtifactProperties(artifactDigest);
    assert.ok(properties.createdOn, "Expecting valid createdOn property for the artifact");
  });

  it("deletes a given tag", async () => {
    await repositoryClient.deleteTag("test-delete");
    await delay(5 * 1000);
    try {
      await repositoryClient.getTagProperties("test-delete");
      assert.fail("Expecting an error but didn't get one.");
    } catch (err) {
      assert.isTrue((err as RestError).message.includes("TAG_UNKNOWN"));
    }
  });

  it("sets tag properties", async () => {
    const tag = "test1";
    const tagProperties = await repositoryClient.getTagProperties(tag);
    const original = tagProperties.writeableProperties!;

    try {
      const updated = await repositoryClient.setTagProperties(tag, {
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
      await repositoryClient.setTagProperties(tag, original);
    }
  });

  it("sets manifest properties", async () => {
    const tagProperties = await repositoryClient.getTagProperties("test1");
    const digest = tagProperties.digest!;
    const artifactProperties = await repositoryClient.getRegistryArtifactProperties(digest);
    const original = artifactProperties.writeableProperties!;

    try {
      const updated = await repositoryClient.setManifestProperties(digest, {
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
      await repositoryClient.setManifestProperties(digest, original);
    }
  });

  it("sets repository properties", async () => {
    const repositoryProperties = await repositoryClient.getProperties();
    const original = repositoryProperties.writeableProperties!;
    try {
      const updated = await repositoryClient.setProperties({
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
      await repositoryClient.setProperties(original);
    }
  });
});
