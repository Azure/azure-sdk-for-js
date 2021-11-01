# Azure Web PubSub service client library for JavaScript

[Azure Web PubSub service](https://aka.ms/awps/doc) is an Azure-managed service that helps developers easily build web applications with real-time features and publish-subscribe pattern. Any scenario that requires real-time publish-subscribe messaging between server and clients or among clients, can use Azure Web PubSub service. Traditional real-time features that often require polling from server or submitting HTTP requests, can also use Azure Web PubSub service.

Use the library to:

- Send messages to hubs and groups.
- Send messages to particular users and connections.
- Organize users and connections into groups.
- Close connections
- Grant/revoke/check permissions for an existing connection

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub)
- [Package (NPM)](https://www.npmjs.com/package/@azure/web-pubsub)
- [API reference documentation](https://aka.ms/awps/sdk/js)
- [Product documentation](https://aka.ms/awps/doc)
- [Samples][samples_ref]

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Azure Web PubSub service instance.

### 1. Install the `@azure/web-pubsub` package

```bash
npm install @azure/web-pubsub
```

### 2. Create and authenticate a WebPubSubServiceClient

```js
const { WebPubSubServiceClient } = require("@azure/web-pubsub");

const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
```

You can also authenticate the `WebPubSubServiceClient` using an endpoint and an `AzureKeyCredential`:

```js
const { WebPubSubServiceClient, AzureKeyCredential } = require("@azure/web-pubsub");

const key = new AzureKeyCredential("<Key>");
const serviceClient = new WebPubSubServiceClient("<Endpoint>", key, "<hubName>");
```

You can also authenticate the `WebPubSubServiceClient` using Azure credential:

1. Install the `@azure/identity` dependency

```batch
npm install @azure/identity
```

2. Update the source code to use `DefaultAzureCredential`:

```js
const { WebPubSubServiceClient, AzureKeyCredential } = require("@azure/web-pubsub");

const key = new DefaultAzureCredential();
const serviceClient = new WebPubSubServiceClient("<Endpoint>", key, "<hubName>");
```

## Key concepts

### Connection

A connection, also known as a client or a client connection, represents an individual WebSocket connection connected to the Web PubSub service. When successfully connected, a unique connection ID is assigned to this connection by the Web PubSub service.

### Hub

A hub is a logical concept for a set of client connections. Usually you use one hub for one purpose, for example, a chat hub, or a notification hub. When a client connection connects, it connects to a hub, and during its lifetime, it belongs to that hub. Different applications can share one Azure Web PubSub service by using different hub names.

### Group

A group is a subset of connections to the hub. You can add a client connection to a group, or remove the client connection from the group, anytime you want. For example, when a client joins a chat room, or when a client leaves the chat room, this chat room can be considered to be a group. A client can join multiple groups, and a group can contain multiple clients.

### User

Connections to Web PubSub can belong to one user. A user might have multiple connections, for example when a single user is connected across multiple devices or multiple browser tabs.

### Message

When the client is connected, it can send messages to the upstream application, or receive messages from the upstream application, through the WebSocket connection.

## Examples

### Get the access token for a client to start the WebSocket connection

1. Intall `ws` package for client to start the WebSocket connection

```batch
npm install ws
```

2. Update the source code to get the access token and start the WebSocket connection

```js
const { WebPubSubServiceClient } = require("@azure/web-pubsub");

const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");

// Get the access token for the WebSocket client connection to use
let token = await serviceClient.getClientAccessToken();

// Or get the access token and assign the client a userId
token = await serviceClient.getClientAccessToken({ userId: "user1" });

// The WebSocket client connects using the full URL containing the access token:
const WebSocket = require("ws");
let ws = new WebSocket(token.url);
ws.on("open", () => console.log("connected"));
ws.on("message", (data) => console.log(data));
```

3. Get client connection `connectionId` when the client is using subprotocol `json.webpubsub.azure.v1`:

An easy way to get client connection `connectionId` is using WebSocket subprotocol `json.webpubsub.azure.v1` to connect to the service. When using this subprotocol, the client always receives JSON payload, and it receives a `connected` response JSON message when it is connected:

```js
let ws = new WebSocket(token.url, "json.webpubsub.azure.v1");
ws.on("open", () => console.log("connected"));
ws.on("message", (data) => {
  let payload = JSON.parse(data);
  if (payload.event === "connected") {
    const connectionId = payload.connectionId;
    console.log(connectionId);
  }
});
```

### Broadcast messages to all connections in a hub

```js
const { WebPubSubServiceClient } = require("@azure/web-pubsub");

const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");

// Send a JSON message
await serviceClient.sendToAll({ message: "Hello world!" });

// Send a plain text message
await serviceClient.sendToAll("Hi there!", { contentType: "text/plain" });

// Send a binary message
const payload = new Uint8Array(10);
await serviceClient.sendToAll(payload.buffer);
```

### Send messages to all connections in a group

```js
const { WebPubSubServiceClient } = require("@azure/web-pubsub");

const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");

const groupClient = serviceClient.group("<groupName>");

// Add user to the group
await groupClient.addUser("user1");

// Send a JSON message
await groupClient.sendToAll({ message: "Hello world!" });

// Send a plain text message
await groupClient.sendToAll("Hi there!", { contentType: "text/plain" });

// Send a binary message
const payload = new Uint8Array(10);
await groupClient.sendToAll(payload.buffer);
```

### Send messages to all connections for a user

```js
const { WebPubSubServiceClient } = require("@azure/web-pubsub");

const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");

// Send a JSON message
await serviceClient.sendToUser("user1", { message: "Hello world!" });

// Send a plain text message
await serviceClient.sendToUser("user1", "Hi there!", { contentType: "text/plain" });

// Send a binary message
const payload = new Uint8Array(10);
await serviceClient.sendToUser("user1", payload.buffer);
```

### Send messages to a particular client connection

```js
const { WebPubSubServiceClient } = require("@azure/web-pubsub");
const WebSocket = require('ws');

const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");

// Leverage the subprotocol to get the connectionId when connected.
// Here is just a quick demo usage to get the connectionId. There are other ways to get the connectionId from the server side, check the documents for details.
let ws = new WebSocket(token.url, "json.webpubsub.azure.v1");
ws.on("message", (data) => {
    console.log(data);
    const payload = JSON.parse(data);
    if (payload.event === "connected"){
      const connectionId = payload.connectionId;

      // Send a JSON message
      await serviceClient.sendToConnection(connectionId, { message: "Hello world!" });

      // Send a plain text message
      await serviceClient.sendToConnection(connectionId, "Hi there!", { contentType: "text/plain" });

      // Send a binary message
      const payload = new Uint8Array(10);
      await serviceClient.sendToConnection(connectionId, payload.buffer);
    }
});
```

### Close connections

```js
const { WebPubSubServiceClient } = require("@azure/web-pubsub");
const WebSocket = require("ws");

const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");

// Leverage the subprotocol to get the connectionId when connected.
// Here is just a quick demo usage to get the connectionId. There are other ways to get the connectionId from the server side, check the documents for details.
let ws = new WebSocket(token.url, "json.webpubsub.azure.v1");
ws.on("message", (data) => {
  console.log(data);
  const payload = JSON.parse(data);
  if (payload.event === "connected") {
    const connectionId = payload.connectionId;

    // Close the specific connection
    serviceClient.closeConnection(connectionId, { reason: "Hello closed." });
  } else if (payload.event === "disconnected") {
    // Output: Application server closed the connection. Reason: Hello closed.
    console.log(payload.message);
  }
});
```

### Check if the group has any connection

```js
const { WebPubSubServiceClient } = require("@azure/web-pubsub");
const WebSocket = require("ws");

const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");

let ws = new WebSocket(token.url, "json.webpubsub.azure.v1");
ws.on("message", (data) => {
  const payload = JSON.parse(data);
  if (payload.event === "connected") {
    const connectionId = payload.connectionId;
    const groupClient = serviceClient.group("group1");
    // Add current connection to the group
    await groupClient.addConnection(connectionId, "group1");
    // Output should be "true" because the connection is in the group
    console.log(await serviceClient.groupExists("group1"));
    // Close all the connections in the group
    await groupClient.closeAllConnections({ reason: "Hello closed." });
    // Output should be "false" because the above step closed all the connections in the group
    console.log(await serviceClient.groupExists("group1"));
  } else if (payload.event === "disconnected") {
    // Output: Application server closed the connection. Reason: Hello closed.
    console.log(payload.message);
  }
});
```

### Grant permissions to a connection

```js
const { WebPubSubServiceClient } = require("@azure/web-pubsub");
const WebSocket = require("ws");

const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");

let ws = new WebSocket(token.url, "json.webpubsub.azure.v1");
let ackId = 0;
ws.on("message", async (data) => {
  console.log(data);
  let payload = JSON.parse(data);
  if (payload.event === "connected") {
    ws.send(
      JSON.stringify({
        type: "joinGroup",
        group: "group1",
        ackId: ++ackId
      })
    );
    // receive message: "The client does not have permission to join group 'group1'."

    // grant permission
    await serviceClient.grantPermission(payload.connectionId, "joinLeaveGroup", {
      targetName: "group1"
    });

    // join the group again
    ws.send(
      JSON.stringify({
        type: "joinGroup",
        group: "group1",
        ackId: ++ackId
      })
    );
    // receive success ack message

    // Output: true:
    console.log(
      await serviceClient.hasPermission(payload.connectionId, "joinLeaveGroup", {
        targetName: "group1"
      })
    );

    // Revoke permission
    await serviceClient.revokePermission(payload.connectionId, "joinLeaveGroup", {
      targetName: "group1"
    });

    // Output: false
    console.log(
      await serviceClient.hasPermission(payload.connectionId, "joinLeaveGroup", {
        targetName: "group1"
      })
    );
  }
});
```

### Access the raw HTTP response for an operation

```js
const { WebPubSubServiceClient } = require("@azure/web-pubsub");

function onResponse(rawResponse: FullOperationResponse): void {
  console.log(rawResponse);
}
const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
await serviceClient.sendToAll({ message: "Hello world!" }, { onResponse });
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the SignalR client library

```bash
export AZURE_LOG_LEVEL=verbose
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the
[samples][samples_ref]
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[samples_ref]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub/web-pubsub/samples
