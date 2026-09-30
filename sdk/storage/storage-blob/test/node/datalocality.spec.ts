// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import { RestError, createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import type { FullOperationResponse } from "@azure-rest/core-client";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isRecordMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { addStorageCompatResponse } from "../../src/generated/static-helpers/storageCompatResponse.js";
import type { BlobLayoutSegment } from "../../src/utils/BlobLayoutSegment.js";
import {
  fetchLayout,
  getLayoutEndpoint,
  toBlobLayoutCacheValue,
  toBlobLayoutSegments,
} from "../../src/utils/BlobLayoutSegment.js";
import type { BlobGetLayoutOptionalParams, BlobOperations } from "../../src/generated/index.js";
import type {
  BlobGetLayoutResponseModel,
  BlockBlobClient,
  ContainerClient,
} from "../../src/index.js";
import {
  AnonymousCredential,
  BlobClient,
  BlobServiceClient,
  newPipeline,
} from "../../src/index.js";
import { createAndStartRecorder, getUniqueName } from "../utils/index.js";

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

  it("accepts the service hint in any casing", () => {
    assert.isDefined(gate({ downloadHint: "Layout" }));
  });

  it("does not route when nothing is left after the first chunk", () => {
    assert.isUndefined(gate({ count: 0 }));
  });
});

/** Builds a Get Blob Layout page shaped the way the generated layer hands it back. */
function layoutPage(body: Record<string, unknown>, headers: Record<string, unknown> = {}): unknown {
  const rawResponse = {
    request: createPipelineRequest({ url: "https://myaccount.blob.core.windows.net" }),
    status: 200,
    headers: createHttpHeaders(),
    bodyAsText: "",
  } as FullOperationResponse;
  return addStorageCompatResponse(rawResponse, body, headers);
}

/** A BlobClient whose getLayout replays the given pages, throwing any RestError in sequence. */
function clientWithLayoutPages(pages: unknown[]): {
  client: BlobClient;
  calls: BlobGetLayoutOptionalParams[];
} {
  const client = new BlobClient(
    "https://myaccount.blob.core.windows.net/container/blob.txt",
    new AnonymousCredential(),
  );
  const calls: BlobGetLayoutOptionalParams[] = [];
  const queue = [...pages];
  (client as any).blobContext = {
    getLayout: async (options: BlobGetLayoutOptionalParams = {}) => {
      calls.push(options);
      const page = queue.shift();
      if (page instanceof RestError) {
        throw page;
      }
      return page;
    },
  };
  return { client, calls };
}

