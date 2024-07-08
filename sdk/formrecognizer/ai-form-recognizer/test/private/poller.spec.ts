// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure-tools/test-utils";
import { lro } from "../../src/lro/util/poller";
import { PollOperationState } from "@azure/core-lro";
import { AbortController, AbortError } from "@azure/abort-controller";

describe("custom poller", function () {
  it("abort signal correctly cancels polling", async function () {
    const abortController = new AbortController();

    const operation = await createOperation();

    const result = operation.poll({ abortSignal: abortController.signal });
    setTimeout(() => {
      abortController.abort();
    }, 250);

    // Expect that awaiting result throws an error
    await assert.isRejected(result, AbortError, "The operation was aborted (poll).");
  });

  it("abort signal correctly cancels instantiation", async function () {
    const abortController = new AbortController();

    abortController.abort();

    const operation = createOperation(abortController);

    // Expect that awaiting operation throws an error
    await assert.isRejected(operation, AbortError, "The operation was aborted.");
  });

  it("stop poller after calling pollUntilDone", async function () {
    const operation = await createOperation();

    const result = operation.pollUntilDone();

    setTimeout(() => {
      operation.stopPolling();
    }, 750);

    await assert.isRejected(result, Error, "The operation was cancelled.");
  });
});

function createOperation(abortController?: AbortController) {
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
