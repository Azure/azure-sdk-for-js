# Azure Document DB provisioning library for JavaScript

`@azure/provisioning-cosmosdb` provides typed Azure Document DB resources for authoring pre-deployment infrastructure definitions.
Creating or editing these definitions does not create or modify live Azure resources.

## Getting started

Install the service library and the core authoring library with npm:

```sh
npm install @azure/provisioning-cosmosdb @azure/provisioning-core
```

1. Create a `Stack` using `@azure/provisioning-core` and define the resource's parent context.
2. Import resource classes from `@azure/provisioning-cosmosdb` and add them to your definition with their required properties.
3. Serialize the definition using `@azure/provisioning-core/serialization`.

```ts snippet:ReadmeSampleCreateDatabaseAccount
import { Stack } from "@azure/provisioning-core";
import { DatabaseAccount } from "@azure/provisioning-cosmosdb";
import { serialize } from "@azure/provisioning-core/serialization";

const stack = new Stack("cosmosdb-deployment", {
  targetScope: "resourceGroup",
  location: "eastus",
});
const account = new DatabaseAccount(stack, {
  name: "my-unique-cosmosdb-account",
  location: "eastus",
  kind: "GlobalDocumentDB",
  properties: {
    databaseAccountOfferType: "Standard",
    locations: [{ locationName: "eastus", failoverPriority: 0 }],
    disableLocalAuth: true,
  },
});
stack.outputs.add("accountId", "string", account.id);
console.log(JSON.stringify(serialize(stack), null, 2));
```

See the [core library documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/provisioning-core/README.md) for the authoring model and serialization APIs.

## Resource types

Resource classes are exported from `@azure/provisioning-cosmosdb`.
Shared model, input, and view types are available from `@azure/provisioning-cosmosdb/types`.
Use `existing: true` in resource constructor properties to reference an existing resource instead of declaring a new one.

## License

This library is licensed under the MIT License.
