// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Readable } from "node:stream";
import { extractConnectionStringParts } from "../../src/utils/utils.common.js";
import { streamToBuffer } from "../../src/utils/utils.js";
import { describe, it, assert } from "vitest";

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
