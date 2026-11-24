# Azure Key Vault provisioning library for JavaScript

`@azure/provisioning-keyvault` provides typed Azure Key Vault resources for authoring pre-deployment infrastructure definitions.
Creating or editing these definitions does not create or modify live Azure resources.

## Getting started

Install the service library and the core authoring library with npm:

```sh
npm install @azure/provisioning-keyvault @azure/provisioning-core
```

```ts snippet:StackKeyVault
import { Stack } from "@azure/provisioning-core";
import { KeyVault, Secret } from "@azure/provisioning-keyvault";

const stack = new Stack("keyvault", {
  targetScope: "resourceGroup",
  location: "eastus",
});
const vault = new KeyVault(stack, {
  properties: {
    tenantId: "00000000-0000-0000-0000-000000000000",
    sku: { family: "A", name: "standard" },
  },
});
new Secret(vault, {
  name: "connection-string",
  properties: { value: "example" },
});
```

1. Create a `Stack` using `@azure/provisioning-core` and define the resource's parent context.
2. Import resource classes from `@azure/provisioning-keyvault` and add them to your definition with their required properties.
3. Serialize the definition using `@azure/provisioning-core/serialization`.

See the [core library documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/provisioning-core/README.md) for the authoring model and serialization APIs.

## Resource types

Resource classes are exported from `@azure/provisioning-keyvault`.
Shared model, input, and view types are available from `@azure/provisioning-keyvault/types`.
Use `existing: true` in resource constructor properties to reference an existing resource instead of declaring a new one.

## License

This library is licensed under the MIT License.
