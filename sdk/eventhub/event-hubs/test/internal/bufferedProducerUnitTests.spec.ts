// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { EventHubBufferedProducerClient } from "../../src/index.js";
import { createBufferedProducer } from "../utils/clients.js";
import { describe, it, afterEach, vi, beforeEach, beforeAll, afterAll } from "vitest";
import { assert, expect } from "../utils/chai.js";

describe("EventHubBufferedProducerClient unit tests", function () {
  let client: EventHubBufferedProducerClient;

  beforeAll(async function () {
    vi.useFakeTimers();
  });

  afterAll(async function () {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  beforeEach(async function () {
    client = createBufferedProducer().producer;
  });

  afterEach(async function () {
    await client?.close({ flush: false });
  });

  it("should update partition ids periodically", async function () {
    const iDs1 = ["0", "1"];
    const iDs2 = ["0", "1", "2"];
    const iDs3 = ["0"];
    const timeInterval = 100;

    vi.spyOn(client, "getPartitionIds")
      .mockResolvedValueOnce(iDs1)
      .mockResolvedValueOnce(iDs2)
      .mockResolvedValueOnce(iDs3);

    const spy = vi.spyOn(client["_partitionAssigner"], "setPartitionIds");
    client["_backgroundManagementInterval"] = timeInterval;

    await client.enqueueEvent({ body: 1 });

    assert.deepStrictEqual(client["_partitionIds"], iDs1);
    expect(spy).toHaveBeenNthCalledWith(1, iDs1);
    await vi.advanceTimersByTimeAsync(timeInterval);

    assert.deepStrictEqual(client["_partitionIds"], iDs2);
    expect(spy).toHaveBeenNthCalledWith(2, iDs2);
    await vi.advanceTimersByTimeAsync(timeInterval);

    assert.deepStrictEqual(client["_partitionIds"], iDs3);
    expect(spy).toHaveBeenNthCalledWith(3, iDs3);
  });
});
