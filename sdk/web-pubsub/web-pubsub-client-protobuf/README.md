# Web PubSub client protobuf protocol library for JavaScript

[Azure Web PubSub](https://aka.ms/awps/doc) is a cloud service that helps developers easily build real-time features in web applications with publish-subscribe patterns at scale. 

You can use this library to add protobuf subprotocols including `protobuf.reliable.webpubsub.azure.v1` and `protobuf.webpubsub.azure.v1` support to `@azure/web-pubsub-client` library.


## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

### Prerequisites

- An [Azure subscription][azure_sub]
- A [Web PubSub resource][create_instance]

### 1. Install the `@azure/web-pubsub-client-protobuf` package

```bash
npm install @azure/web-pubsub-client-protobuf
```

### 2. Use Protobuf protocols

```javascript
let client = new WebPubSubClient("client-access-url", { protocol: WebPubSubProtobufReliableProtocol() });
```

## Troubleshooting

- ### Enable logs

  You can set the following environment variable to get the debug logs when using this library.

```bash
export AZURE_LOG_LEVEL=verbose
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

- ### Live Trace

  Use [Live Trace tool][live_trace] from Web PubSub portal to view the live traffic.
---
## Additional resources
- Learn more about client permission, see [permissions](https://learn.microsoft.com/azure/azure-web-pubsub/reference-json-reliable-webpubsub-subprotocol#permissions)

- [Server SDK - JavaScript documentation](https://aka.ms/awps/sdk/js) 
- [Product documentation](https://aka.ms/awps/doc)
- [Samples][samples_ref]

---
## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.


[azure_sub]: https://azure.microsoft.com/free/
[samples_ref]: https://github.com/Azure/azure-webpubsub/tree/main/samples/javascript/
[create_instance]: https://learn.microsoft.com/azure/azure-web-pubsub/howto-develop-create-instance
[npm]: https://www.npmjs.com/package/@azure/web-pubsub-client
[live_trace]: https://learn.microsoft.com/azure/azure-web-pubsub/howto-troubleshoot-resource-logs
