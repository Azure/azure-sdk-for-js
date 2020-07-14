# Azure Event Grid client library for JavaScript

[Azure Event Grid](https://azure.microsoft.com/en-us/services/event-grid/) is a cloud-based service that provides reliable event delivery at massive scale.

Use the client library to:

- Send events to Event Grid using either the Event Grid, Cloud Events 1.0 schemas, or a custom schema
- Decode and process events where were delivered to an Event Grid handler
- Generate Shared Access Signatures for Event Grid topics

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventgrid/eventgrid/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/eventgrid) |
[API reference documentation](https://aka.ms/azsdk-js-eventgrid-ref-docs) |
[Product documentation](https://docs.microsoft.com/en-us/azure/event-grid/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventgrid/eventgrid/samples)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing [Event Grid][event_grid] Topic or Domain. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names and `<location>` with an

#### Create an Event Grid Topic

```bash
az eventgrid topic create --location <location> --resource-group <your-resource-group-name> --name <your-resource-name>
```

#### Create an Event Grid Domain

```bash
az eventgrid domain create --location <location> --resource-group <your-resource-group-name> --name <your-resource-name>
```

### Install the `@azure/eventgrid` package

Install the Azure Event Grid client library for JavaScript with `npm`:

```bash
npm install @azure/eventgrid
```

### Create and authenticate a `EventGridClient`

To create a client object to access the Event Grid API, you will need the `endpoint` of your Event Grid topic and a `credential`. The Event Grid client can use either an Access Key or Shared Access Signature (SAS) created from an access key.

You can find the endpoint for your Event Grid topic either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

```bash
az eventgrid topic show --name <your-resource-name> --resource-group <your-resource-group-name> --query "endpoint"
```

#### Using an Access Key

Use the [Azure Portal][azure_portal] to browse to your Event Grid resource and retrieve an Acess Key, or use the [Azure CLI][azure_cli] snippet below:

```bash
az eventgrid topic key list --resource-group <your-resource-group-name> --name <your-event-grid-topic-name>
```

Once you have an API key and endpoint, you can use the `AzureKeyCredential` class to authenticate the client as follows:

```js
const { EventGridClient, AzureKeyCredential } = require("@azure/eventgrid");

const client = new EventGridClient("<endpoint>", new AzureKeyCredential("<API key>"));
```

#### Using a SAS Token

Like an access key, a SAS token allows access to sending events to an Event Grid topic. Unlike an access key, which can be used until it is regenerated, a SAS token has an experation time, at which point it is no longer valid. To use a SAS token for authentication, use the `EventGridSharedAccesSignatureCredential` as follows:

```js
const { EventGridClient, EventGridSharedAccessSignatureCredential } = require("@azure/eventgrid");

const client = new EventGridClient(
  "<endpoint>",
  new EventGridSharedAccessSignatureCredential("<SAS Token>")
);
```

You can generate a SAS token by using the `generateSharedAccessSigniture` instance method on the `EventGridClient` type. Because the Topic's Access Key is used as part of generating the SAS token, you need to create the `EventGridClient` using an Access Key:

```js
const { EventGridClient, AzureKeyCredential } = require("@azure/eventgrid");

const client = new EventGridClient("<endpoint>", new AzureKeyCredential("<API key>"));

// Create a SAS Token which expires on 2020-01-01 at Midnight.
const token = client.generateSharedAccessSignature(
  generateSharedAccessSignature(new Date(2020, 0, 1, 0, 0, 0))
);
```

## Key concepts

### EventGridClient

`EventGridClient` is used sending events to an Event Grid Topic or an Event Grid Domain.

### Event Schemas

Event Grid supports multiple schemas for encoding events. When a Custom Topic or Domain is created, you specify the schema that will be used when publishing events. While you may configure your topic to use a _custom schema_ it is more common to use the already defined _Event Grid schema_ or _CloudEvents 1.0 schema_. [CloudEvents](https://cloudevents.io/) is a Cloud Native Computing Foundation project which produces a specification for describing event data in a common way. Regardless of what schmea your topic or domain is configured to use, `EventGridClient` will be used to publish events to it. However, you must use the correct method for publishing:

| Schema       | Publishing Method     |
| ------------ | --------------------- |
| Event Grid   | `publishEvents`       |
| Cloud Events | `publishCloudEvents`  |
| Custom       | `publishCustomEvents` |

Using the wrong method will result in an error from the service and your events will not be published.

### EventGridConsumer

TODO

## Examples

### Publish a Custom Event to an Event Grid Topic

```js
const { v4: uuidv4 } = require("uuid");
const { EventGridClient, AzureKeyCredential } = require("@azure/eventgrid");

const client = new EventGridClient("<endpoint>", new AzureKeyCredential("<API key>"));

await client.sendEvents([
  {
    id: uuidv4(),
    eventTime: new Date(),
    eventType: "Azure.Sdk.SampleEvent",
    subject: "Event Subject",
    dataVersion: "1.0",
    data: {
      hello: "world"
    }
  }
]);
```

### Publish a Custom Event to a Topic in an Event Grid Domain

Publishing events to an Event Grid Domain is similar to publish to an Event Grid Topic, except that when using the Event Grid schema for events, you must include the `topic` property. When publishing events in the Cloud Events 1.0 schema, the required `source` property is used as the name of the topic in the domain to publish to

```js
const { v4: uuidv4 } = require("uuid");
const { EventGridClient, AzureKeyCredential } = require("@azure/eventgrid");

const client = new EventGridClient("<endpoint>", new AzureKeyCredential("<API key>"));

await client.sendEvents([
  {
    id: uuidv4(),
    eventTime: new Date(),
    topic: "my-sample-topic",
    eventType: "Azure.Sdk.SampleEvent",
    subject: "Event Subject",
    dataVersion: "1.0",
    data: {
      hello: "world"
    }
  }
]);
```

### Decoding an Event

TODO

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logging output when using this library.

- Getting debug logs from the Azure Event Grid client library

```bash
export AZURE_LOG_LEVEL=verbose
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventgrid/eventgrid/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventgrid%2Feventgrid%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[event_grid]: https://docs.microsoft.com/en-us/azure/event-grid
[azure_portal]: https://portal.azure.com
