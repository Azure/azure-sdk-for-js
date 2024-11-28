// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PurviewScanningClient, DataSource, DataSourceListOutput } from "../../src/index.js";
import { paginate } from "../../src/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import type { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("List data sources", () => {
  let recorder: Recorder;
  let client: PurviewScanningClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
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
    const datasourcesOutput = result.body as DataSourceListOutput;
    assert.isDefined(datasourcesOutput.value?.length);
  });
});
