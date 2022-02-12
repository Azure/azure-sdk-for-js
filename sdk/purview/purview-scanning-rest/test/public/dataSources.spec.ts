// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PurviewScanningRestClient, paginate, DataSource } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";

describe("List data sources", () => {
  let recorder: Recorder;
  let client: PurviewScanningRestClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createClient(recorder);
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

    assert.isNotEmpty(items);

    if (result.status !== "200") {
      assert.fail(`GET "/datasources" failed with ${result.status}`);
    }

    assert.isDefined(result.body.value?.length);
  });
});
