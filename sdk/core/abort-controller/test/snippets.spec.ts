// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortError } from "@azure/abort-controller";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("basic_usage", () => {
    async function doAsyncWork(options: { abortSignal: AbortSignal }): Promise<void> {
      if (options.abortSignal.aborted) {
        return;
      }

      // do async work
    }

    const controller = new AbortController();
    doAsyncWork({ abortSignal: controller.signal });

    // at some point later
    controller.abort();
  });

  it("basic_timeout", () => {
    async function doAsyncWork(options: { abortSignal: AbortSignal }): Promise<void> {
      if (options.abortSignal.aborted) {
        return;
      }

      // do async work
    }

    const signal = AbortSignal.timeout(1000);
    doAsyncWork({ abortSignal: signal });
  });

  it("abort_error", () => {
    async function doAsyncWork(options: { abortSignal: AbortSignal }): Promise<void> {
      if (options.abortSignal.aborted) {
        throw new AbortError();
      }

      // do async work
    }

    const controller = new AbortController();
    controller.abort();
    try {
      doAsyncWork({ abortSignal: controller.signal });
    } catch (e) {
      if (e.name === "AbortError") {
        // handle abort error here.
      }
    }
  });
});
