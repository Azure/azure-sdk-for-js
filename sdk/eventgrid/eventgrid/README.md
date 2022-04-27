# Azure Event Grid client library for JavaScript

[Azure Event Grid](https://azure.microsoft.com/services/event-grid/) is a cloud-based service that provides reliable event delivery at massive scale.

Use the client library to:

- Send events to Event Grid using either the Event Grid, Cloud Events 1.0 schemas, or a custom schema
- Decode and process events which were delivered to an Event Grid handler
- Generate Shared Access Signatures for Event Grid topics

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventgrid/eventgrid/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/eventgrid)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure/eventgrid/)
- [Product documentation](https://docs.microsoft.com/azure/event-grid/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventgrid/eventgrid/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
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

const client = new EventGridPublisherClient(
  "<endpoint>",
  "<endpoint schema>",
  new AzureKeyCredential("<Access Key>")
);
```

#### Using a SAS Token

Like an access key, a SAS token allows access to sending events to an Event Grid topic. Unlike an access key, which can be used until it is regenerated, a SAS token has an experation time, at which point it is no longer valid. To use a SAS token for authentication, use the `AzureSASCredential` as follows:

```js
const { EventGridPublisherClient, AzureSASCredential } = require("@azure/eventgrid");

const client = new EventGridPublisherClient(
  "<endpoint>",
  "<endpoint schema>",
  new AzureSASCredential("<SAS Token>")
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

#### Using Azure Active Directory (AAD)

Azure EventGrid provides integration with Azure Active Directory (Azure AD) for identity-based authentication of requests. With Azure AD, you can use role-based access control (RBAC) to grant access to your Azure Event Grid resources to users, groups, or applications.

To send events to a topic or domain with a `TokenCredential`, the authenticated identity should have the "EventGrid Data Sender" role assigned.

With the `@azure/identity` package, you can seamlessly authorize requests in both development and production environments. To learn more about Azure Active Directory, see the [`@azure/identity` README](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md).

For example, use can use `DefaultAzureCredential` to construct a client which will authenticate using Azure Active Directory:

```js
const { EventGridPublisherClient } = require("@azure/eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new EventGridPublisherClient(
  "<endpoint>",
  "<endpoint schema>",
  new DefaultAzureCredential()
);
```

## Key concepts

### EventGridPublisherClient

`EventGridPublisherClient` is used sending events to an Event Grid Topic or an Event Grid Domain.

### Event Schemas

Event Grid supports multiple schemas for encoding events. When a Custom Topic or Domain is created, you specify the schema that will be used when publishing events. While you may configure your topic to use a _custom schema_ it is more common to use the already defined _Event Grid schema_ or _CloudEvents 1.0 schema_. [CloudEvents](https://cloudevents.io/) is a Cloud Native Computing Foundation project which produces a specification for describing event data in a common way. When you construct the EventGridPublisherClient you must specify which schema your topic is configured to use:

If your topic is configured to use the Event Grid Schema, set "EventGrid" as the schema type:

```js
const client = new EventGridPublisherClient(
  "<endpoint>",
  "EventGrid",
  new AzureKeyCredential("<API Key>")
);
```

If your topic is configured to use the Cloud Event Schema, set "CloudEvent" as the schema type:

```js
const client = new EventGridPublisherClient(
  "<endpoint>",
  "CloudEvent",
  new AzureKeyCredential("<API Key>")
);
```

If your topic is configured to use a Custom Event Schema, set "Custom" as the schema type:

```js
const client = new EventGridPublisherClient(
  "<endpoint>",
  "Custom",
  new AzureKeyCredential("<API Key>")
);
```

Constructing the client with a different schema than what the topic is configured to expect will result in an error from the service and your events will not be published.

You can see what input schema has been configured for an Event Grid topic by using the [Azure CLI][azure_cli] snippet below:

```bash
az eventgrid topic show --name <your-resource-name> --resource-group <your-resource-group-name> --query "inputSchema"
```

### EventGridDeserializer

Events delivered to consumers by Event Grid are delivered as JSON. Depending on the type of consumer being delivered to, the Event Grid service may deliver one or more events as part of a single payload. While these events may be deserialized using normal JavaScript methods like `JSON.parse`, this library offers a helper type for deserializing events, called `EventGridDeserializer`.

Compared with using `JSON.parse` directly, `EventGridDeserializer` does some additional conversions while deserializng events:

1. `EventGridDeserializer` validates that the required properties of an event are present and are the right types.
2. `EventGridDeserializer` converts the event time property into a JavaScript `Date` object.
3. When using Cloud Events, binary data may be used for an event's data property (by using `Uint8Array`). When the event is sent through Event Grid, it is encoded in Base 64. `EventGridDeserializer` will decode this data back into an instance of `Uint8Array`.
4. When deserilizing a _System Event_ (an event generated by another Azure service), `EventGridDeserializer` will do additional conversions so that the `data` object matches the corresponding interface which describes its data. When using TypeScript, these interfaces ensure you have strong typing when access properties of the data object for a system event.

When creating an instance of `EventGridDeserializer` you may supply custom deserializers that are used to further convert the `data` object.

### Distributed Tracing and Cloud Events

This library supports distributed tracing using [`@azure/core-tracing`][azure-core-tracing-github]. When using distributed tracing, this library will create a span during a `send` operation. In addition, when sending events using the Cloud Events 1.0 schema, the SDK will add distributed tracing metadata to the events using the [Distributed Tracing extension][cloud-events-distributed-tracing-spec]. The values for the `traceparent` and `tracestate` extension properties correspond to the `traceparent` and `tracestate` headers from the HTTP request which sends the events. If an event already has a `traceparent` extension property it is not updated.

### Event Grid on Kubernetes

This library has been tested and validated on [Kubernetes using Azure Arc][eventgrid-on-kubernetes-using-azure-arc].

## Examples

### Publish a Custom Event to an Event Grid Topic using the Event Grid Schema

```js
const { EventGridPublisherClient, AzureKeyCredential } = require("@azure/eventgrid");

const client = new EventGridPublisherClient(
  "<endpoint>",
  "EventGrid",
  new AzureKeyCredential("<API key>")
);

await client.send([
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

### Publish a Custom Event to a Topic in an Event Grid Domain using the Event Grid Schema

Publishing events to an Event Grid Domain is similar to publish to an Event Grid Topic, except that when using the Event Grid schema for events, you must include the `topic` property. When publishing events in the Cloud Events 1.0 schema, the required `source` property is used as the name of the topic in the domain to publish to:

```js
const { EventGridPublisherClient, AzureKeyCredential } = require("@azure/eventgrid");

const client = new EventGridPublisherClient(
  "<endpoint>",
  "EventGrid",
  new AzureKeyCredential("<API key>")
);

await client.send([
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

`EventGridDeserializer` can be used to deserialize events delivered by Event Grid. When deserializing an event, you need to know the schema used to deliver the event. In this example we have events being delivered to an Azure Service Bus Queue in the Cloud Events schema. Using the Service Bus SDK we can receive these events from the Service Bus Queue and then deserialize them using `EventGridDeserializer` and use `isSystemEvent` to detect what type of events they are.

```js
const { ServiceBusClient } = require("@azure/service-bus");
const { DefaultAzureCredential } = require("@azure/identity");
const { EventGridDeserializer, isSystemEvent } = require("@azure/eventgrid");

const client = new ServiceBusClient("<service bus hostname>", new DefaultAzureCredential());

const receiver = client.createReceiver("<queue name>", "peekLock");

const consumer = new EventGridDeserializer();

async function processMessage(message) {
  // When delivering to a Service Bus Queue or Topic, EventGrid delivers a single event per message.
  // so we just pluck the first one.
  const event = (await consumer.deserializeCloudEvents(message.body))[0];

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

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventgrid/eventgrid/samples)
directory for detailed examples on how to use this library.

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
