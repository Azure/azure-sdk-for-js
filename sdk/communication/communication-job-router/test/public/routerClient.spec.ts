// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, record } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { RouterClient } from "../../src";
import { Context } from "mocha";
import { createTestHttpClient, environmentSetup } from "./utils/recordedClient";
import { RouterClientOptions } from "../../src";

const COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING =
  "endpoint=https://endpoint/;accesskey=banana";

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

export function createRecordedClient(context: Context): RecordedClient<RouterClient> {
  const recorder = record(context, environmentSetup);

  // casting is a workaround to enable min-max testing
  return {
    client: new RouterClient(COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING, {
      httpClient: createTestHttpClient()
    } as RouterClientOptions),
    recorder
  };
}

describe("RouterClient", function() {
  let recorder: Recorder;
  let client: RouterClient;

  after(async function() {});

  describe("Router Operations", function() {
    beforeEach(function(this: Context) {
      ({ client, recorder } = createRecordedClient(this));
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("should successfully upsert a channel", async function() {
      let upsertChannelRequest = {
        id: "channel-id-123",
        name: "test-channel"
      };
      const upsertChannelOptions = {};

      const result = await client.upsertChannel(upsertChannelRequest, upsertChannelOptions);

      assert.isDefined(result);
      assert.isDefined(result?.id);
    }).timeout(8000);
  });
});
