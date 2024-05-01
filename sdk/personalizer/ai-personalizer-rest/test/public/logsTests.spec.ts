// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import createPersonalizerClient, {
  LogsPropertiesOutput,
  PersonalizerClient,
  isUnexpected,
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
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("delete log tests", async function () {
    await deleteLogs(client);
    const logProperties = await getLogProperties(client);
    if (logProperties.dateRange != null) {
      assert.isUndefined(logProperties.dateRange.from);
      assert.isUndefined(logProperties.dateRange.to);
    }
  });
});

async function deleteLogs(client: PersonalizerClient) {
  const response = await client.path("/logs").delete();
  if (isUnexpected(response)) {
    throw response.body.error;
  }
}

async function getLogProperties(client: PersonalizerClient): Promise<LogsPropertiesOutput> {
  const response = await client.path("/logs/properties").get();
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  return response.body;
}
