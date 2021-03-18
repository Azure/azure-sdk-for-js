# Azure Web PubSub CloudEvents handlers for Express

[Azure Web PubSub](https://docs.microsoft.com/en-us/azure/azure-webpubsub/signalr-webpubsub/) is a service that simplifies the process of adding real-time web functionality to serverless applications.

Azure Web PubSub is useful for serverless application scenarios, including:

- High frequency data updates: gaming, voting, polling, auction.
- Dashboards and monitoring: company dashboard, financial market data, instant sales update, multi-player game leader board, and IoT monitoring.
- Chat: live chat room, chat bot, on-line customer support, real-time shopping assistant, messenger, in-game chat, and so on.
- Real-time location on map: logistic tracking, delivery status tracking, transportation status updates, GPS apps.
- Real time targeted ads: personalized real time push ads and offers, interactive ads.
- Collaborative apps: coauthoring, whiteboard apps and team meeting software.
- Push notifications: social network, email, game, travel alert.
- Real-time broadcasting: live audio/video broadcasting, live captioning, translating, events/news broadcasting.
- IoT and connected devices: real-time IoT metrics, remote control, real-time status, and location tracking.
- Automation: real-time trigger from upstream events.

Use the client library to:

- Broadcast messages to hubs and groups.
- Send messages to particular users and connections.
- Organize users and connections into groups.

## Getting started

### Currently supported environments

- [Node.js](https://nodejs.org/) version 8.x.x or higher
- [Express](http://expressjs.com/) version 4.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Azure Web PubSub endpoint.

### 1. Install the `@azure/web-pubsub-express` package

```bash
npm install @azure/web-pubsub-express
```

### 1. Create a WebPubSubServer

```js
import express from "express";

const { WebPubSubCloudEventsHandler } = require("@azure/web-pubsub-express");
const handler = new WebPubSubCloudEventsHandler("chat", ["https://xxx.webpubsub.azure.com"], {
  //path: "/customUrl", // optional
  onConnect: async (connectRequest) => {
    return {
      userId: "vicancy"
    };
  },
  onUserEvent: async (userRequest) => {
    console.log(`Received user request data: ${userRequest.payload.data}`);
    if (userRequest.payload.data === "abort") {
      return {
        error: {
          detail: "aborted"
        }
      };
    }
    if (userRequest.payload.data === "error") {
      throw new Error("error from inside the event");
    }
    return {
      payload: {
        data: "Hey " + userRequest.payload.data,
        dataType: userRequest.payload.dataType
      }
    };
  },
  onDisconnected: async (disconnectRequest) => {
    console.log(disconnectRequest.context.userId + " disconnected");
  }
});

const app = express();

app.use(handler.getMiddleware());

app.listen(3000, () =>
  console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`)
);
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Web PubSub client library

```bash
export AZURE_LOG_LEVEL=verbose
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/signalr/signalr/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
