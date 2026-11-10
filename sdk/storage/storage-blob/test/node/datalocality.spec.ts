// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { Readable } from "node:stream";
import { AbortError } from "@azure/abort-controller";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import { RestError, createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import type { FullOperationResponse } from "@azure-rest/core-client";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isLiveMode, isRecordMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { LAYOUT_ENDPOINT_HEADER } from "../../src/policies/StorageDataLocalityPolicy.js";
import { addStorageCompatResponse } from "../../src/generated/static-helpers/storageCompatResponse.js";
import type { BlobDownloadOptionalParams } from "../../src/generated/index.js";
import type {
  BlobDownloadOptions,
  BlockBlobClient,
  ContainerClient,
  HttpOperationResponse,
  IHttpClient,
  StorageRetryOptions,
  WebResource,
} from "../../src/index.js";
import {
  AnonymousCredential,
  BlobClient,
  BlobServiceClient,
  newPipeline,
} from "../../src/index.js";
import { createAndStartRecorder, getUniqueName } from "../utils/index.js";

/** Builds a Get Blob Layout page shaped the way the generated layer hands it back. */
function layoutPage(
  body: Record<string, unknown> | undefined,
  headers: Record<string, unknown> = {},
): unknown {
  const rawResponse = {
    request: createPipelineRequest({ url: "https://myaccount.blob.core.windows.net" }),
    status: body ? 200 : 204,
    headers: createHttpHeaders(),
    bodyAsText: "",
  } as FullOperationResponse;
  return addStorageCompatResponse(rawResponse, body, headers);
}

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
        layoutEndpoint: (downloadOptions as BlobDownloadOptions & { layoutEndpoint?: string })
          .layoutEndpoint,
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

    // The endpoint is the internal option a routed read of downloadToBuffer passes.
    const response = await client.download(0, 8, {
      layoutEndpoint: endpoint,
      maxRetryRequests: 1,
    } as BlobDownloadOptions);
    const chunks: Buffer[] = [];
    for await (const chunk of response.readableStreamBody!) {
      chunks.push(chunk as Buffer);
    }

    assert.isTrue(Buffer.concat(chunks).equals(Buffer.from([1, 1, 1, 1, 2, 2, 2, 2])));
    assert.deepEqual(routedTo, [endpoint, endpoint]);
  });
});

const ACCOUNT_HOST = "myaccount.blob.core.windows.net";
const ROUTED_ENDPOINT = "https://blob.stamp.store.core.windows.net:443/";
const ROUTED_HOST = "blob.stamp.store.core.windows.net";

/** A Get Blob Layout page: `[start, end, endpointIndex]` ranges and the endpoints they index. */
interface FakeLayoutPage {
  ranges: Array<[number, number, number]>;
  endpoints: string[];
  nextMarker?: string;
}

/** How the fake service answers one Get Blob Layout request; `hang` waits until it's aborted. */
type FakeLayoutAnswer = FakeLayoutPage | { status: number } | { error: Error } | "hang";

interface FakeServiceOptions {
  /** Whether reads carry the hint that the blob has a layout. Defaults to true. */
  hint?: boolean;
  /** Answers to successive layout requests. Defaults to one page routing every byte asked for. */
  layout?: FakeLayoutAnswer[];
  /** Makes every read sent to a routed endpoint fail the way an unreachable host does. */
  routedReadsFail?: boolean;
}

/** A request as it reached the transport. */
interface WireRequest {
  host: string;
  hostHeader?: string;
  isLayout: boolean;
  routingHeader?: string;
}

