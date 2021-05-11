// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import * as dotenv from "dotenv";

import { ContainerRegistryClient } from "../../src";

import { delay, env, record, Recorder } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-util";
import { createRegistryClient, recorderEnvSetup } from "./utils";

if (isNode) {
  dotenv.config();
}

describe("ContainerRegistryClient tests", function() {
  // Declare the client and recorder instances.  We will set them using the
  // beforeEach hook.
  let client: ContainerRegistryClient;
  let recorder: Recorder;
  const repositoryName = "library/busybox";

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
    client = createRegistryClient(env.CONTAINERREGISTRY_REGISTRY_ENDPOINT);
  });

  // After each test, we need to stop the recording.
  afterEach(async function() {
    await recorder.stop();
  });

  it("should list repositories", async () => {
    const iter = client.listRepositoryNames();
    const first = await iter.next();
    assert.ok(first.value, "Expecting a valid repository");
  });

  it("deletes repository of given name", async () => {
    const response = await client.deleteRepository(repositoryName);
    assert.ok(response);
    await delay(5 * 1000);
    const iter = client.listRepositoryNames();
    for await (const repository of iter) {
      if (repository === repositoryName) {
        assert.fail(`Unexpected: '${repositoryName}' repository should have been deleted`);
      }
    }
  });
});
