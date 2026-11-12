// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { delay } from "@azure/core-util";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { SearchIndex, SearchIndexClient } from "../../../../src/index.js";
import { SearchClient } from "../../../../src/index.js";
import { defaultServiceVersion } from "../../../../src/serviceUtils.js";
import type { Hotel } from "../../utils/interfaces.js";
import { createClients } from "../../utils/recordedClient.js";
import { WAIT_TIME } from "../../utils/setup.js";

describe("query source authorization", { timeout: 20_000 }, () => {
  let recorder: Recorder;
  let indexClient: SearchIndexClient;
  let index: SearchIndex;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    ({ indexClient } = await createClients<Hotel>(defaultServiceVersion, recorder, ""));
    index = {
      name: "content-security-test",
      fields: [
        {
          type: "Edm.String",
          name: "id",
          key: true,
        },
        {
          name: "content",
          type: "Edm.String",
          searchable: true,
        },
      ],
    };
    await indexClient.createOrUpdateIndex(index);
    await delay(WAIT_TIME);
  });

  afterEach(async () => {
    try {
      await indexClient.deleteIndex(index.name).catch(() => {});
    } finally {
      await recorder?.stop();
    }
  });

  it("forwards query source authorization", async () => {
    const searchClient = new SearchClient<{ id: string }>(
      indexClient.endpoint,
      index.name,
      createTestCredential(),
      recorder.configureClientOptions({}),
    );

    // Test that search with invalid authorization token throws an error
    let errorThrown = false;
    try {
      await searchClient.search("*", {
        querySourceAuthorization: "Invalid token",
      });
    } catch (ex: any) {
      errorThrown = true;
      // Verify it's an auth related error
      assert.isTrue(ex.message.includes("Invalid header"), ex.message);
    }
    assert.isTrue(errorThrown, "Expected search with invalid header to throw an error");
  });
});
