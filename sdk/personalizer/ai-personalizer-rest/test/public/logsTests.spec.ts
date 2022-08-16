// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import Personalizer, { GeneratedClient, LogsPropertiesOutput } from "../../src";
import { env } from "process";

describe.skip("Log Tests", () => {
  let recorder: Recorder;
  let client: GeneratedClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = Personalizer(env["PERSONALIZER_ENDPOINT_SINGLE_SLOT"] ?? "", { key: env["PERSONALIZER_API_KEY_SINGLE_SLOT"] ?? "" });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("delete log tests", async function () {
    await deleteLogsAsync(client);
    let logProperties = await getLogPropertiesAsync(client);
    assert.isUndefined(logProperties.dateRange?.from);
    assert.isUndefined(logProperties.dateRange?.to);
  });
});

async function deleteLogsAsync(client: GeneratedClient) {
    await client.path("/logs").delete();
    // if (isUnexpected(response)) {
    //   throw response.body.error.code;
    // }
}

async function getLogPropertiesAsync(client: GeneratedClient): Promise<LogsPropertiesOutput> {
    let response = await client.path("/logs/properties").get();
    // if (isUnexpected(response)) {
    //   throw response.body.error.code;
    // }
    return response.body as LogsPropertiesOutput;
}

