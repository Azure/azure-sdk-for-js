import * as assert from "assert";
import { randomBytes } from "crypto";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { extractConnectionStringParts } from "../../src/utils/utils.common";
import { Readable, ReadableOptions, PassThrough } from "stream";
import { readStreamToLocalFile, streamToBuffer2 } from "../../src/utils/utils.node";
dotenv.config();

describe("Utility Helpers Node.js only", () => {
  const protocol = "https";
  const endpointSuffix = "core.windows.net";
  const accountName = "myaccount";
  const accountKey = "myAccountKey";
  const blobEndpoint = `${protocol}://${accountName}.blob.${endpointSuffix}`;

  function verifyConnectionString(connectionString: string) {
    const connectionStringParts = extractConnectionStringParts(connectionString);
    assert.equal(
      "AccountConnString",
      connectionStringParts.kind,
      "extractConnectionStringParts().kind is different than expected."
    );
    assert.equal(
      blobEndpoint,
      connectionStringParts.url,
      "extractConnectionStringParts().url is different than expected."
    );
    assert.equal(
      accountName,
      connectionStringParts.accountName,
      "extractConnectionStringParts().accountName is different than expected."
    );
  }

  it("extractConnectionStringParts throws error when passed an invalid protocol in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=a;AccountName=b;AccountKey=c;EndpointSuffix=d"
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.ok(
        error.message ===
          "Invalid DefaultEndpointsProtocol in the provided Connection String. Expecting 'https' or 'http'"
      );
    }
  });

  it("extractConnectionStringParts throws error when passed an invalid connection string with typo", async () => {
    try {
      extractConnectionStringParts(
        // Typo in the attributes
        "DefaultEndpointsProtocol=https;Name=b;AccountKey=c;EndpointSuffix=d"
      );

      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Invalid AccountName in the provided Connection String",
        error.message,
        "Connection string error message is different than expected"
      );
    }
  });

  it("extractConnectionStringParts throws error with empty EndpointSuffix in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=https;AccountName=b;AccountKey=cdefg;EndpointSuffix="
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Invalid EndpointSuffix in the provided Connection String",
        error.message,
        "Connection string error message is different than expected"
      );
    }
  });

  it("extractConnectionStringParts throws error with empty AccountKey in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=https;AccountName=b;AccountKey=;EndpointSuffix=d"
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Invalid AccountKey in the provided Connection String",
        error.message,
        "Connection string error message is different than expected"
      );
    }
  });

  it("extractConnectionStringParts throws error with empty AccountName in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=https;AccountName=;AccountKey=c;EndpointSuffix=d"
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Invalid AccountName in the provided Connection String",
        error.message,
        "Connection string error message is different than expected"
      );
    }
  });

  it("extractConnectionStringParts throws error with empty DefaultEndpointsProtocol in the connection string", async () => {
    try {
      extractConnectionStringParts(
        "DefaultEndpointsProtocol=;AccountName=b;AccountKey=c;EndpointSuffix=d"
      );
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Invalid DefaultEndpointsProtocol in the provided Connection String. Expecting 'https' or 'http'",
        error.message,
        "Connection string error message is different than expected"
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
          AccountKey=${accountKey}`
    );
  });

  it("extractConnectionStringParts parses connection string with an explicit endpoint", async () => {
    verifyConnectionString(
      `DefaultEndpointsProtocol=${protocol};
        BlobEndpoint=${blobEndpoint};
        AccountName=${accountName};
        AccountKey=${accountKey}`
    );
  });

  it("extractConnectionStringParts parses connection string with an endpoint suffix", async () => {
    verifyConnectionString(
      `DefaultEndpointsProtocol=${protocol};
        AccountName=${accountName};
        AccountKey=${accountKey};
        EndpointSuffix=${endpointSuffix};`
    );
  });

  describe("readStreamToLocalFile", () => {
    class TestReadableStream extends Readable {
      private numBytesSent = 0;
      constructor(
        private sizeInBytes: number,
        private errorInMiddle: boolean = false,
        options?: ReadableOptions
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

    const validFilePath = path.join(__dirname, "read_stream_to_local_file_test.txt");

    afterEach("remove temporary file", () => {
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
        "Local file from readStreamToLocalFile is not the expected length."
      );
    });

    it("rejects when the readStream emits an error", async () => {
      const numBytes = 100;
      const shouldEmitError = true;
      const readStream = new TestReadableStream(numBytes, shouldEmitError);

      try {
        await readStreamToLocalFile(readStream, validFilePath);
        throw new Error("Test failure");
      } catch (err) {
        assert.equal(
          err.message,
          "Expected error.",
          "readStreamToLocalFile should have rejected on readStream error"
        );
      }
    });

    it("rejects when the filepath is a directory", async () => {
      const numBytes = 100;
      const emittingErrorInMiddle = false;
      const readStream = new TestReadableStream(numBytes, emittingErrorInMiddle);

      try {
        await readStreamToLocalFile(readStream, __dirname);
        throw new Error("Test failure");
      } catch (err) {
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
            this._buffer.length - this._numBytesSent
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
        expectedSuccess: true
      },
      {
        title:
          "should success when streamType == test, buffer.length > stream.length and bytesPerRead == stream.length",
        streamType: "test",
        streamLength: len,
        bufferLength: len + 1,
        bytesPerRead: len,
        expectedSuccess: true
      },
      {
        title:
          "should reject when streamType == test, buffer.length < stream.length and bytesPerRead == stream.length",
        streamType: "test",
        streamLength: len,
        bufferLength: len - 1,
        bytesPerRead: len,
        expectedSuccess: false
      },
      {
        title:
          "should success when streamType == test, buffer.length == stream.length and bytesPerRead < stream.length",
        streamType: "test",
        streamLength: len,
        bufferLength: len,
        bytesPerRead: 100,
        expectedSuccess: true
      },
      {
        title:
          "should success when streamType == test, buffer.length > stream.length and bytesPerRead < stream.length",
        streamType: "test",
        streamLength: len,
        bufferLength: len + 1,
        bytesPerRead: 100,
        expectedSuccess: true
      },
      {
        title:
          "should reject when streamType == test, buffer.length < stream.length and bytesPerRead < stream.length",
        streamType: "test",
        streamLength: len,
        bufferLength: len - 1,
        bytesPerRead: 100,
        expectedSuccess: false
      },
      {
        title:
          "should success when streamType == passthrough, buffer.length == stream.length and bytesPerRead < stream.length",
        streamType: "passthrough",
        streamLength: len,
        bufferLength: len,
        expectedSuccess: true
      },
      {
        title:
          "should success when streamType == passthrough, buffer.length > stream.length and bytesPerRead < stream.length",
        streamType: "passthrough",
        streamLength: len,
        bufferLength: len + 1,
        expectedSuccess: true
      },
      {
        title:
          "should reject when streamType == passthrough, buffer.length < stream.length and bytesPerRead < stream.length",
        streamType: "passthrough",
        streamLength: len,
        bufferLength: len - 1,
        expectedSuccess: false
      }
    ];

    tests.forEach(function(test) {
      it(test.title, async () => {
        const inputBuffer = randomBytes(test.streamLength);

        // TestReadableStream and PassThrough seem to have slightly different behavior at the end of the stream.
        // With TestReadableStream, the last call to read() will return null.  However, with PassThrough
        // the last call to read() returns the last bytes, and there is never a call which returns null.
        // I'm not sure why this behavior is different, but streamToBuffer2() should support both.
        let readStream: Readable;
        if (test.streamType == "test") {
          readStream = new TestReadableStream(inputBuffer, test.bytesPerRead!);
        } else if (test.streamType == "passthrough") {
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
        } catch (err) {
          if (test.expectedSuccess) {
            throw err;
          } else {
            assert.notEqual(err.message, "Test failure");
          }
        }
      });
    });
  });
});
