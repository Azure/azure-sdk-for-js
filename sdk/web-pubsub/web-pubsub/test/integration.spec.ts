// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { WebPubSubServiceClient } from "../src/index";
import { env, isLiveMode } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { assert } from "chai";
import ws from "ws";

function defer<T>(): {
  promise: Promise<T>;
  resolve: (t: T) => void;
  reject: (err: Error) => void;
} {
  let actualResolve: (t: T) => void;
  let actualReject: (err: Error) => void;

  const promise = new Promise<T>((resolve, reject) => {
    actualResolve = resolve;
    actualReject = reject;
  });

  return {
    promise,
    resolve: actualResolve!,
    reject: actualReject!
  };
}

class SimpleWebSocketFrame {
  public dataAsString: string | undefined;
  constructor(public data: Buffer | ArrayBuffer | Buffer[], public isBinary: boolean) {
    if (!isBinary) {
      this.dataAsString = data.toString();
    }
  }

  isEndSignal(): boolean {
    return (
      this.isBinary &&
      this.data instanceof Buffer &&
      this.data[0] === 5 &&
      this.data[1] === 1 &&
      this.data[2] === 1
    );
  }
}

class PubSubWebSocketFrame {
  public message: any;
  public dataAsString: string;
  constructor(data: Buffer | ArrayBuffer | Buffer[], isBinary: boolean) {
    assert.isFalse(isBinary);
    this.dataAsString = data.toString();
    this.message = JSON.parse(this.dataAsString);
  }

  isEndSignal(): boolean {
    return this.message.dataType === "binary" && this.message.data === "BQEB";
  }
}

function getEndSignal(): Uint8Array {
  // magic number 511
  const payload = new Uint8Array(3);
  payload[0] = 5;
  payload[1] = 1;
  payload[2] = 1;
  return payload;
}

describe("ServiceClient to manage the connected WebSocket connections", function() {
  it("Simple clients can receive expected messages with different content types", async function(this: Context) {
    if (!isLiveMode()) this.skip();
    const hub = "SimpleClientCanReceiveMessage";

    const messages: SimpleWebSocketFrame[] = [];

    // Get token
    const serviceClient = new WebPubSubServiceClient(env.WPS_CONNECTION_STRING, hub);
    const token = await serviceClient.getClientAccessToken();
    const endSignal = defer<void>();
    // Start simple WebSocket connections
    const client = new ws.WebSocket(token.url);
    client.on("message", (data, isBinary) => {
      const frame = new SimpleWebSocketFrame(data, isBinary);
      if (frame.isEndSignal()) {
        endSignal.resolve();
        client.close();
      } else {
        messages.push(frame);
      }
    });
    client.on("open", async () => {
      // send to all
      // Send a JSON message
      await serviceClient.sendToAll({ message: "Hello world!" });

      // Send a plain text message
      await serviceClient.sendToAll("Hi there!", { contentType: "text/plain" });

      // Send the binary end signal message
      await serviceClient.sendToAll(getEndSignal());
    });
    await endSignal.promise;

    assert.equal(messages.length, 2);
    assert.equal(messages[0].dataAsString, '{"message":"Hello world!"}');
    assert.equal(messages[1].dataAsString, "Hi there!");
  });

  it("Subprotocol clients can receive expected messages with different content types", async function(this: Context) {
    if (!isLiveMode()) this.skip();
    const hub = "PubSubClientCanReceiveMessage";
    const messages: PubSubWebSocketFrame[] = [];

    // Get token
    const serviceClient = new WebPubSubServiceClient(env.WPS_CONNECTION_STRING, hub);
    const token = await serviceClient.getClientAccessToken();
    const endSignal = defer<void>();
    // Start simple WebSocket connections
    const client = new ws.WebSocket(token.url, "json.webpubsub.azure.v1");
    client.on("message", (data, isBinary) => {
      const frame = new PubSubWebSocketFrame(data, isBinary);
      if (frame.isEndSignal()) {
        endSignal.resolve();
        client.close();
      } else {
        messages.push(frame);
      }
    });
    client.on("open", async () => {
      // send to all
      // Send a JSON message
      await serviceClient.sendToAll({ message: "Hello world!" });

      // Send a plain text message
      await serviceClient.sendToAll("Hi there!", { contentType: "text/plain" });

      // Send the binary end signal message
      await serviceClient.sendToAll(getEndSignal());
    });

    await endSignal.promise;

    assert.equal(messages.length, 3);
    assert.equal(messages[0].message.event, "connected");
    assert.equal(
      messages[1].dataAsString,
      '{"type":"message","from":"server","dataType":"json","data":{"message":"Hello world!"}}'
    );
    assert.equal(
      messages[2].dataAsString,
      '{"type":"message","from":"server","dataType":"text","data":"Hi there!"}'
    );
  });
});
