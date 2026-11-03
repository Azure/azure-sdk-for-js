# Azure Event Hub provisioning library for JavaScript

`@azure/provisioning-eventhub` provides typed Azure Event Hub resources for authoring pre-deployment infrastructure definitions.
Creating or editing these definitions does not create or modify live Azure resources.

## Getting started

Install the service library and the core authoring library with npm:

```sh
npm install @azure/provisioning-eventhub @azure/provisioning-core
```

1. Create a `Stack` using `@azure/provisioning-core` and define the resource's parent context.
2. Import resource classes from `@azure/provisioning-eventhub` and add them to your definition with their required properties.
3. Serialize the definition using `@azure/provisioning-core/serialization`.

The following example defines an Event Hubs namespace and an event hub in a resource-group-scoped stack, then serializes the definition to JSON. The namespace name must be globally unique.

```ts snippet:ReadmeSampleCreateEventHub
import { Stack } from "@azure/provisioning-core";
import { Namespace, Eventhub } from "@azure/provisioning-eventhub";
import { serialize } from "@azure/provisioning-core/serialization";

const stack = new Stack("eventhub-deployment", {
  targetScope: "resourceGroup",
  location: "eastus",
});
const namespace = new Namespace(stack, {
  name: "my-unique-eventhub-namespace",
  location: "eastus",
  sku: { name: "Standard", tier: "Standard", capacity: 1 },
});
const eventHub = new Eventhub(namespace, {
  name: "my-event-hub",
  properties: {
    partitionCount: 2,
    messageRetentionInDays: 7,
  },
});
stack.outputs.add("eventHubId", "string", eventHub.id);
console.log(JSON.stringify(serialize(stack), null, 2));
```

This only produces an infrastructure definition; it does not deploy resources to Azure.

See the [core library documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/provisioning-core/README.md) for the authoring model and serialization APIs.

## Resource types

Resource classes are exported from `@azure/provisioning-eventhub`.
Shared model, input, and view types are available from `@azure/provisioning-eventhub/types`.
Use `existing: true` in resource constructor properties to reference an existing resource instead of declaring a new one.

## License

This library is licensed under the MIT License.
