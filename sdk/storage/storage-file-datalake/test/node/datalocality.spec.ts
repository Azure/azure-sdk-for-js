// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { Readable } from "node:stream";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isRecordMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type {
  DataLakeFileSystemClient,
  FileReadOptions,
  FileReadToBufferOptions,
  HttpOperationResponse,
  IHttpClient,
  WebResource,
} from "../../src/index.js";
import {
  AnonymousCredential,
  DataLakeFileClient,
  DataLakeServiceClient,
  newPipeline,
} from "../../src/index.js";
import { configureStorageClient, createAndStartRecorder, getUniqueName } from "../utils/index.js";

// Data Lake reads go through the blob endpoint, so that is where requests land.
const ACCOUNT_HOST = "myaccount.blob.core.windows.net";
const ROUTED_ENDPOINT = "https://blob.stamp.store.core.windows.net:443/";
const ROUTED_HOST = "blob.stamp.store.core.windows.net";
// The internal header a routed read carries until the routing policy consumes it.
const LAYOUT_ENDPOINT_HEADER = "x-azsdk-layout-endpoint";

/** A Get Blob Layout page: `[start, end, endpointIndex]` ranges and the endpoints they index. */
interface FakeLayoutPage {
  ranges: Array<[number, number, number]>;
  endpoints: string[];
  nextMarker?: string;
}

/** How the fake service answers one Get Blob Layout request. */
type FakeLayoutAnswer = FakeLayoutPage | { status: number };

