// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import createPersonalizerClient, {
  isUnexpected,
  LogsPropertiesOutput,
  PersonalizerClient,
} from "../../src";

describe("Log Tests", () => {
  let recorder: Recorder;
  let client: PersonalizerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createPersonalizerClient(
      env["PERSONALIZER_ENDPOINT_MULTI_SLOT"] ?? "",
      {
        key: env["PERSONALIZER_API_KEY_MULTI_SLOT"] ?? "",
      },
      recorder.configureClientOptions({})
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("delete log tests", async function () {
    await deleteLogsAsync(client);
    const logProperties = await getLogPropertiesAsync(client);
    if (logProperties.dateRange != null) {
      assert.isUndefined(logProperties.dateRange.from);
      assert.isUndefined(logProperties.dateRange.to);
    }
  });
});

async function deleteLogsAsync(client: PersonalizerClient) {
  const response = await client.path("/logs").delete();
  if (isUnexpected(response)) {
    throw response.body.error.code;
  }
}

async function getLogPropertiesAsync(client: PersonalizerClient): Promise<LogsPropertiesOutput> {
  const response = await client.path("/logs/properties").get();
  if (isUnexpected(response)) {
    throw response.body.error.code;
  }
  return response.body;
}
