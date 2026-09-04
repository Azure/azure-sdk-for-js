# Azure Key Vault provisioning library for JavaScript

`@azure/provisioning-keyvault` provides typed Azure Key Vault resources for authoring pre-deployment infrastructure definitions.

## Getting started

```ts snippet:ignore
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

The generated resource model uses the `2026-03-01-preview` Azure Key Vault management API.
