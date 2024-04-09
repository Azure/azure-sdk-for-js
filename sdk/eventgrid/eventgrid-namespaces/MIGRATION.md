# Guide for migrating to `@azure/eventgrid@4` from `@azure/eventgrid@2`

This guide is intended to assist in the migration to `@azure/eventgrid@4` from `@azure/eventgrid@2`. It will focus on side-by-side comparisons for similar operations between the two packages.

We assume that you are familiar with `@azure/eventgrid@2`. If not, please refer to the [README for name of new package here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventgrid/eventgrid/README.md) rather than this guide.

## Table of contents

## Migration benefits

As Azure has matured and been embraced by a more diverse group of developers, we have been focused on learning the patterns and practices to best support developer productivity and to understand the gaps that the JavaScript client libraries have.

There were several areas of consistent feedback expressed across the Azure client library ecosystem. One of the most important is that the client libraries for different Azure services have not had a consistent approach to organization, naming, and API structure. Additionally, many developers have felt that the learning curve was difficult, and the APIs did not offer a good, approachable, and consistent onboarding story for those learning Azure or exploring a specific Azure service.

To improve the development experience across Azure services, a set of uniform [design guidelines](https://azure.github.io/azure-sdk/general_introduction.html) was created for all languages to drive a consistent experience with established API patterns for all services. A set of [JavaScript](https://azure.github.io/azure-sdk/typescript_introduction.html) was also introduced to ensure that JavaScript clients have a natural and idiomatic feel with respect to the JavaScript ecosystem. Version 3 of `@azure/eventgrid` follows these guidelines.

### Cross Service SDK improvements

The modern JavaScript client library also provides the ability to share in some of the cross-service improvements made to the Azure development experience, such as

- Using the new `@azure/identity` library to share a single authentication approach between clients
- A unified logging and diagnostics pipeline offering a common view of the activities across each of the client libraries
- Use of promises rather than callbacks for a simplified programming experience
- Use of async iterators in paging APIs

### New features

In addition to the cross service improvements, Version 3 of `@azure/eventgrid` has a few new features specific to Event Grid:

- Support for publishing events using the [CloudEvent](https://cloudevents.io) format to topics which are configured to use the CloudEvent V1 schema.
- A new helper which can be used to construct shared access signatures which can be used to provide time based access to publishing to an Event Grid topic.
- Support for authenticating using a shared access signature.
- A new `EventGridDeserializer` type which can be used to deserialize events which have been delivered Event Grid service and TypeScript type defintions for events from services in Azure.

## Important changes

### Constructing the Client and Publishing Events

As part of adopting the design guidelines, constructing a client is now slightly different. Before, you simply pass a `TopicCredentials` or `DomainCredentials` instance from `ms-rest-js` when constructing the client. Now we require that you also provide the URL of the endpoint (as displayed in the Azure console) in addition to the credentials. This is done so that you don't need to pass the endpoint on every call when publishing an event. Since the new version of the SDK supports multiple schemas, you now provide the schema you are using when constructing the client. We have also adopted the use `AzureKeyCredential` and use this regardless of if you are publishing to a Event Grid Topic or an Event Grid Domain. Finally, the client has been renamed to `EventGridPublisherClient` from `EventGridClient` to make it clearer that it's use is just for publishing events.

For example, in V2 of the library, here's how you'd authenticate to the service and publish an event:

```js
const { EventGridClient } = require("@azure/eventgrid");
const { TopicCredentials } = require("@azure/ms-rest-js");
const { v4: uuidv4 } = require("uuid");

const client = new EventGridClient(new TopicCredentials("<your-topic-key>"));

client.publishEvents("<your-topic-host-name-here>", [
  {
    id: uuid(),
    subject: "TestSubject",
    dataVersion: "1.0",
    eventType: "Microsoft.MockPublisher.TestEvent",
    eventTime: new Date(),
    data: {
      field1: "value1",
      filed2: "value2"
    }
  }
]);
```

And in V3, you would instead do this:

```js
const { EventGridPublisherClient, AzureKeyCredential } = require("@azure/eventgrid");

const client = new EventGridPublisherClient(
  "<your-topic-host-name-here>",
  "EventGrid",
  new AzureKeyCredential("<your-topic-key>")
);

client.send([
  {
    subject: "TestSubject",
    dataVersion: "1.0",
    eventType: "Microsoft.MockPublisher.TestEvent",
    data: {
      field1: "value1",
      filed2: "value2"
    }
  }
]);
```

Note that the `id` and `eventTime` properties are no longer required, they default to a new random UUID and the current time. Also, we've changed the method name from `publishEvents` to just `send`.

## Additional samples

More examples can be found at [Samples for add @azure/eventgrid](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventgrid/eventgrid/samples)
