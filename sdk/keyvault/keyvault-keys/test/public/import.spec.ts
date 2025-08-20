// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Recorder, env } from "@azure-tools/test-recorder";

import type { KeyClient } from "@azure/keyvault-keys";
import { authenticate, envSetupForPlayback } from "./utils/testAuthentication.js";
import type TestClient from "./utils/testClient.js";
import { createRsaKey } from "./utils/crypto.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Keys client - import keys", () => {
  const prefix = `import${env.CERTIFICATE_NAME || "KeyName"}`;
  let suffix: string;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    await recorder.start(envSetupForPlayback);
    const authentication = await authenticate(recorder);
    suffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can import a key", async function (ctx) {
    const jsonWebKey = createRsaKey();
    const keyName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const key = await client.importKey(keyName, jsonWebKey);
    assert.equal(key.key!.e!.toString(), jsonWebKey.e!.toString());
  });
});
