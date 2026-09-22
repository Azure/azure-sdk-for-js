// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect } from "vitest";
import { RestError } from "@azure/core-rest-pipeline";
import type { BlobLayoutSegment } from "../../src/utils/BlobLayoutSegment.js";
import {
  fetchLayout,
  getLayoutEndpoint,
  toBlobLayoutCacheValue,
  toBlobLayoutSegments,
} from "../../src/utils/BlobLayoutSegment.js";
import type { BlobGetLayoutOptionalParams, BlobOperations } from "../../src/generated/index.js";
import { AnonymousCredential, BlobClient } from "../../src/index.js";

describe("toBlobLayoutSegments", () => {
  it("resolves ranges against the endpoint index rather than list position", () => {
    const segments = toBlobLayoutSegments({
      ranges: { range: [{ start: 0, end: 99, endpointIndex: 7 }] },
      endpoints: {
        endpoint: [
          { index: 3, value: "https://three:443/" },
          { index: 7, value: "https://seven:443/" },
        ],
      },
    });

    assert.deepEqual(segments, [{ start: 0, end: 99, endpoint: "https://seven:443/" }]);
  });

  it("drops ranges whose endpoint is missing instead of throwing", () => {
    const segments = toBlobLayoutSegments({
      ranges: {
        range: [
          { start: 0, end: 99, endpointIndex: 0 },
          { start: 100, end: 199, endpointIndex: 9 },
        ],
      },
      endpoints: { endpoint: [{ index: 0, value: "https://zero:443/" }] },
    });

    assert.deepEqual(segments, [{ start: 0, end: 99, endpoint: "https://zero:443/" }]);
  });

  it("returns nothing for an empty layout", () => {
    assert.deepEqual(toBlobLayoutSegments({}), []);
  });
});

describe("getLayoutEndpoint", () => {
  const segments: BlobLayoutSegment[] = [
    { start: 0, end: 999, endpoint: "a" },
    { start: 1000, end: 1999, endpoint: "b" },
    { start: 2000, end: 2999, endpoint: "c" },
  ];

  it("routes a chunk spanning several segments to the one owning its start", () => {
    assert.equal(getLayoutEndpoint(1500, segments), "b");
    assert.equal(getLayoutEndpoint(500, segments), "a");
    assert.equal(getLayoutEndpoint(1999, segments), "b");
  });

  it("selects the segment a boundary offset starts", () => {
    assert.equal(getLayoutEndpoint(0, segments), "a");
    assert.equal(getLayoutEndpoint(1000, segments), "b");
    assert.equal(getLayoutEndpoint(2000, segments), "c");
  });

  it("returns undefined when no segment covers the offset", () => {
    assert.isUndefined(getLayoutEndpoint(3000, segments));
    assert.isUndefined(getLayoutEndpoint(0, []));
  });
});

/** A blob context whose getLayout replays the given pages, throwing any RestError in sequence. */
function layoutContext(pages: unknown[]): {
  context: BlobOperations;
  calls: BlobGetLayoutOptionalParams[];
} {
  const calls: BlobGetLayoutOptionalParams[] = [];
  const queue = [...pages];
  const context = {
    getLayout: async (options: BlobGetLayoutOptionalParams = {}) => {
      calls.push(options);
      const page = queue.shift();
      if (page instanceof RestError) {
        throw page;
      }
      return page;
    },
  } as unknown as BlobOperations;
  return { context, calls };
}

describe("fetchLayout", () => {
  it("follows continuation markers and locks later pages to the first page's ETag", async () => {
    const { context, calls } = layoutContext([
      {
        etag: "etag-page-1",
        nextMarker: "marker-1",
        ranges: { range: [{ start: 0, end: 99, endpointIndex: 0 }] },
        endpoints: { endpoint: [{ index: 0, value: "https://a:443/" }] },
      },
      {
        etag: "etag-page-2",
        nextMarker: "",
        ranges: { range: [{ start: 100, end: 199, endpointIndex: 0 }] },
        endpoints: { endpoint: [{ index: 0, value: "https://b:443/" }] },
      },
    ]);

    const segments = await fetchLayout(context);

    assert.deepEqual(segments, [
      { start: 0, end: 99, endpoint: "https://a:443/" },
      { start: 100, end: 199, endpoint: "https://b:443/" },
    ]);
    assert.lengthOf(calls, 2);
    assert.isUndefined(calls[0].ifMatch);
    assert.equal(calls[1].marker, "marker-1");
    assert.equal(
      calls[1].ifMatch,
      "etag-page-1",
      "later pages must stay pinned to the version page 1 described",
    );
  });

  it("keeps a caller-supplied ETag for the first page", async () => {
    const { context, calls } = layoutContext([{ etag: "etag-from-service", nextMarker: "" }]);

    await fetchLayout(context, { ifMatch: "etag-from-caller", range: "bytes=0-99" });

    assert.equal(calls[0].ifMatch, "etag-from-caller");
    assert.equal(calls[0].range, "bytes=0-99");
  });

  it.each([400, 500, 503])("falls back silently on %i", async (statusCode) => {
    const { context } = layoutContext([new RestError("no layout", { statusCode })]);

    assert.isUndefined(await fetchLayout(context));
  });

  it.each([403, 404, 409, 412])("propagates %i", async (statusCode) => {
    const { context } = layoutContext([new RestError("failed", { statusCode })]);

    await expect(fetchLayout(context)).rejects.toThrow("failed");
  });
});

describe("toBlobLayoutCacheValue", () => {
  const segments: BlobLayoutSegment[] = [{ start: 0, end: 99, endpoint: "https://a:443/" }];

  it("refreshes a real layout ahead of its expiry", () => {
    const value = toBlobLayoutCacheValue(segments);

    assert.deepEqual(value.segments, segments);
    assert.equal(value.expiresOnTimestamp - value.refreshAfterTimestamp, 30 * 1000);
  });

  // The decision is cached like any other value, or every chunk would call Get Blob Layout again.
  it("caches a declined layout and never refreshes it early", () => {
    const value = toBlobLayoutCacheValue(undefined);

    assert.isUndefined(value.segments);
    assert.equal(
      value.refreshAfterTimestamp,
      value.expiresOnTimestamp,
      "a service that could not produce a layout should not be re-asked before the decision expires",
    );
  });

  it("gives both outcomes the same five minute lifetime", () => {
    const before = Date.now();
    const lifetime = toBlobLayoutCacheValue(segments).expiresOnTimestamp - before;

    assert.isAtLeast(lifetime, 5 * 60 * 1000 - 1000);
    assert.isAtMost(lifetime, 5 * 60 * 1000 + 1000);
  });
});

describe("layout routing gate", () => {
  const client = new BlobClient(
    "https://myaccount.blob.core.windows.net/container/blob.txt",
    new AnonymousCredential(),
  );
  const routable = {
    routing: "auto",
    downloadHint: "layout",
    etag: "etag-1",
    offset: 4194304,
    count: 4194304,
  };
  const gate = (overrides: Record<string, unknown>): unknown =>
    (client as any).createLayoutCache({ ...routable, ...overrides });

  it("builds a cache when the caller allows it and the service hinted layout", () => {
    assert.isDefined(gate({}));
    assert.isDefined(gate({ routing: "enabled" }));
  });

  it("does not route when the caller opted out", () => {
    assert.isUndefined(gate({ routing: "disabled" }));
  });

  it("does not route without the service hint", () => {
    assert.isUndefined(gate({ downloadHint: undefined }));
  });

  it("does not route when nothing is left after the first chunk", () => {
    assert.isUndefined(gate({ count: 0 }));
  });
});
