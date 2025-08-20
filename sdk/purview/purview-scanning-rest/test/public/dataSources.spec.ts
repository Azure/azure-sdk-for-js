// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PurviewScanningRestClient, DataSource } from "@azure-rest/purview-scanning";
import { isUnexpected, paginate } from "@azure-rest/purview-scanning";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import type { PagedAsyncIterableIterator, PageSettings } from "$internal/paginateHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("List data sources", () => {
  let recorder: Recorder;
  let client: PurviewScanningRestClient;

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

    if (isUnexpected(result)) {
      assert.fail(`GET "/datasources" failed with ${result.status}`);
    }

    assert.isDefined(result.body.value?.length);
  });
});
