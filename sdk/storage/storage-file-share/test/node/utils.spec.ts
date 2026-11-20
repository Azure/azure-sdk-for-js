// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { randomBytes } from "node:crypto";
import * as http from "node:http";
import type { AddressInfo } from "node:net";
import { PassThrough, Readable } from "node:stream";
import { delay, extractConnectionStringParts } from "../../src/utils/utils.common.js";
import { streamToBuffer } from "../../src/utils/utils.js";
import type { ReadableStreamGetter } from "../../src/utils/RetriableReadableStream.js";
import { RetriableReadableStream } from "../../src/utils/RetriableReadableStream.js";
import { AnonymousCredential, ShareFileClient } from "../../src/index.js";
import { describe, it, assert, vi } from "vitest";

describe("Utility Helpers Node.js only", () => {
  const protocol = "https";
  const endpointSuffix = "core.windows.net";
  const accountName = "myaccount";
  const accountKey = "myAccountKey";
  const fileEndpoint = `${protocol}://${accountName}.file.${endpointSuffix}`;

  function verifyConnectionString(connectionString: string): void {
    const connectionStringParts = extractConnectionStringParts(connectionString);
    assert.equal(
      "AccountConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected.",
    );
    assert.equal(
      fileEndpoint,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected.",
    );
    assert.equal(
      accountName,
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected.",
    );
  }

  it("extractConnectionStringParts throws error when passed an invalid protocol in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=a;AccountName=b;AccountKey=c;EndpointSuffix=d",
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.isDefined(error);
    }
  });

  it("extractConnectionStringParts throws error when passed an invalid connection string with typo", async () => {
    try {
      extractConnectionStringParts(
        // Typo in the attributes
        "DefaultEndpointsProtocol=https;Name=b;AccountKey=c;EndpointSuffix=d",
      );

      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Invalid AccountName in the provided Connection String",
        error.message,
        "Connection string error message is different than expected",
      );
    }
  });

  it("extractConnectionStringParts throws error with empty EndpointSuffix in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=https;AccountName=b;AccountKey=cdefg;EndpointSuffix=",
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Invalid EndpointSuffix in the provided Connection String",
        error.message,
        "Connection string error message is different than expected",
      );
    }
  });

  it("extractConnectionStringParts throws error with empty AccountKey in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=https;AccountName=b;AccountKey=;EndpointSuffix=d",
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Invalid AccountKey in the provided Connection String",
        error.message,
        "Connection string error message is different than expected",
      );
    }
  });

  it("extractConnectionStringParts throws error with empty AccountName in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=https;AccountName=;AccountKey=c;EndpointSuffix=d",
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Invalid AccountName in the provided Connection String",
        error.message,
        "Connection string error message is different than expected",
      );
    }
  });

  it("extractConnectionStringParts throws error with empty DefaultEndpointsProtocol in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=;AccountName=b;AccountKey=c;EndpointSuffix=d",
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Invalid DefaultEndpointsProtocol in the provided Connection String. Expecting 'https' or 'http'",
        error.message,
        "Connection string error message is different than expected",
      );
    }
  });

  it("extractConnectionStringParts parses connection string with complete service endpoint for each service", async () => {
    verifyConnectionString(
      `DefaultEndpointsProtocol=${protocol};
          BlobEndpoint=myBlobEndpoint;
          FileEndpoint=${fileEndpoint};
          QueueEndpoint=myQueueEndpoint;
          TableEndpoint=myTableEndpoint;
          AccountName=${accountName};
          AccountKey=${accountKey}`,
    );
  });

  it("extractConnectionStringParts parses connection string with an explicit endpoint", async () => {
    verifyConnectionString(
      `DefaultEndpointsProtocol=${protocol};
          FileEndpoint=${fileEndpoint};
        AccountName=${accountName};
        AccountKey=${accountKey}`,
    );
  });

  it("extractConnectionStringParts parses connection string with an endpoint suffix", async () => {
    verifyConnectionString(
      `DefaultEndpointsProtocol=${protocol};
        AccountName=${accountName};
        AccountKey=${accountKey};
        EndpointSuffix=${endpointSuffix};`,
    );
  });

  describe("streamToBuffer", () => {
    // Build a Readable that already has multiple chunks queued internally before any
    // consumer attaches a `readable` listener. This forces the consumer to drain
    // multiple buffered chunks from a single `readable` event - the exact scenario
    // that regressed in Node.js v26 (see nodejs/node#60441).
    function makeMultiChunkStream(chunks: Buffer[]): Readable {
      const stream = new Readable({ read() {} });
      for (const chunk of chunks) {
        stream.push(chunk);
      }
      stream.push(null);
      return stream;
    }

    it("reads exactly `count` bytes when multiple chunks are pre-buffered", async () => {
      const chunks = [Buffer.from("hello "), Buffer.from("buffered "), Buffer.from("world!")];
      const expected = Buffer.concat(chunks);
      const stream = makeMultiChunkStream(chunks);

      const output = Buffer.alloc(expected.length);
      await streamToBuffer(stream, output, 0, expected.length);

      assert.deepEqual(output, expected);
    });

    it("fills the requested slice with multi-chunk data and stops at `count`", async () => {
      const chunks = [Buffer.from("AAAA"), Buffer.from("BBBB"), Buffer.from("CCCC")];
      const stream = makeMultiChunkStream(chunks);

      // Pre-fill output with marker bytes so we can verify only [offset, end) is touched.
      const marker = 0xff;
      const output = Buffer.alloc(20, marker);
      const offset = 4;
      const end = 14; // request 10 bytes; stream has 12 available

      await streamToBuffer(stream, output, offset, end);

      // Bytes outside [offset, end) must remain marker.
      for (let i = 0; i < offset; i++) {
        assert.strictEqual(output[i], marker, `byte ${i} (before offset) modified`);
      }
      for (let i = end; i < output.length; i++) {
        assert.strictEqual(output[i], marker, `byte ${i} (after end) modified`);
      }
      // Filled region must contain the first 10 bytes of the concatenated input.
      assert.deepEqual(
        output.subarray(offset, end),
        Buffer.concat(chunks).subarray(0, end - offset),
      );
    });

    it("rejects when the stream ends before `count` bytes are read", async () => {
      const chunks = [Buffer.from("abc"), Buffer.from("def")];
      const stream = makeMultiChunkStream(chunks);

      const output = Buffer.alloc(10);
      let caught: Error | undefined;
      try {
        await streamToBuffer(stream, output, 0, 10);
      } catch (err: any) {
        caught = err;
      }
      assert.isDefined(caught, "Expected streamToBuffer to reject");
      assert.match(caught!.message, /Stream drains before/);
    });
  });
});

