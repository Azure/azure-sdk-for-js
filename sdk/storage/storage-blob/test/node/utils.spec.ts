// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { randomBytes } from "node:crypto";
import fs from "node:fs";
import * as http from "node:http";
import type { AddressInfo } from "node:net";
import path from "node:path";
import {
  delay,
  extractConnectionStringParts,
  readResponseBodyToBytes,
} from "../../src/utils/utils.common.js";
import type { ReadableOptions } from "node:stream";
import { Readable, PassThrough } from "node:stream";
import {
  readStreamToLocalFile,
  streamToBuffer,
  streamToBuffer2,
  streamToBuffer3,
} from "../../src/utils/utils.js";
import type { ReadableStreamGetter } from "../../src/utils/RetriableReadableStream.js";
import { RetriableReadableStream } from "../../src/utils/RetriableReadableStream.js";
import { Mutex } from "../../src/utils/Mutex.js";
import { AnonymousCredential, BlobClient } from "../../src/index.js";
import { describe, it, assert, afterEach, expect, vi } from "vitest";

describe("Utility Helpers Node.js only", () => {
  const protocol = "https";
  const endpointSuffix = "core.windows.net";
  const accountName = "myaccount";
  const accountKey = "myAccountKey";
  const blobEndpoint = `${protocol}://${accountName}.blob.${endpointSuffix}`;

  function verifyConnectionString(connectionString: string): void {
    const connectionStringParts = extractConnectionStringParts(connectionString);
    assert.equal(
      "AccountConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected.",
    );
    assert.equal(
      blobEndpoint,
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
      assert.isTrue(
        error.message ===
          "Invalid DefaultEndpointsProtocol in the provided Connection String. Expecting 'https' or 'http'",
      );
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
          BlobEndpoint=${blobEndpoint};
          FileEndpoint=myFileEndpoint;
          QueueEndpoint=myQueueEndpoint;
          TableEndpoint=myTableEndpoint;
          AccountName=${accountName};
          AccountKey=${accountKey}`,
    );
  });

  it("extractConnectionStringParts parses connection string with an explicit endpoint", async () => {
    verifyConnectionString(
      `DefaultEndpointsProtocol=${protocol};
        BlobEndpoint=${blobEndpoint};
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

  describe("readStreamToLocalFile", () => {
    class TestReadableStream extends Readable {
      private numBytesSent = 0;
      constructor(
        private sizeInBytes: number,
        private errorInMiddle: boolean = false,
        options?: ReadableOptions,
      ) {
        super(options);
      }

      _read() {
        // check if we're at least halfway through with this change, then throw.
        if (this.errorInMiddle && this.numBytesSent / this.sizeInBytes >= 0.5) {
          this.destroy(new Error("Expected error."));
        } else if (this.numBytesSent === this.sizeInBytes) {
          this.push(null);
        } else {
          this.numBytesSent++;
          this.push(Buffer.from("1"));
        }
      }
    }

    const validFilePath = path.join("./", "read_stream_to_local_file_test.txt");

    afterEach(() => {
      if (fs.existsSync(validFilePath)) {
        fs.unlinkSync(validFilePath);
      }
    });

    it("writes a readable stream into a file", async () => {
      const numBytes = 100;
      const emittingErrorInMiddle = false;
      const readStream = new TestReadableStream(numBytes, emittingErrorInMiddle);
      await readStreamToLocalFile(readStream, validFilePath);

      const file = fs.readFileSync(validFilePath);
      assert.equal(
        file.length,
        numBytes,
        "Local file from readStreamToLocalFile is not the expected length.",
      );
    });

    it("rejects when the readStream emits an error", async () => {
      const numBytes = 100;
      const shouldEmitError = true;
      const readStream = new TestReadableStream(numBytes, shouldEmitError);

      try {
        await readStreamToLocalFile(readStream, validFilePath);
        throw new Error("Test failure");
      } catch (err: any) {
        assert.equal(
          err.message,
          "Expected error.",
          "readStreamToLocalFile should have rejected on readStream error",
        );
      }
    });

    it("rejects when the filepath is a directory", async () => {
      const numBytes = 100;
      const emittingErrorInMiddle = false;
      const readStream = new TestReadableStream(numBytes, emittingErrorInMiddle);

      try {
        await readStreamToLocalFile(readStream, "./");
        throw new Error("Test failure");
      } catch (err: any) {
        assert.notEqual(err.message, "Test failure");
      }
    });
  });

  describe("streamToBuffer2", () => {
    class TestReadableStream extends Readable {
      private readonly _buffer: Buffer;
      private readonly _bytesPerRead: number;

      private _numBytesSent = 0;

      constructor(buffer: Buffer, bytesPerRead: number, opts?: ReadableOptions) {
        super(opts);
        this._buffer = buffer;
        this._bytesPerRead = bytesPerRead;
      }

      _read() {
        if (this._numBytesSent < this._buffer.length) {
          const bytesToSend = Math.min(
            this._bytesPerRead,
            this._buffer.length - this._numBytesSent,
          );
          this.push(this._buffer.slice(this._numBytesSent, this._numBytesSent + bytesToSend));
          this._numBytesSent += bytesToSend;
        } else {
          this.push(null);
        }
      }
    }

    const len = 1024;
    const tests = [
      {
        title:
          "should success when streamType == test, buffer.length == stream.length, and bytesPerRead == stream.length",
        streamType: "test",
        streamLength: len,
        bufferLength: len,
        bytesPerRead: len,
        expectedSuccess: true,
      },
      {
        title:
          "should success when streamType == test, buffer.length > stream.length and bytesPerRead == stream.length",
        streamType: "test",
        streamLength: len,
        bufferLength: len + 1,
        bytesPerRead: len,
        expectedSuccess: true,
      },
      {
        title:
          "should reject when streamType == test, buffer.length < stream.length and bytesPerRead == stream.length",
        streamType: "test",
        streamLength: len,
        bufferLength: len - 1,
        bytesPerRead: len,
        expectedSuccess: false,
      },
      {
        title:
          "should success when streamType == test, buffer.length == stream.length and bytesPerRead < stream.length",
        streamType: "test",
        streamLength: len,
        bufferLength: len,
        bytesPerRead: 100,
        expectedSuccess: true,
      },
      {
        title:
          "should success when streamType == test, buffer.length > stream.length and bytesPerRead < stream.length",
        streamType: "test",
        streamLength: len,
        bufferLength: len + 1,
        bytesPerRead: 100,
        expectedSuccess: true,
      },
      {
        title:
          "should reject when streamType == test, buffer.length < stream.length and bytesPerRead < stream.length",
        streamType: "test",
        streamLength: len,
        bufferLength: len - 1,
        bytesPerRead: 100,
        expectedSuccess: false,
      },
      {
        title:
          "should success when streamType == passthrough, buffer.length == stream.length and bytesPerRead < stream.length",
        streamType: "passthrough",
        streamLength: len,
        bufferLength: len,
        expectedSuccess: true,
      },
      {
        title:
          "should success when streamType == passthrough, buffer.length > stream.length and bytesPerRead < stream.length",
        streamType: "passthrough",
        streamLength: len,
        bufferLength: len + 1,
        expectedSuccess: true,
      },
      {
        title:
          "should reject when streamType == passthrough, buffer.length < stream.length and bytesPerRead < stream.length",
        streamType: "passthrough",
        streamLength: len,
        bufferLength: len - 1,
        expectedSuccess: false,
      },
    ];

    tests.forEach(function (test) {
      it(test.title, async () => {
        const inputBuffer = randomBytes(test.streamLength);

        // TestReadableStream and PassThrough seem to have slightly different behavior at the end of the stream.
        // With TestReadableStream, the last call to read() will return null.  However, with PassThrough
        // the last call to read() returns the last bytes, and there is never a call which returns null.
        // I'm not sure why this behavior is different, but streamToBuffer2() should support both.
        let readStream: Readable;
        if (test.streamType === "test") {
          readStream = new TestReadableStream(inputBuffer, test.bytesPerRead!);
        } else if (test.streamType === "passthrough") {
          const passthrough = new PassThrough();
          passthrough.end(inputBuffer);
          readStream = passthrough;
        } else {
          throw new Error(`Invalid value for test.streamType: ${test.streamType}`);
        }

        const outputBuffer = Buffer.alloc(test.bufferLength);

        try {
          await streamToBuffer2(readStream, outputBuffer);
          if (test.expectedSuccess) {
            assert.deepEqual(outputBuffer.slice(0, inputBuffer.length), inputBuffer);
          } else {
            throw new Error("Test failure");
          }
        } catch (err: any) {
          if (test.expectedSuccess) {
            throw err;
          } else {
            assert.notEqual(err.message, "Test failure");
          }
        }
      });
    });
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
  const counterMax = 10;
  const delayTimeInMs = 10;

  class Counter extends Readable {
    constructor(
      private _max: number = counterMax,
      public index: number = 0,
      opt: ReadableOptions = {},
    ) {
      super(opt);
    }

    _read() {
      const i = this.index++;
      if (i >= this._max) {
        this.push(null);
      } else {
        const str = String(i);
        const buf = Buffer.from(str, "ascii");
        this.push(buf);
      }
    }
  }

  const getter: ReadableStreamGetter = (offset) => {
    return new Promise((resolve) => {
      resolve(new Counter(undefined, offset));
    });
  };

  it("destory should work", async () => {
    const counter = new Counter();
    const retriable = new RetriableReadableStream(counter, getter, 0, counterMax);

    const passedInError = new Error("Passed in error.");
    let errorCaught = false;
    retriable.on("error", (err) => {
      assert.deepStrictEqual(err, passedInError);
      errorCaught = true;
    });

    retriable.destroy(passedInError);
    // spare time for events to fire
    await delay(delayTimeInMs);
    assert.isTrue((counter as any).destroyed);
    assert.isDefined(errorCaught);
  });

  it("setEncoding should work", async () => {
    const counter = new Counter(1);
    const retriable = new RetriableReadableStream(counter, getter, 0, 1);
    retriable.on("data", (chunk) => {
      assert.deepStrictEqual(chunk, Buffer.from("0", "ascii"));
    });

    const counter2 = new Counter(1);
    const retriable2 = new RetriableReadableStream(counter2, getter, 0, 1);
    retriable2.setEncoding("ascii");
    retriable2.on("data", (chunk) => {
      assert.deepStrictEqual(chunk, "0");
    });
  });

  it("pause and resume should work", async () => {
    const counter = new Counter(10, undefined, { highWaterMark: 1 });
    const retriable = new RetriableReadableStream(counter, getter, 0, 10, { highWaterMark: 1 });

    let cur = 0;
    retriable.on("data", (chunk) => {
      assert.deepStrictEqual(chunk, Buffer.from(String(cur++), "ascii"));
      assert.equal(counter.index, cur + 1);
      retriable.pause();
    });

    await delay(delayTimeInMs);
    assert.equal(cur, 1);

    retriable.resume();
    await delay(delayTimeInMs);
    assert.equal(cur, 2);
  });

  it("retry should work on source error", async () => {
    const counter = new Counter();
    const retriable = new RetriableReadableStream(counter, getter, 0, counterMax, {
      maxRetryRequests: 1,
    });
    counter.destroy(new Error("Manual injected error."));

    const resBuf = await streamToBuffer3(retriable);
    assert.deepStrictEqual(resBuf.toString(), "0123456789");
  });

  it("retry should work on source unexpected end", async () => {
    const counter = new Counter(2);
    const retriable = new RetriableReadableStream(counter, getter, 0, counterMax, {
      maxRetryRequests: 1,
    });

    const resBuf = await streamToBuffer3(retriable);
    assert.deepStrictEqual(resBuf.toString(), "0123456789");
  });

  it("keeps listening for errors of a source it stops reading", async () => {
    const source = new PassThrough();
    const retriable = new RetriableReadableStream(source, getter, 0, counterMax);

    // The source fails while the stream is destroyed; its error is emitted on a later tick.
    source.destroy(new Error("The connection was reset."));
    retriable.destroy();

    assert.isAbove(source.listenerCount("error"), 0);
    // Without a listener, the late error is unhandled and fails the run.
    await delay(delayTimeInMs);
  });

  it("destroys a source that arrives after the stream was destroyed", async () => {
    let resolveSource!: (source: NodeJS.ReadableStream) => void;
    const source = new PassThrough();
    const retriable = new RetriableReadableStream(
      source,
      () => new Promise<NodeJS.ReadableStream>((resolve) => (resolveSource = resolve)),
      0,
      counterMax,
      { maxRetryRequests: 1 },
    );

    // A dropped connection starts a resume, and the stream is destroyed before it gets the source.
    source.emit("aborted");
    retriable.destroy();
    const late = new PassThrough();
    resolveSource(late);

    await delay(delayTimeInMs);
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
      counterMax,
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
      requests: { range?: string; ifMatch?: string }[];
      close: () => Promise<void>;
    }> {
      const requests: { range?: string; ifMatch?: string }[] = [];
      const server = http.createServer((req, res) => {
        const range = req.headers["x-ms-range"] as string | undefined;
        requests.push({ range, ifMatch: req.headers["if-match"] as string | undefined });
        const [start, end] = range
          ? range.slice("bytes=".length).split("-").map(Number)
          : [0, content.length - 1];
        res.writeHead(range ? 206 : 200, {
          "content-length": end - start + 1,
          etag,
          "last-modified": new Date(0).toUTCString(),
          "x-ms-blob-type": "BlockBlob",
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
        url: `http://127.0.0.1:${(server.address() as AddressInfo).port}/devstoreaccount1/container/blob`,
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
          const client = new BlobClient(server.url, new AnonymousCredential(), {
            retryOptions: { maxTries: 1 },
          });

          const response = await client.download();
          const downloaded = await streamToBuffer3(response.readableStreamBody!);

          assert.isTrue(downloaded.equals(content), "the downloaded content differs");
          assert.lengthOf(server.requests, 2);
          assert.isUndefined(server.requests[0].range);
          assert.match(server.requests[1].range!, new RegExp(`^bytes=\\d+-${content.length - 1}$`));
          assert.equal(server.requests[1].ifMatch, etag);
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
          const client = new BlobClient(server.url, new AnonymousCredential(), {
            retryOptions: { maxTries: 1 },
          });
          const downloads = vi.spyOn((client as any).blobContext, "download");
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

describe("readResponseBodyToBytes", () => {
  it("reads a Node.js readable stream into a single byte array", async () => {
    const bytes = await readResponseBodyToBytes({
      readableStreamBody: Readable.from([Buffer.from("hello "), Buffer.from("world")]),
    });
    assert.strictEqual(new TextDecoder().decode(bytes), "hello world");
  });

  it("reads a Blob into a single byte array", async () => {
    const bytes = await readResponseBodyToBytes({
      blobBody: Promise.resolve(new Blob(["hello world"])),
    });
    assert.strictEqual(new TextDecoder().decode(bytes), "hello world");
  });

  it("throws a RangeError when the response body is empty or unavailable", async () => {
    await expect(readResponseBodyToBytes({})).rejects.toThrow(RangeError);
  });
});

// `BlobBatch` relies on this to keep validate/assemble/commit atomic across sub requests.
describe("Mutex", () => {
  it("does not hand the same key to a queued waiter and a later caller", async () => {
    const key = "mutex-handoff";
    const entered: string[] = [];

    await Mutex.lock(key);
    const queued = Mutex.lock(key).then(() => entered.push("queued"));

    await Mutex.unlock(key);
    // Arrives after the unlock but before the queued waiter resumes.
    const later = Mutex.lock(key).then(() => entered.push("later"));

    await queued;
    assert.deepEqual(entered, ["queued"], "later caller must not hold the key at the same time");

    await Mutex.unlock(key);
    await later;
    assert.deepEqual(entered, ["queued", "later"]);
    await Mutex.unlock(key);
  });
});
