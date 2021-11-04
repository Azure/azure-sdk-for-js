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

class WebSocketFrame {
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
      this.data[0] == 5 &&
      this.data[1] == 1 &&
      this.data[2] == 1
    );
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
    let messages: WebSocketFrame[] = [];

    // Get token
    let serviceClient = new WebPubSubServiceClient(env.WPS_CONNECTION_STRING, "hub1");
    let token = await serviceClient.getClientAccessToken();
    let endSignal = defer<void>();
    // Start simple WebSocket connections
    let simpleClient = new ws.WebSocket(token.url);
    simpleClient.on("message", (data, isBinary) => {
      console.log(data);
      var frame = new WebSocketFrame(data, isBinary);
      if (frame.isEndSignal()) {
        endSignal.resolve();
        simpleClient.close();
      } else {
        messages.push(frame);
      }
    });

    // send to all
    // Send a JSON message
    await serviceClient.sendToAll({ message: "Hello world!" });

    // Send a plain text message
    await serviceClient.sendToAll("Hi there!", { contentType: "text/plain" });

    // Send a binary message
    const payload = new Uint8Array(10);
    await serviceClient.sendToAll(payload.buffer);

    // Send the end signal message
    await serviceClient.sendToAll(getEndSignal());
    await endSignal.promise;

    assert.equal(messages.length, 3);
    assert.equal(messages[0].dataAsString, "");
    assert.equal(messages[1].dataAsString, "");
    assert.isTrue(
      messages[2].isBinary && messages[2] instanceof Buffer && messages[2].byteLength == 10
    );
  });
});
