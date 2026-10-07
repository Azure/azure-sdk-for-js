// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { Readable } from "node:stream";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import { RestError, createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import type { FullOperationResponse } from "@azure-rest/core-client";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isRecordMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { LAYOUT_ENDPOINT_HEADER } from "@azure/storage-common";
import { addStorageCompatResponse } from "../../src/generated/static-helpers/storageCompatResponse.js";
import { decodeLayoutContinuationToken } from "../../src/utils/BlobLayoutSegment.js";
import type {
  BlobDownloadOptionalParams,
  BlobGetLayoutOptionalParams,
} from "../../src/generated/index.js";
import type {
  BlobDownloadOptions,
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
import { layoutContext } from "./layoutTestUtils.js";

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
  const { context, calls } = layoutContext(pages);
  (client as any).blobContext = context;
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

  it("locks pages after the first to page one's exact ETag even under a wildcard", async () => {
    const { client, calls } = clientWithLayoutPages([pageOne(), pageTwo()]);

    const pages: BlobGetLayoutResponseModel[] = [];
    for await (const page of client.getLayout({ conditions: { ifMatch: "*" } })) {
      pages.push(page);
    }

    assert.equal(calls[0].ifMatch, "*");
    assert.equal(calls[1].ifMatch, "etag-page-1");
    assert.equal(decodeLayoutContinuationToken(pages[0].continuationToken!).etag, "etag-page-1");
  });

  it("pins every continuation and token to page one's ETag, whatever later pages report", async () => {
    const page = (nextMarker: string, etag: string): unknown =>
      layoutPage({ nextMarker }, { etag });
    const { client, calls } = clientWithLayoutPages([
      page("marker-1", "etag-a"),
      page("marker-2", "etag-b"),
      page("", "etag-c"),
    ]);

    const pages: BlobGetLayoutResponseModel[] = [];
    for await (const item of client.getLayout()) {
      pages.push(item);
    }

    assert.deepEqual(
      calls.map((call) => call.ifMatch),
      [undefined, "etag-a", "etag-a"],
    );
    assert.equal(decodeLayoutContinuationToken(pages[1].continuationToken!).etag, "etag-a");
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

  it("keeps the raw body's continuationToken in step with the page", async () => {
    const page: BlobGetLayoutResponseModel = (
      await clientWithLayoutPages([pageOne()]).client.getLayout().next()
    ).value;

    assert.notProperty(page._response.parsedBody, "nextMarker");
    assert.equal(page._response.parsedBody?.continuationToken, page.continuationToken);
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

  it("refuses a customer-provided key over HTTP", () => {
    const client = new BlobClient(
      "http://myaccount.blob.core.windows.net/container/blob.txt",
      new AnonymousCredential(),
    );
    const customerProvidedKey = { encryptionKey: "key", encryptionKeySha256: "key-sha256" };

    assert.throws(
      () => client.getLayout({ customerProvidedKey }),
      "Customer-provided encryption key must be used over HTTPS.",
    );
  });

  it("sends a customer-provided key with the default algorithm", async () => {
    const { client, calls } = clientWithLayoutPages([pageTwo()]);
    const customerProvidedKey = { encryptionKey: "key", encryptionKeySha256: "key-sha256" };

    for await (const _page of client.getLayout({ customerProvidedKey })) {
      // drain
    }

    assert.equal(calls[0].encryptionAlgorithm, "AES256");
  });
});

describe("BlobClient.downloadToBuffer with routing, at or past the end of a blob", () => {
  const routed = { layoutAwareRouting: "enabled" } as const;

  /** A client whose reads get the service's 416 for a range past the end of a `size`-byte blob. */
  function clientPastEnd(size: number): BlobClient {
    const client = new BlobClient(
      "https://myaccount.blob.core.windows.net/container/blob.txt",
      new AnonymousCredential(),
    );
    (client as any).download = async () => {
      throw new RestError("The range specified is invalid for the current size of the resource.", {
        statusCode: 416,
        response: {
          status: 416,
          headers: createHttpHeaders({ "content-range": `bytes */${size}` }),
          request: createPipelineRequest({ url: client.url }),
        },
      });
    };
    return client;
  }

  it("returns an empty buffer for an empty blob", async () => {
    assert.lengthOf(await clientPastEnd(0).downloadToBuffer(0, 0, routed), 0);
  });

  it("returns an empty buffer from the end of a blob and rejects an offset past it", async () => {
    assert.lengthOf(await clientPastEnd(3).downloadToBuffer(3, 0, routed), 0);
    await expect(clientPastEnd(3).downloadToBuffer(5, 0, routed)).rejects.toThrow(
      "offset 5 shouldn't be larger than blob size 3",
    );
  });
});

describe("BlobClient.downloadToBuffer with routing and an unknown count", () => {
  it.each([
    ["the buffer is too small", "bytes 0-3/8", "The buffer's size should be equal to or larger"],
    ["the size is not reported", undefined, "Unable to determine the blob size"],
  ])("releases the first chunk when %s", async (_case, contentRange, message) => {
    const client = new BlobClient(
      "https://myaccount.blob.core.windows.net/container/blob.txt",
      new AnonymousCredential(),
    );
    const body = Readable.from([Buffer.alloc(4)]);
    (client as any).download = async () => ({ contentRange, readableStreamBody: body });

    await expect(
      client.downloadToBuffer(Buffer.alloc(2), 0, 0, { layoutAwareRouting: "enabled" }),
    ).rejects.toThrow(message);
    assert.isTrue(body.destroyed);
  });
});

describe("BlobClient.downloadToBuffer by default", () => {
  it("starts every block at once when the count is known", async () => {
    const client = new BlobClient(
      "https://myaccount.blob.core.windows.net/container/blob.txt",
      new AnonymousCredential(),
    );
    const pending: Array<() => void> = [];
    (client as any).download = (_offset: number, count: number) =>
      new Promise((resolve) =>
        pending.push(() => resolve({ readableStreamBody: Readable.from([Buffer.alloc(count)]) })),
      );

    const downloaded = client.downloadToBuffer(0, 8, { blockSize: 4, concurrency: 2 });
    await new Promise((resolve) => setImmediate(resolve));

    assert.lengthOf(pending, 2, "no block should wait for the first one");
    pending.forEach((release) => release());
    assert.lengthOf(await downloaded, 8);
  });

  it("takes the size from Get Blob Properties and never fetches a layout", async () => {
    const client = new BlobClient(
      "https://myaccount.blob.core.windows.net/container/blob.txt",
      new AnonymousCredential(),
    );
    const calls: string[] = [];
    (client as any).getProperties = async () => {
      calls.push("getProperties");
      return { contentLength: 8 };
    };
    (client as any).download = async (offset: number, count: number) => {
      calls.push(`download ${offset}`);
      return {
        etag: "etag-1",
        downloadHint: "layout",
        readableStreamBody: Readable.from([Buffer.alloc(count)]),
      };
    };
    (client as any).blobContext = {
      getLayout: async () => {
        throw new Error("Get Blob Layout must not be called");
      },
    };

    const downloaded = await client.downloadToBuffer(0, 0, { blockSize: 4 });

    assert.lengthOf(downloaded, 8);
    assert.deepEqual(calls, ["getProperties", "download 0", "download 4"]);
  });
});

describe("BlobClient.downloadToBuffer with routing", () => {
  it("locks routed blocks to the first block's ETag, even under a wildcard condition", async () => {
    const endpoint = "https://blob.stamp.store.core.windows.net:443/";
    const client = new BlobClient(
      "https://myaccount.blob.core.windows.net/container/blob.txt",
      new AnonymousCredential(),
    );
    (client as any).blobContext = {
      getLayout: async () =>
        layoutPage(
          {
            nextMarker: "",
            ranges: { range: [{ start: 0, end: 7, endpointIndex: 0 }] },
            endpoints: { endpoint: [{ index: 0, value: endpoint }] },
          },
          { etag: "etag-1" },
        ),
    };
    const reads: Array<{ ifMatch?: string; layoutEndpoint?: string }> = [];
    (client as any).download = async (
      _offset: number,
      count: number,
      downloadOptions: BlobDownloadOptions,
    ) => {
      reads.push({
        ifMatch: downloadOptions.conditions?.ifMatch,
        layoutEndpoint: downloadOptions.layoutEndpoint,
      });
      return {
        etag: "etag-1",
        downloadHint: "layout",
        readableStreamBody: Readable.from([Buffer.alloc(count)]),
      };
    };

    await client.downloadToBuffer(0, 8, {
      blockSize: 4,
      conditions: { ifMatch: "*" },
      layoutAwareRouting: "enabled",
    });

    assert.deepEqual(reads, [
      { ifMatch: "*", layoutEndpoint: undefined },
      { ifMatch: "etag-1", layoutEndpoint: endpoint },
    ]);
  });
});

describe("BlobClient.download with a layout endpoint", () => {
  it("keeps routing when it resumes a stream that ended early", async () => {
    const endpoint = "https://blob.stamp.store.core.windows.net:443/";
    const client = new BlobClient(
      "https://myaccount.blob.core.windows.net/container/blob.txt",
      new AnonymousCredential(),
    );
    const routedTo: unknown[] = [];
    // The first response promises eight bytes but ends after four.
    const bodies = [Buffer.alloc(4, 1), Buffer.alloc(4, 2)];
    (client as any).blobContext = {
      download: async (downloadOptions: BlobDownloadOptionalParams) => {
        routedTo.push(downloadOptions.requestOptions?.headers?.[LAYOUT_ENDPOINT_HEADER]);
        const rawResponse = {
          request: createPipelineRequest({ url: client.url }),
          status: 206,
          headers: createHttpHeaders(),
          bodyAsText: "",
        } as FullOperationResponse;
        return addStorageCompatResponse(
          rawResponse,
          { readableStreamBody: Readable.from([bodies.shift()!]) },
          { contentLength: 8, etag: "etag-1" },
        );
      },
    };

    const response = await client.download(0, 8, {
      layoutEndpoint: endpoint,
      maxRetryRequests: 1,
    });
    const chunks: Buffer[] = [];
    for await (const chunk of response.readableStreamBody!) {
      chunks.push(chunk as Buffer);
    }

    assert.isTrue(Buffer.concat(chunks).equals(Buffer.from([1, 1, 1, 1, 2, 2, 2, 2])));
    assert.deepEqual(routedTo, [endpoint, endpoint]);
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
    const downloaded = await large.downloadToBuffer(0, count, {
      blockSize,
      layoutAwareRouting: "enabled",
    });

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
