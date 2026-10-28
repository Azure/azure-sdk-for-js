# Azure Provisioning core library for JavaScript

`@azure/provisioning-core` provides the shared authoring model for Azure provisioning resource libraries.

## Getting started

Create a deployment stack, then attach resources to the stack or to another provisioning component:

```ts snippet:ReadmeCreateStack
import { Stack, ResourceGroup, fn, Resource } from "@azure/provisioning-core";

const stack = new Stack("application");
const resourceGroup = new ResourceGroup(stack, {
  name: fn.concat("rg-", fn.uniqueString("application")),
  location: "eastus",
});
new Resource(resourceGroup, {
  type: "Microsoft.Storage/storageAccounts",
  apiVersion: "2026-04-01",
  name: "stbasemodeltest",
  location: "eastus",
  kind: "StorageV2",
  sku: { name: "Standard_LRS" },
  properties: {
    supportsHttpsTrafficOnly: true,
  },
});
```

Prefer the typed resource class, such as  KeyVault , whenever available for resource-specific type checking. Use the core  Resource  API as a fallback when a resource type has no supported typed class. The following Key Vault example illustrates the generic API; normally, use the typed  KeyVault  class instead:

```ts snippet:ReadmeGeneralResource
import { Stack, ResourceGroup, Resource, fn } from "@azure/provisioning-core";

const stack = new Stack("keyvault-deployment");
const resourceGroup = new ResourceGroup(stack, {
  name: "rg-keyvault",
  location: "eastus",
});
new Resource(resourceGroup, {
  type: "Microsoft.KeyVault/vaults",
  apiVersion: "2024-11-01",
  name: fn.concat("kv-", fn.uniqueString(resourceGroup.id)),
  location: resourceGroup.location,
  properties: {
    tenantId: "00000000-0000-0000-0000-000000000000",
    sku: { family: "A", name: "standard" },
  },
});
```

For service-specific typed resource classes, see the [Key Vault provisioning example](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/provisioning-keyvault/README.md#getting-started).

Provisioning definitions are authored before deployment. Read-only resource properties remain available as expressions for wiring outputs and dependent resources, while only writable properties can be assigned.

## Deploy-time discriminators

Discriminator properties use literal types so TypeScript can select the correct union member. When a discriminator comes from a deployment-time expression, use `asDiscriminator` to select the intended variant while retaining type checking for its other properties:

```ts snippet:AsDiscriminator
import { Stack, asDiscriminator } from "@azure/provisioning-core";

type Rule =
  | {
      kind: "cache";
      cacheKind: "long" | "short";
      days: number;
    }
  | {
      kind: "redirect";
      url: string;
    };
const stack = new Stack("discriminator-example");
const ruleKind = stack.parameters.add("ruleKind", "string", {
  allowed: ["cache"],
});
const widget: {
  properties: {
    primaryRule?: Rule;
  };
} = {
  properties: {},
};
widget.properties.primaryRule = {
  kind: asDiscriminator(ruleKind),
  cacheKind: "long",
  days: 7,
};
```

Prefer literal discriminators whenever possible. `asDiscriminator` does not validate the deployment-time value; constrain the parameter to the intended literal using `allowed`.