describe("BlobClient.getLayout", () => {
  // adjustResponse consumes _response.rawResponse, so each test needs its own pages.
  const pageOne = (): unknown =>
    layoutPage(
      {
        nextMarker: "marker-1",
        ranges: { range: [{ start: 0, end: 99, endpointIndex: 0 }] },
        endpoints: { endpoint: [{ index: 0, value: "https://a:443/" }] },
      },
      { etag: "etag-page-1" },
    );
  const pageTwo = (): unknown =>
    layoutPage(
      {
        nextMarker: "",
        ranges: { range: [{ start: 100, end: 199, endpointIndex: 0 }] },
        endpoints: { endpoint: [{ index: 0, value: "https://b:443/" }] },
      },
      { etag: "etag-page-2" },
    );

  // Endpoint indexes are scoped to their page, so pages are surfaced whole rather than flattened.
  it("yields one item per service page, each carrying its own endpoints", async () => {
    const { client } = clientWithLayoutPages([pageOne(), pageTwo()]);

    const items = [];
    for await (const page of client.getLayout()) {
      items.push(page);
    }

    assert.lengthOf(items, 2);
    assert.deepEqual(items[0].ranges?.range, [{ start: 0, end: 99, endpointIndex: 0 }]);
    assert.deepEqual(items[0].endpoints?.endpoint, [{ index: 0, value: "https://a:443/" }]);
    assert.deepEqual(items[1].endpoints?.endpoint, [{ index: 0, value: "https://b:443/" }]);
  });

  it("locks pages after the first to the ETag page one reported", async () => {
    const { client, calls } = clientWithLayoutPages([pageOne(), pageTwo()]);

    for await (const _page of client.getLayout()) {
      // drain
    }

    assert.lengthOf(calls, 2);
    assert.isUndefined(calls[0].ifMatch);
    assert.equal(calls[1].marker, "marker-1");
    assert.equal(calls[1].ifMatch, "etag-page-1");
  });

  it("holds the range identical across continuations", async () => {
    const { client, calls } = clientWithLayoutPages([pageOne(), pageTwo()]);

    for await (const _page of client.getLayout({ range: { offset: 0, count: 200 } })) {
      // drain
    }

    assert.equal(calls[0].range, "bytes=0-199");
    assert.equal(calls[1].range, "bytes=0-199");
  });

  it("surfaces a continuationToken that resumes with the ETag lock and drops nextMarker", async () => {
    const first: BlobGetLayoutResponseModel = (
      await clientWithLayoutPages([pageOne()]).client.getLayout().next()
    ).value;
    assert.notProperty(first, "nextMarker");

    const { client, calls } = clientWithLayoutPages([pageTwo()]);
    for await (const _page of client
      .getLayout()
      .byPage({ continuationToken: first.continuationToken })) {
      // drain
    }

    assert.equal(calls[0].marker, "marker-1");
    assert.equal(calls[0].ifMatch, "etag-page-1");
  });

  it("passes maxPageSize and resumes from a continuationToken through byPage", async () => {
    const { client, calls } = clientWithLayoutPages([pageTwo()]);

    for await (const _page of client
      .getLayout()
      .byPage({ continuationToken: "marker-1", maxPageSize: 10 })) {
      // drain
    }

    assert.lengthOf(calls, 1);
    assert.equal(calls[0].marker, "marker-1");
    assert.equal(calls[0].maxPageSize, 10);
  });

  // The soft fallback exists only for the routing built into downloadToBuffer. An explicit caller
  // must see the failure.
  it.each([400, 403, 503])("propagates %i rather than falling back", async (statusCode) => {
    const { client } = clientWithLayoutPages([new RestError("failed", { statusCode })]);

    await expect(async () => {
      for await (const _page of client.getLayout()) {
        // drain
      }
    }).rejects.toThrow("failed");
  });
});

interface SentRequest {
  host: string;
  hostHeader?: string;
  isLayout: boolean;
}

/**
 * Records where each request went. Registered after the data locality policy, so it sees the
 * routed host. In record mode it also passes the account `Host` on to the test proxy, which
 * would otherwise send the routed host instead.
 */
function createRoutingSpy(): { policy: PipelinePolicy; sent: SentRequest[] } {
  const sent: SentRequest[] = [];
  const policy: PipelinePolicy = {
    name: "layoutRoutingSpyPolicy",
    sendRequest(request, next) {
      const url = new URL(request.url);
      const hostHeader = request.headers.get("host");
      sent.push({
        host: url.host,
        hostHeader,
        isLayout: url.searchParams.get("comp") === "layout",
      });
      if (hostHeader && isRecordMode()) {
        request.headers.set("x-recording-upstream-host-header", hostHeader);
      }
      return next(request);
    },
  };
  return { policy, sent };
}