function requestedRange(request: WebResource, size: number): [number, number] {
  const match = /bytes=(\d+)-(\d*)/.exec(request.headers.get("x-ms-range") ?? "");
  const start = match ? Number(match[1]) : 0;
  const end = match?.[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  return [start, end];
}

function layoutXml(page: FakeLayoutPage): string {
  const ranges = page.ranges
    .map(([start, end, index]) => `<Range Start="${start}" End="${end}" EndpointIndex="${index}"/>`)
    .join("");
  const endpoints = page.endpoints
    .map((value, index) => `<Endpoint Index="${index}" Value="${value}"/>`)
    .join("");
  const nextMarker = page.nextMarker
    ? `<NextMarker>${page.nextMarker}</NextMarker>`
    : "<NextMarker/>";
  return `<?xml version="1.0" encoding="utf-8"?><BlobLayout><Ranges>${ranges}</Ranges><Endpoints>${endpoints}</Endpoints>${nextMarker}</BlobLayout>`;
}

/**
 * A transport that plays the blob service, so a download runs through the real pipeline,
 * including the data locality and retry policies, and every request it sends can be inspected.
 */
function createFakeService(
  content: Buffer,
  options: FakeServiceOptions = {},
): { httpClient: IHttpClient; wire: WireRequest[]; layoutRequested: Promise<void> } {
  const wire: WireRequest[] = [];
  let layoutRequests = 0;
  let onLayoutRequest = (): void => undefined;
  const layoutRequested = new Promise<void>((resolve) => (onLayoutRequest = resolve));
  const httpClient: IHttpClient = {
    async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      const url = new URL(request.url);
      const isLayout = url.searchParams.get("comp") === "layout";
      wire.push({
        host: url.host,
        hostHeader: request.headers.get("host"),
        isLayout,
        routingHeader: request.headers.get(LAYOUT_ENDPOINT_HEADER),
      });
      const [start, end] = requestedRange(request, content.length);

      if (isLayout) {
        onLayoutRequest();
        const answer: FakeLayoutAnswer | undefined = options.layout
          ? options.layout[layoutRequests++]
          : { ranges: [[start, end, 0]], endpoints: [ROUTED_ENDPOINT] };
        if (answer === undefined) {
          throw new Error("Unexpected Get Blob Layout request");
        }
        if (answer === "hang") {
          return new Promise((_resolve, reject) => {
            const abort = (): void => reject(new AbortError("The operation was aborted."));
            if (request.abortSignal?.aborted) {
              abort();
            }
            request.abortSignal?.addEventListener("abort", abort, { once: true });
          });
        }
        if ("error" in answer) {
          throw answer.error;
        }
        if ("status" in answer) {
          return {
            request,
            status: answer.status,
            headers: toHttpHeadersLike(
              createHttpHeaders({
                "content-type": "application/xml",
                "x-ms-error-code": "LayoutFailure",
              }),
            ),
            bodyAsText: `<?xml version="1.0" encoding="utf-8"?><Error><Code>LayoutFailure</Code><Message>Status ${answer.status}</Message></Error>`,
          };
        }
        return {
          request,
          status: 200,
          headers: toHttpHeadersLike(
            createHttpHeaders({ "content-type": "application/xml", etag: '"etag-1"' }),
          ),
          bodyAsText: layoutXml(answer),
        };
      }

      if (options.routedReadsFail && url.host !== ACCOUNT_HOST) {
        throw new RestError("connect ECONNREFUSED", { code: "REQUEST_SEND_ERROR" });
      }
      const body = content.subarray(start, end + 1);
      return {
        request,
        status: 206,
        headers: toHttpHeadersLike(
          createHttpHeaders({
            "content-range": `bytes ${start}-${end}/${content.length}`,
            "content-length": `${body.length}`,
            "content-type": "application/octet-stream",
            etag: '"etag-1"',
            ...(options.hint === false ? {} : { "x-ms-download-hint": "layout" }),
          }),
        ),
        readableStreamBody: Readable.from([body]),
      };
    },
  };
  return { httpClient, wire, layoutRequested };
}

function clientOf(
  httpClient: IHttpClient,
  retryOptions: StorageRetryOptions = { maxTries: 1 },
): BlobClient {
  return new BlobClient(
    `https://${ACCOUNT_HOST}/container/blob.bin`,
    newPipeline(new AnonymousCredential(), { httpClient, retryOptions }),
  );
}

