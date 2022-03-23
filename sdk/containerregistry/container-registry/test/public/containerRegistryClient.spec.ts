// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { ContainerRegistryClient } from "../../src";

import { versionsToTest } from "@azure/test-utils";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRegistryClient, recorderStartOptions, serviceVersions } from "../utils/utils";

versionsToTest(serviceVersions, {}, (serviceVersion, onVersions): void => {
  onVersions({ minVer: "2021-07-01" }).describe("ContainerRegistryClient tests", function () {
    // Declare the client and recorder instances.  We will set them using the
    // beforeEach hook.
    let client: ContainerRegistryClient;
    let recorder: Recorder;
    const repositoryName = "library/busybox";

    // NOTE: use of "function" and not ES6 arrow-style functions with the
    // beforeEach hook is IMPORTANT due to the use of `this` in the function
    // body.
    beforeEach(async function (this: Context) {
      // The recorder has some convenience methods, and we need to store a
      // reference to it so that we can `stop()` the recorder later in the
      // `afterEach` hook.
      recorder = new Recorder(this.currentTest);

      await recorder.start(recorderStartOptions);

      // We'll be able to refer to the instantiated `client` in tests, since we
      // initialize it before each test
      client = createRegistryClient(
        assertEnvironmentVariable("CONTAINER_REGISTRY_ENDPOINT"),
        serviceVersion,
        recorder
      );
    });

    // After each test, we need to stop the recording.
    afterEach(async function () {
      await recorder.stop();
    });

    it("should list repositories", async () => {
      const iter = client.listRepositoryNames();
      const first = await iter.next();
      assert.ok(first.value, "Expecting a valid repository");
    });

    it("should list repositories by pages", async () => {
      const iterator = client.listRepositoryNames().byPage({ maxPageSize: 1 });
      let result = await iterator.next();
      assert.equal(result.value.length, 1, "Expecting one tag in first page");
      result = await iterator.next();
      assert.equal(result.value.length, 1, "Expecting one tag in second page");
    });

    it("should list repositories by pages with continuationToken", async () => {
      const continuationToken = "/acr/v1/_catalog?last=busybox&n=1&orderby=";
      const iterator = client.listRepositoryNames().byPage({ continuationToken });
      const result = await iterator.next();
      assert.equal(result.value.length, 1, "Expecting one tag in first page");
    });

    it("deletes repository of given name", async () => {
      await client.deleteRepository(repositoryName);
      const iter = client.listRepositoryNames();
      for await (const repository of iter) {
        if (repository === repositoryName) {
          assert.fail(`Unexpected: '${repositoryName}' repository should have been deleted`);
        }
      }
    });
  });
});
