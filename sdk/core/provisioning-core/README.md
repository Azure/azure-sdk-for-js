# Azure Provisioning core library for JavaScript

`@azure/provisioning-core` provides the shared authoring model for Azure provisioning resource libraries.

## Getting started

Create a deployment stack, then attach resources to the stack or to another provisioning component:

```ts snippet:ignore
import { ResourceGroup, Stack, fn } from "@azure/provisioning-core";

const stack = new Stack("application");

const resourceGroup = new ResourceGroup(stack, {
  name: fn.concat("rg-", fn.uniqueString("application")),
  location: "eastus",
});
```

Resource provider packages such as `@azure/provisioning-keyvault` use the same component tree and expression model:

```ts snippet:ignore
import { ResourceGroup, Stack } from "@azure/provisioning-core";
import { KeyVault } from "@azure/provisioning-keyvault";

const stack = new Stack("keyvault-deployment");
const resourceGroup = new ResourceGroup(stack, {
  name: "rg-keyvault",
  location: "eastus",
});

new KeyVault(resourceGroup, {
  properties: {
    tenantId: "00000000-0000-0000-0000-000000000000",
    sku: { family: "A", name: "standard" },
  },
});
```

Provisioning definitions are authored before deployment. Read-only resource properties remain available as expressions for wiring outputs and dependent resources, while only writable properties can be assigned.