interface FakeServiceOptions {
  /** Whether reads carry the hint that the file has a layout. Defaults to true. */
  hint?: boolean;
  /** Answers to successive layout requests. Defaults to one page routing every byte asked for. */
  layout?: FakeLayoutAnswer[];
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
 * A transport that plays the blob service behind a Data Lake file, so a read runs through the
 * pipeline Data Lake clients share with `@azure/storage-blob`, including its data locality
 * policy, and every request it sends can be inspected.
 */
function createFakeService(
  content: Buffer,
  options: FakeServiceOptions = {},
): { httpClient: IHttpClient; wire: WireRequest[] } {
  const wire: WireRequest[] = [];
  let layoutRequests = 0;
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
        const answer: FakeLayoutAnswer | undefined = options.layout
          ? options.layout[layoutRequests++]
          : { ranges: [[start, end, 0]], endpoints: [ROUTED_ENDPOINT] };
        if (answer === undefined) {
          throw new Error("Unexpected Get Blob Layout request");
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
  return { httpClient, wire };
}

function fileClientOf(httpClient: IHttpClient): DataLakeFileClient {
  return new DataLakeFileClient(
    "https://myaccount.dfs.core.windows.net/filesystem/file.bin",
    newPipeline(new AnonymousCredential(), { httpClient, retryOptions: { maxTries: 1 } }),
  );
}

describe("DataLakeFileClient.readToBuffer with routing, end to end", () => {
  // Never repeats within a chunk, so a chunk written to the wrong offset cannot go unnoticed.
  const content = Buffer.from(Array.from({ length: 4096 }, (_, i) => i % 251));
  const routed = (): FileReadToBufferOptions => ({
    chunkSize: 1024,
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

  it.each<[string, (client: DataLakeFileClient) => Promise<Buffer>]>([
    ["a known size", (client) => client.readToBuffer(0, content.length, routed())],
    ["an unknown size", (client) => client.readToBuffer(0, undefined, routed())],
    [
      "a known size into the caller's buffer",
      (client) => client.readToBuffer(Buffer.alloc(content.length), 0, content.length, routed()),
    ],
    [
      "an unknown size into the caller's buffer",
      (client) => client.readToBuffer(Buffer.alloc(content.length), 0, undefined, routed()),
    ],
  ])("reads the first chunk from the account and routes the rest, for %s", async (_, read) => {
    const { httpClient, wire } = createFakeService(content);

    const downloaded = await read(fileClientOf(httpClient));

    assert.isTrue(downloaded.equals(content), "every chunk must land at its offset");
    assert.deepEqual(reads(wire), [accountRead, routedRead, routedRead, routedRead]);
    assert.lengthOf(layouts(wire), 1, "one layout must serve the whole read");
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
  ])("reads every chunk from the account when %s", async (_, service, layoutRequests) => {
    const { httpClient, wire } = createFakeService(content, service);

    const downloaded = await fileClientOf(httpClient).readToBuffer(0, content.length, routed());

    assert.isTrue(downloaded.equals(content));
    assert.deepEqual(reads(wire), [accountRead, accountRead, accountRead, accountRead]);
    assert.lengthOf(
      layouts(wire),
      layoutRequests,
      "the layout must not be fetched for every chunk",
    );
  });
});

interface SentRequest {
  host: string;
  hostHeader?: string;
}

/** The parts of a Get Blob Layout page the routed read needs, as the generated layer returns it. */
interface LayoutPage {
  ranges?: { range: Array<{ start: number; end: number; endpointIndex: number }> };
  endpoints?: { endpoint: Array<{ index: number; value: string }> };
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
      const hostHeader = request.headers.get("host");
      sent.push({ host: new URL(request.url).host, hostHeader });
      if (hostHeader && isRecordMode()) {
        request.headers.set("x-recording-upstream-host-header", hostHeader);
      }
      return next(request);
    },
  };
  return { policy, sent };
}

describe("Data locality Node.js only", () => {
  let recorder: Recorder;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileClient: DataLakeFileClient;
  let spy: ReturnType<typeof createRoutingSpy>;
  // Never repeats within the range read, so bytes from the wrong offset cannot go unnoticed.
  const content = Buffer.from(Array.from({ length: 4096 }, (_, i) => i % 251));

  beforeEach(async (ctx) => {
    recorder = await createAndStartRecorder(ctx);
    const service = new DataLakeServiceClient(
      `https://${env.DFS_ACCOUNT_NAME}.dfs.core.windows.net/`,
      newPipeline(createTestCredential()),
    );
    // DataLake clients share one core pipeline, so both policies reach the blob calls too.
    spy = createRoutingSpy();
    service["storageClientContext"].pipeline.addPolicy(spy.policy, { afterPhase: "Sign" });
    configureStorageClient(recorder, service);
    fileSystemClient = service.getFileSystemClient(
      recorder.variable("filesystem", getUniqueName("layoutrouting")),
    );
    await fileSystemClient.create();
    fileClient = fileSystemClient.getFileClient(recorder.variable("file", getUniqueName("file")));
    await fileClient.upload(content);
  });

  afterEach(async () => {
    await fileSystemClient?.delete();
    await recorder.stop();
  });

  // Proves the Data Lake pipeline routes the reads readToBuffer sends through the blob client. The
  // layout and the endpoint of a single read are internal, so they are reached directly.
  it("reads a range from the endpoint the file's layout names", async () => {
    const offset = 1024;
    const count = 1024;
    const page: LayoutPage = await (
      fileClient as any
    ).blockBlobClientInternal.blobContext.getLayout({});
    const range = page.ranges!.range.find((r) => r.start <= offset && offset <= r.end)!;
    const endpoint = page.endpoints!.endpoint.find((e) => e.index === range.endpointIndex)!;
    spy.sent.length = 0;

    const response = await fileClient.read(offset, count, {
      layoutEndpoint: endpoint.value,
    } as FileReadOptions);
    const chunks: Buffer[] = [];
    for await (const chunk of response.readableStreamBody!) {
      chunks.push(chunk as Buffer);
    }

    assert.isTrue(Buffer.concat(chunks).equals(content.subarray(offset, offset + count)));
    assert.deepEqual(spy.sent, [
      {
        host: new URL(endpoint.value).host,
        hostHeader: new URL(fileClient.url.replace(".dfs.", ".blob.")).host,
      },
    ]);
  });
});
