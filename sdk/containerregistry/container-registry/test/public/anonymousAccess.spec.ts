// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import * as dotenv from "dotenv";

import { ContainerRegistryClient } from "../../src";

import { versionsToTest } from "@azure/test-utils";
import { env, record, Recorder } from "@azure-tools/test-recorder";
import { isNode } from "../utils/isNode";
import { createRegistryClient, recorderEnvSetup, serviceVersions } from "../utils/utils";

if (isNode) {
  dotenv.config();
}

versionsToTest(serviceVersions, {}, (serviceVersion, onVersions) => {
  onVersions({ minVer: "2021-07-01" }).describe("Anonymous access tests", function() {
    // Declare the client and recorder instances.  We will set them using the
    // beforeEach hook.
    let client: ContainerRegistryClient;
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

      // We'll be able to refer to the instantiated `client` in tests, since we
      // initialize it before each test
      client = createRegistryClient(env.CONTAINER_REGISTRY_ANONYMOUS_ENDPOINT, serviceVersion, {
        anonymous: true
      });
    });

    // After each test, we need to stop the recording.
    afterEach(async function() {
      await recorder.stop();
    });

    it("should list repositories with anonymous access", async () => {
      const iter = client.listRepositoryNames();
      const results: string[] = [];
      for await (const name of iter) {
        results.push(name);
      }
      assert.isTrue(
        results.indexOf(repositoryName) !== -1,
        `Expecting '${repositoryName}' in the list`
      );
    });

    it("should throw error setting properties with anonymous access", async () => {
      try {
        const repository = client.getRepository(repositoryName);
        await repository.updateProperties({
          canDelete: false
        });
        assert.fail("should have thrown already");
      } catch (e) {
        assert.strictEqual((e as any).statusCode, 401);
        assert.strictEqual((e as any).details.errors[0].code, "UNAUTHORIZED");
      }
    });
  });
});