describe("BlobClient.downloadToBuffer with routing, end to end", () => {
  // Never repeats within a block, so a block written to the wrong offset cannot go unnoticed.
  const content = Buffer.from(Array.from({ length: 4096 }, (_, i) => i % 251));
  const routed = (): { blockSize: number; layoutAwareRouting: "enabled" } => ({
    blockSize: 1024,
    layoutAwareRouting: "enabled",
  });
  const accountRead: WireRequest = {
    host: ACCOUNT_HOST,
    hostHeader: undefined,
    isLayout: false,
    routingHeader: undefined,
  };
  const routedRead: WireRequest = {
    host: ROUTED_HOST,
    hostHeader: ACCOUNT_HOST,
    isLayout: false,
    routingHeader: undefined,
  };
  const reads = (wire: WireRequest[]): WireRequest[] => wire.filter((r) => !r.isLayout);
  const layouts = (wire: WireRequest[]): WireRequest[] => wire.filter((r) => r.isLayout);

  it.each<[string, (client: BlobClient) => Promise<Buffer>]>([
    ["a known size", (client) => client.downloadToBuffer(0, content.length, routed())],
    ["an unknown size", (client) => client.downloadToBuffer(0, undefined, routed())],
    [
      "a known size into the caller's buffer",
      (client) =>
        client.downloadToBuffer(Buffer.alloc(content.length), 0, content.length, routed()),
    ],
    [
      "an unknown size into the caller's buffer",
      (client) => client.downloadToBuffer(Buffer.alloc(content.length), 0, undefined, routed()),
    ],
  ])("reads the first block from the account and routes the rest, for %s", async (_, download) => {
    const { httpClient, wire } = createFakeService(content);

    const downloaded = await download(clientOf(httpClient));

    assert.isTrue(downloaded.equals(content), "every block must land at its offset");
    assert.deepEqual(reads(wire), [accountRead, routedRead, routedRead, routedRead]);
    assert.lengthOf(layouts(wire), 1, "one layout must serve the whole download");
    assert.isTrue(
      wire.every((r) => r.routingHeader === undefined),
      "the internal routing header must never reach the transport",
    );
  });

  it.each<[string, FakeServiceOptions, number]>([
    ["the service sends no layout hint", { hint: false }, 0],
    ["the layout is empty", { layout: [{ ranges: [], endpoints: [] }] }, 1],
    [
      "the layout names no endpoint for the range",
      { layout: [{ ranges: [[1024, 4095, 1]], endpoints: [ROUTED_ENDPOINT] }] },
      1,
    ],
    [
      "the layout names an endpoint that is not a URL",
      { layout: [{ ranges: [[1024, 4095, 0]], endpoints: ["not a url"] }] },
      1,
    ],
    ["Get Blob Layout answers 400", { layout: [{ status: 400 }] }, 1],
    ["Get Blob Layout answers 503", { layout: [{ status: 503 }] }, 1],
    [
      "a later layout page answers 500",
      {
        layout: [
          { ranges: [[1024, 2047, 0]], endpoints: [ROUTED_ENDPOINT], nextMarker: "page-2" },
          { status: 500 },
        ],
      },
      2,
    ],
  ])("reads every block from the account when %s", async (_, service, layoutRequests) => {
    const { httpClient, wire } = createFakeService(content, service);

    const downloaded = await clientOf(httpClient).downloadToBuffer(0, content.length, routed());

    assert.isTrue(downloaded.equals(content));
    assert.deepEqual(reads(wire), [accountRead, accountRead, accountRead, accountRead]);
    assert.lengthOf(
      layouts(wire),
      layoutRequests,
      "the layout must not be fetched for every block",
    );
  });

  it.each([403, 404, 409, 412, 408, 429])(
    "fails the download when Get Blob Layout answers %i",
    async (status) => {
      const { httpClient, wire } = createFakeService(content, { layout: [{ status }] });

      await expect(
        clientOf(httpClient).downloadToBuffer(0, content.length, routed()),
      ).rejects.toMatchObject({ statusCode: status });
      assert.deepEqual(reads(wire), [accountRead], "no block after the first may be read");
      assert.lengthOf(layouts(wire), 1);
    },
  );

  it("fails the download when Get Blob Layout fails without a status", async () => {
    const { httpClient, wire } = createFakeService(content, {
      layout: [{ error: new RestError("socket hang up", { code: "REQUEST_SEND_ERROR" }) }],
    });

    const error = await clientOf(httpClient)
      .downloadToBuffer(0, content.length, routed())
      .then(
        () => undefined,
        (e: RestError) => e,
      );

    assert.equal(error?.code, "REQUEST_SEND_ERROR");
    assert.isUndefined(error?.statusCode);
    assert.deepEqual(reads(wire), [accountRead], "no block after the first may be read");
  });

  it("fails the download when it is cancelled during Get Blob Layout", async () => {
    const { httpClient, wire, layoutRequested } = createFakeService(content, { layout: ["hang"] });
    const controller = new AbortController();

    const downloaded = clientOf(httpClient).downloadToBuffer(0, content.length, {
      ...routed(),
      abortSignal: controller.signal,
    });
    await layoutRequested;
    controller.abort();

    await expect(downloaded).rejects.toMatchObject({ name: "AbortError" });
    assert.deepEqual(reads(wire), [accountRead], "no block after the first may be read");
  });

  it("fails the download when a routed read keeps failing, without retrying it through the account", async () => {
    const { httpClient, wire } = createFakeService(content, { routedReadsFail: true });
    const client = clientOf(httpClient, { maxTries: 3, retryDelayInMs: 1, maxRetryDelayInMs: 1 });

    await expect(client.downloadToBuffer(0, content.length, routed())).rejects.toMatchObject({
      code: "REQUEST_SEND_ERROR",
    });
    const [first, ...rest] = reads(wire);
    assert.deepEqual(first, accountRead);
    assert.isAtLeast(rest.length, 3, "a routed read must be retried");
    for (const read of rest) {
      assert.deepEqual(read, routedRead, "every retry must stay on the routed endpoint");
    }
  });
});

interface SentRequest {
  host: string;
  hostHeader?: string;
  isLayout: boolean;
  /** The `x-ms-download-hint` the service answered with, if any. */
  downloadHint?: string;
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
    async sendRequest(request, next) {
      const url = new URL(request.url);
      const hostHeader = request.headers.get("host");
      const sentRequest: SentRequest = {
        host: url.host,
        hostHeader,
        isLayout: url.searchParams.get("comp") === "layout",
      };
      sent.push(sentRequest);
      if (hostHeader && isRecordMode()) {
        request.headers.set("x-recording-upstream-host-header", hostHeader);
      }
      const response = await next(request);
      sentRequest.downloadHint = response.headers.get("x-ms-download-hint");
      return response;
    },
  };
  return { policy, sent };
}

describe("Data locality Node.js only", () => {
  let recorder: Recorder;
  let containerClient: ContainerClient;
  let blobClient: BlockBlobClient;
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
    await blobClient.upload(content, content.length);
  });

  afterEach(async () => {
    await containerClient?.delete();
    await recorder.stop();
  });

  it("routes every block after the first once the service hints the blob has a layout", async (ctx) => {
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
    // Only accounts with data locality enabled get a layout hint, so a live run elsewhere has
    // nothing to route. Record mode doesn't skip: a recording must come from such an account.
    if (isLiveMode() && first.downloadHint !== "layout") {
      ctx.skip();
    }
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