/** Asserts the pages' ranges tile [start, end] in order, each served by an endpoint of its page. */
function assertTiles(pages: BlobGetLayoutResponseModel[], start: number, end: number): void {
  let next = start;
  for (const page of pages) {
    const endpoints = page.endpoints?.endpoint ?? [];
    for (const range of page.ranges?.range ?? []) {
      assert.equal(range.start, next, "ranges must be contiguous and in order");
      const endpoint = endpoints.find((candidate) => candidate.index === range.endpointIndex);
      assert.isDefined(endpoint, `range ${range.start}-${range.end} must resolve on its own page`);
      assert.match(endpoint!.value, /^https:\/\//);
      next = range.end + 1;
    }
  }
  assert.equal(next, end + 1, "the ranges must cover everything asked for");
}

describe("Data locality Node.js only", () => {
  let recorder: Recorder;
  let containerClient: ContainerClient;
  let blobClient: BlockBlobClient;
  let etag: string | undefined;
  let spy: ReturnType<typeof createRoutingSpy>;
  const blockSize = 1024;
  // Never repeats within a block, so a block written to the wrong offset cannot go unnoticed.
  const content = Buffer.from(Array.from({ length: 4 * blockSize }, (_, i) => i % 251));

  beforeEach(async (ctx) => {
    recorder = await createAndStartRecorder(ctx);
    spy = createRoutingSpy();
    const recorderPolicies = recorder.configureClientOptions({}).additionalPolicies ?? [];
    const pipeline = newPipeline(createTestCredential(), {
      additionalPolicies: [{ policy: spy.policy, position: "perRetry" }, ...recorderPolicies],
    } as any);
    const service = new BlobServiceClient(
      `https://${env.ACCOUNT_NAME}.blob.core.windows.net/`,
      pipeline,
    );
    containerClient = service.getContainerClient(
      recorder.variable("container", getUniqueName("layoutrouting")),
    );
    await containerClient.create();
    blobClient = containerClient.getBlockBlobClient(
      recorder.variable("blob", getUniqueName("blob")),
    );
    etag = (await blobClient.upload(content, content.length)).etag;
  });

  afterEach(async () => {
    await containerClient?.delete();
    await recorder.stop();
  });

  it("reports a layout that tiles the blob, or just the range asked for", async () => {
    const whole: BlobGetLayoutResponseModel[] = [];
    for await (const page of blobClient.getLayout()) {
      whole.push(page);
    }
    assertTiles(whole, 0, content.length - 1);
    assert.equal(whole[0].blobContentLength, content.length);
    assert.equal(whole[0].etag, etag);

    const range = { offset: blockSize, count: 2 * blockSize };
    const ranged: BlobGetLayoutResponseModel[] = [];
    for await (const page of blobClient.getLayout({ range })) {
      ranged.push(page);
    }
    assertTiles(ranged, range.offset, range.offset + range.count - 1);
  });

  it("reads a range from the endpoint its layout names, still addressed to the account", async () => {
    const offset = blockSize;
    const page: BlobGetLayoutResponseModel = (await blobClient.getLayout().next()).value;
    const range = page.ranges!.range!.find((r) => r.start <= offset && offset <= r.end)!;
    const endpoint = page.endpoints!.endpoint!.find((e) => e.index === range.endpointIndex)!;
    spy.sent.length = 0;

    const response = await blobClient.download(offset, blockSize, {
      layoutEndpoint: endpoint.value,
    });
    const chunks: Buffer[] = [];
    for await (const chunk of response.readableStreamBody!) {
      chunks.push(chunk as Buffer);
    }

    assert.isTrue(Buffer.concat(chunks).equals(content.subarray(offset, offset + blockSize)));
    assert.deepEqual(spy.sent, [
      {
        host: new URL(endpoint.value).host,
        hostHeader: new URL(blobClient.url).host,
        isLayout: false,
      },
    ]);
  });

  it("routes every block after the first once the service hints the blob has a layout", async () => {
    // The service only hints for large blobs; repeating one staged block builds one cheaply.
    const block = Buffer.from(Array.from({ length: 16 * blockSize }, (_, i) => i % 251));
    const large = containerClient.getBlockBlobClient(
      recorder.variable("large", getUniqueName("large")),
    );
    const blockId = Buffer.from("block").toString("base64");
    await large.stageBlock(blockId, block, block.length);
    await large.commitBlockList(Array.from({ length: 1088 }, () => blockId));
    spy.sent.length = 0;

    const count = 4 * blockSize;
    const downloaded = await large.downloadToBuffer(0, count, { blockSize });

    assert.isTrue(
      downloaded.equals(block.subarray(0, count)),
      "every block must land at its offset",
    );
    const accountHost = new URL(large.url).host;
    const [first, ...rest] = spy.sent.filter((request) => !request.isLayout);
    assert.equal(first.host, accountHost, "the hint arrives on a read from the account");
    assert.lengthOf(rest, count / blockSize - 1);
    for (const read of rest) {
      assert.notEqual(read.host, accountHost, "every later block must be routed");
      assert.equal(
        read.hostHeader,
        accountHost,
        "a routed block must stay addressed to the account",
      );
    }
    assert.lengthOf(
      spy.sent.filter((request) => request.isLayout),
      1,
      "one layout must serve the whole download",
    );
  });
});
