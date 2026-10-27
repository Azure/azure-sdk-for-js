# Azure Key Vault provisioning library for JavaScript

`@azure/provisioning-keyvault` provides typed Azure Key Vault resources for authoring pre-deployment infrastructure definitions.

## Getting started

### Define a resource group and a key vault

Create a stack containing a resource group and a key vault. Passing the resource group as the vault's parent places the vault in that group. Replace the example tenant ID with your Microsoft Entra tenant ID.

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

### Define a key vault and a secret in a resource group-scoped stack

Set the stack's target scope to `resourceGroup` to define resources for the deployment's target resource group without declaring a new resource group. Add a secret by passing the vault as its parent. The secret value shown here is for illustration only; do not hardcode sensitive values in source code.

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

The generated resource model uses the `2026-02-01` Azure Key Vault management API.
