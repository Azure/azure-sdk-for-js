// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PhoneNumbersClient } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe.each([true, false])(`PhoneNumbersClient - offerings lists (AAD = %s)`, (useAad) => {
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = useAad
      ? await createRecordedClientWithToken(ctx)!
      : await createRecordedClient(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can list available offerings", { timeout: 60000 }, async () => {
    const responseOfferings = [];
    for await (const offering of client.listAvailableOfferings("US")) {
      responseOfferings.push(offering);
    }
    assert.isNotEmpty(responseOfferings);
  });
});
