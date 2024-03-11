// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";
import createPersonalizerClient, { PersonalizerClient, isUnexpected } from "../../src";

describe("AAD Tests", () => {
  let recorder: Recorder;
  let client: PersonalizerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createPersonalizerClient(
      env["PERSONALIZER_ENDPOINT_SINGLE_SLOT"] ?? "",
      createTestCredential(),
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("get configuration using aad authentication test", async function () {
    const response = await client.path("/configurations/service").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
  });
});
