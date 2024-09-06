// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach } from "vitest";
import { createStream } from "../../src/utils.js";

describe("createStream", () => {
  const createIter = async function* (): AsyncGenerator<number> {
    yield 1;
    yield 2;
    yield 3;
  };

  it("creates a stream from an async iterable", async () => {
    const stream = createStream(createIter(), async () => {
      /** nothing needs to be cleaned up */
    });
    const result: number[] = [];
    for await (const item of stream) {
      result.push(item);
    }
    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  it("creates cancelable stream", async () => {
    let canceled = false;
    const stream = createStream(createIter(), async () => {
      canceled = true;
    });
    stream.cancel();
    assert.isTrue(canceled);
  });

  it("creates disposable stream", async function () {
    let disposed = false;
    {
      const stream = createStream(createIter(), async () => {
        disposed = true;
      });
      await stream[Symbol.asyncDispose]();
      assert.isDefined(stream);
    }
    assert.isTrue(disposed);
  });

  it("creates stream that is canceled when looping exits early", async () => {
    let canceled = false;
    const stream = createStream(createIter(), async () => {
      canceled = true;
    });
    for await (const item of stream) {
      assert.isDefined(item);
      break;
    }
    assert.isTrue(canceled);
  });

  it("creates stream that can be canceled multiple times", async () => {
    let canceled = false;
    const stream = createStream(createIter(), async () => {
      canceled = true;
    });
    for await (const item of stream) {
      assert.isDefined(item);
      break;
    }
    assert.isTrue(canceled);
    await stream.cancel();
  });
});
