// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { lro } from "../../src/lro/util/poller.js";
import type { PollerLike, PollOperationState } from "@azure/core-lro";
import { AbortError } from "@azure/abort-controller";
import { describe, it, expect } from "vitest";

describe("custom poller", function () {
  it("abort signal correctly cancels polling", async () => {
    const abortController = new AbortController();

    const operation = await createOperation();

    const result = operation.poll({ abortSignal: abortController.signal });
    setTimeout(() => {
      abortController.abort();
    }, 250);

    // Expect that awaiting result throws an error
    await expect(result).rejects.toThrow(AbortError);
  });

  it("abort signal correctly cancels instantiation", async () => {
    const abortController = new AbortController();

    abortController.abort();

    const operation = createOperation(abortController);

    // Expect that awaiting operation throws an error
    await expect(operation).rejects.toThrow(AbortError);
  });

  it("stop poller after calling pollUntilDone", async () => {
    const operation = await createOperation();

    const result = operation.pollUntilDone();

    setTimeout(() => {
      operation.stopPolling();
    }, 750);

    await expect(result).rejects.toThrow(Error);
  });
});

function createOperation(
  abortController?: AbortController,
): Promise<PollerLike<PollOperationState<number>, number>> {
  let counter = 0;
  return lro<number, PollOperationState<number>>(
    {
      async init() {
        return {
          isStarted: true,
        };
      },
      async poll(ctx, _state) {
        await new Promise((resolve, reject) => {
          const cancel = setTimeout(resolve, 500);
          ctx.abortSignal?.addEventListener("abort", () => {
            clearTimeout(cancel);
            reject(new AbortError("The operation was aborted (poll)."));
          });
        });

        counter += 1;

        return {
          isCompleted: false,
          result: counter > 2 ? 42 : undefined,
        };
      },
      serialize(state) {
        return JSON.stringify(state);
      },
    },
    1000,
    abortController?.signal,
  );
}
