# Azure SignalR client library for JavaScript

[Azure SignalR](https://docs.microsoft.com/en-us/azure/azure-signalr/signalr-overview/) is a service that simplifies the process of adding real-time web functionality to serverless applications.

SignalR is useful for serverless application scenarios, including:

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

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/signalr/signalr/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/signalr) |
[API reference documentation](TBD) |
[Product documentation](https://docs.microsoft.com/en-us/azure/azure-signalr/signalr-overview/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/signalr/signalr/samples)

## Getting started

### Currently supported environments

- [Node.js](https://nodejs.org/) version 8.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Azure SignalR endpoint.

### 1. Install the `@azure/signalr` package

```bash
npm install @azure/signalr
```

### 1. Create a HubClient

```js
const { HubClient } = require("@azure/signalr");

const hub = new HubClient("<endpoint>", new AzureKeyCredential("<apiKey>"), "hubName");
```

## Key concepts

### Hub

All connections to SignalR connect to a specific hub. Messages that are broadcast to the hub are dispatched to all connections to that hub.

### Group

Groups allow broadcasting messages to a subset of connections to the hub. You can add and remove users and connections as needed.

### User

Connections to SignalR must specify a user. A user might have multiple connections, for example when a single user is connected across multiple devices or multiple browser tabs.

### Connection

Connections, represented by a connection id, represent an individual websocket connection to the SignalR service.

### Message

A message is either a UTF-8 encoded string or raw binary data. Connections to the SignalR service can check the type of the data payload to determine if it's binary or text.

## Examples

### Broadcast a text message to all users

```js
const { HubClient } = require("@azure/signalr");

const hub = new HubClient("<endpoint>", new AzureKeyCredential("<apiKey>"), "hubName");
await hub.broadcast("Hi there!");
```

### Broadcast a binary message to all users

```js
const { HubClient } = require("@azure/signalr");

const hub = new HubClient("<endpoint>", new AzureKeyCredential("<apiKey>"), "hubName");

const payload = new Uint8Array(10);
await hub.broadcast(payload.buffer);
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the SignalR client library

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
