// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import * as dotenv from "dotenv";
import { ContainerRegistryClient, ContainerRepository } from "../../src";
import { env, record, Recorder } from "@azure-tools/test-recorder";
import { RestError } from "@azure/core-rest-pipeline";
import { isNode } from "../utils/isNode";
import { createRegistryClient, recorderEnvSetup } from "../utils/utils";

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
    const iter = repository.listManifestProperties();
    const first = await iter.next();
    assert.ok(first.value, "Expecting a valid manifest");
  });

  let artifactDigest: string;
  it("should list registry manifests by pages", async () => {
    const iterator = repository.listManifestProperties().byPage({ maxPageSize: 1 });
    let result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one artifact in first page");
    if (!result.done) {
      assert.ok(result.value[0].digest!, "Expecting valid digest for the artifact");
      artifactDigest = result.value[0].digest!;
    }
    result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one artifact in second page");
  });

  it("should list registry manifests by pages with continuationToken", async () => {
    const continuationToken =
      "/acr/v1/library%2Fhello-world/_manifests?last=sha256%3A1b26826f602946860c279fce658f31050cff2c596583af237d971f4629b57792&n=1&orderby=";
    const iterator = repository.listManifestProperties().byPage({ continuationToken });
    const result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one artifact in first page");
    if (!result.done) {
      assert.ok(result.value[0].digest!, "Expecting valid digest for the artifact");
      artifactDigest = result.value[0].digest!;
    }
  });

  it("should list tags", async () => {
    const artifact = repository.getArtifact(artifactDigest);
    const iter = artifact.listTagProperties();
    const first = await iter.next();
    assert.ok(first.value, "Expecting a valid tag");
  });

  it("should list tags by pages", async () => {
    const artifact = repository.getArtifact(artifactDigest);
    const iterator = artifact.listTagProperties().byPage({ maxPageSize: 1 });
    let result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one tag in first page");
    result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one tag in second page");
  });

  it("should list tags by pages with continuationToken", async () => {
    const continuationToken = "/acr/v1/library%2Fhello-world/_tags?last=test-delete&n=1&orderby=";
    const artifact = repository.getArtifact(artifactDigest);
    const iterator = artifact.listTagProperties().byPage({ continuationToken });
    const result = await iterator.next();
    assert.equal(result.value.length, 1, "Expecting one tag in first page");
  });

  it("sets manifest properties", async () => {
    const artifact = repository.getArtifact(artifactDigest);
    assert.isTrue(artifact.fullyQualifiedReference.endsWith(`${repositoryName}@${artifactDigest}`));
    const original = await artifact.getManifestProperties();

    try {
      const updated = await artifact.updateManifestProperties({
        canDelete: false,
        canList: false,
        canRead: false,
        canWrite: false
      });

      assert.strictEqual(updated.canDelete, false);
      assert.strictEqual(updated.canList, false);
      assert.strictEqual(updated.canRead, false);
      assert.strictEqual(updated.canWrite, false);
    } finally {
      await artifact.updateManifestProperties(original);
    }
  });

  it("sets repository properties", async () => {
    const repositoryProperties = await repository.getProperties();
    assert.ok(repositoryProperties.registryLoginServer, "Expecting valid 'registryLoginServer'");
    const original = repositoryProperties;
    try {
      const updated = await repository.updateProperties({
        canDelete: false,
        canList: false,
        canRead: false,
        canWrite: false
        // teleportEnabled: true
      });

      assert.strictEqual(updated.canDelete, false);
      assert.strictEqual(updated.canList, false);
      assert.strictEqual(updated.canRead, false);
      assert.strictEqual(updated.canWrite, false);
      // assert.strictEqual(updated.teleportEnabled, true);
    } finally {
      await repository.updateProperties(original);
    }
  });

  it("should retrive tag properties", async () => {
    const artifact = repository.getArtifact(artifactDigest);
    const properties = await artifact.getTagProperties("test1");
    assert.equal(properties.name, "test1");
    assert.ok(properties.registryLoginServer, "Expecting valid 'registryLoginServer'");
  });

  it("should retrive registry artifact properties for a tag", async () => {
    const artifact = repository.getArtifact("test1");
    assert.isTrue(artifact.fullyQualifiedReference.endsWith(`${repositoryName}:test1`));
    const properties = await artifact.getManifestProperties();
    assert.ok(properties.createdOn, "Expecting valid createdOn property for the artifact");
    assert.ok(properties.relatedArtifacts?.length, "Expecting valid registry artifacts");
    assert.ok(properties.relatedArtifacts![0].architecture, "Expecting valid architecture");
    assert.ok(properties.registryLoginServer, "Expecting valid 'registryLoginServer'");
  });

  it("should retrive registry artifact properties for a digest", async () => {
    const artifact = repository.getArtifact(artifactDigest);
    const properties = await artifact.getManifestProperties();
    assert.ok(properties.createdOn, "Expecting valid createdOn property for the artifact");
  });

  it("sets tag properties", async () => {
    const tag = "test1";
    const artifact = repository.getArtifact(tag);
    const original = await artifact.getTagProperties(tag);

    try {
      const updated = await artifact.updateTagProperties(tag, {
        canDelete: false,
        canList: false,
        canRead: false,
        canWrite: false
      });

      assert.strictEqual(updated.canDelete, false);
      assert.strictEqual(updated.canList, false);
      assert.strictEqual(updated.canRead, false);
      assert.strictEqual(updated.canWrite, false);
    } finally {
      await artifact.updateTagProperties(tag, original);
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
