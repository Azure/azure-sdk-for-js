// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DataSource, PurviewScanningRestClient, paginate } from "../../src";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";

describe("List data sources", () => {
  let recorder: Recorder;
  let client: PurviewScanningRestClient;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available data sources", async () => {
    const result = await client.path("/datasources").get();
    const iter = paginate(client, result);

    const items: DataSource[] = [];

    for await (const item of <PagedAsyncIterableIterator<DataSource, DataSource[], PageSettings>>(
      iter
    )) {
      items.push(item);
    }

    assert.strictEqual(items.length, 2);

    if (result.status !== "200") {
      assert.fail(`GET "/datasources" failed with ${result.status}`);
    }

    assert.isDefined(result.body.value?.length);
  });
});
