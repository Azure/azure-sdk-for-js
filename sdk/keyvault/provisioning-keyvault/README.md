# Azure Key Vault provisioning library for JavaScript

`@azure/provisioning-keyvault` provides typed Azure Key Vault resources for authoring pre-deployment infrastructure definitions.

## Getting started

```ts snippet:StackResourceGroupKeyVault
import { Stack, ResourceGroup } from "@azure/provisioning-core";
import { KeyVault } from "@azure/provisioning-keyvault";

const stack = new Stack("my-app");
const resourceGroup = new ResourceGroup(stack, {
  name: "rg-my-app",
  location: "eastus",
});
const vault = new KeyVault(resourceGroup, {
  name: "kv-my-app",
  properties: {
    tenantId: "11111111-1111-1111-1111-111111111111",
    sku: { family: "A", name: "standard" },
  },
});
```

The generated resource model uses the `2026-02-01` Azure Key Vault management API.
