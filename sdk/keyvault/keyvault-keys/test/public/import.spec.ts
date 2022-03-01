// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { Context } from "mocha";
import { env, Recorder } from "@azure-tools/test-recorder";

import { KeyClient } from "../../src";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { getServiceVersion } from "./utils/common";
import { createRsaKey } from "./utils/crypto";

describe("Keys client - import keys", () => {
  const prefix = `import${env.CERTIFICATE_NAME || "KeyName"}`;
  let suffix: string;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const authentication = await authenticate(this, getServiceVersion());
    suffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can import a key", async function (this: Context) {
    const jsonWebKey = createRsaKey();
    const keyName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const key = await client.importKey(keyName, jsonWebKey);
    assert.equal(key.key!.e!.toString(), jsonWebKey.e!.toString());
  });
});
