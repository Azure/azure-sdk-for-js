# Azure Sql provisioning library for JavaScript

`@azure/provisioning-sql` provides typed Azure Sql resources for authoring pre-deployment infrastructure definitions.
Creating or editing these definitions does not create or modify live Azure resources.

## Getting started

Install the service library and the core authoring library with npm:

```sh
npm install @azure/provisioning-sql @azure/provisioning-core
```

1. Create a `Stack` using `@azure/provisioning-core` and define the resource's parent context.
2. Import resource classes from `@azure/provisioning-sql` and add them to your definition with their required properties.
3. Serialize the definition using `@azure/provisioning-core/serialization`.

```ts snippet:ReadmeSampleCreateDatabase
import { Stack } from "@azure/provisioning-core";
import { Server, ServerDatabase } from "@azure/provisioning-sql";
import { serialize } from "@azure/provisioning-core/serialization";

const stack = new Stack("sql-deployment", {
  targetScope: "resourceGroup",
  location: "eastus",
});
const administratorLogin = stack.parameters.add("administratorLogin", "string");
const administratorObjectId = stack.parameters.add("administratorObjectId", "string");
const administratorTenantId = stack.parameters.add("administratorTenantId", "string");
const server = new Server(stack, {
  name: "my-unique-sql-server",
  location: "eastus",
  properties: {
    version: "12.0",
    minimalTlsVersion: "1.2",
    administrators: {
      administratorType: "ActiveDirectory",
      principalType: "Group",
      login: administratorLogin,
      sid: administratorObjectId,
      tenantId: administratorTenantId,
      azureAdOnlyAuthentication: true,
    },
  },
});
const database = new ServerDatabase(server, {
  name: "my-database",
  location: "eastus",
  sku: { name: "Basic", tier: "Basic" },
});
stack.outputs.add("databaseId", "string", database.id);
console.log(JSON.stringify(serialize(stack), null, 2));
```

See the [core library documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/provisioning-core/README.md) for the authoring model and serialization APIs.

## Resource types

Resource classes are exported from `@azure/provisioning-sql`.
Shared model, input, and view types are available from `@azure/provisioning-sql/types`.
Use `existing: true` in resource constructor properties to reference an existing resource instead of declaring a new one.

## License

This library is licensed under the MIT License.
