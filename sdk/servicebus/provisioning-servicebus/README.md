# Azure Service Bus provisioning library for JavaScript

`@azure/provisioning-servicebus` provides typed Azure Service Bus resources for authoring pre-deployment infrastructure definitions.
Creating or editing these definitions does not create or modify live Azure resources.

## Getting started

Install the service library and the core authoring library with npm:

```sh
npm install @azure/provisioning-servicebus @azure/provisioning-core
```

1. Create a `Stack` using `@azure/provisioning-core` and define the resource's parent context.
2. Import resource classes from `@azure/provisioning-servicebus` and add them to your definition with their required properties.
3. Serialize the definition using `@azure/provisioning-core/serialization`.

The following example defines a Service Bus namespace and queue in a resource-group-scoped stack, then serializes the definition to JSON. The namespace name must be globally unique.

```ts snippet:ReadmeSampleCreateQueue
import { Stack } from "@azure/provisioning-core";
import { Namespace, Queue } from "@azure/provisioning-servicebus";
import { serialize } from "@azure/provisioning-core/serialization";

const stack = new Stack("servicebus-deployment", {
  targetScope: "resourceGroup",
  location: "eastus",
});
const namespace = new Namespace(stack, {
  name: "my-unique-servicebus-namespace",
  location: "eastus",
  sku: { name: "Standard" },
});
const queue = new Queue(namespace, {
  name: "my-queue",
  properties: {
    maxDeliveryCount: 10,
    deadLetteringOnMessageExpiration: true,
  },
});
stack.outputs.add("queueId", "string", queue.id);
console.log(JSON.stringify(serialize(stack), null, 2));
```

This only produces an infrastructure definition; it does not deploy resources to Azure.

See the [core library documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/provisioning-core/README.md) for the authoring model and serialization APIs.

## Resource types

Resource classes are exported from `@azure/provisioning-servicebus`.
Shared model, input, and view types are available from `@azure/provisioning-servicebus/types`.
Use `existing: true` in resource constructor properties to reference an existing resource instead of declaring a new one.

## License

This library is licensed under the MIT License.