describe("RetriableReadableStream", () => {
  const getter: ReadableStreamGetter = async () => new PassThrough();

  it("keeps listening for errors of a source it stops reading", async () => {
    const source = new PassThrough();
    const retriable = new RetriableReadableStream(source, getter, 0, 10);

    // The source fails while the stream is destroyed; its error is emitted on a later tick.
    source.destroy(new Error("The connection was reset."));
    retriable.destroy();

    assert.isAbove(source.listenerCount("error"), 0);
    // Without a listener, the late error is unhandled and fails the run.
    await delay(10);
  });

  it("destroys a source that arrives after the stream was destroyed", async () => {
    let resolveSource!: (source: PassThrough) => void;
    const source = new PassThrough();
    const retriable = new RetriableReadableStream(
      source,
      () => new Promise<PassThrough>((resolve) => (resolveSource = resolve)),
      0,
      10,
      { maxRetryRequests: 1 },
    );

    // A dropped connection starts a resume, and the stream is destroyed before it gets the source.
    source.emit("aborted");
    retriable.destroy();
    const late = new PassThrough();
    resolveSource(late);

    await delay(10);
    assert.isTrue(late.destroyed);
    assert.isAbove(late.listenerCount("error"), 0);
  });

  it("doesn't resume a source that fails after the caller aborted", async () => {
    const source = new PassThrough();
    const controller = new AbortController();
    let resumes = 0;
    const retriable = new RetriableReadableStream(
      source,
      async () => {
        resumes++;
        throw new Error("The download was resumed.");
      },
      0,
      10,
      { abortSignal: controller.signal, maxRetryRequests: 1 },
    );
    const failed = new Promise<Error>((resolve) => retriable.on("error", resolve));

    // An HTTP client that reports the caller's cancel as a reset connection, without "aborted".
    controller.abort();
    source.destroy(new Error("socket hang up"));

    assert.equal((await failed).name, "AbortError");
    assert.equal(resumes, 0);
    assert.equal(source.listenerCount("error"), 1);
  });

  describe("download over a local server", () => {
    const content = randomBytes(1024 * 1024);
    const etag = '"0x8D0000000000001"';

    /**
     * Serves `content`. The first response sends 100 KiB of the body, then the server drops the
     * connection ("drop") or keeps it open ("hold"); later responses send the requested range.
     */
    async function startServer(first: "drop" | "hold"): Promise<{
      url: string;
      requests: { range?: string; leaseId?: string }[];
      close: () => Promise<void>;
    }> {
      const requests: { range?: string; leaseId?: string }[] = [];
      const server = http.createServer((req, res) => {
        const range = req.headers["x-ms-range"] as string | undefined;
        requests.push({ range, leaseId: req.headers["x-ms-lease-id"] as string | undefined });
        const [start, end] = range
          ? range.slice("bytes=".length).split("-").map(Number)
          : [0, content.length - 1];
        res.writeHead(range ? 206 : 200, {
          "content-length": end - start + 1,
          etag,
          "last-modified": new Date(0).toUTCString(),
          "x-ms-type": "File",
          ...(range ? { "content-range": `bytes ${start}-${end}/${content.length}` } : {}),
        });
        if (requests.length > 1) {
          res.end(content.subarray(start, end + 1));
          return;
        }
        res.write(content.subarray(0, 100 * 1024), () => {
          if (first === "drop") {
            req.socket.destroy();
          }
        });
      });
      await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
      return {
        url: `http://127.0.0.1:${(server.address() as AddressInfo).port}/devstoreaccount1/share/file`,
        requests,
        close: async () => {
          server.closeAllConnections();
          await new Promise((resolve) => server.close(resolve));
        },
      };
    }

    it(
      "resumes from where it stopped when the connection drops while the body is read",
      { timeout: 10_000 },
      async () => {
        const server = await startServer("drop");
        try {
          const client = new ShareFileClient(server.url, new AnonymousCredential(), {
            retryOptions: { maxTries: 1 },
          });
          const leaseId = "a5f6bb5c-a3b8-4e0b-9c1d-2e3f4a5b6c7d";

          const response = await client.download(0, undefined, {
            leaseAccessConditions: { leaseId },
          });
          const chunks: Buffer[] = [];
          for await (const chunk of response.readableStreamBody!) {
            chunks.push(chunk as Buffer);
          }

          assert.isTrue(Buffer.concat(chunks).equals(content), "the downloaded content differs");
          assert.lengthOf(server.requests, 2);
          assert.isUndefined(server.requests[0].range);
          assert.match(server.requests[1].range!, new RegExp(`^bytes=\\d+-${content.length - 1}$`));
          assert.deepEqual(
            server.requests.map((request) => request.leaseId),
            [leaseId, leaseId],
          );
        } finally {
          await server.close();
        }
      },
    );

    it(
      "fails with AbortError and doesn't resume when the caller aborts while the body is read",
      { timeout: 10_000 },
      async () => {
        const server = await startServer("hold");
        try {
          const client = new ShareFileClient(server.url, new AnonymousCredential(), {
            retryOptions: { maxTries: 1 },
          });
          const downloads = vi.spyOn((client as any).context, "download");
          const controller = new AbortController();

          const response = await client.download(0, undefined, { abortSignal: controller.signal });
          const body = response.readableStreamBody!;
          const failed = new Promise<Error>((resolve, reject) => {
            body.on("error", resolve);
            body.on("close", () => reject(new Error("The body closed without an error.")));
          });
          body.once("data", () => controller.abort());

          assert.equal((await failed).name, "AbortError");
          assert.equal(downloads.mock.calls.length, 1, "the cancelled download was resumed");
        } finally {
          await server.close();
        }
      },
    );
  });
});
