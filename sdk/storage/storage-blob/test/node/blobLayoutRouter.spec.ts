// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect } from "vitest";
import type { BlobGetLayoutOptionalParams, BlobOperations } from "../../src/generated/index.js";
import { BlobLayoutRouter } from "../../src/utils/BlobLayoutRouter.js";
import { layoutContext } from "./layoutTestUtils.js";

describe("BlobLayoutRouter", () => {
  const routable = {
    routing: "enabled",
    downloadHint: "layout",
    etag: "etag-1",
    offset: 4194304,
    count: 4194304,
  };
  const router = (
    context: BlobOperations,
    overrides: Record<string, unknown> = {},
  ): BlobLayoutRouter | undefined =>
    BlobLayoutRouter.forDownload(context, { ...routable, ...overrides } as any);
  const gate = (overrides: Record<string, unknown>): BlobLayoutRouter | undefined =>
    router(layoutContext([]).context, overrides);

  it("routes when the caller opted in and the service hinted layout", () => {
    assert.isDefined(gate({}));
  });

  it("does not route unless the caller opted in", () => {
    for (const routing of [undefined, "auto", "disabled"]) {
      assert.isUndefined(gate({ routing }), String(routing));
    }
  });

  it("does not route without the service hint", () => {
    assert.isUndefined(gate({ downloadHint: undefined }));
  });

  it("accepts the service hint in any casing", () => {
    assert.isDefined(gate({ downloadHint: "Layout" }));
  });

  it("does not route when nothing is left after the first chunk", () => {
    assert.isUndefined(gate({ count: 0 }));
  });

  it("fetches the layout with the caller's customer-provided key", async () => {
    const { context, calls } = layoutContext([{ nextMarker: "" }]);
    const customerProvidedKey = {
      encryptionKey: "key",
      encryptionKeySha256: "key-sha256",
      encryptionAlgorithm: "AES256",
    };

    await router(context, { customerProvidedKey })!.endpointFor(routable.offset);

    assert.equal(calls[0].encryptionKey, "key");
    assert.equal(calls[0].encryptionKeySha256, "key-sha256");
    assert.equal(calls[0].encryptionAlgorithm, "AES256");
  });

  it("cancels the layout request when the download is cancelled", async () => {
    const calls: BlobGetLayoutOptionalParams[] = [];
    const context = {
      getLayout: (layoutOptions: BlobGetLayoutOptionalParams) => {
        calls.push(layoutOptions);
        return new Promise((_resolve, reject) => {
          layoutOptions.abortSignal?.addEventListener("abort", () => reject(new Error("aborted")));
        });
      },
    } as unknown as BlobOperations;
    const download = new AbortController();
    const endpoint = router(context, { abortSignal: download.signal })!.endpointFor(
      routable.offset,
    );

    download.abort();

    assert.isTrue(calls[0].abortSignal?.aborted);
    await expect(endpoint).rejects.toThrow("aborted");
  });
});
