// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { WebPubSubServiceClient, odata } from "../src/index";
import { isLiveMode, assertEnvironmentVariable } from "@azure-tools/test-recorder";
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
    reject: actualReject!,
  };
}

class SimpleWebSocketFrame {
  public dataAsString: string | undefined;
  constructor(
    public data: Buffer | ArrayBuffer | Buffer[],
    public isBinary: boolean,
  ) {
    if (!isBinary) {
      this.dataAsString = data.toString();
    }
  }

  isEndSignal(id: number | undefined = undefined): boolean {
    return (
      this.isBinary &&
      this.data instanceof Buffer &&
      this.data[0] === 5 &&
      this.data[1] === 1 &&
      this.data[2] === 1 &&
      (id === undefined || this.data[3] === id)
    );
  }

  toString(): string | undefined {
    if (this.isEndSignal()) {
      return "|EndSignal|";
    }
    if (!this.isBinary) {
      return this.dataAsString;
    } else {
      return this.data.toString();
    }
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

  toString(): string | undefined {
    if (this.isEndSignal()) {
      return "|EndSignal|";
    }

    return this.dataAsString;
  }
}

function getEndSignal(id: number | undefined = undefined): Uint8Array {
  // magic number 511
  const payload = new Uint8Array(id === undefined ? 3 : 4);
  payload[0] = 5;
  payload[1] = 1;
  payload[2] = 1;
  if (id !== undefined) {
    payload[3] = id;
  }
  return payload;
}

describe("ServiceClient to manage the connected WebSocket connections", function () {
  it("Simple clients can receive expected messages with different content types", async function (this: Context) {
    if (!isLiveMode()) this.skip();
    const hub = "SimpleClientCanReceiveMessage";

    const messages: SimpleWebSocketFrame[] = [];

    // Get token
    const serviceClient = new WebPubSubServiceClient(
      assertEnvironmentVariable("WPS_CONNECTION_STRING"),
      hub,
    );
    const token = await serviceClient.getClientAccessToken();
    const endSignal = defer<void>();
    // Start simple WebSocket connections
    const client = new ws.WebSocket(token.url);
    client.on("message", (data, isBinary) => {
      const frame = new SimpleWebSocketFrame(data, isBinary);
      console.log(frame.toString());
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

  it("Simple clients can can join group and receive group messages", async function (this: Context) {
    if (!isLiveMode()) this.skip();
    const hub = "SimpleClientCanReceiveGroupMessage";

    const messages: SimpleWebSocketFrame[] = [];

    // Get token
    const serviceClient = new WebPubSubServiceClient(
      assertEnvironmentVariable("WPS_CONNECTION_STRING"),
      hub,
    );
    const token = await serviceClient.getClientAccessToken({
      groups: ["group1", "group2"],
    });
    const end1Signal = defer<void>();
    const end2Signal = defer<void>();
    // Start simple WebSocket connections
    const client = new ws.WebSocket(token.url);
    client.on("message", (data, isBinary) => {
      const frame = new SimpleWebSocketFrame(data, isBinary);
      console.log(frame.toString());
      if (frame.isEndSignal(1)) {
        end1Signal.resolve();
      } else if (frame.isEndSignal(2)) {
        end2Signal.resolve();
      } else {
        messages.push(frame);
      }
    });
    client.on("open", async () => {
      const group1Client = serviceClient.group("group1");
      const group2Client = serviceClient.group("group2");
      // send to all
      // Send a JSON message
      await group1Client.sendToAll({ message: "Hello world from group1!" });
      await group2Client.sendToAll(getEndSignal(1));
      // Send a plain text message
      await group2Client.sendToAll("Hi there from group2!", { contentType: "text/plain" });

      // Send the binary end signal message
      await group2Client.sendToAll(getEndSignal(2));
    });

    await end1Signal.promise;
    await end2Signal.promise;
    client.close();
    assert.equal(messages.length, 2);

    // order from different groups is not guaranteed
    assert.isTrue(
      messages.findIndex((s) => s.dataAsString === '{"message":"Hello world from group1!"}') > -1,
    );
    assert.isTrue(messages.findIndex((s) => s.dataAsString === "Hi there from group2!") > -1);
  });

  it("Subprotocol clients can receive expected messages with different content types", async function (this: Context) {
    if (!isLiveMode()) this.skip();
    const hub = "PubSubClientCanReceiveMessage";
    const messages: PubSubWebSocketFrame[] = [];

    // Get token
    const serviceClient = new WebPubSubServiceClient(
      assertEnvironmentVariable("WPS_CONNECTION_STRING"),
      hub,
    );
    const token = await serviceClient.getClientAccessToken();
    const endSignal = defer<void>();
    const connectedSignal = defer<void>();
    // Start simple WebSocket connections
    const client = new ws.WebSocket(token.url, "json.webpubsub.azure.v1");
    client.on("message", (data, isBinary) => {
      const frame = new PubSubWebSocketFrame(data, isBinary);
      console.log(frame.toString());
      if (frame.message.event === "connected") {
        connectedSignal.resolve();
      }
      if (frame.isEndSignal()) {
        endSignal.resolve();
        client.close();
      } else {
        messages.push(frame);
      }
    });
    client.on("open", async () => {
      await connectedSignal.promise;

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
      '{"type":"message","from":"server","dataType":"json","data":{"message":"Hello world!"}}',
    );
    assert.equal(
      messages[2].dataAsString,
      '{"type":"message","from":"server","dataType":"text","data":"Hi there!"}',
    );
  });

  it("Clients can receive messages with filters", async function (this: Context) {
    if (!isLiveMode()) this.skip();
    const hub = "ClientCanReceiveMessageWithFilters";

    const messages: SimpleWebSocketFrame[] = [];

    // Get token
    const serviceClient = new WebPubSubServiceClient(
      assertEnvironmentVariable("WPS_CONNECTION_STRING"),
      hub,
    );
    const token = await serviceClient.getClientAccessToken({ groups: ["groupA"] });
    const endSignal = defer<void>();
    // Start simple WebSocket connections
    const client = new ws.WebSocket(token.url);
    client.on("message", (data, isBinary) => {
      const frame = new SimpleWebSocketFrame(data, isBinary);
      console.log(frame.toString());
      if (frame.isEndSignal()) {
        endSignal.resolve();
        client.close();
      } else {
        messages.push(frame);
      }
    });
    client.on("open", async () => {
      // Send a JSON message to anonymous connections
      await serviceClient.sendToAll(
        { message: "Hello world!" },
        { filter: "userId eq null", messageTtlSeconds: 60 },
      );
      // Send a text message to connections in groupA but not in groupB
      const groupA = "groupA";
      const groupB = "groupB";
      await serviceClient.sendToAll("Hello world!", {
        contentType: "text/plain",
        // use plain text "'groupA' in groups and not('groupB' in groups)"
        // or use the odata helper method
        filter: odata`${groupA} in groups and not(${groupB} in groups)`,
        messageTtlSeconds: 60,
      });
      // Send the binary end signal message
      await serviceClient.sendToAll(getEndSignal());
    });

    await endSignal.promise;

    assert.equal(messages.length, 2);
    assert.equal(messages[0].dataAsString, '{"message":"Hello world!"}');
    assert.equal(messages[1].dataAsString, "Hello world!");
  });

  it("Clients can join or leave multiple groups with filter", async function (this: Context) {
    if (!isLiveMode()) this.skip();
    const hub = "ClientsCanJoinOrLeaveMultipleGroupsWithFilter";

    const messages: SimpleWebSocketFrame[] = [];

    // Get token
    const serviceClient = new WebPubSubServiceClient(
      assertEnvironmentVariable("WPS_CONNECTION_STRING"),
      hub,
    );
    const token = await serviceClient.getClientAccessToken({ userId: "user 1" });
    const startSignal = defer<void>();
    const endSignal = defer<void>();
    // Start simple WebSocket connections
    const client1 = new ws.WebSocket(token.url);
    const client2 = new ws.WebSocket(token.url);
    let opened = 0;

    const onOpen = (): void => {
      opened++;
      if (opened === 2) {
        startSignal.resolve();
      }
    };
    const onMessage = (data: Buffer | ArrayBuffer | Buffer[], isBinary: boolean): void => {
      const frame = new SimpleWebSocketFrame(data, isBinary);
      console.log(frame.toString());
      messages.push(frame);
      if (messages.length === 6) {
        endSignal.resolve();
      }
    };
    client1.on("open", onOpen);
    client2.on("open", onOpen);
    client1.on("message", onMessage);
    client2.on("message", onMessage);

    // Wait all clients opened
    await startSignal.promise;

    // Add filtered connections to group1 and group2
    await serviceClient.addConnectionsToGroups(["group1", "group2"], "userId eq 'user 1'");

    // send to connections in both group1 and group2
    await serviceClient.sendToAll(
      { message: "Hi json!" },
      { filter: "'group1' in groups and 'group2' in groups" },
    );

    // Send a plain text message
    await serviceClient.sendToAll("Hi text!", {
      contentType: "text/plain",
      filter: "'group1' in groups and 'group2' in groups",
    });

    // Send the binary end signal message
    await serviceClient.sendToAll(getEndSignal(2), {
      filter: "'group1' in groups and 'group2' in groups",
    });

    // Timeout 1000 ms
    await Promise.race([new Promise((resolve) => setTimeout(resolve, 1000)), endSignal.promise]);
    assert.equal(messages.length, 6);
    client1.close();
    client2.close();
  });
});
