# Azure Event Grid Namespaces client library for JavaScript

Azure Event Grid system events are published by Azure services to system topics. The models in this package map to events sent by various Azure services.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventgrid/eventgrid-system-events/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/eventgrid-system-events)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure/eventgrid-system-events/)
- [Product documentation](https://docs.microsoft.com/azure/event-grid/)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing [Event Grid][event_grid] Topic or Domain. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

#### Create an Event Grid Topic

```bash
az eventgrid topic create --location <location> --resource-group <your-resource-group-name> --name <your-resource-name>
```

#### Create an Event Grid Domain

```bash
az eventgrid domain create --location <location> --resource-group <your-resource-group-name> --name <your-resource-name>
```

### Install the `@azure/eventgrid-system-events` package

Install the Azure Event Grid System Events client library for JavaScript with `npm`:

```bash
npm install @azure/eventgrid-system-events
```

## Key concepts

This package provides a list of System Events that could be used to publish events to EventGrid.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable the logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventgrid%2Feventgrid%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[event_grid]: https://docs.microsoft.com/azure/event-grid
[azure_portal]: https://portal.azure.com
[azure-core-tracing-github]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-tracing
[cloud-events-distributed-tracing-spec]: https://github.com/cloudevents/spec/blob/v1.0.1/extensions/distributed-tracing.md
[eventgrid-on-kubernetes-using-azure-arc]: https://docs.microsoft.com/azure/event-grid/kubernetes/
