# Azure Web PubSub CloudEvents handlers for Express

[Azure Web PubSub Service](https://aka.ms/awps/doc) is a service that enables you to build real-time messaging web applications using WebSockets and the publish-subscribe pattern. Any platform supporting WebSocket APIs can connect to the service easily, e.g. web pages, mobile applications, edge devices, etc. The service manages the WebSocket connections for you and allows up to 100K concurrent connections. It provides powerful APIs for you to manage these clients and deliver real-time messages.

Any scenario that requires real-time publish-subscribe messaging between server and clients or among clients, can use Azure Web PubSub service. Traditional real-time features that often require polling from server or submitting HTTP requests, can also use Azure Web PubSub service.

Use the express library to:

- Add Web PubSub CloudEvents middleware to handle incoming client events
  - Handle abuse validation requests
  - Handle client events requests

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-express) |
[Package (NPM)](https://www.npmjs.com/package/@azure/web-pubsub-express) |
[API reference documentation](https://aka.ms/awps/sdk/js) |
[Product documentation](https://aka.ms/awps/doc) |
[Samples][samples_ref]

## Getting started

### Currently supported environments

- [Node.js](https://nodejs.org/) version 8.x.x or higher
- [Express](https://expressjs.com/) version 4.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Azure Web PubSub endpoint.

### 1. Install the `@azure/web-pubsub-express` package

```bash
npm install @azure/web-pubsub-express
```

### 2. Create a WebPubSubEventHandler

```js
const express = require("express");

const { WebPubSubEventHandler } = require("@azure/web-pubsub-express");
const handler = new WebPubSubEventHandler(
  "chat",
  ["https://<yourAllowedService>.webpubsub.azure.com"],
  {
    handleConnect: (req, res) => {
      // auth the connection and set the userId of the connection
      res.success({
        userId: "<userId>"
      });
    }
  }
);

const app = express();

app.use(handler.getMiddleware());

app.listen(3000, () =>
  console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`)
);
```

## Key concepts

### Hub

Hub is a logic set of connections. All connections to Web PubSub connect to a specific hub. Messages that are broadcast to the hub are dispatched to all connections to that hub. For example, hub can be used for different applications, different applications can share one Azure Web PubSub service by using different hub names.

### Group

Group allow broadcast messages to a subset of connections to the hub. You can add and remove users and connections as needed. A client can join multiple groups, and a group can contain multiple clients.

### User

Connections to Web PubSub can belong to one user. A user might have multiple connections, for example when a single user is connected across multiple devices or multiple browser tabs.

### Client Events

Events are created during the lifecycle of a client connection. For example, a simple WebSocket client connection creates a `connect` event when it tries to connect to the service, a `connected` event when it successfully connected to the service, a `message` event when it sends messages to the service and a `disconnected` event when it disconnects from the service.

### Event Handler

Event handler contains the logic to handle the client events. Event handler needs to be registered and configured in the service through the portal or Azure CLI beforehand. The place to host the event handler logic is generally considered as the server-side.

## Examples

## Troubleshooting

### Dump request

Set `dumpRequest` to `true` to view the incoming requests.

### Live Trace

Use **Live Trace** from the Web PubSub service portal to view the live traffic.

## Next steps

Please take a look at the
[samples][samples_ref]
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[samples_ref]: https://github.com/Azure/azure-webpubsub/tree/main/samples
