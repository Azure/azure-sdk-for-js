// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortError } from "@azure/abort-controller";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleBasicUsage", () => {
    async function doAsyncWork(options: { abortSignal: AbortSignal }): Promise<void> {
      if (options.abortSignal.aborted) {
        return;
      }
      // @ts-preserve-whitespace
      // do async work
    }
    // @ts-preserve-whitespace
    const controller = new AbortController();
    doAsyncWork({ abortSignal: controller.signal });
    // @ts-preserve-whitespace
    // at some point later
    controller.abort();
  });

  it("ReadmeSampleBasicTimeout", () => {
    async function doAsyncWork(options: { abortSignal: AbortSignal }): Promise<void> {
      if (options.abortSignal.aborted) {
        return;
      }
      // @ts-preserve-whitespace
      // do async work
    }
    // @ts-preserve-whitespace
    const signal = AbortSignal.timeout(1000);
    doAsyncWork({ abortSignal: signal });
  });

  it("AbortErrorSample", () => {
    async function doAsyncWork(options: { abortSignal: AbortSignal }): Promise<void> {
      if (options.abortSignal.aborted) {
        throw new AbortError();
      }
      // @ts-preserve-whitespace
      // do async work
    }
    // @ts-preserve-whitespace
    const controller = new AbortController();
    controller.abort();
    try {
      doAsyncWork({ abortSignal: controller.signal });
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        // handle abort error here.
      }
    }
  });
});
