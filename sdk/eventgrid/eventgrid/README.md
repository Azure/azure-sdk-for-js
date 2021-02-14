# Azure Event Grid client library for JavaScript

[Azure Event Grid](https://azure.microsoft.com/services/event-grid/) is a cloud-based service that provides reliable event delivery at massive scale.

Use the client library to:

- Send events to Event Grid using either the Event Grid, Cloud Events 1.0 schemas, or a custom schema
- Decode and process events which were delivered to an Event Grid handler
- Generate Shared Access Signatures for Event Grid topics

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventgrid/eventgrid/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/eventgrid/v/next) |
[API reference documentation](https://aka.ms/azsdk-js-eventgrid-ref-docs) |
[Product documentation](https://docs.microsoft.com/azure/event-grid/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventgrid/eventgrid/samples)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher
- Browser JavaScript
  - Apple Safari: latest two versions
  - Google Chrome: latest two versions
  - Microsoft Edge: all supported versions
  - Mozilla FireFox: latest two versions

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

### Install the `@azure/eventgrid` package

Install the Azure Event Grid client library for JavaScript with `npm`:

```bash
npm install @azure/eventgrid
```

### Create and authenticate a `EventGridPublisherClient`

To create a client object to access the Event Grid API, you will need the `endpoint` of your Event Grid topic and a `credential`. The Event Grid client can use either an Access Key or Shared Access Signature (SAS) created from an access key.

You can find the endpoint for your Event Grid topic either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

```bash
az eventgrid topic show --name <your-resource-name> --resource-group <your-resource-group-name> --query "endpoint"
```

#### Using an Access Key

Use the [Azure Portal][azure_portal] to browse to your Event Grid resource and retrieve an Access Key, or use the [Azure CLI][azure_cli] snippet below:

```bash
az eventgrid topic key list --resource-group <your-resource-group-name> --name <your-event-grid-topic-name>
```

Once you have an API key and endpoint, you can use the `AzureKeyCredential` class to authenticate the client as follows:

```js
const { EventGridPublisherClient, AzureKeyCredential } = require("@azure/eventgrid");

const client = new EventGridPublisherClient("<endpoint>", new AzureKeyCredential("<Access Key>"));
```

#### Using a SAS Token

Like an access key, a SAS token allows access to sending events to an Event Grid topic. Unlike an access key, which can be used until it is regenerated, a SAS token has an experation time, at which point it is no longer valid. To use a SAS token for authentication, use the `EventGridSharedAccesSignatureCredential` as follows:

```js
const {
  EventGridPublisherClient,
  EventGridSharedAccessSignatureCredential
} = require("@azure/eventgrid");

const client = new EventGridPublisherClient(
  "<endpoint>",
  new EventGridSharedAccessSignatureCredential("<SAS Token>")
);
```

You can generate a SAS token by using the `generateSharedAccessSigniture` function.

```js
const { generateSharedAccessSignature, AzureKeyCredential } = require("@azure/eventgrid");

// Create a SAS Token which expires on 2020-01-01 at Midnight.
const token = generateSharedAccessSignature(
  "<endpoint>",
  new AzureKeyCredential("<API key>"),
  new Date("2020-01-01T00:00:00")
);
```

## Key concepts

### EventGridPublisherClient

`EventGridPublisherClient` is used sending events to an Event Grid Topic or an Event Grid Domain.

### Event Schemas

Event Grid supports multiple schemas for encoding events. When a Custom Topic or Domain is created, you specify the schema that will be used when publishing events. While you may configure your topic to use a _custom schema_ it is more common to use the already defined _Event Grid schema_ or _CloudEvents 1.0 schema_. [CloudEvents](https://cloudevents.io/) is a Cloud Native Computing Foundation project which produces a specification for describing event data in a common way. Regardless of what schmea your topic or domain is configured to use, `EventGridPublisherClient` will be used to publish events to it. However, you must use the correct method for publishing:

| Schema       | Publishing Method     |
| ------------ | --------------------- |
| Event Grid   | `publishEvents`       |
| Cloud Events | `publishCloudEvents`  |
| Custom       | `publishCustomEvents` |

Using the wrong method will result in an error from the service and your events will not be published.

### EventGridConsumer

Events delivered to consumers by Event Grid are delivered as JSON. Depending on the type of consumer being delivered to, the Event Grid service may deliver one or more events as part of a single payload. While these events may be deserialized using normal JavaScript methods like `JSON.parse`, this library offers a helper type for deserializing events, called `EventGridConsumer`.

Compared with using `JSON.parse` directly, `EventGridConsumer` does some additional conversions while deserializng events:

1. `EventGridConsumer` validates that the required properties of an event are present and are the right types.
2. `EventGridConsumer` converts the event time property into a JavaScript `Date` object.
3. When using Cloud Events, binary data may be used for an event's data property (by using `Uint8Array`). When the event is sent through Event Grid, it is encoded in Base 64. `EventGridConsumer` will decode this data back into an instance of `Uint8Array`.
4. When deserilizing a _System Event_ (an event generated by another Azure service), `EventGridConsumer` will do additional conversions so that the `data` object matches the corresponding interface which describes its data. When using TypeScript, these interfaces ensure you have strong typing when access properties of the data object for a system event.

When creating an instance of `EventGridConsumer` you may supply custom deserializers that are used to further convert the `data` object.

## Examples

### Publish a Custom Event to an Event Grid Topic

```js
const { EventGridPublisherClient, AzureKeyCredential } = require("@azure/eventgrid");

const client = new EventGridPublisherClient("<endpoint>", new AzureKeyCredential("<API key>"));

await client.sendEvents([
  {
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

Publishing events to an Event Grid Domain is similar to publish to an Event Grid Topic, except that when using the Event Grid schema for events, you must include the `topic` property. When publishing events in the Cloud Events 1.0 schema, the required `source` property is used as the name of the topic in the domain to publish to:

```js
const { EventGridPublisherClient, AzureKeyCredential } = require("@azure/eventgrid");

const client = new EventGridPublisherClient("<endpoint>", new AzureKeyCredential("<API key>"));

await client.sendEvents([
  {
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

### Deserializing an Event

`EventGridConsumer` can be used to deserialize events delivered by Event Grid. When deserializing an event, you need to know the schema used to deliver the event. In this example we have events being delivered to an Azure Service Bus Topic in the Cloud Events schema. Using the Service Bus SDK we can recieve these events from the Service Bus Topic and then deserialize them using `EventGridConsumer` and use `isSystemEvent` to detect what type of events they are.

```js
const { ServiceBusClient } = require("@azure/service-bus");
const { DefaultAzureCredential } = require("@azure/identity");
const { EventGridConsumer, isSystemEvent } = require("@azure/eventgrid");

const client = new ServiceBusClient("<service bus hostname>", new DefaultAzureCredential());

const receiver = client.createReceiver("<queue name>", "peekLock");

const consumer = new EventGridConsumer();

async function processMessage(message) {
  // When delivering to a Service Bus Queue or Topic, EventGrid delivers a single event per message.
  // so we just pluck the first one.
  const event = (await consumer.decodeCloudEvents(message.body))[0];

  if (isSystemEvent("Microsoft.ContainerRegistry.ImagePushed", event)) {
    console.log(
      `${event.time}: Container Registry Image Pushed event for image ${event.data.target.repository}:${event.data.target.tag}`
    );
  } else if (isSystemEvent("Microsoft.ContainerRegistry.ImageDeleted", event)) {
    console.log(
      `${event.time}: Container Registry Image Deleted event for repository ${event.data.target.repository}`
    );
  }

  await message.complete();
}

console.log("starting receiver");

receiver.subscribe({
  processError: async (err) => {
    console.error(err);
  },
  processMessage
});
```

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
[event_grid]: https://docs.microsoft.com/azure/event-grid
[azure_portal]: https://portal.azure.com
